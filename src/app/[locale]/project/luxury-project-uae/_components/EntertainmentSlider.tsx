'use client'

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Parisienne, Montserrat, Libre_Baskerville } from "next/font/google";

import { FreeMode, Navigation} from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import "./UltraLuxuryProjectsSlider.css"

const parisienne = Parisienne({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-parisienne',
});

const montserratBolder = Montserrat({
    subsets: ['latin'],
    weight: ['900'],
    variable: '--font-montserrat-bolder',
});

const libreBaskervilleBold = Libre_Baskerville({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-libre-baskerville-bold',

});

const sliderData = [
    { name: "Yas Island", image: "/assets/images/luxury-project-uae/yas-island.webp" },
    { name: "Burj Khalifa", image: "/assets/images/luxury-project-uae/burj-khalifa.webp" },
    { name: "Ferrari World", image: "/assets/images/luxury-project-uae/luxury-ferrari-world.webp" },
    { name: "Louvre Abu Dhabi", image: "/assets/images/luxury-project-uae/luxury-louvre-abu-dhabi.webp" },
    { name: "Burj Al Arab", image: "/assets/images/luxury-project-uae/luxury-burj-al-arab.webp" },
    { name: "Dubai Mall", image: "/assets/images/luxury-project-uae/luxury-dubai-mall.webp" },
    { name: "Water-World Yas Island", image: "/assets/images/luxury-project-uae/luxury-water-world.webp" },
    { name: "Dubai Sky Resturant", image: "/assets/images/luxury-project-uae/luxury-sky-resturant.webp" },
    { name: "Warner Bros", image: "/assets/images/luxury-project-uae/luxury-warner-bros.webp" }
];

const EntertainmentSlider = () => {

  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="md:h-[1100px] h-[600px] w-full md:pt-25 py-5">
      {sliderData.length > 0 ? (
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}          
          slidesPerView={1}
          loop={true}
          modules={[FreeMode, Navigation]}
          spaceBetween={0}
          navigation={true}
          allowTouchMove={false}
          className="h-full w-full z-[99999]"
        >
          <div className="absolute inset-0 z-[4] max-w-screen-xl mx-auto text-white px-4 pt-20">
            <div
            className={`absolute z-[5] md:-top-12 top-10 left-7 text-[60px] md:text-[140px] lg:text-[180px] font-bolder ${montserratBolder.className} text-[#fff] opacity-10`}
            > 06 </div>
            <h2 className="z-[5]  lg:ml-20 ml-10 text-xs md:text-md lg:text-xl uppercase text-[#FBD784] font-bold tracking-[6px] mb-5 flex gap-2 items-center justify-start">
              <span className="z-[5] w-[35px] md:w-[65px] h-[3px] bg-[#FBD784]" />
              Entertainment
            </h2>
            <h3
            className={`z-[5] text-center text-[24px] md:text-[35px] lg:text-[48px] relative leading-tight ${libreBaskervilleBold.className} capitalize`}
            >
            Entertainment{" "}
              <span
                className={`z-[5] ml-3 text-[40px] md:text-[55px] lg:text-[60px] relative after:bg-[#C19A5B] after:absolute after:w-full after:left-0 after:z-[-1]
                after:h-[25px] after:top-4 md:after:h-[30px] md:after:top-7 lg:after:h-[40px] lg:after:top-6 ${parisienne.className}`}
              >
                Highlights
              </span>
            <br />
            Across the UAE
            </h3>
          </div>    

          {sliderData.map((slide, index) => (
            <SwiperSlide key={index} className="h-full w-full">
              <img
                src={slide.image}
                alt={slide.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute z-[5] bottom-35 left-1/2 -translate-x-1/2 btn text-white text-center bg-[#C19A5B] rounded-[5px] py-2 h-[40px] px-5 md:w-auto w-auto mt-5"
                >                                
                {slide.name}
              </span>
              {/* desktop elements */}
              <div className="absolute inset-0 h-[500px] z-[1] pointer-events-none md:block hidden"
                    style={{ backgroundImage: "linear-gradient(0deg, #FFFFFF00 10%, #353B58 100%, #131f526e 0%)", }}
                ></div>
              <div className="absolute inset-0 h-full z-[1] w-full pointer-events-none md:block hidden"
                    style={{ backgroundImage: "linear-gradient(0deg, #FFFFFF00 10%, #353B58 100%, #131f526e 0%)", }}
                ></div>
                <div className="absolute h-[336px] bottom-0 z-[1] w-full pointer-events-none md:block hidden"
                    style={{ backgroundImage: "linear-gradient(180deg, #FFFFFF00 10%, #131f526e 37%, #353b58 100%)", }}
                ></div>
              {/* mobile elements */}
              <div className="absolute inset-0 h-[600px] z-[1] pointer-events-none md:hidden block w-full"
                    style={{ backgroundImage: "linear-gradient(0deg, #FFFFFF00 41%, #353B58 100%, #131f526e 0%)", }}
                ></div>
                
                <div className="absolute h-[336px] bottom-0 z-[1] w-full pointer-events-none md:hidden block w-full"
                    style={{ backgroundImage: "linear-gradient(180deg, #FFFFFF00 10%, #131f526e 37%, #353b58 100%)", }}
                ></div>
                
            </SwiperSlide>
          ))}          
        </Swiper>
      ) : (
        <p className="text-center text-white text-xl">No Projects to Show</p>
      )}
    </div>
  );
};


export default EntertainmentSlider;