"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, Store, User, type LucideIcon } from "lucide-react";
import { strings } from "@/data/strings";
import { isActive } from "@/lib/nav";

type NavItem = { href: string; label: string; Icon: LucideIcon };

const leftItems: NavItem[] = [
  { href: "/shop", label: strings.bottomNav.shop, Icon: Store },
  { href: "/search", label: strings.bottomNav.search, Icon: Search },
];

const rightItems: NavItem[] = [
  { href: "/cart", label: strings.bottomNav.cart, Icon: ShoppingBag },
  { href: "/account", label: strings.bottomNav.account, Icon: User },
];

function SideLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActive(pathname, item.href);
  const { Icon } = item;

  return (
    <li>
      <Link
        href={item.href}
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
        {item.label}
      </Link>
    </li>
  );
}

function HomeLink({ pathname }: { pathname: string }) {
  const active = isActive(pathname, "/");

  return (
    <li>
      <Link
        href="/"
        aria-current={active ? "page" : undefined}
        aria-label={strings.bottomNav.home}
        className="flex flex-col items-center pb-1.5"
      >
        <span
          className={`-mt-6 flex h-14 w-14 items-center justify-center rounded-full border-4 border-emerald-night transition-all duration-300 ${
            active
              ? "scale-110 bg-gold text-emerald-night shadow-[0_0_24px_rgba(226,199,125,0.85)] ring-2 ring-gold-light"
              : "bg-emerald-deep text-gold ring-1 ring-gold/60"
          }`}
        >
          <Home size={active ? 28 : 24} strokeWidth={active ? 2.4 : 1.8} />
        </span>
        <span
          className={`mt-1 text-[11px] transition ${
            active ? "font-bold text-gold" : "text-cream/70"
          }`}
        >
          {strings.bottomNav.home}
        </span>
      </Link>
    </li>
  );
}

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="নিচের মেনু"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/30 bg-emerald-night pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-5 items-end">
        {leftItems.map((item) => (
          <SideLink key={item.href} item={item} pathname={pathname} />
        ))}
        <HomeLink pathname={pathname} />
        {rightItems.map((item) => (
          <SideLink key={item.href} item={item} pathname={pathname} />
        ))}
      </ul>
    </nav>
  );
}
