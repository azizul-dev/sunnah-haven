import type { Metadata, Viewport } from "next";
import {
  Amiri,
  Cormorant_Garamond,
  Hind_Siliguri,
  Noto_Serif_Bengali,
} from "next/font/google";
import LoadingScreen from "@/components/layout/LoadingScreen";
import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

const notoSerif = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["500", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sunnah Haven",
  description: "সুন্নাহ অনুযায়ী ইসলামিক লাইফস্টাইল পণ্যের বিশ্বস্ত ঠিকানা",
};

export const viewport: Viewport = {
  themeColor: "#0B3D2E",
  viewportFit: "cover",
};

const themeScript = `try{if(localStorage.getItem("sunnah-haven-theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${amiri.variable} ${hind.variable} ${notoSerif.variable} ${cormorant.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <CartProvider>
          <LoadingScreen />
          <TopBar />
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <BottomNav />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
