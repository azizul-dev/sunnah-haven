"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";
import { contactText } from "@/data/pages";

type Errors = Partial<Record<"name" | "phone" | "message", string>>;

const inputClass =
  "w-full rounded-xl border border-gold/50 bg-white px-4 py-3 text-sm text-text-dark dark:bg-emerald-deep dark:text-cream";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = contactText.errName;
    if (!/^01[3-9]\d{8}$/.test(phone)) next.phone = contactText.errPhone;
    if (!message.trim()) next.message = contactText.errMessage;
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  }

  if (done) {
    return (
      <p className="rounded-2xl bg-gold/15 p-5 text-center text-sm text-emerald-deep dark:text-gold-light" role="status">
        {contactText.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="c-name" className="mb-1 block text-sm font-medium text-text-dark dark:text-cream">{contactText.name}</label>
        <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={Boolean(errors.name)} autoComplete="name" className={inputClass} />
        {errors.name && <p className="mt-1 text-xs text-red-700 dark:text-red-300" role="alert">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="c-phone" className="mb-1 block text-sm font-medium text-text-dark dark:text-cream">{contactText.phoneField}</label>
        <input id="c-phone" type="tel" inputMode="numeric" maxLength={11} value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} aria-invalid={Boolean(errors.phone)} className={inputClass} />
        {errors.phone && <p className="mt-1 text-xs text-red-700 dark:text-red-300" role="alert">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1 block text-sm font-medium text-text-dark dark:text-cream">{contactText.message}</label>
        <textarea id="c-message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} aria-invalid={Boolean(errors.message)} className={inputClass} />
        {errors.message && <p className="mt-1 text-xs text-red-700 dark:text-red-300" role="alert">{errors.message}</p>}
      </div>
      <Button type="submit" className="w-full gap-2">
        <Send size={16} aria-hidden="true" />
        {contactText.send}
      </Button>
    </form>
  );
}
