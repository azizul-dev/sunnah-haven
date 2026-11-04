import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/product/ProductCard";
import ProductGallery from "@/components/product/ProductGallery";
import ProductPurchase from "@/components/product/ProductPurchase";
import SunnahReference from "@/components/product/SunnahReference";
import { categories } from "@/data/categories";
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

  return (
    <Container className="py-8 pb-32 md:pb-10">
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
        <ProductGallery category={product.category} />

        <div>
          <h1 className="font-heading text-2xl font-bold text-emerald-deep dark:text-gold sm:text-3xl">
            {product.name}
          </h1>
          <div className="mt-2 flex items-center gap-1 text-sm text-text-muted dark:text-cream/70">
            <Star size={16} className="fill-gold text-gold" aria-hidden="true" />
            {toBanglaNumber(product.rating.toFixed(1))}
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="font-heading text-3xl font-bold text-emerald-deep dark:text-gold">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-base text-text-muted line-through dark:text-cream/50">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <p className="mt-4 leading-relaxed text-text-dark dark:text-cream/90">{product.description}</p>

          <ProductPurchase product={product} />
          <SunnahReference />
        </div>
      </div>

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
