import { Minus, Plus } from "lucide-react";
import { toBanglaNumber } from "@/lib/format";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  decreaseLabel: string;
  increaseLabel: string;
};

export default function QuantityStepper({ value, onChange, decreaseLabel, increaseLabel }: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-gold/50 bg-white dark:bg-emerald-deep">
      <button type="button" onClick={() => onChange(value - 1)} aria-label={decreaseLabel} className="rounded-full p-3 text-emerald-deep dark:text-gold">
        <Minus size={14} />
      </button>
      <span className="w-8 text-center text-sm font-semibold text-text-dark dark:text-cream" aria-live="polite">
        {toBanglaNumber(value)}
      </span>
      <button type="button" onClick={() => onChange(Math.min(20, value + 1))} aria-label={increaseLabel} className="rounded-full p-3 text-emerald-deep dark:text-gold">
        <Plus size={14} />
      </button>
    </div>
  );
}
