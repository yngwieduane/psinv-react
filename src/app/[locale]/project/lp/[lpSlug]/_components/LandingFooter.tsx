"use client";

import type { ReactNode } from "react";
import clsx from "clsx";
import InquiryForm from "./InquiryForm";
import { useTranslations } from "next-intl";
import type { CRMMeta } from "../LandingConfig";

type SocialKey =
  | "facebook"
  | "instagram"
  | "x"
  | "linkedin"
  | "youtube"
  | "tiktok"
  | "whatsapp"
  | "snapchat";

type Props = {
  crm?: CRMMeta;  // 👈 pass CRM meta directly

  heading?: string;
  address?: string;
  localTel?: string;
  intlTel?: string;
  socials?: ReadonlyArray<{ type: SocialKey; href: string; label?: string }>;
  formHeading?: string;

  className?: string;
  dir?: "ltr" | "rtl";
  variant?: "glass" | "solid"; // optional styling for the footer wrapper
};

const icons = {
  facebook: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 10h3l-.5 3H13v9h-3v-9H8v-3h2V8a4 4 0 014-4h2v3h-2a1 1 0 00-1 1v2z" />
    </svg>
  ),
  instagram: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 3.5A5.5 5.5 0 1112 18.5 5.5 5.5 0 0112 7.5zM18.75 6.75a1 1 0 110 2 1 1 0 010-2z" />
    </svg>
  ),
  x: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4l-6.5 7.5L20 20h-3l-5-6-5 6H4l6.5-8L4 4h3l4.5 5.5L16 4h4z" />
    </svg>
  ),
  linkedin: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.9 6 2.5 6S0 4.88 0 3.5 1.08 1 2.48 1s2.5 1.12 2.5 2.5zM0 8h5v16H0V8zm7.5 0H12v2.2h.1c.6-1.1 2.1-2.2 4.3-2.2 4.6 0 5.5 3 5.5 6.9V24h-5v-7.2c0-1.7 0-3.9-2.4-3.9s-2.8 1.8-2.8 3.8V24h-5V8z" />
    </svg>
  ),
  youtube: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.4.6A3 3 0 00.5 6.2 31.3 31.3 0 000 12a31.3 31.3 0 00.5 5.8 3 3 0 002.1 2.1c2.1.6 9.4.6 9.4.6s7.3 0 9.4-.6a3 3 0 002.1-2.1A31.3 31.3 0 0024 12a31.3 31.3 0 00-.5-5.8zM9.8 15.5v-7L16 12l-6.2 3.5z" />
    </svg>
  ),
  tiktok: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.5 6.5a6 6 0 01-3-2.9v12.1a4.7 4.7 0 11-4-4.6v2.7a2 2 0 102-2V2h2a6 6 0 003 3V6.5z" />
    </svg>
  ),
  whatsapp: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 3.5A10.5 10.5 0 006.8 21.2L3 22l.8-3.7A10.5 10.5 0 1020 3.5zm-8 3A7.5 7.5 0 006.1 18l-.4.2.3-1.4a6.1 6.1 0 01-.2-1.6A7.5 7.5 0 1112 6.5zm4.2 8.6c-.2.6-1 1-1.6.8a9.9 9.9 0 01-4.7-2.9 9.3 9.3 0 01-2-3.1c-.2-.6.2-1.4.8-1.6l1.1-.5c.4-.2.8 0 1 .4l.8 1.5c.2.4.1.9-.2 1.2l-.4.4a6.9 6.9 0 003 3l.4-.4c.3-.3.8-.4 1.2-.2l1.5.8c.3.2.5.6.3 1.1l-.5 1.1z" />
    </svg>
  ),
  snapchat: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2c3 0 5 2.2 5 5.5 0 2.2.7 3.3 1.6 4.5.7.9-.1 1.3-1 .9-.8-.3-1.1 0-1 1.1.1 1.4 1.7 2 2.7 2.3.5.1.7.5.5.9-.5 1-2.2 1.1-3.3 1.3-.8.1-1.3.4-1.3.8s.6.7 1.4.8c.5.1.9.2 1.1.5.3.4 0 .8-.4.9-2.7.7-5.5.7-8.2 0-.4-.1-.7-.6-.4-.9.2-.3.6-.4 1.1-.5.8-.1 1.4-.4 1.4-.8s-.5-.7-1.3-.8c-1.1-.2-2.8-.3-3.3-1.3-.2-.4 0-.8.5-.9 1-.2 2.6-.9 2.7-2.3.1-1-.2-1.4-1-1.1-.8.4-1.7 0-1-.9C7.3 11.8 8 10.7 8 7.5 8 4.2 10 2 12 2z" />
    </svg>
  ),
} satisfies Record<SocialKey, ReactNode>;

