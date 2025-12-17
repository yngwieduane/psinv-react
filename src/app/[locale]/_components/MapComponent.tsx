"use client";

import Image from "next/image";
import { useMemo } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { CustomAdvancedMarker } from "./CustomAdvancedMarker";

interface MapComponentProps {
  latitude?: any;
  longitude?: any;
  fallbackImage: string; // must be like "/images/psi-headoffice.webp"
  height: string;        // e.g. "500px"
  data?: any;
}

const MapComponent: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  fallbackImage,
  height,
}) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API; // keep your env name

  const coords = useMemo(() => {
    const lat = Number.parseFloat(String(latitude));
    const lng = Number.parseFloat(String(longitude));
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    return { lat, lng };
  }, [latitude, longitude]);

  // Make fallbackImage safe even if someone passes "images/.."
  const safeFallbackSrc = fallbackImage?.startsWith("/")
    ? fallbackImage
    : `/${fallbackImage}`;

  // ✅ No key OR invalid coords → show fallback image and avoid Google Maps errors
  if (!apiKey || !coords) {
    return (
      <div className="relative w-full rounded-lg overflow-hidden" style={{ height }}>
        <Image
          fill
          src={safeFallbackSrc}
          alt="Map preview"
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-lg overflow-hidden" style={{ height }}>
      <APIProvider apiKey={apiKey} libraries={["marker"]}>
        <Map
          mapId="49ae42fed52588c3"
          mapTypeId="roadmap"
          style={{ width: "100%", height: "100%" }}
          defaultCenter={coords}
          defaultZoom={12}
        >
          <CustomAdvancedMarker
            realEstateListing={{ latitude, longitude, fallbackImage: safeFallbackSrc }}
          />
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
