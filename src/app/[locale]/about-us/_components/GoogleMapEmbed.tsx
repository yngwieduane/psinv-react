'use client';

import { useEffect, useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { ContactLocation } from "@/data/contactLocations";

interface GoogleMapEmbedProps {
  center: {lat: number, lng: number};
  locations: ContactLocation[];
  selectedLocation: ContactLocation | null;
  onMapLoad?: (map: google.maps.Map) => void;
  tabKey?: string;
}

export default function GoogleMapEmbed({ center, locations, selectedLocation, onMapLoad, tabKey }: GoogleMapEmbedProps) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyAL3vJzmlp-W6qUCjV7N75YFIwtQYH3s4I',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    onMapLoad?.(mapInstance);
  }, [onMapLoad]);

 useEffect(() => {
  if(map) {
    if(selectedLocation) {
      map.panTo({ lat: selectedLocation.latitude, lng: selectedLocation.longitude });
      map.setZoom(16);
    }
    else {
      map.panTo(center);
      map.setZoom(12);
    }
  }  
 }, [selectedLocation, center, map, tabKey]);

 if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "600px" }}
      center={center}
      zoom={12}
      onLoad={onLoad}
    >
      {locations.map((loc) => (
        <Marker 
        key={loc.id} 
        position={{lat: loc.latitude, lng:loc.longitude}} title={loc.name}
        icon={
          selectedLocation?.id === loc.id
            ? "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        }
        />
      ))}
      
    </GoogleMap>
  );
}