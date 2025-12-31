// src/app/[locale]/articles/area-guide/page.tsx
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import Breadcrumb from "../../_components/Breadcrumb";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Area Guide - UAE Real Estate",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AreaGuideIndex({ params }: Props) {
  const { locale } = await params;

  // If you need translations later, keep this ready.
  // (Currently you're not using `t` in this component, but safe to keep.)
  const t = await getTranslations({ locale, namespace: "Articles" });

  const AREAS = [
    {
      name: "Abu Dhabi",
      slug: "abu-dhabi",
      image: "/assets/images/articles/area-abu-dhabi.webp",
    },
    { name: "Dubai", slug: "dubai", image: "/assets/images/articles/area-dubai.webp" },
    { name: "Sharjah", slug: "sharjah", image: "/assets/images/articles/area-abu-dhabi.webp" },
    { name: "Ajman", slug: "ajman", image: "/assets/images/articles/area-dubai.webp" },
    { name: "RAK", slug: "rak", image: "/assets/images/articles/area-abu-dhabi.webp" },
    { name: "Umm Al Quwain", slug: "umm-al-quwain", image: "/assets/images/articles/area-dubai.webp" },
  ];

  return (
    <>
      <div className="bg-[#f4f4f4] mt-30 mb-3 border-b border-gray-200">
        <div className="container mx-auto px-6 lg:px-8 py-4">
          <Breadcrumb />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 py-12 min-h-screen">
        <h1 className="text-4xl font-bold mb-12 text-gray-900">Area Guide</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`/articles/area-guide/${area.slug}`}
              className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer block"
            >
              <Image
                src={area.image}
                alt={area.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-white">
                {area.name}
              </span>

              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
