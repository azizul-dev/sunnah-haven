"use client";

import { useState } from "react";
import { PackageOpen } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import { accountText } from "@/data/pages";

type Mode = "login" | "register";

const inputClass =
  "w-full rounded-xl border border-gold/50 bg-white px-4 py-3 text-sm text-text-dark dark:bg-emerald-deep dark:text-cream";

export default function AccountView() {
  const [mode, setMode] = useState<Mode>("login");
  const [notice, setNotice] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(true);
  }

  return (
    <Container className="max-w-xl py-10 pb-28 md:pb-14">
      <SectionTitle title={accountText.title} subtitle={accountText.subtitle} />

      <div className="card-hover rounded-3xl border border-gold/40 bg-white p-5 dark:bg-emerald-deep sm:p-6">
        <div role="tablist" className="mb-6 grid grid-cols-2 gap-2 rounded-full bg-gold/10 p-1">
          {(["login", "register"] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={mode === key}
              onClick={() => {
                setMode(key);
                setNotice(false);
              }}
              className={`rounded-full py-2 text-sm transition ${
                mode === key ? "bg-gold font-semibold text-emerald-night" : "text-text-dark dark:text-cream"
              }`}
            >
              {key === "login" ? accountText.login : accountText.register}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label htmlFor="a-name" className="mb-1 block text-sm font-medium text-text-dark dark:text-cream">{accountText.name}</label>
              <input id="a-name" autoComplete="name" className={inputClass} />
            </div>
          )}
          <div>
            <label htmlFor="a-phone" className="mb-1 block text-sm font-medium text-text-dark dark:text-cream">{accountText.phone}</label>
            <input id="a-phone" type="tel" inputMode="numeric" maxLength={11} autoComplete="tel" className={inputClass} />
          </div>
          <div>
            <label htmlFor="a-pass" className="mb-1 block text-sm font-medium text-text-dark dark:text-cream">{accountText.password}</label>
            <input id="a-pass" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} className={inputClass} />
          </div>
          <Button type="submit" className="w-full">
            {mode === "login" ? accountText.submitLogin : accountText.submitRegister}
          </Button>
          {notice && (
            <p className="rounded-xl bg-gold/15 p-3 text-center text-xs text-emerald-deep dark:text-gold-light" role="status">
              {accountText.soon}
            </p>
          )}
        </form>
      </div>

      <section className="mt-8 rounded-3xl border border-gold/30 bg-white/70 p-6 text-center dark:bg-emerald-deep/60">
        <PackageOpen size={40} className="mx-auto text-gold" aria-hidden="true" />
        <h2 className="mt-3 font-heading text-lg font-bold text-emerald-deep dark:text-gold">{accountText.ordersTitle}</h2>
        <p className="mt-1 text-sm text-text-muted dark:text-cream/70">{accountText.ordersEmpty}</p>
        <Button href="/shop" className="mt-4">{accountText.startShopping}</Button>
      </section>
    </Container>
  );
}
