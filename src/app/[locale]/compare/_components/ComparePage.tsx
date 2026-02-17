'use client'
import React, { useState } from 'react';
import { PROPERTIES } from '@/constants/main'
import { Shuffle, X, Check, CheckCircle2 } from 'lucide-react';
import { useUser } from '@/context/userContext';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import slugify from 'react-slugify';
import { useLocale, useTranslations } from "next-intl";
import { generateSeoData } from '../../_components/functions/generateSeoData';

import { useCurrency } from '@/context/currencyContext';

const ComparePage: React.FC<{}> = ({ }) => {
    const t = useTranslations("Compare_page");
    const { compareList, removeFromCompare, clearCompareList } = useUser();
    const { convertPrice, currency } = useCurrency();
    const [activeTab, setActiveTab] = useState<'project' | 'units'>('units');
    // Filter and enrich items
    const projectItems = compareList
        .filter(item => item.type === 'project')
        .map(item => item.data || PROPERTIES.find(p => p.id === item.id))
        .filter(Boolean);

    const unitItems = compareList
        .filter(item => item.type === 'units' || item.type === 'property')
        .map(item => item.data || PROPERTIES.find(p => p.id === item.id))
        .filter(Boolean);

    const activeItems = activeTab === 'project' ? projectItems : unitItems;

    const features = [
        { label: 'Location', key: 'location', render: (d: any) => d.community || d.location },
        { label: 'Type', key: 'type', render: (d: any) => d.propertyType || d.type || d.category },
        { label: 'Status', key: 'status', render: (d: any) => d.status },
        { label: 'Developer', key: 'developer', render: (d: any) => d.masterDeveloper || d.developer || d.developerName || d.agent },
        {
            label: 'Beds', key: 'beds', render: (d: any) => {
                if (d.availableBedrooms && Array.isArray(d.availableBedrooms)) {
                    return d.availableBedrooms.map((b: any) => b.noOfBedroom).join(', ');
                }
                return d.beds || d.bedrooms;
            }
        },
        {
            label: `Price (${currency})`, key: 'price', render: (d: any) => {
                const val = d.priceFrom || d.sellprice || d.rent;
                return val ? convertPrice(Number(val)).formatted : 'TBD';
            }
        },
        {
            label: 'Handover', key: 'handover', render: (d: any) => {
                if (d.handoverDate) return new Date(d.handoverDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
                return d.handover;
            }
        },
        {
            label: 'URL', key: 'url', render: (d: any) => {
                if (d.code) {
                    let maincategory;
                    {
                        d.sellprice !== null
                            ? maincategory = "Sale"
                            : maincategory = "Rent";
                    }
                    const propertyData = {
                        bedrooms: d.bedrooms,
                        propertyType: d.category,
                        adType: maincategory,
                        name: d.propertyname,
                        community: d.community,
                        emirate: d.city_name,
                        refNo: d.refNo,
                        code: d.code,
                        seoStart: "",
                    };
                    const seoData = generateSeoData(propertyData);
                    return `/unit/${seoData.seoUrl}`;
                } else {
                    return `/projects/${slugify(d.city)}/${slugify(d.community)}/${slugify(d.subCommunity || 'n-a')}/${slugify(d.propertyName)}`;
                }
            }
        }
    ];

    if (compareList.length === 0) {
        return (
            <div className="min-h-screen pt-40 pb-20 container mx-auto px-6 text-center">
                <div className="bg-gray-50 rounded-3xl p-20 flex flex-col items-center dark:bg-gray-800">
                    <Shuffle size={64} className="text-gray-300 mb-6 dark:text-gray-600" />
                    <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2 dark:text-white">{t('unlockSection.title')}</h1>
                    <h2 className="text-gray-500 text-lg dark:text-gray-400">{t('unlockSection.description')}</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-40 pb-20 bg-white dark:bg-neutral-900">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-12 gap-6">
                    <h1 className="text-4xl font-serif font-bold text-primary dark:text-white">{t('unlockSection.title')}</h1>

                    <div className="flex items-center gap-4">
                        {/* Clear All */}
                        {compareList.length > 0 && (
                            <button
                                onClick={clearCompareList}
                                className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                                <X size={16} /> {t('unlockSection.clear-all')}
                            </button>
                        )}

                        {/* Tabs */}
                        <div className="flex bg-gray-100 p-1 rounded-xl dark:bg-gray-800">
                            <button
                                onClick={() => setActiveTab('units')}
                                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'units'
                                    ? 'bg-white text-[#353455] shadow-sm dark:bg-gray-700 dark:text-white'
                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                    }`}
                            >
                                Units ({unitItems.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('project')}
                                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'project'
                                    ? 'bg-white text-[#353455] shadow-sm dark:bg-gray-700 dark:text-white'
                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                    }`}
                            >
                                Projects ({projectItems.length})
                            </button>
                        </div>
                    </div>
                </div>

                {activeItems.length === 0 ? (
                    <div className="bg-gray-50/50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-100 dark:bg-gray-800/50 dark:border-gray-800">
                        <p className="text-gray-500 font-medium dark:text-gray-400">No {activeTab} added to compare yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto pb-8">
                        <table className="w-full min-w-[800px] border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-4 text-left w-48 bg-gray-50 rounded-tl-xl dark:bg-gray-800 dark:text-gray-300">Feature</th>
                                    {activeItems.map((item: any) => (
                                        <th key={item.propertyID || item.code} className="p-4 w-1/3 min-w-[250px] align-top bg-white border-b border-gray-100 relative group dark:bg-neutral-900 dark:border-gray-800">
                                            <button
                                                onClick={() => removeFromCompare(item.propertyID || item.code)}
                                                className="absolute top-2 right-2 p-1.5 bg-gray-100 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors z-10 cursor-pointer dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                                                title="Remove"
                                            >
                                                <X size={16} />
                                            </button>
                                            <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                                                <img
                                                    src={
                                                        item.featuredImages && item.featuredImages.length > 0
                                                            ? item.featuredImages[0].imageURL
                                                            : (item.images && Array.isArray(item.images) && item.images.length > 0
                                                                ? item.images[0]
                                                                : (item.imageurl ? item.imageurl.split('|')[0] : '')
                                                            )
                                                    }
                                                    className="w-full h-full object-cover"
                                                    alt={item.propertyName || item.marketingTitle || item.title}
                                                />
                                                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                                    {item.status || (item.rent ? 'For Rent' : 'For Sale')}
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-1 dark:text-white">{item.propertyName || item.marketingTitle || item.title}</h3>
                                            <p className="text-sm text-gray-500 font-normal flex items-center gap-1 mb-4">
                                                {item.community}
                                            </p>
                                            <Link
                                                href={activeTab === 'project'
                                                    ? `/projects/${slugify(item.city)}/${slugify(item.community)}/${slugify(item.subCommunity || 'n-a')}/${slugify(item.propertyName)}`
                                                    : `${features[features.length - 1].render(item)}` // Adjust logic for unit linking if needed
                                                }
                                                className="inline-block w-full py-2 bg-[#0c1356] text-white text-center rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                                            >
                                                View Details
                                            </Link>
                                        </th>
                                    ))}
                                    {/* Fill empty columns if less than 3 */}
                                    {[...Array(3 - activeItems.length)].map((_, i) => (
                                        <th key={`empty-${i}`} className="p-4 w-1/3 bg-gray-50/30 border-dashed border-2 border-gray-100 rounded-lg m-2 dark:bg-gray-800/30 dark:border-gray-800">
                                            <div className="h-full flex flex-col items-center justify-center text-gray-300 min-h-[300px] dark:text-gray-600">
                                                <Shuffle size={48} className="mb-4 opacity-20" />
                                                <p className="font-medium">Add {activeTab}</p>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {features.slice(0, -1).map((feature, idx) => (
                                    <tr key={feature.key} className={idx % 2 === 0 ? "bg-white dark:bg-neutral-900" : "bg-gray-50/50 dark:bg-gray-800/50"}>
                                        <td className="p-4 font-bold text-gray-700 border-r border-gray-100 dark:text-gray-300 dark:border-gray-800">{feature.label}</td>
                                        {activeItems.map((item: any) => (
                                            <td key={item.propertyID || item.id} className="p-4 text-center text-gray-600 border-b border-gray-50 dark:text-gray-400 dark:border-gray-800">
                                                {feature.render(item)}
                                            </td>
                                        ))}
                                        {[...Array(3 - activeItems.length)].map((_, i) => (
                                            <td key={`empty-cell-${i}`} className="p-4"></td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComparePage;
