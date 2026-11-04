import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/ui/ContactForm";
import SectionTitle from "@/components/ui/SectionTitle";
import { contactText } from "@/data/pages";
import { PHONE_NUMBER, WHATSAPP_NUMBER } from "@/lib/constants";
import { toBanglaNumber } from "@/lib/format";

export const metadata: Metadata = {
  title: "যোগাযোগ | Sunnah Haven",
  description: "ফোন, হোয়াটসঅ্যাপ বা মেসেজে আমাদের সাথে যোগাযোগ করুন।",
};

type InfoCard = { label: string; value: string; Icon: LucideIcon; href?: string };

const cards: InfoCard[] = [
  { label: contactText.phone, value: toBanglaNumber(PHONE_NUMBER), Icon: Phone, href: `tel:${PHONE_NUMBER}` },
  { label: contactText.whatsapp, value: contactText.whatsappAction, Icon: MessageCircle, href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { label: contactText.address, value: contactText.addressValue, Icon: MapPin },
  { label: contactText.hours, value: contactText.hoursValue, Icon: Clock },
];

export default function ContactPage() {
  return (
    <Container className="py-10 pb-28 md:pb-14">
      <SectionTitle title={contactText.title} subtitle={contactText.subtitle} />

      <div className="grid gap-8 lg:grid-cols-2">
        <ul className="grid gap-3 sm:grid-cols-2">
          {cards.map(({ label, value, Icon, href }) => {
            const content = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-deep text-gold dark:bg-emerald-night">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <span className="mt-3 text-xs text-text-muted dark:text-cream/70">{label}</span>
                <span className="mt-1 text-sm font-semibold text-emerald-deep dark:text-gold">{value}</span>
              </>
            );
            const cls = "card-hover flex h-full flex-col items-center rounded-2xl border border-gold/30 bg-white p-5 text-center dark:bg-emerald-deep";
            return (
              <li key={label}>
                {href ? (
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={cls}>
                    {content}
                  </a>
                ) : (
                  <div className={cls}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>

        <section className="card-hover rounded-3xl border border-gold/40 bg-white/70 p-5 dark:bg-emerald-deep/60 sm:p-6">
          <h2 className="mb-5 font-heading text-lg font-bold text-emerald-deep dark:text-gold">{contactText.formTitle}</h2>
          <ContactForm />
        </section>
      </div>
    </Container>
  );
}
