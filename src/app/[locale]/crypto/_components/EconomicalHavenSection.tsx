"use client";

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import TextModal from './TextModal';
import { Button } from '@headlessui/react';
import TextShortner from '../../_components/tools/TextShortner';

const EconomicalHavenSection = () => {
    const t = useTranslations('CryptoPage.economical_haven');
    const locale = useLocale();
    const isRtl = locale.toLowerCase().startsWith("ar");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSlide, setSelectedSlide] = useState<any>(null);

    const slides = [
        { key: 'slide1', img: '/assets/images/crypto/economical-haven-1.png' },
        { key: 'slide2', img: '/assets/images/crypto/economical-haven-2.png' },
        { key: 'slide3', img: '/assets/images/crypto/economical-haven-3.png' },
        { key: 'slide4', img: '/assets/images/crypto/economical-haven-4.jpg' },
        { key: 'slide5', img: '/assets/images/crypto/economical-haven-5.jpg' },
        { key: 'slide6', img: '/assets/images/crypto/economical-haven-6.jpg' },
        { key: 'slide7', img: '/assets/images/crypto/economical-haven-7.jpg' },
    ];

    const handleModal = (slide: any) => {
        setSelectedSlide(slide);
        setIsModalOpen(true);
    }
    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedSlide(null);
    }

    return (
        <>
            <section className="bg-[#090953] pb-20 relative" dir={isRtl ? "rtl" : "ltr"}>
                <div className="container mx-auto px-6 md:px-12">
                    {/* Header with Navigation Buttons */}
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-white text-2xl md:text-3xl font-bold">
                            {t('title')}
                        </h2>
                        {/* Custom Navigation Buttons */}
                        <div className="flex gap-2">
                            <button className="cursor-pointer swiper-button-prev-custom w-10 h-10 rounded-full bg-[#1A1A4A] hover:bg-[#23235B] flex items-center justify-center text-white transition-colors">
                                <ChevronRight className={`w-5 h-5 ${!isRtl ? "rotate-180" : ""}`} />
                            </button>
                            <button className="cursor-pointer swiper-button-next-custom w-10 h-10 rounded-full bg-[#e46027] hover:bg-[#e46027] flex items-center justify-center text-white transition-colors">
                                <ChevronRight className={`w-5 h-5 ${isRtl ? "rotate-180" : " "}`} />
                            </button>
                        </div>
                    </div>

                    {/* Slider */}
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={24}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        className="w-full"
                    >
                        {slides.map((slide) => (
                            <SwiperSlide key={slide.key} className="h-auto">
                                <div className="flex flex-col h-full">

                                    {/* Image Card */}
                                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                                        {/* Placeholder styling if image fails (since users proceed without images) */}
                                        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center text-gray-500">
                                            <Image
                                                src={slide.img}
                                                alt={t(`slides.${slide.key}.text`)} title={t(`slides.${slide.key}.text`)}
                                                fill
                                                className="object-cover"
                                                onError={(e) => {
                                                    // Fallback to avoid broken image icon if possible, or just leave as is
                                                    // Next/image doesn't support onError directly on server component render but good for client
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none'; // Hide if broken to show gray placeholder
                                                }}
                                            />
                                        </div>
                                        <Image
                                            src={slide.img}
                                            alt={t(`slides.${slide.key}.text`)} title={t(`slides.${slide.key}.text`)}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    {/* Text Content */}
                                    <div className="mb-4 flex-grow">
                                        <span className="text-white text-base leading-relaxed mt-4 min-h-[80px] mb-4">
                                            <TextShortner text={t(`slides.${slide.key}.text`)} charLimit={110} classes={`text-lg font-lighter`} />
                                        </span>
                                        <Button
                                            onClick={() => handleModal(slide)}
                                            className="inline-flex items-center text-[#4ADE80] text-lg font-medium hover:text-[#22c55e] transition-colors"
                                        >
                                            <ArrowRight className={`w-4 h-4 mr-1 ${isRtl ? "rotate-180" : ""}`} />
                                            {t('read_more')}
                                        </Button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {isModalOpen && selectedSlide && (
                <TextModal
                    modalState={isModalOpen}
                    onModalUpdate={handleModalClose}
                    text={t(`slides.${selectedSlide.key}.text`)}
                    image={selectedSlide.img}
                />
            )}

        </>
    );
};

export default EconomicalHavenSection;
