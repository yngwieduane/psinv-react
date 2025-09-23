"use client";

import React from "react";

type HeroSectionProps = {
  sectionId?: string;
  heading: string;
  sub?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  img: string;
  rightSlot?: React.ReactNode;
  topSlot?: React.ReactNode;
  className?: string;
};

export default function HeroSection({
  sectionId = "home",
  heading,
  sub,
  description,
  ctaText,
  ctaHref,
  img,
  rightSlot,
  topSlot,
  className,
}: HeroSectionProps) {
  return (
    <section
      id={sectionId}
      className={`relative overflow-hidden min-h-[560px] scroll-mt-24 ${className ?? ""}`}
    >
      <img
        src={img}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative h-full">
        {topSlot && (
          <div className="container mx-auto px-4 py-3">
            {topSlot}
          </div>
        )}
        <div className="container mx-auto h-full px-4 pb-6">
          <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 flex items-center">
              <div className="text-white pb-4">
                <h1 className="text-3xl md:text-5xl font-bold">{heading}</h1>
                {sub && <p className="mt-3 max-w-[640px] text-lg">{sub}</p>}
                {description && <p className="mt-3 max-w-[640px]">{description}</p>}
                {ctaText && (
                  <a
                    href={ctaHref || "#"}
                    className="inline-block mt-4 rounded bg-orange-600 px-5 py-3 text-white hover:bg-orange-700"
                  >
                    {ctaText}
                  </a>
                )}
              </div>
            </div>
            <div className="lg:col-span-5 flex items-center justify-end">
              {rightSlot}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
