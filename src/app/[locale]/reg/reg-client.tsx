"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { getRegDirectory } from "@/utils/regDirectory";

const PAGE_SIZE = 9;

function RegCardItem({
  p,
}: {
  p: {
    slug: string;
    href: string;
    title: string;
    description?: string;
    image?: string;
    fallbackImage: string;
  };
}) {
  const [imgSrc, setImgSrc] = useState(p.image || p.fallbackImage);
  useEffect(() => {
    setImgSrc(p.image || p.fallbackImage);
  }, [p.image, p.fallbackImage]);

  return (
    <Link
      href={p.href}
      className="group block rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-[160px] bg-gray-100 overflow-hidden">
        <Image
          src={imgSrc}
          alt={p.title}
          fill
          onError={() => setImgSrc(p.fallbackImage)}
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>

      <div className="p-5">
        <h3 className="font-serif font-bold text-lg text-gray-800 line-clamp-2 group-hover:text-primary transition-colors">
          {p.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-3 leading-relaxed">
          {p.description || "—"}
        </p>

        <div className="mt-4 inline-flex items-center text-sm font-bold uppercase tracking-wider text-primary group-hover:underline underline-offset-4">
          View Page →
        </div>
      </div>
    </Link>
  );
}

export default function RegDirectoryClient() {
  const locale = useLocale() as "en" | "ar";
  const rtl = locale === "ar";

  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const allCards = useMemo(() => getRegDirectory(locale), [locale]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return allCards;

    return allCards.filter((p) => {
      return (
        p.title.toLowerCase().includes(query) ||
        p.slug.toLowerCase().includes(query) ||
        (p.description || "").toLowerCase().includes(query)
      );
    });
  }, [q, allCards]);

  useEffect(() => {
    setPage(1);
  }, [q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paged = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const canPrev = safePage > 1;
  const canNext = safePage < totalPages;

  const goPrev = () => canPrev && setPage((p) => p - 1);
  const goNext = () => canNext && setPage((p) => p + 1);

  return (
    <div
      className="mx-auto w-full px-4 sm:px-6 lg:max-w-6xl py-12"
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="text-center mb-10 mt-30">
        <h1 className="text-4xl font-serif font-bold tracking-tight">
          Registration Pages
        </h1>
        <p className="text-gray-500 mt-3">
          Browse all registration pages and find the right one quickly.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-3 shadow-sm">
          <span className="text-gray-400">🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search registration pages..."
            className="w-full outline-none bg-transparent text-sm"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paged.map((p) => (
          <RegCardItem key={p.slug} p={p as any} />
        ))}
      </div>

      {/* Pagination (like screenshot) */}
      {!q && totalPages > 1 && (
        <div
          className={`mt-10 flex items-center justify-center gap-6 ${
            rtl ? "flex-row-reverse" : ""
          }`}
        >
          <button
            onClick={goPrev}
            disabled={!canPrev}
            className="flex items-center gap-2 px-8 py-3 rounded-full border border-gray-200 bg-white text-gray-500
                       hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <ChevronLeft size={18} className={rtl ? "rotate-180" : ""} />
            Previous
          </button>

          <div className="text-gray-400 font-mono text-sm">
            Page <span className="text-gray-700">{safePage}</span>
          </div>

          <button
            onClick={goNext}
            disabled={!canNext}
            className="flex items-center gap-2 px-8 py-3 rounded-full border border-gray-200 bg-white text-gray-500
                       hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            Next
            <ChevronRight size={18} className={rtl ? "rotate-180" : ""} />
          </button>
        </div>
      )}

      {/* Count */}
      <div className="mt-6 text-center text-xs text-gray-400">
        Showing {paged.length} of {filtered.length}
      </div>
    </div>
  );
}
