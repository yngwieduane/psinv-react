"use client";

import { useLocale, useTranslations } from 'next-intl';
import React from 'react';
import Image from 'next/image';

const RealEstateFoundations = ({ onOpenModal }: { onOpenModal?: () => void }) => {
    const t = useTranslations('CryptoPage.real_estate_foundations');
    const locale = useLocale();
    const isRtl = locale.toLowerCase().startsWith("ar");

    const cities = [
        { name: 'cairo', val: '4.5%' },
        { name: 'moscow', val: '4.5%' },
        { name: 'london', val: '3.8%' },
        { name: 'hong_kong', val: '3.4%' },
        { name: 'new_york', val: '3.2%' },
        { name: 'paris', val: '2.8%' },
        { name: 'mumbai', val: '2.4%' },
    ];

    const stats = [
        { key: 'tax', color: 'text-orange-500' },
        { key: 'gdp', color: 'text-orange-500' },
        { key: 'contribution', color: 'text-orange-500' },
    ];

    return (
        <section className="bg-[#090953] pb-20 pt-10" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="container mx-auto px-6 md:px-12">

                {/* Top Section: Hero + Returns Table */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                    {/* Hero Area (Spans 2 cols) */}
                    <div className="lg:col-span-2 relative min-h-[400px] rounded-xl overflow-hidden group">
                        {/* Background Image */}
                        <Image
                            src="/assets/images/crypto/sea-background.jpg"
                            alt="Abu Dhabi Real Estate" title="Abu Dhabi Real Estate"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A2E]/90 via-[#0A0A2E]/40 to-transparent" />

                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center max-w-lg">
                            <h2 className="text-white text-3xl md:text-5xl font-bold uppercase leading-tight mb-6">
                                {t('title')}
                            </h2>
                            <p className="text-white text-xl font-medium leading-relaxed">
                                {t('subtitle')}
                            </p>
                        </div>
                    </div>

                    {/* Returns Average Table */}
                    <div className="bg-[#E85C29] rounded-xl text-white relative overflow-hidden">
                        <h3 className="text-2xl font-bold mb-4 pt-8 px-8">{t('returns_title')}</h3>

                        <div className="mb-6 px-8">
                            <p className="text-xl font-bold leading-tight">
                                {t('returns_highlight')}
                            </p>
                        </div>

                        <div className="space-y-3 relative z-10 bg-[#232563] pb-8 px-8 pt-3">
                            {cities.map((city, index) => (
                                <div key={city.name} className="flex justify-between items-center text-md border-b border-white/20 pb-2 last:border-0">
                                    <span>{t(`cities.${city.name}`)}</span>
                                    <span>{city.val}</span>
                                </div>
                            ))}
                        </div>
                        {/* Subtle bg pattern */}
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-x-10 translate-y-10" />
                    </div>
                </div>

                {/* Bottom Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.key} className="bg-[#1A1A4A] rounded-xl p-8 text-center border border-white/5">
                            <div className={`text-4xl font-bold mb-3 ${stat.color}`}>
                                {t(`stats.${stat.key}.value`)}
                            </div>
                            <p className="text-white font-medium text-lg">
                                {t(`stats.${stat.key}.desc`)}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default RealEstateFoundations;
