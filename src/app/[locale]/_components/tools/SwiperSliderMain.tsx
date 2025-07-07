'use client'
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import 'swiper/css';
import Link from 'next/link';
import { useLocale } from 'next-intl';

function SwiperSliderMain(props:any) {
  const locale = useLocale();
  const swiperElRef3 = useRef<any>(null);
  return (
    <div className="relative">
      <div className="absolute start-0 end-0 top-1/2 flex justify-between px-5">
        <button onClick={() => swiperElRef3.current?.slidePrev()} className="review-swiper-button-prev-main z-10 w-12 h-12 left-0 relative text-white text-start">
          <ChevronLeftIcon className="w-12 h-12 rounded-full bg-blue-950 opacity-80 p-3" /></button>
        <button onClick={() => swiperElRef3.current?.slideNext()} className="review-swiper-button-next-main z-10 w-12 h-12 right-0 relative text-white text-right">
          <ChevronRightIcon className="w-12 h-12 rounded-full bg-blue-950 opacity-80 p-3" /></button>
      </div>
      <Swiper
        spaceBetween="30"
        modules={[Navigation,Pagination]}
        onSlideChange={() => console.log(swiperElRef3)}
        onSwiper={(swiper: any) => (swiperElRef3.current = swiper)}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: props.slidePerView,
            spaceBetween: 16,
          },
        }}
        navigation
      >
        {props.slides.map((project:any,index:any) => (
          <SwiperSlide
            key={index}
            className="bg-no-repeat bg-cover bg-center relative w-8 rounded-lg"
            style={{ backgroundImage: `url(${project.image})` }}
          >
            <Link href={`/${locale}${project.project_url || ''}`}>
            <div className="bg-gradient-to-t from-blue-950 h-96 rounded-lg">
              <div className="absolute bottom-0 px-5">
                <h2 className="flex items-center gap-2 text-3xl font-thin text-white mb-4 justify-center md:justify-start">
                  {project.title}
                </h2>
                <h3 className="flex items-center gap-2 text-l font-thin text-white mb-4 justify-center md:justify-start">
                  {project.type}
                </h3>
              </div>
            </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperSliderMain;
