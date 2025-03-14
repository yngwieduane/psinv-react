import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const MainNavbarContentEmpty = (props:any) => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto my-8 px-5">
        {props.children}
    </div>
  );
};

export default MainNavbarContentEmpty;
