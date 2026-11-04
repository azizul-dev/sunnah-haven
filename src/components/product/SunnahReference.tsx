import { hadithList } from "@/data/hadith";
import { productText } from "@/data/shop";

export default function SunnahReference() {
  const hadith = hadithList[0];

  return (
    <div className="rounded-2xl border border-gold/40 bg-[linear-gradient(135deg,#0b3d2e,#06261c)] p-5 text-center">
      <h3 className="font-heading text-lg font-bold text-gold">{productText.sunnahTitle}</h3>
      <p dir="rtl" lang="ar" className="mt-4 font-arabic text-2xl leading-[1.9] text-gold-light">
        {hadith.arabic}
      </p>
      <div className="mx-auto my-3 h-px w-20 bg-gold/50" />
      <p className="text-sm leading-relaxed text-cream/90">{hadith.bangla}</p>
      <p className="mt-2 text-xs text-gold-light">{hadith.source}</p>
      <p className="mt-3 text-[11px] text-cream/50">{productText.sunnahNote}</p>
    </div>
  );
}
