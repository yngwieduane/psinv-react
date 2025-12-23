'use client'

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import 'swiper/css';

const AboutPartnerSlider = (props: any) => {
    const swiperElRef = useRef<any>(null);
    const paginationId = "partnerslider-pagination";

    return (
        <>
            <Swiper
                pagination={{
                    type: "bullets",
                    clickable: true,
                    el: `#${paginationId}`,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                    },
                    576: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    992: {
                        slidesPerView: 5,
                    },
                    1200: {
                        slidesPerView: 6,
                    }
                }}
                autoplay={false}
                centeredSlides={true}
                loop={true}
                modules={[Pagination, Autoplay]}
                onSwiper={(swiper: any) => (swiperElRef.current = swiper)}
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 partnerSlider"
            >
                {props.slides && Array.isArray(props.slides) && props.slides.map((slide: any, index: number) => (
                    <SwiperSlide key={index}>
                        <div className="w-auto text-center">
                            <div className="bg-contain bg-center h-[150px] md:h-[250px] w-auto p-[30]">
                                <img src={slide.image} alt={slide.title} className="w-auto max-h-full mx-auto" />
                            </div>
                            <p className="text-darkblue fs-20 mt-3 fw-bold mb-0">{slide.title1}</p>
                            <p className="text-darkblue fs-20 fw-light mb-0">{slide.title2}</p>
                            <p className="text-darkblue fs-20 fw-light">{slide.title3}</p>
                        </div>
                    </SwiperSlide>
                ))}
                <div id={paginationId} className="w-full mt-6 flex justify-center mx-auto md:hidden"></div>
            </Swiper>
        </>
    )
}

export default AboutPartnerSlider;