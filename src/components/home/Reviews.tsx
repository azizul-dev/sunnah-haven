import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { reviews } from "@/data/reviews";
import { sectionText } from "@/data/sections";

export default function Reviews() {
  return (
    <section>
      <Container>
        <SectionTitle title={sectionText.reviewsTitle} subtitle={sectionText.reviewsSubtitle} />
        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 pt-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {reviews.map((review) => (
            <li key={review.id} className="w-72 shrink-0 snap-start sm:w-80">
              <article className="card-hover flex h-full flex-col rounded-2xl border border-gold/30 bg-white p-5 shadow-sm dark:bg-emerald-deep">
                <div className="flex gap-0.5" role="img" aria-label={`${review.rating} স্টার`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      aria-hidden="true"
                      className={i < review.rating ? "fill-gold text-gold" : "text-gold/30"}
                    />
                  ))}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text-dark dark:text-cream">
                  {review.text}
                </p>
                <p className="mt-4 text-sm font-semibold text-emerald-deep dark:text-gold">{review.name}</p>
                <p className="text-xs text-text-muted dark:text-cream/60">{review.location}</p>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
