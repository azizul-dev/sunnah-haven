import { hadithList } from "@/data/hadith";
import { productText } from "@/data/shop";

export default function SunnahReference() {
  const hadith = hadithList[0];

  return (
    <section className="card-hover mt-10 rounded-2xl border border-gold/50 bg-white p-5 dark:bg-emerald-deep">
      <h2 className="font-heading text-lg font-bold text-emerald-deep dark:text-gold">
        {productText.sunnahTitle}
      </h2>
      <p dir="rtl" lang="ar" className="mt-4 font-arabic text-2xl leading-[1.9] text-emerald-deep dark:text-gold-light">
        {hadith.arabic}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-text-dark dark:text-cream">{hadith.bangla}</p>
      <p className="mt-2 text-xs text-text-muted dark:text-cream/70">{hadith.source}</p>
      <p className="mt-3 text-[11px] text-text-muted dark:text-cream/50">{productText.sunnahNote}</p>
    </section>
  );
}
