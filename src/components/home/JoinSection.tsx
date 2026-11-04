"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { sectionText } from "@/data/sections";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const PHONE_PATTERN = /^01[3-9]\d{8}$/;

export default function JoinSection() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!PHONE_PATTERN.test(phone)) {
      setError(true);
      return;
    }
    setError(false);
    setDone(true);
  }

  return (
    <section>
      <Container>
        <div className="card-hover rounded-3xl border border-gold/50 bg-emerald-deep px-5 py-10 text-center sm:px-10">
          <h2 className="font-heading text-2xl font-bold text-gold sm:text-3xl">{sectionText.joinTitle}</h2>
          <p className="mt-2 text-sm text-cream/80">{sectionText.joinSubtitle}</p>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            <MessageCircle size={18} aria-hidden="true" />
            {sectionText.joinWhatsApp}
          </a>

          {done ? (
            <p className="mt-6 text-sm text-gold-light" role="status">{sectionText.joinSuccess}</p>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="join-phone" className="sr-only">{sectionText.joinPlaceholder}</label>
              <input
                id="join-phone"
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder={sectionText.joinPlaceholder}
                aria-invalid={error}
                className="w-full rounded-full border border-gold/50 bg-emerald-night/60 px-5 py-3 text-sm text-cream placeholder:text-cream/50"
              />
              <Button type="submit">{sectionText.joinSubmit}</Button>
            </form>
          )}
          {error && !done && (
            <p className="mt-2 text-xs text-red-300" role="alert">{sectionText.joinInvalid}</p>
          )}
        </div>
      </Container>
    </section>
  );
}
