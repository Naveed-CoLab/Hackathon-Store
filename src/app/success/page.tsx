"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function SuccessPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16">
        <div className="w-full max-w-md mx-auto px-6">
          <div className="text-center">
            {/* Icon */}
            <div
              className={`mx-auto mb-8 transition-all duration-700 ${
                mounted ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <div className="h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              </div>
            </div>

            <h1
              className={`text-2xl md:text-3xl font-bold mb-3 tracking-tight transition-all duration-700 delay-200 ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              Payment Successful
            </h1>

            <p
              className={`text-muted-foreground mb-10 transition-all duration-700 delay-300 ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              Thank you for your purchase. Your order has been confirmed.
            </p>

            <div
              className={`space-y-3 mb-10 transition-all duration-700 delay-500 ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 text-left">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Confirmation sent</p>
                  <p className="text-xs text-muted-foreground">
                    Check your email for the receipt
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 text-left">
                <Package className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Shipping in 1-2 days</p>
                  <p className="text-xs text-muted-foreground">
                    We&apos;ll notify you when it&apos;s on its way
                  </p>
                </div>
              </div>
            </div>

            <Link href="/">
              <Button size="lg" className="rounded-full px-8 group w-full">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <p className="text-[11px] text-muted-foreground mt-6">
              Order #PP-
              {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
