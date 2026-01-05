"use client";
import { useTranslations } from 'next-intl';
import { ShieldCheckIcon, ClockIcon, BanknotesIcon } from '@heroicons/react/24/outline';

const CryptoOfferSection = () => {
    const t = useTranslations('CryptoPage.offer');

    return (
        <section className="py-16 bg-[#0A0A2E] text-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    <div className="lg:w-1/2 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#161644] p-6 rounded-xl border border-[#2a2a5e] text-center">
                                <ShieldCheckIcon className="w-10 h-10 text-green-500 mx-auto mb-3" />
                                <h3 className="font-bold">{t('secure')}</h3>
                            </div>
                            <div className="bg-[#161644] p-6 rounded-xl border border-[#2a2a5e] text-center">
                                <ClockIcon className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                                <h3 className="font-bold">{t('fast')}</h3>
                            </div>
                            <div className="bg-[#161644] p-6 rounded-xl border border-[#2a2a5e] text-center col-span-2 md:col-span-1 md:col-start-2">
                                <BanknotesIcon className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                                <h3 className="font-bold">{t('tax')}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 text-center lg:text-left">
                            <h3 className="text-xl text-gray-400 mb-2">{t('subtitle')}</h3>
                            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-600 bg-clip-text text-transparent">
                                {t('title')}
                            </h2>
                            {/* Key Visual Image Placeholder */}
                            <div className="mt-8 relative h-[300px] w-full flex justify-center lg:justify-start">
                                {/* <img src="/assets/images/crypto/key-visual.png" alt="Bitcoin Key" className="h-full object-contain drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]" /> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CryptoOfferSection;
