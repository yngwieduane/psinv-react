"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";

import Breadcrumb from "../../[locale]/_components/Breadcrumb";
import { Link } from "@/i18n/navigation";
import { ARTICLES, NEWS } from "@/data/articles";
import VideosSection from "./_components/VideosSection";

type NewsItem = (typeof NEWS)[number];
function PillSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="max-w-3xl mx-auto relative">
      <input
        type="text"
        placeholder="Search articles..."
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

function RecentArticleRow({ item }: { item: NewsItem }) {
  const href = `/articles/${item.slug}`;

  return (
    <Link href={href} className="group block">
      <div className="flex flex-col md:flex-row gap-6 cursor-pointer">
        {/* Image */}
        <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-gray-100">
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div>
          <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-gray-900 transition-colors line-clamp-2">
            {item.title}
          </h3>

          {/* summary only on md+ like your screenshot */}
          <p className="text-sm text-gray-500 line-clamp-2 mb-2 hidden md:block">
            {item.summary}
          </p>

          <span className="text-xs font-bold uppercase tracking-wider text-gray-800">
            Read More
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ArticlesPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return NEWS;
    const q = query.toLowerCase();

    return NEWS.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.category.toLowerCase().includes(q)
    );
  }, [query]);
 const CATEGORY_ORDER = ["Rules And Regulation", "Laws", "Technology"] as const;
type Category = (typeof CATEGORY_ORDER)[number];

const CATEGORY_IMAGE_CONFIG: Record<Category, { src: string; position: string }> = {
  "Rules And Regulation": { src: "/assets/images/articles/categories/rules-regulation.webp", position: "bottom center" },
  Laws: { src: "/assets/images/articles/categories/laws.webp", position: "center center" },
  Technology: { src: "/assets/images/articles/categories/technology.webp", position: "center top" },
};
const propertyGuideItems = useMemo(() => {
  return ARTICLES
    .filter((a) => a.category === "Property Guide")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);
}, []);
const categoryBlocks = useMemo(() => {
  return CATEGORY_ORDER.map((cat) => {
    const items = ARTICLES.filter((a) => a.category === cat);

    const cfg = CATEGORY_IMAGE_CONFIG[cat] ?? {
      src: "/images/og/default.jpg",
      position: "center center",
    };

    return {
      title: cat,
      imageUrl: cfg.src,
      imagePosition: cfg.position,
      links: items.slice(0, 4).map((a) => ({
        title: a.title,
        href: `/articles/${a.slug}`,
      })),
    };
  });
}, []);

  return (
    <>
      <Breadcrumb />

      <div className="min-h-screen bg-white pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="text-4xl font-bold text-center mb-16">Articles</h1>

          {/* Search */}
          <div className="mb-20">
            <PillSearch value={query} onChange={setQuery} />
          </div>

          {/* Recent Articles */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8 border-b border-gray-100 pb-4">
              Recent Articles
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {filtered.slice(0, 4).map((item) => (
              <RecentArticleRow key={item.id} item={item} />
              ))}
            </div>
          </div>
              {/* ======================= Property / Area Guide ======================= */}
<section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">

  {/* ---------------------- Property Guide ---------------------- */}
  <div>
    <h2 className="text-2xl font-serif font-bold mb-8 border-b border-gray-100 pb-4">
      Property Guide:
    </h2>

    {/* Featured article */}
    <div className="relative h-64 rounded-2xl overflow-hidden mb-6 group cursor-pointer">
      <Image
        src="/assets/images/articles/property-guide-feature.webp"
        alt="Affordable Housing in the UAE"
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
        <h3 className="text-white font-bold text-xl leading-snug">
          Affordable Housing in the UAE: Market Analysis and Growth Projection
        </h3>
      </div>
    </div>
<ul className="space-y-4">
  {propertyGuideItems.map((a, idx) => (
    <li
      key={a.id}
      className={`text-sm text-gray-600 hover:text-primary cursor-pointer ${
        idx !== propertyGuideItems.length - 1 ? "border-b border-gray-50 pb-2" : ""
      }`}
    >
      <Link href={`/articles/${a.slug}`} className="block">
        {a.title}
      </Link>
    </li>
  ))}
</ul>
  </div>

  {/* ---------------------- Area Guide ---------------------- */}
  <div>
    <h2 className="text-2xl font-serif font-bold mb-8 border-b border-gray-100 pb-4">
      Area Guide
    </h2>

    <div className="space-y-6">
      {/* Abu Dhabi */}
      <div className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer">
        <Image
          src="/assets/images/articles/area-abu-dhabi.webp"
          alt="Abu Dhabi Area Guide"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-white">
          Abu Dhabi
        </span>
      </div>

      {/* Dubai */}
      <div className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer">
        <Image
          src="/assets/images/articles/area-dubai.webp"
          alt="Dubai Area Guide"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-white">
          Dubai
        </span>
      </div>
    </div>
  </div>

</section>
{/* -------------------------------- Videos -------------------------------- */}
<section className="mb-20">
<VideosSection />
</section>

{/* -------------------------- Rules / Laws / Tech -------------------------- */}
<section className="pb-24">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
    {categoryBlocks.map((b) => (
      <div key={b.title} className="bg-gray-50 p-6 rounded-2xl">
<div className="relative w-full h-40 rounded-xl overflow-hidden mb-6 shadow-sm">
  <Image
    src={b.imageUrl}
    alt={b.title}
    fill
    className="object-cover"
    style={{ objectPosition: b.imagePosition }}
  />
</div>
        <h3 className="font-serif font-bold text-xl mb-4">{b.title}</h3>

        <ul className="space-y-4 text-xs text-gray-600">
          {b.links.map((l) => (
            <li key={l.href} className="hover:text-primary cursor-pointer">
              <Link href={l.href} className="hover:underline underline-offset-4">
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
