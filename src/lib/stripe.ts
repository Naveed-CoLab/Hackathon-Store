import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Use the latest Stripe API version supported by the SDK types
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});
