import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { faqText } from "@/data/pages";

export const metadata: Metadata = {
  title: "সচরাচর জিজ্ঞাসা | Sunnah Haven",
  description: "অর্ডার, ডেলিভারি ও রিটার্ন নিয়ে সাধারণ প্রশ্নের উত্তর।",
};

export default function FaqPage() {
  return (
    <Container className="max-w-3xl py-10 pb-28 md:pb-14">
      <SectionTitle title={faqText.title} subtitle={faqText.subtitle} />
      <ul className="space-y-3">
        {faqText.items.map((item) => (
          <li key={item.q}>
            <details className="card-hover group rounded-2xl border border-gold/30 bg-white p-4 dark:bg-emerald-deep">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-emerald-deep dark:text-gold [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown size={18} aria-hidden="true" className="shrink-0 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 border-t border-gold/20 pt-3 text-sm leading-relaxed text-text-dark dark:text-cream/90">
                {item.a}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </Container>
  );
}
