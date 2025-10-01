'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./SwiperNormal.css";
interface SwiperProps {
    slides: any
    width: string
    height: string
}

export default function SwiperNormal({ slides, width = '300', height = '300' }: SwiperProps) {
  const swiperParameters = {
    modules: [A11y, Keyboard, Navigation, Pagination],
    grabCursor: true,
    navigation: false,
    pagination: true,
    keyboard: { enabled: true },
    lazy: "true",
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,
  };
  return (
    <>
      <Swiper {...swiperParameters} className="swipernormal">
        {slides?.map((slide:any, index:any) => {
            let imagecontent = slide.split('?');
            return (
                <SwiperSlide className="swiper-slide-4ffe bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${imagecontent[0]}?width=${width}&height=${height})` }}>
                <div className="swiper-slide-content swiper-slide-content-2f5e">
                    <div className="swiper-slide-text swiper-slide-text-78dc">
                    </div>
                </div>
                </SwiperSlide>
            )
        })}
      </Swiper>
    </>
  );
}