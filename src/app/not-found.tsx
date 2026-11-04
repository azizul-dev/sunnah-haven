import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { notFoundText } from "@/data/pages";

export default function NotFound() {
  return (
    <Container className="py-16 pb-32 text-center md:pb-20">
      <div className="mx-auto flex h-64 w-52 flex-col items-center justify-center rounded-t-full border border-gold/60 bg-[linear-gradient(160deg,#0b3d2e,#06261c)] shadow-[0_0_40px_rgba(201,162,75,0.3)]">
        <span className="font-display text-6xl font-bold text-gold">404</span>
      </div>
      <h1 className="mt-8 font-heading text-2xl font-bold text-emerald-deep dark:text-gold">{notFoundText.title}</h1>
      <p className="mt-2 text-sm text-text-muted dark:text-cream/70">{notFoundText.text}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button href="/">{notFoundText.home}</Button>
        <Button href="/shop" className="!bg-transparent !text-emerald-deep border border-gold dark:!text-gold">
          {notFoundText.shop}
        </Button>
      </div>
    </Container>
  );
}
