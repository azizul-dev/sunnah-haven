import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 font-display text-2xl font-bold text-gold ${className}`}
      aria-label={SITE_NAME}
    >
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M20 4a12 12 0 1 0 0 24 10 10 0 1 1 0-24z"
          fill="#c9a24b"
        />
        <path
          d="M25 9l1.2 2.8 3 .3-2.3 2 .7 3-2.6-1.6-2.6 1.6.7-3-2.3-2 3-.3z"
          fill="#e2c77d"
        />
      </svg>
      {SITE_NAME}
    </Link>
  );
}
