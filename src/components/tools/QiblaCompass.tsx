"use client";

import { Compass } from "lucide-react";
import Button from "@/components/ui/Button";
import { qiblaText } from "@/data/tools";
import { useCompass } from "@/hooks/useCompass";
import { toBanglaNumber } from "@/lib/format";

export default function QiblaCompass({ angle }: { angle: number }) {
  const { heading, status, requestPermission } = useCompass();
  const rotation = heading === null ? 0 : (angle - heading + 360) % 360;
  const aligned = status === "active" && (rotation < 5 || rotation > 355);

  return (
    <article className="card-hover rounded-3xl border border-gold/40 bg-white p-6 text-center dark:bg-emerald-deep">
      <h2 className="font-heading text-xl font-bold text-emerald-deep dark:text-gold">{qiblaText.qiblaAngle}</h2>
      <p className="mt-1 text-sm text-text-muted dark:text-cream/70">
        {toBanglaNumber(Math.round(angle))}° {qiblaText.degrees}
      </p>

      <div className="relative mx-auto mt-6 h-64 w-64">
        <div
          className={`absolute inset-0 rounded-full border-4 bg-[radial-gradient(circle,#0b3d2e,#06261c)] transition ${
            aligned ? "border-gold-light shadow-[0_0_40px_rgba(226,199,125,0.8)]" : "border-gold/60"
          }`}
        >
          {["উ", "পূ", "দ", "প"].map((label, index) => (
            <span
              key={label}
              className="absolute text-xs font-bold text-gold-light"
              style={{
                top: index === 0 ? "8px" : index === 2 ? "auto" : "50%",
                bottom: index === 2 ? "8px" : "auto",
                left: index === 3 ? "10px" : index === 1 ? "auto" : "50%",
                right: index === 1 ? "10px" : "auto",
                transform: index % 2 === 0 ? "translateX(-50%)" : "translateY(-50%)",
              }}
            >
              {label}
            </span>
          ))}
        </div>

        <div
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
            <path d="M50 14 L58 50 L50 44 L42 50 Z" fill="#e2c77d" />
            <path d="M50 86 L56 50 L50 54 L44 50 Z" fill="#c9a24b" fillOpacity="0.35" />
            <circle cx="50" cy="50" r="3" fill="#c9a24b" />
          </svg>
        </div>
      </div>

      <p className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-emerald-deep dark:text-gold-light" role="status">
        <Compass size={18} aria-hidden="true" />
        {aligned ? qiblaText.aligned : status === "active" ? qiblaText.rotateHint : qiblaText.kaaba}
      </p>

      {status === "needs-permission" && (
        <Button onClick={requestPermission} className="mt-4">{qiblaText.enableCompass}</Button>
      )}
      {status === "denied" && <p className="mt-3 text-xs text-red-700 dark:text-red-300" role="alert">{qiblaText.compassDenied}</p>}
      {status === "unavailable" && <p className="mt-3 text-xs text-text-muted dark:text-cream/70">{qiblaText.compassUnavailable}</p>}
    </article>
  );
}
