'use client'
import React, { useState } from "react";
import SwiperSliderMain from "./tools/SwiperSliderMain";
import { useTranslation } from "react-i18next";

const MainNavbarContentSlider = (props:any) => {
  const { t } = useTranslation();
  const [setModal, setSetModal] = useState(false);

  const modalHandler = (event:any) => {
    console.log("clicked = " + setModal);
    setSetModal(true);
  };

  const modalUpdate = (event:any) => {
    console.log(event);
    setSetModal(event);
  };

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
