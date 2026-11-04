import { BadgeCheck, RotateCcw, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { sectionText, type WhyItem } from "@/data/sections";

const icons: Record<WhyItem["id"], LucideIcon> = {
  halal: ShieldCheck,
  pure: BadgeCheck,
  delivery: Truck,
  return: RotateCcw,
};

export default function WhyUs() {
  return (
    <section>
      <Container>
        <SectionTitle title={sectionText.whyTitle} subtitle={sectionText.whySubtitle} />
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {sectionText.whyItems.map((item) => {
            const Icon = icons[item.id];
            return (
              <li
                key={item.id}
                className="card-hover flex flex-col items-center rounded-2xl border border-gold/30 bg-white p-4 text-center shadow-sm dark:bg-emerald-deep sm:p-6"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-deep text-gold dark:bg-emerald-night">
                  <Icon size={26} aria-hidden="true" />
                </span>
                <h3 className="mt-3 font-heading text-base font-bold text-emerald-deep dark:text-gold">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-text-muted dark:text-cream/70 sm:text-sm">
                  {item.text}
                </p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
