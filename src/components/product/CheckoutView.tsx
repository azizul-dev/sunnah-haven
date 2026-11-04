"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import CheckoutSection from "@/components/product/CheckoutSection";
import CheckoutSteps from "@/components/product/CheckoutSteps";
import DistrictSelect from "@/components/product/DistrictSelect";
import OrderSummary from "@/components/product/OrderSummary";
import OrderSuccess from "@/components/product/OrderSuccess";
import PaymentOptions, { type PaymentMethod } from "@/components/product/PaymentOptions";
import PhoneVerify from "@/components/product/PhoneVerify";
import { cartText, checkoutText, checkoutUi, districts } from "@/data/checkout";
import { useCart } from "@/lib/cart";
import { getDeliveryCharge, getSadaqahRoundUp } from "@/lib/pricing";

type Errors = Partial<Record<"name" | "phone" | "district" | "address" | "verify", string>>;

const inputClass =
  "w-full rounded-xl border border-gold/50 bg-white px-4 py-3 text-sm text-text-dark dark:bg-emerald-deep dark:text-cream";

export default function CheckoutView() {
  const { items, subtotal, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [verified, setVerified] = useState(false);
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [sadaqah, setSadaqah] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const delivery = getDeliveryCharge(subtotal);
  const base = subtotal + delivery;
  const roundUp = getSadaqahRoundUp(base);
  const total = base + (sadaqah ? roundUp : 0);
  const infoDone = Boolean(name.trim() && address.trim() && districts.includes(district));

  if (orderNumber) return <OrderSuccess orderNumber={orderNumber} />;

  if (items.length === 0) {
    return (
      <Container className="py-20 text-center">
        <p className="text-text-muted dark:text-cream/70">{checkoutText.empty}</p>
        <Button href="/shop" className="mt-6">{cartText.continueShopping}</Button>
      </Container>
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = checkoutText.errName;
    if (!/^01[3-9]\d{8}$/.test(phone)) next.phone = checkoutText.errPhone;
    else if (!verified) next.verify = checkoutText.errVerify;
    if (!districts.includes(district)) next.district = checkoutText.errDistrict;
    if (!address.trim()) next.address = checkoutText.errAddress;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setOrderNumber(String(Date.now()).slice(-8));
    clear();
  }

  return (
    <Container className="py-10 pb-28">
      <SectionTitle title={checkoutText.title} />
      <CheckoutSteps
        steps={[
          { label: checkoutUi.steps.info, done: infoDone },
          { label: checkoutUi.steps.verify, done: verified },
          { label: checkoutUi.steps.confirm, done: infoDone && verified },
        ]}
      />

      <form onSubmit={handleSubmit} noValidate className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <CheckoutSection number={1} title={checkoutText.info}>
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-text-dark dark:text-cream">
                {checkoutText.name}
              </label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={Boolean(errors.name)}
                autoComplete="name"
                className={inputClass}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-700 dark:text-red-300" role="alert">{errors.name}</p>
              )}
            </div>

            <DistrictSelect
              id="district"
              value={district}
              onChange={setDistrict}
              label={checkoutText.district}
              placeholder={checkoutText.districtPlaceholder}
              error={errors.district}
            />

            <div>
              <label htmlFor="address" className="mb-1 block text-sm font-medium text-text-dark dark:text-cream">
                {checkoutText.address}
              </label>
              <textarea
                id="address"
                rows={3}
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder={checkoutText.addressPlaceholder}
                aria-invalid={Boolean(errors.address)}
                className={inputClass}
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-700 dark:text-red-300" role="alert">{errors.address}</p>
              )}
            </div>
          </CheckoutSection>

          <CheckoutSection number={2} title={checkoutText.verifyTitle}>
            <PhoneVerify
              phone={phone}
              onPhone={(value) => {
                setPhone(value);
                setVerified(false);
              }}
              verified={verified}
              onVerified={() => setVerified(true)}
              phoneError={errors.phone}
              verifyError={errors.verify}
            />
          </CheckoutSection>

          <CheckoutSection number={3} title={checkoutText.payment}>
            <PaymentOptions value={payment} onChange={setPayment} />
          </CheckoutSection>
        </div>

        <OrderSummary
          items={items}
          subtotal={subtotal}
          delivery={delivery}
          roundUp={roundUp}
          sadaqah={sadaqah}
          onSadaqah={setSadaqah}
          total={total}
        />
      </form>
    </Container>
  );
}
