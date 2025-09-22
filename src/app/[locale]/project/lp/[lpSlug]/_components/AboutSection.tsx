"use client";

import { useState } from "react";
import clsx from "clsx";

export interface AboutProps {
  image?: string;
  heading?: string;
  subheading?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  videoId?: string;
  className?: string;
}

export default function AboutSection({
  image,
  heading,
  subheading,
  description,
  ctaText,
  ctaHref,
  videoId,
  className,
}: AboutProps) {
  const [open, setOpen] = useState(false);
  const hasVideo = Boolean(videoId);

  return (
    <section
      id="about"
      className={clsx(
        "grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch",
        className
      )}
    >
      {/* Left: image with optional play button */}
      <div className="relative w-full">
        {image ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-[4px]">
            <img
              src={image}
              alt={heading || "Project image"}
              className="h-full w-full object-cover"
            />
            {hasVideo && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Play video"
                className="absolute inset-0 grid place-items-center focus:outline-none"
              >
                <span className="inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white/90 shadow transition-transform duration-200 hover:scale-105">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 md:h-10 md:w-10 text-[#272964]"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7-11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        ) : null}
      </div>

      {/* Right: text block */}
      <div className="bg-[#151e54] p-8 flex flex-col justify-center">
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold text-white">{heading}</h2>
        )}
        {subheading && (
          <p className="mt-2 text-lg font-semibold text-white/80">{subheading}</p>
        )}
        {description && (
          <p className="mt-5 leading-7 text-white/90">{description}</p>
        )}
        {ctaText && ctaHref && (
          <a
            href={ctaHref}
            className="mt-6 inline-block rounded-md bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700"
          >
            {ctaText}
          </a>
        )}
      </div>

      {/* Modal with YouTube iframe */}
      {open && hasVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="text-base font-semibold">
                {heading || "Project video"}
              </h3>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded p-2 hover:bg-black/5"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4l-6.3 6.3-1.42-1.42 6.3-6.29-6.3-6.29L4.3 4.3l6.3 6.29 6.3-6.29z" />
                </svg>
              </button>
            </div>
            <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={heading || "YouTube video"}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
