import Container from "@/components/ui/Container";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <Container className="py-20 text-center">
      <h1 className="font-heading text-3xl text-emerald-deep dark:text-gold">
        {title}
      </h1>
      <p className="mt-4 text-text-muted dark:text-cream/70">
        এই পেজটি শীঘ্রই আসছে।
      </p>
    </Container>
  );
}
