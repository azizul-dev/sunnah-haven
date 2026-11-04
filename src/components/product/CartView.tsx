"use client";

import { ArrowRight, PartyPopper, ShoppingBag, Truck } from "lucide-react";
import ArchFrame from "@/components/ui/ArchFrame";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import CartItemRow from "@/components/product/CartItemRow";
import CartSummary from "@/components/product/CartSummary";
import { FREE_DELIVERY_ABOVE, cartText, cartUi } from "@/data/checkout";
import { useCart } from "@/lib/cart";
import { formatPrice, toBanglaNumber } from "@/lib/format";
import { getDeliveryCharge } from "@/lib/pricing";

export default function CartView() {
  const { items, count, subtotal } = useCart();
  const delivery = getDeliveryCharge(subtotal);
  const remaining = FREE_DELIVERY_ABOVE - subtotal;
  const progress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_ABOVE) * 100));

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <ArchFrame className="mx-auto h-44 w-36">
          <ShoppingBag size={56} strokeWidth={1.4} aria-hidden="true" />
        </ArchFrame>
        <p className="mt-6 text-text-muted dark:text-cream/70">{cartText.empty}</p>
        <Button href="/shop" className="mt-6">{cartText.continueShopping}</Button>
      </Container>
    );
  }

  return (
    <Container className="py-10 pb-44 md:pb-12">
      <SectionTitle
        title={cartText.title}
        subtitle={`${toBanglaNumber(count)} ${cartUi.itemsCount}`}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-4">
          <div className="card-hover rounded-2xl border border-gold/40 bg-white p-4 dark:bg-emerald-deep">
            <p className="flex items-center gap-2 text-sm font-medium text-text-dark dark:text-cream">
              {remaining > 0 ? (
                <Truck size={18} className="text-gold" aria-hidden="true" />
              ) : (
                <PartyPopper size={18} className="text-gold" aria-hidden="true" />
              )}
              {remaining > 0
                ? `${cartText.freeAbove} ${formatPrice(remaining)}`
                : cartUi.freeReached}
            </p>
            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-gold/20"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ul className="space-y-4">
            {items.map((item) => (
              <CartItemRow key={item.slug} item={item} />
            ))}
          </ul>
        </div>

        <CartSummary subtotal={subtotal} delivery={delivery} />
      </div>

      <div className="fixed inset-x-0 bottom-[calc(3.6rem+env(safe-area-inset-bottom))] z-30 border-t border-gold/40 bg-cream/95 px-4 py-3 pr-20 backdrop-blur dark:bg-emerald-night/95 md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] text-text-muted dark:text-cream/70">{cartText.total}</p>
            <p className="font-heading text-lg font-bold text-emerald-deep dark:text-gold">
              {formatPrice(subtotal + delivery)}
            </p>
          </div>
          <Button href="/checkout" className="gap-2 !px-5 !py-2.5">
            {cartText.checkout}
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </Container>
  );
}
