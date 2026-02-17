'use client'

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Great_Vibes, Open_Sans, Outfit } from "next/font/google";

import 'swiper/css';

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

const greatVibes = Great_Vibes({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-great-vibes',
});

const opensans = Open_Sans({
    variable: "--font-opensans",
    display: "swap",
    subsets: ["latin"],
});

const AboutTextSlider = (props: any) => {
    const swiperElRef2 = useRef<any>(null);
    const paginationId = "textslider-pagination";

    return (
        <>

            <section className="py-24 container mx-auto px-4 md:px-8">
                <div className="relative max-w-[1320]  mx-auto justify-center md:px-auto px-2">
                    <Swiper
                        pagination={{
                            clickable: true,
                            el: `#${paginationId}`,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        modules={[Autoplay, Pagination]}
                        onSwiper={(swiper: any) => (swiperElRef2.current = swiper)}
                    >

                        {props.slides.map((slide: any, index: number) => (
                            <SwiperSlide key={index} className="pb-20">
                                <div className="row mx-0 h-100 px-0 text-center mb-5">
                                    <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                                        <div
                                            className="w-40 h-40 mx-auto mb-10 rounded-full overflow-hidden lazy border-4 border-white shadow-2xl ring-1 ring-gray-100 dark:border-gray-700 dark:ring-gray-600">
                                            <img src={slide.image} className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500 lazy" />
                                        </div>
                                        <div className={`relative ${outfit.className} mb-10`}>
                                            <span className="text-6xl text-gray-200 font-serif absolute -top-8 left-0 opacity-50">"</span>
                                            <p className={`text-gray-600 font-light text-xl mb-10 leading-relaxed px-8 ${opensans.className} dark:text-gray-300`}>
                                                {slide.text} </p>
                                            <span className="text-6xl text-gray-200 font-serif absolute -bottom-16 right-0 opacity-50 rotate-180">"</span>
                                        </div>
                                        <h3 className="font-bold text-2xl text-primary tracking-wide uppercase dark:text-white">{slide.name}</h3>
                                        <p className={`text-gray-800 text-3xl mt-2 ${greatVibes.className} dark:text-white`}>{slide.designation}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div id={paginationId} className="w-full mt-6 flex justify-center mx-auto"></div>
                </div>
            </section>
        </>
    )
}

export default AboutTextSlider;
