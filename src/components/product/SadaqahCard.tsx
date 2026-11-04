import { HeartHandshake } from "lucide-react";
import { checkoutText } from "@/data/checkout";
import { formatPrice } from "@/lib/format";

type SadaqahCardProps = {
  amount: number;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export default function SadaqahCard({ amount, checked, onChange }: SadaqahCardProps) {
  return (
    <label className="card-hover mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-gold/40 bg-gold/10 p-3">
      <HeartHandshake size={28} className="shrink-0 text-emerald-deep dark:text-gold" aria-hidden="true" />
      <span className="min-w-0 flex-1 text-xs text-text-dark dark:text-cream">
        <strong className="block text-sm">
          {checkoutText.sadaqah} ({formatPrice(amount)})
        </strong>
        {checkoutText.sadaqahNote}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="relative h-6 w-11 shrink-0 rounded-full bg-gold/30 transition peer-checked:bg-gold peer-focus-visible:outline-2 peer-focus-visible:outline-gold after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5"
      />
    </label>
  );
}
