'use client';
import { useState } from "react";
import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";
import UnitsList from "./UnitsList";
import UnitsSidebar from "./UnitsSidebar";
import Search from "./Search";
import UnitsSideSearch from "./UnitsSideSearch";
import SidebarListProperty from "./SidebarListProperty";
import { ChevronDown, Filter, LayoutGrid, MapIcon, X, Search as SearchIcon } from "lucide-react";
import UnitsMapBox from "./UnitsMapBox";
import { Dialog, DialogPanel } from '@headlessui/react'
import UnitsSideSearchMapView from "./UnitsSideSearchMapView";
import { useTranslations } from "next-intl";

export default function UnitsPageAI(props: any) {
    const t = useTranslations('UnitsPageAI');
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [activeSort, setActiveSort] = useState('Featured');
    const [showFilters, setShowFilters] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Changing state from simple number to object for dynamic title
    const [titleData, setTitleData] = useState({ count: 0, location: 'UAE', category: 'Sale' });

    const unitid = props.unitid || '';
    const category = props.category || '';
    const currentPage = Number(props.page) || 1;
    const propertyId = props.propertyId || '';
    const beds = props.beds || '';

    return (
        <div className="bg-gray-50 min-h-screen dark:bg-neutral-900">
            <div className="pt-28 md:pt-36 border-b border-gray-100 bg-white dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="container mx-auto">
                    <Breadcrumb
                    />
                </div>
            </div>
            <div className="mx-auto container mx-auto px-4 md:px-12 mt-8 pb-20">
                {/* Header */}
                <div className="flex justify-between items-end mb-6">
                    <h1 className="text-xl md:text-3xl text-gray-900 font-bold dark:text-white">
                        {titleData.count > 0
                            ? t('propertiesTitle', { count: titleData.count, category: t(titleData.category.toLowerCase()), location: titleData.location === 'UAE' ? t('uae') : titleData.location })
                            : t('propertiesTitleNoCount', { category: t(titleData.category.toLowerCase()), location: titleData.location === 'UAE' ? t('uae') : titleData.location })
                        }
                    </h1>

                    <div className="flex items-center gap-4">
                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setMobileFiltersOpen(true)}
                            className="hidden bg-white border border-gray-200 rounded-lg p-2 text-gray-700 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors dark:bg-neutral-800"
                        >
                            <Filter size={18} />
                        </button>

                        {/* View Toggle */}
                        <div className="bg-white dark:bg-neutral-800 border border-gray-200 rounded-lg p-1 flex shadow-sm dark:border-gray-700">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded cursor-pointer ${viewMode === 'list' ? 'bg-primary text-white shadow-sm' : 'text-gray-400 hover:bg-gray-50'}`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                className={`p-2 rounded cursor-pointer ${viewMode === 'map' ? 'bg-primary text-white shadow-sm' : 'text-gray-400 hover:bg-gray-50'}`}
                            >
                                <MapIcon size={18} />
                            </button>
                        </div>

                        <div className="hidden items-center gap-2">
                            <span className="text-xs text-gray-500 font-bold uppercase">{t('sort')}</span>
                            <div className="relative">
                                <button className="flex items-center gap-1 text-sm font-bold text-primary cursor-pointer">
                                    {t(activeSort.toLowerCase())} <ChevronDown size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-4 ">
                    {viewMode === 'list' && (
                        <>
                            <div className="col-span-4 relative z-50">
                                <Search placeholder={t('searchByReference')} />
                            </div>
                            <div className="hidden md:block">
                                <UnitsSideSearch onChange='' />
                            </div>
                            <div className="col-span-4 md:col-span-3">
                                <div className="mt-0 space-y-5 lg:mt-2 lg:space-y-5">
                                    <UnitsList
                                        unitid={unitid}
                                        category={category}
                                        propertyId={propertyId}
                                        beds={beds}
                                        currentPage={currentPage}
                                        onDataLoaded={setTitleData}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Full Screen Map Modal */}
            {viewMode === 'map' && (
                <div className="fixed inset-0 z-[100] bg-gray-100 flex flex-col">

                    {/* Top Left UAE Button */}
                    <div className="absolute top-6 left-6 z-50 pointer-events-auto hidden">
                        <button className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full font-bold text-gray-800 shadow-lg border border-white/20 hover:bg-white transition-colors dark:bg-gray-800/90 dark:text-white dark:border-gray-700">
                            UAE
                        </button>
                    </div>

                    {/* Bottom Floating Navigation Dock */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto w-[90%] md:w-auto max-w-4xl px-4">
                        <div className="bg-white/95 backdrop-blur-md border border-gray-100 rounded-full shadow-xl p-2 flex items-center justify-between gap-4 dark:bg-gray-800/95 dark:border-gray-700">

                            {/* Search and Filters - Center */}
                            <div className="flex-1 w-full md:w-auto flex items-center gap-2 hidden">
                                <div className="flex-1 w-full md:w-64 bg-gray-100 rounded-full flex items-center px-4 py-2.5 dark:bg-gray-700">
                                    <SearchIcon size={18} className="text-gray-400 mr-2 flex-shrink-0" />
                                    <input
                                        type="text"
                                        placeholder={t('searchByReference')}
                                        className="bg-transparent border-none outline-none w-full text-sm text-gray-800 dark:text-white placeholder-gray-400"
                                    />
                                </div>
                                <div className="hidden lg:flex gap-2">
                                    <button className="bg-gray-100 px-4 py-2.5 rounded-full text-sm font-semibold text-gray-700 whitespace-nowrap hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                                        All Emirates
                                    </button>
                                    <button className="bg-gray-100 px-4 py-2.5 rounded-full text-sm font-semibold text-gray-700 whitespace-nowrap hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                                        Select Community
                                    </button>
                                </div>
                            </div>

                            {/* Actions - Right */}
                            <div className="flex items-center w-full md:w-auto justify-between md:justify-end gap-2 pr-2">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className="bg-gray-100 p-3 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors shadow-sm dark:bg-gray-700 dark:text-gray-300 dark:hover:text-white"
                                        title="List View"
                                    >
                                        <LayoutGrid size={20} />
                                    </button>

                                    <button
                                        onClick={() => setShowFilters(true)}
                                        className={`p-3 rounded-full flex items-center justify-center transition-colors shadow-sm ${showFilters ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-white'}`}
                                        title={t('filters')}
                                    >
                                        <Filter size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Slide-out Filters Drawer */}
                    <div
                        className={`absolute top-0 right-0 h-[100dvh] w-full sm:w-80 bg-white shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out flex flex-col dark:bg-gray-900 dark:border-l dark:border-gray-800 ${showFilters ? 'translate-x-0' : 'translate-x-full'}`}
                    >
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('filters')}</h3>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            <UnitsSideSearchMapView onChange='' />
                        </div>
                        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shrink-0">
                            <button
                                onClick={() => setShowFilters(false)}
                                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-0.5"
                            >
                                VIEW RESULTS
                            </button>
                        </div>
                    </div>

                    <div className="w-full h-[100dvh] relative">
                        <UnitsMapBox unitid={unitid} category={category} propertyId={propertyId} beds={beds} />
                    </div>
                </div>
            )}

        </div >
    );
}