const telHref = (t?: string) => (t ? `tel:${t.replace(/\s+/g, "")}` : undefined);

export default function LandingFooter({
  crm,
  heading = "OUR EXPERT WILL HELP YOU\nBUY THE BEST",
  address,
  localTel,
  intlTel,
  socials = [],
  formHeading = "Let us know if you’re interested!",
  className,
  dir,
  variant = "solid",
}: Props) {
  const t = useTranslations("LandingFooter");

  // Prefer translations; fall back to props/defaults
  const headingText = t("heading", { default: heading } as any);
  const formHeadingText = t("formHeading", { default: formHeading } as any);
  const localTelLabel = t("localTel", { default: "Local Tel" } as any);
  const intlTelLabel = t("intlTel", { default: "Int’l Tel" } as any);
  const addressText = t("address", { default: address ?? "" } as any);

  const wrapper = clsx(
    "text-white",
    variant === "glass"
      ? "bg-gradient-to-b from-black/40 via-black/35 to-black/30 backdrop-blur-md"
      : "bg-[#272964]",
    className
  );

  return (
    <footer dir={dir} className={wrapper}>
      <div className="mx-auto w-full max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="self-start">
            <h2 className="whitespace-pre-line text-3xl md:text-5xl font-semibold leading-tight">
              {headingText}
            </h2>

            {addressText && (
              <p className="mt-10 flex items-start gap-3 text-white/90">
                <span className="mt-1" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a7 7 0 017 7c0 5.2-7 13-7 13S5 14.2 5 9a7 7 0 017-7zm0 4a3 3 0 100 6 3 3 0 000-6z" />
                  </svg>
                </span>
                <span>{addressText}</span>
              </p>
            )}

            <div className="mt-6 space-y-3 text-white/90">
              {localTel && (
                <a
                  href={telHref(localTel)}
                  className="flex items-center gap-3 hover:opacity-90"
                  aria-label={`${localTelLabel}: ${localTel}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.23c1.2.5 2.5.77 3.8.77a1 1 0 011 1V20a1 1 0 01-1 1C11.3 21 3 12.7 3 2a1 1 0 011-1h2.26a1 1 0 011 1c0 1.3.26 2.6.77 3.8a1 1 0 01-.24 1.1L6.6 10.8z" />
                  </svg>
                  <span>
                    {localTelLabel}: {localTel}
                  </span>
                </a>
              )}
              {intlTel && (
                <a
                  href={telHref(intlTel)}
                  className="flex items-center gap-3 hover:opacity-90"
                  aria-label={`${intlTelLabel}: ${intlTel}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M6.6 10.8a15.5 15.5 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.23c1.2.5 2.5.77 3.8.77a1 1 0 011 1V20a1 1 0 01-1 1C11.3 21 3 12.7 3 2a1 1 0 011-1h2.26a1 1 0 011 1c0 1.3.26 2.6.77 3.8a1 1 0 01-.24 1.1L6.6 10.8z" />
                  </svg>
                  <span>
                    {intlTelLabel}: {intlTel}
                  </span>
                </a>
              )}
            </div>

            {socials.length > 0 && (
              <div className="mt-8 flex items-center gap-5">
                {socials.map((s, i) => (
                  <a
                    key={`${s.type}-${i}`}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-white transition"
                    aria-label={s.label ?? s.type}
                    title={s.label ?? s.type}
                  >
                    {icons[s.type]}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: form card */}
          <div className="lg:pl-8">
            <div className="max-w-[560px] rounded-xl bg-white/10 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.25)] ring-1 ring-white/10">
              <div className="px-6 pt-6 pb-2">
                <h3 className="text-xl font-semibold text-white">{formHeadingText}</h3>
              </div>
              <div className="px-6 pb-6">
                {/* ✅ matches new InquiryForm signature */}
                {crm && <InquiryForm crm={crm} variant="solid" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
