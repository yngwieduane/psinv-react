"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, Clock, User } from "lucide-react";
import Breadcrumb from "../../_components/Breadcrumb";
import { Link } from "@/i18n/navigation";

// Types
import { ArticleBodyPart } from "@/data/articles";
type FirestoreArticle = {
    id: string | number;
    slug: string;
    title: string;
    summary: string;
    body: ArticleBodyPart[];
    date: string;
    author: string;
    categoryKey: string;
    category?: string;
    imageUrl: string;
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
    const href = `/articles-2/${item.slug}`;
    return (
        <Link href={href} title={item.title} className="group block h-full">
            <div className="flex flex-col md:flex-row gap-6 cursor-pointer h-full bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 p-4 border border-gray-50">
                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 bg-gray-100 relative">
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>

                <div className="flex flex-col justify-between flex-1">
                    <div>
                        <div className="flex items-center gap-2 text-xs text-secondary font-bold uppercase tracking-wider mb-2">
                            <span>{item.category || item.categoryKey}</span>
                        </div>
                        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                            {item.summary}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto">
                        <span className="flex items-center gap-1"><Clock size={12} /> {item.date}</span>
                        <span className="flex items-center gap-1"><User size={12} /> {item.author}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function Articles2ClientPage({ initialArticles }: { initialArticles: FirestoreArticle[] }) {
    const [query, setQuery] = useState("");

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

    return (
        <>
            <div className="bg-[#f4f4f4] mt-24 mb-3 border-b border-gray-200">
                <div className="container mx-auto px-6 lg:px-8 py-4">
                    <Breadcrumb
                        customSegments={[
                            { name: "Home", href: "/" },
                            { name: "Articles 2", href: "/articles-2" },
                        ]}
                    />
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filtered.map((item) => (
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

                </div>
            </div>
        </>
    );
}
