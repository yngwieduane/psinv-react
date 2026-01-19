import React, { FunctionComponent, useState } from 'react';
import { AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { MapPin } from 'lucide-react';
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
                >
                    <div className="w-[220px] p-1">
                        <div className="relative w-full h-[120px] rounded-md overflow-hidden bg-gray-200 mb-2">
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
                                        className="w-full h-full object-cover"
                                    />
                                );
                            })()}
                        </div>
                        <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">{unit.propertyname}</h3>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                            <MapPin size={10} /> {unit.community}
                        </p>
                        <p className="text-sm font-bold text-primary mb-3">
                            {unit.sellprice ? <PriceConvert price={unit.sellprice} minDecimal='0' /> : unit.rent ? <PriceConvert price={unit.rent} minDecimal='0' /> : 'Price on Request'}
                        </p>

                        <div className="flex gap-2">
                            {(() => {
                                // SEO Data Generation for Link
                                const adType = unit.sellprice ? "Sale" : "Rent";
                                const propertyData = {
                                    bedrooms: unit.bedrooms,
                                    propertyType: unit.category,
                                    adType: adType,
                                    name: unit.propertyname,
                                    community: unit.community,
                                    emirate: unit.city_name,
                                    refNo: unit.refNo,
                                    code: unit.code,
                                    seoStart: "",
                                };
                                const seoData = generateSeoData(propertyData);
                                return (
                                    <button
                                        onClick={() => onPreview?.(unit)}
                                        className="cursor-pointer flex-1 block py-2 bg-black text-white text-center text-xs font-bold rounded hover:bg-primary/90 transition-colors"
                                    >
                                        Preview
                                    </button>
                                );
                            })()}
                        </div>
                    </div>
                </InfoWindow>
            )}
        </>
    );
};
