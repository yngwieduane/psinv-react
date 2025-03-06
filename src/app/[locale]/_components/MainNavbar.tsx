'use client'
import React, { useState } from "react";

import MainNavbarHeader from './MainNavbarHeader';
import MainNavbarContentSlider from "./MainNavbarContentSlider";

const MainNavbar = (props:any) => {
    const [visibleTab, setVisibleTab] = useState(0);
    return (
      <div>
        <MainNavbarHeader
        data={props.cities}
        visibleTab={visibleTab}
        setVisibleTab={setVisibleTab}
        />
        <MainNavbarContentSlider data={props.cities} visibleTab={visibleTab} />
      </div>
    );
  }


export default MainNavbar;