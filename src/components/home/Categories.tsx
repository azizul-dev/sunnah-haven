import Link from "next/link";
import Container from "@/components/ui/Container";
import ProductIcon from "@/components/ui/ProductIcon";
import SectionTitle from "@/components/ui/SectionTitle";
import { categories } from "@/data/categories";
import { homeText } from "@/data/home";

export default function Categories() {
  return (
    <section>
      <Container>
        <SectionTitle
          title={homeText.categoriesTitle}
          subtitle={homeText.categoriesSubtitle}
        />
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/shop?category=${category.slug}`}
                className="group flex flex-col items-center gap-2 rounded-t-full border border-gold/40 bg-white px-2 pb-4 pt-8 text-center shadow-sm card-hover dark:bg-emerald-deep"
              >
                <ProductIcon
                  category={category.slug}
                  size={30}
                  className="text-emerald-deep transition group-hover:scale-110 dark:text-gold"
                />
                <span className="text-xs font-medium text-text-dark dark:text-cream sm:text-sm">
                  {category.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
