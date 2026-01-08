"use client";
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const StatsSection = () => {
    const t = useTranslations('CryptoPage.stats');

    const stats = [
        { key: 'stat1', icon: '/assets/images/crypto/political-stability-icon.svg', bg: '/assets/images/crypto/simple-icon-1.png' },
        { key: 'stat2', icon: '/assets/images/crypto/economical-haven-icon.svg', bg: '/assets/images/crypto/simple-icon-2.png' },
        { key: 'stat3', icon: '/assets/images/crypto/cultural-melting-pot-icon.svg', bg: '/assets/images/crypto/simple-icon-3.png' },
    ];

    return (
        <section className="py-10 bg-[#090953]">
            <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {stats.map(({ key, icon: Icon, bg: Bg }, index) => (
                        <div key={key} style={{ backgroundImage: `url(${Bg})` }} className={`bg-cover bg-no-repeat bg-center p-0 rounded-xl border border-[#2a2a5e] hover:border-amber-500 transition-colors duration-300 ${index === 2 ? 'col-span-2 md:col-span-1 w-[50%] md:w-full mx-auto' : ''}`}>
                            <div className='w-full h-full flex flex-col items-center text-center p-6 backdrop-blur-2xl rounded-xl' style={{ background: 'linear-gradient(179.77deg, rgba(255, 255, 255, 0.03) -29.97%, rgba(255, 255, 255, 0) 99.8%)' }}>
                                <Image src={Icon} alt={key} width={48} height={48} />
                                <h3 className="text-white font-medium text-lg mt-5">
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
