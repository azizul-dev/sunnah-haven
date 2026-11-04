import type { Metadata } from "next";
import { Gem, HandHeart, PackageCheck, ShieldCheck, type LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { aboutText } from "@/data/pages";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে | Sunnah Haven",
  description: "সুন্নাহসম্মত ইসলামিক লাইফস্টাইল পণ্যের বিশ্বস্ত ঠিকানা।",
};

const icons: Record<string, LucideIcon> = {
  halal: ShieldCheck,
  honest: Gem,
  care: PackageCheck,
  service: HandHeart,
};

export default function AboutPage() {
  return (
    <Container className="py-10 pb-28 md:pb-14">
      <SectionTitle title={aboutText.title} subtitle={aboutText.subtitle} />

      <section className="card-hover mx-auto max-w-3xl rounded-3xl border border-gold/40 bg-[linear-gradient(135deg,#0b3d2e,#06261c)] p-6 text-center sm:p-10">
        <h2 className="font-heading text-xl font-bold text-gold">{aboutText.storyTitle}</h2>
        {aboutText.story.map((paragraph) => (
          <p key={paragraph} className="mt-4 text-sm leading-relaxed text-cream/90 sm:text-base">
            {paragraph}
          </p>
        ))}
      </section>

      <h2 className="mb-6 mt-14 text-center font-heading text-xl font-bold text-emerald-deep dark:text-gold">
        {aboutText.valuesTitle}
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {aboutText.values.map((item) => {
          const Icon = icons[item.id];
          return (
            <li
              key={item.id}
              className="card-hover flex flex-col items-center rounded-2xl border border-gold/30 bg-white p-4 text-center dark:bg-emerald-deep sm:p-6"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-deep text-gold dark:bg-emerald-night">
                <Icon size={26} aria-hidden="true" />
              </span>
              <h3 className="mt-3 font-heading text-base font-bold text-emerald-deep dark:text-gold">{item.title}</h3>
              <p className="mt-1 text-xs text-text-muted dark:text-cream/70 sm:text-sm">{item.text}</p>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 text-center">
        <Button href="/shop">{aboutText.cta}</Button>
      </div>
    </Container>
  );
}
