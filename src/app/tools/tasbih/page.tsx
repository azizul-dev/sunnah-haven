import type { Metadata } from "next";
import TasbihCounter from "@/components/tools/TasbihCounter";

export const metadata: Metadata = {
  title: "ডিজিটাল তাসবিহ | Sunnah Haven",
  description: "ফোনে ট্যাপ করে তাসবিহ গণনা করুন।",
};

export default function TasbihPage() {
  return <TasbihCounter />;
}
