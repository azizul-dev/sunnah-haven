import { Suspense } from "react";
import type { Metadata } from "next";
import SearchView from "@/components/product/SearchView";

export const metadata: Metadata = { title: "সার্চ | Sunnah Haven" };

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchView />
    </Suspense>
  );
}
