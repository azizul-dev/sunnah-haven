"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActive } from "@/lib/nav";

type HeaderIconLinkProps = {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
};

export default function HeaderIconLink({
  href,
  label,
  children,
  className = "",
}: HeaderIconLinkProps) {
  const pathname = usePathname();
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={`rounded-full p-2 transition ${
        active ? "bg-gold text-emerald-night" : "text-gold hover:bg-gold/15"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
