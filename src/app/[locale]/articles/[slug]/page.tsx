import { Clock, Leaf, User } from "lucide-react";
import Breadcrumb from "../../_components/Breadcrumb";
import Image from "next/image";
import type { Metadata } from "next";
import { ARTICLES, ArticleBodyPart } from "@/data/articles"
import { notFound } from "next/navigation";

type Params = {
  slug: string;
  locale: string;
};

type PageProps = {
  params: Promise<Params>;
};
function findArticleBySlug(slug: string) {
  // exact match
  return ARTICLES.find((a) => a.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticleBySlug(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.summary,
  };
}

const renderContent = (part: ArticleBodyPart, index: number) => {
  switch (part.type) {
 case "heading":
  return (
    <h2
      key={index}
      className="text-3xl font-bold text-gray-800 mt-8 mb-4 border-b pb-2"
      dangerouslySetInnerHTML={{ __html: part.content }}
    />
  );
    case "paragraph":
      return (
        <p
          key={index}
          className="text-lg text-gray-600 leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: part.content }}
        />
      );

    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-emerald-500 pl-6 py-4 my-6 bg-emerald-50 italic text-xl text-gray-700 rounded-r-lg"
        >
          {part.content}
        </blockquote>
      );

 case "list":
  return (
    <ul
      key={index}
      className="list-none pl-2 mb-6 space-y-3 text-lg text-gray-700"
    >
      {part.items.map((item: string, i: number) => (
        <li key={i} className="flex items-start">
          <Leaf className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-1 mr-3" />

          {/* Render any HTML in the list item */}
          <span
            dangerouslySetInnerHTML={{ __html: item }}
            className="leading-relaxed"
          />
        </li>
      ))}
    </ul>
  );

    case "image":
      return (
        <div
          key={index}
          className="flex justify-center my-8"
        >
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
  const { slug } = await params;
  const article = findArticleBySlug(slug);
  if (!article) {
    notFound();
  }
  return (
    <>
<div className="bg-[#f4f4f4] mt-30 mb-3 border-b border-gray-200">
  <div className="container mx-auto px-6 lg:px-8 py-4">
    <Breadcrumb />
  </div>
</div>

      <div className="mx-auto container px-6 lg:px-8 pt-5">
        <p className="text-sm font-semibold uppercase text-emerald-600 mb-2 tracking-widest mt-5">
          {article!.category}
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          {article!.title}
        </h1>

        <div className="flex flex-wrap items-center space-x-4 sm:space-x-6 text-gray-500 text-sm mb-8">
          <span className="flex items-center">
            <User className="w-4 h-4 mr-1" /> {article!.author}
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" /> {article!.date}
          </span>
        </div>

        <Image
          src={article!.imageUrl}
          alt={article!.title}
          className="w-full h-[400px] object-cover rounded-xl shadow-lg mb-10"
          width={1200}
          height={400}
        />

        <div className="article-body">
          <p className="text-xl italic text-gray-700 mb-8 font-semibold">
            {article!.summary}
          </p>
          {article!.body.map(renderContent)}
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 flex items-start space-x-4 bg-gray-50 p-6 rounded-xl">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-emerald-100 flex items-center justify-center text-emerald-600">
            <User className="w-8 h-8" />
          </div>
          <div>
            <p className="font-bold text-gray-900">About the Author</p>
            <p className="text-sm text-gray-600">
              {article!.author} is a leading expert in sustainable development
              and smart city integration, focusing on environmental policy in
              the Gulf region.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
