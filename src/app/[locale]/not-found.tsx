'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getCitiesData } from '@/utils/citiesDataHelper';
// import { CitiesClientWrapper } from './_components/HomeClientWrapperElements';
import { Outfit } from "next/font/google";
import CityProjectsGrid from './_components/CityProjectsGrid';

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

export default function NotFound() {
    const t = useTranslations('Agents');

    const t_cities = useTranslations('citiesHome');
    const citiesData = getCitiesData(t_cities);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("/assets/images/about-us/psi-office.webp")' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className={`text-7xl font-bold mb-4 opacity-20 ${outfit.className}`}>404</h1>
                    <h2 className={`text-2xl font-bold mb-6 ${outfit.className}`}>Page Not Found</h2>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 border border-white/30 hover:border-white text-base font-medium rounded-full text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>

            {/* City Sections */}
            <div className="w-full pb-20 mt-10 space-y-20">
                {/* Abu Dhabi Section */}
                {citiesData.find(c => c.id === "26792") && (
                    <div className="container mx-auto px-4 md:px-8">
                        <h3 className={`text-2xl text-center text-gray-900 mb-10 ${outfit.className}`}>
                            {citiesData.find(c => c.id === "26792")?.title}
                        </h3>
                        <CityProjectsGrid projects={citiesData.find(c => c.id === "26792")?.projects || []} />
                    </div>
                )}

                {/* Dubai Section */}
                {citiesData.find(c => c.id === "26786") && (
                    <div className="container mx-auto px-4 md:px-8">
                        <h3 className={`text-2xl text-center text-gray-900 mb-10 ${outfit.className}`}>
                            {citiesData.find(c => c.id === "26786")?.title}
                        </h3>
                        <CityProjectsGrid projects={citiesData.find(c => c.id === "26786")?.projects || []} />
                    </div>
                )}
            </div>
        </div>
    );
}
