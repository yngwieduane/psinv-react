"use client";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const HeroSection = ({ onOpenModal }: { onOpenModal: () => void }) => {
    const t = useTranslations('CryptoPage.hero');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden bg-[#090953] text-white">
            {/* Background Image Placeholder - to be replaced with actual image */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A2E] to-transparent z-10" />
            <div className="absolute inset-0 z-10">
                {isMobile ? (
                    <Image
                        src={`/assets/images/crypto/bg-mobile.webp`}
                        alt="Crypto Hero" title='Crypto Hero'
                        fill
                        className="object-cover"
                    />
                ) : (
                    <Image
                        src={`/assets/images/crypto/bg-header.webp`}
                        alt="Crypto Hero" title='Crypto Hero'
                        fill
                        className="object-cover"
                    />
                )}
            </div>

            <div className="container md:text-start text-center mx-auto px-3 md:px-12 relative z-20 h-full flex flex-col md:justify-center md:pt-0 pt-30">
                <div className="max-w-2xl">
                    <h1 className="text-lg md:text-2xl font-light mb-2">{t('title.part1')}  <span className='font-semibold'>{t('title.part2')}</span> {t('title.part3')}</h1>
                    <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight text-light">
                        <span className='text-[#E46027]'>{t('subtitle.part1')}</span> <span className='font-semibold '>{t('subtitle.part2')}</span>
                    </h2>
                    <p className="text-md md:text-xl text-gray-200 mb-4 md:mb-8 max-w-lg">
                        {t('description')}
                    </p>
                    <button onClick={onOpenModal} className="text-sm md:text-xl bg-[#E46027] text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                        {t('cta')}
                    </button>
                </div>
            </div>

            {/* Decorative Bitcoin coins would go here as absolute positioned elements */}
        </section>
    );
};

export default HeroSection;
