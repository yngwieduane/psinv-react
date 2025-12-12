"use client";

import { useMemo, useState } from "react";
import ArticlesCard from "./ArticlesCard";
import { Search } from "lucide-react";
import { NEWS, NewsItem } from "@/data/articles";

const ArticleSearchBar = ({
  articleQuery,
  setArticleQuery,
}: {
  articleQuery: string;
  setArticleQuery: (val: string) => void;
}) => {
  return (
    <div className="mb-8 p-4 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 hidden sm:block">
          Explore Our Insights
        </h2>
        <div className="relative w-full sm:w-2/3 max-w-lg">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles by keyword or category..."
            value={articleQuery}
            onChange={(e) => setArticleQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

const NewsSection = ({ newsItems }: { newsItems: NewsItem[] }) => {
  return (
    <section className="mt-8">
      <div className="flex justify-between items-end mb-6 border-b pb-2">
        <h2 className="text-3xl font-extrabold text-gray-800">
          Latest Articles ({newsItems.length} Found)
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((news) => (
          <ArticlesCard key={news.id} news={news} />
        ))}

        <div className="p-4 bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 font-semibold">
          Load More Articles...
        </div>
      </div>
    </section>
  );
};

export default function ArticlesPage() {
  const [articleQuery, setArticleQuery] = useState("");

  const filteredNews = useMemo(() => {
    if (!articleQuery) return NEWS;
    const q = articleQuery.toLowerCase();
    return NEWS.filter(
      (news) =>
        news.title.toLowerCase().includes(q) ||
        news.summary.toLowerCase().includes(q) ||
        news.category.toLowerCase().includes(q)
    );
  }, [articleQuery]);

  return (
    <section className="mb-12">
      <ArticleSearchBar
        articleQuery={articleQuery}
        setArticleQuery={setArticleQuery}
      />
      <NewsSection newsItems={filteredNews} />
    </section>
  );
}
