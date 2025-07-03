'use client'

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import 'swiper/css';

type Slide  = {
    image: string,
    title: string
}

type Props = {
    slides : Slide[];
}

const WhereToListPropertySlider = ({ slides }: Props) => {
    const swiperElRef = useRef<any>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    const handleFirstInteraction = () => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
    };

    return (
        <>   
        <div className={`overflow-visible transition-all duration-500 ${!hasInteracted ? 'pl-[120px]' : 'pl-0'}`}>
            <Swiper
                pagination={{
                    type: "bullets",
                    clickable: true,
                }}
                breakpoints={{
                    576: {
                        slidesPerView: 2
                    },
                    768: {
                        slidesPerView: 2
                    },
                    992: {
                        slidesPerView: 3
                    },
                    1200: {
                        slidesPerView: 4
                    }
                }}
                slidesPerView={1.5} // 👈 Show 1.5 slides by default (mobile)
                autoplay={false}
                centeredSlides={false}
                loop={true}             
                modules={[Pagination]}
                onSwiper={(swiper: any) => (swiperElRef.current = swiper)}
                onTouchStart={handleFirstInteraction}
                onSlideChange={handleFirstInteraction}
                spaceBetween={20}
                >

                {slides?.map((slide, index) => (
                    <SwiperSlide key={index}>
                    <div className={hasInteracted ? 'md:w-full text-center' : 'ml-5 md:w-full text-center'}>
                        <div className="h-[180px] bg-white rounded-[15px] flex items-center justify-center">
                        <img src={slide.image} alt={slide.title} width="140px" className="h-auto" />
                        </div>
                    </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            </div>    
        </>
    )
}

export default WhereToListPropertySlider;