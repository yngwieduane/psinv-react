"use client";

import Image from "next/image";
import { useState } from "react";
import {APIProvider, Map} from '@vis.gl/react-google-maps';

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
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string}>
          <Map
            style={{width: '100vw', height: '100vh'}}
            defaultCenter={{lat: latitude, lng: longitude}}
            defaultZoom={12}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          />
        </APIProvider>
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