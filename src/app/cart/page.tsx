import type { Metadata } from "next";
import CartView from "@/components/product/CartView";

export const metadata: Metadata = { title: "কার্ট | Sunnah Haven" };

export default function CartPage() {
  return <CartView />;
}
