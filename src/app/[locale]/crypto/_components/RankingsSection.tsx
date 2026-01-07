"use client";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

const RankingsSection = () => {
    const t = useTranslations('CryptoPage.rankings');

    // Stats data mapping keys to icons
    const rankings = [
        { key: 'safest', icon: '/assets/images/crypto/safest-icon.svg' },
        { key: 'holiday_city', icon: '/assets/images/crypto/city-icon.svg' },
        { key: 'purchase_home', icon: '/assets/images/crypto/city-icon-2.svg' },
        { key: 'tolerance', icon: '/assets/images/crypto/heart-icon.svg' },
    ];

    return (
        <section className="bg-[#090953] py-20 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
                {/* Main Heading */}
                <h2 className="text-white text-base md:text-2xl font-medium mb-4 leading-relaxed">
                    {t('title')}
                </h2>
                <h3 className="hidden md:block text-white text-4xl font-bold leading-tight">
                    {t('highlightDesk')}
                </h3>
                <h3 className="block md:hidden text-white text-xl font-bold leading-loose">
                    {t('highlightMobile.part1')}<br />
                    {t('highlightMobile.part2')}<br />
                    {t('highlightMobile.part3')}
                </h3>

                {/* Highlight Heading with Arrows */}
                <div className="relative inline-block my-8 md:my-16 px-4 md:px-20 w-full h-[60px] md:h-auto">
                    <div className="absolute left-4 md:left-0 top-1/2 -translate-y-1/2 w-16 md:w-1/4 h-[60px] md:h-[100px] md:-ml-20">
                        <Image
                            src="/assets/images/crypto/arrow-left-icon.svg"
                            alt="Arrow Left"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div className="absolute right-4 md:right-0 top-1/2 -translate-y-1/2 w-16 md:w-1/4 h-[60px] md:h-[100px] md:-mr-20">
                        <Image
                            src="/assets/images/crypto/arrows-right.svg"
                            alt="Arrow Right"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                    {rankings.map(({ key, icon }) => (
                        <div
                            key={key}
                            className="bg-[#1A1A4A] p-4 md:p-8 flex flex-col items-center justify-between text-center min-h-[180px] md:min-h-[250px] hover:bg-[#23235B] transition-colors duration-300"
                        >
                            <div className="w-8 h-8 md:w-12 md:h-12 relative flex-shrink-0 mb-4">
                                <Image
                                    src={icon}
                                    alt={t(`cards.${key}`)}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="text-white text-sm md:text-2xl font-medium leading-relaxed mb-0">
                                {t(`cards.${key}`)}
                            </p>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RankingsSection;
