'use client'

import React, { useState } from "react";
import CityProjectsGrid from "../../_components/CityProjectsGrid";
import { useLocale, useTranslations } from "next-intl";

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

const CitiesTabSharjah: React.FC<CitiesTabProps> = ({ cities, centered }) => {
  const locale = useLocale();
  const isRtl = locale.toLowerCase().startsWith("ar");
  const t = useTranslations('citiesHome.sharjah');

  const [visibleTab, setVisibleTab] = useState(0);
  const currentCity = cities[visibleTab];
  return (
    <>
      <div className="container mx-auto py-10 bg-gray-50" dir={isRtl ? "rtl" : "ltr"}>
        <div className={`px-4 md:px-8 `}>
          <h3 className="text-xl mb-5">{t('title')}</h3>
          <hr className="border-gray-200 mb-7" />
          <CityProjectsGrid projects={currentCity.projects} />
        </div>
      </div>
    </>
  );
}


export default CitiesTabSharjah;