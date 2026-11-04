export const productPageText = {
  inStock: "স্টকে আছে",
  save: "সাশ্রয়",
  total: "মোট",
  whatsappOrder: "হোয়াটসঅ্যাপে অর্ডার করুন",
  highlightsTitle: "এই পণ্যের বিশেষত্ব",
  tabs: {
    details: "বিবরণ",
    sunnah: "সুন্নাহ রেফারেন্স",
    delivery: "ডেলিভারি ও রিটার্ন",
  },
  highlights: [
    "সুন্নাহসম্মত ও হালাল পণ্য",
    "মান যাচাই করে সংগ্রহ করা",
    "যত্ন সহকারে নিরাপদ প্যাকেজিং",
    "পছন্দ না হলে সহজ রিটার্ন",
  ],
  deliveryItems: [
    { id: "speed", title: "ডেলিভারি সময়", text: "ঢাকায় ১-২ দিন, ঢাকার বাইরে ৩-৫ দিন" },
    { id: "cod", title: "ক্যাশ অন ডেলিভারি", text: "পণ্য হাতে পেয়ে টাকা দিন" },
    { id: "return", title: "৭ দিনে রিটার্ন", text: "পণ্যে সমস্যা থাকলে ৭ দিনের মধ্যে রিটার্ন" },
  ],
};

export function buildWhatsAppMessage(name: string, variant: string, quantity: number, total: string): string {
  return `আসসালামু আলাইকুম, আমি এই পণ্যটি অর্ডার করতে চাই:\n\nপণ্য: ${name}\nধরন: ${variant}\nপরিমাণ: ${quantity}\nমোট: ${total}`;
}
