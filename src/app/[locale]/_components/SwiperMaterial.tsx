'use client'

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import EffectMaterial from "../_components/functions/js/effect-material.esm";
import "swiper/css";
import "swiper/css/a11y";
import "../_components/functions/css/effect-material.css";
import "./SwiperMaterial.css";
import Image from "next/image";

export default function MySwiper(props: any) {
  const swiperParameters = {
    modules: [A11y, EffectMaterial],
    slidesPerView: 2,
    spaceBetween: 16,
    loop: true,
    effect: "material",
    lazy: { enabled: true },
  };
  return (
    <>
      <Swiper {...swiperParameters}>
        {props.slides?.map((slide:any, index:any) => {
            let imagecontent = slide.split('?');
            return (
                <SwiperSlide key={index} className="swiper-slide-1990">
                <div className="swiper-material-wrapper">
                    <div className="swiper-material-content">
                    <img
                        alt={imagecontent[1]}
                        width={400}
                        height={700}
                        className="swiper-slide-bg-image swiper-slide-bg-image-c61b"
                        data-swiper-material-scale="1.25"
                        loading="lazy"
                        src={imagecontent[0]}
                    />

                    <div className="swiper-lazy-preloader"></div>

                    <div className="swiper-slide-content swiper-material-animate-opacity swiper-slide-content-609f">
                        <div className="swiper-slide-text swiper-slide-text-66a3">
                        </div>
                    </div>
                    </div>
                </div>
                </SwiperSlide>
            )
        })}

      </Swiper>
    </>
  );
}