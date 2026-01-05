"use client";
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const HeroSection = () => {
    const t = useTranslations('CryptoPage.hero');

    return (
        <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden bg-[#090953] text-white">
            {/* Background Image Placeholder - to be replaced with actual image */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A2E] to-transparent z-10" />
            <div className="absolute inset-0 z-10">
                <Image
                    src="/assets/images/crypto/bg-header.webp"
                    alt="Crypto Hero"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-20 h-full flex flex-col justify-center">
                <div className="max-w-2xl">
                    <h1 className="text-xl md:text-2xl font-light mb-2">{t('title.part1')}  <span className='font-semibold'>{t('title.part2')}</span> {t('title.part3')}</h1>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-light">
                        <span className='text-[#E46027]'>{t('subtitle.part1')}</span> <span className='font-semibold '>{t('subtitle.part2')}</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
                        {t('description')}
                    </p>
                    <button className="bg-[#E46027] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                        {t('cta')}
                    </button>
                </div>
            </div>

            {/* Decorative Bitcoin coins would go here as absolute positioned elements */}
        </section>
    );
};

export default HeroSection;
