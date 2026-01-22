import React, { FunctionComponent, useState } from 'react';
import { AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { MapPin, BedDouble, Bath, Square, ChevronRight } from 'lucide-react';
import classNames from 'classnames';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { generateSeoData } from './functions/generateSeoData';

import './custom-advanced-marker.css';
import { RealEstateIcon } from '../../../../public/icons/real-estate-icon';
import { RealEstateListing } from '@/types/types';
import PriceConvert from './tools/PriceConvert';

interface Props {
    realEstateListing: RealEstateListing;
    unit: any;
    onClick?: () => void;
    onClose?: () => void;
    isSelected?: boolean;
    onPreview?: (unit: any) => void;
}

export const UnitsMapMarker: FunctionComponent<Props> = ({
    realEstateListing,
    unit,
    onClick,
    onClose,
    isSelected,
    onPreview
}) => {
    const [hovered, setHovered] = useState(false);

    const position = {
        lat: parseFloat(realEstateListing.latitude),
        lng: parseFloat(realEstateListing.longitude)
    };

    const renderCustomPin = () => {
        return (
            <>
                <div className={`custom-pin ${isSelected ? 'selected' : ''}`}>
                    <div className="image-container">
                        <span className="icon">
                            <RealEstateIcon />
                        </span>
                    </div>
                </div>
                <div className="tip" />
            </>
        );
    };

    return (
        <>
            <AdvancedMarker
                position={position}
                title={'AdvancedMarker with custom html content.'}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                zIndex={isSelected ? 100 : 1}
                className={classNames('real-estate-marker', { clicked: isSelected, hovered })}
                onClick={onClick}
            >
                {renderCustomPin()}
            </AdvancedMarker>
            {isSelected && (
                <InfoWindow
                    position={position}
                    pixelOffset={[0, -30]}
                    onCloseClick={onClose}
                    className="gm-style-iw-custom"
                >
                    <div className="w-[300px] bg-white rounded-xl overflow-hidden font-sans">
                        {/* Image Header with Price Overlay */}
                        <div className="relative h-[160px] w-full bg-gray-100 group">
                            {(() => {
                                let imageUrl = '/images/placeholder.jpg';
                                if (unit.imageurl) {
                                    const images = unit.imageurl.split('|');
                                    if (images.length > 0 && images[0]) {
                                        imageUrl = images[0];
                                    }
                                }
                                return (
                                    <img
                                        src={imageUrl}
                                        alt={unit.propertyname}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                );
                            })()}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent pointer-events-none" />

                            {/* Badges */}
                            <div className="absolute top-3 left-3 flex gap-2">
                                <span className="bg-secondary/90 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm">
                                    {unit.sellprice ? "For Sale" : "For Rent"}
                                </span>
                            </div>

                            {/* Price */}
                            <div className="absolute bottom-3 left-3 text-white">
                                <p className="text-lg font-bold font-serif leading-none shadow-black drop-shadow-md">
                                    {unit.sellprice ? <PriceConvert price={unit.sellprice} minDecimal='0' /> : unit.rent ? <PriceConvert price={unit.rent} minDecimal='0' /> : 'Price on Request'}
                                </p>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-4">
                            <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1 leading-tight" title={unit.propertyname}>
                                {unit.propertyname}
                            </h3>
                            <div className="flex items-center text-gray-500 text-xs mb-4">
                                <MapPin size={12} className="mr-1 text-secondary" />
                                <span className="truncate">{unit.community}</span>
                            </div>

                            {/* Specs Grid */}
                            <div className="flex items-center justify-between border-t border-gray-100 pt-3 mb-4">
                                <div className="flex items-center gap-1.5" title={`${unit.bedrooms} Bedrooms`}>
                                    <BedDouble size={16} className="text-gray-400" strokeWidth={1.5} />
                                    <span className="text-xs font-bold text-gray-700">{unit.bedrooms || 0}</span>
                                </div>
                                <div className="w-px h-8 bg-gray-100" />
                                <div className="flex items-center gap-1.5" title={`${unit.no_of_bathrooms} Bathrooms`}>
                                    <Bath size={16} className="text-gray-400" strokeWidth={1.5} />
                                    <span className="text-xs font-bold text-gray-700">{unit.no_of_bathrooms || 0}</span>
                                </div>
                                <div className="w-px h-8 bg-gray-100" />
                                <div className="flex items-center gap-1.5" title={`${unit.built_upArea} Sq.Ft`}>
                                    <Square size={16} className="text-gray-400" strokeWidth={1.5} />
                                    <span className="text-xs font-bold text-gray-700">
                                        {unit.built_upArea ? Math.round(unit.built_upArea).toLocaleString() : 0}
                                    </span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => onPreview?.(unit)}
                                className="w-full cursor-pointer py-2.5 bg-indigo-950 text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group shadow-sm hover:shadow-md"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </InfoWindow>
            )}
        </>
    );
};
