"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Check,
  Shield,
  Truck,
  RotateCcw,
  Loader2,
  Minus,
  Plus,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Product not found</h1>
            <p className="text-muted-foreground">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/">
              <Button className="rounded-full">Back to Store</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          price: product.price,
          quantity,
          image: product.image,
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container py-4">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link
              href="/"
              className="hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href="/#products"
              className="hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Product Detail */}
        <div className="container pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[#f6f5f3] sticky top-28">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {product.badge && (
                  <Badge
                    variant="secondary"
                    className="absolute top-5 left-5 bg-white/90 backdrop-blur text-[10px] uppercase tracking-widest font-medium px-3 py-1.5 rounded-full"
                  >
                    {product.badge}
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:py-4 space-y-7">
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  {product.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4 tracking-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-foreground text-foreground"
                            : "fill-border text-border"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews.toLocaleString()}{" "}
                    reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold tracking-tight">
                  {formatPrice(product.price)}
                </span>
                <span className="text-base text-muted-foreground line-through">
                  {formatPrice(Math.round(product.price * 1.3))}
                </span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Save 23%
                </span>
              </div>

              <div className="h-px bg-border" />

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2.5 text-sm"
                    >
                      <Check className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Quantity & Checkout */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity</span>
                  <div className="flex items-center border rounded-full">
                    <button
                      className="h-10 w-10 flex items-center justify-center hover:bg-muted rounded-l-full transition-colors"
                      onClick={() =>
                        setQuantity(Math.max(1, quantity - 1))
                      }
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">
                      {quantity}
                    </span>
                    <button
                      className="h-10 w-10 flex items-center justify-center hover:bg-muted rounded-r-full transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <Button
                  size="xl"
                  className="w-full rounded-full text-base h-13"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Redirecting to Checkout...
                    </>
                  ) : (
                    <>Buy Now — {formatPrice(product.price * quantity)}</>
                  )}
                </Button>

                <p className="text-[11px] text-muted-foreground text-center">
                  Secure checkout powered by Stripe &middot; Test card: 4242
                  4242 4242 4242
                </p>
              </div>

              <div className="h-px bg-border" />

              {/* Trust */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Truck, label: "Free Shipping" },
                  { icon: Shield, label: "Secure Payment" },
                  { icon: RotateCcw, label: "30-Day Returns" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-[11px] font-medium text-muted-foreground">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="border-t pb-16 md:pb-20">
          <div className="container pt-16">
            <h2 className="text-2xl font-bold tracking-tight mb-8">
              You may also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
