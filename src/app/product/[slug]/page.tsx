import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/product/ProductCard";
import ProductGallery from "@/components/product/ProductGallery";
import ProductPurchase from "@/components/product/ProductPurchase";
import ProductTabs from "@/components/product/ProductTabs";
import TrustRow from "@/components/product/TrustRow";
import HadiyaPanel from "@/components/product/HadiyaPanel";
import { categories } from "@/data/categories";
import { productPageText } from "@/data/productPage";
import { products } from "@/data/products";
import { productText } from "@/data/shop";
import { formatPrice, toBanglaNumber } from "@/lib/format";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return { title: `${product.name} | Sunnah Haven`, description: product.description };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const category = categories.find((c) => c.slug === product.category);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const saving = product.oldPrice ? product.oldPrice - product.price : 0;

  return (
    <Container className="py-8 pb-40 md:pb-12">
      <nav aria-label="breadcrumb" className="mb-6 text-sm text-text-muted dark:text-cream/70">
        <Link href="/shop" className="hover:text-gold">{productText.breadcrumbShop}</Link>
        {category && (
          <>
            {" / "}
            <Link href={`/shop?category=${category.slug}`} className="hover:text-gold">{category.name}</Link>
          </>
        )}
      </nav>

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <ProductGallery product={product} />

        <div>
          {category && (
            <Link
              href={`/shop?category=${category.slug}`}
              className="inline-block rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-xs font-medium text-emerald-deep transition hover:bg-gold/25 dark:text-gold"
            >
              {category.name}
            </Link>
          )}
          <h1 className="mt-3 font-heading text-2xl font-bold leading-snug text-emerald-deep dark:text-gold sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span className="flex items-center gap-0.5" role="img" aria-label={`${product.rating} স্টার`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  aria-hidden="true"
                  className={i < Math.round(product.rating) ? "fill-gold text-gold" : "text-gold/30"}
                />
              ))}
              <span className="ml-1.5 text-text-muted dark:text-cream/70">{toBanglaNumber(product.rating.toFixed(1))}</span>
            </span>
            <span className="flex items-center gap-1 text-emerald-deep dark:text-gold-light">
              <CheckCircle2 size={16} aria-hidden="true" />
              {productPageText.inStock}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-baseline gap-3 rounded-2xl border border-gold/30 bg-white px-4 py-3 dark:bg-emerald-deep">
            <span className="font-heading text-3xl font-bold text-emerald-deep dark:text-gold">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-base text-text-muted line-through dark:text-cream/50">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            {saving > 0 && (
              <span className="rounded-full bg-red-700 px-3 py-0.5 text-xs font-semibold text-white">
                {formatPrice(saving)} {productPageText.save}
              </span>
            )}
          </div>

          <p className="mt-4 leading-relaxed text-text-dark dark:text-cream/90">{product.description}</p>

          <ProductPurchase product={product} />
          <TrustRow />
          <HadiyaPanel />
        </div>
      </div>

      <ProductTabs product={product} />

      {related.length > 0 && (
        <section className="mt-16">
          <SectionTitle title={productText.relatedTitle} />
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
            {related.map((item) => (
              <li key={item.slug}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}
