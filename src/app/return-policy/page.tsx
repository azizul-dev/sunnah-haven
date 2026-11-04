import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { returnPolicy } from "@/data/pages";

export const metadata: Metadata = { title: "রিটার্ন পলিসি | Sunnah Haven" };

export default function ReturnPolicyPage() {
  return <LegalPage {...returnPolicy} />;
}
