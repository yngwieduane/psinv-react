"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import Breadcrumb from "../../_components/Breadcrumb";
import { Link } from "@/i18n/navigation";
import slugify from 'react-slugify';

// Types
import { ArticleBodyPart } from "@/data/articles";
import { useLocale } from "next-intl";
type FirestoreArticle = {
    translations: any;
    id: string | number;
    slug: string;
    title: string;
    summary: string;
    body: ArticleBodyPart[];
    createdAt: string;
    author: string;
    categoryKey: string;
    category?: string;
    image: string;
    city?: string;
}

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
}: {
    item: FirestoreArticle;
}) {
    // Generate URL based on user request
    let categorySegment = item.category ? item.category.toLowerCase().replace(/\s+/g, '-') : 'general';

    // Normalize area guide check
    if (categorySegment.toLowerCase().replace(/\s+/g, '-') === 'area-guides' || categorySegment.toLowerCase().replace(/\s+/g, '-') === 'area-guide') {
        if (item.city) {
            const citySlug = item.city.toLowerCase().replace(/\s+/g, '-');
            categorySegment = `${categorySegment}/${citySlug}`;
        }
    }

    const href = `/articles/${categorySegment}/${item.slug}`;
    const locale = useLocale();
    return (
        <Link href={href} title={item.title} className="group block h-full">
            <div className="flex flex-col md:flex-row gap-6 cursor-pointer h-full bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 p-4 border border-gray-50">
                <div className="md:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-gray-100 relative">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>

                <div className="grid grid-cols-1 flex-col justify-between flex-1">
                    <div>
                        <div className="flex items-center gap-2 text-xs text-secondary font-bold uppercase tracking-wider mb-2">
                            <span>{item.category}</span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-primary transition-colors line-clamp-2 truncate text-ellipsis">
                            {item.translations[locale].title}
                        </h3>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto">
                        <span className="flex items-center gap-1"><Clock size={12} /> {item.createdAt}</span>
                        <span className="flex items-center gap-1"><User size={12} /> PSI Author</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function Articles2ClientPage({ initialArticles }: { initialArticles: FirestoreArticle[] }) {
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return initialArticles;

        return initialArticles.filter((n) => {
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
    }, [query, initialArticles]);

    // Reset page when query changes
    useMemo(() => {
        setCurrentPage(1);
    }, [query]);

    // Pagination Logic
    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const visibleArticles = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Removed import from here

    // ... (existing imports)

    // ...

    // Area Guide Cities
    const areaGuideCities = useMemo(() => {
        const cities: Record<string, { name: string, image: string, count: number }> = {};

        initialArticles.forEach(item => {
            const cat = (item.category || "").toLowerCase();
            const key = (item.categoryKey || "").toLowerCase();
            const isAreaGuide = cat.includes("area guide") || key.includes("area_guide");

            if (isAreaGuide && item.city) {
                if (!cities[item.city]) {
                    cities[item.city] = { name: item.city, image: item.image, count: 0 };
                }
                cities[item.city].count++;
            }
        });

        return Object.values(cities).sort((a, b) => a.name.localeCompare(b.name));
    }, [initialArticles]);

    return (
        <>
            <div className="pt-28 md:pt-24 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-12 py-4">
                    <Breadcrumb />
                </div>
            </div>

            <div className="min-h-screen bg-white pb-20">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="py-16 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Latest Insights</h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12">
                            Explore expert analysis, market trends, and guides from our real estate professionals.
                        </p>

                        {/* Search */}
                        <div className="mb-12">
                            <PillSearch value={query} onChange={setQuery} placeholder="Search articles..." />
                        </div>
                    </div>

                    {/* Articles Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {visibleArticles.map((item) => (
                            <RecentArticleRow
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg">No articles found matching your search.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8 pb-12 border-b border-gray-100">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={24} className="text-gray-600" />
                            </button>

                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
                                            ${currentPage === page
                                                ? "bg-gray-900 text-white font-medium"
                                                : "hover:bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={24} className="text-gray-600" />
                            </button>
                        </div>
                    )}

                    {/* Area Guides Section */}
                    {areaGuideCities.length > 0 && (
                        <div className="pt-16 pb-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">Area Guides</h2>
                                <Link
                                    href="/articles/area-guide"
                                    className="text-primary font-medium hover:underline flex items-center gap-2"
                                >
                                    View All <ChevronRight size={16} />
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {areaGuideCities.map((city) => (
                                    <Link
                                        key={city.name}
                                        href={`/articles/area-guide/${slugify(city.name)}`}
                                        className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all block"
                                    >
                                        <Image
                                            src={city.image}
                                            alt={city.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                            <h3 className="text-3xl font-bold mb-2">{city.name}</h3>
                                            <span className="text-sm font-medium bg-white/20 backdrop-blur-md px-4 py-1 rounded-full">
                                                {city.count} Guides
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}

