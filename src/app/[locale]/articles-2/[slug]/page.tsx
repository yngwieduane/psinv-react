import { Clock, Leaf, User } from "lucide-react";
import Breadcrumb from "../../_components/Breadcrumb";
import Image from "next/image";
import type { Metadata } from "next";
import { ArticleBodyPart, CATEGORY_LABELS, CategoryKey } from "@/data/articles";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { db } from "@/lib/firebase-admin";

type Params = {
    slug: string;
    locale: string;
};

type PageProps = {
    params: Promise<Params>;
};

// Define the shape of the Article expected from Firestore
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

// Fetch article from Firestore by slug
async function getArticleFromFirestore(slug: string): Promise<FirestoreArticle | null> {
    try {
        const articlesRef = db.collection('articles');
        const snapshot = await articlesRef.where('slug', '==', slug).limit(1).get();

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        return doc.data() as FirestoreArticle;
    } catch (error) {
        console.error("Error fetching article from Firestore:", error);
        return null;
    }
}

function isRtlLocale(locale: string) {
    return ["ar"].includes(locale);
}

function assertBodyParts(value: unknown): ArticleBodyPart[] {
    if (!Array.isArray(value)) return [];
    return value as ArticleBodyPart[];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleFromFirestore(slug);

    if (!article) return { title: "Article not found" };

    return {
        title: article.title,
        description: article.summary,
    };
}

