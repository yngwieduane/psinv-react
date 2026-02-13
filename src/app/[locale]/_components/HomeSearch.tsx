
'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Form from 'next/form';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid';
import AutocompleteSearch from '../units/_components/AutocompleteSearch';
import AutocompleteSearchWithOther from '../units/_components/AutocompleteSearchWithOther';
import { useCurrency } from '@/context/currencyContext';

const minPriceDefault = 1000;
const maxPriceDefault = 100000000;

export default function HomeSearch() {
    const locale = useLocale();
    const router = useRouter();
    const { currency } = useCurrency();
    const [activeTab, setActiveTab] = useState<'units' | 'properties'>('units');

    // Filter States
    const [propertyId, setPropertyId] = useState('');
    const [communityId, setCommunityId] = useState('');
    const [propertyName, setPropertyName] = useState('');

    const [propertyType, setPropertyType] = useState<string | null>(null);
    const [propertyTypesList, setPropertyTypesList] = useState<any[]>([]);

    const [priceRange, setPriceRange] = useState<[number, number]>([minPriceDefault, maxPriceDefault]);
    const [category, setCategory] = useState<string | null>(null);

    const [beds, setBeds] = useState<number | null>(null);
    const [baths, setBaths] = useState<number | null>(null);

    const [sector, setSector] = useState<'Residential' | 'Commercial' | null>(null);
    const [fullGroupedData, setFullGroupedData] = useState<any[]>([]);

    // Flattened list for lookup by ID (to show name in button)
    const [allPropertyTypes, setAllPropertyTypes] = useState<any[]>([]);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    useEffect(() => {
        fetch('/api/external/fetchLookup?type=UnitType')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const RESIDENTIAL_TYPES = [
                        "Apartment", "Villa", "Townhouse", "Studio",
                        "Twin House", "Penthouse"
                    ];

                    const COMMERCIAL_TYPES = [
                        "Office", "Warehouse", "Retail", "Shop", "Plot",
                    ];

                    const residential: any[] = [];
                    const commercial: any[] = [];

                    // Keep track of all for easy name lookup
                    const allTypes = data.map((item: any) => ({ lookupId: item.lookupId, lookupName: item.lookupName }));
                    setAllPropertyTypes(allTypes);

                    data.forEach((item: any) => {
                        const name = item.lookupName;
                        const simplifiedName = { lookupId: item.lookupId, lookupName: name };

                        if (RESIDENTIAL_TYPES.includes(name)) {
                            residential.push(simplifiedName);
                        } else if (COMMERCIAL_TYPES.includes(name)) {
                            commercial.push(simplifiedName);
                        }
                    });

                    // Sort within groups
                    residential.sort((a, b) => RESIDENTIAL_TYPES.indexOf(a.lookupName) - RESIDENTIAL_TYPES.indexOf(b.lookupName));
                    commercial.sort((a, b) => COMMERCIAL_TYPES.indexOf(a.lookupName) - COMMERCIAL_TYPES.indexOf(b.lookupName));

                    const grouped = [
                        { groupName: "Residential", items: residential },
                        { groupName: "Commercial", items: commercial }
                    ];

                    setFullGroupedData(grouped);
                    setPropertyTypesList(grouped);
                }
            })
            .catch((err) => console.error('Error fetching property types:', err));
    }, []);

    // Effect to filter property types when sector changes
    useEffect(() => {
        if (!fullGroupedData.length) return;

        if (sector === 'Residential') {
            setPropertyTypesList([fullGroupedData.find(g => g.groupName === 'Residential')]);
        } else if (sector === 'Commercial') {
            setPropertyTypesList([fullGroupedData.find(g => g.groupName === 'Commercial')]);
        } else {
            setPropertyTypesList(fullGroupedData);
        }
    }, [sector, fullGroupedData]);



    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (propertyId) params.set('propertyId', propertyId);
        if (communityId) params.set('communityId', communityId);
        if (propertyName) params.set('propertyName', propertyName);
        if (propertyName) params.set('propertyName', propertyName);
        if (sector) params.set('sector', sector);
        if (propertyType) params.set('propertyType', propertyType);
        if (category) params.set('category', category);
        if (beds) params.set('beds', beds.toString());
        if (baths) params.set('baths', baths.toString());

        if (priceRange[0] > minPriceDefault) params.set('minPrice', priceRange[0].toString());
        if (priceRange[1] < maxPriceDefault) params.set('maxPrice', priceRange[1].toString());

        const targetPage = activeTab === 'units' ? 'units' : 'projects';
        router.push(`/${locale}/${targetPage}?${params.toString()}`);
    };

    const getSelectedPropertyTypeName = (id: string | null) => {
        if (!id) return 'Property Types';
        const found = allPropertyTypes.find((item) => String(item.lookupId) === String(id));
        return found ? found.lookupName : 'Property Types';
    };

    return (
        <div className="relative z-30 -mt-20 mb-10 container mx-auto px-4 " id='search-section'>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl max-w-5xl mx-auto">
                {/* Tabs */}
                <div className="flex border-b border-gray-100 ">
                    <button
                        onClick={() => setActiveTab('units')}
                        className={`cursor-pointer flex-1 py-4 text-center font-medium transition-colors relative ${activeTab === 'units' ? 'text-[#353455] dark:text-white font-bold' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Units
                        {activeTab === 'units' && <div className="absolute bottom-0 left-0 w-full h-1 dark:bg-white bg-[#353455]"></div>}
                    </button>
                    <button
                        disabled
                        className={`flex-1 py-4 text-center font-medium transition-colors relative text-gray-400 cursor-not-allowed flex items-center justify-center gap-2`}
                    >
                        Properties
                        <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Coming Soon</span>
                    </button>
                </div>

                {/* Search Form */}
                <div className="p-6 md:p-8">
                    <form onSubmit={handleSearch} className="flex flex-col gap-4">

                        {/* Top Row: Search + Category */}
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Autocomplete */}
                            <div className="flex-1 flex gap-2">
                                <div className="w-full">
                                    <AutocompleteSearchWithOther
                                        isReset={false}
                                        disableRouting={true}
                                        showTitle={false}
                                        onSelect={(name, id, type) => {
                                            setPropertyName(name);
                                            if (type === 'Community') {
                                                setCommunityId(id);
                                                setPropertyId('');
                                            } else {
                                                setPropertyId(id);
                                                setCommunityId('');
                                            }
                                        }}
                                    />
                                </div>
                                {/* Mobile Filter Toggle */}
                                <button
                                    type="button"
                                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                                    className="md:hidden p-3.5 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 self-end mb-[2px]"
                                    aria-label="Toggle Filters"
                                >
                                    <AdjustmentsHorizontalIcon className="size-6" />
                                </button>
                            </div>

                            {/* Category (Function of Rent/Sale) */}
                            <div className={`w-full md:w-36 ${isFiltersOpen ? '' : 'hidden md:block'}`}>
                                <Listbox value={category} onChange={setCategory}>
                                    <div className="relative">
                                        <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-xl bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:hover:bg-gray-700 py-3.5 pl-4 pr-4 text-left text-gray-700 dark:text-white outline-none focus:border-[#353455] transition-all hover:bg-gray-50">
                                            <span className="col-start-1 row-start-1 truncate">{category || 'Contract'}</span>
                                            <ChevronUpDownIcon aria-hidden="true" className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400" />
                                        </ListboxButton>
                                        <ListboxOptions transition className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm">
                                            <ListboxOption value={null} className="group relative cursor-pointer py-2 pl-3 pr-9 text-gray-900 select-none dark:text-white data-focus:bg-gray-100 dark:data-focus:bg-gray-700">
                                                <span className="block truncate font-normal group-data-selected:font-semibold">Contract</span>
                                            </ListboxOption>
                                            {['Sale', 'Rent'].map((cat) => (
                                                <ListboxOption key={cat} value={cat} className="group relative cursor-pointer py-2 pl-3 pr-9 text-gray-900 select-none dark:text-white data-focus:bg-gray-100 dark:data-focus:bg-gray-700">
                                                    <span className="block truncate font-normal group-data-selected:font-semibold">{cat}</span>
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#353455] group-not-data-selected:hidden">
                                                        <CheckIcon aria-hidden="true" className="size-5" />
                                                    </span>
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </div>
                                </Listbox>
                            </div>
                        </div>

                        {/* Filters Row */}
                        <div className={`gap-4 items-end ${isFiltersOpen ? 'grid grid-cols-1 md:grid-cols-5' : 'hidden md:grid grid-cols-1 md:grid-cols-5'}`}>

                            {/* Sector (Residential/Commercial) */}
                            <div className="w-full">
                                <Listbox value={sector} onChange={setSector}>
                                    <div className="relative">
                                        <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-xl bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:hover:bg-gray-700 py-3.5 pl-4 pr-4 text-left text-gray-700 dark:text-white outline-none focus:border-[#353455] transition-all hover:bg-gray-50">
                                            <span className="col-start-1 row-start-1 truncate">{sector || 'Category'}</span>
                                            <ChevronUpDownIcon aria-hidden="true" className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400" />
                                        </ListboxButton>
                                        <ListboxOptions transition className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm">
                                            <ListboxOption value={null} className="group relative cursor-pointer py-2 pl-3 pr-9 text-gray-900 select-none dark:text-white data-focus:bg-gray-100 dark:data-focus:bg-gray-700">
                                                <span className="block truncate font-normal group-data-selected:font-semibold">Any</span>
                                            </ListboxOption>
                                            {['Residential', 'Commercial'].map((s) => (
                                                <ListboxOption key={s} value={s} className="group relative cursor-pointer py-2 pl-3 pr-9 text-gray-900 select-none dark:text-white data-focus:bg-gray-100 dark:data-focus:bg-gray-700">
                                                    <span className="block truncate font-normal group-data-selected:font-semibold">{s}</span>
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#353455] group-not-data-selected:hidden">
                                                        <CheckIcon aria-hidden="true" className="size-5" />
                                                    </span>
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </div>
                                </Listbox>
                            </div>

                            {/* Property Type */}
                            <div className="w-full">
                                <Listbox value={propertyType} onChange={setPropertyType}>
                                    <div className="relative">
                                        <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 py-3.5 pl-4 pr-4 text-left text-gray-700 dark:text-white outline-none focus:border-[#353455] transition-all hover:bg-gray-50">
                                            <span className="col-start-1 row-start-1 truncate">{getSelectedPropertyTypeName(propertyType)}</span>
                                            <ChevronUpDownIcon aria-hidden="true" className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400" />
                                        </ListboxButton>
                                        <ListboxOptions transition className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm">
                                            <ListboxOption value={null} className="group relative cursor-pointer py-2 pl-3 pr-9 text-gray-900 select-none dark:text-white data-focus:bg-gray-100 dark:data-focus:bg-gray-700">
                                                <span className="block truncate font-normal group-data-selected:font-semibold">Any</span>
                                            </ListboxOption>

                                            {/* Groups */}
                                            {propertyTypesList.map((group: any) => (
                                                <div key={group.groupName}>
                                                    <div className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50/50 dark:bg-gray-700">
                                                        {group.groupName}
                                                    </div>
                                                    {group.items.map((option: any) => (
                                                        <ListboxOption key={option.lookupId} value={option.lookupId} className="group relative cursor-pointer py-2 pl-6 pr-9 text-gray-900 select-none dark:text-white data-focus:bg-gray-100 dark:data-focus:bg-gray-700">
                                                            <span className="block truncate font-normal group-data-selected:font-semibold">{option.lookupName}</span>
                                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#353455] group-not-data-selected:hidden">
                                                                <CheckIcon aria-hidden="true" className="size-5" />
                                                            </span>
                                                        </ListboxOption>
                                                    ))}
                                                </div>
                                            ))}
                                        </ListboxOptions>
                                    </div>
                                </Listbox>
                            </div>


                            {/* Beds and Baths (Popover) */}
                            <div className="w-full">
                                <Popover className="relative">
                                    <PopoverButton className="grid w-full cursor-pointer grid-cols-1 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 py-3.5 pl-4 pr-4 text-left text-gray-700 dark:text-white outline-none focus:border-[#353455] transition-all hover:bg-gray-50">
                                        <span className="col-start-1 row-start-1 truncate">
                                            {beds ? `${beds} Beds` : (baths ? '' : 'Beds and Baths')}
                                            {beds && baths ? ' & ' : ''}
                                            {baths ? `${baths} Baths` : ''}
                                        </span>
                                        <ChevronUpDownIcon aria-hidden="true" className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400" />
                                    </PopoverButton>
                                    <PopoverPanel transition className="absolute z-50 mt-2 w-64 overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-4 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm">
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Bedrooms</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {[1, 2, 3, 4, 5].map(b => (
                                                        <button
                                                            key={b}
                                                            onClick={() => setBeds(beds === b ? null : b)}
                                                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${beds === b ? 'bg-[#353455] text-white' : 'bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-500 dark:text-white text-gray-700 hover:bg-gray-200'}`}
                                                            type="button"
                                                        >
                                                            {b}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-gray-500 mb-1">Bathrooms</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {[1, 2, 3, 4, 5].map(b => (
                                                        <button
                                                            key={b}
                                                            onClick={() => setBaths(baths === b ? null : b)}
                                                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${baths === b ? 'bg-[#353455] text-white' : 'bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-500 dark:text-white text-gray-700 hover:bg-gray-200'}`}
                                                            type="button"
                                                        >
                                                            {b}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverPanel>
                                </Popover>
                            </div>


                            {/* Price Range (Popover) */}
                            <div className="w-full">
                                <Popover className="relative">
                                    <PopoverButton className="grid w-full cursor-pointer grid-cols-1 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:hover:bg-gray-700 py-3.5 pl-4 pr-4 text-left text-gray-700 dark:text-white outline-none focus:border-[#353455] transition-all hover:bg-gray-50">
                                        <span className="col-start-1 row-start-1 truncate">
                                            {priceRange[0] === minPriceDefault && priceRange[1] === maxPriceDefault
                                                ? 'Price Range'
                                                : `${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()} ${currency}`}
                                        </span>
                                        <ChevronUpDownIcon aria-hidden="true" className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400" />
                                    </PopoverButton>
                                    <PopoverPanel transition className="absolute z-50 mt-2 w-full min-w-[300px] overflow-hidden rounded-xl bg-white dark:bg-gray-800 p-4 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm">
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <label htmlFor="minPrice" className="block text-xs font-medium text-gray-500 mb-1">Minimum Price</label>
                                                <input
                                                    type="number"
                                                    id="minPrice"
                                                    className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white bg-gray-50 p-2 text-sm placeholder:text-gray-400 focus:border-[#353455] focus:ring-[#353455]/20"
                                                    placeholder="Min Price"
                                                    value={priceRange[0]}
                                                    onChange={(e) => {
                                                        const val = Number(e.target.value);
                                                        setPriceRange([val, priceRange[1]]);
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="maxPrice" className="block text-xs font-medium text-gray-500 mb-1">Maximum Price</label>
                                                <input
                                                    type="number"
                                                    id="maxPrice"
                                                    className="w-full rounded-lg border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white bg-gray-50 p-2 text-sm placeholder:text-gray-400 focus:border-[#353455] focus:ring-[#353455]/20"
                                                    placeholder="Max Price"
                                                    value={priceRange[1]}
                                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                                />
                                            </div>
                                        </div>
                                    </PopoverPanel>
                                </Popover>
                            </div>
                            {/* Search Button */}
                            <div className="w-full">
                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-primary hover:bg-[#004880] text-white py-3.5 font-bold transition-all shadow-md active:scale-95 text-lg"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
