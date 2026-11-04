import { BadgeCheck, RotateCcw, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
import { sectionText, type WhyItem } from "@/data/sections";

const icons: Record<WhyItem["id"], LucideIcon> = {
  halal: ShieldCheck,
  pure: BadgeCheck,
  delivery: Truck,
  return: RotateCcw,
};

export default function TrustRow() {
  return (
    <ul className="mt-6 grid grid-cols-4 gap-2">
      {sectionText.whyItems.map((item) => {
        const Icon = icons[item.id];
        return (
          <li
            key={item.id}
            className="card-hover flex flex-col items-center gap-1.5 rounded-2xl border border-gold/30 bg-white px-1 py-3 text-center dark:bg-emerald-deep"
          >
            <Icon size={22} className="text-gold" aria-hidden="true" />
            <span className="text-[10px] font-medium leading-tight text-text-dark dark:text-cream sm:text-xs">
              {item.title}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
