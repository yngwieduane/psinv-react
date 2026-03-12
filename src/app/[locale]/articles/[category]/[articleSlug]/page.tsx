import { Clock, User } from "lucide-react";
import Breadcrumb from "../../../_components/Breadcrumb";
import Image from "next/image";
import type { Metadata } from "next";
import { ArticleBodyPart, CATEGORY_LABELS, CategoryKey } from "@/data/articles";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { db } from "@/lib/firebase-admin";
import ArticleGallery from "../../_components/ArticleGallery";

type Params = {
  category: string;
  articleSlug: string;
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

async function getArticleFromFirestore(articleSlug: string): Promise<FirestoreArticle | null> {
  try {
    const snapshot = await db
      .collection("articles")
      .where("slug", "==", articleSlug)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

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
    } as FirestoreArticle;
  } catch (error) {
    console.error("Error fetching article from Firestore:", error);
    return null;
  }
}

function normalizeCategoryToSlug(category?: string) {
  return (category || "").toLowerCase().trim().replace(/\s+/g, "-");
}

function isRtlLocale(locale: string) {
  return ["ar"].includes(locale);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { articleSlug, locale } = await params;
  const article = await getArticleFromFirestore(articleSlug);

  if (!article) return { title: "Article not found" };

  return {
    title: article.translations?.[locale]?.title || article.title || "Article",
    description: article.translations?.[locale]?.summary || article.summary || "",
  };
}

export default async function BlogSingle({ params }: PageProps) {
  const { category, articleSlug, locale } = await params;

  const article = await getArticleFromFirestore(articleSlug);
  if (!article) notFound();

  const articleCategorySlug = normalizeCategoryToSlug(article.category);
  if (articleCategorySlug !== category) {
    notFound();
  }

  const rtl = isRtlLocale(locale);
  const ui = await getTranslations({ locale, namespace: "ArticlesPage" });

  const categoryLabel = article.category
    ? article.category
    : ui(`categories.${article.categoryKey}`) ?? CATEGORY_LABELS[article.categoryKey as CategoryKey];

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

      <div className="pt-28 md:pt-36 border-b border-gray-100 bg-white dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="container mx-auto">
          <Breadcrumb />
        </div>
      </div>

      <div className="mx-auto container px-4 md:px-12 pt-5" dir={rtl ? "rtl" : "ltr"}>
        <p className="text-sm font-semibold uppercase text-emerald-600 mb-2 tracking-widest mt-5 dark:text-white">
          {categoryLabel}
        </p>

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

        <div className="article-body dark:text-white">
          <div dangerouslySetInnerHTML={{ __html: finalParts[0] }} />

          {article.gallery && article.gallery.length > 0 && (
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