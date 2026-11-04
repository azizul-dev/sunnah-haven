"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import ArchFrame from "@/components/ui/ArchFrame";
import Button from "@/components/ui/Button";
import ProductIcon from "@/components/ui/ProductIcon";
import { homeText } from "@/data/home";
import { useCart } from "@/lib/cart";
import { formatPrice, toBanglaNumber } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [added]);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  function handleAdd() {
    addItem({ slug: product.slug, name: product.name, price: product.price });
    setAdded(true);
  }

  return (
    <article className="flex h-full flex-col rounded-2xl border border-gold/30 bg-white p-3 shadow-sm card-hover dark:bg-emerald-deep">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative">
          <ArchFrame className="h-40 w-full">
            <ProductIcon category={product.category} size={48} />
          </ArchFrame>
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold text-emerald-night">
                {homeText.newBadge}
              </span>
            )}
            {discount > 0 && (
              <span className="rounded-full bg-red-700 px-2 py-0.5 text-[10px] font-semibold text-white">
                -{toBanglaNumber(discount)}%
              </span>
            )}
          </div>
        </div>
        <h3 className="mt-3 line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-text-dark dark:text-cream">
          {product.name}
        </h3>
      </Link>

      <div className="mt-1 flex items-center gap-1 text-xs text-text-muted dark:text-cream/70">
        <Star size={14} className="fill-gold text-gold" aria-hidden="true" />
        {toBanglaNumber(product.rating.toFixed(1))}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-bold text-emerald-deep dark:text-gold">
          {formatPrice(product.price)}
        </span>
        {product.oldPrice && (
          <span className="text-xs text-text-muted line-through dark:text-cream/50">
            {formatPrice(product.oldPrice)}
          </span>
        )}
      </div>

      <Button onClick={handleAdd} className="mt-3 w-full gap-2 !px-3 !py-2 text-xs">
        <ShoppingBag size={16} aria-hidden="true" />
        {added ? homeText.added : homeText.addToCart}
      </Button>
    </article>
  );
}
