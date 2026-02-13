// components/AutocompleteSearchWithOther.js
'use client'
import { useState, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type SearchResult = {
    name: string;
    city: string;
    community: string;
    id: string;
    type: 'Project' | 'Community';
};

export default function AutocompleteSearchWithOther({ isReset, disableRouting = false, onSelect, showTitle = true }: { isReset: any, disableRouting?: boolean, onSelect?: (name: string, id: string, type: string) => void, showTitle?: boolean }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    // const [allCommunities, setAllCommunities] = useState<SearchResult[]>([]);

    const [inputValue, setInputValue] = useState(searchParams.get('propertyName')?.toString() || '');
    const [iDValue, setIDValue] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [resetStatus, setResetStatus] = useState(isReset);
    const [propertyId, setPropertyId] = useState(searchParams.get('propertyId')?.toString());
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query.trim() !== "") {
                setShowDropdown(true);
                setLoading(true);

                fetch(`/api/units/autocomplete?query=${query}`)
                    .then(res => res.json())
                    .then(data => {
                        setResults(data.results || []);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.error("Error fetching units:", err);
                        setResults([]);
                        setLoading(false);
                    });

            } else {
                setResults([]);
                setLoading(false);
                setShowDropdown(false);
                setIDValue(0);
            }
        }, 300);
        return () => clearTimeout(timeout);
    }, [query]);

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
        setQuery(e.target.value);
        setResetStatus('false');
        if (!disableRouting) {
            updateQuery('propertyName', e.target.value);
        }
        if (onSelect) {
            onSelect(e.target.value, '', '');
        }
    };

    const updateQuery = useDebouncedCallback((key: string, value: string | null) => {
        if (disableRouting) return;
        const params = new URLSearchParams(searchParams.toString());

        if (value === null || value === '') {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        console.log(key + " = " + value);
        router.push(`${pathname}?${params.toString()}`);
    }, 300);

    const handleOptionClick = (item: SearchResult) => (e: any) => {
        setIDValue(Number(item.id));
        setInputValue(item.name);
        setShowDropdown(false);
        if (!disableRouting) {
            if (item.type === 'Community') {
                updateQuery('communityId', item.id);
                updateQuery('propertyId', null); // Clear propertyId
            } else {
                updateQuery('propertyId', item.id);
                updateQuery('communityId', null); // Clear communityId
            }
        }
        if (onSelect) {
            onSelect(item.name, item.id, item.type);
        }
        setPropertyId(item.id)
    }
    // if(isReset){
    //   setResetStatus(isReset);
    // }

    const defaultSuggestions: SearchResult[] = [
        { name: "Al Reem Island", id: "95259", type: "Community", city: "Abu Dhabi", community: "" },
        { name: "Saadiyat Island", id: "97198", type: "Community", city: "Abu Dhabi", community: "" },
        { name: "Al Raha Beach", id: "95124", type: "Community", city: "Abu Dhabi", community: "" },
        { name: "Yas Island", id: "165011", type: "Community", city: "Abu Dhabi", community: "" },
    ];

    const handleInputClick = () => {
        if (!query || query.trim() === '') {
            setResults(defaultSuggestions);
            setShowDropdown(true);
        }
    };

    return (
        <div className="relative" ref={wrapperRef}>
            {showTitle && (
                <label htmlFor="propertyName" className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Property Name {isReset}
                </label>
            )}
            <div className=" grid grid-cols-1">
                <input
                    type="text"
                    id="propertyName"
                    name="propertyName"
                    placeholder="Search by project or community..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                    autoComplete="off"
                    className="col-start-1 row-start-1 block w-full rounded-xl bg-white/50 dark:bg-gray-800 dark:text-white border border-gray-200 py-3.5 pr-10 pl-11 text-base text-gray-800 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-[#353455]/10 focus:border-[#353455] transition-all duration-200 shadow-sm hover:bg-white/80"
                />
                <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 ml-4 size-5 self-center text-gray-500"
                />
            </div>
            {loading && (
                <div className="absolute left-0 right-0 mt-2 p-4 rounded-xl backdrop-blur-xl bg-white/90 border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.08)]">
                    <p className="text-gray-500 text-sm">Searching...</p>
                </div>
            )}
            {showDropdown && results.length > 0 && (
                <ul className="absolute left-0 right-0 mt-2 z-10 max-h-60 overflow-auto rounded-xl backdrop-blur-xl bg-white/90 border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.08)] py-2">
                    {results.map((item, index) => (
                        <li
                            key={index}
                            onClick={handleOptionClick(item)}
                            className="px-4 py-3 hover:bg-[#353455]/5 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-0"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <strong className="block text-[#353455] text-sm font-semibold">{item.name}</strong>
                                    <span className="text-xs text-gray-500 mt-0.5 block">{item.city ? item.city : item.community}</span>
                                </div>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.type === 'Project' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                    {item.type}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <input
                type="text"
                id="propertyId"
                name="propertyId"
                defaultValue={propertyId}
                className="hidden"
                readOnly
            />
        </div>
    );
}