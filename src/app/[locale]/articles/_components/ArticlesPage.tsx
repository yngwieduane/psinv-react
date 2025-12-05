'use client';

import { useMemo, useState } from "react";
import ArticlesCard from "./ArticlesCard";
import { Search } from "lucide-react";


const MOCK_NEWS = [
    {
        id: 101,
        title: "Green Tech & Sustainability: UAE's Next-Gen Real Estate Developments for Smart Buyers",
        date: "October 26, 2025",
        summary: "The UAE is quickly becoming a global leader in green, sustainable, and tech-driven real estate. With new developments designed to save energy, reduce environmental impact, and improve the quality of life, the property market is entering a new era.",
        category: "Technology",
        imageUrl: "/assets/images/articles/green-tech-and-sustainability-uaes-next-gen-thumbnail.webp"
    },
    {
        id: 102,
        title: "Suburban vs. Urban Living: Post-Pandemic Trends",
        date: "October 20, 2025",
        summary: "The shift to remote work continues to drive demand for larger homes outside city centers. We analyze the impact on property values in both regions.",
        category: "Trends",
        imageUrl: "/assets/images/articles/green-tech-and-sustainability-uaes-next-gen-thumbnail.webp"
    },
    {
        id: 103,
        title: "5 Tips for Maximizing Your Home's Resale Value",
        date: "October 15, 2025",
        summary: "Simple upgrades can yield massive returns. Learn which home improvements offer the best return on investment before listing your property.",
        category: "Home Improvement",
        imageUrl: "/assets/images/articles/green-tech-and-sustainability-uaes-next-gen-thumbnail.webp"
    },
    {
        id: 104,
        title: "5 Tips for Maximizing Your Home's Resale Value",
        date: "October 15, 2025",
        summary: "Simple upgrades can yield massive returns. Learn which home improvements offer the best return on investment before listing your property.",
        category: "Home Improvement",
        imageUrl: "/assets/images/articles/green-tech-and-sustainability-uaes-next-gen-thumbnail.webp"
    }
];

const ArticleSearchBar = ({ articleQuery, setArticleQuery }:{articleQuery:any,setArticleQuery:any}) => {
    return (
        <div className="mb-8 p-4 bg-white rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800 hidden sm:block">Explore Our Insights</h2>
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

const NewsSection = ({ newsItems }:{newsItems:any}) => {
    return (
        <section className="mt-8">
            <div className="flex justify-between items-end mb-6 border-b pb-2">
                <h2 className="text-3xl font-extrabold text-gray-800">Latest Articles ({newsItems.length} Found)</h2>
                {/* Removed "View All Articles" link as this is the main news page */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsItems.map((news:any) => (
                    <ArticlesCard key={news.id} news={news}  />
                ))}
                {/* Placeholder for more articles */}
                <div className="p-4 bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 font-semibold">
                    Load More Articles...
                </div>
            </div>
        </section>
    );
};


export default function ArticlesPage() {
    const [articleQuery, setArticleQuery] = useState('');
    
    // Simple mock filter based on query
    const filteredNews = useMemo(() => {
        if (!articleQuery) return MOCK_NEWS;
        const lowerCaseQuery = articleQuery.toLowerCase();
        return MOCK_NEWS.filter(news =>
            news.title.toLowerCase().includes(lowerCaseQuery) ||
            news.summary.toLowerCase().includes(lowerCaseQuery) ||
            news.category.toLowerCase().includes(lowerCaseQuery)
        );
    }, [articleQuery]);
    return(
        <>
            <section className="mb-12">
                <ArticleSearchBar 
                    articleQuery={articleQuery} 
                    setArticleQuery={setArticleQuery}
                />

                <NewsSection 
                    newsItems={filteredNews} 
                />
            </section>
        </>
    )
}