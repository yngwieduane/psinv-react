'use client';
import { useState } from "react";
import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";
import UnitsList from "./UnitsList";
import UnitsSidebar from "./UnitsSidebar";
import Search from "./Search";
import UnitsSideSearch from "./UnitsSideSearch";
import { ChevronDown, Filter, LayoutGrid, MapIcon, X } from "lucide-react";
import UnitsMapBox from "./UnitsMapBox";

export default function UnitsPageAI(props: any) {
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [activeSort, setActiveSort] = useState('Featured');
    const [showFilters, setShowFilters] = useState(false);
    const unitid = props.unitid || '';
    const category = props.category || '';
    const currentPage = Number(props.page) || 1;
    const propertyId = props.propertyId || '';
    const beds = props.beds || '';

    return (
        <div className="bg-gray-50 min-h-screen pt-32">
            <div className="hidden">
                <Breadcrumb />
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

                <div className="grid grid-cols-4 gap-4 mainuppper relative">
                    {viewMode === 'list' && (
                        <>
                            <div className="col-span-4 relative z-50">
                                <Search placeholder="Search by Reference ID" />
                            </div>
                            <div className="col-span-4 md:col-span-3">
                                <div className="mt-0 space-y-5 lg:mt-2 lg:space-y-5">
                                    <UnitsList unitid={unitid} category={category} propertyId={propertyId} beds={beds} currentPage={currentPage} />
                                </div>
                            </div>
                            <div className="hidden md:flex mt-16 space-y-10 lg:mt-2 lg:space-y-5 mainsidebar">
                                <div className="grid grid-cols-1">
                                    <UnitsSideSearch onChange='' />
                                    <button className="w-100 "></button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Full Screen Map Modal */}
            {viewMode === 'map' && (
                <div className="fixed inset-0 z-[100] bg-white flex flex-col advanced-marker-example">
                    {/* Floating Header */}
                    {/* Centered Search Bar */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-50 pointer-events-none">
                        <div className="shadow-lg rounded-xl overflow-hidden pointer-events-auto">
                            <div className="bg-white/90 backdrop-blur-md border border-gray-200 p-2">
                                <Search placeholder="Search units..." />
                            </div>
                        </div>
                    </div>

                    {/* Top Right Controls */}
                    <div className="absolute top-4 right-4 z-50 flex items-start gap-4 pointer-events-none">
                        <div className="flex items-center gap-4 pointer-events-auto">
                            {/* Filters Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`h-[58px] px-4 rounded-xl flex items-center gap-2 font-bold shadow-lg transition-colors ${showFilters ? 'bg-primary text-white' : 'bg-white/90 backdrop-blur-md text-gray-800 border border-gray-200 hover:bg-gray-50'}`}
                            >
                                <Filter size={20} />
                                <span className="hidden md:inline">Filters</span>
                            </button>

                            {/* View Toggle */}
                            <div className="h-[58px] bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl p-1 flex items-center shadow-lg">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className="h-full px-4 rounded-lg text-gray-400 hover:bg-gray-50 flex items-center justify-center transition-colors"
                                >
                                    <LayoutGrid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('map')}
                                    className="h-full px-4 rounded-lg bg-primary text-gray-800 shadow-sm flex items-center justify-center font-bold"
                                >
                                    <MapIcon size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Collapsible Filters Panel (Floating under controls) */}
                        {showFilters && (
                            <div className="absolute top-[68px] right-0 w-80 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl p-4 pointer-events-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-lg">Filters</h3>
                                    <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
                                        <X size={20} />
                                    </button>
                                </div>
                                <UnitsSideSearch onChange='' />
                            </div>
                        )}
                    </div>



                    <div className="w-full h-full relative">
                        <UnitsMapBox unitid={unitid} category={category} propertyId={propertyId} beds={beds} />
                    </div>
                </div>
            )}
        </div>
    );
}