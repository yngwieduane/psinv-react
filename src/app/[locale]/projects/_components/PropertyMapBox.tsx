'use client';
import { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap, InfoWindow } from '@vis.gl/react-google-maps';
import { MapPin, BedDouble, ArrowRight, Home } from 'lucide-react';
import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import slugify from 'react-slugify';

interface PropertyMapBoxProps {
    data: any[];
}

const PropertyMapBox = ({ data }: PropertyMapBoxProps) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;
    const defaultCenter = { lat: 24.4539, lng: 54.3773 }; // Abu Dhabi default
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [mapZoom, setMapZoom] = useState(10);
    const [imgError, setImgError] = useState(false);


    useEffect(() => {
        setImgError(false);
    }, [data]);


    // Calculate initial center based on first property
    useEffect(() => {
        if (data && data.length > 0 && data[0].mapLatitude && data[0].mapLongitude) {
            const lat = parseFloat(data[0].mapLatitude);
            const lng = parseFloat(data[0].mapLongitude);
            if (!isNaN(lat) && !isNaN(lng)) {
                setMapCenter({ lat, lng });
            }
        }
    }, [data]);

    const handleSelectProperty = (property: any) => {
        setSelectedId(property.propertyID);
        const lat = parseFloat(property.mapLatitude);
        const lng = parseFloat(property.mapLongitude);
        if (!isNaN(lat) && !isNaN(lng)) {
            setMapCenter({ lat, lng });
            setMapZoom(14); // Zoom in when selected
        }
    };


    if (!apiKey) {
        return <div className="p-4 text-center text-red-500">Google Maps API Key is missing.</div>;
    }

    return (
        <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white grid grid-cols-1 lg:grid-cols-3 dark:border-gray-700">
            {/* Left Column: Property List */}
            <div className="h-full overflow-y-auto border-r border-gray-100 bg-gray-50/50 dark:bg-gray-800">
                <div className="p-4 space-y-3">
                    {data && data.map((property, index) => {
                        const isSelected = selectedId === property.propertyID;
                        // const imgFeatured = property.featuredImages && property.featuredImages.length > 0
                        //     ? property.featuredImages[0].imageURL
                        //     : '/images/placeholder.jpg'; // You might want a better fallback
                        const rawUrl = property.featuredImages?.[0]?.imageURL;
                        const isValidUrl = rawUrl &&
                            typeof rawUrl === "string" &&
                            rawUrl.trim() !== "" &&
                            rawUrl !== "null" &&
                            rawUrl !== "undefined";

                        const imgFeatured = isValidUrl
                            ? rawUrl.replace("?width=0&height=0", "?width=400&height=300")
                            : "";

                        const hasImage = !imgError && isValidUrl;

                        return (
                            <div
                                key={index}
                                onClick={() => handleSelectProperty(property)}
                                className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border dark:border-gray-700 dark:bg-gray-800 ${isSelected
                                    ? 'bg-white border-secondary shadow-md ring-1 ring-secondary dark:bg-secondary dark:border-secondary'
                                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800'
                                    }`}
                            >
                                <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-200 ">
                                    {hasImage ? (
                                        <Image
                                            src={imgFeatured}
                                            alt={imgFeatured}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            width={300}
                                            height={200}
                                            onError={() => setImgError(true)}
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full bg-gray-50 dark:bg-gray-700">
                                            <Home size={40} strokeWidth={1.5} />
                                            <span className="text-xs mt-2">No Available Image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col justify-between flex-1 min-w-0">
                                    <div>
                                        <h4 className={`font-bold text-sm line-clamp-2 mb-1 ${isSelected ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
                                            {property.propertyName}
                                        </h4>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 truncate dark:text-gray-200">
                                            <MapPin size={12} /> {property.community}
                                        </p>
                                        <p className="text-xs font-bold py-1 mt-2 dark:text-gray-200">
                                            {property.propertyPlan}
                                        </p>
                                    </div>

                                    <div className="flex items-end justify-between mt-2">
                                        {property.availableBedrooms && property.availableBedrooms.length > 0 && (
                                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                                <BedDouble size={14} />
                                                <span>{property.availableBedrooms.map((b: any) => b.noOfBedroom).join(', ')}</span>
                                            </div>
                                        )}
                                        {/* You can add Price here if available in data */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {!data || data.length === 0 && (
                        <div className="p-8 text-center text-gray-500 text-sm">No properties to display.</div>
                    )}
                </div>
            </div>

            {/* Right Column: Map */}
            <div className="lg:col-span-2 h-full relative">
                <APIProvider apiKey={apiKey} libraries={['marker']}>
                    <Map
                        mapId="property-map-box"
                        center={mapCenter}
                        zoom={mapZoom}
                        onCenterChanged={(ev) => setMapCenter(ev.detail.center)}
                        onZoomChanged={(ev) => setMapZoom(ev.detail.zoom)}
                        gestureHandling={'greedy'}
                        disableDefaultUI={false}
                        className="w-full h-full"
                    >
                        {data && data.map((property, index) => {
                            const lat = parseFloat(property.mapLatitude);
                            const lng = parseFloat(property.mapLongitude);
                            if (isNaN(lat) || isNaN(lng)) return null;

                            const isSelected = selectedId === property.propertyID;

                            return (
                                <AdvancedMarker
                                    key={index}
                                    position={{ lat, lng }}
                                    title={property.propertyName}
                                    zIndex={isSelected ? 100 : 1}
                                    onClick={() => handleSelectProperty(property)}
                                >
                                    <Pin
                                        background={isSelected ? '#EC5E2A' : '#111954'} // Secondary color for selected
                                        glyphColor={isSelected ? '#FFF' : '#FFF'}
                                        borderColor={'#FFF'}
                                        scale={isSelected ? 1.2 : 1.0}
                                    />
                                </AdvancedMarker>
                            );
                        })}
                        {selectedId && (() => {
                            const selectedProperty = data.find(p => p.propertyID === selectedId);
                            if (!selectedProperty) return null;

                            const lat = parseFloat(selectedProperty.mapLatitude);
                            const lng = parseFloat(selectedProperty.mapLongitude);

                            if (isNaN(lat) || isNaN(lng)) return null;


                            const subCommunity = selectedProperty.subCommunity ? selectedProperty.subCommunity : "n-a";
                            const url = '/projects/' + slugify(selectedProperty.city) + "/" + slugify(selectedProperty.community) + "/" + slugify(subCommunity) + "/" + slugify(selectedProperty.propertyName);

                            return (
                                <InfoWindow
                                    position={{ lat, lng }}
                                    pixelOffset={[0, -30]}
                                    onCloseClick={() => setSelectedId(null)}
                                >
                                    <div className="w-[200px] p-1">
                                        <div className="relative w-full h-[120px] rounded-md overflow-hidden bg-gray-200 mb-2">
                                            <Image
                                                src={selectedProperty.featuredImages && selectedProperty.featuredImages.length > 0 ? selectedProperty.featuredImages[0].imageURL : '/images/placeholder.jpg'}
                                                alt={selectedProperty.propertyName}
                                                fill
                                                className="object-cover"
                                            />
                                            <p className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm backdrop-blur-sm">
                                                {selectedProperty.propertyPlan}
                                            </p>
                                        </div>
                                        <h3 className="text-sm font-bold text-gray-900 mb-1">{selectedProperty.propertyName}</h3>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                                            <MapPin size={10} /> {selectedProperty.community}
                                        </p>
                                        <Link
                                            href={url}
                                            className="block w-full py-2 bg-primary text-white text-center text-xs font-bold rounded hover:bg-primary/90 transition-colors cursor-pointer"
                                        >
                                            View Project
                                        </Link>
                                    </div>
                                </InfoWindow>
                            );
                        })()}
                    </Map>
                </APIProvider>
            </div>
        </div>
    );
};

export default PropertyMapBox;
