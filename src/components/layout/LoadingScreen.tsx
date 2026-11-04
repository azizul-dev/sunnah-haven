"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const DURATION_MS = 4000;
const STORAGE_KEY = "sunnah-haven-intro-seen";

function PlusPattern() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-[0.07]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="plus" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M24 19v10M19 24h10" stroke="#e2c77d" strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#plus)" />
    </svg>
  );
}

function CrescentOrnament() {
  return (
    <div className="flex w-full max-w-md items-center gap-4" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/70" />
      <svg width="34" height="34" viewBox="0 0 32 32">
        <path d="M20 4a12 12 0 1 0 0 24 10 10 0 1 1 0-24z" fill="#e2c77d" />
        <path
          d="M25 9l1.2 2.8 3 .3-2.3 2 .7 3-2.6-1.6-2.6 1.6.7-3-2.3-2 3-.3z"
          fill="#c9a24b"
        />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/70" />
    </div>
  );
}

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }

    if (seen) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* storage unavailable */
      }
      document.body.style.overflow = "";
      setVisible(false);
    }, DURATION_MS);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between overflow-hidden bg-[linear-gradient(145deg,#3f7a5a_0%,#0b3d2e_55%,#06261c_100%)] px-5 py-10"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          role="status"
          aria-label="লোড হচ্ছে"
        >
          <PlusPattern />

          <motion.div
            className="relative z-10 flex w-full justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col items-center gap-4">
              <Image src="/sunnah-logo.png" alt="" width={72} height={72} priority className="rounded-full border border-gold/60" />
              <CrescentOrnament />
            </div>
          </motion.div>

          <div className="relative z-10 flex w-full flex-col items-center gap-8 text-center sm:gap-12">
            <motion.p
              dir="rtl"
              lang="ar"
              className="font-arabic text-4xl leading-[1.8] text-gold-light sm:text-6xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2 }}
            >
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </motion.p>

            <motion.div
              className="w-full max-w-xl rounded-3xl border border-gold/40 bg-white/5 px-5 py-7 backdrop-blur-sm sm:px-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 2 }}
            >
              <p
                dir="rtl"
                lang="ar"
                className="font-arabic text-2xl leading-[1.8] text-gold sm:text-4xl"
              >
                لَا إِلٰهَ إِلَّا اللهُ مُحَمَّدٌ رَسُولُ اللهِ
              </p>
              <div className="mx-auto my-4 h-px w-24 bg-gold/50" />
              <p className="text-sm text-cream/90 sm:text-base">
                আল্লাহ ছাড়া কোনো ইলাহ নেই, মুহাম্মাদ ﷺ আল্লাহর রাসূল
              </p>
            </motion.div>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-4">
            <motion.div
              className="h-12 w-12 rounded-full border-2 border-gold/30 border-t-gold"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, ease: "linear", repeat: Infinity }}
            />
            <p className="text-xs tracking-[0.35em] text-cream/60">লোড হচ্ছে</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
