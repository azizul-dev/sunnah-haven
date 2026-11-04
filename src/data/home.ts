import type { CategorySlug } from "@/lib/types";

export type HeroSlide = {
  title: string;
  subtitle: string;
  category: CategorySlug;
};

export const heroSlides: HeroSlide[] = [
  {
    title: "সুন্নাহর সুবাসে ভরে উঠুক আপনার দিন",
    subtitle: "খাঁটি আতর, দীর্ঘস্থায়ী ঘ্রাণ, অ্যালকোহলমুক্ত।",
    category: "attar",
  },
  {
    title: "ইবাদতের জন্য আরামদায়ক জায়নামাজ",
    subtitle: "নরম, পুরু ও মিহরাব নকশার সংগ্রহ।",
    category: "jaynamaz",
  },
  {
    title: "নবীজির ﷺ প্রিয় খেজুর ও মধু",
    subtitle: "ভেজালমুক্ত আজওয়া খেজুর ও প্রাকৃতিক মধু।",
    category: "khejur",
  },
];

export const homeText = {
  shopNow: "এখনই কিনুন",
  categoriesTitle: "ক্যাটাগরি",
  categoriesSubtitle: "আপনার প্রয়োজনের পণ্য বেছে নিন",
  slideLabel: "স্লাইড",
  newTitle: "নতুন পণ্য",
  newSubtitle: "সম্প্রতি যোগ হওয়া সংগ্রহ",
  bestTitle: "বেস্ট সেলার",
  bestSubtitle: "ক্রেতাদের সবচেয়ে প্রিয় পণ্য",
  addToCart: "কার্টে যোগ করুন",
  added: "যোগ হয়েছে",
  newBadge: "নতুন",
  offerTitle: "আজকের বিশেষ অফার",
  offerSubtitle: "নির্বাচিত পণ্যে ২০% পর্যন্ত ছাড়, শুধু আজকের জন্য",
  offerEnds: "অফার শেষ হতে বাকি",
  hours: "ঘণ্টা",
  minutes: "মিনিট",
  seconds: "সেকেন্ড",
  viewOffers: "অফার দেখুন",
};
