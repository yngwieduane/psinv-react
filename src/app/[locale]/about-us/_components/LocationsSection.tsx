'use client'

import { Outfit } from "next/font/google";
import { useState } from "react";
import LocationsTabContent from "./LocationsTabContent";
import LocationsTabHead from "./LocationsTabHead";
import { contactLocations } from "@/data/contactLocations";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const locationsData = [
  { title: "Abu Dhabi", content: "Map Data 1", latitude: 24.497503, longitude: 54.402572 },
  { title: "Dubai", content: "Map Data 2", latitude: 24.497503, longitude: 54.402572 },
  { title: "Sharjah", content: "Map Data 3", latitude: 24.497503, longitude: 54.402572 }
];

export default function LocationsSection() {
  const [visibleTab, setVisibleTab] = useState(0);

  const cityName = locationsData[visibleTab].title;
  const cityLocations = contactLocations.filter(
    (loc) => loc.address_city.toLowerCase() === cityName.toLowerCase()
  );

  return (
    <>
      <div className="container mx-auto px-4 md:px-8">
        <div className="md:flex md:justify-between items-center border-b pb-4 border-gray-200">
          <h3 className={`text-3xl font-bold text-primary text-center md:text-left mb-5 md:mb-0 ${outfit.className}`}>
            OUR LOCATIONS
          </h3>
          <div className="md:w-1/2 md:items-end items-center flex justify-center md:justify-end locationsTabHead">
            <LocationsTabHead
              data={locationsData}
              visibleTab={visibleTab}
              setVisibleTab={setVisibleTab}
            />
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-2 mb-8 text-center md:text-left">
          Discover Our Destinations: Unveiling the Map of Opportunities.
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
