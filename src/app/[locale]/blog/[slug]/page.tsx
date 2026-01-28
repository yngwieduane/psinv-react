import { Clock, ChevronLeft, User, Calendar } from "lucide-react";
import Breadcrumb from "../../_components/Breadcrumb";
import Image from "next/image";
import type { Metadata } from "next";
import { BlogPost, BlogCategoryKey, BLOG_CATEGORY_LABELS } from "@/data/blog";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getBlogPostBySlug } from "@/app/actions/getBlogPosts";
import { Link } from "@/i18n/navigation";

type Params = {
    slug: string;
    locale: string;
};

type PageProps = {
    params: Promise<Params>;
};

function isRtlLocale(locale: string) {
    return ["ar"].includes(locale);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) return { title: "Post not found" };

    return {
        title: {
            absolute: post.title || "Untitled" // Use absolute to avoid duplicating site name if simpler
        },
        description: post.summary,
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug, locale } = await params;

    const post = await getBlogPostBySlug(slug);
    if (!post) notFound();

    const rtl = isRtlLocale(locale);
    const t = await getTranslations({ locale, namespace: "BlogPostPage" });
    const tBlog = await getTranslations({ locale, namespace: "BlogPage" });

    const title = post.title || "Untitled";

    const summary = post.summary || "";
    const contentHtml = (post.contentHtml || "").replace(/&nbsp;/g, ' ');

    return (
        <>
            {/* Navigation Bar / Breadcrumb Area */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-10 backdrop-blur-md bg-white/90">
                <div className="container mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link href="/blog" className="flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors">
                        <ChevronLeft size={16} className={rtl ? "rotate-180 ml-1" : "mr-1"} />
                        {t("backToBlog")}
                    </Link>
                    {/* Mobile Breadcrumb could go here if needed */}
                </div>
            </div>

            <div className="bg-white min-h-screen pb-20" dir={rtl ? "rtl" : "ltr"}>

                {/* Hero Section */}
                <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] bg-gray-900 overflow-hidden">
                    <Image
                        src={post.imageUrl || '/assets/images/placeholder.jpg'}
                        alt={title}
                        fill
                        priority
                        className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20 container mx-auto">
                        <div className="max-w-4xl">
                            <div className="flex items-center space-x-4 text-white/90 text-sm mb-4 font-medium tracking-wide">
                                <span className="bg-primary px-3 py-1 rounded-full text-white uppercase text-xs font-bold tracking-wider">
                                    {post.categoryKey ? tBlog(`categories.${post.categoryKey}`) : (post.category || t("defaultCategory"))}
                                </span>

                                {post.date && (
                                    <span className="flex items-center">
                                        <Calendar size={14} className="mr-2" />
                                        {post.date}
                                    </span>
                                )}
                            </div>

                            <h1
                                className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6"
                                dangerouslySetInnerHTML={{ __html: title }}
                            />
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="container mx-auto px-6 md:px-12 max-w-4xl -mt-10 relative z-1 p-8 md:p-12 bg-white rounded-t-3xl shadow-sm">

                    {/* Author Info */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-10">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                <User size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">{post.author || t("defaultAuthor")}</p>
                                <p className="text-xs text-gray-500">{t("authorRole")}</p>
                            </div>
                        </div>
                        {/* Share buttons could go here */}
                    </div>

                    {/* Summary/Intro */}
                    {summary && (
                        <div
                            className="text-xl md:text-2xl text-gray-600 font-serif leading-relaxed mb-10 italic border-l-4 border-primary pl-6"
                            dangerouslySetInnerHTML={{ __html: summary }}
                        />
                    )}

                    {/* Main Content */}
                    <article className="article-body">
                        {contentHtml ? (
                            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                        ) : (
                            <div className="text-center py-20 text-gray-400">{t("contentUnavailable")}</div>
                        )}
                    </article>

                    {/* Footer / Tags */}
                    <div className="mt-16 pt-10 border-t border-gray-100">
                        <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gray-50 rounded-2xl">
                            <div className="mb-6 md:mb-0 text-center md:text-left">
                                <h3 className="font-bold text-lg mb-2">{t("subscribeTitle")}</h3>
                                <p className="text-gray-500 text-sm">{t("subscribeSubtitle")}</p>
                            </div>
                            <div className="flex w-full md:w-auto">
                                <input type="email" placeholder={t("emailPlaceholder")} className="w-full md:w-64 px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:border-primary" />
                                <button className="bg-primary text-white px-6 py-3 rounded-r-lg font-bold hover:bg-primary/90 transition-colors">
                                    {t("joinButton")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
