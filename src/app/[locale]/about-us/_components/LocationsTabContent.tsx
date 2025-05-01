'use client'

import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
const Map = dynamic(() => import('./Map'), { ssr: false });
import { ContactLocation } from "@/data/contactLocations";

interface LocationsTabContentProps {
  cityCenter: { lat: number, lng: number};
  locations: ContactLocation[];
  height: string;
}

export default function LocationsTabContent({cityCenter, locations, height}: LocationsTabContentProps) {

  const [selectedLocation, setSelectedLocation] = useState<ContactLocation | null>(null);

  const [mapRef, setMapRef] = useState<google.maps.Map | null> (null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map);
  },[]);

  const handleLocationClick = (location: ContactLocation) => {
    setSelectedLocation(location);
    if(mapRef) {
      mapRef.panTo({lat: location.latitude, lng:location.longitude});
      mapRef.setZoom(16);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 relative md:h-[600px] w-full">
      {/* Locations list */}
      {/* case no location */}
      {locations.length === 0 ? null : (        
        <div className="md:w-1/3 bg-white p-0 rounded shadow overflow-auto h-[530px] md:absolute md:right-[30px] z-50 md:top-1/2 md:transform md:-translate-y-1/2">        
          {locations.map((loc) => (
            <div key={loc.id}
              className={`text-[#2C2D65] cursor-pointer p-5 mb-2 rounded ${selectedLocation?.id === loc.id ? 'border-l-4 border-l-[#2C2D65]-500' : 'border-0'}`}
              onClick={() => handleLocationClick(loc)} >
              <h2 className="font-semibold text-2xl mb-2">{loc.name}</h2>
              <h3 className="text-lg mb-3">{loc.address_community}</h3>
              <p className="text-sm">{loc.off_address}</p>
              <a className="font-semibold text-sm" href={`${loc.location}`} target="_blank">View map</a>
            </div>
          ))}
        </div>
      )}      

      {/* Map */}
      <div className={`w-full md:absolute  ${height}`}>
        <Map
          center={cityCenter}
          locations={locations}
          selectedLocation={selectedLocation}
          onMapLoad={onMapLoad}
        />
      </div>
    </div>
  );
};