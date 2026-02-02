'use client';
import { useState, useEffect, useRef } from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { MapPin, BedDouble, ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { generateSeoData } from "../../_components/functions/generateSeoData";
import { useSearchParams } from "next/navigation";
import { UnitListing } from "@/types/types";
import PriceConvert from '../../_components/tools/PriceConvert';
import { UnitsMapMarker } from '../../_components/UnitsMapMarker';
import PreviewModal from './PreviewModal';

interface UnitsMapBoxProps {
    // We can accept props if passed from parent, but standard practice here seems to be reading search params
}

const UnitsMapBox = (props: any) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API;
    const defaultCenter = { lat: 24.4539, lng: 54.3773 }; // Abu Dhabi default
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [mapZoom, setMapZoom] = useState(10);
    const [data, setData] = useState<UnitListing[]>([]);
    const [loading, setLoading] = useState(false);
    const [previewProperty, setPreviewProperty] = useState<UnitListing | null>(null);
    const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

    useEffect(() => {
        if (selectedId) {
            const element = itemRefs.current.get(selectedId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [selectedId]);

    const searchParams = useSearchParams();
    const unitid = searchParams.get('unitid') || props.unitid || '';
    const category = searchParams.get('category') || props.category || '';
    const propertyId = searchParams.get('propertyId') || props.propertyId || '';
    const beds = searchParams.get('beds') || props.beds || '';

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const p1 = fetch(`/api/external/units?propertyId=${propertyId}&category=${category}&beds=${beds}`)
                    .then(res => res.ok ? res.json() : [])
                    .then(data => data.map((item: any) => ({ ...item, source: 'main' })))
                    .catch(err => {
                        console.error("Units API failed", err);
                        return [];
                    });

                const p2 = fetch(`/api/external/unitsAssets?propertyId=${propertyId}&category=${category}&beds=${beds}`)
                    .then(res => res.ok ? res.json() : [])
                    .then(data => data.map((item: any) => ({ ...item, source: 'assets' })))
                    .catch(err => {
                        console.error("UnitsAssets API failed", err);
                        return [];
                    });

                const [data1, data2] = await Promise.all([p1, p2]);
                setData([...data1, ...data2]);
            } catch (error) {
                console.error("API fetch failed", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [unitid, category, propertyId, beds]);


    // Calculate initial center based on first property with coordinates
    useEffect(() => {
        let map, coordinates;
        const firstWithCoords = data.slice(0, 11).find(item => item.pro_google_coordinates);
        if (firstWithCoords) {
            map = firstWithCoords.pro_google_coordinates;
            {
                map !== null
                    ? coordinates = map.split(",")
                    : coordinates = '';
            }
            const lat = parseFloat(coordinates[1]);
            const lng = parseFloat(coordinates[0]);
            if (!isNaN(lat) && !isNaN(lng)) {
                setMapCenter({ lat, lng });
            }
        }
    }, [data]);

    const handleSelectProperty = (property: any) => {
        setSelectedId(String(property.code || property.id)); // Adjust based on actual ID field
        let map, coordinates;
        map = property.pro_google_coordinates;
        {
            map !== null
                ? coordinates = map.split(",")
                : coordinates = '';
        }
        const lat = parseFloat(coordinates[1]);
        const lng = parseFloat(coordinates[0]);
        if (!isNaN(lat) && !isNaN(lng)) {
            setMapCenter({ lat, lng });
            setMapZoom(14);
        }
    };

    const handlePreview = (unit: any) => {
        setPreviewProperty(unit);
        // You might want to close the info window when preview is opened?
        // setSelectedId(null); 
    };

    if (!apiKey) {
        return <div className="p-4 text-center text-red-500">Google Maps API Key is missing.</div>;
    }

    return (
        <div className="w-full h-full relative overflow-hidden bg-white">
            {/* Floating Property List */}
            <div className="absolute top-4 left-4 w-96 max-h-[calc(100%-32px)] overflow-y-auto z-10 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg flex flex-col transition-all duration-300">
                <div className="p-4 space-y-3">
                    {loading && <div className="text-center p-4">Loading units...</div>}
                    {!loading && data && data.slice(0, 11).map((unit: any, index: number) => {
                        const isSelected = (selectedId === String(unit.code || unit.id));

                        // Image Handling
                        let imageUrl = '/images/placeholder.jpg';
                        if (unit.imageurl) {
                            const images = unit.imageurl.split('|');
                            if (images.length > 0 && images[0]) {
                                imageUrl = images[0];
                            }
                        }

                        return (
                            <div
                                key={index}
                                ref={(el) => {
                                    const id = String(unit.code || unit.id);
                                    if (el) itemRefs.current.set(id, el);
                                    else itemRefs.current.delete(id);
                                }}
                                onClick={() => handleSelectProperty(unit)}
                                className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border ${isSelected
                                    ? 'bg-white border-secondary shadow-md ring-1 ring-secondary'
                                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                    }`}
                            >
                                <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-200">
                                    <img
                                        src={imageUrl}
                                        alt={unit.propertyname || 'Unit'}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col justify-between flex-1 min-w-0">
                                    <div>
                                        <h4 className={`font-bold text-sm line-clamp-2 mb-1 ${isSelected ? 'text-secondary' : 'text-gray-800'}`}>
                                            {unit.propertyname}
                                        </h4>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
                                            <MapPin size={12} /> {unit.community}
                                        </p>
                                    </div>

                                    <div className="flex items-end justify-between mt-2">
                                        {unit.bedrooms && (
                                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                                <BedDouble size={14} />
                                                <span>{unit.bedrooms}</span>
                                            </div>
                                        )}
                                        <div className="text-xs font-bold text-primary">
                                            {unit.sellprice ? <PriceConvert price={unit.sellprice} minDecimal='0' /> : unit.rent ? <PriceConvert price={unit.rent} minDecimal='0' /> : 'Price on Request'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {!loading && (!data || data.length === 0) && (
                        <div className="p-8 text-center text-gray-500 text-sm">No units found.</div>
                    )}
                </div>
            </div>

            {/* Full Width Map */}
            <div className="w-full h-full absolute top-0 left-0 bg-gray-100">
                <APIProvider apiKey={apiKey} libraries={['marker']}>
                    <GoogleMap
                        mapId="units-map-box"
                        center={mapCenter}
                        zoom={mapZoom}
                        onCenterChanged={(ev) => setMapCenter(ev.detail.center)}
                        onZoomChanged={(ev) => setMapZoom(ev.detail.zoom)}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                        className="w-full h-full"
                    >
                        {data && data.slice(0, 11).map((unit: any, index: number) => {
                            let map, coordinates;
                            map = unit.pro_google_coordinates;
                            {
                                map !== null
                                    ? coordinates = map.split(",")
                                    : coordinates = '';
                            }
                            const lat = parseFloat(coordinates[1]);
                            const lng = parseFloat(coordinates[0]);
                            if (isNaN(lat) || isNaN(lng)) return null;

                            const isSelected = (selectedId === String(unit.code || unit.id));

                            return (
                                <UnitsMapMarker
                                    key={index}
                                    realEstateListing={{ latitude: String(lat), longitude: String(lng), fallbackImage: unit.fallbackImage }}
                                    unit={unit}
                                    onClick={() => handleSelectProperty(unit)}
                                    onClose={() => setSelectedId(null)}
                                    isSelected={isSelected}
                                    onPreview={handlePreview}
                                />
                            );
                        })}


                    </GoogleMap>
                </APIProvider>
            </div>

            {/* Preview Modal */}
            {previewProperty && (
                <PreviewModal
                    property={previewProperty}
                    onClose={() => setPreviewProperty(null)}
                    onViewDetails={() => { }} // Not strictly needed inside modal unless modal uses it
                />
            )}
        </div>
    );
};

export default UnitsMapBox;
