"use client";

import { useTranslations } from 'next-intl';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MoveRight } from 'lucide-react';

const InvestmentJourneySection = ({ onOpenModal }: { onOpenModal?: () => void }) => {
    const t = useTranslations('CryptoPage.investment_journey');

    return (
        <section className="bg-[#090953] py-20 relative overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">

                {/* Text Content */}
                <div className="w-full md:w-1/2 z-10 relative">
                    {/* PSI Logo (White) */}
                    <div className="mb-6 md:mb-8 relative w-20 h-10 md:w-24 md:h-12">
                        <Image
                            src="/logo-psi-white.svg"
                            alt="PSI"
                            fill
                            className="object-contain object-left"
                        />
                    </div>

                    <p className="text-white text-base md:text-xl leading-relaxed mb-4 md:mb-6 font-light opacity-90">
                        {t('text')}
                    </p>

                    <h2 className="text-white text-xl md:text-3xl font-bold uppercase mb-6 md:mb-8 leading-snug">
                        {t('highlight')}
                    </h2>

                    <button onClick={onOpenModal} className="inline-flex items-center text-green-400 hover:text-green-300 font-medium transition-colors group cursor-pointer mb-2">
                        {t('read_more')}
                        <MoveRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Image Content */}
                <div className="w-full md:w-1/2 relative h-[250px] md:h-[500px]">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                            src="/assets/images/crypto/bitcoin-image.png"
                            alt="Investment Journey"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default InvestmentJourneySection;
