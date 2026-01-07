"use client";

import { useTranslations } from 'next-intl';
import React from 'react';
import { ShieldCheck, Network, Building2, Eye, Info } from 'lucide-react';
import Image from 'next/image';

const SafeServiceProcessSection = () => {
    const t = useTranslations('CryptoPage.safe_service_process');

    const cards = [
        {
            key: 'card1',
            text: t('cards.card1'),
            icon: '/assets/images/crypto/authentication.svg',
            color: 'text-orange-500',
            glow: 'shadow-[0_0_20px_rgba(249,115,22,0.3)]'
        },
        {
            key: 'card2',
            text: t('cards.card2'),
            icon: '/assets/images/crypto/options.svg',
            color: 'text-green-400',
            glow: 'shadow-[0_0_20px_rgba(74,222,128,0.3)]'
        },
        {
            key: 'card3',
            text: t('cards.card3'),
            icon: '/assets/images/crypto/developers.svg',
            color: 'text-blue-400',
            glow: 'shadow-[0_0_20px_rgba(96,165,250,0.3)]'
        },
        {
            key: 'card4',
            text: t('cards.card4'),
            icon: '/assets/images/crypto/tour.svg',
            color: 'text-yellow-400',
            glow: 'shadow-[0_0_20px_rgba(250,204,21,0.3)]'
        },
    ];

    return (
        <section className="bg-[#090953] py-20 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-12 uppercase tracking-wide">
                    {t('title')}
                </h2>

                <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
                    {/* Key Image: Moved to top on mobile */}
                    <div className="order-1 lg:order-2 relative h-full min-h-[350px] md:min-h-[460px] flex items-center justify-center bg-[#151545] rounded-xl overflow-hidden p-6">
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Decorative circuit lines */}
                            <div className="absolute inset-0 opacity-10 bg-[url('/assets/pattern-bg.png')] bg-repeat" />

                            <div className="relative w-full h-full max-h-[400px] flex items-center justify-center">
                                <Image
                                    src="/assets/images/crypto/safe-service-process.png"
                                    alt="safe-service"
                                    width={200}
                                    height={200}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Cards Grid: Below Key Image on mobile, 2 columns */}
                    <div className="order-2 lg:order-1 grid grid-cols-2 gap-4 md:gap-6">
                        {cards.map((card) => {
                            return (
                                <div
                                    key={card.key}
                                    className="bg-[#151545] rounded-xl p-4 md:p-8 flex flex-col items-center text-center justify-center min-h-[180px] md:min-h-[220px] relative group hover:bg-[#1A1A55] transition-colors border border-gray-800/30"
                                >
                                    {/* Top glow effect */}
                                    <div className={`absolute top-0 w-1/2 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-60 ${card.color}`} />

                                    <div className="mb-4 md:mb-6">
                                        <Image src={card.icon} alt="" width={40} height={40} className="md:w-[50px] md:h-[50px]" />
                                    </div>
                                    <p className="text-white text-sm md:text-lg font-medium leading-normal">
                                        {card.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SafeServiceProcessSection;
