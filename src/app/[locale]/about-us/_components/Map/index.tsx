'use client';

import dynamic from "next/dynamic";
import { psiMapLocation } from "@/data/psiMapLocations";

const GoogleMapEmbedNoSSR = dynamic(() => import('../GoogleMapEmbed'), { ssr: false });

interface mapProps {
  center: { lat: number, lng: number };
  locations: psiMapLocation[];
  selectedLocation: psiMapLocation | null;
  onMapLoad: (map: google.maps.Map) => void;
}

export default function Map({ center, locations, selectedLocation, onMapLoad }: mapProps) {
  return (
    <GoogleMapEmbedNoSSR
      center={center}
      locations={locations}
      selectedLocation={selectedLocation}
      onMapLoad={onMapLoad}
    />
  )
}