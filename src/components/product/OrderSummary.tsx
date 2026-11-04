import { Lock, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import SadaqahCard from "@/components/product/SadaqahCard";
import { cartText, checkoutText, checkoutUi } from "@/data/checkout";
import type { CartItem } from "@/lib/cart";
import { formatPrice, toBanglaNumber } from "@/lib/format";

type OrderSummaryProps = {
  items: CartItem[];
  subtotal: number;
  delivery: number;
  roundUp: number;
  sadaqah: boolean;
  onSadaqah: (value: boolean) => void;
  total: number;
};

export default function OrderSummary({
  items,
  subtotal,
  delivery,
  roundUp,
  sadaqah,
  onSadaqah,
  total,
}: OrderSummaryProps) {
  return (
    <aside className="card-hover h-fit overflow-hidden rounded-3xl border border-gold/40 bg-white dark:bg-emerald-deep lg:sticky lg:top-24">
      <div className="bg-[linear-gradient(135deg,#0b3d2e,#06261c)] px-5 py-4 text-center">
        <h2 className="font-heading text-lg font-bold text-gold">{checkoutText.summary}</h2>
      </div>

      <div className="p-5">
        <ul className="space-y-2 text-sm text-text-dark dark:text-cream">
          {items.map((item) => (
            <li key={item.slug} className="flex justify-between gap-3">
              <span className="min-w-0 truncate">
                {item.name} × {toBanglaNumber(item.quantity)}
              </span>
              <span className="shrink-0">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <dl className="mt-4 space-y-2 border-t border-gold/30 pt-3 text-sm text-text-dark dark:text-cream">
          <div className="flex justify-between">
            <dt>{cartText.subtotal}</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{cartText.delivery}</dt>
            <dd>{delivery === 0 ? cartText.free : formatPrice(delivery)}</dd>
          </div>
          {sadaqah && roundUp > 0 && (
            <div className="flex justify-between">
              <dt>{checkoutText.sadaqahLine}</dt>
              <dd>{formatPrice(roundUp)}</dd>
            </div>
          )}
          <div className="flex justify-between border-t border-gold/30 pt-3 font-heading text-lg font-bold text-emerald-deep dark:text-gold">
            <dt>{cartText.total}</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>

        {roundUp > 0 && <SadaqahCard amount={roundUp} checked={sadaqah} onChange={onSadaqah} />}

        <Button type="submit" className="mt-5 w-full gap-2">
          <Lock size={16} aria-hidden="true" />
          {checkoutText.placeOrder}
        </Button>
        <p className="mt-3 flex items-center justify-center gap-1 text-[11px] text-text-muted dark:text-cream/60">
          <ShieldCheck size={14} className="text-gold" aria-hidden="true" />
          {checkoutUi.secure}
        </p>
      </div>
    </aside>
  );
}
