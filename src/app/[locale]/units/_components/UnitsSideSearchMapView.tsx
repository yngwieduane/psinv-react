'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import Sticky from 'react-sticky-el';
import { RotateCcw, Bed, Bath, Hash, DollarSign, Ruler, Building2, ChevronDown } from 'lucide-react';
import AutocompleteSearch from './AutocompleteSearch';
import AutocompleteSearchWithOther from './AutocompleteSearchWithOther';

const minPriceDefault = 1000;
const maxPriceDefault = 100000000;

export default function UnitsSideSearchMapView({ onChange }: { onChange: any }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [reset, setReset] = useState(false);

    const [priceRange, setPriceRange] = useState<[number, number]>([
        minPriceDefault,
        maxPriceDefault,
    ]);
    const [beds, setBeds] = useState<number | null>(null);
    const [baths, setBaths] = useState<number | null>(null);
    const [propertyType, setPropertyType] = useState<string | null>(null);
    const [category, setCategory] = useState<string | null>(null);
    const [propertyTypesList, setPropertyTypesList] = useState<any[]>([]);
    const [areaRange, setAreaRange] = useState<[number, number]>([0, 50000]);

    useEffect(() => {
        fetch('/api/external/fetchLookup?type=UnitType')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const types = data.map((item: any) => ({ lookupId: item.lookupId, lookupName: item.lookupName }));
                    types.sort((a, b) => a.lookupName.localeCompare(b.lookupName));
                    setPropertyTypesList(types);
                }
            })
            .catch((err) => console.error('Error fetching property types:', err));
    }, []);

    useEffect(() => {
        const min = Number(searchParams.get('minPrice')) || minPriceDefault;
        const max = Number(searchParams.get('maxPrice')) || maxPriceDefault;
        setPriceRange([min, max]);

        const minA = Number(searchParams.get('minArea')) || 0;
        const maxA = Number(searchParams.get('maxArea')) || 50000;
        setAreaRange([minA, maxA]);

        setBeds(searchParams.get('beds') ? Number(searchParams.get('beds')) : null);
        setBaths(searchParams.get('baths') ? Number(searchParams.get('baths')) : null);
        setPropertyType(searchParams.get('propertyType') || null);
        setCategory(searchParams.get('category') || 'Sale'); // Default to Sale if empty? Or null. Let's stick to null or 'Sale'
    }, [searchParams]);

    const updateQuery = (key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === null || value === '') {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleReset = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete('minPrice');
        params.delete('maxPrice');
        params.delete('minArea');
        params.delete('maxArea');
        params.delete('beds');
        params.delete('baths');
        params.delete('propertyType');
        params.delete('propertyId');
        params.delete('category');
        router.push(`${pathname}?${params.toString()}`);

        setPriceRange([minPriceDefault, maxPriceDefault]);
        setAreaRange([0, 50000]);
        setBeds(null);
        setBaths(null);
        setPropertyType(null);
        setCategory(null);
        setReset(!reset); // Toggle reset trigger
        if (onChange) onChange('true');
    };

    const getSelectedPropertyTypeName = (id: string | null) => {
        if (!id) return 'Any Property Type';
        const found = propertyTypesList.find((item) => String(item.lookupId) === String(id));
        return found ? found.lookupName : 'Any Property Type';
    };

    const toggleCategory = (val: string) => {
        setCategory(val);
        updateQuery('category', val);
    };

    return (
        <div className="w-full block font-sans">
            <Sticky stickyClassName="" boundaryElement=".mainsidebar" hideOnBoundaryHit={false}>
                <div className="p-5 flex flex-col gap-6 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700">

                    {/* Header */}
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-lg text-[#353455] dark:text-white">Filters</h3>
                        <button
                            onClick={handleReset}
                            className="text-gray-400 text-xs font-semibold uppercase tracking-wider hover:text-[#353455] flex items-center gap-1.5 transition-colors py-1 px-2 rounded-lg hover:bg-gray-50 dark:text-white"
                        >
                            <RotateCcw size={12} /> Reset
                        </button>
                    </div>

                    {/* Autocomplete Input */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 pl-1">Location / Project</label>
                        <AutocompleteSearchWithOther isReset={reset} />
                    </div>

                    {/* Category Toggle */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 pl-1 dark:text-white dark:hover:text-white">I want to</label>
                        <div className="grid grid-cols-2 bg-gray-100 p-1 rounded-xl dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                            {['Sale', 'Rent'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => toggleCategory(cat)}
                                    className={`py-2 text-sm font-bold rounded-lg transition-all duration-200 ${(category === cat || (!category && cat === 'Sale'))
                                        ? 'bg-white text-[#353455] shadow-sm dark:bg-gray-900 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'
                                        : 'text-gray-500 hover:text-gray-700 dark:text-white dark:hover:text-white'
                                        }`}
                                >
                                    {/* Rename 'Sale' to 'Buy' for UI if desired, but code uses 'Sale' */}
                                    {cat === 'Sale' ? 'Buy' : 'Rent'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Property Type */}
                    <div className="relative z-20">
                        <Listbox value={propertyType} onChange={(val) => { setPropertyType(val); updateQuery('propertyType', val); }}>
                            <Label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 pl-1 dark:text-white dark:hover:text-white">Property Type</Label>
                            <div className="relative">
                                <ListboxButton className="w-full text-left bg-white border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-700 transition-colors dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                                    <span className="flex items-center gap-2 truncate">
                                        <Building2 size={16} className="text-gray-400" />
                                        {getSelectedPropertyTypeName(propertyType)}
                                    </span>
                                    <ChevronDown size={16} className="text-gray-400" />
                                </ListboxButton>
                                <ListboxOptions className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-900 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white rounded-xl shadow-xl max-h-60 overflow-auto focus:outline-none py-1 text-sm">
                                    <ListboxOption value={null} className="cursor-pointer px-4 py-2.5 hover:bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">Any</ListboxOption>
                                    {propertyTypesList.map((type) => (
                                        <ListboxOption key={type.lookupId} value={type.lookupId} className="cursor-pointer px-4 py-2.5 hover:bg-gray-50 text-gray-700 flex justify-between items-center dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                                            {({ selected }) => (
                                                <>
                                                    <span className={selected ? 'font-bold text-[#353455]' : ''}>{type.lookupName}</span>
                                                    {selected && <CheckIcon className="w-4 h-4 text-[#353455]" />}
                                                </>
                                            )}
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </div>
                        </Listbox>
                    </div>

                    {/* Price Range */}
                    <div className="relative z-10">
                        <Popover className="relative">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 pl-1 dark:text-white dark:hover:text-white">Price Range</label>
                            <PopoverButton className="w-full text-left bg-white border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-700 transition-colors dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="flex items-center gap-2 truncate">
                                    <DollarSign size={16} className="text-gray-400" />
                                    {priceRange[0] === minPriceDefault && priceRange[1] === maxPriceDefault
                                        ? 'Any Price'
                                        : `${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}`}
                                </span>
                                <ChevronDown size={16} className="text-gray-400" />
                            </PopoverButton>
                            <PopoverPanel className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl p-4 dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-500 font-medium mb-1 block dark:text-white dark:hover:text-white">Min Price (AED)</label>
                                        <input
                                            type="number"
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 text-sm py-2 px-3 focus:ring-1 focus:ring-[#353455] focus:border-[#353455] dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                                            value={priceRange[0]}
                                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                            onBlur={() => updateQuery('minPrice', String(priceRange[0]))}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-medium mb-1 block dark:text-white dark:hover:text-white">Max Price (AED)</label>
                                        <input
                                            type="number"
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 text-sm py-2 px-3 focus:ring-1 focus:ring-[#353455] focus:border-[#353455] dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                            onBlur={() => updateQuery('maxPrice', String(priceRange[1]))}
                                        />
                                    </div>
                                </div>
                            </PopoverPanel>
                        </Popover>
                    </div>

                    {/* Beds & Baths */}
                    <div className="relative z-10">
                        <Popover className="relative">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 pl-1 dark:text-white dark:hover:text-white">Beds & Baths</label>
                            <PopoverButton className="w-full text-left bg-white border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-700 transition-colors dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="flex items-center gap-2 truncate">
                                    <Bed size={16} className="text-gray-400" />
                                    {beds ? `${beds} Beds` : (baths ? '' : 'Beds & Baths')}
                                    {beds && baths ? ' & ' : ''}
                                    {baths ? `${baths} Baths` : ''}
                                </span>
                                <ChevronDown size={16} className="text-gray-400" />
                            </PopoverButton>
                            <PopoverPanel className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl p-4 dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-500 font-medium mb-1 block dark:text-white dark:hover:text-white">Bedrooms</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <button
                                                    key={num}
                                                    onClick={() => {
                                                        const newVal = beds === num ? null : num;
                                                        setBeds(newVal);
                                                        updateQuery('beds', newVal ? String(newVal) : null);
                                                    }}
                                                    className={`flex-1 aspect-square rounded-lg text-sm font-bold flex items-center justify-center transition-all ${beds === num
                                                        ? 'bg-[#353455] text-white shadow-md'
                                                        : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'
                                                        }`}
                                                >
                                                    {num}{num === 5 ? '+' : ''}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-medium mb-1 block dark:text-white dark:hover:text-white">Bathrooms</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((num) => (
                                                <button
                                                    key={num}
                                                    onClick={() => {
                                                        const newVal = baths === num ? null : num;
                                                        setBaths(newVal);
                                                        updateQuery('baths', newVal ? String(newVal) : null);
                                                    }}
                                                    className={`flex-1 aspect-square rounded-lg text-sm font-bold flex items-center justify-center transition-all ${baths === num
                                                        ? 'bg-[#353455] text-white shadow-md'
                                                        : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'
                                                        }`}
                                                >
                                                    {num}{num === 5 ? '+' : ''}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </PopoverPanel>
                        </Popover>
                    </div>


                    {/* Area Range */}
                    <div>
                        <Popover className="relative">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 pl-1 dark:text-white dark:hover:text-white">Size (Sq.Ft)</label>
                            <PopoverButton className="w-full text-left bg-white border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-700 transition-colors dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="flex items-center gap-2 truncate">
                                    <Ruler size={16} className="text-gray-400" />
                                    {areaRange[0] === 0 && areaRange[1] === 50000
                                        ? 'Any Size'
                                        : `${areaRange[0]} - ${areaRange[1]}`}
                                </span>
                                <ChevronDown size={16} className="text-gray-400" />
                            </PopoverButton>
                            <PopoverPanel className="absolute z-50 bottom-full mb-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl p-4 dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-500 font-medium mb-1 block dark:text-white dark:hover:text-white">Min Sq.Ft</label>
                                        <input
                                            type="number"
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 text-sm py-2 px-3 focus:ring-1 focus:ring-[#353455] focus:border-[#353455] dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                                            value={areaRange[0]}
                                            onChange={(e) => setAreaRange([Number(e.target.value), areaRange[1]])}
                                            onBlur={() => updateQuery('minArea', String(areaRange[0]))}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-medium mb-1 block dark:text-white dark:hover:text-white">Max Sq.Ft</label>
                                        <input
                                            type="number"
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 text-sm py-2 px-3 focus:ring-1 focus:ring-[#353455] focus:border-[#353455] dark:bg-gray-800 dark:border dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                                            value={areaRange[1]}
                                            onChange={(e) => setAreaRange([areaRange[0], Number(e.target.value)])}
                                            onBlur={() => updateQuery('maxArea', String(areaRange[1]))}
                                        />
                                    </div>
                                </div>
                            </PopoverPanel>
                        </Popover>
                    </div>

                </div>
            </Sticky>
        </div>
    );
}