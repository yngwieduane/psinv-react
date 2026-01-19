// components/Autocomplete.js
'use client'
import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
type Project = {
  propertyName: string;
  propertyID: string;
};
export default function AutocompleteSearch({ isReset, disableRouting = false, onSelect }: { isReset: any, disableRouting?: boolean, onSelect?: (name: string, id: string) => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const [inputValue, setInputValue] = useState(searchParams.get('propertyName')?.toString());
  const [iDValue, setIDValue] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [resetStatus, setResetStatus] = useState(isReset);
  const [propertyId, setPropertyId] = useState(searchParams.get('propertyId')?.toString());

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim() !== "") {
        setShowDropdown(true);
        setLoading(true);
        fetch(`/api/external/search?query=${query}`)
          .then(res => res.json())
          .then(data => {
            setResults(data.result);
            setLoading(false);
          })
          .catch(() => setLoading(false));
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
      onSelect(e.target.value, '');
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

  const handleOptionClick = (property: string, id: any) => (e: any) => {
    setIDValue(id);
    setInputValue(property);
    setShowDropdown(false);
    if (!disableRouting) {
      updateQuery('propertyId', id);
    }
    if (onSelect) {
      onSelect(property, id);
    }
    setPropertyId(id)
  }
  // if(isReset){
  //   setResetStatus(isReset);
  // }

  return (
    <div className="relative">
      <label htmlFor="email" className=" block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
        Property Name {isReset}
      </label>
      <div className="mt-2 grid grid-cols-1">
        <input
          type="text"
          id="propertyName"
          name="propertyName"
          placeholder="Search project..."
          //value={inputValue}
          onChange={handleInputChange}
          autoComplete="off"
          className="col-start-1 row-start-1 block w-full rounded-xl bg-white/50 border border-gray-200 py-3.5 pr-10 pl-11 text-base text-gray-800 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-[#353455]/10 focus:border-[#353455] transition-all duration-200 shadow-sm hover:bg-white/80"
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
              onClick={handleOptionClick(item.propertyName, item.propertyID)}
              className="px-4 py-3 hover:bg-[#353455]/5 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-0"
            >
              <strong className="block text-[#353455] text-sm font-semibold">{item.propertyName}</strong>
              <span className="text-xs text-gray-500 mt-0.5 block">{item.propertyID}</span>
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