const renderContent = (part: ArticleBodyPart, index: number, rtl: boolean) => {
    switch (part.type) {
        case "heading": {
            const level: 2 | 3 | 4 = (part.level ?? 2) as 2 | 3 | 4;

            const styles = {
                2: "text-xl sm:text-2xl lg:text-3xl font-extrabold mt-10 mb-4 border-b pb-2",
                3: "text-lg sm:text-xl lg:text-2xl font-bold mt-6 mb-3",
                4: "text-base sm:text-lg font-semibold mt-4 mb-2",
            }[level];

            const Tag = (`h${level}` as "h2" | "h3" | "h4");

            return (
                <Tag
                    key={index}
                    className={`text-gray-800 ${styles} ${rtl ? "text-right" : "text-left"
                        }`}
                    dangerouslySetInnerHTML={{ __html: part.content }}
                />
            );
        }
        case "paragraph":
            return (
                <p
                    key={index}
                    className={`text-lg text-gray-600 leading-relaxed mb-6 ${rtl ? "text-right" : "text-left"
                        }`}
                    dangerouslySetInnerHTML={{ __html: part.content }}
                />
            );

        case "quote":
            return (
                <blockquote
                    key={index}
                    className={`border-l-4 border-emerald-500 pl-6 py-4 my-6 bg-emerald-50 italic text-xl text-gray-700 rounded-r-lg ${rtl ? "text-right" : "text-left"
                        }`}
                >
                    {part.content}
                </blockquote>
            );

        case "list": {
            const listDir: "ltr" | "rtl" = "ltr";
            const textDir: "ltr" | "rtl" = rtl ? "rtl" : "ltr";

            return (
                <ul
                    key={index}
                    dir={listDir}
                    className={`list-none mb-6 space-y-3 text-lg text-gray-700 pl-2`}
                >
                    {part.items.map((item: string, i: number) => (
                        <li
                            key={i}
                            className={`flex items-start ${rtl ? "flex-row-reverse" : ""}`}
                        >
                            <Leaf
                                className={`w-5 h-5 text-emerald-500 flex-shrink-0 mt-1 ${rtl ? "ml-3" : "mr-3"
                                    }`}
                            />

                            <span
                                dir={textDir}
                                className={`leading-relaxed flex-1 ${rtl ? "text-right" : "text-left"
                                    }`}
                                style={{ unicodeBidi: "plaintext" }}
                                dangerouslySetInnerHTML={{ __html: item }}
                            />
                        </li>
                    ))}
                </ul>
            );
        }
        case "cta":
            return (
                <div key={index} className="my-12 flex justify-center">
                    <a
                        href={part.href}
                        className={`group inline-flex items-center justify-center w-full sm:w-auto
        rounded-full px-7 py-3.5 text-sm font-semibold
        bg-white text-gray-900
        border border-[var(--color-emerald-500)]
        shadow-sm
        hover:bg-[var(--color-emerald-50)]
        hover:border-[var(--color-emerald-600)]
        hover:text-[var(--color-emerald-700)]
        hover:shadow-md
        active:scale-[0.995]
        focus:outline-none
        focus:ring-2 focus:ring-[var(--color-emerald-500)/30]
        focus:ring-offset-2
        transition-all duration-200
        ${rtl ? "flex-row-reverse" : ""}`}
                    >
                        <span>{part.label}</span>

                        <span
                            className={`inline-flex items-center justify-center
          ${rtl ? "mr-2" : "ml-2"}
          text-[var(--color-emerald-600)]
          transition-transform duration-200
          ${rtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
                            aria-hidden="true"
                        >
                            →
                        </span>
                    </a>
                </div>
            );
        case "image":
            return (
                <div key={index} className="flex justify-center my-8">
                    <Image
                        src={part.src}
                        alt={part.alt}
                        title={part.title}
                        width={800}
                        height={450}
                        className="rounded-xl shadow-lg max-h-[450px] object-cover"
                    />
                </div>
            );

        default:
            return null;
    }
};

export default async function BlogSingle({ params }: PageProps) {
    const { slug, locale } = await params;

    const article = await getArticleFromFirestore(slug);
    if (!article) notFound();

    const rtl = isRtlLocale(locale);
    const ui = await getTranslations({ locale, namespace: "ArticlesPage" });

    // Use Firestore data or fallback to Category Labels if category is just a key
    const categoryLabel = article.category
        ? article.category
        : (ui(`categories.${article.categoryKey}`) ?? CATEGORY_LABELS[article.categoryKey as CategoryKey]);

    // Use data directly from Firestore
    const title = article.title;
    const summary = article.summary;
    const body = assertBodyParts(article.body);

    return (
        <>
            <div className="bg-[#f4f4f4] mt-30 mb-3 border-b border-gray-200">
                <div className="container mx-auto px-6 lg:px-8 py-4">
                    <Breadcrumb
                        customSegments={[
                            { name: "Home", href: "/" },
                            { name: "Articles", href: "/articles" },
                            { name: categoryLabel || "Category", href: article.categoryKey ? `/articles/category/${article.categoryKey.replaceAll("_", "-")}` : "#" },
                            { name: title },
                        ]}
                    />
                </div>
            </div>

            <div
                className="mx-auto container px-6 lg:px-8 pt-5"
                dir={rtl ? "rtl" : "ltr"}
            >
                <p className="text-sm font-semibold uppercase text-emerald-600 mb-2 tracking-widest mt-5">
                    {categoryLabel}
                </p>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                    {title}
                </h1>

                <p className="text-xl italic text-gray-700 mb-8 font-semibold">
                    {summary}
                </p>

                {/* ✅ RTL-safe spacing */}
                <div
                    className={`flex flex-wrap items-center text-gray-500 text-sm mb-8 ${rtl ? "gap-4" : "space-x-4 sm:space-x-6"
                        }`}
                >
                    <span className={`flex items-center ${rtl ? "flex-row-reverse" : ""}`}>
                        <User className={`w-4 h-4 ${rtl ? "ml-1" : "mr-1"}`} />
                        {article.author}
                    </span>

                    <span className={`flex items-center ${rtl ? "flex-row-reverse" : ""}`}>
                        <Clock className={`w-4 h-4 ${rtl ? "ml-1" : "mr-1"}`} />
                        {article.date}
                    </span>
                </div>

                <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[480px] rounded-2xl overflow-hidden shadow-lg mb-10">
                    <Image
                        src={article.imageUrl}
                        alt={title}
                        title={title}
                        fill
                        priority
                        className="object-cover"
                        style={{ objectPosition: "left center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent" />
                </div>


                <div className="article-body">
                    {body.map((part, idx) => renderContent(part, idx, rtl))}
                </div>

                {/* ✅ RTL-safe spacing */}
                <div
                    className={`mt-12 pt-6 border-t border-gray-200 flex items-start bg-gray-50 p-6 rounded-xl ${rtl ? "flex-row-reverse gap-4" : "space-x-4"
                        }`}
                >
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                        <User className="w-8 h-8" />
                    </div>

                    <div className={rtl ? "text-right" : "text-left"}>
                        <p className="font-bold text-gray-900">About the Author</p>
                        <p className="text-sm text-gray-600">
                            {article.author} is a leading expert in sustainable development
                            and smart city integration, focusing on environmental policy in
                            the Gulf region.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
