"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import slugify from "react-slugify";

export default function ArticlesCard({ news }: { news: any }) {
  const href = `/articles/${news.slug}`;
  return (
    <Link href={href} className="h-full">
      <article className="flex h-full flex-col bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 cursor-pointer">
        {/* Image wrapper with fixed height */}
        <div className="relative w-full h-36">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          <span className="text-xs font-semibold uppercase text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full w-fit">
            {news.category}
          </span>

          <h4 className="text-lg font-bold text-gray-900 mt-2 leading-snug hover:text-indigo-600 transition">
            {news.title}
          </h4>

          {/* clamp summary so heights stay similar */}
          <p className="text-sm text-gray-500 mt-2 line-clamp-3">
            {news.summary}
          </p>

          {/* push date to bottom */}
          <p className="mt-auto text-xs text-gray-400 pt-3">
            {news.date}
          </p>
        </div>
      </article>
    </Link>
  );
}
