'use client';

import dynamic from "next/dynamic";
import { ContactLocation } from "@/data/contactLocations";

const GoogleMapEmbedNoSSR = dynamic(() => import('../GoogleMapEmbed'), { ssr: false });

interface mapProps {
  center:{lat: number, lng: number};
  locations: ContactLocation[];
  selectedLocation: ContactLocation | null;
  onMapLoad : (map: google.maps.Map) => void;
}

export default function Map({center, locations,selectedLocation,onMapLoad}: mapProps) {
  return (
    <GoogleMapEmbedNoSSR
      center={center}
      locations={locations}
      selectedLocation={selectedLocation}
      onMapLoad={onMapLoad}
    />
  )
}