"use client";

import { Gift as GiftIcon } from "lucide-react";
import GiftCard from "@/components/product/GiftCard";
import { giftText, giftThemes } from "@/data/gift";
import { useCart } from "@/lib/cart";

const inputClass =
  "w-full rounded-xl border border-gold/50 bg-white px-4 py-3 text-sm text-text-dark dark:bg-emerald-deep dark:text-cream";

export default function HadiyaPanel() {
  const { gift, updateGift } = useCart();

  return (
    <section className="card-hover mt-6 rounded-2xl border border-gold/40 bg-white/70 p-4 dark:bg-emerald-deep/60">
      <label className="flex cursor-pointer items-center gap-3">
        <GiftIcon size={28} className="shrink-0 text-emerald-deep dark:text-gold" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <strong className="block text-sm text-emerald-deep dark:text-gold">{giftText.title}</strong>
          <span className="text-xs text-text-muted dark:text-cream/70">{giftText.subtitle}</span>
        </span>
        <input
          type="checkbox"
          checked={gift.enabled}
          onChange={(event) => updateGift({ enabled: event.target.checked })}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="relative h-6 w-11 shrink-0 rounded-full bg-gold/30 transition peer-checked:bg-gold peer-focus-visible:outline-2 peer-focus-visible:outline-gold after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5"
        />
      </label>

      {gift.enabled && (
        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="gift-message" className="mb-1 block text-sm font-medium text-text-dark dark:text-cream">{giftText.message}</label>
            <textarea
              id="gift-message"
              rows={3}
              maxLength={200}
              value={gift.message}
              onChange={(event) => updateGift({ message: event.target.value })}
              placeholder={giftText.messagePlaceholder}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="gift-from" className="mb-1 block text-sm font-medium text-text-dark dark:text-cream">{giftText.from}</label>
            <input
              id="gift-from"
              maxLength={40}
              value={gift.from}
              onChange={(event) => updateGift({ from: event.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-text-dark dark:text-cream">{giftText.theme}</p>
            <div className="flex flex-wrap gap-2">
              {giftThemes.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => updateGift({ theme: item.key })}
                  aria-pressed={gift.theme === item.key}
                  className={`rounded-full border px-4 py-1.5 text-sm transition ${
                    gift.theme === item.key
                      ? "border-gold bg-gold font-semibold text-emerald-night"
                      : "border-gold/40 bg-white text-text-dark hover:border-gold dark:bg-emerald-deep dark:text-cream"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-text-dark dark:text-cream">{giftText.preview}</p>
            <GiftCard message={gift.message} from={gift.from} theme={gift.theme} />
          </div>
        </div>
      )}
    </section>
  );
}
