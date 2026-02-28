'use client'

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Outfit } from "next/font/google";
import 'swiper/css';
import 'swiper/css/pagination';
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});



const AboutAwardsSlider = () => {
  const t = useTranslations("AwardsSectionHome");

  const awards = [
    {
      "title1": t("awards.aldar.title1"),
      "title3": t("awards.aldar.title3"),
      "image": "aldar-2022.jpg",
    },
    {
      "title1": t("awards.rak.title1"),
      "title3": t("awards.rak.title3"),
      "image": "rak-properties-2025.webp?ver=6",
    },
    {
      "title1": t("awards.emaar.title1"),
      "title3": t("awards.emaar.title3"),
      "image": "emaar-awards-2025-2nd.webp",
    },
    {
      "title1": t("awards.modon.title1"),
      "title3": t("awards.modon.title3"),
      "image": "modon-2023-2025.webp",
    },
    {
      "title1": t("awards.emaarh1.title1"),
      "title3": t("awards.emaarh1.title3"),
      "image": "emaar-h1-2025.webp?ver=3",
    },
    {
      "title1": t("awards.bloom.title1"),
      "title3": t("awards.bloom.title3"),
      "image": "bloom-top-2024.webp",
    },
    {
      "title1": t("awards.rak2024.title1"),
      "title3": t("awards.rak2024.title3"),
      "image": "rak-rank-3-2024.webp",
    },
    {
      "title1": t("awards.damac.title1"),
      "title3": t("awards.damac.title3"),
      "image": "damac-top-2024.webp?ver=2",
    },
    {
      "title1": t("awards.imkan.title1"),
      "title3": t("awards.imkan.title3"),
      "image": "imkan-award-2024.webp?ver=2",
    },
    {
      "title1": t("awards.binghatti.title1"),
      "title3": t("awards.binghatti.title3"),
      "image": "binghatti-2024.webp",
    },
    {
      "title1": t("awards.deyaar.title1"),
      "title3": t("awards.deyaar.title3"),
      "image": "deyaar-2024.webp?ver=6",
    },
    {
      "title1": t("awards.darglobal.title1"),
      "title3": t("awards.darglobal.title3"),
      "image": "darglobal-2023.webp?ver=2",
    },
    {
      "title1": t("awards.bloom2022.title1"),
      "title3": t("awards.bloom2022.title3"),
      "image": "bloom-2022.webp",
    },
    {
      "title1": t("awards.arada.title1"),
      "title3": t("awards.arada.title3"),
      "image": "arada-2022-img.webp?ver=4",
    },
    {
      "title1": t("awards.bloom2.title1"),
      "title3": t("awards.bloom2.title3"),
      "image": "bloom-awards-2022.webp?ver=2",
    },
    {
      "title1": t("awards.imkan2021.title1"),
      "title3": t("awards.imkan2021.title3"),
      "image": "imkan-2021.webp",
    },
    {
      "title1": t("awards.aldar2021.title1"),
      "title3": t("awards.aldar2021.title3"),
      "image": "aldar-2021.webp",
    },
    {
      "title1": t("awards.emaar2018.title1"),
      "title3": t("awards.emaar2018.title3"),
      "image": "emaar-2018.webp",
    },
    {
      "title1": t("awards.aldar2018.title1"),
      "title3": t("awards.aldar2018.title3"),
      "image": "aldar-2018.webp?ver=3",
    },
    {
      "title1": t("awards.bloom2017.title1"),
      "title3": t("awards.bloom2017.title3"),
      "image": "bloom-2017.webp?ver=3",
    },
    {
      "title1": t("awards.finder.title1"),
      "title3": t("awards.finder.title3"),
      "image": "property-finder-2016.webp?ver=2",
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
                <div className="h-60 md:h-40 flex items-center justify-center mb-6 w-full">
                  <Image
                    src={`/assets/images/about-us/awards/${slide.image}`}
                    alt={slide.title1 || 'Award'}
                    title={slide.title1}
                    width={250}      // adjust as needed
                    height={200}     // keeps aspect ratio
                    className="object-contain mix-blend-multiply transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <p className="font-bold text-gray-800 mb-1 text-lg dark:text-white">{slide.title1}</p>
                <p className="font-bold text-gray-800 mb-1 text-lg dark:text-white">{slide.title2}</p>
                <p className="text-xs text-gray-500 uppercase dark:text-white">{slide.title3}</p>
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
