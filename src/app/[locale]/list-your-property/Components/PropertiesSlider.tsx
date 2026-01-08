'use client'

import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/pagination';  // Add pagination styles
import CircleIcon from "./CircleIcon";

type Slide = {
  image: string;
  title: string;
  content: string[];
};

type Props = {
  slides: Slide[];
  modal: boolean;
  onOpenModal: () => void;
  onUpdateModal: (value: boolean) => void;
};

const PropertiesSlider = ({ slides, modal, onOpenModal, onUpdateModal }: Props) => {
  const t = useTranslations("ListYourPropertyPage");
  const slidesRef = useRef<Array<HTMLDivElement | null>>([]);
  const [maxHeight, setMaxHeight] = useState(0);

  // Calculate max height after slides mount or when slides change
  useEffect(() => {
    if (slidesRef.current.length) {
      const heights = slidesRef.current.map((el) => el?.offsetHeight || 0);
      const max = Math.max(...heights);
      setMaxHeight(max);
    }
  }, [slides]);

  return (
    <div>
      <Swiper
        pagination={{
          type: "bullets",
          clickable: true,
        }}
        breakpoints={{
          576: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          992: { slidesPerView: 1 },
          1200: { slidesPerView: 1.2 },
        }}
        centeredSlides={true}
        loop={false}
        modules={[Pagination]}
        spaceBetween={20}
        className="custom-pagination"
      >
        {slides?.map((slide, index) => (
          <SwiperSlide className="py-10 px-7 relative"
            key={index}
            style={{ height: maxHeight ? `${maxHeight}px` : "auto" }}
          >
            <div className="block md:hidden absolute h-[209px] w-[88%] bg-[#E35F2733] rounded-[16px] top-[15px] left-[10px]"></div>
            <div className="flex flex-col md:flex-row items-stretch text-white px-5 md:pl-13 md:pr-0  relative z-10 overflow-visible h-full rounded-[16px]" style={{ backgroundColor: index === 1 ? "#3e3f74" : "#272963" }}>
              {/* Left Content */}
              <div className="md:w-1/2 z-10 py-16 flex flex-col h-full order-last md:order-first">
                <h2 className="text-3xl font-bold mb-10">{slide.title}</h2>
                <ul className="list-none pl-0 mb-4 space-y-5">
                  {slide.content?.map((listItem, i) => (
                    <li
                      key={i}
                      className="relative pl-4 before:content-['-'] before:absolute before:left-0 before:text-white"
                    >
                      {listItem}
                    </li>
                  ))}
                </ul>
                <div className="md:ml-0 mx-auto">
                  <div className="btnOuter relative bg-[#E35F27] rounded-[8px] mt-[50px] h-[48px] w-[205px] ms-0">
                    <button className="btn btnPrimary btnAnimate text-white flex justify-between py-0 gap-2 items-center h-[48px] w-[201px]"
                      onClick={onOpenModal}>
                      <CircleIcon />
                      {t("form.labels.list_your_property")}
                    </button>
                    <div className="btnAnimateBorder absolute"></div>
                  </div>
                </div>
              </div>

              {/* Image on Right */}
              <div className="md:w-1/2 relative order-first md:order-last">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="md:absolute md:bottom-0 md:right-0 md:w-full md:h-[110%] h-[200px] mt-[-15px] mx-auto" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PropertiesSlider;
