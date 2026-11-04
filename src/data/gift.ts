export type GiftTheme = "emerald" | "gold" | "cream";

export const giftThemes: { key: GiftTheme; label: string }[] = [
  { key: "emerald", label: "সবুজ" },
  { key: "gold", label: "সোনালি" },
  { key: "cream", label: "ক্রিম" },
];

export const giftText = {
  title: "হাদিয়া হিসেবে পাঠান",
  subtitle: "সুন্দর কার্ডসহ উপহার, প্যাকিং স্লিপে দাম থাকবে না",
  message: "আপনার বার্তা",
  messagePlaceholder: "আল্লাহ আপনাকে বরকত দান করুন...",
  from: "প্রেরকের নাম",
  theme: "কার্ডের থিম",
  preview: "কার্ডের প্রিভিউ",
  previewEmpty: "আপনার বার্তা এখানে দেখা যাবে",
  hidePrice: "প্যাকিং স্লিপে দাম দেখানো হবে না",
  summaryTitle: "হাদিয়া",
  fromPrefix: "প্রেরক:",
};
