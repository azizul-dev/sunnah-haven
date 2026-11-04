"use client";

import { Gift } from "lucide-react";
import { giftText } from "@/data/gift";
import { useCart } from "@/lib/cart";

export default function GiftSummary() {
  const { gift } = useCart();
  if (!gift.enabled) return null;

  return (
    <div className="mt-4 rounded-2xl border border-gold/40 bg-gold/10 p-3 text-xs text-text-dark dark:text-cream">
      <p className="flex items-center gap-2 text-sm font-semibold text-emerald-deep dark:text-gold">
        <Gift size={16} aria-hidden="true" />
        {giftText.summaryTitle}
      </p>
      {gift.message.trim() && <p className="mt-2 whitespace-pre-wrap break-words">{gift.message}</p>}
      {gift.from.trim() && <p className="mt-1 font-semibold">{giftText.fromPrefix} {gift.from}</p>}
      <p className="mt-2 text-text-muted dark:text-cream/70">{giftText.hidePrice}</p>
    </div>
  );
}
