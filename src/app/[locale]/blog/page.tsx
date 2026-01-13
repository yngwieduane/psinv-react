"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Search, ChevronLeft, ChevronRight, Calendar, User } from "lucide-react";

import Breadcrumb from "../_components/Breadcrumb";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { BlogPost } from "@/data/blog";
import { getBlogPosts } from "@/app/actions/getBlogPosts";

type BlogItem = BlogPost;
const PAGE_SIZE = 10;

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

function BlogListRow({
    item,
    readMoreLabel,
    rtl
}: {
    item: BlogItem;
    readMoreLabel: string;
    rtl: boolean;
}) {
    const href = `/blog/${item.slug}`;
    const imgTitle = item.title ?? "Blog Post";

    return (
        <Link href={href} title={item.title} className="group block bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col md:flex-row h-full">
                {/* Image Side */}
                <div className="w-full md:w-1/3 h-64 md:h-auto relative shrink-0 bg-gray-100 overflow-hidden">
                    <Image
                        src={item.imageUrl || '/assets/images/placeholder.jpg'}
                        alt={imgTitle}
                        title={imgTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </div>

                {/* Content Side */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                    <div className={`flex items-center text-xs text-gray-400 mb-3 space-x-4 ${rtl ? 'space-x-reverse' : ''}`}>
                        {item.date && (
                            <div className="flex items-center">
                                <Calendar size={14} className={rtl ? "ml-1" : "mr-1"} />
                                <span>{item.date}</span>
                            </div>
                        )}
                        {item.author && (
                            <div className="flex items-center">
                                <User size={14} className={rtl ? "ml-1" : "mr-1"} />
                                <span>{item.author}</span>
                            </div>
                        )}
                    </div>

                    <h3
                        className="font-serif font-bold text-2xl text-gray-800 mb-3 group-hover:text-primary transition-colors line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: item.title || '' }}
                    />

                    <p
                        className="text-gray-500 line-clamp-3 mb-6 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: item.summary || '' }}
                    />

                    <div className="mt-auto">
                        <span className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-primary group-hover:underline underline-offset-4">
                            {readMoreLabel}
                            <ChevronRight size={16} className={`relative top-[1px] ${rtl ? "rotate-180 mr-1" : "ml-1"}`} />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function BlogPage() {
    const locale = useLocale();
    const rtl = locale === "ar";
    const ui = useTranslations("BlogPage");

    const [queryText, setQueryText] = useState("");
    const [posts, setPosts] = useState<BlogItem[]>([]);
    const [loading, setLoading] = useState(true);

    // Pagination State
    const [page, setPage] = useState(1);
    const [cursors, setCursors] = useState<Record<number, string | undefined>>({});
    const [hasMore, setHasMore] = useState(true);

    // Fetch posts from Server Action
    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                // startAfter is lastDate from previous page result
                const startAfter = cursors[page];
                const { posts: newPosts, lastDate, hasMore: more } = await getBlogPosts(PAGE_SIZE, startAfter, queryText);

                setPosts(newPosts);
                setHasMore(more);

                // Store cursor for NEXT page
                // Key is page + 1 (the page that will use this cursor)
                if (more && lastDate) {
                    setCursors(prev => ({
                        ...prev,
                        [page + 1]: lastDate
                    }));
                }

            } catch (error) {
                console.error("Failed to load posts", error);
            } finally {
                setLoading(false);
            }
        }

        // Debounce search
        const timer = setTimeout(() => {
            load();
        }, 500);

        return () => clearTimeout(timer);
    }, [page, queryText]);

    const handleNext = () => {
        setPage(p => p + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage(p => p - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSearch = (v: string) => {
        setQueryText(v);
        setPage(1);
        setCursors({});
    };

    return (
        <>
            <div className="bg-[#f4f4f4] mt-30 mb-3 border-b border-gray-200">
                <div className="container mx-auto px-6 lg:px-8 py-4">
                    <Breadcrumb />
                </div>
            </div>

            <div className="min-h-screen bg-white pt-16 pb-20" dir={rtl ? "rtl" : "ltr"}>
                <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold mb-6 font-serif">{ui("title")}</h1>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            {ui("subtitle")}
                        </p>
                    </div>

                    {/* Search */}
                    <div className="mb-16">
                        <PillSearch value={queryText} onChange={handleSearch} placeholder={ui("searchPlaceholder")} />
                    </div>

                    {/* Blog List */}
                    <div className="mb-20">
                        {loading ? (
                            <div className="space-y-8 animate-pulse">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-64 bg-gray-100 rounded-2xl w-full"></div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {posts.length > 0 ? (
                                    posts.map((item) => (
                                        <BlogListRow
                                            key={item.id}
                                            item={item}
                                            readMoreLabel={ui("readMore")}
                                            rtl={rtl}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-gray-50 rounded-2xl text-gray-500">
                                        {ui("noPostsFound")}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {!queryText && posts.length > 0 && (
                        <div className="flex justify-center items-center space-x-6">
                            <button
                                onClick={handlePrev}
                                disabled={page === 1 || loading}
                                className="cursor-pointer flex items-center px-6 py-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={20} className={rtl ? "ml-2 rotate-180" : "mr-2"} />
                                {ui("previous")}
                            </button>

                            <span className="text-gray-400 font-mono text-sm">
                                {ui("page")} {page}
                            </span>

                            <button
                                onClick={handleNext}
                                disabled={!hasMore || loading}
                                className="cursor-pointer flex items-center px-6 py-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {ui("next")}
                                <ChevronRight size={20} className={rtl ? "mr-2 rotate-180" : "ml-2"} />
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
