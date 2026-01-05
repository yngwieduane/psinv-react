"use client";
import { useTranslations } from 'next-intl';

const RealEstateFoundations = () => {
    const t = useTranslations('CryptoPage.foundations');

    const cards = ['card1', 'card2', 'card3'];

    return (
        <section className="py-20 bg-[#0A0A2E] text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-8">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
                        <p className="text-gray-400">{t('desc')}</p>
                    </div>
                    <button className="hidden md:block bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all px-6 py-2 rounded-lg mt-4 md:mt-0">
                        {t('cta')}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <div key={card} className="bg-[#11113a] p-8 rounded-xl border-l-4 border-amber-500 hover:bg-[#1a1a51] transition-colors">
                            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6 text-amber-500">
                                {/* Icon placeholder */}
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4">{t(`${card}.title`)}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {t(`${card}.desc`)}
                            </p>
                        </div>
                    ))}
                </div>
                <button className="md:hidden w-full mt-8 bg-transparent border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-all px-6 py-3 rounded-lg">
                    {t('cta')}
                </button>
            </div>
        </section>
    );
};

export default RealEstateFoundations;
