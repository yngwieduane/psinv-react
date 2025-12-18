'use client';
import { useState } from "react";
import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";
import UnitsList from "./UnitsList";
import UnitsSidebar from "./UnitsSidebar";
import Search from "./Search";
import UnitsSideSearch from "./UnitsSideSearch";
import { ChevronDown, LayoutGrid, MapIcon } from "lucide-react";

export default function UnitsPageAI(props: any) {
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [activeSort, setActiveSort] = useState('Featured');
    const unitid = props.unitid || '';
    const category = props.category || '';
    const currentPage = Number(props.page) || 1;
    const propertyId = props.propertyId || '';
    const beds = props.beds || '';

    return (
        <div className="bg-gray-50 min-h-screen pt-32">
            <div className="hidden">
                <Breadcrumb/>
            </div>
            <div className="mx-auto container mx-auto px-4 md:px-12 mt-8 pb-20">
                {/* Header */}
                <div className="flex justify-between items-end mb-6">
                    <h1 className="text-xl md:text-3xl text-gray-900 font-bold">Properties for Sale in Abu Dhabi</h1>
                    
                    <div className="flex items-center gap-4">
                        {/* View Toggle */}
                        <div className="bg-white border border-gray-200 rounded-lg p-1 flex shadow-sm">
                            <button 
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded cursor-pointer ${viewMode === 'list' ? 'bg-primary text-gray-800 shadow-sm' : 'text-gray-400 hover:bg-gray-50'}`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button 
                            onClick={() => setViewMode('map')}
                            className={`p-2 rounded cursor-pointer ${viewMode === 'map' ? 'bg-primary text-gray-800 shadow-sm' : 'text-gray-400 hover:bg-gray-50'}`}
                            >
                                <MapIcon size={18} />
                            </button>
                        </div>

                        <div className="hidden lg:flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-bold uppercase">Sort:</span>
                        <div className="relative">
                            <button className="flex items-center gap-1 text-sm font-bold text-primary cursor-pointer">
                                {activeSort} <ChevronDown size={14} />
                            </button>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mainuppper">
                    <div className="col-span-4">
                        <Search placeholder="Search by Reference ID"/>
                    </div>
                    <div className="col-span-4 md:col-span-3">
                        <div className="mt-0 space-y-5 lg:mt-2 lg:space-y-5">
                            {viewMode === 'list' ? (
                            <UnitsList unitid={unitid} category={category} propertyId={propertyId} beds={beds} currentPage={currentPage} />
                            ) : (
                            <div>
                                {/* Map View Component */}
                                <p>Map View is under construction.</p>
                            </div>
                            )}
                        </div>
                    </div>
                    <div className="hidden md:flex mt-16 space-y-10 lg:mt-2 lg:space-y-5 mainsidebar">
                        <div className="grid grid-cols-1">
                            <UnitsSideSearch onChange=''/>
                            <button className="w-100 "></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );  
}