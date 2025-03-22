"use client";

import Image from "next/image";
import { useState } from "react";

interface MapComponentProps {
  latitude?: number;
  longitude?: number;
  fallbackImage: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude, fallbackImage }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-full h-100 rounded-lg overflow-hidden">
      {latitude && longitude && !hasError ? (
        <iframe
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`}
          width="100%"
          height="300px"
          style={{ borderRadius: "8px", border: "none" }}
          loading="lazy"
          onError={() => setHasError(true)}
        />
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