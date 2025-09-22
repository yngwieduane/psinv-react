// src/app/[locale]/project/lp/[lpSlug]/_components/LanguageSwitch.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

export const SUPPORTED = ["en", "ar"] as const;
type Locale = (typeof SUPPORTED)[number];

type Props = {
  current?: string;       // optional; inferred from URL if omitted
  className?: string;
  variant?: "glass" | "solid"; // match your existing theme styles
};

export default function LanguageSwitch({ current, className, variant = "solid" }: Props) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const search = useSearchParams();
  const qs = search?.toString();

  // Infer current locale from the URL if not passed
  const parts = pathname.split("/"); // ["", "en", "project", ...] or ["", "project", ...]
  const urlLocale = (parts[1] as Locale) || "en";
  const rawValue = (current ?? urlLocale).toLowerCase();
  const value: Locale = (SUPPORTED.includes(rawValue as Locale) ? rawValue : "en") as Locale;

  // Build a localized href, preserving query string and hash
  const toHref = (next: Locale) => {
    const p = [...parts];
    if (SUPPORTED.includes(p[1] as Locale)) p[1] = next; // replace /{locale}
    else p.splice(1, 0, next);                           // or insert it
    const pathOnly = p.join("/") || "/";
    const withQs = qs ? `${pathOnly}?${qs}` : pathOnly;
    // Preserve hash if present (usePathname excludes it; read from window)
    if (typeof window !== "undefined" && window.location.hash) {
      return `${withQs}${window.location.hash}`;
    }
    return withQs;
  };

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as Locale;
    router.push(toHref(next));
    router.refresh?.(); // helpful if server components read locale
  };

  // Styling tokens for theme variants
  const base =
    "uppercase border rounded-md px-3 py-1 pr-8 text-xs tracking-wide focus:outline-none focus:ring-2 appearance-none";
  const solid =
    "bg-[#4a3720]/90 text-white border-white/30 focus:ring-white/60"; // your dark pill
  const glass =
    "bg-black/30 text-white border-white/30 backdrop-blur-md focus:ring-white/60";

  return (
    <div className={clsx("relative inline-block", className)}>
      <label htmlFor="lang" className="sr-only">
        Language
      </label>
      <select
        id="lang"
        name="lang"
        value={value}
        onChange={onChange}
        aria-label="Language"
        className={clsx(base, variant === "glass" ? glass : solid)}
      >
        {SUPPORTED.map((loc) => (
          <option key={loc} value={loc}>
            {loc.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Chevron */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-white/80"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M5.25 7.5l4.5 4.5 4.5-4.5h-9z" />
      </svg>
    </div>
  );
}
