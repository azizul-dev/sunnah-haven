import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { SITE_URL } from "@/lib/constants";

const PAGES = [
  "",
  "/shop",
  "/about",
  "/contact",
  "/faq",
  "/return-policy",
  "/privacy-policy",
  "/tools/tasbih",
  "/tools/qibla",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...products.map((product) => ({ url: `${SITE_URL}/product/${product.slug}` })),
  ];
}
