"use client";

import { MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import QiblaCompass from "@/components/tools/QiblaCompass";
import QiblaPrayerCard from "@/components/tools/QiblaPrayerCard";
import { qiblaText } from "@/data/tools";
import { useLocation } from "@/hooks/useLocation";
import { getQiblaAngle } from "@/lib/qibla";

export default function QiblaView() {
  const { coords, status } = useLocation();
  const angle = getQiblaAngle(coords.lat, coords.lng);

  const locationLabel =
    status === "locating"
      ? qiblaText.locating
      : status === "found"
        ? qiblaText.yourLocation
        : `${qiblaText.fallback}`;

  return (
    <Container className="py-10 pb-32 md:pb-14">
      <SectionTitle title={qiblaText.title} subtitle={qiblaText.subtitle} />
      <p className="mb-6 flex items-center justify-center gap-2 text-sm text-text-muted dark:text-cream/70" role="status">
        <MapPin size={16} className="text-gold" aria-hidden="true" />
        {locationLabel}
      </p>
      <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
        <QiblaCompass angle={angle} />
        <QiblaPrayerCard coords={coords} />
      </div>
    </Container>
  );
}
