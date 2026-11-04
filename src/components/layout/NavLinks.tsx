"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, Phone, Store, type LucideIcon } from "lucide-react";
import { strings } from "@/data/strings";
import { isActive } from "@/lib/nav";

const icons: Record<string, LucideIcon> = {
  "/": Home,
  "/shop": Store,
  "/about": Info,
  "/contact": Phone,
};

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="প্রধান মেনু" className="hidden items-center gap-1 md:flex">
      {strings.nav.map((item) => {
        const Icon = icons[item.href];
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              active
                ? "bg-gold/15 text-gold"
                : "text-cream hover:bg-gold/10 hover:text-gold"
            }`}
          >
            {Icon && (
              <Icon
                size={17}
                aria-hidden="true"
                className="transition group-hover:scale-110"
              />
            )}
            {item.label}
            <span
              aria-hidden="true"
              className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold transition-transform ${
                active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
