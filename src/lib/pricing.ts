import { DELIVERY_CHARGE, FREE_DELIVERY_ABOVE } from "@/data/checkout";

export function getDeliveryCharge(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_CHARGE;
}

export function getSadaqahRoundUp(total: number): number {
  const remainder = total % 10;
  return remainder === 0 ? 0 : 10 - remainder;
}
