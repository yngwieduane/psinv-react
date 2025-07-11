"use client";

import Image from "next/image";
import { useState } from "react";
import { MapProvider } from "../../../../providers/map-providers";
import { MapContent } from "./MapContent";

interface MapComponentProps {
  latitude?: number;
  longitude?: number;
  fallbackImage: string;
  height: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude, fallbackImage,height }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="mapSection w-full h-full rounded-lg overflow-hidden">
      {latitude && longitude && !hasError ? (
        <MapProvider>
          <MapContent latitude={latitude} longitude={longitude}/>
        </MapProvider>
      ) : (
        <Image
          width={200}
          height={200}
          src={fallbackImage}
          alt="Fallback Map"
          className="w-full h-auto rounded-lg"
        />
      )}
    </div>
  );
};

export default MapComponent;