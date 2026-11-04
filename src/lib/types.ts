export type CategorySlug =
  | "attar"
  | "tasbih"
  | "topi"
  | "jaynamaz"
  | "boi"
  | "modhu"
  | "khejur"
  | "miswak"
  | "quran-stand";

export type Category = {
  slug: CategorySlug;
  name: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: CategorySlug;
  rating: number;
  variants: string[];
  description: string;
  isNew?: boolean;
  isBestSeller?: boolean;
};

export type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
};

export type Hadith = {
  arabic: string;
  bangla: string;
  source: string;
};
