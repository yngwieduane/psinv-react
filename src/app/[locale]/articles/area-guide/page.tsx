import { db } from "@/lib/firebase-admin";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Clock, User, ChevronRight, MapPin } from "lucide-react";
import Breadcrumb from "../../_components/Breadcrumb";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import slugify from "react-slugify";

type FirestoreArticle = {
    translations: any;
    id: string | number;
    slug: string;
    title: string;
    summary: string;
    body: any[];
    createdAt: string;
    author: string;
    categoryKey: string;
    category?: string;
    image: string;
    city?: string;
}

// Re-using the fetch logic, adapted for filtering
async function getAreaGuideArticles() {
    try {
        const articlesRef = db.collection('articles');
        // Filter by categoryKey == 'area_guide' OR category == 'Area Guide' to be safe, 
        // but typically categoryKey is the reliable machine field.
        // Queries with multiple where clauses might require composite indexes.
        // For simplicity with small datasets, we can fetch all and filter, or try the specific query.
        // Let's try fetching all and filtering in memory to avoid index issues if they don't exist yet,
        // unless the dataset is huge. Given previous files fetch all, I'll stick to that pattern 
        // OR try the query. 'area_guide' is specific.

        const snapshot = await articlesRef.where('category', '==', 'Area Guide').get();
        // Fallback: if empty, maybe try 'category' == 'Area Guide' if data is inconsistent?
        // But let's trust categoryKey based on data/articles.ts

        if (snapshot.empty) {
            console.log("No area guide articles found.");
            return [];
        }

        const docs = snapshot.docs.map(doc => {
            const data = doc.data();

            let createdAt = '';
            if (data.createdAt && typeof data.createdAt.toDate === 'function') {
                createdAt = data.createdAt.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } else if (data.createdAt) {
                createdAt = String(data.createdAt);
            }

            return {
                ...data,
                id: doc.id,
                createdAt,
                title: data.title || '',
                summary: data.summary || '',
                image: data.image || data.imageUrl || '',
                author: data.author || 'PSI Editorial Team',
                categoryKey: data.categoryKey || 'area_guide',
                category: data.category || 'Area Guide',
                city: data.city || 'General', // Default to General if no city
                translations: data.translations || {},
            };
        });

        return JSON.parse(JSON.stringify(docs));
    } catch (error) {
        console.error("Error fetching area guides:", error);
        return [];
    }
}

// Client component for rendering not strictly needed if valid server component, 
// but we need useLocale hook for translations if we want dynamic rendering.
// Actually we can pass locale as prop to a server component or just use it.
// Let's keep it defined in file for simplicity.

const ArticleCard = ({ item, locale }: { item: FirestoreArticle; locale: string }) => {
    // URL Construction
    let categorySegment = 'area-guide';
    if (item.city) {
        const citySlug = item.city.toLowerCase().replace(/\s+/g, '-');
        categorySegment = `${categorySegment}/${citySlug}`;
    }
    const href = `/articles/${categorySegment}/${item.slug}`;

    // Get localized title/summary if available
    const title = item.translations?.[locale]?.title || item.title;
    const summary = item.translations?.[locale]?.summary || item.summary;

    return (
        <Link href={href} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="relative h-56 w-full bg-gray-200 overflow-hidden">
                <Image
                    src={item.image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.city && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
                        <MapPin size={12} className="text-secondary" />
                        {item.city}
                    </div>
                )}
            </div>
            <div className="flex flex-col flex-1 p-5">
                <div className="mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-secondary bg-secondary/5 px-2 py-1 rounded">
                        {item.category}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-6 flex-1">
                    {summary}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                    <span className="flex items-center gap-1"><Clock size={12} /> {item.createdAt}</span>
                    <span className="flex items-center gap-1 font-medium text-primary group-hover:underline">Read Article <ChevronRight size={12} /></span>
                </div>
            </div>
        </Link>
    );
};

export const metadata = {
    title: "Area Guides | Property Shop Investment",
    description: "Explore our comprehensive area guides for Dubai and Abu Dhabi real estate.",
};

export default async function AreaGuidePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const articles = await getAreaGuideArticles();
    const t = await getTranslations({ locale });

    // Group by City
    const groupedArticles: Record<string, FirestoreArticle[]> = {};

    articles.forEach((article: FirestoreArticle) => {
        // Normalize city
        const city = article.city || 'General';
        if (!groupedArticles[city]) {
            groupedArticles[city] = [];
        }
        groupedArticles[city].push(article);
    });

    // Sort cities if needed? (e.g., Abu Dhabi, Dubai, then General)
    const sortedCities = Object.keys(groupedArticles).sort();

    return (
        <main className="min-h-screen bg-gray-50/50 pb-20">
            <div className="pt-28 md:pt-24 border-b border-gray-100 bg-white">
                <div className="container mx-auto px-4 md:px-12 py-4">
                    <Breadcrumb
                        customSegments={[
                            { name: "Home", href: "/" },
                            { name: "Articles", href: "/articles" },
                            { name: "Area Guides" },
                        ]}
                    />
                </div>
            </div>

            <div className="bg-white pb-16 pt-12">
                <div className="container mx-auto px-4 md:px-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        UAE Area Guides
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Discover the best communities in Dubai and Abu Dhabi. Find your perfect home with our detailed neighborhood insights.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-12 py-12 space-y-20">
                {sortedCities.length > 0 ? (
                    sortedCities.map((city) => (
                        <section key={city} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="flex items-center gap-4 mb-8">
                                <Link href={`/articles/area-guide/${slugify(city)}`}><h2 className="text-3xl font-bold text-gray-900">{city}</h2></Link>
                                <div className="h-px bg-gray-200 flex-1"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {groupedArticles[city].map((article) => (
                                    <ArticleCard key={article.id} item={article} locale={locale} />
                                ))}
                            </div>
                        </section>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Guides Found</h3>
                        <p className="text-gray-500">We are currently updating our area guides. Please check back soon.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
