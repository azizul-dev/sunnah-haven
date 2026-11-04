"use client";

import { useCallback, useEffect, useState } from "react";

export type CompassStatus = "idle" | "needs-permission" | "active" | "denied" | "unavailable";

type IOSOrientationEvent = DeviceOrientationEvent & { webkitCompassHeading?: number };
type IOSOrientationConstructor = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

export function useCompass() {
  const [heading, setHeading] = useState<number | null>(null);
  const [status, setStatus] = useState<CompassStatus>("idle");

  const listen = useCallback(() => {
    function handler(event: Event) {
      const e = event as IOSOrientationEvent;
      if (typeof e.webkitCompassHeading === "number") {
        setHeading(e.webkitCompassHeading);
        setStatus("active");
      } else if (e.absolute && typeof e.alpha === "number") {
        setHeading((360 - e.alpha) % 360);
        setStatus("active");
      }
    }
    window.addEventListener("deviceorientationabsolute", handler);
    window.addEventListener("deviceorientation", handler);
    return () => {
      window.removeEventListener("deviceorientationabsolute", handler);
      window.removeEventListener("deviceorientation", handler);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) {
      setStatus("unavailable");
      return;
    }
    const ctor = DeviceOrientationEvent as IOSOrientationConstructor;
    if (typeof ctor.requestPermission === "function") {
      setStatus("needs-permission");
      return;
    }
    const stop = listen();
    const timer = setTimeout(() => {
      setStatus((current) => (current === "idle" ? "unavailable" : current));
    }, 2000);
    return () => {
      stop();
      clearTimeout(timer);
    };
  }, [listen]);

  const requestPermission = useCallback(async () => {
    const ctor = DeviceOrientationEvent as IOSOrientationConstructor;
    try {
      const result = await ctor.requestPermission?.();
      if (result === "granted") {
        setStatus("idle");
        listen();
      } else {
        setStatus("denied");
      }
    } catch {
      setStatus("denied");
    }
  }, [listen]);

  return { heading, status, requestPermission };
}
