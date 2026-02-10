"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement bar — marquee style */}
      <div className="bg-foreground text-background overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2 text-xs tracking-widest uppercase">
          <span className="mx-8">Free shipping on orders over $100</span>
          <span className="mx-8">&#x2022;</span>
          <span className="mx-8">30-day hassle-free returns</span>
          <span className="mx-8">&#x2022;</span>
          <span className="mx-8">Secure checkout powered by Stripe</span>
          <span className="mx-8">&#x2022;</span>
          <span className="mx-8">Free shipping on orders over $100</span>
          <span className="mx-8">&#x2022;</span>
          <span className="mx-8">30-day hassle-free returns</span>
          <span className="mx-8">&#x2022;</span>
          <span className="mx-8">Secure checkout powered by Stripe</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-background/80 backdrop-blur-xl border-b">
        <div className="container flex h-16 items-center justify-between">
          {/* Left: Mobile menu + Nav */}
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden -ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            <nav className="hidden lg:flex items-center gap-8 text-sm">
              <Link
                href="/#products"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/#featured"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Featured
              </Link>
              <Link
                href="/#new"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                New Arrivals
              </Link>
              <Link
                href="/#about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Center: Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
          >
            <span className="text-xl font-bold tracking-tight">
              Pixel Perfect
            </span>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-[18px] w-[18px]" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-[18px] w-[18px]" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-[18px] w-[18px]" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-foreground text-[10px] font-medium text-background flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b bg-background">
          <nav className="container py-6 flex flex-col gap-1">
            {["Shop", "Featured", "New Arrivals", "About"].map((item) => (
              <Link
                key={item}
                href={
                  item === "Shop"
                    ? "/#products"
                    : item === "Featured"
                    ? "/#featured"
                    : item === "New Arrivals"
                    ? "/#new"
                    : "/#about"
                }
                className="px-3 py-3 text-lg font-medium hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
