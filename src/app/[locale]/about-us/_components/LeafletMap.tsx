'use client'

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import { contactLocations, ContactLocation  } from '@/data/contactLocations';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix leaflet default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });

interface MapProps {
    latitude: number;
    longitude: number;
  }

function ChangeView({ center }: {center: [number, number] }) {
    const map = useMap();
    useEffect(()=> {
        map.setView(center, 10); //zoom level 10
    }, [center]);
    return null;
}

  export default function LeafletMap({ latitude, longitude }: MapProps) {
    const center : [number, number] = [latitude, longitude];

    return(
                
            <MapContainer center={center} zoom={10} scrollWheelZoom={false} 
            style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                    />
                    <ChangeView center={center} />

                    {contactLocations.map((location: ContactLocation, idx) => (
                        <Marker key={idx} position={[location.latitude, location.longitude]}>
                            <Popup>
                                <div className='text-sm'>
                                    <div>{location.name}</div>
                                    <p>{location.address}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
            </MapContainer>

        
    );
}