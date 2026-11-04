import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/product/ProductCard";
import { homeText } from "@/data/home";
import { products } from "@/data/products";

export default function NewArrivals() {
  const items = products.filter((p) => p.isNew);

  return (
    <section>
      <Container>
        <SectionTitle title={homeText.newTitle} subtitle={homeText.newSubtitle} />
        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 pt-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {items.map((product) => (
            <li key={product.slug} className="w-44 shrink-0 snap-start sm:w-52">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
