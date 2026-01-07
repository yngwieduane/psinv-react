"use client";

import { useTranslations } from 'next-intl';
import React from 'react';

const MarketOpennessSection = ({ onOpenModal }: { onOpenModal?: () => void }) => {
    const t = useTranslations('CryptoPage.market_openness');

    const cards = [
        { key: 'zones', ctaColor: 'bg-orange-600 hover:bg-orange-700' },
        { key: 'diverse', ctaColor: 'bg-orange-600 hover:bg-orange-700' }, // Assuming same color for now, adjusted if needed
        { key: 'visa', ctaColor: 'bg-orange-600 hover:bg-orange-700' }
    ];

    return (
        <section className="bg-[#090953] py-20 relative overflow-hidden">
            {/* Title */}
            <div className="container mx-auto px-6 md:px-12 mb-12 text-center">
                <h2 className="text-white text-3xl md:text-4xl font-bold font-serif">
                    {t('title')}
                </h2>
            </div>

            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cards.map((card) => (
                        <div key={card.key} className="bg-[#232563] rounded-xl p-8 flex flex-col items-start min-h-[250px] shadow-lg hover:shadow-xl transition-shadow border border-white/5">

                            <h3 className="text-white text-2xl font-bold mb-4">
                                {t(`cards.${card.key}.title`)}
                            </h3>

                            <p className="text-gray-300 text-lg leading-relaxed mb-8 flex-grow">
                                {t(`cards.${card.key}.desc`)}
                            </p>

                            <button onClick={onOpenModal} className={`${card.ctaColor} text-white font-medium py-2 px-6 rounded-md transition-colors text-lg`}>
                                {t(`cards.${card.key}.cta`)}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarketOpennessSection;
