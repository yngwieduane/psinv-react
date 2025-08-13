'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRef } from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import styles from '../_components/LocationSlider.module.css';
import { AudreyNormal } from "@/utils/fonts";
import type { NavigationOptions } from 'swiper/types';


type Slide = {
  image: string;
  title: string;
  subtitle: string;
  content: string;
};

type Props = {
  slides: Slide[];
  openModal: () => void;
};

const LocationsSlider:React.FC<Props> = ({ slides, openModal }) => {
  const navigationPrevRef = useRef<HTMLDivElement | null>(null);
  const navigationNextRef = useRef<HTMLDivElement | null>(null);

  const navigationConfig: NavigationOptions = {
    prevEl: navigationPrevRef.current,
    nextEl: navigationNextRef.current,
    };


  return (
    <div className="w-full overflow-x-clip relative transition-all duration-500 pb-30">
      {/* Custom Navigation Buttons */}
      <div
        ref={navigationPrevRef}
        className="absolute z-10 bottom-0 right-[calc(50%+10px)] bg-transparent p-5 border border-[#ed9c4b] rounded-full cursor-pointer"
      >
        <FaArrowLeft color="#fff" size={20} />
      </div>

      <div
        ref={navigationNextRef}
        className="absolute z-10 bottom-0 left-[calc(50%+10px)] bg-transparent border border-[#ed9c4b]  p-5 rounded-full cursor-pointer"
      >
        <FaArrowRight color="#fff" size={20} />
      </div>

      <Swiper
        modules={[Navigation]}
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

        breakpoints={{
          576: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1.8,
          },
          992: {
            slidesPerView: 2.5,
          },
          1200: {
            slidesPerView: 3.5,
          },
        }}
        autoplay={false}
        centeredSlides={false}
        loop={true}
        spaceBetween={30}
        className={`pl-5 md:pl-10 md:pr-0 px-5 ${styles.locSlider}`}
      >
        {slides?.map((slide, index) => (
          <SwiperSlide key={index} className="w-full">
            <div className="w-full text-white flex flex-col pb-5">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full max-w-[294px] md:max-w-full mb-5"
              />
              <div className="w-full flex flex-col">
                <h3
                  className={`uppercase ${AudreyNormal.className} text-2xl md:text-4xl mb-3 h-[80px]`}
                >
                  {slide.title}
                </h3>
                <h5 className="text-lg md:text-xl mb-5">{slide.subtitle}</h5>
                <p className="text-base md:text-xl break-words whitespace-normal max-w-full">
                  {slide.content}
                </p>
                <div className="md:w-auto w-full flex md:justify-start justify-end mt-8">
                  <button onClick={openModal}
                    className={`${AudreyNormal.className} cursor-pointer 
                      relative uppercase lg:text-lg text-sm p-9 hover:text-black place-self-end
                      after:content-[''] after:absolute lg:after:w-[190px] after:w-[170px] lg:after:h-[100px] after:h-[80px] 
                      after:border after:border-[#ED9C4B] after:inset-0 after:rounded-[50%] 
                      after:transition after:duration-300 after:rotate-[335deg]
                      hover:after:bg-[#ED9C4B]`}
                  >
                    <span className="relative z-10">Inquire Now</span>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LocationsSlider;
