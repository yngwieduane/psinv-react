'use client'

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import {
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import 'swiper/css';
import Modals from "./tools/Modals";

const SwiperSlider = (props: any) => {
  const swiperElRef2 = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(1);

    const [setModal, setSetModal] = useState(false);
    const modalHandler = (event:any) => {
        console.log("clicked = " + setModal);
        setSetModal(true);
    };

    const modalUpdate = (event:any) => {
      console.log(event);
      setSetModal(event);
    };
  return (
    <div className="relative">
      <div className="absolute end-0 bottom-0 grid grid-cols-3">
        <div className="swiper-pagination relative z-10 bg-white py-3 px-4">
          <span className="swiper-pagination-current font-bold text-xl">{currentSlide} </span>/
          <span className="swiper-pagination-total"> {props.slides.length}</span>
        </div>
        <button onClick={() => swiperElRef2.current?.slidePrev()} className="review-swiper-button-prev1 z-10 p-2 right-0 relative text-white bg-orange-600 hover:bg-orange-500">
          <ChevronLeftIcon className="w-10 h-10" />
        </button>
        <button onClick={() => swiperElRef2.current?.slideNext()} className="review-swiper-button-next1 z-10 p-2 right-0 relative text-white bg-orange-600 hover:bg-orange-500">
          <ChevronRightIcon className="w-10 h-10" />
        </button>
      </div>
      <Swiper
        navigation
        pagination={{
          type: 'fraction',
          el: ".swiper-pagination",
          renderFraction: (currentClass, totalClass) => {
            return '<span class="' + currentClass + '"></span>' +
              ' / ' +
              '<span class="' + totalClass + '"></span>'
          }
        }}
        modules={[Navigation,Pagination]}
        spaceBetween={50}
        slidesPerView={props.slidePerView}
        onSlideChange={(swiper: any) => setCurrentSlide(swiper.realIndex + 1)}
        onSwiper={(swiper: any) => (swiperElRef2.current = swiper)}
        className="h-180"
        >
        {props.slides.map((slide:any, index:any) => (
          <SwiperSlide
            key={index}
            className="bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="bg-linear-to-r from-blue-950 from-10% to-transparent to-70% h-full">
              <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 h-full items-center text-center md:text-start">
                <div className="px-4 md:px-auto">
                 <img
                    className="w-[100px] h-auto mb-5 mx-auto md:mx-0"
                    src={slide.developer_img}
                    alt="Developer"
                  />
                  <h2 className="flex items-center gap-2 text-3xl font-thin text-white mb-4 justify-center md:justify-start">
                    <MapPinIcon className="bg-red-600 h-10 w-10 text-white p-2 rounded-full" />
                    {slide.location}
                  </h2>
                  <h1 className="text-white text-4xl md:text-5xl font-medium">
                    {slide.title}
                  </h1>
                  <p className="text-white text-xl my-8 md:text-2xl">
                    {slide.description}
                  </p>
                  <button 
                      onClick={modalHandler}
                      className="rounded-md bg-orange-600 px-5 py-2.5 text-2xl font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Sign Up
                  </button>
                  <Link href="#" className="px-5 py-2.5 text-white text-2xl font-semibold hover:text-gray-400">
                      Learn More <ChevronRightIcon className="w-7 inline-flex" />
                  </Link>
                </div>
                <div className=""></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Modals modalState={setModal} onModalUpdate={modalUpdate} />
    </div>
  );
};

export default SwiperSlider;