"use client";
import { useTranslations } from 'next-intl';

const WhyInvestMap = () => {
    const t = useTranslations('CryptoPage.why_invest');

    return (
        <section className="py-20 bg-[#0A0A2E] text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-4xl font-bold mb-12 max-w-4xl mx-auto leading-normal">
                    <span className="text-amber-500">UAE</span> {t('title').replace('UAE', '')}
                </h2>
                <div className="relative w-full h-[400px] md:h-[600px] bg-[#11113a] rounded-3xl overflow-hidden flex items-center justify-center border border-gray-800 shadow-2xl">
                    {/* Map Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        {/* <img src="/assets/images/crypto/world-map.png" alt="World Map" className="w-full h-full object-contain" /> */}
                    </div>

                    {/* Highlighted UAE Node */}
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full bg-blue-500/20 animate-pulse absolute -z-10 blur-xl" />
                        <div className="w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_20px_#f59e0b]" />
                        <span className="mt-4 font-bold text-lg tracking-widest">UAE</span>
                    </div>

                    {/* Decorative connecting lines/nodes could go here */}
                </div>
            </div>
        </section>
    );
};

export default WhyInvestMap;
