'use client';
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import "swiper/css";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CitiesTabSliderMain(props: any) {
  const locale = useLocale();
  const swiperElRef3 = useRef<any>(null);

  return (
    <div className="relative">
      {/* Navigation buttons */}
      <div className="absolute inset-y-0 left-3 right-3 flex justify-between items-center z-10">
        <button
          aria-label="Previous Slide"
          onClick={() => swiperElRef3.current?.slidePrev()}
          className="z-10 p-3 text-white/80 hover:text-white transition-colors border border-white/50 hover:border-white rounded-full"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          aria-label="Next Slide"
          onClick={() => swiperElRef3.current?.slideNext()}
          className="z-10 p-3 text-white/80 hover:text-white transition-colors border border-white/50 hover:border-white rounded-full"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Swiper */}
      <Swiper
        spaceBetween={30}
        simulateTouch={true}
        modules={[Navigation, Pagination]}
        onSwiper={(swiper: any) => (swiperElRef3.current = swiper)}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 16 },
          768: { slidesPerView: 2, spaceBetween: 16 },
          1024: {
            slidesPerView: props.slidePerView || 4,
            spaceBetween: 16,
          },
        }}
        navigation={false}
        className="!overflow-visible"
      >
        {props.slides.map((project: any, index: number) => (
          <SwiperSlide key={index}>
            {/* make sure slide itself has height */}
            <div className="relative min-h-[320px] rounded-lg overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

              <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <h3 className="text-2xl font-serif font-bold mb-1">
                  {project.title}
                </h3>
                <p className="text-lg font-light">{project.type}</p>
                <div className="h-0.5 w-0 bg-secondary mt-4 transition-all duration-500 group-hover:w-16" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default CitiesTabSliderMain;
