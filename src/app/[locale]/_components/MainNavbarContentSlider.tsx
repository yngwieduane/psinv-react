'use client'
import React, { useState } from "react";
import SwiperSliderMain from "./tools/SwiperSliderMain";

const MainNavbarContentSlider = (props:any) => {
  return (
    <div className="container mx-auto my-8 px-5">
      <SwiperSliderMain
            slidePerView="4"
            pagination="false"
            navigation="true"
            slides={props.data[props.visibleTab].projects}
          />
    </div>
  );
};

export default MainNavbarContentSlider;
