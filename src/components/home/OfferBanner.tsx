"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { homeText } from "@/data/home";
import { toBanglaNumber } from "@/lib/format";

type TimeLeft = { hours: number; minutes: number; seconds: number };

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const total = Math.floor((midnight.getTime() - now.getTime()) / 1000);
  return {
    hours: Math.floor(total / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function TimeBox({ value, label }: { value: number | null; label: string }) {
  const text = value === null ? "০০" : toBanglaNumber(String(value).padStart(2, "0"));
  return (
    <div className="flex w-16 flex-col items-center rounded-xl border border-gold/50 bg-emerald-night/60 py-2 sm:w-20">
      <span className="font-heading text-2xl font-bold text-gold sm:text-3xl">
        {text}
      </span>
      <span className="text-[11px] text-cream/70">{label}</span>
    </div>
  );
}

export default function OfferBanner() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section>
      <Container>
        <div className="card-hover rounded-3xl border border-gold/50 bg-[linear-gradient(135deg,#0b3d2e,#06261c)] px-5 py-10 text-center shadow-lg sm:px-10">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-4xl">
            {homeText.offerTitle}
          </h2>
          <p className="mt-2 text-sm text-cream/80 sm:text-base">
            {homeText.offerSubtitle}
          </p>
          <p className="mt-6 text-xs text-gold-light">{homeText.offerEnds}</p>
          <div className="mt-3 flex justify-center gap-3" role="timer">
            <TimeBox value={time?.hours ?? null} label={homeText.hours} />
            <TimeBox value={time?.minutes ?? null} label={homeText.minutes} />
            <TimeBox value={time?.seconds ?? null} label={homeText.seconds} />
          </div>
          <Button href="/shop" className="mt-8">
            {homeText.viewOffers}
          </Button>
        </div>
      </Container>
    </section>
  );
}
