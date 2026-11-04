import { Suspense } from "react";
import type { Metadata } from "next";
import ShopView from "@/components/product/ShopView";

export const metadata: Metadata = {
  title: "শপ | Sunnah Haven",
  description: "আতর, তাসবিহ, টুপি, জায়নামাজ, মধু, খেজুরসহ সুন্নাহসম্মত সব পণ্য।",
};

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopView />
    </Suspense>
  );
}
