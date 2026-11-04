import {
  BookOpen,
  Cherry,
  Crown,
  Droplet,
  FlaskConical,
  Gem,
  Leaf,
  Library,
  RectangleVertical,
  type LucideIcon,
} from "lucide-react";
import type { CategorySlug } from "@/lib/types";

const icons: Record<CategorySlug, LucideIcon> = {
  attar: FlaskConical,
  tasbih: Gem,
  topi: Crown,
  jaynamaz: RectangleVertical,
  boi: BookOpen,
  modhu: Droplet,
  khejur: Cherry,
  miswak: Leaf,
  "quran-stand": Library,
};

type ProductIconProps = {
  category: CategorySlug;
  size?: number;
  className?: string;
};

export default function ProductIcon({
  category,
  size = 32,
  className = "",
}: ProductIconProps) {
  const Icon = icons[category];
  return <Icon size={size} strokeWidth={1.5} className={className} aria-hidden="true" />;
}
