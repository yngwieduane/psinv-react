"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

import Breadcrumb from "../../[locale]/_components/Breadcrumb";
import { Link } from "@/i18n/navigation";
import { NEWS } from "@/data/articles";
import VideosSection from "./_components/VideosSection";
import { useTranslations, useLocale } from "next-intl";


type NewsItem = (typeof NEWS)[number];

function PillSearch({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="max-w-3xl mx-auto relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 bg-gray-50
                   focus:bg-white focus:border-gray-300 focus:outline-none transition-all"
      />
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  );
}

function RecentArticleRow({
  item,
  readMoreLabel,
}: {
  item: NewsItem;
  readMoreLabel: string;
}) {
  const href = `/articles/${item.slug}`;
  const imgTitle = item.title ?? "Article";
  return (
    <Link href={href} title={item.title} className="group block">
      <div className="flex flex-col md:flex-row gap-6 cursor-pointer">
        <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-gray-100">
          <Image
            src={item.imageUrl}
            alt={imgTitle}
            title={imgTitle}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div>
          <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-gray-900 transition-colors line-clamp-2">
            {item.title}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2 mb-2 hidden md:block">
            {item.summary}
          </p>

          <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
            {readMoreLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}

const normalizeCategory = (c?: string) =>
  (c ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");

const toTime = (d: string) => {
  const t = Date.parse(d);
  return Number.isNaN(t) ? 0 : t;
};

export default function ArticlesPage() {
  const locale = useLocale();
  const rtl = locale === "ar";

  const ui = useTranslations("ArticlesPage");
  const a = useTranslations("Articles");

  const [query, setQuery] = useState("");


  // ✅ Localize title/summary from translations
  const localizedNews = useMemo(() => {
    return NEWS.map((n) => ({
      ...n,
      title: a(`${n.id}.title`),
      summary: a(`${n.id}.summary`),
    }));
  }, [a]);

  // ✅ Search uses localized fields
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return localizedNews;

    return localizedNews.filter((n) => {
      const haystack = [
        n.title,
        n.summary,
        n.category,
        n.slug,
        n.categoryKey,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    });
  }, [query, localizedNews]);
  const recentItems = useMemo(() => {
    return [...localizedNews]
      .sort((a, b) => toTime(b.date) - toTime(a.date)) // newest first
      .slice(0, 4);
  }, [localizedNews]);

  const CATEGORY_ORDER = ["rules_and_regulations", "laws", "technology"] as const;
  type Category = (typeof CATEGORY_ORDER)[number];

  const CATEGORY_IMAGE_CONFIG: Record<Category, { src: string; position: string }> =
  {
    rules_and_regulations: {
      src: "/assets/images/articles/categories/rules-regulation.webp",
      position: "bottom center",
    },
    laws: {
      src: "/assets/images/articles/categories/laws.webp",
      position: "center center",
    },
    technology: {
      src: "/assets/images/articles/categories/technology.webp",
      position: "center top",
    },
  };

  const propertyGuideItems = useMemo(() => {
    return localizedNews
      .filter((x) => normalizeCategory(x.category) === normalizeCategory("Property Guide"))
      .sort((x, y) => toTime(y.date) - toTime(x.date))
      .slice(0, 4);
  }, [localizedNews]);

  // ✅ Category blocks
  const categoryBlocks = useMemo(() => {
    return CATEGORY_ORDER.map((cat) => {
      const items = localizedNews
        .filter((x) => normalizeCategory(x.category) === normalizeCategory(cat))
        .sort((a, b) => toTime(b.date) - toTime(a.date));

      const cfg = CATEGORY_IMAGE_CONFIG[cat] ?? {
        src: "/images/og/default.jpg",
        position: "center center",
      };

      return {
        catKey: cat,
        title: ui(`categories.${cat}`),
        imageUrl: cfg.src,
        imagePosition: cfg.position,
        links: items.slice(0, 4).map((x) => ({
          title: x.title,
          href: `/articles/${x.slug}`,
        })),
      };
    });
  }, [ui, localizedNews]);
  const recentOrFiltered = useMemo(() => {
    if (query.trim()) {
      return filtered.slice(0, 4); // show search results
    }
    return recentItems; // default latest articles
  }, [query, filtered, recentItems]);

  return (
    <>
      <div className="bg-[#f4f4f4] mt-30 mb-3 border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-8 py-4">
          <Breadcrumb />
        </div>
      </div>

      <div className="min-h-screen bg-white pt-32 pb-20" dir={rtl ? "rtl" : "ltr"}>
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="text-4xl font-bold text-center mb-16">{ui("title")}</h1>

          {/* Search */}
          <div className="mb-20">
            <PillSearch value={query} onChange={setQuery} placeholder={ui("searchPlaceholder")} />
          </div>

          {/* Recent Articles */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 border-b border-gray-100 pb-4">
              {ui("recentArticles")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {recentOrFiltered.map((item) => (
                <RecentArticleRow
                  key={item.id}
                  item={item}
                  readMoreLabel={ui("readMore")}
                />
              ))}
            </div>
          </div>

          {/* ======================= Property / Area Guide ======================= */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            {/* Property Guide */}
            <div>
              <h2 className="text-2xl font-serif font-bold mb-8 border-b border-gray-100 pb-4">
                {ui("propertyGuide")}
              </h2>

              {/* Featured image (static) */}
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6 group cursor-pointer">
                <Image
                  src="/assets/images/articles/property-guide-feature.webp"
                  alt={ui("propertyGuideFeaturedAlt")}
                  title={ui("propertyGuideFeaturedAlt")}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <h3 className="text-white font-bold text-xl leading-snug">
                    {ui("propertyGuideFeaturedTitle")}
                  </h3>
                </div>
              </div>

              <ul className="space-y-4">
                {propertyGuideItems.map((x, idx) => (
                  <li
                    key={x.id}
                    className={`text-sm text-gray-600 hover:text-primary cursor-pointer ${idx !== propertyGuideItems.length - 1 ? "border-b border-gray-50 pb-2" : ""
                      }`}
                  >
                    <Link href={`/articles/${x.slug}`} title={x.title} className="block">
                      {x.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ✅ Area Guide (2 city cards like your screenshot) */}
            <div>
              <h2 className="text-2xl font-serif font-bold mb-8 border-b border-gray-100 pb-4">
                {ui("areaGuide")}
              </h2>
              <div className="space-y-8">
                {/* Abu Dhabi */}
                <Link
                  href="/articles/area-guide/abu-dhabi"
                  title="Abu Dhabi Area Guide"
                  locale={undefined}
                  className="relative block h-60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <Image
                    src="/assets/images/articles/auh.jpg"
                    alt="Abu Dhabi Area Guide"
                    title="Abu Dhabi Area Guide"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 right-4 text-white text-sm font-semibold">
                    Abu Dhabi
                  </div>
                </Link>

                {/* Dubai */}
                <Link
                  href="/articles/area-guide/dubai"
                  title="Dubai Area Guide"
                  locale={undefined}
                  className="relative block h-60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <Image
                    src="/assets/images/articles/dubai.jpg"
                    alt="Dubai Area Guide"
                    title="Dubai Area Guide"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 right-4 text-white text-sm font-semibold">
                    Dubai
                  </div>
                </Link>
              </div>

            </div>
          </section>

          {/* Videos */}
          <section className="mb-20">
            <VideosSection />
          </section>

          {/* Categories */}
          <section className="pb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {categoryBlocks.map((b) => (
                <div key={b.catKey} className="bg-gray-50 p-6 rounded-2xl">
                  <div className="relative w-full h-40 rounded-xl overflow-hidden mb-6 shadow-sm">
                    <Image
                      src={b.imageUrl}
                      alt={b.title}
                      title={b.title}
                      fill
                      className="object-cover"
                      style={{ objectPosition: b.imagePosition }}
                    />
                  </div>

                  <h3 className="font-serif font-bold text-xl mb-4">{b.title}</h3>

                  <ul className="space-y-4 text-xs text-gray-600">
                    {b.links.map((l) => (
                      <li key={l.href} className="hover:text-primary cursor-pointer">
                        <Link href={l.href} title={l.title} className="hover:underline underline-offset-4">
                          {l.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
