// src/app/[locale]/articles/area-guide/[slug]/page.tsx
import { notFound } from "next/navigation";
import ArticleSingle, {
  generateMetadata as generateArticleMetadata,
} from "../../[slug]/page";
import { ARTICLES } from "@/data/articles";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import Breadcrumb from "../../../_components/Breadcrumb";

type Params = {
  slug: string;
  locale: string;
};

type Props = {
  params: Promise<Params>;
};

const CITY_BY_SLUG: Record<string, string> = {
  "abu-dhabi": "Abu Dhabi",
  "dubai": "Dubai",
  "sharjah": "Sharjah",
  "ajman": "Ajman",
  "rak": "RAK",
  "umm-al-quwain": "Umm Al Quwain",
};

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;

  // City pages
  if (CITY_BY_SLUG[slug]) {
    return { title: `${CITY_BY_SLUG[slug]} Area Guide` };
  }

  // Article pages fallback
  return generateArticleMetadata({
    params: Promise.resolve({ slug, locale }),
  } as any);
}

async function CityListing({ city, locale }: { city: string; locale: string }) {
  const t = await getTranslations({ locale, namespace: "Articles" });

  const cityArticles = ARTICLES.filter(
    (a) => a.city === city && a.category === "Area Guide"
  );

  return (
    <>
      <div className="bg-[#f4f4f4] mt-30 mb-3 border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-8 py-4">
          <Breadcrumb />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-12 min-h-screen">
        <h1 className="text-4xl font-bold mb-12 text-gray-900">
          {city} Area Guide
        </h1>

        {cityArticles.length === 0 ? (
          <p className="text-gray-500">No articles found for this area yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cityArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              >
                <Link
                  href={`/articles/area-guide/${article.slug}`}
                  className="block h-full flex flex-col"
                >
                  <div className="relative h-56 w-full">
                    <Image
                      src={article.imageUrl}
                      alt={t(`${article.id}.title`)}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                      {article.category}
                    </span>

                    <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2">
                      {t(`${article.id}.title`)}
                    </h3>

                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                      {t(`${article.id}.summary`)}
                    </p>

                    <span className="text-sm font-medium text-emerald-600 mt-auto">
                      Read Guide &rarr;
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default async function Page({ params }: Props) {
  const { slug, locale } = await params;

  const city = CITY_BY_SLUG[slug];
  if (city) {
    return <CityListing city={city} locale={locale} />;
  }

  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  return <ArticleSingle params={Promise.resolve({ slug, locale }) as any} />;
}
