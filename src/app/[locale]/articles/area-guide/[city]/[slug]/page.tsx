import { Clock, User, MapPin } from "lucide-react";
import Breadcrumb from "../../../../_components/Breadcrumb";
import Image from "next/image";
import type { Metadata } from "next";
import { ArticleBodyPart, CATEGORY_LABELS, CategoryKey } from "@/data/articles";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { db } from "@/lib/firebase-admin";
import ArticleGallery from "../../../_components/ArticleGallery";
import { Link } from "@/i18n/navigation";

// Reuse Firestore definitions
type Params = {
    city: string;
    slug: string;
    locale: string;
};
type PageProps = {
    params: Promise<Params>;
};

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
    youtubeUrl?: string;
    gallery?: string[];
};

async function getArticleFromFirestore(articleSlug: string, cityPath: string): Promise<FirestoreArticle | null> {
    try {
        const snapshot = await db
            .collection("articles")
            .where("slug", "==", articleSlug)
            .where("category", "==", "Area Guide")
            .limit(1)
            .get();

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        const data = doc.data();

        // Verify city match
        const docCitySlug = (data.city || "").toLowerCase().trim().replace(/\s+/g, "-");
        if (docCitySlug !== cityPath.toLowerCase()) {
            return null; // Article belongs to a different city
        }

        let createdAt = "";
        if (data.createdAt && typeof data.createdAt.toDate === "function") {
            createdAt = data.createdAt.toDate().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        } else if (data.createdAt) {
            createdAt = String(data.createdAt);
        }

        return {
            ...data,
            id: doc.id,
            createdAt,
            translations: data.translations || {},
            slug: data.slug || "",
            title: data.title || "",
            summary: data.summary || "",
            body: data.body || [],
            author: data.author || "",
            categoryKey: data.categoryKey || "",
            category: data.category || "",
            image: data.image || data.imageUrl || "",
            youtubeUrl: data.youtubeUrl || "",
            gallery: data.gallery || [],
            city: data.city || "",
        } as FirestoreArticle;
    } catch (error) {
        console.error("Error fetching article from Firestore:", error);
        return null;
    }
}

function isRtlLocale(locale: string) {
    return ["ar"].includes(locale);
}

