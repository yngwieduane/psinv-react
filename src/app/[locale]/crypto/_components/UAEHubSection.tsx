"use client";

import { useTranslations } from 'next-intl';
import React from 'react';
import Image from 'next/image';

const UAEHubSection = () => {
    const t = useTranslations('CryptoPage.uae_hub');
    const stats = t.raw('stats') as { value: string; text: string }[];

    return (
        <section className="bg-[#090953] pb-20 pt-10 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 text-center">

                {/* Title */}
                <h2 className="text-white text-2xl md:text-3xl font-bold mb-10 md:mb-16">
                    <span className="text-orange-500">{t('highlight')}</span> {t('title')}
                </h2>

                {/* Mobile View: Stats List + Globe Image */}
                <div className="md:hidden flex flex-col gap-4 mb-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-[#151545]/50 border border-white/5 rounded-xl p-4 flex items-center gap-6 text-left relative overflow-hidden group">
                            <div className="text-orange-500 text-xl font-bold min-w-[60px] drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                                {stat.value}
                            </div>
                            <p className="text-white text-sm font-light leading-snug">
                                {stat.text}
                            </p>
                        </div>
                    ))}

                    <div className="relative w-full aspect-square mt-8">
                        <Image
                            src="/assets/images/crypto/globe-image.png"
                            alt="UAE Investment Hub" title="UAE Investment Hub"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Desktop View: Main Globe Image */}
                <div className="hidden md:block relative w-full max-w-7xl mx-auto aspect-[16/9] md:aspect-[21/9] h-[500px] md:h-[900px]">
                    <Image
                        src="/assets/images/crypto/globe-info-image.png"
                        alt="UAE Investment Hub Stats" title='UAE Investment Hub Stats'
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>
        </section>
    );
};

export default UAEHubSection;
