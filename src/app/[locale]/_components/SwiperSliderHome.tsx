'use client'

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Pagination } from 'swiper/modules';
import { BrittanySignature } from "@/utils/fonts";
import 'swiper/css';
import 'swiper/css/pagination';
import {
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import BannerModals from "./HomeBannerModal";
import "./SwiperSliderHome.css";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

const SwiperSlider = (props: any) => {
  const swiperElRef2 = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  // Detect screen size
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const paginationConfig = isMobile
  ? ''
  : {
      type: "fraction" as const,
      el: ".swiper-pagination",
      renderFraction: (currentClass: string, totalClass: string): string => {
        return `<span class="${currentClass}"></span> / <span class="${totalClass}"></span>`;
      },
      clickable: false,
    };

    const [setModal, setSetModal] = useState(false);
    const [selectedSlide, setSelectedSlide] = useState<any>(null);

    const modalHandler = (slide:any) => {
        console.log("clicked = " + setModal);
        setSetModal(true);
        setSelectedSlide(slide);
    };

    const modalUpdate = (event:any) => {
      console.log(event);
      setSetModal(event);
    };

  return (
    <>
    <div className="relative">
      {!isMobile && (
      <div className="absolute bottom-0 right-0 flex items-center">
        {/* Slide counter */}
        <div className="bg-white py-[15px] px-4 z-9">
          <span className="font-bold text-xl">{currentSlide}</span>
          <span className="text-gray-600"> / {props.slides.length}</span>
        </div>

        {/* Prev Button */}
        <button
          onClick={() => swiperElRef2.current?.slidePrev()}
          className="cursor-pointer z-10 px-2 py-[12px] text-white bg-orange-600 hover:bg-orange-500"
          aria-label="Previous Slide"
        >
          <ChevronLeftIcon className="w-8 h-8" />
        </button>

        {/* Next Button */}
        <button
          onClick={() => swiperElRef2.current?.slideNext()}
          className="cursor-pointer z-10 px-2 py-[12px] text-white bg-orange-600 hover:bg-orange-500"
          aria-label="Next Slide"
        >
          <ChevronRightIcon className="w-8 h-8" />
        </button>
      </div>
    )}
      
      <Swiper
        ref={swiperElRef2}
        navigation={false}
        pagination={isMobile ? { clickable: true, el: ".custom-pagination" } : false}
              // pagination={{
        //   type: 'fraction',
        //   el: ".swiper-pagination",
        //   renderFraction: (currentClass, totalClass) => {
        //     return '<span class="' + currentClass + '"></span>' +
        //       ' / ' +
        //       '<span class="' + totalClass + '"></span>'
        //   },
        //   clickable : false,
        // }}
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
        onSwiper={(swiper: any) => (swiperElRef2.current = swiper)}
        breakpoints={{          
          768: {
            pagination: true,
                    
          }
          ,
          1200: {            
           
          },
        }}
        loop = {false}
        className="h-180"
        >
        {props.slides.map((slide: any, index: number) => (
          <SwiperSlide
            key={index}            
          >
          {/* DESKTOP */}
            <Image
              src={slide.image}
              alt="Main Slider"
              title="Main Slider"
              fill
              sizes="100vw"
              className=" md:block hidden object-cover z-10"
              loading="lazy"
              blurDataURL="data:..."
              placeholder="blur"
            />      
          <div className="bg-no-repeat bg-cover bg-center h-full md:block hidden absolute z-20 right-0 left-0" >              
            <div className="md:bg-linear-to-r from-blue-950 from-10% to-transparent to-70% h-full">              
              <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 h-full items-center text-center md:text-start xl:px-0 lg-px-4 md:px-4">
                <div className="px-4 md:px-auto ">
                  {slide.developer_img && (
                    <Image
                      className={`${slide.name === 'loyalty' ? 'w-[200px]' : 'w-[100px]' }  h-auto mb-5 mx-auto md:mx-0`}
                      width={300}
                      height={200}
                      src={slide.developer_img}
                      alt="Developer"
                      title="Developer"
                    />
                  )}

                 {slide.location && (
                    <h2 className="flex items-center gap-2 text-3xl font-thin text-white mb-4 justify-center md:justify-start">
                      <MapPinIcon className="bg-red-600 h-10 w-10 text-white p-2 rounded-full" />
                      {slide.location}
                    </h2>
                 )}
                  {slide.title && (
                    <h1 className="text-white text-4xl md:text-5xl font-medium">
                      {slide.title}
                    </h1>
                  )}
                  
                  {slide.description && (
                    <p className="text-white text-xl my-8 md:text-2xl">
                      {slide.description}
                    </p>
                  )}

                  {slide.loyaltyTitle && (
                    <h1 className={`text-[#FF7D45] text-2xl md:text-3xl font-medium ${BrittanySignature.className}`}>
                      {slide.loyaltyTitle}
                    </h1>
                  )}
                  {slide.features && (
                    <ul className="list-disc text-white text-xl my-8 md:text-2xl ml-7 leading-normal">
                      {slide.features?.map((item:any, idx:any) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>                    
                  )}
                  
                  
                  {slide.name === 'loyalty' && (
                    <Link title="Sign Up" href="https://loyalty-program.psinv.net/" target="_blank" className="relative text-2xl overflow-hidden rounded bg-orange-600 px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer font-semibold">
                      <span className="relative">Sign Up</span>
                    </Link>
                  )}
                  {slide.name !== 'loyalty' && (
                    <>
                      <button 
                        onClick={() => modalHandler(slide)}
                        className="rrelative text-2xl overflow-hidden rounded bg-orange-600 px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer font-semibold">
                        Sign Up
                      </button>
                      <Link title="Explore More" href={slide.project_url} className="group relative text-2xl font-semibold inline-flex h-12 items-center justify-center overflow-hidden rounded-md px-6 font-medium text-white cursor-pointer">
                        <span>Explore More</span>
                        <div className="ml-1 transition group-hover:translate-x-1">
                          <ChevronRightIcon className="w-7 inline-flex" />
                        </div>
                      </Link>
                    </>
                  )}
                  
                </div>
                <div className="">
                  {slide.img2 && (
                    <Image
                      className="w-[90%] h-auto mb-5 mx-auto md:mx-0"
                      src={slide.img2}
                      width={300}
                      height={200}
                      alt="loyalty"
                      title="loyalty"
                    />
                  )}
                </div>
              </div>
            </div>            
            </div>

            {/* MOBILE */}
            <div className="container mx-auto md:hidden block">
              <div className={`relative h-[240px] w-full bg-cover bg-no-repeat mb-5`} style={{ backgroundImage: `url(${slide.image})` }}>
                <div className="flex h-full justify-center items-center">
                  {slide.name === 'loyalty' && slide.img2 && (
                    <Image
                      className="w-[60%] h-auto mb-5 md:mx-0"
                      src={slide.img2}
                      width={300}
                      height={200}
                      alt="loyalty"
                      title="loyalty"
                    />
                  )}
                </div>
              </div>
                <div className="px-4">
                  <div className="flex justify-end">
                    {slide.developer_img_mob && (
                      <Image
                        className="w-[100px] h-auto mb-5 text-end"
                        width={300}
                        height={200}
                        src={slide.developer_img_mob}
                        alt="Developer"
                        title="Developer"
                      />
                    )}
                  </div>                  

                 {slide.location && (
                    <h2 className="flex items-center gap-2 text-xl font-thin mb-4">
                      <MapPinIcon className="bg-red-600 h-7 w-7 p-2 rounded-full text-white" />
                      {slide.location}
                    </h2>
                 )}
                  {slide.title && (
                    <h1 className="text-2xl font-medium">
                      {slide.title}
                    </h1>
                  )}
                  
                  {slide.description && (
                    <p className="text-md my-8 md:text-2xl">
                      {slide.description}
                    </p>
                  )}

                  {slide.loyaltyTitle && (
                    <h1 className={`text-[#FF7D45] text-2xl md:text-3xl font-medium ${BrittanySignature.className}`}>
                      {slide.loyaltyTitle}
                    </h1>
                  )}
                  {slide.features && (
                    <ul className="list-disc text-md my-8 ml-7 leading-normal">
                      {slide.features?.map((item:any, idx:any) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>                    
                  )}                  
                  
                  {slide.name === 'loyalty' && (
                    <Link
                      title="Sign Up" 
                      href="https://loyalty-program.psinv.net/" target="_blank">
                        <div
                      className="relative text-2xl overflow-hidden rounded bg-orange-600 px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer font-semibold">
                      Sign Up </div>
                    </Link>
                  )}
                  {slide.name !== 'loyalty' && (
                    <>
                      <button 
                        onClick={() => modalHandler(slide)}
                        className="relative text-2xl overflow-hidden rounded bg-orange-600 px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer font-semibold">
                      Sign Up
                      </button>

                      <Link title="Explore More" href={slide.project_url} className="group relative text-2xl font-semibold inline-flex h-12 items-center justify-center overflow-hidden rounded-md px-6 font-medium text-white cursor-pointer">
                        <span>Explore More</span>
                        <div className="ml-1 transition group-hover:translate-x-1">
                          <ChevronRightIcon className="w-7 inline-flex" />
                        </div>
                      </Link>
                    </>
                  )}
                  
                </div>
                <div className="">
                  
                </div>                
              </div>
          </SwiperSlide>
        ))}
       
      </Swiper>
       {isMobile && <div className="custom-pagination mt-4 flex justify-center gap-[10px]"></div>}
      <BannerModals modalState={setModal} onModalUpdate={modalUpdate} propData={selectedSlide} />
    </div>
    </>
  );
};

export default SwiperSlider;