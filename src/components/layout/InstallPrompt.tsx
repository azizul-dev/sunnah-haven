"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

type InstallEvent = Event & { prompt: () => Promise<void> };

const text = { install: "অ্যাপের মতো ইনস্টল করুন", close: "বন্ধ করুন" };

export default function InstallPrompt() {
  const [event, setEvent] = useState<InstallEvent | null>(null);

  useEffect(() => {
    function handler(e: Event) {
      e.preventDefault();
      setEvent(e as InstallEvent);
    }
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!event) return null;

  async function install() {
    await event?.prompt();
    setEvent(null);
  }

  return (
    <div className="fixed bottom-24 left-4 z-30 flex items-center gap-1 rounded-full border border-gold bg-emerald-night py-1 pl-4 pr-1 shadow-lg md:bottom-6">
      <button type="button" onClick={install} className="flex items-center gap-2 text-xs font-semibold text-gold">
        <Download size={16} aria-hidden="true" />
        {text.install}
      </button>
      <button type="button" onClick={() => setEvent(null)} aria-label={text.close} className="rounded-full p-2 text-cream/70 hover:text-gold">
        <X size={14} />
      </button>
    </div>
  );
}
