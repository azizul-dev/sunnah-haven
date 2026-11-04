import type { Metadata } from "next";
import LegalPage from "@/components/ui/LegalPage";
import { privacyPolicy } from "@/data/pages";

export const metadata: Metadata = { title: "প্রাইভেসি পলিসি | Sunnah Haven" };

export default function PrivacyPolicyPage() {
  return <LegalPage {...privacyPolicy} />;
}
