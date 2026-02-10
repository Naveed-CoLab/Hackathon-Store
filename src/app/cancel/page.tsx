"use client";

import Link from "next/link";
import { XCircle, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16">
        <div className="w-full max-w-md mx-auto px-6 text-center">
          <div className="h-20 w-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-8">
            <XCircle className="h-10 w-10 text-red-500" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
            Payment Cancelled
          </h1>

          <p className="text-muted-foreground mb-10">
            No charges were made. Feel free to try again or keep browsing.
          </p>

          <div className="flex flex-col gap-3">
            <Link href="/">
              <Button size="lg" className="rounded-full px-8 w-full">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Return to Store
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.history.back()}
              className="rounded-full w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
