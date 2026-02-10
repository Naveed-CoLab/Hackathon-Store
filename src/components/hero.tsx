"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative bg-[#f6f5f3]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-0 min-h-[85vh] items-center">
          {/* Left — Copy */}
          <div className="py-16 lg:py-24 lg:pr-16 space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium tracking-wider uppercase bg-foreground text-background rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              New Collection 2026
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              Tech that
              <br />
              feels{" "}
              <span className="italic font-serif font-normal">perfect</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Curated premium accessories designed for those who notice the
              details. Every pixel, every stitch, every sound — perfected.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="xl" className="group rounded-full px-8" asChild>
                <a href="#products">
                  Shop All
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="rounded-full px-8"
                asChild
              >
                <a href="#featured">Our Picks</a>
              </Button>
            </div>

            {/* Mini stats */}
            <div className="flex gap-10 pt-6">
              <div>
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-xs text-muted-foreground">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-xs text-muted-foreground">
                  Average Rating
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-xs text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Right — Hero Image */}
          <div className="relative h-[50vh] lg:h-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=85"
              alt="Premium headphones"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f6f5f3] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#f6f5f3] lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
