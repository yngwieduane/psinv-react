"use client";

import { useLocale, useTranslations } from 'next-intl';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { Share2, BedDouble, Expand, ChevronRight, ChevronLeft } from 'lucide-react';
import { Listbox } from '@headlessui/react';
import Link from 'next/link';
import ShareModal from './ShareModal';


// Define project keys for structure mapping
const PROJECTS_KEYS = {
    'abu_dhabi': [
        { key: 'al_jurf', image: '/assets/images/crypto/al-jurf-villa-gardens-abu-dhabi-pool.jpg', url: 'projects/abu-dhabi/ghantoot/al-jurf-gardens/al-jurf-gardens-phase-1-1' },
        { key: 'reem_hills', image: '/assets/images/crypto/reem-hills-al-reem-island-abu-dhabi-images.jpg', url: 'projects/abu-dhabi/al-reem-island/reem-hills/reem-hills-phase-2a' },
        { key: 'fairmont_marina', image: '/assets/images/crypto/fairmount-marina-residence-abu-dhabi.jpg', url: 'projects/abu-dhabi/the-marina/the-marina/fairmont-marina-residence' },
        { key: 'mamsha', image: '/assets/images/crypto/mamsha-saadiyat.jpg', url: 'projects/abu-dhabi/saadiyat-island/mamsha-al-saadiyat/mamsha-al-saadiyat' },
        { key: 'louvre_abu_dhabi_residences', image: '/assets/images/crypto/louvre-abudhabi-residence.jpg', url: 'projects/abu-dhabi/saadiyat-island/cultural-district/louvre-abu-dhabi-residences' }
    ],
    'dubai': [
        { key: 'dubai_creek_residences_1', image: '/assets/images/crypto/the-lagoons-dubai-creek-harbour.jpg', url: 'projects/dubai/dubai-creek/dubai-creek-harbour/dubai-creek-residence' },
        { key: 'dania_district', image: '/assets/images/crypto/dania-district-dubai-midtown.jpg', url: 'projects/dubai/midtown/midtown/dania-district' },
        { key: 'park_ridge_1', image: '/assets/images/crypto/park-ridge-mbr-city.jpg', url: 'projects/dubai/dubai-hills-estate/dubai-hill-estate/park-ridge' },
        { key: 'dubai_creek_residences_2', image: '/assets/images/crypto/dubai-3.jpg', url: 'projects/dubai/dubai-creek/dubai-creek-harbour/dubai-creek-residence' },
        { key: 'sunrise_bay', image: '/assets/images/crypto/sunrise-bay.jpg', url: 'projects/dubai/dubai-harbour/emaar-beachfront/sunrise-bay' },
        { key: 'park_ridge_2', image: '/assets/images/crypto/park-ridge-2.jpg', url: 'projects/dubai/dubai-hills-estate/dubai-hill-estate/park-ridge' }
    ]
};

// Mock Exchange Rates (AED base)
const RATES = {
    BTC: 0.0000027, // 1 AED = ~0.0000027 BTC (Approx $100k BTC)
    ETH: 0.000085,  // 1 AED = ~0.000085 ETH (Approx $3.2k ETH)
    USDT: 0.27,      // 1 AED = ~0.272 USDT
};

const CURRENCIES = [
    { id: 'BTC', name: 'Bitcoin', icon: '/assets/images/crypto/bitcoin.svg', color: 'bg-orange-100 text-orange-600' },
    { id: 'ETH', name: 'Ethereum', icon: '/assets/images/crypto/ethereum.svg', color: 'bg-blue-100 text-blue-600' },
    { id: 'USDT', name: 'USDT', icon: '/assets/images/crypto/usdt.svg', color: 'bg-green-100 text-green-600' },
];

