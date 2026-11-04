import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import type { LegalSection } from "@/data/pages";

type LegalPageProps = {
  title: string;
  subtitle: string;
  sections: LegalSection[];
};

export default function LegalPage({ title, subtitle, sections }: LegalPageProps) {
  return (
    <Container className="max-w-3xl py-10 pb-28 md:pb-14">
      <SectionTitle title={title} subtitle={subtitle} />
      <ol className="space-y-4">
        {sections.map((section, index) => (
          <li
            key={section.title}
            className="card-hover rounded-2xl border border-gold/30 bg-white p-5 dark:bg-emerald-deep"
          >
            <h2 className="flex items-center gap-3 font-heading text-base font-bold text-emerald-deep dark:text-gold">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-deep text-xs text-gold dark:bg-gold dark:text-emerald-night">
                {index + 1}
              </span>
              {section.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-dark dark:text-cream/90">{section.text}</p>
          </li>
        ))}
      </ol>
    </Container>
  );
}
