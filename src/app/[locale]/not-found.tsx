'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { getCitiesData } from '@/utils/citiesDataHelper';
import { CitiesClientWrapper } from './_components/HomeClientWrapperElements';

export default function NotFound() {
    const t = useTranslations('Agents'); // Using Agents namespace if suitable, or common if exists. Usually 404 messages are in common or error namespace.
    // Checking en.json content from memory (step 75), there isn't a dedicated 404 namespace but "Page Not Found" is generic.
    // I will use some hardcoded text or try to find a relevant key if I check en.json again. 
    // Wait, I saw 404.tsx in Step 194. It had hardcoded text. I will use similar hardcoded text or add translations if needed.
    // To match the homepage structure, I need t_cities for the data helper.

    const t_cities = useTranslations('citiesHome');
    const citiesData = getCitiesData(t_cities);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 mt-20">
            <div className="text-center space-y-6 max-w-2xl px-4">
                <h1 className="text-9xl font-bold text-[#0c1356]/10">404</h1>
                <h2 className="text-3xl font-bold text-[#0c1356]">Page Not Found</h2>
                <p className="text-gray-500 text-lg">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#0c1356] hover:bg-[#CE641D] transition-colors duration-300"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>

            <div className="w-full mt-20">
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-gray-900">Explore Our Properties</h3>
                    <p className="text-gray-500 mt-2">Check out our latest projects in key locations</p>
                </div>
                <div className="bg-gray-50 py-10">
                    <CitiesClientWrapper cities={citiesData} centered={true} />
                </div>
            </div>
        </div>
    );
}
