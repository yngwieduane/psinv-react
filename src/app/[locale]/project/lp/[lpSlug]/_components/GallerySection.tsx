// src/app/[locale]/project/lp/[lpSlug]/_components/GallerySection.tsx
"use client";

import { useRef } from "react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

type Props = {
  images: string[];
  split?: "alternate" | "half";
  className?: string;
  ns?: string;          // e.g. "LandingPages.sama-yas.gallery"
  titleKey?: string;    // default "title"
  sectionId?: string;   // default "gallery"
  rtl?: boolean;
};

function useRowScroller() {
  const ref = useRef<HTMLDivElement | null>(null);
  const byViewport = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };
  return { ref, prev: () => byViewport(-1), next: () => byViewport(1) };
}

export default function GallerySection({
  images,
  split = "alternate",
  className,
  ns,
  titleKey = "title",
  sectionId = "gallery",
  rtl = false,
}: Props) {
  const t = ns ? useTranslations(ns) : null;

  const title = t ? safeTWithNs(t, ns!, titleKey, "Gallery") : "Gallery";
  const prevLabel = t ? safeTWithNs(t, ns!, "prev", "Previous") : "Previous";
  const nextLabel = t ? safeTWithNs(t, ns!, "next", "Next") : "Next";

  const rowA = split === "alternate" ? images.filter((_, i) => i % 2 === 0)
                                     : images.slice(0, Math.ceil(images.length / 2));
  const rowB = split === "alternate" ? images.filter((_, i) => i % 2 === 1)
                                     : images.slice(Math.ceil(images.length / 2));

  const r1 = useRowScroller();
  const r2 = useRowScroller();

  return (
    <section id={sectionId} dir={rtl ? "rtl" : "ltr"} className={clsx("w-full space-y-6", className)}>
      <h2 className="text-center text-3xl font-semibold text-orange-600">{title}</h2>

      <SliderRow images={rowA} scroller={r1} prevLabel={prevLabel} nextLabel={nextLabel} rtl={rtl} />
      <SliderRow images={rowB} scroller={r2} prevLabel={prevLabel} nextLabel={nextLabel} rtl={rtl} />
    </section>
  );
}

function SliderRow({
  images,
  scroller,
  prevLabel,
  nextLabel,
  rtl = false,
}: {
  images: string[];
  scroller: ReturnType<typeof useRowScroller>;
  prevLabel: string;
  nextLabel: string;
  rtl?: boolean;
}) {
  return (
    <div className="relative">
      <div
        ref={scroller.ref}
        className={clsx(
          "flex gap-4 overflow-x-auto scroll-smooth",
          "snap-x snap-mandatory",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        {images.map((src, i) => (
          <figure key={i} className={clsx("snap-start shrink-0", "min-w-[90%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[32%]")}>
            <img
              src={src}
              alt=""
              loading="lazy"
              className={clsx("w-full object-cover", "h-[240px] md:h-[320px]", "rounded-[4px] border border-[rgba(39,41,100,0.2)]")}
            />
          </figure>
        ))}
      </div>

      {/* arrows; mirrored in RTL */}
      <Arrow side={rtl ? "right" : "left"} onClick={scroller.prev} label={prevLabel} />
      <Arrow side={rtl ? "left" : "right"} onClick={scroller.next} label={nextLabel} />
    </div>
  );
}

function Arrow({ side, onClick, label }: { side: "left" | "right"; onClick: () => void; label: string }) {
  const pos = side === "left" ? "left-2" : "right-2";
  const path = side === "left"
    ? "M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
    : "M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z";
  return (
    <button type="button" aria-label={label} onClick={onClick}
      className={clsx("absolute top-1/2 -translate-y-1/2 z-10", pos, "rounded-full bg-white/90 backdrop-blur shadow p-2 hover:bg-white", "hidden sm:inline-flex")}>
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#272964]" fill="currentColor"><path d={path} /></svg>
    </button>
  );
}

/* ---------- helpers ---------- */
function safeTWithNs(
  t: ReturnType<typeof useTranslations>,
  ns: string,
  key: string,
  fallback: string
) {
  try {
    const val = t(key);
    // if next-intl returns the key path when missing, fall back
    if (val === `${ns}.${key}`) return fallback;
    return val;
  } catch {
    return fallback;
  }
}
