'use client';
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect, useRef, Fragment } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon, ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Listbox, Popover, Transition, ListboxButton, ListboxOption, ListboxOptions, PopoverButton, PopoverPanel } from '@headlessui/react';

type SearchResult = {
    name: string;
    city: string;
    district: string;
    community: string;
    id: string;
    type: 'Project' | 'Community' | 'City' | 'District';
};

interface ProjectSearchProps {
    isHomeSearch?: boolean;
}

export default function ProjectSearch({ isHomeSearch = false }: ProjectSearchProps) {
    const t = useTranslations("ProjectsPage");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Form states
    const [query, setQuery] = useState(searchParams.get('propertyname') || searchParams.get('community') || searchParams.get('city') || searchParams.get('district') || "");
    const [propertyUnitType, setPropertyUnitType] = useState<string | null>(searchParams.get('propertyUnitTypes'));
    const [propertyPlan, setPropertyPlan] = useState<string | null>(searchParams.get('propertyPlan'));

    // Autocomplete states
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Filter options
    const unitTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Duplex', 'Plot'];
    const plans = ['Off-Plan', 'Completed'];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchSuggestions = (searchQuery: string) => {
        setShowDropdown(true);
        setLoading(true);

        // Using the specific projects autocomplete API
        fetch(`/api/projects/autocomplete?query=${searchQuery}`)
            .then(res => res.json())
            .then(data => {
                setResults(data.results || []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching suggestions:", err);
                setResults([]);
                setLoading(false);
            });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query.trim() !== "") {
                fetchSuggestions(query);
            } else if (showDropdown) {
                // If it's empty but dropdown is open (e.g. from focus), fetch defaults
                fetchSuggestions("");
            } else {
                setResults([]);
                setLoading(false);
                setShowDropdown(false);
            }
        }, query.trim() === "" ? 0 : 800); // No delay for empty focus
        return () => clearTimeout(timeout);
    }, [query, showDropdown]);

    const handleSearchClick = () => {
        const params = new URLSearchParams(searchParams.toString());
        // Simple search logic: if user didn't pick from dropdown, just pass the query text as propertyname
        params.delete('propertyname');
        params.delete('community');
        params.delete('city');
        params.delete('district');

        if (query) {
            params.set('propertyname', query); // Fallback to property name search if no specific item clicked
        }

        if (propertyUnitType) params.set('propertyUnitTypes', propertyUnitType);
        else params.delete('propertyUnitTypes');

        if (propertyPlan) params.set('propertyPlan', propertyPlan);
        else params.delete('propertyPlan');

        // Reset to page 1 on new search
        params.set('page', '1');

        if (isHomeSearch) {
            router.push(`/${locale}/projects?${params.toString()}`);
        } else {
            router.push(`${pathname}?${params.toString()}`);
        }
        setShowDropdown(false);
    };

    const handleOptionClick = (item: SearchResult) => {
        setQuery(item.name);
        setShowDropdown(false);

        const params = new URLSearchParams(searchParams.toString());
        params.delete('propertyname');
        params.delete('community');
        params.delete('city');
        params.delete('district');

        if (item.type === 'Project') {
            params.set('propertyname', item.name);
        } else if (item.type === 'Community') {
            params.set('community', item.name);
        } else if (item.type === 'City') {
            params.set('city', item.name);
        } else if (item.type === 'District') {
            params.set('district', item.name);
        } else {
            params.set('propertyname', item.name);
        }

        if (propertyUnitType) params.set('propertyUnitTypes', propertyUnitType);
        if (propertyPlan) params.set('propertyPlan', propertyPlan);

        params.set('page', '1');

        if (isHomeSearch) {
            router.push(`/${locale}/projects?${params.toString()}`);
        } else {
            router.push(`${pathname}?${params.toString()}`);
        }
    };

    return (
        <div className={isHomeSearch ? "relative z-20 w-full" : "bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mb-8 mx-auto xl:w-[85%] 2xl:w-[75%] -mt-10 relative z-20"}>
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative" ref={wrapperRef}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by Project, District, Community, or City..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => {
                                setShowDropdown(true);
                                fetchSuggestions(query);
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                            autoComplete="off"
                            className="w-full rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 py-3.5 pl-11 pr-4 text-gray-800 dark:text-white outline-none focus:border-[#353455] focus:ring-1 focus:ring-[#353455]"
                        />
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                    </div>

                    {showDropdown && results.length > 0 && (
                        <ul className="absolute left-0 right-0 mt-2 z-50 max-h-60 overflow-auto rounded-xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 py-2">
                            {results.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleOptionClick(item)}
                                    className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-50 dark:border-gray-700 last:border-0"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <strong className="block text-gray-900 dark:text-white text-sm font-semibold">{item.name}</strong>
                                            <span className="text-xs text-gray-500">{item.city ? item.city : item.community}</span>
                                        </div>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.type === 'Project' ? 'bg-primary/10 text-primary' : 'bg-green-100 text-green-700'}`}>
                                            {item.type}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 flex-none">
                    {/* Unit Type Filter */}
                    <div className="w-full md:w-48">
                        <Listbox value={propertyUnitType} onChange={setPropertyUnitType}>
                            <div className="relative">
                                <ListboxButton className="relative w-full cursor-pointer rounded-xl bg-gray-50 dark:bg-gray-900 py-3.5 pl-4 pr-10 text-left border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#353455]">
                                    <span className="block truncate text-gray-700 dark:text-gray-200">
                                        {propertyUnitType || 'Property Type'}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                        <ChevronUpDownIcon className="size-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </ListboxButton>
                                <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    <ListboxOption value={null} className="group relative cursor-pointer py-2 pl-4 pr-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <span className="block truncate font-normal group-data-[selected]:font-medium">Any Type</span>
                                    </ListboxOption>
                                    {unitTypes.map((type) => (
                                        <ListboxOption key={type} value={type} className="group relative cursor-pointer py-2 pl-4 pr-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 data-[selected]:bg-gray-50 dark:data-[selected]:bg-gray-700">
                                            <span className="block truncate font-normal group-data-[selected]:font-medium">{type}</span>
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </div>
                        </Listbox>
                    </div>

                    {/* Property Plan Filter */}
                    <div className="w-full md:w-48">
                        <Listbox value={propertyPlan} onChange={setPropertyPlan}>
                            <div className="relative">
                                <ListboxButton className="relative w-full cursor-pointer rounded-xl bg-gray-50 dark:bg-gray-900 py-3.5 pl-4 pr-10 text-left border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#353455]">
                                    <span className="block truncate text-gray-700 dark:text-gray-200">
                                        {propertyPlan || 'Project Status'}
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                        <ChevronUpDownIcon className="size-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                </ListboxButton>
                                <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    <ListboxOption value={null} className="group relative cursor-pointer py-2 pl-4 pr-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <span className="block truncate font-normal group-data-[selected]:font-medium">Any Status</span>
                                    </ListboxOption>
                                    {plans.map((plan) => (
                                        <ListboxOption key={plan} value={plan} className="group relative cursor-pointer py-2 pl-4 pr-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 data-[selected]:bg-gray-50 dark:data-[selected]:bg-gray-700">
                                            <span className="block truncate font-normal group-data-[selected]:font-medium">{plan}</span>
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </div>
                        </Listbox>
                    </div>

                    <button
                        onClick={handleSearchClick}
                        className="bg-primary hover:bg-[#004880] text-white px-8 py-3.5 rounded-xl font-bold transition-colors shadow-sm"
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}
