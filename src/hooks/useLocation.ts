"use client";

import { useEffect, useState } from "react";

export type Coords = { lat: number; lng: number };
export type LocationStatus = "locating" | "found" | "fallback";

export const DHAKA: Coords = { lat: 23.8103, lng: 90.4125 };

export function useLocation() {
  const [coords, setCoords] = useState<Coords>(DHAKA);
  const [status, setStatus] = useState<LocationStatus>("locating");

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("fallback");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        setStatus("found");
      },
      () => setStatus("fallback"),
      { timeout: 8000, maximumAge: 600000 },
    );
  }, []);

  return { coords, status };
}
