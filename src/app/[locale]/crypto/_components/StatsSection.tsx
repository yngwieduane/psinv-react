"use client";
import { useTranslations } from 'next-intl';
import { BoltIcon, CurrencyDollarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const StatsSection = () => {
    const t = useTranslations('CryptoPage.stats');

    const stats = [
        { key: 'stat1', icon: BoltIcon, bg: '/assets/images/crypto/simple-icon-1.png' },
        { key: 'stat2', icon: CurrencyDollarIcon, bg: '/assets/images/crypto/simple-icon-2.png' },
        { key: 'stat3', icon: ShieldCheckIcon, bg: '/assets/images/crypto/simple-icon-3.png' },
    ];

    return (
        <section className="py-10 bg-[#090953]">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map(({ key, icon: Icon, bg: Bg }) => (
                        <div key={key} className="bg-gradient-to-br from-[#161644] to-[#2a2a5e] p-0 rounded-xl border border-[#2a2a5e] hover:border-amber-500 transition-colors duration-300">
                            <div className={`w-full h-full bg-[url(${Bg})] bg-cover bg-no-repeat bg-center p-6 flex flex-col items-center text-center`}>
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 text-white p-3">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-white font-medium text-lg">
                                    {t(key)}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
