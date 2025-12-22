// src/app/[locale]/project/lp/[lpSlug]/_components/FloorPlans.tsx
"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import InquiryModal from "./InquiryModal";
import type { CRMMeta } from "../LandingConfig";


/* =========================
   Types (self-contained)
   ========================= */
export type FloorGroup =
  | { title: string; images?: string[]; image?: string; pdfUrl?: string }
  | { titleKey: string; images?: string[]; image?: string; pdfUrl?: string }
  | { key: string; images?: string[]; image?: string; pdfUrl?: string };

export type FileLink = { label: string; url: string };

/* =========================
   Lightbox (built-in)
   ========================= */
function Lightbox({
  images,
  startIndex = 0,
  onClose,
  alt = "image",
}: {
  images: string[];
  startIndex?: number;
  onClose: () => void;
  alt?: string;
}) {
  const [idx, setIdx] = useState(startIndex);
  const hasSlides = images.length > 1;

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  // Keyboard + lock body scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!images.length) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/80 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 h-10 w-10 grid place-items-center rounded-full bg-white/90 hover:bg-white text-2xl"
      >
        ×
      </button>

      {hasSlides && (
        <>
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-white/90 hover:bg-white text-xl"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-white/90 hover:bg-white text-xl"
          >
            ›
          </button>
        </>
      )}

      <img
        src={images[idx]}
        alt={alt}
        className="max-h-[85vh] max-w-[95vw] object-contain rounded-md shadow-2xl cursor-zoom-out"
        draggable={false}
      />
    </div>
  );
}

/* =========================
   Main Component
   ========================= */
export default function FloorPlans({
  title = "Floor Plan",
  heroImage,
  groups = [],
  files = [],
  sectionId = "floor-plans",
  ns,
  crm,
}: {
  title?: string;
  heroImage?: string;
  groups?: FloorGroup[];
  files?: FileLink[];
  sectionId?: string;
  ns?: string;
  crm?: CRMMeta;
}) {
  const t = ns ? useTranslations(ns) : null;

  const sectionTitle = ns ? safeT(t, "title", title) : (title ?? "");
  const safeGroups = Array.isArray(groups) ? groups : [];
  const hasGroups = safeGroups.length > 0;

  const [tab, setTab] = useState(0);
  const [frame, setFrame] = useState(0);
  const [showLB, setShowLB] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  const current = hasGroups ? safeGroups[Math.min(tab, safeGroups.length - 1)] : undefined;

  const currentImages: string[] =
    (current as any)?.images?.length
      ? ((current as any).images as string[])
      : (current as any)?.image
      ? [((current as any).image as string)]
      : [];

  const hasSlides = currentImages.length > 1;

  useEffect(() => {
    if (hasGroups) setFrame(0);
  }, [tab, hasGroups]);

  const prev = () => setFrame((f) => (f - 1 + currentImages.length) % currentImages.length);
  const next = () => setFrame((f) => (f + 1) % currentImages.length);

  return (
    <section id={sectionId} className="container mx-auto px-4 mt-10">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-[#F26522] mb-6">
        {sectionTitle}
      </h2>

      {hasGroups ? (
        <>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {safeGroups.map((g, i) => {
              const tabLabel =
                "titleKey" in g && ns
                  ? safeT(t, g.titleKey, g.titleKey)
                  : "title" in g
                  ? g.title
                  : "key" in g
                  ? safeT(t, g.key, g.key)
                  : "";

              return (
                <button
                  key={`${tabLabel}-${i}`}
                  onClick={() => setTab(i)}
                  className={clsx(
                    "rounded-md border px-5 py-3 text-sm font-medium transition-colors",
                    i === tab
                      ? "bg-[#111954] text-white border-[#111954]"
                      : "bg-white text-[#111954] border-[#E6E8F3] hover:bg-[#F6F7FC]"
                  )}
                >
                  {tabLabel}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden border border-[#E6E8F3]">
              {heroImage ? (
                <img src={heroImage} alt="Project image" className="w-full h-full object-cover" />
              ) : (
                <div className="min-h-[320px] bg-gray-100" />
              )}
            </div>
            <div className="bg-[#F6FAFF] rounded-xl p-6 flex flex-col relative">
              <h3 className="text-2xl md:text-3xl font-semibold text-[#111954] mb-4 w-full flex justify-center">
                {tabTitleFor(current, t)}
              </h3>
              {!!currentImages.length && (
                <div className="relative rounded-lg overflow-hidden border border-[#E6E8F3]">
                  <img
                    key={frame}
                    src={currentImages[frame]}
                    alt={`${tabTitleFor(current, t)} ${frame + 1}`}
                    className="w-full h-auto select-none cursor-zoom-in"
                    draggable={false}
                    onClick={() => {
                      setLbIndex(frame);
                      setShowLB(true);
                    }}
                  />
                  {hasSlides && (
                    <>
                      <button
                        aria-label="Previous image"
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-white/90 hover:bg-white shadow"
                      >
                        ‹
                      </button>
                      <button
                        aria-label="Next image"
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-white/90 hover:bg-white shadow"
                      >
                        ›
                      </button>
                      <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-2">
                        {currentImages.map((_, i) => (
                          <button
                            key={i}
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => setFrame(i)}
                            className={clsx(
                              "h-2.5 w-2.5 rounded-full transition-opacity",
                              i === frame ? "bg-[#111954]" : "bg-[#111954]/40 hover:opacity-80"
                            )}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
              {(current as any)?.pdfUrl && (
                <div className="mt-4 w-full flex justify-center">
              {crm ? (
                <InquiryModal
                  crm={crm}
                  triggerText={safeT(t, "download", "Download floor plans")}
                  triggerClassName="inline-flex items-center gap-2 text-[#111954] underline underline-offset-4 hover:opacity-80"
                  variant="glass"
                />
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-[#111954] underline underline-offset-4 opacity-60 cursor-not-allowed"
                  disabled
                  title="CRM not configured for this landing page"
                >
                  {safeT(t, "download", "Download floor plans")}
                </button>
              )}
                </div>
              )}
            </div>
          </div>
          {showLB && (
            <Lightbox
              images={currentImages}
              startIndex={lbIndex}
              onClose={() => setShowLB(false)}
              alt="floor plan"
            />
          )}
        </>
      ) : (
        <ul className="mx-auto max-w-2xl space-y-3">
          {files.map((f) => (
            <li
              key={f.label}
              className="flex items-center justify-between rounded-md border border-[#E6E8F3] p-4"
            >
              <span className="font-medium text-[#111954]">{f.label}</span>
              <a href={f.url} download className="text-[#111954] underline hover:opacity-80">
                {safeT(t, "download", "Download")}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
function safeT(
  t: ReturnType<typeof useTranslations> | null,
  key?: string,
  fallback?: string
): string {
  if (!key) return fallback ?? "";
  if (!t) return fallback ?? "";
  try {
    const val = String(t(key));
    return val;
  } catch {
    return fallback ?? "";
  }
}
function tabTitleFor(
  g: FloorGroup | undefined,
  t: ReturnType<typeof useTranslations> | null
): string {
  if (!g) return "";
  if ("title" in g) return g.title ?? "";
  if ("titleKey" in g) return safeT(t, g.titleKey, g.titleKey);
  if ("key" in g) return safeT(t, g.key, g.key);
  return "";
}
