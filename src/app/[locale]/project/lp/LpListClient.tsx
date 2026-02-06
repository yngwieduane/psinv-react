"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

type Item = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export default function LpListClient({ items }: { items: Item[] }) {
  const { locale } = useParams<{ locale: string }>();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;

    return items.filter((it) =>
      [it.slug, it.title, it.description]
        .join(" ")
        .toLowerCase()
        .includes(s)
    );
  }, [q, items]);

  return (
    <section className="min-h-screen bg-gray-50 pt-48 pb-20">
      <div className="mx-auto max-w-[1140px] px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Landing Pages
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse and manage all project landing pages
          </p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search registration pages..."
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 shadow-sm outline-none focus:border-gray-300"
            />
          </div>

          <div className="mt-2 text-sm text-gray-500">
            Showing {filtered.length} of {items.length}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((it) => (
            <div
              key={it.slug}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={it.image}
                  alt={it.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  {it.slug}
                </div>

                <h3 className="mt-2 line-clamp-2 text-lg font-semibold">
                  {it.title}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                  {it.description}
                </p>

                <Link
                  href={`/${locale}/project/lp/${it.slug}`}
                  className="mt-4 inline-flex items-center font-semibold text-orange-600 hover:underline"
                >
                  View Page →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
