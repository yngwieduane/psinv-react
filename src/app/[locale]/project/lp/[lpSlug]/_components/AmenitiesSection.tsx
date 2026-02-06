"use client";

import clsx from "clsx";

export type AmenityItem = {
  label: string;
  icon?: string;
};
export default function AmenitiesSection({
  title,
  desc,
  cta,
  ctaHref,
  items,
  sectionId = "amenities",
  className,
}: {
  title?: string;
  desc?: string;
  cta?: string;
  ctaHref?: string;
  items: ReadonlyArray<AmenityItem>;
  sectionId?: string;
  className?: string;
}) {
  const normalized = (items ?? []).filter(Boolean);
  return (
    <section id={sectionId} className={clsx("bg-[#272964] relative", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative text-white max-w-[593px]">
          <img
            src="/images/landing-page/lp-icons/international-buildings.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none select-none absolute -left-8 w-[420px] max-w-none opacity-20 md:opacity-30"
          />
          <div className="relative z-10">
            {title && (
              <h2 className="mb-4 text-4xl md:text-5xl font-semibold leading-tight">
                {title}
              </h2>
            )}
            {desc && <p className="text-white/90 text-lg leading-8">{desc}</p>}
            {cta && ctaHref && (
              <a
                href={ctaHref}
                className="inline-flex items-center mt-6 rounded-md bg-[#B63E0B] px-6 py-3 font-semibold text-white hover:bg-[#8F2F08] transition-colors"
              >
                {cta}
                <svg className="ml-2" width="17" height="8" viewBox="0 0 17 8" fill="none">
                  <path d="M16.3536 4.35355C16.5488 4.15829 16.5488 3.84171 16.3536 3.64645L13.1716 0.464466C12.9763 0.269204 12.6597 0.269204 12.4645 0.464466C12.2692 0.659728 12.2692 0.976311 12.4645 1.17157L15.2929 4L12.4645 6.82843C12.2692 7.02369 12.2692 7.34027 12.4645 7.53553C12.6597 7.7308 12.9763 7.7308 13.1716 7.53553L16.3536 4.35355ZM0 4.5H16V3.5H0V4.5Z" fill="#FFFFFF"/>
                </svg>
              </a>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-y-16 text-center text-white">
          {normalized.map((a, i) => (
            <div key={`${a.label}-${i}`} className="flex flex-col items-center">
              {a.icon && (
                <img
                  src={a.icon}
                  alt=""
                  className="w-8 h-8 object-contain"
                  loading="lazy"
                />
              )}
              <p className="mt-3 text-base font-light">{a.label}</p>
              <span className="mt-4 h-px w-24 bg-white/20 mx-auto hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
