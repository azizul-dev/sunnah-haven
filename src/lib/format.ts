const BANGLA_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBanglaNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BANGLA_DIGITS[Number(d)]);
}

export function formatPrice(amount: number): string {
  return `৳ ${toBanglaNumber(amount.toLocaleString("en-IN"))}`;
}
