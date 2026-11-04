import { giftText, type GiftTheme } from "@/data/gift";

const themeClass: Record<GiftTheme, string> = {
  emerald: "bg-[linear-gradient(160deg,#0b3d2e,#06261c)] text-gold border-gold/70",
  gold: "bg-[linear-gradient(160deg,#e2c77d,#c9a24b)] text-emerald-night border-emerald-deep/60",
  cream: "bg-cream text-emerald-deep border-gold",
};

type GiftCardProps = { message: string; from: string; theme: GiftTheme };

export default function GiftCard({ message, from, theme }: GiftCardProps) {
  return (
    <div className={`relative mx-auto max-w-sm rounded-2xl border-2 p-6 text-center shadow-lg ${themeClass[theme]}`}>
      <span aria-hidden="true" className="pointer-events-none absolute inset-2 rounded-xl border border-current opacity-40" />
      <p dir="rtl" lang="ar" className="font-arabic text-xl">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
      <div className="mx-auto my-3 h-px w-16 bg-current opacity-50" />
      <p className="min-h-[3.5rem] whitespace-pre-wrap break-words text-sm leading-relaxed">
        {message.trim() || giftText.previewEmpty}
      </p>
      {from.trim() && (
        <p className="mt-3 text-xs font-semibold">
          {giftText.fromPrefix} {from}
        </p>
      )}
    </div>
  );
}
