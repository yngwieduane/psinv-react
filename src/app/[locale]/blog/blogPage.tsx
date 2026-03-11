"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Search, ChevronLeft, ChevronRight, Calendar, User, Clock } from "lucide-react";

import Breadcrumb from "../_components/Breadcrumb";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { BlogPost, calculateReadTime } from "@/data/blog";
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
    //const blogBody1 = item.body ?? "blog body";
    const blogBody1 = item.contentHtml || "";
    const readTime = useMemo(() => calculateReadTime(blogBody1), [blogBody1]);
    //     console.log("Content length:", blogBody1?.length);
    // console.log("Calculated read time:", readTime);
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
                        {readTime && (
                            <div className="flex items-center italic text-sm ">
                                <Clock size={14} className={rtl ? "ml-1" : "mr-1"} />
                                <span>{readTime} min read</span>
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
    const [totalPages, setTotalPages] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [jumpPage, setJumpPage] = useState("");
    // Fetch posts from Server Action
    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const {
                    posts: newPosts,
                    totalPages: total,
                    hasMore: more,
                } = await getBlogPosts(page, PAGE_SIZE, queryText);

                setPosts(newPosts);
                setTotalPages(total);
                setHasMore(more);
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
    };
    const getVisiblePages = () => {
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        let start = Math.max(1, page - 2);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const visiblePages = getVisiblePages();
    return (
        <>

            <div className="pt-28 md:pt-36 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-12">
                    <Breadcrumb
                    />
                </div>
            </div>

            <div className="min-h-screen bg-white mt-10" dir={rtl ? "rtl" : "ltr"}>
                <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold mb-6 font-serif">{ui("title")}</h1>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            {ui("subtitle")}
                        </p>
                    </div>

                    {/* Search */}
                    <div className="mb-8">
                        <PillSearch value={queryText} onChange={handleSearch} placeholder={ui("searchPlaceholder")} />
                    </div>

                    {/* Top Pagination */}
                    <div className="md:hidden block mb-8">
                        {!queryText && posts.length > 0 && totalPages > 1 && (
                            <div className="flex flex-col items-center gap-4 mb-8">
                                <div className="flex flex-wrap justify-center items-center gap-2">
                                    <button
                                        onClick={handlePrev}
                                        disabled={page === 1 || loading}
                                        className="cursor-pointer flex items-center px-5 py-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <ChevronLeft size={18} className={rtl ? "ml-2 rotate-180" : "mr-2"} />
                                        {ui("previous")}
                                    </button>

                                    <>
                                        {visiblePages[0] > 1 && (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setPage(1);
                                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                                    }}
                                                    className={`w-10 h-10 rounded-full border text-sm font-semibold transition ${page === 1
                                                            ? "bg-primary text-white border-primary"
                                                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    1
                                                </button>

                                                {visiblePages[0] > 2 && (
                                                    <span className="px-2 text-gray-400">...</span>
                                                )}
                                            </>
                                        )}

                                        {visiblePages.map((pageNumber) => (
                                            <button
                                                key={pageNumber}
                                                onClick={() => {
                                                    setPage(pageNumber);
                                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                                }}
                                                className={`w-10 h-10 rounded-full border text-sm font-semibold transition ${page === pageNumber
                                                        ? "bg-primary text-white border-primary"
                                                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                                                    }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        ))}

                                        {visiblePages[visiblePages.length - 1] < totalPages && (
                                            <>
                                                {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                                                    <span className="px-2 text-gray-400">...</span>
                                                )}

                                                <button
                                                    onClick={() => {
                                                        setPage(totalPages);
                                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                                    }}
                                                    className={`w-10 h-10 rounded-full border text-sm font-semibold transition ${page === totalPages
                                                            ? "bg-primary text-white border-primary"
                                                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {totalPages}
                                                </button>
                                            </>
                                        )}
                                    </>

                                    <button
                                        onClick={handleNext}
                                        disabled={page === totalPages || loading}
                                        className="cursor-pointer flex items-center px-5 py-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {ui("next")}
                                        <ChevronRight size={18} className={rtl ? "mr-2 rotate-180" : "ml-2"} />
                                    </button>
                                </div>
                            </div>
                        )}
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
                    {/* Bottom Pagination - Desktop Only */}
                    {!queryText && posts.length > 0 && totalPages > 1 && (
                        <div className="hidden md:flex flex-wrap justify-center items-center gap-2 mb-8">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1 || loading}
                                className="flex items-center px-5 py-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                            >
                                <ChevronLeft size={18} className={rtl ? "ml-2 rotate-180" : "mr-2"} />
                                {ui("previous")}
                            </button>

                            <>
                                {visiblePages[0] > 1 && (
                                    <>
                                        <button
                                            onClick={() => {
                                                setPage(1);
                                                window.scrollTo({ top: 0, behavior: "smooth" });
                                            }}
                                            className={`w-10 h-10 rounded-full border text-sm font-semibold transition ${page === 1
                                                    ? "bg-primary text-white border-primary"
                                                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                                                }`}
                                        >
                                            1
                                        </button>

                                        {visiblePages[0] > 2 && (
                                            <span className="px-2 text-gray-400">...</span>
                                        )}
                                    </>
                                )}

                                {visiblePages.map((pageNumber) => (
                                    <button
                                        key={pageNumber}
                                        onClick={() => {
                                            setPage(pageNumber);
                                            window.scrollTo({ top: 0, behavior: "smooth" });
                                        }}
                                        className={`w-10 h-10 rounded-full border text-sm font-semibold transition ${page === pageNumber
                                                ? "bg-primary text-white border-primary"
                                                : "border-gray-200 text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}

                                {visiblePages[visiblePages.length - 1] < totalPages && (
                                    <>
                                        {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                                            <span className="px-2 text-gray-400">...</span>
                                        )}

                                        <button
                                            onClick={() => {
                                                setPage(totalPages);
                                                window.scrollTo({ top: 0, behavior: "smooth" });
                                            }}
                                            className={`w-10 h-10 rounded-full border text-sm font-semibold transition ${page === totalPages
                                                    ? "bg-primary text-white border-primary"
                                                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                                                }`}
                                        >
                                            {totalPages}
                                        </button>
                                    </>
                                )}
                            </>

                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages || loading}
                                className="flex items-center px-5 py-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                            >
                                {ui("next")}
                                <ChevronRight size={18} className={rtl ? "mr-2 rotate-180" : "ml-2"} />
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}
