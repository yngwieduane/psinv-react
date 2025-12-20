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
  const total = normalized.length;
  const remainder = total % 4;

  return (
    <section className={clsx("bg-white px-4 py-12", className)}>
      <div className="mx-auto w-full max-w-6xl">
        <ul className="grid gap-6 justify-items-center grid-cols-2 md:grid-cols-4">
          {normalized.map((u, i) => {
            const isLastRow = remainder !== 0 && i >= total - remainder;

            let centerClass = "";

            // 1 item in last row → perfect center
            if (remainder === 1 && isLastRow && i === total - 1) {
              centerClass = "md:col-start-2 md:col-span-2";
            }

            // 2 items in last row → center pair
            if (remainder === 2 && isLastRow) {
              centerClass = i === total - 2 ? "md:col-start-2" : "md:col-start-3";
            }

            return (
              <li
                key={`${u.title}-${i}`}
                className={clsx(
                  "group w-full text-center shadow-sm",
                  "rounded-lg border border-gray-100 bg-white",
                  "p-8 min-h-[120px]",
                  "transition-colors duration-200",
                  "hover:bg-[#272964] hover:text-white hover:border-0",
                  centerClass
                )}
              >
                <div className="flex h-full flex-col items-center justify-center">
                  <p className="text-[22px] font-semibold text-[#111954] transition-colors duration-200 group-hover:text-white">
                    {u.title}
                  </p>

                  {u.desc && (
                    <p className="mt-2 text-[15px] text-[#111954]/80 transition-colors duration-200 group-hover:text-white/90">
                      {u.desc}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
