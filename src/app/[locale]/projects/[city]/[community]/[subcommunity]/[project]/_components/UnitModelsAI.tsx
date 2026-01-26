// components/UnitModelsAI.tsx
'use client'
import React, { useState, useEffect } from "react";
import { useFormatter, useTranslations } from 'next-intl';
import MainNavbarHeaderAI from "@/app/[locale]/_components/MainNavbarHeaderAI";
import MainNavbarContentEmpty from "@/app/[locale]/_components/MainNavbarContentEmpty";
import GalleryImages from "@/app/[locale]/_components/tools/GalleryImages";
import FancyboxWrapper from "@/app/[locale]/_components/tools/FancyboxWrapper";
import Image from "next/image";
import { Bath, Car, Maximize, Home, Shirt, User, ChevronDown, ChevronUp } from "lucide-react";

const UnitModelsAI = (props: any) => {
    const t = useTranslations('ProjectPage');
    const format = useFormatter();
    const [visibleTab1, setVisibleTab1] = useState(0);

    const currentOptions = props.data?.[visibleTab1]?.options || [];

    const [showAll, setShowAll] = useState(false);

    // Reset to collapsed view when switching categories
    useEffect(() => {
        setShowAll(false);
    }, [visibleTab1]);

    const displayedOptions = showAll ? currentOptions : currentOptions.slice(0, 8);

    // Helper specific logic to hide/show fields globally for the current tab
    // If ANY item in the list has a value for a field, we show it (to be consistent), 
    // or we can show/hide per card. The original table logic hid the COLUMN if all values were 0 or empty.
    // Let's stick to the original logic: check if the set of values for the whole tab has anything meaningful.
    const uniqueBathrooms = [...new Set(currentOptions.map((item: any) => item.bathrooms))];
    const showBathrooms = !(uniqueBathrooms.length <= 1 && uniqueBathrooms[0] == '0');

    const uniqueLaundry = [...new Set(currentOptions.map((item: any) => item.laundryRoomNo))];
    const showLaundry = !(uniqueLaundry.length <= 1 && uniqueLaundry[0] == '0');

    const uniqueMaids = [...new Set(currentOptions.map((item: any) => item.maidsRoomNo))];
    const showMaids = !(uniqueMaids.length <= 1 && uniqueMaids[0] == '0');

    const uniqueParking = [...new Set(currentOptions.map((item: any) => item.parkingNo))];
    const showParking = !(uniqueParking.length <= 1 && uniqueParking[0] == '0');

    return (
        <div className="container mx-auto py-12">
            <h2 className="text-3xl font-bold text-[#111954] mb-8 relative inline-block">
                {t("unit_models")}
                <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#111954]/20 rounded-full"></span>
            </h2>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
                <MainNavbarHeaderAI
                    data={props.data}
                    visibleTab={visibleTab1}
                    setVisibleTab={setVisibleTab1}
                />

                <div className="mt-8">
                    <MainNavbarContentEmpty data={props.data} visibleTab={visibleTab1} >
                        {currentOptions.length !== 0 ? (
                            <GalleryImages
                                options={{
                                    Carousel: { infinite: false },
                                }}
                            >
                                <FancyboxWrapper>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {displayedOptions.map((page: any, index: any) => (
                                            <div
                                                key={index}
                                                className="group bg-white rounded-2xl border border-gray-100 hover:border-[#111954]/20 transition-all duration-300 hover:shadow-lg overflow-hidden flex flex-col"
                                            >
                                                {/* Image Section */}
                                                <div className="relative aspect-[4/3] bg-gray-50 p-4 flex items-center justify-center overflow-hidden">
                                                    {page.floorPlanlImage ? (
                                                        <a
                                                            title={`floorplan ${page.modelName}`}
                                                            data-fancybox="floorplan"
                                                            href={page.floorPlanlImage}
                                                            className="block w-full h-full relative cursor-zoom-in"
                                                        >
                                                            <Image
                                                                layout="fill"
                                                                className="object-contain transition-transform duration-500 group-hover:scale-105"
                                                                src={page.floorPlanlImage.replace('?width=0&height=0', '?width=600&height=600')}
                                                                alt={page.modelName}
                                                                title={page.modelName}
                                                            />
                                                            <div className="absolute inset-0 bg-[#111954]/0 group-hover:bg-[#111954]/5 transition-colors duration-300" />
                                                        </a>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                                            <Home size={40} strokeWidth={1.5} />
                                                            <span className="text-xs mt-2">No Floorplan Image</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Content Section */}
                                                <div className="p-5 flex flex-col flex-grow">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div>
                                                            <h3 className="text-lg font-bold text-[#111954] line-clamp-1" title={page.modelName}>
                                                                {page.modelName}
                                                            </h3>
                                                            {page.unitType && page.unitType !== 'UnitType' && (
                                                                <p className="text-sm text-gray-500 mt-1">{page.unitType}</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="mt-auto space-y-3">
                                                        {/* Specs Grid */}
                                                        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-600">
                                                            {/* Area */}
                                                            {page.area && page.area != 0 ? (
                                                                <div className="flex items-center gap-2" title="Total Area">
                                                                    <Maximize size={16} className="text-[#111954]/60" />
                                                                    <span className="font-medium">{format.number(page.area)}<sup>sqft</sup></span>
                                                                </div>
                                                            ) : null}

                                                            {/* Bathrooms */}
                                                            {showBathrooms && (page.bathrooms && page.bathrooms !== '0') && (
                                                                <div className="flex items-center gap-2" title="Bathrooms">
                                                                    <Bath size={16} className="text-[#111954]/60" />
                                                                    <span>{page.bathrooms} Baths</span>
                                                                </div>
                                                            )}

                                                            {/* Parkings */}
                                                            {showParking && (page.parkingNo && page.parkingNo !== '0') && (
                                                                <div className="flex items-center gap-2" title="Parking Spaces">
                                                                    <Car size={16} className="text-[#111954]/60" />
                                                                    <span>{page.parkingNo} Parking</span>
                                                                </div>
                                                            )}

                                                            {/* Maids Room */}
                                                            {showMaids && (page.maidsRoomNo && page.maidsRoomNo !== '0') && (
                                                                <div className="flex items-center gap-2" title="Maids Room">
                                                                    <User size={16} className="text-[#111954]/60" />
                                                                    <span>Maids Room</span>
                                                                </div>
                                                            )}

                                                            {/* Laundry Room */}
                                                            {showLaundry && (page.laundryRoomNo && page.laundryRoomNo !== '0') && (
                                                                <div className="flex items-center gap-2" title="Laundry Room">
                                                                    <Shirt size={16} className="text-[#111954]/60" />
                                                                    <span>Laundry</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </FancyboxWrapper>

                                {currentOptions.length > 8 && (
                                    <div className="mt-8 flex justify-center">
                                        <button
                                            onClick={() => setShowAll(!showAll)}
                                            className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-white border border-[#111954]/10 rounded-full text-[#111954] font-medium hover:bg-[#111954]/5 transition-colors duration-300"
                                        >
                                            {showAll ? (
                                                <>
                                                    Show Less
                                                    <ChevronUp size={18} />
                                                </>
                                            ) : (
                                                <>
                                                    View All ({currentOptions.length})
                                                    <ChevronDown size={18} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </GalleryImages>
                        ) : (
                            <div className="py-12 text-center text-gray-400">
                                <Home size={48} className="mx-auto mb-4 opacity-20" />
                                <p>No unit models available for this category.</p>
                            </div>
                        )}
                    </MainNavbarContentEmpty>
                </div>
            </div>
        </div>
    );
}

export default UnitModelsAI;
