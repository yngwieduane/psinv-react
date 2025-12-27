'use client'

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Outfit } from "next/font/google";
import 'swiper/css';
import 'swiper/css/pagination';
import { useLocale, useTranslations } from "next-intl";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});



const AboutAwardsSlider = () => {
  const t = useTranslations("AwardsSectionHome");

  const awards = [
    {
        "title1": t("awards.emaar.title1"),
        "title2": t("awards.emaar.title2"),
        "title3": t("awards.emaar.title3"),
        "image": "emaar-2018.webp",
    },
    {
        "title1": t("awards.aldar2021.title1"),
        "title3": t("awards.aldar2021.title3"),
        "image": "aldar-2021.webp",
    },
    {
        "title1": t("awards.aldar2016.title1"),
        "title2": t("awards.aldar2016.title2"),
        "title3": t("awards.aldar2016.title3"),
        "image": "aldar-2016.jpg",
    },
    {
        "title1": t("awards.aldar2020.title1"),
        "title2": t("awards.aldar2020.title2"),
        "title3": t("awards.aldar2020.title3"),
        "image": "aldar-2022.jpg",
    },
    {
        "title1": t("awards.aldar2022.title1"),
        "title2": t("awards.aldar2022.title2"),
        "title3": t("awards.aldar2022.title3"),
        "image": "aldar-2022.jpg",
    },
    {
        "title1": t("awards.imkan.title1"),
        "title2": t("awards.imkan.title2"),
        "title3": t("awards.imkan.title3"),
        "image": "imkan-2021.webp",
    }
  ];

  const swiperElRef = useRef<any>(null);
  const paginationId = useRef(`awards-pagination-${Math.random().toString(36).substring(2, 9)}`).current;

  useEffect(() => {
    // Wait for DOM and CSS to settle
    const timer = setTimeout(() => {
      if (swiperElRef.current) {
        swiperElRef.current.update();           // recalc slides
        swiperElRef.current.autoplay?.start();  // force autoplay start
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {awards?.length > 0 && (
        <Swiper
          breakpoints={{
            576: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            992: { slidesPerView: 4, spaceBetween: 30 },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: false,
            el: `#${paginationId}`,
          }}
          loop={true}
          observer={true}
          observeParents={true}
          modules={[Autoplay, Pagination]}
          onSwiper={(swiper: any) => {
            swiperElRef.current = swiper;
            swiper.autoplay?.start(); // start autoplay immediately on init
          }}
          className="home-awards-slider relative"
        >
          {awards.map((slide: any, index: number) => (
            <SwiperSlide key={index}>
              <div className={`w-full text-center pb-5 md:pb-3 md:mb-5 ${outfit.className} hover:shadow-xl transition-shadow duration-300 rounded-xl`}>
                <div className="h-60 md:h-48 flex items-center justify-center mb-6 w-full">
                  <img
                    src={`/assets/images/about-us/awards/${slide.image}`}
                    alt={slide.title1}
                    className="h-40 w-auto object-contain mix-blend-multiply transition-transform duration-300 transform hover:scale-110"
                  />
                </div>
                <p className="font-bold text-gray-800 mb-1 text-lg">{slide.title1}</p>
                <p className="font-bold text-gray-800 mb-1 text-lg">{slide.title2}</p>
                <p className="text-xs text-gray-500 uppercase">{slide.title3}</p>
              </div>
            </SwiperSlide>
          ))}
          <div id={paginationId} className="block md:hidden mt-4 flex justify-center"></div>
        </Swiper>
      )}
    </>
  );
};

export default AboutAwardsSlider;
