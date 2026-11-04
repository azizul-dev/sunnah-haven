import { Check } from "lucide-react";
import { toBanglaNumber } from "@/lib/format";

type Step = { label: string; done: boolean };

export default function CheckoutSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="mx-auto mb-10 flex max-w-xl items-start">
      {steps.map((step, index) => (
        <li key={step.label} className="flex flex-1 items-start last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold transition ${
                step.done
                  ? "border-gold bg-gold text-emerald-night"
                  : "border-gold/50 bg-white text-emerald-deep dark:bg-emerald-deep dark:text-gold"
              }`}
            >
              {step.done ? <Check size={18} aria-hidden="true" /> : toBanglaNumber(index + 1)}
            </span>
            <span className="text-[11px] text-text-muted dark:text-cream/70">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={`mx-2 mt-4 h-0.5 flex-1 rounded ${step.done ? "bg-gold" : "bg-gold/25"}`}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
