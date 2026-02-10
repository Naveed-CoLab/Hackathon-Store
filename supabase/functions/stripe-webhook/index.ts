// Setup type definitions
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import Stripe from "npm:stripe@12.0.0";
import { createClient } from "npm:@supabase/supabase-js@2";

// Stripe
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2026-01-28.clover",
});
const cryptoProvider = Stripe.createSubtleCryptoProvider();

// Supabase
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

console.log("🚀 Stripe Webhook Ready");

// ─────────────────────────────────────────
// Helper: safely serialize stripe rule
// (can be string OR object like { id, predicate, action })
// ─────────────────────────────────────────
function serializeRule(rule: unknown): string | null {
  if (!rule) return null;
  if (typeof rule === "string") return rule;
  return JSON.stringify(rule);
}

// ─────────────────────────────────────────
// Helper: determine status from charge outcome
// ─────────────────────────────────────────
function resolveStatus(charge: Stripe.Charge | null): string {
  if (!charge?.outcome) return "PENDING_REVIEW";
  if (charge.outcome.risk_level === "not_assessed") return "PENDING_REVIEW";
  if (charge.outcome.risk_level === "highest") return "FLAGGED";
  return "COMPLETED";
}

Deno.serve(async (request) => {
  const signature = request.headers.get("Stripe-Signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  const body = await request.text();
  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
      undefined,
      cryptoProvider
    );
  } catch (err) {
    console.error("❌ Invalid signature", err);
    return new Response("Invalid signature", { status: 400 });
  }

  console.log("🔔 Event:", event.type, "| ID:", event.id);

  try {
    // ─────────────────────────────────────────
    // checkout.session.completed → UPSERT with FULL charge data
    // FIX: expand latest_charge to get card, billing, risk data upfront
    // ─────────────────────────────────────────
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (!session.payment_intent) {
        console.log("ℹ️ No payment_intent on session, skipping");
        return new Response("OK");
      }

      // KEY FIX: expand latest_charge to pull ALL data in one shot
      const pi = await stripe.paymentIntents.retrieve(
        session.payment_intent as string,
        { expand: ["latest_charge"] }
      );

      const charge = pi.latest_charge as Stripe.Charge | null;

      console.log("📦 PI retrieved:", pi.id, "| Charge:", charge?.id ?? "none");
      console.log("📦 Risk:", charge?.outcome?.risk_level, charge?.outcome?.risk_score);

      const row = {
        stripe_event_id: event.id,
        payment_intent_id: pi.id,
        amount: pi.amount,
        currency: pi.currency,
        customer_email: session.customer_details?.email ?? null,
        customer_name: session.customer_details?.name ?? null,
        customer_phone: session.customer_details?.phone ?? null,
        // Charge data — available immediately if charge exists
        charge_id: charge?.id ?? null,
        billing_country: charge?.billing_details?.address?.country ?? null,
        card_country: charge?.payment_method_details?.card?.country ?? null,
        card_brand: charge?.payment_method_details?.card?.brand ?? null,
        card_funding: charge?.payment_method_details?.card?.funding ?? null,
        card_last4: charge?.payment_method_details?.card?.last4 ?? null,
        // Fraud data — may or may not be assessed yet
        stripe_risk_score: charge?.outcome?.risk_score ?? null,
        stripe_risk_level: charge?.outcome?.risk_level ?? null,
        stripe_rule: serializeRule(charge?.outcome?.rule),
        status: resolveStatus(charge),
      };

      // Use UPSERT on payment_intent_id so it works regardless of event ordering
      const { error } = await supabase.from("transactions").upsert(row, {
        onConflict: "payment_intent_id",
      });

      if (error) {
        console.error("❌ Upsert error:", JSON.stringify(error));
      } else {
        console.log("✅ Transaction upserted with full charge data");
      }

      return new Response("OK");
    }

    // ─────────────────────────────────────────
    // charge.succeeded → UPDATE or INSERT fallback
    // FIX: handles case where this fires BEFORE checkout.session.completed
    // ─────────────────────────────────────────
    if (event.type === "charge.succeeded") {
      const charge = event.data.object as Stripe.Charge;

      const updateData = {
        charge_id: charge.id,
        billing_country: charge.billing_details?.address?.country ?? null,
        card_country: charge.payment_method_details?.card?.country ?? null,
        card_brand: charge.payment_method_details?.card?.brand ?? null,
        card_funding: charge.payment_method_details?.card?.funding ?? null,
        card_last4: charge.payment_method_details?.card?.last4 ?? null,
        stripe_risk_score: charge.outcome?.risk_score ?? null,
        stripe_risk_level: charge.outcome?.risk_level ?? null,
        stripe_rule: serializeRule(charge.outcome?.rule),
        status: resolveStatus(charge),
      };

      // Try update first
      const { data, error } = await supabase
        .from("transactions")
        .update(updateData)
        .eq("payment_intent_id", charge.payment_intent as string)
        .select("id");

      if (error) {
        console.error("❌ charge.succeeded update error:", JSON.stringify(error));
      } else if (!data?.length) {
        // Row doesn't exist yet — charge.succeeded arrived before checkout.session.completed
        // Insert a partial row; checkout.session.completed will upsert and fill the rest
        console.warn("⚠️ Row not found for", charge.payment_intent, "— inserting partial row");

        const { error: insertErr } = await supabase.from("transactions").upsert(
          {
            stripe_event_id: event.id,
            payment_intent_id: charge.payment_intent as string,
            amount: charge.amount,
            currency: charge.currency,
            customer_email: charge.billing_details?.email ?? null,
            customer_name: charge.billing_details?.name ?? null,
            ...updateData,
          },
          { onConflict: "payment_intent_id" }
        );

        if (insertErr) console.error("❌ Fallback insert error:", JSON.stringify(insertErr));
        else console.log("✅ Partial row inserted from charge.succeeded");
      } else {
        console.log("✅ charge.succeeded updated row:", data[0].id);
      }

      return new Response("OK");
    }

    // ─────────────────────────────────────────
    // charge.updated → FRAUD DATA (Radar scores arrive here)
    // FIX: don't skip entirely when risk_level is "not_assessed"
    //       — still store card/billing data, just skip risk fields
    // ─────────────────────────────────────────
    if (event.type === "charge.updated") {
      const charge = event.data.object as Stripe.Charge;

      const riskReady =
        charge.outcome &&
        charge.outcome.risk_level &&
        charge.outcome.risk_level !== "not_assessed";

      // Always build update with card/billing data
      const updateData: Record<string, unknown> = {
        charge_id: charge.id,
        billing_country: charge.billing_details?.address?.country ?? null,
        card_country: charge.payment_method_details?.card?.country ?? null,
        card_brand: charge.payment_method_details?.card?.brand ?? null,
        card_funding: charge.payment_method_details?.card?.funding ?? null,
        card_last4: charge.payment_method_details?.card?.last4 ?? null,
      };

      // Only add risk data when it's actually assessed
      if (riskReady) {
        updateData.stripe_risk_score = charge.outcome!.risk_score ?? null;
        updateData.stripe_risk_level = charge.outcome!.risk_level ?? null;
        updateData.stripe_rule = serializeRule(charge.outcome!.rule);
        updateData.status =
          charge.outcome!.risk_level === "highest" ? "FLAGGED" : "COMPLETED";
        console.log("🧠 Risk data ready:", charge.outcome!.risk_level, charge.outcome!.risk_score);
      } else {
        console.log("⏳ Risk not assessed yet, storing card/billing data only");
      }

      // Try update first
      const { data, error } = await supabase
        .from("transactions")
        .update(updateData)
        .eq("payment_intent_id", charge.payment_intent as string)
        .select("id");

      if (error) {
        console.error("❌ charge.updated update error:", JSON.stringify(error));
      } else if (!data?.length) {
        // Row doesn't exist yet — insert fallback
        console.warn("⚠️ Row not found for", charge.payment_intent, "— inserting from charge.updated");

        const { error: insertErr } = await supabase.from("transactions").upsert(
          {
            stripe_event_id: event.id,
            payment_intent_id: charge.payment_intent as string,
            amount: charge.amount,
            currency: charge.currency,
            customer_email: charge.billing_details?.email ?? null,
            customer_name: charge.billing_details?.name ?? null,
            ...updateData,
          },
          { onConflict: "payment_intent_id" }
        );

        if (insertErr) console.error("❌ Fallback insert error:", JSON.stringify(insertErr));
        else console.log("✅ Row inserted from charge.updated");
      } else {
        console.log("✅ charge.updated applied to row:", data[0].id);
      }

      return new Response("OK");
    }

    // ─────────────────────────────────────────
    // Radar early fraud warning
    // ─────────────────────────────────────────
    if (
      event.type === "radar.early_fraud_warning.created" ||
      event.type === "radar.early_fraud_warning.updated"
    ) {
      const warning = event.data.object as Stripe.Radar.EarlyFraudWarning;

      const { data, error } = await supabase
        .from("transactions")
        .update({
          radar_warning: true,
          status: "RADAR_WARNING",
        })
        .eq("payment_intent_id", warning.payment_intent as string)
        .select("id");

      if (error) console.error("❌ Radar warning error:", JSON.stringify(error));
      else if (!data?.length) console.warn("⚠️ No row for radar warning on", warning.payment_intent);
      else console.log("🚨 Radar warning applied to row:", data[0].id);

      return new Response("OK");
    }

    console.log("ℹ️ Unhandled event type:", event.type);
  } catch (err) {
    console.error("💥 Unhandled error:", err);
    return new Response("Internal error", { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
});
