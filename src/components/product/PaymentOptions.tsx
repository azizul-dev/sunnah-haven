import { Banknote, Check, Smartphone, Wallet, type LucideIcon } from "lucide-react";
import { checkoutText, checkoutUi } from "@/data/checkout";

export type PaymentMethod = "cod" | "bkash" | "nagad";

const options: { key: PaymentMethod; label: string; Icon: LucideIcon }[] = [
  { key: "cod", label: checkoutText.cod, Icon: Banknote },
  { key: "bkash", label: checkoutText.bkash, Icon: Smartphone },
  { key: "nagad", label: checkoutText.nagad, Icon: Wallet },
];

type PaymentOptionsProps = {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
};

export default function PaymentOptions({ value, onChange }: PaymentOptionsProps) {
  return (
    <fieldset>
      <legend className="sr-only">{checkoutText.payment}</legend>
      <div className="grid gap-3 sm:grid-cols-3">
        {options.map(({ key, label, Icon }) => (
          <label key={key} className="relative cursor-pointer">
            <input
              type="radio"
              name="payment"
              checked={value === key}
              onChange={() => onChange(key)}
              className="peer sr-only"
            />
            <div className="card-hover flex h-full flex-col items-center gap-2 rounded-2xl border border-gold/40 bg-white p-4 text-center peer-checked:border-gold peer-checked:bg-gold/15! peer-focus-visible:outline-2 peer-focus-visible:outline-gold dark:bg-emerald-deep">
              <Icon size={26} className="text-emerald-deep dark:text-gold" aria-hidden="true" />
              <span className="text-sm font-semibold text-text-dark dark:text-cream">{label}</span>
              <span className="text-[11px] text-text-muted dark:text-cream/60">
                {checkoutUi.paymentHints[key]}
              </span>
            </div>
            {value === key && (
              <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-emerald-night">
                <Check size={13} aria-hidden="true" />
              </span>
            )}
          </label>
        ))}
      </div>
      <p className="mt-3 text-xs text-text-muted dark:text-cream/60">{checkoutText.paymentNote}</p>
    </fieldset>
  );
}
