import { hadithList } from "@/data/hadith";
import { sectionText } from "@/data/sections";

export default function HadithCard() {
  const hadith = hadithList[0];

  return (
    <article className="card-hover flex flex-col justify-center rounded-3xl border border-gold/50 bg-[linear-gradient(135deg,#0b3d2e,#06261c)] p-6 text-center shadow-lg sm:p-8">
      <h3 className="font-heading text-xl font-bold text-gold">{sectionText.hadithTitle}</h3>
      <p dir="rtl" lang="ar" className="mt-5 font-arabic text-2xl leading-[1.9] text-gold-light sm:text-3xl">
        {hadith.arabic}
      </p>
      <div className="mx-auto my-4 h-px w-24 bg-gold/50" />
      <p className="text-sm leading-relaxed text-cream/90 sm:text-base">{hadith.bangla}</p>
      <p className="mt-3 text-xs text-gold-light">{hadith.source}</p>
      <p className="mt-4 text-[11px] text-cream/50">{sectionText.hadithNote}</p>
    </article>
  );
}
