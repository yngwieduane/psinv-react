'use client'

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Audrey } from '@/utils/fonts';
import { BrittanySignature } from "@/utils/fonts";
import { Montserrat } from "next/font/google";

import 'swiper/css';

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
  });

const AboutTextSlider = (props: any) => {
  const swiperElRef2 = useRef<any>(null);

return (
    <>
        <section className="w-full">
            <div className="relative max-w-[1320]  mx-auto justify-center md:px-auto px-2">
                <Swiper 
                    pagination = {{
                        type:"bullets",
                        clickable:true,                         
                    }}
                    autoplay = {true}
                    loop = {true}
                    modules={[Autoplay, Pagination]} 
                    onSwiper={(swiper: any) => (swiperElRef2.current = swiper)}
                >

                {props.slides.map((slide: any, index: number) => (
                    <SwiperSlide key={index}>
                        <div className="row mx-0 h-100 px-0 text-center mb-5">
                            <div className="w-full flex flex-col items-center">
                                <div
                                    className="lazy bg-size-cover h-[220px] w-[220px] rounded-full bg-cover mb-4"
                                    style={{ backgroundImage: `url(${slide.image})` }}
                                ></div>
                                <p className={`text-[#2C2D65] md:text-xl sm:text-lg text-sm mt-3 !mb-0 font-normal ${montserrat.className}`}>{slide.text}</p>
                                <p className={`text-uppercase font-700 ${Audrey.className} text-[#2C2D65] text-2xl uppercase mt-2 !mb-0`}>{slide.name}</p>
                                <p className={`${BrittanySignature.className} text-[#CE641D] text-xl !mb-0`}>{slide.designation}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </section>
    </>
)
}

export default AboutTextSlider;
