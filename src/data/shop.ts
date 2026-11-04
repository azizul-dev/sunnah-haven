export type SortKey = "default" | "price-asc" | "price-desc" | "rating";

export const shopText = {
  title: "আমাদের সংগ্রহ",
  searchPlaceholder: "পণ্য খুঁজুন...",
  filter: "ফিল্টার",
  categoryTitle: "ক্যাটাগরি",
  sortTitle: "সাজান",
  all: "সব পণ্য",
  showResults: "পণ্য দেখুন",
  close: "বন্ধ করুন",
  empty: "কোনো পণ্য পাওয়া যায়নি।",
  count: "টি পণ্য",
  sortOptions: [
    { key: "default", label: "ডিফল্ট" },
    { key: "price-asc", label: "দাম: কম থেকে বেশি" },
    { key: "price-desc", label: "দাম: বেশি থেকে কম" },
    { key: "rating", label: "রেটিং অনুযায়ী" },
  ] satisfies { key: SortKey; label: string }[],
};

export const productText = {
  variant: "ধরন",
  quantity: "পরিমাণ",
  addToCart: "কার্টে যোগ করুন",
  added: "কার্টে যোগ হয়েছে",
  buyNow: "এখনই কিনুন",
  decrease: "পরিমাণ কমান",
  increase: "পরিমাণ বাড়ান",
  sunnahTitle: "এ বিষয়ে হাদিস কী বলে",
  sunnahNote: "নমুনা লেখা, যাচাইকৃত হাদিস পরে বসবে",
  relatedTitle: "আরও দেখুন",
  breadcrumbShop: "শপ",
  gallery: "ছবি",
};
