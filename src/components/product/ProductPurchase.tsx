"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import Button from "@/components/ui/Button";
import { productText } from "@/data/shop";
import { useCart } from "@/lib/cart";
import { formatPrice, toBanglaNumber } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [variant, setVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [added]);

  function handleAdd() {
    addItem(
      { slug: product.slug, name: `${product.name} (${variant})`, price: product.price },
      quantity,
    );
    setAdded(true);
  }

  const label = added ? productText.added : productText.addToCart;

  return (
    <>
      <div className="mt-6">
        <h2 className="mb-2 text-sm font-semibold text-text-dark dark:text-cream">{productText.variant}</h2>
        <div className="flex flex-wrap gap-2">
          {product.variants.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setVariant(item)}
              aria-pressed={variant === item}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                variant === item
                  ? "border-gold bg-gold font-semibold text-emerald-night"
                  : "border-gold/40 text-text-dark hover:border-gold dark:text-cream"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-2 text-sm font-semibold text-text-dark dark:text-cream">{productText.quantity}</h2>
        <div className="inline-flex items-center rounded-full border border-gold/50 bg-white dark:bg-emerald-deep">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label={productText.decrease}
            className="rounded-full p-3 text-emerald-deep dark:text-gold"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center font-semibold text-text-dark dark:text-cream" aria-live="polite">
            {toBanglaNumber(quantity)}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(20, q + 1))}
            aria-label={productText.increase}
            className="rounded-full p-3 text-emerald-deep dark:text-gold"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="mt-8 hidden gap-3 md:flex">
        <Button onClick={handleAdd} className="gap-2">
          <ShoppingBag size={18} aria-hidden="true" />
          {label}
        </Button>
        <Button href="/checkout" onClick={handleAdd}>
          {productText.buyNow}
        </Button>
      </div>

      <div className="fixed inset-x-0 bottom-[calc(3.6rem+env(safe-area-inset-bottom))] z-30 border-t border-gold/40 bg-cream/95 px-4 py-3 pr-20 backdrop-blur dark:bg-emerald-night/95 md:hidden">
        <div className="flex items-center justify-between gap-3">
          <span className="font-heading text-lg font-bold text-emerald-deep dark:text-gold">
            {formatPrice(product.price * quantity)}
          </span>
          <Button onClick={handleAdd} className="gap-2 !px-5 !py-2.5">
            <ShoppingBag size={16} aria-hidden="true" />
            {label}
          </Button>
        </div>
      </div>
    </>
  );
}
