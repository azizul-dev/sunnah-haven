import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/product/ProductCard";
import { homeText } from "@/data/home";
import { products } from "@/data/products";

export default function BestSellers() {
  const items = products.filter((p) => p.isBestSeller);

  return (
    <section>
      <Container>
        <SectionTitle title={homeText.bestTitle} subtitle={homeText.bestSubtitle} />
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {items.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
