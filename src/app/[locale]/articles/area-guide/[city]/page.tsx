import { db } from "@/lib/firebase-admin";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Clock, ChevronRight, MapPin } from "lucide-react";
import Breadcrumb from "../../../_components/Breadcrumb";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

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

// Helper to normalize city names for comparison
// slug: 'abu-dhabi' -> city: 'Abu Dhabi'
function normalizeCity(city: string): string {
    return city.toLowerCase().replace(/\s+/g, '-');
}

// Fetch articles for a specific city
async function getCityArticles(citySlug: string) {
    try {
        const articlesRef = db.collection('articles');
        // Fetch all Area Guide articles first
        // We filter by city in memory to handle slug normalization safely
        const snapshot = await articlesRef.where('category', '==', 'Area Guide').get();

        if (snapshot.empty) {
            return [];
        }

        const documents: FirestoreArticle[] = [];
        const targetSlug = citySlug.toLowerCase();

        snapshot.forEach(doc => {
            const data = doc.data();
            const city = data.city || '';
            const normalizedCity = normalizeCity(city);

            if (normalizedCity === targetSlug) {
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

                documents.push({
                    ...data,
                    id: doc.id,
                    createdAt,
                    title: data.title || '',
                    summary: data.summary || '',
                    image: data.image || data.imageUrl || '',
                    author: data.author || 'PSI Editorial Team',
                    categoryKey: data.categoryKey || 'area_guide',
                    category: data.category || 'Area Guide',
                    city: data.city || '',
                    translations: data.translations || {},
                    slug: data.slug || ''
                } as FirestoreArticle);
            }
        });

        return documents;
    } catch (error) {
        console.error("Error fetching city articles:", error);
        return [];
    }
}

const ArticleCard = ({ item, locale }: { item: FirestoreArticle; locale: string }) => {
    // URL Construction
    let categorySegment = 'area-guide';
    if (item.city) {
        const citySlug = normalizeCity(item.city);
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

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
    const { city } = await params;
    // Format city for title (abu-dhabi -> Abu Dhabi)
    const formattedCity = city
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return {
        title: `${formattedCity} Area Guides | Property Shop Investment`,
        description: `Explore the best residential communities and neighborhoods in ${formattedCity}.`,
    };
}

export default async function CityAreaGuidePage({ params }: { params: Promise<{ locale: string, city: string }> }) {
    const { locale, city } = await params;
    const articles = await getCityArticles(city);
    // const t = await getTranslations({ locale }); // unused for now

    if (articles.length === 0) {
        // Option: Show empty state or 404? 
        // Showing empty state is usually better for UX if distinct from "page doesn't exist"
        // But if the city is totally invalid (e.g., /area-guide/mars), 404 might be right.
        // For now, let's show an empty state.
    }

    const formattedCity = city
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <main className="min-h-screen bg-gray-50/50 pb-20">
            <div className="pt-28 md:pt-24 border-b border-gray-100 bg-white">
                <div className="container mx-auto px-4 md:px-12 py-4">
                    <Breadcrumb
                        customSegments={[
                            { name: "Home", href: "/" },
                            { name: "Articles", href: "/articles" },
                            { name: "Area Guides", href: "/articles/area-guide" },
                            { name: formattedCity },
                        ]}
                    />
                </div>
            </div>

            <div className="bg-white pb-16 pt-12">
                <div className="container mx-auto px-4 md:px-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        {formattedCity} Guides
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Detailed insights and guides for communities in {formattedCity}.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-12 py-12">
                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <ArticleCard key={article.id} item={article} locale={locale} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Guides Found for {formattedCity}</h3>
                        <p className="text-gray-500">We don&apos;t have any guides for this area yet.</p>
                        <div className="mt-6">
                            <Link href="/articles/area-guide" className="text-primary font-bold hover:underline">
                                Browse all Area Guides
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
