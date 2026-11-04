"use client";

import { useState } from "react";
import { Banknote, Check, RotateCcw, Truck, type LucideIcon } from "lucide-react";
import SunnahReference from "@/components/product/SunnahReference";
import { productPageText } from "@/data/productPage";
import type { Product } from "@/lib/types";

type TabKey = "details" | "sunnah" | "delivery";

const deliveryIcons: Record<string, LucideIcon> = {
  speed: Truck,
  cod: Banknote,
  return: RotateCcw,
};

const tabs: { key: TabKey; label: string }[] = [
  { key: "details", label: productPageText.tabs.details },
  { key: "sunnah", label: productPageText.tabs.sunnah },
  { key: "delivery", label: productPageText.tabs.delivery },
];

export default function ProductTabs({ product }: { product: Product }) {
  const [active, setActive] = useState<TabKey>("details");

  return (
    <section className="mt-12 rounded-3xl border border-gold/30 bg-white/70 p-4 dark:bg-emerald-deep/60 sm:p-6">
      <div role="tablist" className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            id={`tab-${tab.key}`}
            aria-selected={active === tab.key}
            aria-controls={`panel-${tab.key}`}
            onClick={() => setActive(tab.key)}
            className={`shrink-0 rounded-full border px-5 py-2 text-sm transition ${
              active === tab.key
                ? "border-gold bg-gold font-semibold text-emerald-night"
                : "border-gold/40 text-text-dark hover:border-gold dark:text-cream"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} className="mt-5">
        {active === "details" && (
          <div>
            <p className="leading-relaxed text-text-dark dark:text-cream/90">{product.description}</p>
            <h3 className="mb-3 mt-6 font-heading text-base font-bold text-emerald-deep dark:text-gold">
              {productPageText.highlightsTitle}
            </h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {productPageText.highlights.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-text-dark dark:text-cream">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-emerald-night">
                    <Check size={13} aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === "sunnah" && <SunnahReference />}

        {active === "delivery" && (
          <ul className="grid gap-3 sm:grid-cols-3">
            {productPageText.deliveryItems.map((item) => {
              const Icon = deliveryIcons[item.id];
              return (
                <li key={item.id} className="card-hover rounded-2xl border border-gold/30 bg-white p-4 dark:bg-emerald-deep">
                  <Icon size={24} className="text-gold" aria-hidden="true" />
                  <h3 className="mt-2 text-sm font-bold text-emerald-deep dark:text-gold">{item.title}</h3>
                  <p className="mt-1 text-xs text-text-muted dark:text-cream/70">{item.text}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
