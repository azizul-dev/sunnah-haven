# Sunnah Haven

সুন্নাহসম্মত ইসলামিক লাইফস্টাইল ই-কমার্স সাইটের ফ্রন্টএন্ড (Next.js, TypeScript, Tailwind CSS, Framer Motion)।

## চালানোর নিয়ম

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # প্রোডাকশন বিল্ড
npm run lint
```

## কোথায় কী বদলাবেন

| কী | কোথায় |
|---|---|
| ফোন নম্বর, WhatsApp নম্বর, সাইট URL | `src/lib/constants.ts` |
| রঙ ও ফন্ট | `src/app/globals.css`, `src/app/layout.tsx` |
| পণ্য, ক্যাটাগরি, রিভিউ | `src/data/products.ts`, `categories.ts`, `reviews.ts` |
| হাদিস (যাচাই করে বসান) | `src/data/hadith.ts` |
| ডেলিভারি চার্জ ও জেলা | `src/data/checkout.ts` |
| রিটার্ন/প্রাইভেসি পলিসি, যোগাযোগ, FAQ | `src/data/pages.ts` |
| পণ্যের ছবি | `public/products/<slug>.jpg` |
| হিরো ছবি | `public/hero/<category>.jpg` |

## নোট

- এখন সব ডেটা ডামি, ব্যাকএন্ড পরে যুক্ত হবে।
- হাদিস ও পলিসির লেখা নমুনা, লাইভ করার আগে যাচাই করুন।
