'use client'

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import 'swiper/css';

const AboutAwardsSlider = (props: any) => {
    const swiperElRef = useRef<any>(null);

    return (
        <>       
            <Swiper
                    pagination = {{
                        type:"bullets",
                        clickable:true, 
                    }}
                    autoplay = {true}
                    centeredSlides = {true}                    
                    slidesPerView={3}
                    loop = {true}
                    modules = {[Pagination, Autoplay]}
                    onSwiper = {(swiper: any) => (swiperElRef.current = swiper)}
                 >

                    {props.slides && Array.isArray(props.slides) && props.slides.map((slide: any, index: number) => (
                        <SwiperSlide key={index}>
                                <div className="w-full text-center">
                                    <div className="bg-cover bg-center h-[250] w-auto" style={{backgroundImage: `url("/assets/images/about-us/awards/${slide.image}")`}}></div>
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

export default AboutAwardsSlider;