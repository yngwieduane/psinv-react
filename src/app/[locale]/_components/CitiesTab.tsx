'use client'

import React, { useState } from "react";
import CitiesTabHeader from "./CitiesTabHeader";
import CityProjectsGrid from "./CityProjectsGrid";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

interface Project {
  image: string;
  title: string;
  title_ar?: string;
  type: string;
  project_url: string;
}

interface City {
  id: string;
  title: string;
  title_ar?: string;
  content: string;
  image: string;
  projects: Project[];
}

interface CitiesTabProps {
  cities: City[];
  centered?: boolean;
}

const CitiesTab: React.FC<CitiesTabProps> = ({ cities, centered }) => {
  const locale = useLocale();
  const isRtl = locale.toLowerCase().startsWith("ar");

  const [visibleTab, setVisibleTab] = useState(0);
  const currentCity = cities[visibleTab];
  const hasProjects = currentCity?.projects?.length > 0;
  return (
    <>
      <div className="container mx-auto py-10" dir={isRtl ? "rtl" : "ltr"}>
        <div className={`px-4 md:px-8 `}>
          <CitiesTabHeader
            data={cities}
            visibleTab={visibleTab}
            setVisibleTab={setVisibleTab}
            centered={centered}
          />

          <div key={visibleTab}>
            <CityProjectsGrid projects={currentCity.projects} />
          </div>
        </div>
      </div>
    </>
  );
}


export default CitiesTab;