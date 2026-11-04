import { categories } from "@/data/categories";
import { shopText, type SortKey } from "@/data/shop";
import type { CategorySlug } from "@/lib/types";

type FilterOptionsProps = {
  category: CategorySlug | null;
  sort: SortKey;
  onCategory: (category: CategorySlug | null) => void;
  onSort: (sort: SortKey) => void;
};

function chipClass(active: boolean): string {
  return `rounded-full border px-4 py-2 text-sm transition ${
    active
      ? "border-gold bg-gold font-semibold text-emerald-night"
      : "border-gold/40 text-text-dark hover:border-gold dark:text-cream"
  }`;
}

export default function FilterOptions({ category, sort, onCategory, onSort }: FilterOptionsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-heading text-base font-bold text-emerald-deep dark:text-gold">
          {shopText.categoryTitle}
        </h3>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => onCategory(null)} aria-pressed={category === null} className={chipClass(category === null)}>
            {shopText.all}
          </button>
          {categories.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => onCategory(item.slug)}
              aria-pressed={category === item.slug}
              className={chipClass(category === item.slug)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-heading text-base font-bold text-emerald-deep dark:text-gold">
          {shopText.sortTitle}
        </h3>
        <div className="flex flex-wrap gap-2">
          {shopText.sortOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => onSort(option.key)}
              aria-pressed={sort === option.key}
              className={chipClass(sort === option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
