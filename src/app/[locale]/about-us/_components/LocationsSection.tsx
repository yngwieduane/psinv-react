'use client'

import { Audrey} from "@/utils/fonts";
import { Montserrat} from "next/font/google"; 
import { useState } from "react";
import LocationsTabContent from "./LocationsTabContent";
import LocationsTabHead from "./LocationsTabHead";
import { contactLocations } from "@/data/contactLocations";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

const locationsData = [
    { title: "Abu Dhabi", content:"Map Data 1", latitude:24.497503, longitude:54.402572},
    { title: "Dubai", content:"Map Data 2", latitude:24.497503, longitude:54.402572},
    { title: "Sharjah", content:"Map Data 3", latitude:24.497503, longitude:54.402572}
];

export default function LocationsSection() {
  const [visibleTab, setVisibleTab] = useState(0);

  const cityName = locationsData[visibleTab].title;
  const cityLocations = contactLocations.filter(
    (loc) => loc.address_city.toLowerCase() === cityName.toLowerCase()
  );

  return (
    <>      
      <div className="md:flex max-w-screen-xl mx-auto px-5">
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
        <div className="md:w-1/2 md:items-end items-center content-center locationsTabHead">
          <LocationsTabHead
            data={locationsData}
            visibleTab={visibleTab}
            setVisibleTab={setVisibleTab}
          />
        </div>
      </div>
      <div className="flex w-full mx-auto">
        <LocationsTabContent
          cityCenter={{lat:locationsData[visibleTab].latitude, lng: locationsData[visibleTab].longitude}}
          locations={cityLocations}
          height={"h-[600px]"}
        />
      </div>

      </>
  );
}
