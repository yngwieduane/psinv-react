import { ARTICLES, CATEGORY_LABELS, type CategoryKey } from "@/data/articles";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Breadcrumb from "../../../_components/Breadcrumb"
type Params = {
    locale: string;
    category: string;
};
const slugToCategoryKey = (slug: string): CategoryKey | null => {
    const key = slug.replaceAll("-", "_") as CategoryKey;
    return (key in CATEGORY_LABELS) ? key : null;
};
const toTime = (d: string) => {
    const t = Date.parse(d);
    return Number.isNaN(t) ? 0 : t;
};
export default async function CategoryPage({ params }: { params: Promise<Params> }) {
    const { locale, category } = await params;
    const categoryKey = slugToCategoryKey(category);
    if (!categoryKey) notFound();

    const ui = await getTranslations({ locale, namespace: "ArticlesPage" });
    const a = await getTranslations({ locale, namespace: "Articles" });

    const categoryLabel =
        ui(`categories.${categoryKey}`) ?? CATEGORY_LABELS[categoryKey];

    const items = ARTICLES
        .filter((x) => x.categoryKey === categoryKey)
        .sort((a1, a2) => toTime(a2.date) - toTime(a1.date));

    return (
        <>
            <div className="bg-[#f4f4f4] mt-30 mb-3 border-b border-gray-200">
                <div className="container mx-auto px-6 lg:px-8 py-4">
                    <Breadcrumb
                        customSegments={[
                            { name: "Home", href: "/" },
                            { name: "Articles", href: "/articles" },
                            { name: categoryLabel },
                        ]}
                    />
                </div>
            </div>
            <div className="min-h-screen bg-white pt-18 pb-10">
                <div className="container mx-auto px-6 md:px-12">
                    {/* Hero */}
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold mb-2">{ui(`categories.${categoryKey}`)}</h1>
                        <p className="text-gray-600">
                            {items.length} article{items.length === 1 ? "" : "s"}
                        </p>
                    </div>
                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {items.map((item) => (
                            <Link key={item.id} href={`/articles/${item.slug}`} className="group block">
                                <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                                    <div className="relative h-48">
                                        <Image
                                            src={item.imageUrl}
                                            alt={a(`${item.id}.title`)}
                                            title={a(`${item.id}.title`)}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-5">
                                        <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                                            {ui(`categories.${categoryKey}`)}
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                                            {a(`${item.id}.title`)}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                            {a(`${item.id}.summary`)}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
