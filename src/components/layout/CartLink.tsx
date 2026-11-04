"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { toBanglaNumber } from "@/lib/format";
import { isActive } from "@/lib/nav";

export default function CartLink() {
  const { count } = useCart();
  const pathname = usePathname();
  const active = isActive(pathname, "/cart");

  return (
    <Link
      href="/cart"
      aria-label="কার্ট"
      aria-current={active ? "page" : undefined}
      className={`relative rounded-full p-2 transition ${
        active ? "bg-gold text-emerald-night" : "text-gold hover:bg-gold/15"
      }`}
    >
      <ShoppingBag size={20} />
      {count > 0 && (
        <span
          className={`absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold ${
            active ? "bg-emerald-night text-gold" : "bg-gold text-emerald-night"
          }`}
        >
          {toBanglaNumber(count)}
        </span>
      )}
    </Link>
  );
}
