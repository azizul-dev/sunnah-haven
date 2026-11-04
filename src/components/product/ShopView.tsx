"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import BottomSheet from "@/components/ui/BottomSheet";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import FilterOptions from "@/components/product/FilterOptions";
import ProductCard from "@/components/product/ProductCard";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { shopText, type SortKey } from "@/data/shop";
import { toBanglaNumber } from "@/lib/format";
import type { CategorySlug } from "@/lib/types";

function parseCategory(value: string | null): CategorySlug | null {
  const match = categories.find((c) => c.slug === value);
  return match ? match.slug : null;
}

function chipClass(active: boolean): string {
  return `shrink-0 rounded-full border px-4 py-2 text-sm transition ${
    active
      ? "border-gold bg-gold font-semibold text-emerald-night"
      : "border-gold/40 bg-white text-text-dark hover:border-gold dark:bg-emerald-deep dark:text-cream"
  }`;
}

export default function ShopView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = parseCategory(searchParams.get("category"));

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("default");
  const [sheetOpen, setSheetOpen] = useState(false);

  function changeCategory(next: CategorySlug | null) {
    router.replace(next ? `${pathname}?category=${next}` : pathname, { scroll: false });
  }

  const visible = useMemo(() => {
    const text = query.trim().toLowerCase();
    const filtered = products.filter(
      (p) =>
        (!category || p.category === category) &&
        (!text || p.name.toLowerCase().includes(text) || p.description.toLowerCase().includes(text)),
    );
    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [category, query, sort]);

  return (
    <Container className="py-10">
      <SectionTitle title={shopText.title} />

      <div className="mb-4 flex gap-3">
        <div className="relative flex-1">
          <label htmlFor="shop-search" className="sr-only">{shopText.searchPlaceholder}</label>
          <Search size={18} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={shopText.searchPlaceholder}
            className="w-full rounded-full border border-gold/50 bg-white py-3 pl-11 pr-4 text-sm text-text-dark dark:bg-emerald-deep dark:text-cream"
          />
        </div>

        <div className="hidden lg:block">
          <label htmlFor="shop-sort" className="sr-only">{shopText.sortTitle}</label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="h-full rounded-full border border-gold/50 bg-white px-5 text-sm text-text-dark dark:bg-emerald-deep dark:text-cream"
          >
            {shopText.sortOptions.map((option) => (
              <option key={option.key} value={option.key}>{option.label}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="flex items-center gap-2 rounded-full border border-gold bg-white px-4 text-sm font-medium text-emerald-deep dark:bg-emerald-deep dark:text-gold lg:hidden"
        >
          <SlidersHorizontal size={18} aria-hidden="true" />
          {shopText.filter}
        </button>
      </div>

      <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0 [&::-webkit-scrollbar]:hidden">
        <button type="button" onClick={() => changeCategory(null)} aria-pressed={category === null} className={chipClass(category === null)}>
          {shopText.all}
        </button>
        {categories.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => changeCategory(item.slug)}
            aria-pressed={category === item.slug}
            className={chipClass(category === item.slug)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <p className="mb-4 text-sm text-text-muted dark:text-cream/70">
        {toBanglaNumber(visible.length)} {shopText.count}
      </p>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-text-muted dark:text-cream/70">{shopText.empty}</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}

      <BottomSheet open={sheetOpen} title={shopText.filter} onClose={() => setSheetOpen(false)}>
        <FilterOptions category={category} sort={sort} onCategory={changeCategory} onSort={setSort} />
        <Button onClick={() => setSheetOpen(false)} className="mt-6 w-full">
          {toBanglaNumber(visible.length)} {shopText.showResults}
        </Button>
      </BottomSheet>
    </Container>
  );
}
