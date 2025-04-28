'use client'

import { Audrey} from "@/utils/fonts";
import { Montserrat} from "next/font/google"; 
import { useState } from "react";
import LocationsTabContent from "./LocationsTabContent";
import LocationsTabHead from "./LocationsTabHead";

const montserrat = Montserrat({
    variable: "--font-montserrat",
    display:"swap",
    subsets: ["latin"],
  });

const locationsData = [
    { title: "Abu Dhabi", content:"Map Data 1", latitude:24.497503, longitude:54.402572},
    { title: "Dubai", content:"Map Data 2", latitude:24.497503, longitude:54.402572},
    { title: "Sharjah", content:"Map Data 3", latitude:24.497503, longitude:54.402572}
];

export default function LocationsSection() {
  const [visibleTab, setVisibleTab] = useState(0);

  return (
    <>
      <div className="flex max-w-screen-xl mx-auto px-5">
        <div className="md:w-1/2">
          <div className="mb-[30px]">
            <h3 className={`text-darkblue font-bold text-xl md:text-4xl ${Audrey.className}`}>
              OUR LOCATIONS
            </h3>
            <p className={`text-lg font ${montserrat.className} mt-5`}>
              Discover Our Destinations: Unveiling the Map of Opportunities.
            </p>
          </div>
        </div>
        <div className="md:w-1/2 items-end locationsTabHead">
          <LocationsTabHead
            data={locationsData}
            visibleTab={visibleTab}
            setVisibleTab={setVisibleTab}
          />
        </div>
      </div>
      <div className="flex max-w-screen-xl mx-auto">
        <LocationsTabContent
          data={locationsData}
          visibleTab={visibleTab}
          height={"h-[600]"}
        />
      </div>

      </>
  );
}
