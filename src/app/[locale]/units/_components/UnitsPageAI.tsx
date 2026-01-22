'use client';
import { useState } from "react";
import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";
import UnitsList from "./UnitsList";
import UnitsSidebar from "./UnitsSidebar";
import Search from "./Search";
import UnitsSideSearch from "./UnitsSideSearch";
import { ChevronDown, Filter, LayoutGrid, MapIcon, X } from "lucide-react";
import UnitsMapBox from "./UnitsMapBox";
import { Dialog, DialogPanel } from '@headlessui/react'
import UnitsSideSearchMapView from "./UnitsSideSearchMapView";

export default function UnitsPageAI(props: any) {
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [activeSort, setActiveSort] = useState('Featured');
    const [showFilters, setShowFilters] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
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
                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setMobileFiltersOpen(true)}
                            className="md:hidden bg-white border border-gray-200 rounded-lg p-2 text-gray-700 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <Filter size={18} />
                        </button>

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

                        <div className="hidden items-center gap-2">
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
                    {/* Top Right Controls */}
                    <div className="absolute top-4 right-4 z-50 flex items-start gap-4 pointer-events-none">
                        <div className="flex items-center bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-1 gap-2 pointer-events-auto h-[58px]">

                            {/* Filters Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`cursor-pointer h-full px-4 rounded-lg flex items-center gap-2 font-bold transition-colors ${showFilters ? 'bg-gray-200 text-gray-700' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                <Filter size={20} />
                                <span className="hidden md:inline">Filters</span>
                            </button>

                            <div className="w-px h-8 bg-gray-200" />

                            {/* View Toggle */}
                            <div className="flex items-center h-full">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className="cursor-pointer h-full px-4 rounded-lg text-gray-400 hover:text-gray-800 flex items-center justify-center transition-colors hover:bg-gray-50"
                                >
                                    <LayoutGrid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('map')}
                                    className="cursor-pointer h-[42px] px-4 rounded-lg bg-primary text-gray-800 shadow-sm flex items-center justify-center font-bold my-1 mr-1"
                                >
                                    <MapIcon size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Collapsible Filters Panel (Floating under controls) */}
                        {showFilters && (
                            <div className="absolute top-[68px] right-0 w-80 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl p-4 pointer-events-auto">
                                <div className="absolute top-2 right-2 z-10">
                                    <button onClick={() => setShowFilters(false)} className="cursor-pointer text-gray-500 hover:text-gray-700">
                                        <X size={20} />
                                    </button>
                                </div>
                                <UnitsSideSearchMapView onChange='' />
                            </div>
                        )}
                    </div>



                    <div className="w-full h-full relative">
                        <UnitsMapBox unitid={unitid} category={category} propertyId={propertyId} beds={beds} />
                    </div>
                </div>
            )}

            {/* Mobile Filter Modal */}
            <Dialog
                open={mobileFiltersOpen}
                as="div"
                className="relative z-[100] focus:outline-none"
                onClose={setMobileFiltersOpen}
                transition
            >
                <div className="fixed inset-0 bg-black/25 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0" />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                        >
                            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                                <h3 className="text-lg font-bold text-[#353455]">Filters</h3>
                                <button onClick={() => setMobileFiltersOpen(false)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>
                            <div className="max-h-[70vh] overflow-y-auto custom-scrollbar no-sticky-impact">
                                <UnitsSideSearch onChange={() => { }} />
                            </div>
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="w-full py-3 bg-primary text-gray-900 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all"
                                >
                                    Show Results
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div >
    );
}