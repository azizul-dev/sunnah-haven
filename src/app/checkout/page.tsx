import type { Metadata } from "next";
import CheckoutView from "@/components/product/CheckoutView";

export const metadata: Metadata = { title: "চেকআউট | Sunnah Haven" };

export default function CheckoutPage() {
  return <CheckoutView />;
}
