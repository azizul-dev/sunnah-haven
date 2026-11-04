"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/product/ProductCard";
import { categories } from "@/data/categories";
import { searchText } from "@/data/pages";
import { products } from "@/data/products";
import { toBanglaNumber } from "@/lib/format";

export default function SearchView() {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams().get("q") ?? "";
  const [input, setInput] = useState(query);

  const results = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return [];
    return products.filter(
      (p) => p.name.toLowerCase().includes(text) || p.description.toLowerCase().includes(text),
    );
  }, [query]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    router.replace(text ? `${pathname}?q=${encodeURIComponent(text)}` : pathname);
  }

  return (
    <Container className="py-10 pb-28 md:pb-14">
      <SectionTitle title={searchText.title} />

      <form onSubmit={handleSubmit} className="mx-auto mb-8 flex max-w-xl gap-3" role="search">
        <div className="relative flex-1">
          <label htmlFor="search-input" className="sr-only">{searchText.placeholder}</label>
          <Search size={18} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            id="search-input"
            type="search"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={searchText.placeholder}
            autoFocus
            className="w-full rounded-full border border-gold/50 bg-white py-3 pl-11 pr-4 text-sm text-text-dark dark:bg-emerald-deep dark:text-cream"
          />
        </div>
        <Button type="submit">{searchText.button}</Button>
      </form>

      {query.trim() === "" ? (
        <div className="text-center">
          <p className="mb-4 text-sm text-text-muted dark:text-cream/70">{searchText.browse}</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/shop?category=${category.slug}`}
                  className="card-hover block rounded-full border border-gold/40 bg-white px-4 py-2 text-sm text-text-dark dark:bg-emerald-deep dark:text-cream"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : results.length === 0 ? (
        <p className="py-10 text-center text-text-muted dark:text-cream/70">{searchText.empty}</p>
      ) : (
        <>
          <p className="mb-4 text-sm text-text-muted dark:text-cream/70">
            “{query}” {searchText.resultsFor}: {toBanglaNumber(results.length)} {searchText.count}
          </p>
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {results.map((product) => (
              <li key={product.slug}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </>
      )}
    </Container>
  );
}
