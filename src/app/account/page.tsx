import type { Metadata } from "next";
import AccountView from "@/components/ui/AccountView";

export const metadata: Metadata = { title: "অ্যাকাউন্ট | Sunnah Haven" };

export default function AccountPage() {
  return <AccountView />;
}
