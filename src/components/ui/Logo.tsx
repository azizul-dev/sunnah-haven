import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

type LogoProps = { className?: string; size?: number };

export default function Logo({ className = "", size = 40 }: LogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 font-display text-2xl font-bold text-gold ${className}`}
      aria-label={SITE_NAME}
    >
      <Image
        src="/sunnah-logo.png"
        alt=""
        width={size}
        height={size}
        priority
        className="rounded-full object-cover"
      />
      {SITE_NAME}
    </Link>
  );
}
