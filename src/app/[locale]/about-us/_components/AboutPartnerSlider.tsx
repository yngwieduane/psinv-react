'use client'

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import 'swiper/css';

const AboutPartnerSlider = (props: any) => {
    const swiperElRef = useRef<any>(null);

    return (
        <>       
            <Swiper
                pagination = {{
                    type:"bullets",
                    clickable:true, 
                }}
                breakpoints={{
                    576: {
                        slidesPerView:1
                    },
                    768: {
                        slidesPerView:2
                    },
                    992: {
                        slidesPerView: 3
                    },
                    1200: {
                        slidesPerView: 4
                    }
                }}
                autoplay = {true}
                centeredSlides = {true}
                loop = {true}
                modules = {[Pagination, Autoplay]}
                onSwiper = {(swiper: any) => (swiperElRef.current = swiper)}
                >

                {props.slides && Array.isArray(props.slides) && props.slides.map((slide: any, index: number) => (
                    <SwiperSlide key={index}>
                        <div className="w-full text-center">
                            <div className="bg-contain bg-center h-[250] w-auto p-[50] border border-[#F9F9F9]">
                                <img src={slide.image} alt={slide.title} />
                            </div>
                            <p className="text-darkblue fs-20 mt-3 fw-bold mb-0">{slide.title1}</p>
                            <p className="text-darkblue fs-20 fw-light mb-0">{slide.title2}</p>
                            <p className="text-darkblue fs-20 fw-light">{slide.title3}</p>
                        </div>
                    </SwiperSlide>
                ))}                    

            </Swiper>
        </>
    )
}

export default AboutPartnerSlider;