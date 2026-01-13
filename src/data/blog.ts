// src/data/blog.ts

import { ArticleBodyPart } from "./articles";

// ======================================================
// CATEGORY KEYS
// ======================================================

export type BlogCategoryKey =
    | "market_insights"
    | "company_news"
    | "lifestyle";

export const BLOG_CATEGORY_LABELS: Record<BlogCategoryKey, string> = {
    market_insights: "Market Insights",
    company_news: "Company News",
    lifestyle: "Lifestyle",
};

// ======================================================
// BLOG POST TYPE
// ======================================================

export type BlogPost = {
    id: number;
    slug: string;
    title?: string;
    date: string;
    author: string;
    categoryKey: BlogCategoryKey;
    category?: string;
    imageUrl: string;
    summary?: string;
    body?: ArticleBodyPart[];
    contentHtml?: string;
};

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 201,
        slug: "welcome-to-our-new-blog",
        date: "2026-01-13",
        author: "PSI Team",
        categoryKey: "company_news",
        category: BLOG_CATEGORY_LABELS.company_news,
        imageUrl: "/assets/images/about-us/main-office.webp",
    },
    {
        id: 202,
        slug: "abu-dhabi-market-report-q1-2026",
        date: "2026-01-10",
        author: "Research Team",
        categoryKey: "market_insights",
        category: BLOG_CATEGORY_LABELS.market_insights,
        imageUrl: "/assets/images/articles/auh.jpg",
    }
];

// ======================================================
// BLOG LIST FOR CARDS
// ======================================================

export type BlogItem = Pick<
    BlogPost,
    "id" | "title" | "summary" | "category" | "categoryKey" | "date" | "imageUrl" | "slug"
>;

export const BLOG_NEWS: BlogItem[] = BLOG_POSTS.map(
    ({ id, title, summary, category, categoryKey, date, imageUrl, slug }) => ({
        id,
        title,
        summary,
        category,
        categoryKey,
        date,
        imageUrl,
        slug,
    })
);
