// src/app/[locale]/project/lp/[lpSlug]/_components/UspSection.tsx
"use client";

import clsx from "clsx";

export type UspItem = { title: string; desc?: string };

export default function UspSection({
  items,
  className,
}: {
  items: ReadonlyArray<UspItem>;
  className?: string;
}) {
  const normalized = items.filter(Boolean);

  return (
    <section className={clsx("bg-white px-4 py-12", className)}>
      <div className="mx-auto w-full max-w-6xl">
        <ul className="grid gap-6 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {normalized.map((u, i) => (
            <li
              key={`${u.title}-${i}`}
              className={clsx(
                "group text-center shadow-sm",
                "rounded-[4px] border border-[rgba(39,41,100,0.2)] bg-white",
                "p-8 min-h-[120px]",
                "transition-colors duration-200",
                "hover:bg-[#272964] hover:text-white hover:border-0"
              )}
            >
              <div className="flex h-full flex-col items-center justify-center">
                <p
                  className={clsx(
                    "text-[22px] font-semibold",
                    "text-[#111954]",
                    "transition-colors duration-200",
                    "group-hover:text-white"
                  )}
                >
                  {u.title}
                </p>

                {u.desc && (
                  <p
                    className={clsx(
                      "mt-2 text-[15px]",
                      "text-[#111954]/80",
                      "transition-colors duration-200",
                      "group-hover:text-white/90"
                    )}
                  >
                    {u.desc}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
