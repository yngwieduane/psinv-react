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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import FancyboxWrapper from "./tools/FancyboxWrapper";

export default function MySwiper(props: any) {
  const swiperParameters = {
    modules: [A11y, EffectMaterial],
    loop: true,
    effect: "material",
    lazy: { enabled: true },
    breakpoints:{
      640: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
    },
  };
  return (
    <>
      <Swiper {...swiperParameters}>
        <FancyboxWrapper>
          <a data-fancybox="gallerypopup" href={props.slides[0].split('?')[0]}className="absolute top-5 end-5 md:top-[unset] md:bottom-10 md:end-15 bg-[#00000050] z-10 text-white p-2 rounded-lg"><FontAwesomeIcon icon={faImages}/> {props.slides.length} </a>
        </FancyboxWrapper>
        {props.slides?.map((slide:any, index:any) => {
            let imagecontent = slide.split('?');
            return (
                <SwiperSlide key={index} className="swiper-slide-1990">
                  <div className="swiper-material-wrapper">
                      <div className="swiper-material-content">
                      <img
                          alt={imagecontent[1]}
                          width={400}
                          height={900}
                          className="swiper-slide-bg-image swiper-slide-bg-image-c61b"
                          data-swiper-material-scale="1.25"
                          loading="lazy"
                          src={imagecontent[0]}
                      />
                      <a key={index} data-fancybox="gallerypopup" href={imagecontent[0]}></a>

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