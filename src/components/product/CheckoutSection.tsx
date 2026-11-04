import { toBanglaNumber } from "@/lib/format";

type CheckoutSectionProps = {
  number: number;
  title: string;
  children: React.ReactNode;
};

export default function CheckoutSection({ number, title, children }: CheckoutSectionProps) {
  return (
    <section className="card-hover rounded-3xl border border-gold/30 bg-white/70 p-5 dark:bg-emerald-deep/60 sm:p-6">
      <h2 className="mb-5 flex items-center gap-3 font-heading text-lg font-bold text-emerald-deep dark:text-gold">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-deep text-sm text-gold dark:bg-gold dark:text-emerald-night">
          {toBanglaNumber(number)}
        </span>
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}
