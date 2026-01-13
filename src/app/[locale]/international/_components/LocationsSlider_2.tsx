'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRef } from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import { AudreyNormal } from "@/utils/fonts";
import type { NavigationOptions } from 'swiper/types';

type Slide = {
  image: string,
  location: string,
  value: string,
  tax: string,
};

type Props = {
  slides: Slide[];
};

import { useTranslations } from 'next-intl';

const LocationsSlider_2 = ({ slides }: Props) => {
  const t = useTranslations('InternationalPage.roi_comparison_section');
  const navigationPrevRef = useRef<HTMLDivElement | null>(null);
  const navigationNextRef = useRef<HTMLDivElement | null>(null);

  const navigationConfig: NavigationOptions = {
    prevEl: navigationPrevRef.current,
    nextEl: navigationNextRef.current,
  };


  return (
    <div className="w-full relative transition-all duration-500 md:pb-30 pb-5">
      <div className="flex w-full justify-between">
        <div className="w-full md:block flex justify-center gap-10 absolute md:bottom-0 bottom-20">
          {/* Custom Navigation Buttons */}
          <div ref={navigationPrevRef}
            className="md:absolute z-10 md:bottom-0 md:right-[calc(20%+10px)] bg-transparent p-5 border border-[#ed9c4b] rounded-full cursor-pointer"
          >
            <FaArrowLeft color="#fff" size={20} />
          </div>
          <div ref={navigationNextRef}
            className="md:absolute z-10 md:bottom-0 md:right-[calc(10%+10px)] bg-transparent border border-[#ed9c4b]  p-5 rounded-full cursor-pointer"
          >
            <FaArrowRight color="#fff" size={20} />
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={navigationConfig}
        onSwiper={(swiper) => {
          setTimeout(() => {
            if (
              navigationPrevRef.current &&
              navigationNextRef.current &&
              swiper.params.navigation &&
              swiper.navigation &&
              typeof swiper.params.navigation !== 'boolean'
            ) {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.9,
            spaceBetween: 30,
          },
        }}
        speed={800}
        rewind={false}
        allowTouchMove={true}
        centeredSlides={false}
        spaceBetween={30}
        freeMode={true}
        grabCursor={true}
        className={``}

      >
        {slides?.map((slide, index) => (
          <SwiperSlide key={index} className="w-full">
            <div className="w-full text-white flex flex-col md:pb-5 pb-0 md:text-center relative">
              <div className="relative w-full ">
                <img src={slide.image} alt={slide.location} className="w-full max-w-full mb-2 mx-auto" />
                <h3 className="text-2xl absolute bottom-[20px] right-0 left-0 font-light md:block hidden">{slide.location}</h3>
              </div>
              <div className="md:relative absolute bottom-0 md:left-0 left-3 md:mb-0 mb-2">
                <h3 className="text-3xl font-light md:hidden block">{slide.location}</h3>
                <h5 className={`text-5xl md:text-4xl ${AudreyNormal.className} my-0`}>{slide.value}</h5>
                <p className="text-2xl font-light my-0">{t('tax_label')} {slide.tax} </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="md:absolute md:bottom-0 md:left-0 md:mt-0 mt-35">
        <p className={`${AudreyNormal.className} uppercase md:text-xl text-md text-white relative flex items-center
            after:content-[''] after:absolute after:md:left-[calc(100%+20px)] after:left-[120px] 
            md:after:w-[200px] after:w-[70px] after:h-[1px] after:bg-white`}>{t('slide_right')}</p>
      </div>
    </div>
  );
};

export default LocationsSlider_2;
