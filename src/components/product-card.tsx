"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#f6f5f3] mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge
              variant="secondary"
              className="bg-white/90 backdrop-blur text-foreground text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full"
            >
              {product.badge}
            </Badge>
          </div>
        )}

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur text-foreground text-xs font-medium px-4 py-2.5 rounded-full shadow-lg">
              <Eye className="h-3.5 w-3.5" />
              Quick View
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-foreground text-foreground" />
            <span className="text-[11px] font-medium">{product.rating}</span>
          </div>
        </div>
        <h3 className="font-medium text-sm group-hover:underline underline-offset-4 decoration-1 transition-all">
          {product.name}
        </h3>
        <p className="text-sm font-medium">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
