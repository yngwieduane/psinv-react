'use client'

import { Navigation } from "swiper/modules"
import { SwiperSlide, Swiper } from "swiper/react"
import { useRef } from "react";

import 'swiper/css';
import 'swiper/css/navigation';
import { AudreyNormal } from "@/utils/fonts";

import type { NavigationOptions } from 'swiper/types';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type Slide = {
  review: string,
};

type Props = {
  slides: Slide[];
};


const ReviewSlider = ({ slides }: Props) => {
    const navigationPrevRef = useRef<HTMLDivElement | null>(null);
    const navigationNextRef = useRef<HTMLDivElement | null>(null);

    const navigationConfig: NavigationOptions = {
        prevEl: navigationPrevRef.current,
        nextEl: navigationNextRef.current,
    };

    return(
        <>
        <div className="w-full relative pb-20 md:px-0 px-4">
            {/* Custom Navigation Buttons */}
            <div
            ref={navigationPrevRef}
            className="absolute z-10 bottom-0 right-[calc(50%+10px)] bg-transparent p-5 border border-[#3A748A] rounded-full cursor-pointer"
            >
                <FaArrowLeft color="#666" size={20} />
            </div>
    
            <div
            ref={navigationNextRef}
            className="absolute z-10 bottom-0 left-[calc(50%+10px)] bg-transparent border border-[#3A748A]  p-5 rounded-full cursor-pointer"
            >
                <FaArrowRight color="#666" size={20} />
            </div>
            <Swiper
            modules={[Navigation]}
            navigation={navigationConfig}
            onSwiper={(swiper) => {
                setTimeout(() => {
                    if (
                    navigationPrevRef.current &&
                    navigationNextRef.current &&
                    swiper.params.navigation &&
                    swiper.navigation &&
                    typeof swiper.params.navigation !== 'boolean'
                    ) {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                    }
                });
            }}
            loop={true}
            autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            }}        
            breakpoints={{
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            }}
            speed={800}        
            rewind = { false}
            allowTouchMove = { true }
            centeredSlides={false}
            spaceBetween={30}
            freeMode ={true}
            grabCursor = {true}
            className={``}
            
            
        >
            {slides?.map((slide, index) => (
                <SwiperSlide key={index} className="w-full py-5 px-5">
                    <div className="bg-white p-3 pb-12 rounded-2xl" style={{boxShadow:"0 0 10px 0px rgba(0, 0, 0, 0.15)"}}>
                        <a target="blank"
                            href="https://www.google.com/maps/place/Property+Shop+Investment+(PSI)+Head+Office/@24.4989271,54.4005361,17z/data=!4m8!3m7!1s0x3e5e6771068ad87b:0x69e22df55708d677!8m2!3d24.4989222!4d54.403111!9m1!1b1!16s%2Fg%2F11v9vcrcw4?entry=ttu">
                            <div className="flex gap-3">                                    
                                <img src="/assets/images/international/google.png" alt="google" width="25px" height="auto" className="object-contain"/>
                                <p className={`${AudreyNormal.className} tracking-widest text-2xl uppercase`}>Google</p>                                    
                            </div>
                        </a>
                        <div className="p-5 bg-[#E8E8E8] rounded-xl mt-5">
                            <p className="md:text-[26px] text-xl font-light text-[#666666] leading-normal">
                                {slide.review}
                            </p>
                        </div>
                    </div>                    
                </SwiperSlide>
        ))}
            </Swiper>
        </div>
        </>
    )

}

export default ReviewSlider