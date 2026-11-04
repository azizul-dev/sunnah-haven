import Link from "next/link";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
};

const base =
  "inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-emerald-night shadow-md transition hover:bg-gold-light hover:shadow-[0_0_20px_rgba(226,199,125,0.6)]";

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={`${base} ${className}`}>
      {children}
    </button>
  );
}
