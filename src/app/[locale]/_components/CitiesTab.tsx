'use client'

import React, { useState } from "react";
import CitiesTabHeader from "./CitiesTabHeader";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

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
}

const CitiesTab: React.FC<CitiesTabProps> = ({ cities }) => {
  const locale = useLocale();
  const isRtl = locale.toLowerCase().startsWith("ar");

  const L = (en: string, ar?: string) => (isRtl && ar ? ar : en);

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
          />

          <div key={visibleTab} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[320px] animate-[fadeIn_0.5s_ease-out]">
            {hasProjects ? (
              currentCity.projects.map((project, index) => (
                <a key={index} href={`/en${project.project_url}`}>
                  <div
                    key={index}
                    className="group relative h-80 overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity" />

                    <div className="absolute bottom-0 left-0 p-6 text-white w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className={`text-2xl font-serif font-bold mb-1 ${outfit.className}`}>{L(project.title, project.title_ar)}</h3>
                      <p className={`text-xs font-light tracking-widest text-gray-300 ${outfit.className} `}>{project.type}</p>
                      <div className="h-0.5 w-0 bg-secondary mt-4 transition-all duration-500 group-hover:w-16" />
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center text-gray-400 py-10 bg-white rounded-lg border border-dashed border-gray-300">
                <p className="text-lg">Coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}


export default CitiesTab;