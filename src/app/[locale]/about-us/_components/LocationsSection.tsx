'use client'

import { Outfit } from "next/font/google";
import { useState } from "react";
import LocationsTabContent from "./LocationsTabContent";
import LocationsTabHead from "./LocationsTabHead";
import { psiMapLocations } from "@/data/psiMapLocations";
import { useLocale, useTranslations } from "next-intl";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function LocationsSection() {
  const t = useTranslations('About_Locations');
  const locale = useLocale();
  const isRTL = locale.toLowerCase().startsWith("ar");

  const locationsData = [
    { title: t('AbuDhabi_title'), filterKey: "Abu Dhabi", content: "Map Data 1", latitude: 24.497503, longitude: 54.402572 },
    { title: t('Dubai_title'), filterKey: "Dubai", content: "Map Data 2", latitude: 24.497503, longitude: 54.402572 },
    { title: t('Sharjah_title'), filterKey: "Sharjah", content: "Map Data 3", latitude: 24.497503, longitude: 54.402572 }
  ];
  const [visibleTab, setVisibleTab] = useState(0);

  const cityFilterKey = locationsData[visibleTab].filterKey;
  const cityLocations = psiMapLocations.filter(
    (loc) => loc.address_city.toLowerCase() === cityFilterKey.toLowerCase()
  );

  return (
    <>
      <div className="container mx-auto px-4 md:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="md:flex md:justify-between items-center border-b pb-4 border-gray-200 dark:border-gray-800">
          <h3 className={`text-3xl font-bold text-primary text-center mb-5 md:mb-0 ${outfit.className} ${isRTL ? 'md:text-right' : 'md:text-left'} dark:text-white`}>
            {t('title')}
          </h3>
          <div className="md:w-1/2 md:items-end items-center flex justify-center md:justify-end locationsTabHead">
            <LocationsTabHead
              data={locationsData}
              visibleTab={visibleTab}
              setVisibleTab={setVisibleTab}
            />
          </div>
        </div>
        <p className={`text-gray-500 text-sm mt-2 mb-8 text-center ${isRTL ? 'md:text-right' : 'md:text-left'} dark:text-gray-400`}>
          {t('desc')}
        </p>
        <div className="flex w-full mx-auto">
          <LocationsTabContent
            cityCenter={{ lat: locationsData[visibleTab].latitude, lng: locationsData[visibleTab].longitude }}
            locations={cityLocations}
            height={"h-[600px]"}
          />
        </div>
      </div>

    </>
  );
}
