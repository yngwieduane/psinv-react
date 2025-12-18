'use client'

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination} from "swiper/modules";
import { Outfit } from "next/font/google";

import 'swiper/css';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const AboutAwardsSlider = (props: any) => {
    const swiperElRef = useRef<any>(null);
    
    useEffect(() => {
        if (swiperElRef.current) {
            swiperElRef.current.update(); // force recalculation
        }
    }, []);

    return (
        <>       
            <Swiper                
                breakpoints={{
                    576: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
                autoplay = {true}
                centeredSlides = {false}
                pagination={{ clickable: true }} 
                loop = {true}
                observer = {true}
                observeParents = {true}
                modules = {[Autoplay, Pagination]}
                onSwiper = {(swiper: any) => (swiperElRef.current = swiper)}
                className="home-awards-slider"
                >

                {props.slides && Array.isArray(props.slides) && props.slides.map((slide: any, index: number) => (
                    <SwiperSlide key={index}>
                            <div className={`w-full text-center pb-15 md:pb-0 ${outfit.className}`}>
                                {/* <div className="bg-cover bg-center h-[200] w-auto" style={{backgroundImage: `url("/assets/images/about-us/awards/${slide.image}")`}}></div> */}
                                <div className="h-60 md:h-48 flex items-center justify-center mb-6 w-full">
                                    <img src={`/assets/images/about-us/awards/${slide.image}`} alt={`${slide.title1}`}
                                    className="h-40 w-auto object-contain mix-blend-multiply transition-transform duration-300 transform hover:scale-110" />
                                </div>
                                <p className="font-bold text-gray-800 mb-1 text-lg">{slide.title1}</p>
                                <p className="font-bold text-gray-800 mb-1 text-lg">{slide.title2}</p>
                                <p className="text-xs text-gray-500 uppercase">{slide.title3}</p>
                            </div>
                    </SwiperSlide>

                ))}                    

            </Swiper>
        </>
    )
}

export default AboutAwardsSlider;