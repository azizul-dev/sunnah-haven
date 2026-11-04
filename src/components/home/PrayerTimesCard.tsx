"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { PRAYER_ORDER, usePrayerTimes, type PrayerName, type PrayerTimes } from "@/hooks/usePrayerTimes";
import { sectionText } from "@/data/sections";
import { toBanglaNumber } from "@/lib/format";

function toDate(time: string, base: Date, dayOffset = 0): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date(base);
  date.setDate(date.getDate() + dayOffset);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function findNext(times: PrayerTimes, now: Date): { name: PrayerName; date: Date } {
  for (const name of PRAYER_ORDER) {
    const date = toDate(times[name], now);
    if (date > now) return { name, date };
  }
  return { name: "Fajr", date: toDate(times.Fajr, now, 1) };
}

function formatClock(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "পিএম" : "এএম";
  const hour12 = hours % 12 || 12;
  return `${toBanglaNumber(hour12)}:${toBanglaNumber(String(minutes).padStart(2, "0"))} ${period}`;
}

function formatRemaining(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return toBanglaNumber(`${h}:${m}:${s}`);
}

export default function PrayerTimesCard() {
  const { times, status } = usePrayerTimes();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const next = times && now ? findNext(times, now) : null;

  return (
    <article className="card-hover rounded-3xl border border-gold/40 bg-white p-6 shadow-sm dark:bg-emerald-deep sm:p-8">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold text-emerald-deep dark:text-gold">
          {sectionText.prayerTitle}
        </h3>
        <span className="text-xs text-text-muted dark:text-cream/70">{sectionText.prayerCity}</span>
      </div>

      {status === "loading" && (
        <p className="mt-6 text-sm text-text-muted dark:text-cream/70">{sectionText.prayerLoading}</p>
      )}
      {status === "error" && (
        <p className="mt-6 text-sm text-red-700 dark:text-red-300" role="alert">
          {sectionText.prayerError}
        </p>
      )}

      {times && (
        <>
          {next && now && (
            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-emerald-deep px-4 py-3 text-cream dark:bg-emerald-night">
              <Clock size={22} className="text-gold" aria-hidden="true" />
              <div>
                <p className="text-xs text-cream/70">
                  {sectionText.nextPrayer}: {sectionText.prayerNames[next.name]}
                </p>
                <p className="font-heading text-xl font-bold text-gold">
                  {formatRemaining(next.date.getTime() - now.getTime())} {sectionText.remaining}
                </p>
              </div>
            </div>
          )}

          <ul className="mt-4 divide-y divide-gold/20">
            {PRAYER_ORDER.map((name) => (
              <li
                key={name}
                className={`flex items-center justify-between py-2 text-sm ${
                  next?.name === name ? "font-bold text-emerald-deep dark:text-gold" : "text-text-dark dark:text-cream"
                }`}
              >
                <span>{sectionText.prayerNames[name]}</span>
                <span>{formatClock(times[name])}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </article>
  );
}
