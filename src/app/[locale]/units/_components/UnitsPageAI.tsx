'use client';
import { useState } from "react";
import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";
import UnitsList from "./UnitsList";
import UnitsSidebar from "./UnitsSidebar";
import Search from "./Search";
import UnitsSideSearch from "./UnitsSideSearch";
import SidebarListProperty from "./SidebarListProperty";
import { ChevronDown, Filter, LayoutGrid, MapIcon, X } from "lucide-react";
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
        <div className="bg-gray-50 min-h-screen pt-32 dark:bg-neutral-900">
            <div className="hidden">
                <Breadcrumb />
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
                <div className="fixed inset-0 z-[100] bg-white flex flex-col advanced-marker-example">
                    {/* Top Right Controls */}
                    <div className="absolute top-4 right-4 z-50 flex items-start gap-4 pointer-events-none">
                        <div className="flex items-center bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-lg p-1 gap-2 pointer-events-auto h-[58px] dark:bg-gray-800 dark:border-gray-700">

                            {/* Filters Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`cursor-pointer h-full px-4 rounded-lg flex items-center gap-2 font-bold transition-colors dark:text-white ${showFilters ? 'bg-gray-200 text-gray-700 dark:bg-gray-700' : 'text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                            >
                                <Filter size={20} />
                                <span className="hidden md:inline">{t('filters')}</span>
                            </button>

                            <div className="w-px h-8 bg-gray-200" />

                            {/* View Toggle */}
                            <div className="flex items-center h-full">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className="cursor-pointer h-full px-4 rounded-lg text-gray-400 hover:text-gray-800 flex items-center justify-center transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-white"
                                >
                                    <LayoutGrid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('map')}
                                    className="cursor-pointer h-[42px] px-4 rounded-lg bg-primary text-white shadow-sm flex items-center justify-center font-bold my-1 mr-1"
                                >
                                    <MapIcon size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Collapsible Filters Panel (Floating under controls) */}
                        {showFilters && (
                            <div className="absolute top-[68px] right-0 w-80 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl p-4 pointer-events-auto dark:bg-gray-800 dark:border-gray-700">
                                <div className="absolute top-2 right-2 z-10">
                                    <button onClick={() => setShowFilters(false)} className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-white">
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

        </div >
    );
}