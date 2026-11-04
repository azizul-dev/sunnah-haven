"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { tasbihText } from "@/data/tools";
import { useTasbih } from "@/hooks/useTasbih";
import { toBanglaNumber } from "@/lib/format";

const PRESETS = [33, 99, 100];
const RADIUS = 120;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function TasbihCounter() {
  const { count, target, rounds, completed, tap, changeTarget, reset } = useTasbih();
  const [custom, setCustom] = useState("");

  const progress = count / target;
  const total = rounds * target + count;

  function applyCustom() {
    const value = parseInt(custom, 10);
    if (value > 0 && value <= 100000) {
      changeTarget(value);
      setCustom("");
    }
  }

  return (
    <Container className="py-10 pb-32 md:pb-14">
      <SectionTitle title={tasbihText.title} subtitle={tasbihText.subtitle} />

      <div className="mx-auto max-w-md">
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-text-muted dark:text-cream/70">{tasbihText.target}:</span>
          {PRESETS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => changeTarget(value)}
              aria-pressed={target === value}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                target === value
                  ? "border-gold bg-gold font-semibold text-emerald-night"
                  : "border-gold/40 bg-white text-text-dark hover:border-gold dark:bg-emerald-deep dark:text-cream"
              }`}
            >
              {toBanglaNumber(value)}
            </button>
          ))}
        </div>

        <div className="mb-8 flex justify-center gap-2">
          <label htmlFor="custom-target" className="sr-only">{tasbihText.custom}</label>
          <input
            id="custom-target"
            type="text"
            inputMode="numeric"
            value={custom}
            onChange={(event) => setCustom(event.target.value.replace(/\D/g, ""))}
            placeholder={tasbihText.customPlaceholder}
            className="w-28 rounded-full border border-gold/50 bg-white px-4 py-2 text-center text-sm text-text-dark dark:bg-emerald-deep dark:text-cream"
          />
          <button type="button" onClick={applyCustom} className="rounded-full border border-gold px-4 py-2 text-sm font-medium text-emerald-deep dark:text-gold">
            {tasbihText.custom} {tasbihText.set}
          </button>
        </div>

        <div className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80">
          <svg viewBox="0 0 280 280" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="140" cy="140" r={RADIUS} fill="none" stroke="#c9a24b" strokeOpacity="0.25" strokeWidth="8" />
            <circle
              cx="140"
              cy="140"
              r={RADIUS}
              fill="none"
              stroke="#c9a24b"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
              className="transition-all duration-200"
            />
          </svg>

          <button
            type="button"
            onClick={tap}
            aria-label={tasbihText.tapLabel}
            className="absolute inset-6 flex select-none flex-col items-center justify-center rounded-full border border-gold/60 bg-[radial-gradient(circle_at_30%_25%,#1a6b4f,#0b3d2e_55%,#06261c)] text-gold shadow-[0_0_40px_rgba(201,162,75,0.3)] transition active:scale-95 active:shadow-[0_0_60px_rgba(226,199,125,0.6)]"
          >
            <span className="font-heading text-6xl font-bold sm:text-7xl" aria-live="polite">
              {toBanglaNumber(count)}
            </span>
            <span className="mt-1 text-sm text-gold-light">/ {toBanglaNumber(target)}</span>
            <span className="mt-3 text-xs text-cream/60">{tasbihText.tap}</span>
          </button>

          {completed && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-full bg-gold/90 px-6 text-center font-heading text-lg font-bold text-emerald-night" role="status">
              {tasbihText.done}
            </div>
          )}
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-3 text-center">
          <div className="card-hover rounded-2xl border border-gold/30 bg-white p-4 dark:bg-emerald-deep">
            <dt className="text-xs text-text-muted dark:text-cream/70">{tasbihText.round}</dt>
            <dd className="font-heading text-2xl font-bold text-emerald-deep dark:text-gold">{toBanglaNumber(rounds)}</dd>
          </div>
          <div className="card-hover rounded-2xl border border-gold/30 bg-white p-4 dark:bg-emerald-deep">
            <dt className="text-xs text-text-muted dark:text-cream/70">{tasbihText.total}</dt>
            <dd className="font-heading text-2xl font-bold text-emerald-deep dark:text-gold">{toBanglaNumber(total)}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={reset}
          className="mx-auto mt-6 flex items-center gap-2 rounded-full border border-gold/50 px-5 py-2 text-sm text-emerald-deep transition hover:bg-gold/15 dark:text-gold"
        >
          <RotateCcw size={16} aria-hidden="true" />
          {tasbihText.reset}
        </button>
      </div>
    </Container>
  );
}
