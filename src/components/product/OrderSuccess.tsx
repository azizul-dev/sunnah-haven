import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { checkoutText } from "@/data/checkout";
import { toBanglaNumber } from "@/lib/format";

export default function OrderSuccess({ orderNumber }: { orderNumber: string }) {
  return (
    <Container className="py-16 text-center">
      <div className="mx-auto max-w-md rounded-t-[10rem] rounded-b-3xl border border-gold/60 bg-[linear-gradient(160deg,#0b3d2e,#06261c)] px-6 pb-10 pt-16 shadow-lg">
        <CheckCircle2 size={56} className="mx-auto text-gold" aria-hidden="true" />
        <h1 className="mt-4 font-heading text-2xl font-bold text-gold">{checkoutText.successTitle}</h1>
        <p className="mt-3 text-sm leading-relaxed text-cream/90">{checkoutText.successText}</p>
        <p className="mt-4 text-xs text-gold-light">
          {checkoutText.orderNumber}: {toBanglaNumber(orderNumber)}
        </p>
        <Button href="/" className="mt-6">{checkoutText.backHome}</Button>
      </div>
    </Container>
  );
}
