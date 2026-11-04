"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { strings } from "@/data/strings";

const STORAGE_KEY = "sunnah-haven-theme";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      return;
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? strings.theme.toLight : strings.theme.toDark}
      className="rounded-full p-2 text-gold transition hover:bg-gold/15"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
