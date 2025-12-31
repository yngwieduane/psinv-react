
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import Breadcrumb from "../../_components/Breadcrumb";

export const metadata = {
    title: "Area Guide - UAE Real Estate",
};

export default function AreaGuideIndex({
    params: { locale },
}: {
    params: { locale: string };
}) {
    const t = useTranslations("Articles");

    // Using placeholders for missing images
    const AREAS = [
        { name: "Abu Dhabi", slug: "abu-dhabi", image: "/assets/images/articles/area-abu-dhabi.webp" },
        { name: "Dubai", slug: "dubai", image: "/assets/images/articles/area-dubai.webp" },
        { name: "Sharjah", slug: "sharjah", image: "/assets/images/articles/area-abu-dhabi.webp" }, // Placeholder
        { name: "Ajman", slug: "ajman", image: "/assets/images/articles/area-dubai.webp" }, // Placeholder
        { name: "RAK", slug: "rak", image: "/assets/images/articles/area-abu-dhabi.webp" }, // Placeholder
        { name: "Umm Al Quwain", slug: "umm-al-quwain", image: "/assets/images/articles/area-dubai.webp" }, // Placeholder
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

                            {/* Overlay for better text visibility if needed, though design shows clean image */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