// Ensure first letter of each word of city is capitalized for Breadcrumbs / Meta
function formatCityName(citySlug: string) {
    return citySlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { city, slug, locale } = await params;
    const article = await getArticleFromFirestore(slug, city);

    if (!article) {
        return {
            title: "Area Guide not found",
            description: "The requested area guide could not be found.",
        };
    }

    const localized = article.translations?.[locale] || {};
    const title = (localized.title || article.title || "").slice(0, 58);
    const formattedCity = formatCityName(city);

    const rawContent = (localized.content || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const rawDescription =
        localized.summary ||
        article.summary ||
        rawContent ||
        `Read the comprehensive area guide for ${title} in ${formattedCity}.`;

    const description =
        rawDescription.length > 160
            ? rawDescription.slice(0, 157).trim() + "..."
            : rawDescription;

    const canonical = `https://www.psinv.net/${locale}/articles/area-guide/${city}/${article.slug}`;

    const keywords = [
        title,
        formattedCity,
        "Area Guide",
        "UAE real estate",
        "property investment",
        "Property Shop Investment",
    ].filter(Boolean);

    return {
        title,
        description,
        keywords,
        authors: [{ name: article.author || "Property Shop Investment (PSI)" }],
        publisher: "Property Shop Investment (PSI)",
        alternates: {
            canonical,
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title,
            description,
            url: canonical,
            type: "article",
            images: article.image ? [{ url: article.image, alt: title }] : [],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: article.image ? [article.image] : [],
        },
    };
}

export default async function AreaGuideSingle({ params }: PageProps) {
    const { city, slug, locale } = await params;

    const article = await getArticleFromFirestore(slug, city);
    if (!article) notFound();

    const rtl = isRtlLocale(locale);
    const formattedCity = formatCityName(city);

    const localized = article.translations?.[locale] || {};
    const title = localized.title || article.title || "";
    const bodyRaw = (localized.content || "").replace(/&nbsp;/g, " ");

    const splitContent = (html: string) => {
        const h2Regex = /<h2/g;
        const matches = Array.from(html.matchAll(h2Regex));

        if (matches.length < 2) return [html];

        const splitIndex = matches[Math.floor(matches.length / 2)].index!;
        return [html.slice(0, splitIndex), html.slice(splitIndex)];
    };

    const firstSplit = splitContent(bodyRaw);
    let finalParts = [firstSplit[0]];

    if (firstSplit[1]) {
        const secondSplit = splitContent(firstSplit[1]);
        finalParts.push(...secondSplit);
    }

    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const youtubeId = article.youtubeUrl ? getYouTubeId(article.youtubeUrl) : null;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        image: article.image ? [article.image] : [],
        datePublished: article.createdAt ? new Date(article.createdAt).toISOString() : new Date().toISOString(),
        dateModified: article.createdAt ? new Date(article.createdAt).toISOString() : new Date().toISOString(),
        author: [
            {
                "@type": "Person",
                name: article.author || "Property Shop Investment LLC",
                url: "https://psinv.net",
            },
        ],
        description: localized.summary || article.summary || "",
        articleBody: bodyRaw.replace(/<[^>]*>?/gm, ""),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="pt-28 md:pt-36 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-12">
                    <Breadcrumb
                        customSegments={[
                            { name: "Home", href: "/" },
                            { name: "Articles", href: "/articles" },
                            { name: "Area Guides", href: "/articles/area-guide" },
                            { name: formattedCity, href: `/articles/area-guide/${city}` },
                            { name: title },
                        ]}
                    />
                </div>
            </div>

            <div className="mx-auto container px-4 md:px-12 pt-5" dir={rtl ? "rtl" : "ltr"}>
                <div className="flex items-center gap-2 mb-2 mt-5">
                    <p className="text-sm font-semibold uppercase text-secondary tracking-widest dark:text-gray-300">
                        Area Guides
                    </p>
                    <span className="text-gray-300">•</span>
                    <Link href={`/articles/area-guide/${city}`} className="text-sm font-semibold uppercase text-primary hover:underline tracking-widest flex items-center gap-1">
                        <MapPin size={14} /> {formattedCity}
                    </Link>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4 dark:text-white">
                    {title}
                </h1>

                <div className={`flex flex-wrap items-center text-gray-500 text-sm mb-8 ${rtl ? "gap-4" : "space-x-4 sm:space-x-6"}`}>
                    <span className={`flex items-center ${rtl ? "flex-row-reverse" : ""}`}>
                        <User className={`w-4 h-4 ${rtl ? "ml-1" : "mr-1"}`} />
                        PSI Author
                    </span>

                    <span className={`flex items-center ${rtl ? "flex-row-reverse" : ""}`}>
                        <Clock className={`w-4 h-4 ${rtl ? "ml-1" : "mr-1"}`} />
                        {article.createdAt}
                    </span>
                </div>

                <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[480px] rounded-2xl overflow-hidden shadow-lg mb-10">
                    <Image
                        src={article.image}
                        alt={title}
                        title={title}
                        fill
                        priority
                        className="object-cover"
                        style={{ objectPosition: "left center" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent" />
                </div>

                <div className="article-body dark:text-white pb-20">
                    <div dangerouslySetInnerHTML={{ __html: finalParts[0] }} />

                    {article.gallery && article.gallery.length > 0 && (
                        // @ts-ignore
                        <ArticleGallery images={article.gallery} rtl={rtl} />
                    )}

                    {finalParts[1] && <div dangerouslySetInnerHTML={{ __html: finalParts[1] }} />}

                    {youtubeId && (
                        <div className="my-10 w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-black">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${youtubeId}`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    )}

                    {finalParts[2] && <div dangerouslySetInnerHTML={{ __html: finalParts[2] }} />}
                </div>
            </div>
        </>
    );
}
