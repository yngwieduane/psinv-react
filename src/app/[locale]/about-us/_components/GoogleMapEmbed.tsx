'use client';

import { ContactLocation, contactLocations } from "@/data/contactLocations";
import { useMemo } from "react";

interface Props {
    cityName: string;
    locations?: ContactLocation[];
    zoom?: number;
}

export default function GoogleMapEmbed({ cityName, locations = contactLocations, zoom = 12 }: Props) {
    const filteredLocations = useMemo(() => {
        return (locations || []).filter(
          (loc) => loc.address_city?.toLowerCase() === cityName?.toLowerCase()
        );
      }, [cityName, locations]);

    const baseCityQuery = encodeURIComponent(cityName);

    const markersQuery = filteredLocations
    .map((loc) => `${loc.latitude},${loc.longitude}`)
    .join('|');

    const src = `https://maps.google.com/maps?&q=${baseCityQuery}&markers=${markersQuery}&z=${zoom}&output=embed`;

  return (
    <div className="w-full h-[600px]">
      <iframe
        src={src}
        width="100%"
        height="100%"
        loading="lazy"
        style={{ border: 0 }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
