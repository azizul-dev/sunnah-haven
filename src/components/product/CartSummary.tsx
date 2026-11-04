import { ArrowRight, RotateCcw, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import { cartText, cartUi } from "@/data/checkout";
import { formatPrice } from "@/lib/format";

const trustIcons: Record<string, LucideIcon> = {
  secure: ShieldCheck,
  delivery: Truck,
  return: RotateCcw,
};

type CartSummaryProps = { subtotal: number; delivery: number };

export default function CartSummary({ subtotal, delivery }: CartSummaryProps) {
  return (
    <aside className="card-hover h-fit overflow-hidden rounded-3xl border border-gold/40 bg-white dark:bg-emerald-deep lg:sticky lg:top-24">
      <div className="bg-[linear-gradient(135deg,#0b3d2e,#06261c)] px-5 py-4 text-center">
        <h2 className="font-heading text-lg font-bold text-gold">{cartText.total}</h2>
        <p className="font-heading text-3xl font-bold text-gold-light">
          {formatPrice(subtotal + delivery)}
        </p>
      </div>

      <div className="p-5">
        <dl className="space-y-3 text-sm text-text-dark dark:text-cream">
          <div className="flex justify-between">
            <dt>{cartText.subtotal}</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{cartText.delivery}</dt>
            <dd className={delivery === 0 ? "font-semibold text-emerald-deep dark:text-gold" : ""}>
              {delivery === 0 ? cartText.free : formatPrice(delivery)}
            </dd>
          </div>
        </dl>

        <div className="mt-4 flex gap-2">
          <label htmlFor="coupon" className="sr-only">{cartText.coupon}</label>
          <input
            id="coupon"
            type="text"
            placeholder={cartText.coupon}
            disabled
            className="w-full rounded-full border border-gold/40 bg-cream px-4 py-2 text-sm dark:bg-emerald-night"
          />
          <button type="button" disabled className="shrink-0 rounded-full border border-gold/50 px-4 text-xs text-text-muted">
            {cartText.applyCoupon}
          </button>
        </div>
        <p className="mt-1 text-[11px] text-text-muted dark:text-cream/50">{cartText.couponNote}</p>

        <Button href="/checkout" className="group mt-5 w-full gap-2">
          {cartText.checkout}
          <ArrowRight size={18} aria-hidden="true" className="transition group-hover:translate-x-1" />
        </Button>

        <ul className="mt-5 grid grid-cols-3 gap-2 border-t border-gold/20 pt-4 text-center">
          {cartUi.trust.map((item) => {
            const Icon = trustIcons[item.id];
            return (
              <li key={item.id} className="flex flex-col items-center gap-1 text-[11px] text-text-muted dark:text-cream/70">
                <Icon size={20} className="text-gold" aria-hidden="true" />
                {item.text}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
