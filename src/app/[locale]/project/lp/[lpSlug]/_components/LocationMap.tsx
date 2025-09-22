"use client";

import React from "react";
import { useTranslations } from "next-intl";

type Props = {
  mapEmbedUrl?: string;
  /** If you pass a plain string, it wins */
  title?: string;
  /** i18n namespace to read from (e.g. "LandingPages.sama-yas.ProjectPage") */
  titleNs?: string;
  /** i18n key inside the namespace (default: "location") */
  titleKey?: string;
};

const LocationMap = ({ mapEmbedUrl, title, titleNs, titleKey = "location" }: Props) => {
  if (!mapEmbedUrl) return null;

  // Use a specific namespace if provided; otherwise use the generic "ProjectPage"
  const t = useTranslations(titleNs ?? "ProjectPage");
  const heading = title ?? t(titleKey);

  return (
    <section className="py-12">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-[#F26522] mb-8">
        {heading}
      </h2>

      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl shadow-sm">
          <iframe
            src={mapEmbedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            aria-label="Google map"
          />
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
