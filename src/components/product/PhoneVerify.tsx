"use client";

import { useEffect, useState } from "react";
import { BadgeCheck } from "lucide-react";
import { checkoutText } from "@/data/checkout";
import { toBanglaNumber } from "@/lib/format";

const PHONE_PATTERN = /^01[3-9]\d{8}$/;
const RESEND_SECONDS = 30;

type PhoneVerifyProps = {
  phone: string;
  onPhone: (value: string) => void;
  verified: boolean;
  onVerified: () => void;
  phoneError?: string;
  verifyError?: string;
};

export default function PhoneVerify({ phone, onPhone, verified, onVerified, phoneError, verifyError }: PhoneVerifyProps) {
  const [sent, setSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  function sendOtp() {
    if (!PHONE_PATTERN.test(phone)) return;
    setSent(true);
    setSeconds(RESEND_SECONDS);
    setOtpError("");
  }

  function confirm() {
    if (!/^\d{4}$/.test(otp)) {
      setOtpError(checkoutText.errOtp);
      return;
    }
    onVerified();
  }

  const canSend = PHONE_PATTERN.test(phone);
  const fieldError = phoneError || verifyError;

  return (
    <div>
      <label htmlFor="phone" className="mb-1 block text-sm font-medium text-text-dark dark:text-cream">{checkoutText.phone}</label>
      <div className="flex gap-2">
        <input
          id="phone"
          type="tel"
          inputMode="numeric"
          maxLength={11}
          value={phone}
          onChange={(event) => onPhone(event.target.value.replace(/\D/g, ""))}
          placeholder={checkoutText.phonePlaceholder}
          disabled={verified}
          aria-invalid={Boolean(fieldError)}
          className="w-full rounded-xl border border-gold/50 bg-white px-4 py-3 text-sm text-text-dark disabled:opacity-70 dark:bg-emerald-deep dark:text-cream"
        />
        {!verified && (
          <button
            type="button"
            onClick={sendOtp}
            disabled={!canSend || seconds > 0}
            className="shrink-0 rounded-xl border border-gold bg-gold px-4 text-xs font-semibold text-emerald-night disabled:opacity-50"
          >
            {sent && seconds > 0 ? `${checkoutText.resendIn} ${toBanglaNumber(seconds)}` : sent ? checkoutText.resend : checkoutText.sendOtp}
          </button>
        )}
      </div>
      {fieldError && <p className="mt-1 text-xs text-red-700 dark:text-red-300" role="alert">{fieldError}</p>}

      {verified && (
        <p className="mt-2 flex items-center gap-1 text-xs text-emerald-deep dark:text-gold-light" role="status">
          <BadgeCheck size={16} aria-hidden="true" /> {checkoutText.verified}
        </p>
      )}

      {sent && !verified && (
        <div className="mt-3">
          <label htmlFor="otp" className="mb-1 block text-sm font-medium text-text-dark dark:text-cream">{checkoutText.otpLabel}</label>
          <div className="flex gap-2">
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))}
              className="w-full rounded-xl border border-gold/50 bg-white px-4 py-3 text-center text-lg tracking-[0.5em] text-text-dark dark:bg-emerald-deep dark:text-cream"
            />
            <button type="button" onClick={confirm} className="shrink-0 rounded-xl bg-emerald-deep px-4 text-xs font-semibold text-gold">
              {checkoutText.verify}
            </button>
          </div>
          <p className="mt-1 text-[11px] text-text-muted dark:text-cream/60">{checkoutText.otpHint}</p>
          {otpError && <p className="mt-1 text-xs text-red-700 dark:text-red-300" role="alert">{otpError}</p>}
        </div>
      )}
    </div>
  );
}
