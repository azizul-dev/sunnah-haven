"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, Store, User } from "lucide-react";
import { strings } from "@/data/strings";
import { isActive } from "@/lib/nav";

const items = [
  { href: "/", label: strings.bottomNav.home, Icon: Home },
  { href: "/shop", label: strings.bottomNav.shop, Icon: Store },
  { href: "/search", label: strings.bottomNav.search, Icon: Search },
  { href: "/cart", label: strings.bottomNav.cart, Icon: ShoppingBag },
  { href: "/account", label: strings.bottomNav.account, Icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="নিচের মেনু"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-emerald-night pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-5">
        {items.map(({ href, label, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative flex flex-col items-center gap-1 py-2 text-[11px] transition ${
                  active ? "font-semibold text-gold" : "text-cream/70"
                }`}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-6 top-0 h-0.5 rounded-b bg-gold"
                  />
                )}
                <Icon size={22} strokeWidth={active ? 2.4 : 1.8} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
