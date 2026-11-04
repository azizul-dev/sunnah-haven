"use client";

import { useRef, useState } from "react";
import Button from "@/components/ui/Button";
import ArchFrame from "@/components/ui/ArchFrame";
import Container from "@/components/ui/Container";
import ProductIcon from "@/components/ui/ProductIcon";
import { heroSlides, homeText } from "@/data/home";

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  }

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  }

  return (
    <section className="bg-emerald-deep">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {heroSlides.map((slide) => (
          <div key={slide.title} className="w-full shrink-0 snap-center">
            <Container className="grid items-center gap-6 py-10 md:grid-cols-2 md:py-16">
              <div className="order-2 text-center md:order-1 md:text-left">
                <h1 className="font-heading text-2xl font-bold leading-snug text-gold sm:text-4xl">
                  {slide.title}
                </h1>
                <p className="mt-3 text-cream/80">{slide.subtitle}</p>
                <Button
                  href={`/shop?category=${slide.category}`}
                  className="mt-6"
                >
                  {homeText.shopNow}
                </Button>
              </div>
              <div className="order-1 flex justify-center md:order-2">
                <ArchFrame className="h-56 w-44 sm:h-72 sm:w-56">
                  <ProductIcon category={slide.category} size={72} />
                </ArchFrame>
              </div>
            </Container>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 pb-5">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`${homeText.slideLabel} ${index + 1}`}
            aria-current={active === index}
            className={`h-2 rounded-full transition-all ${
              active === index ? "w-6 bg-gold" : "w-2 bg-gold/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
