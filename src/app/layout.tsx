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
import InstallPrompt from "@/components/layout/InstallPrompt";
import { CartProvider } from "@/lib/cart";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";
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
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    images: [{ url: "/sunnah-logo.png", alt: SITE_NAME }],
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "bn_BD",
  },
  twitter: { card: "summary", images: ["/sunnah-logo.png"], title: SITE_NAME, description: SITE_DESCRIPTION },
  appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: "black-translucent" },
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
          <InstallPrompt />
        </CartProvider>
      </body>
    </html>
  );
}
