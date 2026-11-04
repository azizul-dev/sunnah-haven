"use client";

import { useState } from "react";
import ArchImage from "@/components/ui/ArchImage";
import ProductIcon from "@/components/ui/ProductIcon";
import { homeText } from "@/data/home";
import { productText } from "@/data/shop";
import { toBanglaNumber } from "@/lib/format";
import type { Product } from "@/lib/types";

const FRAMES = [0, 1, 2];

function Pattern() {
  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.12]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="gallery-star" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M28 6l5 14 14-5-5 14 14 5-14 5 5 14-14-5-5 14-5-14-14 5 5-14-14-5 14-5-5-14 14 5z" fill="none" stroke="#c9a24b" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#gallery-star)" />
    </svg>
  );
}

export default function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const src = `/products/${product.slug}.jpg`;
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="md:sticky md:top-24 md:h-fit">
      <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-[linear-gradient(160deg,#0b3d2e,#06261c)] px-6 pb-6 pt-8">
        <Pattern />
        <div className="group relative mx-auto max-w-xs">
          <ArchImage
            src={src}
            alt={product.name}
            sizes="(min-width: 768px) 40vw, 90vw"
            priority
            className="h-72 w-full shadow-[0_0_40px_rgba(201,162,75,0.35)] sm:h-96"
          >
            <ProductIcon category={product.category} size={110} />
          </ArchImage>
          <div className="absolute left-2 top-2 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-emerald-night">{homeText.newBadge}</span>
            )}
            {discount > 0 && (
              <span className="rounded-full bg-red-700 px-3 py-1 text-xs font-bold text-white">-{toBanglaNumber(discount)}%</span>
            )}
          </div>
        </div>

        <div className="relative mt-5 flex justify-center gap-3">
          {FRAMES.map((index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`${productText.gallery} ${index + 1}`}
              aria-pressed={active === index}
              className={`rounded-t-full transition ${active === index ? "ring-2 ring-gold" : "opacity-60 hover:opacity-100"}`}
            >
              <ArchImage src={src} alt="" sizes="48px" className="h-16 w-12">
                <ProductIcon category={product.category} size={22} />
              </ArchImage>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
