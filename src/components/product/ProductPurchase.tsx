"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Minus, Plus, ShoppingBag, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import { buildWhatsAppMessage, productPageText } from "@/data/productPage";
import { productText } from "@/data/shop";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useCart } from "@/lib/cart";
import { formatPrice, toBanglaNumber } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductPurchase({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [variant, setVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [added]);

  const total = product.price * quantity;
  const label = added ? productText.added : productText.addToCart;
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppMessage(product.name, variant, quantity, formatPrice(total)),
  )}`;

  function addToCart() {
    addItem(
      { slug: product.slug, name: `${product.name} (${variant})`, price: product.price },
      quantity,
    );
  }

  function handleAdd() {
    addToCart();
    setAdded(true);
  }

  function handleBuyNow() {
    addToCart();
    router.push("/checkout");
  }

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
                  ? "border-gold bg-gold font-semibold text-emerald-night shadow-[0_0_14px_rgba(226,199,125,0.5)]"
                  : "border-gold/40 bg-white text-text-dark hover:border-gold dark:bg-emerald-deep dark:text-cream"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="mb-2 text-sm font-semibold text-text-dark dark:text-cream">{productText.quantity}</h2>
          <div className="inline-flex items-center rounded-full border border-gold/50 bg-white dark:bg-emerald-deep">
            <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label={productText.decrease} className="rounded-full p-3 text-emerald-deep dark:text-gold">
              <Minus size={16} />
            </button>
            <span className="w-10 text-center font-semibold text-text-dark dark:text-cream" aria-live="polite">
              {toBanglaNumber(quantity)}
            </span>
            <button type="button" onClick={() => setQuantity((q) => Math.min(20, q + 1))} aria-label={productText.increase} className="rounded-full p-3 text-emerald-deep dark:text-gold">
              <Plus size={16} />
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-text-muted dark:text-cream/70">{productPageText.total}</p>
          <p className="font-heading text-2xl font-bold text-emerald-deep dark:text-gold">{formatPrice(total)}</p>
        </div>
      </div>

      <div className="mt-6 hidden gap-3 md:flex">
        <Button onClick={handleAdd} className="flex-1 gap-2">
          <ShoppingBag size={18} aria-hidden="true" />
          {label}
        </Button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-deep px-6 py-3 text-sm font-semibold text-gold transition hover:bg-emerald-night hover:shadow-[0_0_20px_rgba(201,162,75,0.4)] dark:border dark:border-gold/50"
        >
          <Zap size={18} aria-hidden="true" />
          {productText.buyNow}
        </button>
      </div>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center justify-center gap-2 rounded-full border border-[#25D366] px-6 py-3 text-sm font-semibold text-[#128C7E] transition hover:bg-[#25D366] hover:text-white dark:text-[#25D366] dark:hover:text-white"
      >
        <MessageCircle size={18} aria-hidden="true" />
        {productPageText.whatsappOrder}
      </a>

      <div className="fixed inset-x-0 bottom-[calc(3.6rem+env(safe-area-inset-bottom))] z-30 border-t border-gold/40 bg-cream/95 px-4 py-3 pr-20 backdrop-blur dark:bg-emerald-night/95 md:hidden">
        <div className="flex items-center justify-between gap-3">
          <span className="font-heading text-lg font-bold text-emerald-deep dark:text-gold">{formatPrice(total)}</span>
          <div className="flex gap-2">
            <Button onClick={handleAdd} className="gap-2 !px-4 !py-2.5">
              <ShoppingBag size={16} aria-hidden="true" />
              {label}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
