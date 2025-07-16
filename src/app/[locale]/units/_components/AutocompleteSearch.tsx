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
export default function AutocompleteSearch({ isReset }:{ isReset:any }) {
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
  
  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
    setQuery(e.target.value);
    setResetStatus('false');
    updateQuery('propertyName',e.target.value);
  };

  const updateQuery = useDebouncedCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    console.log(key + " = " + value );
    router.push(`${pathname}?${params.toString()}`);
  },300);

  const handleOptionClick = (property:string,id:any) => (e:any) => {
    setIDValue(id);
    setInputValue(property);
    setShowDropdown(false);
    updateQuery('propertyId',id);
    setPropertyId(propertyId)
  }
  // if(isReset){
  //   setResetStatus(isReset);
  // }

  return (
    <div >
      <label htmlFor="email" className=" md:block text-sm/6 font-medium text-gray-900 hidden">
          Property Name {isReset}
      </label>
      <div className="mt-2 grid grid-cols-1">
        <input
          type="text"
          id="propertyName"
          name="propertyName"
          placeholder="Search project..."
          value={inputValue}
          onChange={handleInputChange}
          autoComplete="off"
          className="col-start-1 row-start-1 block w-full rounded-md bg-gray-50 md:bg-white py-1.5 pr-3 pl-10 text-lg text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 placeholder:text-gray-500"
        />
        <MagnifyingGlassIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-800 sm:size-4"
        />
      </div>
      {loading && <p className="absolute left-0 right-0 bg-white border mt-1 z-10 max-h-60 overflow-auto shadow">Searching...</p>}
      {showDropdown && results.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border mt-1 z-10 max-h-60 overflow-auto shadow">
          {results.map((item, index) => (
            <li key={index} onClick={handleOptionClick(item.propertyName,item.propertyID)} className="p-2 hover:bg-gray-100 cursor-pointer">
              <strong>{item.propertyName}</strong>
              <br />
              <span className="text-sm text-gray-500">{item.propertyID}</span>
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