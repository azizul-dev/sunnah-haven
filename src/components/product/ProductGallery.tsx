"use client";

import { useState } from "react";
import ArchFrame from "@/components/ui/ArchFrame";
import ProductIcon from "@/components/ui/ProductIcon";
import { productText } from "@/data/shop";
import type { CategorySlug } from "@/lib/types";

const FRAMES = [0, 1, 2];

export default function ProductGallery({ category }: { category: CategorySlug }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <ArchFrame className="mx-auto h-64 w-full max-w-sm sm:h-96">
        <ProductIcon category={category} size={110} />
      </ArchFrame>
      <div className="mt-4 flex justify-center gap-3">
        {FRAMES.map((index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`${productText.gallery} ${index + 1}`}
            aria-pressed={active === index}
            className={`rounded-t-full ${active === index ? "ring-2 ring-gold" : "opacity-70"}`}
          >
            <ArchFrame className="h-16 w-12">
              <ProductIcon category={category} size={22} />
            </ArchFrame>
          </button>
        ))}
      </div>
    </div>
  );
}
