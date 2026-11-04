"use client";

import { useEffect, useState } from "react";
import { DHAKA, type Coords } from "@/hooks/useLocation";

export const PRAYER_ORDER = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
export type PrayerName = (typeof PRAYER_ORDER)[number];
export type PrayerTimes = Record<PrayerName, string>;
export type PrayerStatus = "loading" | "ready" | "error";

function cleanTime(value: string): string {
  const match = value.match(/\d{1,2}:\d{2}/);
  return match ? match[0] : value;
}

export function usePrayerTimes(coords: Coords = DHAKA) {
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [status, setStatus] = useState<PrayerStatus>("loading");
  const { lat, lng } = coords;

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=1&school=1`;

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("request failed");
        return response.json();
      })
      .then((json) => {
        const timings = json.data.timings as Record<string, string>;
        setTimes({
          Fajr: cleanTime(timings.Fajr),
          Dhuhr: cleanTime(timings.Dhuhr),
          Asr: cleanTime(timings.Asr),
          Maghrib: cleanTime(timings.Maghrib),
          Isha: cleanTime(timings.Isha),
        });
        setStatus("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus("error");
      });

    return () => controller.abort();
  }, [lat, lng]);

  return { times, status };
}
