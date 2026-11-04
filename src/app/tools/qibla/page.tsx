import type { Metadata } from "next";
import QiblaView from "@/components/tools/QiblaView";

export const metadata: Metadata = {
  title: "কিবলা ও নামাজের সময় | Sunnah Haven",
  description: "আপনার অবস্থান অনুযায়ী কিবলার দিক ও নামাজের সময়।",
};

export default function QiblaPage() {
  return <QiblaView />;
}
