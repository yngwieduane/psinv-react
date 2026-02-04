"use client";

import type { ReactNode } from "react";
import clsx from "clsx";
import InquiryForm from "./InquiryForm";
import { useTranslations } from "next-intl";
import type { CRMMeta } from "../LandingConfig";
import { Facebook, Instagram, Linkedin, Youtube, Twitter, Camera } from "lucide-react";

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
  crm?: CRMMeta;

  heading?: string;
  address?: string;
  localTel?: string;
  intlTel?: string;
  socials?: ReadonlyArray<{ type: SocialKey; href: string; label?: string }>;
  formHeading?: string;

  className?: string;
  dir?: "ltr" | "rtl";
  variant?: "glass" | "solid";
};

const icons = {
  facebook: Facebook,
  instagram: Instagram,
  x: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  snapchat: Camera,
  whatsapp: null,
  tiktok: null,
} as const;

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
    <footer id="contact" dir={dir} className={wrapper}>
      <div className="mx-auto w-full max-w-7xl px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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
              <div className="mt-8 flex items-center gap-6">
                {socials.map((s, i) => {
                  const Icon = icons[s.type];
                  if (!Icon) return null;

                  return (
                    <a
                      key={`${s.type}-${i}`}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                      aria-label={s.label ?? s.type}
                      title={s.label ?? s.type}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
          <div className="lg:pl-8">
            <div>
              <div className="px-6 pb-6">
                {crm && <InquiryForm crm={crm} variant="solid" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