const ProjectCard = ({ projectKey, city, image, url, onShare }: { projectKey: string, city: string, image: string, url: string, onShare: (url: string, title: string) => void }) => {
    const t = useTranslations('CryptoPage.projects_section');
    const locale = useLocale();
    const isRtl = locale.toLowerCase().startsWith("ar");

    const [currency, setCurrency] = useState(CURRENCIES[0]);
    const [amount, setAmount] = useState('');

    const projectTitle = t(`projects.${city}.${projectKey}.title`);

    // Fetch price string from translations (e.g., "1,900,000 AED")
    const priceString = t(`projects.${city}.${projectKey}.price`);
    // Fetch exact BTC value from translations
    const btcPrice = t(`projects.${city}.${projectKey}.btc`);
    // Extract numeric value from "1,900,000 AED"
    const priceAED = parseFloat(priceString.replace(/,/g, '').replace(' AED', '')) || 0;

    // Update calculated amount when currency changes
    useEffect(() => {
        if (currency.id === 'BTC') {
            setAmount(btcPrice);
        } else {
            const rate = RATES[currency.id as keyof typeof RATES];
            const calculated = (priceAED * rate).toFixed(2);
            setAmount(calculated);
        }
    }, [currency, priceAED, btcPrice]);

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col group" dir={isRtl ? 'rtl' : 'ltr'}>

            {/* Image Area */}
            <div className="relative h-64 w-full bg-gray-200 overflow-hidden">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-semibold text-[#0A0A2E]">
                    {t('card.for_sale')}
                </div>
                <button
                    onClick={() => onShare(url, projectTitle)}
                    className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#0A0A2E] hover:bg-white transition-colors"
                >
                    <Share2 className="w-4 h-4" />
                </button>

                {/* Placeholder Image Logic */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
                    <Image
                        src={image}
                        alt={projectTitle} title={projectTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                        }}
                    />
                    {/* Fallback visual if image fails */}
                    <BuildingPlaceholder className="w-16 h-16 opacity-20" />
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow">
                <span className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-2">
                    {t(`projects.${city}.${projectKey}.type`)}
                </span>

                <div className="md:flex justify-between items-start mb-1">
                    <h3 className="text-xl font-bold text-[#0A0A2E] line-clamp-1" title={projectTitle}>
                        {projectTitle}
                    </h3>
                    <div className="text-[#0A0A2E] font-bold text-lg mb-4">
                        {priceString}
                    </div>
                </div>

                <div className="text-gray-500 text-sm mb-6">
                    {t(`projects.${city}.${projectKey}.location`)}
                    {t(`projects.${city}.${projectKey}.developer`) && ` | ${t(`projects.${city}.${projectKey}.developer`)}`}
                </div>

                {/* Currency Selector & Input */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="relative w-1/2">
                        <Listbox value={currency} onChange={setCurrency}>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2.5 pl-3 pr-10 text-left border border-gray-200 focus:outline-none focus:border-indigo-500 sm:text-sm shadow-sm">
                                    <span className="flex items-center truncate">
                                        <span className={`flex items-center justify-center w-5 h-5 rounded-full mr-2 text-xs ${currency.color}`}>
                                            <Image src={currency.icon} alt={currency.name} title={currency.name} width={20} height={20} />
                                        </span>
                                        <span className="block truncate text-[#0A0A2E] font-bold">{currency.name}</span>
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronRight className="h-4 w-4 text-gray-400 rotate-90" aria-hidden="true" />
                                    </span>
                                </Listbox.Button>
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                                    {CURRENCIES.map((curr) => (
                                        <Listbox.Option
                                            key={curr.id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-indigo-50 text-indigo-900' : 'text-gray-900'
                                                }`
                                            }
                                            value={curr}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span className={`flex items-center justify-center w-5 h-5 rounded-full absolute left-3 top-1/2 -translate-y-1/2 text-xs ${curr.color}`}>
                                                        <Image src={curr.icon} alt={curr.name} title={curr.name} width={20} height={20} />
                                                    </span>
                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                        {curr.name}
                                                    </span>
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </div>
                        </Listbox>
                    </div>

                    <div className="w-1/2">
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 py-2.5 px-3 text-[#0A0A2E] font-bold focus:outline-none focus:border-indigo-500 text-left sm:text-sm shadow-sm"
                        />
                    </div>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-6 mb-6 text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                        <BedDouble className="w-4 h-4" />
                        <span>{t(`projects.${city}.${projectKey}.beds`)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Expand className="w-4 h-4" />
                        <span>{t(`projects.${city}.${projectKey}.area`)} {t('card.sqft')}</span>
                    </div>
                </div>

                {/* Buy Button */}
                <Link href={`${url}`} title={`See more about ${t(`projects.${city}.${projectKey}.title`)}`}
                    className="mt-auto text-center w-full bg-[#1A1A4A] hover:bg-[#23235B] text-white font-medium py-3 rounded-lg transition-colors">
                    {t('card.buy_btn')}
                </Link>
            </div>
        </div>
    );
}

const CryptoProjectsSection = () => {
    const t = useTranslations('CryptoPage.projects_section');
    const locale = useLocale();
    const isRtl = locale.toLowerCase().startsWith("ar");

    const [activeCity, setActiveCity] = useState<'abu_dhabi' | 'dubai'>('abu_dhabi');

    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareData, setShareData] = useState({ url: '', title: '' });

    const openShareModal = (url: string, title: string) => {
        setShareData({ url, title });
        setIsShareModalOpen(true);
    };

    const activeProjectKeys = PROJECTS_KEYS[activeCity] || [];

    return (
        <section className="bg-white py-20 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-6 md:px-12">

                {/* Header and Tabs */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                    <div className="w-full">
                        <h2 className="text-[#0A0A2E] text-2xl md:text-3xl font-bold mb-8">
                            {t('title')}
                        </h2>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setActiveCity('abu_dhabi')}
                                className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeCity === 'abu_dhabi'
                                    ? 'bg-[#1A1A4A] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {t('tabs.abu_dhabi')}
                            </button>
                            <button
                                onClick={() => setActiveCity('dubai')}
                                className={`px-6 py-2 rounded-lg font-medium transition-colors ${activeCity === 'dubai'
                                    ? 'bg-[#1A1A4A] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {t('tabs.dubai')}
                            </button>
                        </div>
                    </div>

                    {/* Navigation Buttons placed at top right (desktop) */}
                    <div className="flex gap-2">
                        <button className="prop-swiper-prev cursor-pointer w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-[#0A0A2E] transition-colors">
                            <ChevronLeft className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                        </button>
                        <button className="prop-swiper-next cursor-pointer w-8 h-8 rounded-full bg-[#1A1A4A] hover:bg-[#23235B] flex items-center justify-center text-white transition-colors">
                            <ChevronRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Projects Slider */}
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={1}
                    navigation={{
                        nextEl: '.prop-swiper-next',
                        prevEl: '.prop-swiper-prev',
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 2.8 },
                    }}
                    className="w-full !pb-10" // Padding bottom for shadow/hover space
                >
                    {activeProjectKeys.map((project, index) => (
                        <SwiperSlide key={project.key} className="h-full">
                            <ProjectCard
                                projectKey={project.key}
                                city={activeCity}
                                image={project.image}
                                url={project.url}
                                onShare={openShareModal}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                projectUrl={shareData.url}
                projectTitle={shareData.title}
            />
        </section>
    );
};

// Simple placeholder SVG component
const BuildingPlaceholder = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" />
        <path d="M16 6h.01" />
        <path d="M12 6h.01" />
        <path d="M12 10h.01" />
        <path d="M12 14h.01" />
        <path d="M16 10h.01" />
        <path d="M16 14h.01" />
        <path d="M8 10h.01" />
        <path d="M8 14h.01" />
    </svg>
);

export default CryptoProjectsSection;
