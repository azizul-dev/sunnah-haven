"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleDot,
  CircleHelp,
  Compass,
  Home,
  Info,
  Menu,
  Phone,
  RotateCcw,
  ShieldCheck,
  Store,
  type LucideIcon,
} from "lucide-react";
import BottomSheet from "@/components/ui/BottomSheet";
import { mobileMenu } from "@/data/mobile";
import { isActive } from "@/lib/nav";

const icons: Record<string, LucideIcon> = {
  "/": Home,
  "/shop": Store,
  "/about": Info,
  "/contact": Phone,
  "/tools/tasbih": CircleDot,
  "/tools/qibla": Compass,
  "/faq": CircleHelp,
  "/return-policy": RotateCcw,
  "/privacy-policy": ShieldCheck,
};

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={mobileMenu.open}
        className="rounded-full p-2 text-gold transition hover:bg-gold/15 md:hidden"
      >
        <Menu size={22} />
      </button>

      <BottomSheet open={open} title={mobileMenu.title} onClose={() => setOpen(false)}>
        <ul className="grid grid-cols-2 gap-3">
          {mobileMenu.items.map((item) => {
            const Icon = icons[item.href];
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`card-hover flex h-full items-center gap-3 rounded-2xl border p-3 text-sm ${
                    active
                      ? "border-gold bg-gold/20 font-semibold text-emerald-deep dark:text-gold"
                      : "border-gold/30 bg-white text-text-dark dark:bg-emerald-deep dark:text-cream"
                  }`}
                >
                  <Icon size={20} className="shrink-0 text-gold" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </BottomSheet>
    </>
  );
}
