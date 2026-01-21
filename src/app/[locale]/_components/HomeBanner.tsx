'use client'

import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, ChevronLeft, MapPin, ChevronLeftIcon } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import "./SwiperSliderHome.css";
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import BannerModals from './HomeBannerModal';
import Image from 'next/image';
import { Outfit } from 'next/font/google';
import { useLocale, useTranslations } from 'next-intl';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const HomeBanner = (props: any) => {
  const totalSlides = props.slides.length;
  const locale = useLocale();
  const t = useTranslations("HomePageBanner");
  const isRTL = locale.toLowerCase().startsWith("ar");

  const L = (en: string, ar?: string) => (isRTL && ar ? ar : en);

  const handlePrev = () => {
    if (swiperElRef2.current) {
      swiperElRef2.current.slidePrev();
    }
  }

  const handleNext = () => {
    if (swiperElRef2.current) {
      swiperElRef2.current.slideNext();
    }
  }

  const swiperElRef2 = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  // Detect screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen, { passive: true });
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const [setModal, setSetModal] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<any>(null);

  const modalHandler = (slide: any) => {
    //console.log("clicked = " + setModal);
    setSetModal(true);
    setSelectedSlide(slide);
  };

  const modalUpdate = (event: any) => {
    setSetModal(event);
  };

  return (
    <section className="relative h-auto w-full overflow-hidden" dir={isRTL ? 'rtl' : "ltr"}>
      <Swiper
        ref={swiperElRef2}
        navigation={false}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
        onSwiper={(swiper: any) => (swiperElRef2.current = swiper)}
        loop={false}
        className="home-banner-swiper h-[920px] md:h-[840px]"
      >
        {props.slides.map((slide: any, index: number) => (
          <SwiperSlide
            key={index}
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.title || "Banner"} title={slide.title || "Banner"}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                {...(index === 0 && { fetchPriority: "high" })}
                sizes="100vw"
                className={`object-cover object-center ${index === 0 ? 'animate-none' : 'animate-[zoomIn_20s_infinite_alternate]'} will-change-transform`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            </div>

            <div className="relative container mx-auto px-6 md:px-12 h-full flex items-center">
              <div className="max-w-4xl text-white mt-20 md:mt-0">
                {slide.developer_img && (
                  <div
                    className={`mb-5 mx-0 ${slide.name === "loyalty" ? "w-[200px]" : "w-[100px]"
                      } relative aspect-[3/2]`}
                  >
                    <Image
                      className={`object-contain`}
                      fill
                      src={slide.developer_img}
                      alt="Developer"
                      title="Developer" priority={index === 0}
                      sizes="(max-width: 768px) 100px, 200px"
                    />
                  </div>
                )}
                {slide.location && (
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-secondary mb-6 animate-[fadeIn_1s_ease-out]">
                    <>
                      <MapPin size={20} />
                      <span className="uppercase tracking-[0.3em] text-sm font-bold">
                        {slide.location}
                      </span>
                    </>
                  </div>
                )}

                {index === 0 ?
                  slide.title && (
                    <h1 className={`text-5xl md:text-8xl font-serif font-bold mb-6 leading-tight animate-[fadeIn_1.4s_ease-out] ${outfit.className}`}>
                      {slide.title}
                    </h1>
                  )
                  :
                  (
                    <h2 className={`text-5xl md:text-8xl font-serif font-bold mb-6 leading-tight animate-[fadeIn_1.4s_ease-out] ${outfit.className}`}>
                      {slide.title}
                    </h2>
                  )
                }

                {slide.description && (
                  <p className="text-lg md:text-xl mb-10 text-gray-100 leading-relaxed max-w-2xl font-light animate-[fadeIn_1.6s_ease-out]">
                    {slide.description}
                  </p>
                )}

                {slide.loyaltyTitle && (
                  <h2 className="text-4xl md:text-6xl font-serif font-bold mb-2 leading-tight animate-[fadeIn_1.4s_ease-out]">
                    {slide.loyaltyTitle}
                  </h2>
                )}
                {slide.features && (
                  <ul className="list-disc text-white text-xl my-8 md:text-2xl ml-7 leading-normal">
                    {slide.features?.map((item: any, idx: any) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                {slide.name === 'loyalty' && (
                  <Link title="Sign Up" href="https://loyalty-program.psinv.net/" target="_blank" className="cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white md:px-10 px-4 py-4 rounded-none text-sm uppercase tracking-widest font-bold transition-all hover:scale-105 animate-[fadeIn_1.8s_ease-out]">
                    <span className="relative">{t("sign_up_btn")}</span>
                  </Link>
                )}
                {slide.name !== 'loyalty' && (
                  <>
                    <div className='flex gap-4'>
                      <button aria-label="sign_up"
                        onClick={() => modalHandler(slide)}
                        className="cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white md:px-10 px-4 py-4 rounded-none text-sm uppercase tracking-widest font-bold transition-all hover:scale-105 animate-[fadeIn_1.8s_ease-out]">
                        {t("sign_up_btn")}
                      </button>
                      {slide.project_url !== '' && (
                        <Link dir={isRTL ? "rtl" : "ltr"} title="Explore More" href={`${locale}${slide.project_url}`} className="flex items-center bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white md:px-10 px-4 py-4 rounded-none text-sm uppercase tracking-widest font-bold transition-all hover:scale-105 animate-[fadeIn_1.8s_ease-out]">
                          <span>{t("more_btn")}</span>
                          <div className="ml-1 transition group-hover:translate-x-1">
                            {isRTL && (
                              <ChevronLeftIcon className="w-7 inline-flex" />
                            )}
                            {!isRTL && (
                              <ChevronRightIcon className="w-7 inline-flex" />
                            )}

                          </div>
                        </Link>
                      )}

                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Minimalist Slider Controls */}
            <div className={`absolute bottom-12 ${isRTL ? "left-12" : "right-12"} flex items-center gap-6 z-20 hidden md:flex`} dir={isRTL ? "rtl" : "ltr"}>
              {isRTL && (
                <div className="flex gap-2">
                  <button aria-label="next" onClick={handlePrev} className="p-3 text-white/50 hover:text-white transition-colors border border-white/20 hover:border-white rounded-full">
                    <ChevronRight size={20} />
                  </button>
                  <button aria-label="prev" onClick={handleNext} className="p-3 text-white/50 hover:text-white transition-colors border border-white/20 hover:border-white rounded-full">
                    <ChevronLeft size={20} />
                  </button>
                </div>
              )}
              {!isRTL && (
                <div className="flex gap-2">
                  <button aria-label="prev" onClick={handlePrev} className="p-3 text-white/50 hover:text-white transition-colors border border-white/20 hover:border-white rounded-full">
                    <ChevronLeft size={20} />
                  </button>
                  <button aria-label="next" onClick={handleNext} className="p-3 text-white/50 hover:text-white transition-colors border border-white/20 hover:border-white rounded-full">
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
              <div className="h-px w-20 bg-white/30"></div>
              <span className="text-white font-serif text-xl">{currentSlide} / {totalSlides}</span>
            </div>

            <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
            0% { transform: scale(1); }
            100% { transform: scale(1.15); }
        }
      `}</style>
          </SwiperSlide>
        ))}
      </Swiper>
      <BannerModals modalState={setModal} submitLabel={t('submit')} onModalUpdate={modalUpdate} propData={selectedSlide} />
    </section>
  );
};

export default HomeBanner;
