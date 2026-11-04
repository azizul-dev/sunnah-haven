"use client";

import { districts } from "@/data/checkout";

type DistrictSelectProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  error?: string;
};

export default function DistrictSelect({ id, value, onChange, label, placeholder, error }: DistrictSelectProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-text-dark dark:text-cream">{label}</label>
      <input
        id={id}
        list={`${id}-list`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        autoComplete="off"
        className="w-full rounded-xl border border-gold/50 bg-white px-4 py-3 text-sm text-text-dark dark:bg-emerald-deep dark:text-cream"
      />
      <datalist id={`${id}-list`}>
        {districts.map((district) => (<option key={district} value={district} />))}
      </datalist>
      {error && <p className="mt-1 text-xs text-red-700 dark:text-red-300" role="alert">{error}</p>}
    </div>
  );
}
