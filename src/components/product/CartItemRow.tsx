"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import ArchFrame from "@/components/ui/ArchFrame";
import ProductIcon from "@/components/ui/ProductIcon";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { cartText, cartUi } from "@/data/checkout";
import { products } from "@/data/products";
import { useCart, type CartItem } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export default function CartItemRow({ item }: { item: CartItem }) {
  const { setQuantity, removeItem } = useCart();
  const category = products.find((p) => p.slug === item.slug)?.category;

  return (
    <li className="card-hover flex gap-4 rounded-2xl border border-gold/30 bg-white p-3 dark:bg-emerald-deep sm:p-4">
      <Link href={`/product/${item.slug}`} className="shrink-0" aria-label={item.name}>
        <ArchFrame className="h-28 w-20 sm:h-32 sm:w-24">
          {category && <ProductIcon category={category} size={34} />}
        </ArchFrame>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <Link
            href={`/product/${item.slug}`}
            className="line-clamp-2 text-sm font-semibold text-text-dark transition hover:text-emerald-deep dark:text-cream dark:hover:text-gold"
          >
            {item.name}
          </Link>
          <p className="mt-1 text-xs text-text-muted dark:text-cream/60">
            {formatPrice(item.price)} {cartUi.unitPrice}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <QuantityStepper
            value={item.quantity}
            onChange={(value) => setQuantity(item.slug, value)}
            decreaseLabel={cartText.decrease}
            increaseLabel={cartText.increase}
          />
          <span className="font-heading text-base font-bold text-emerald-deep dark:text-gold">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => removeItem(item.slug)}
        aria-label={cartText.remove}
        className="h-fit self-start rounded-full p-2 text-text-muted transition hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/30 dark:hover:text-red-300"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}
