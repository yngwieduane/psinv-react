'use client'
import { GoogleMap, MarkerF } from "@react-google-maps/api";

export const defaultMapContainerStyle = {
    width: '100%',
    height: '100vh',
    borderRadius: '0px 0px 0px 0px',
};

const MapContent = ({latitude,longitude}:{latitude:any,longitude:any}) => {
    const defaultMapZoom = 13
    const defaultMapCenter = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    }
    const defaultMapOptions = {
        zoomControl: true,
        tilt: 0,
        gestureHandling: 'auto',
        mapTypeId: 'map',
    };
    return (
        <div className="w-full">
            <GoogleMap
                mapContainerStyle={defaultMapContainerStyle}
                center={defaultMapCenter}
                zoom={defaultMapZoom}
                options={defaultMapOptions}>
                    <MarkerF position={defaultMapCenter} icon="/map.svg"/>
            </GoogleMap>
        </div>
    )
};

export { MapContent };