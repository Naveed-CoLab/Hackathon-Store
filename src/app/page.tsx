import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { Footer } from "@/components/footer";
import { products } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Truck,
  RotateCcw,
  Headphones,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function Home() {
  const featuredProduct = products.find(
    (p) => p.id === "prod_wireless_headphones"
  )!;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />

      {/* Trust bar */}
      <section className="border-b">
        <div className="container py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, label: "Free Shipping", sub: "Orders $100+" },
              { icon: Shield, label: "Secure Payment", sub: "256-bit SSL" },
              {
                icon: RotateCcw,
                label: "30-Day Returns",
                sub: "No questions asked",
              },
              {
                icon: Headphones,
                label: "24/7 Support",
                sub: "Always here for you",
              },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-tight">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product — Full width editorial */}
      <section id="featured" className="py-20 md:py-28">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#f6f5f3]">
              <Image
                src={featuredProduct.image}
                alt={featuredProduct.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <Badge
                variant="secondary"
                className="absolute top-5 left-5 bg-white/90 backdrop-blur text-[10px] uppercase tracking-widest font-medium px-3 py-1.5 rounded-full"
              >
                {featuredProduct.badge}
              </Badge>
            </div>

            {/* Content */}
            <div className="space-y-8 lg:py-8">
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  Featured Product
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
                  {featuredProduct.name}
                </h2>
              </div>

              <p className="text-muted-foreground text-base leading-relaxed max-w-lg">
                {featuredProduct.description}
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {featuredProduct.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2.5 text-sm"
                  >
                    <div className="h-1 w-1 rounded-full bg-foreground" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(featuredProduct.rating)
                          ? "text-foreground fill-foreground"
                          : "text-border fill-border"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    {featuredProduct.reviews.toLocaleString()} reviews
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-8 pt-2">
                <span className="text-3xl font-bold tracking-tight">
                  {formatPrice(featuredProduct.price)}
                </span>
                <Button
                  size="xl"
                  className="rounded-full px-8 group"
                  asChild
                >
                  <Link href={`/product/${featuredProduct.id}`}>
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Products */}
      <section id="products" className="pb-16 md:pb-28">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                Collection
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
                All Products
              </h2>
            </div>
            <span className="text-sm text-muted-foreground hidden sm:block">
              {products.length} products
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial banner */}
      <section className="bg-[#f6f5f3]">
        <div className="container py-20 md:py-28 text-center max-w-3xl mx-auto">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Why Pixel Perfect
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-4 mb-6">
            We obsess over the details
            <br />
            so you don&apos;t have to
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-xl mx-auto mb-8">
            Every product in our collection is hand-picked and tested by our
            team. We partner directly with manufacturers to ensure the highest
            quality at fair prices.
          </p>
          <Button size="xl" className="rounded-full px-8 group" asChild>
            <a href="#products">
              Explore Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
