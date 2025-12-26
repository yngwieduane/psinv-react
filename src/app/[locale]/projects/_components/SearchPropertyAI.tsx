'use client';

import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Form from 'next/form'
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { ArrowUpDown, BarChart2, LayoutGrid, List, MapIcon, SlidersHorizontal, X } from 'lucide-react';
import Pagination from '../../_components/tools/Pagination';

export type TabType = 'gallery' | 'list' | 'map';

export default function SearchPropertyAI({
    placeholder,
    activeTab,
    setActiveTab,
    totalPages
}: {
    placeholder: string;
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    totalPages: number;
}) {
    // const [activeTab, setActiveTab] = useState<'gallery' | 'compare' | 'list' | 'map'>('gallery');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const locale = useLocale();

    function handleSearch(term: string) {
        console.log(`Searching... ${term}`);
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('propertyname', term);
        } else {
            params.delete('propertyname');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div >
            {/* Filters Bar (Desktop) */}
            <div className="hidden lg:block bg-gray-50 border-y border-gray-200 py-5 mb-12">
                <div className="container mx-auto flex flex-wrap gap-6 items-center justify-between">
                    <div className="flex gap-3">
                        <button
                            onClick={() => setActiveTab('gallery')}
                            className={`px-5 py-2.5 rounded text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${activeTab === 'gallery' ? 'bg-primary border border-gray-400' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'}`}
                        >
                            <LayoutGrid size={16} /> Gallery
                        </button>
                        <button
                            onClick={() => setActiveTab('map')}
                            className={`px-5 py-2.5 rounded text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${activeTab === 'map' ? 'bg-primary border border-gray-400' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'}`}
                        >
                            <MapIcon size={16} /> View Map
                        </button>
                        <button
                            onClick={() => setActiveTab('list')}
                            className={`px-5 py-2.5 rounded text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer ${activeTab === 'list' ? 'bg-primary border border-gray-400' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'}`}
                        >
                            <List size={16} /> List
                        </button>
                    </div>

                    <div className="flex gap-3 text-sm">
                        <Pagination totalPages={totalPages} />
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Action Bar */}
            <div className="fixed top-[85px] left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm p-3 flex gap-3 lg:hidden">
                <button
                    onClick={() => setIsSortOpen(true)}
                    className="flex-1 border border-gray-300 rounded-lg py-2.5 flex items-center justify-center gap-2 font-bold text-sm text-gray-700 active:bg-gray-50"
                >
                    <ArrowUpDown size={16} /> Sort
                </button>
                <button
                    onClick={() => setIsViewOpen(true)}
                    className="flex-1 border border-gray-300 rounded-lg py-2.5 flex items-center justify-center gap-2 font-bold text-sm text-gray-700 active:bg-gray-50"
                >
                    {activeTab === 'gallery' && <LayoutGrid size={16} />}
                    {activeTab === 'list' && <List size={16} />}
                    {activeTab === 'map' && <MapIcon size={16} />}
                    View
                </button>
                <button
                    onClick={() => setIsFilterOpen(true)}
                    className="flex-1 text-white rounded-lg py-2.5 flex items-center justify-center gap-2 font-bold text-sm bg-black"
                >
                    <SlidersHorizontal size={16} /> Filters
                </button>
            </div>

            {/* Sort Bottom Sheet (Mobile) */}
            {isSortOpen && (
                <div className="fixed inset-0 z-[70] lg:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSortOpen(false)}></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300">
                        <h3 className="font-bold text-xl mb-6 text-center text-gray-800">Sort</h3>
                        <div className="space-y-4">
                            <button className="w-full text-left p-4 rounded-xl bg-gray-50 font-medium text-secondary border border-secondary">Featured</button>
                            <button className="w-full text-left p-4 rounded-xl bg-white border border-gray-200 font-medium text-gray-700">Price Low</button>
                        </div>
                        <button onClick={() => setIsSortOpen(false)} className="w-full mt-6 bg-gray-100 py-4 rounded-xl font-bold text-gray-600">Cancel</button>
                    </div>
                </div>
            )}

            {/* View Bottom Sheet (Mobile) */}
            {isViewOpen && (
                <div className="fixed inset-0 z-[70] lg:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsViewOpen(false)}></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300">
                        <h3 className="font-bold text-xl mb-6 text-center text-gray-800">View</h3>
                        <div className="space-y-4">
                            <button
                                onClick={() => { setActiveTab('gallery'); setIsViewOpen(false); }}
                                className={`w-full text-left p-4 rounded-xl font-medium border flex items-center gap-3 ${activeTab === 'gallery' ? 'bg-primary/5 text-primary border-primary' : 'bg-white text-gray-700 border-gray-200'}`}
                            >
                                <LayoutGrid size={20} /> Gallery View
                            </button>
                            <button
                                onClick={() => { setActiveTab('list'); setIsViewOpen(false); }}
                                className={`w-full text-left p-4 rounded-xl font-medium border flex items-center gap-3 ${activeTab === 'list' ? 'bg-primary/5 text-primary border-primary' : 'bg-white text-gray-700 border-gray-200'}`}
                            >
                                <List size={20} /> List View
                            </button>
                            <button
                                onClick={() => { setActiveTab('map'); setIsViewOpen(false); }}
                                className={`w-full text-left p-4 rounded-xl font-medium border flex items-center gap-3 ${activeTab === 'map' ? 'bg-primary/5 text-primary border-primary' : 'bg-white text-gray-700 border-gray-200'}`}
                            >
                                <MapIcon size={20} /> Map View
                            </button>
                        </div>
                        <button onClick={() => setIsViewOpen(false)} className="w-full mt-6 bg-gray-100 py-4 rounded-xl font-bold text-gray-600">Cancel</button>
                    </div>
                </div>
            )}

            {/* Filter Modal (Mobile Full Screen) */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-[70] bg-white lg:hidden flex flex-col animate-in slide-in-from-bottom duration-300">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <button onClick={() => setIsFilterOpen(false)}><X size={24} /></button>
                        <span className="font-bold text-lg">Filters</span>
                        <button className="text-secondary font-bold text-sm">Reset</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        <div>
                            <label className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3 block">Location</label>
                            <input type="text" className="w-full border border-gray-200 rounded-lg p-3" value="Abu Dhabi" readOnly />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3 block">Status</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="border border-secondary bg-orange-50 text-secondary font-bold py-3 rounded-lg">Ready</button>
                                <button className="border border-gray-200 text-gray-600 font-medium py-3 rounded-lg">Off Plan</button>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-100">
                        <button onClick={() => setIsFilterOpen(false)} className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg">
                            Show Results
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}