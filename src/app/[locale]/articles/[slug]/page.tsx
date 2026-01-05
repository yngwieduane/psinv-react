import { Clock, Leaf, User } from "lucide-react";
import Breadcrumb from "../../_components/Breadcrumb";
import Image from "next/image";
import type { Metadata } from "next";
import { ARTICLES, ArticleBodyPart } from "@/data/articles";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

type Params = {
  slug: string;
  locale: string;
};

type PageProps = {
  params: Promise<Params>;
};

function findArticleBySlug(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

function isRtlLocale(locale: string) {
  return ["ar"].includes(locale);
}

function assertBodyParts(value: unknown): ArticleBodyPart[] {
  if (!Array.isArray(value)) return [];
  return value as ArticleBodyPart[];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params;

  const article = findArticleBySlug(slug);
  if (!article) return { title: "Article not found" };

  const t = await getTranslations({ locale, namespace: "Articles" });

  return {
    title: t(`${article.id}.title`),
    description: t(`${article.id}.summary`),
  };
}

const renderContent = (part: ArticleBodyPart, index: number, rtl: boolean) => {
  switch (part.type) {
    case "heading":
      return (
        <h2
          key={index}
          className={`text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2 ${rtl ? "text-right" : "text-left"
            }`}
          dangerouslySetInnerHTML={{ __html: part.content }}
        />
      );

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
      const listDir: "ltr" | "rtl" = "ltr"; // always LTR layout
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

export default async function ArticleSingle({ params }: PageProps) {
  const { slug, locale } = await params;

  const article = findArticleBySlug(slug);
  if (!article) notFound();

  const rtl = isRtlLocale(locale);

  const t = await getTranslations({ locale, namespace: "Articles" });

  const title = t(`${article.id}.title`);
  const summary = t(`${article.id}.summary`);

  // ✅ Body from messages/en.json or messages/ar.json
  const bodyRaw = t.raw(`${article.id}.body`);
  const body = assertBodyParts(bodyRaw);

  return (
    <>
      <div className="bg-[#f4f4f4] mt-30 mb-3 border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-8 py-4">
          <Breadcrumb />
        </div>
      </div>

      <div
        className="mx-auto container px-6 lg:px-8 pt-5"
        dir={rtl ? "rtl" : "ltr"}
      >
        <p className="text-sm font-semibold uppercase text-emerald-600 mb-2 tracking-widest mt-5">
          {article.category}
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
