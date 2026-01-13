'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import Sticky from 'react-sticky-el';
import { RotateCcw } from 'lucide-react';

const minPriceDefault = 1000;
const maxPriceDefault = 100000000;



export default function UnitsSideSearch({ onChange }: { onChange: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPriceDefault,
    maxPriceDefault,
  ]);
  const [beds, setBeds] = useState<number | null>(null);
  const [baths, setBaths] = useState<number | null>(null);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [propertyTypesList, setPropertyTypesList] = useState<any[]>([]);
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 50000]);

  useEffect(() => {
    fetch('/api/external/fetchLookup?type=UnitType')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          console.log('Fetched property types:', data);
          // Store entire object or at least id and name
          const types = data.map((item: any) => ({ lookupId: item.lookupId, lookupName: item.lookupName }));
          // simple sort by name
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
  }, [searchParams]);

  const updateQuery = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    console.log(key + " = " + value);
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
    console.log("reset");
    onChange('true')
  };

  // Helper to find name by ID
  const getSelectedPropertyTypeName = (id: string | null) => {
    if (!id) return 'Any';
    const found = propertyTypesList.find((item) => String(item.lookupId) === String(id));
    return found ? found.lookupName : id;
  };

  return (
    <div className="w-full block">
      <Sticky stickyClassName="" boundaryElement=".mainsidebar" hideOnBoundaryHit={false}>
        <div className="p-6 grid grid-cols-1 backdrop-blur-xl bg-white/70 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl space-y-8 transition-all duration-300">
          <div className='w-full'>
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <p className="font-bold text-xl text-[#353455]">Filters</p>
              <button onClick={handleReset} className="text-gray-400 text-sm hover:text-secondary flex items-center gap-1 transition-colors">
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </div>
          {/* Price Filter */}
          <div>
            <Popover className="relative">
              <p className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Price Range</p>
              <PopoverButton className="grid w-full cursor-pointer grid-cols-1 rounded-xl bg-white/50 border border-gray-200 py-3 pr-2 pl-4 text-left text-gray-700 outline-none focus:ring-2 focus:ring-[#353455]/10 focus:border-[#353455] transition-all shadow-sm hover:bg-white/80">
                <span className="col-start-1 row-start-1 truncate pr-6 font-medium">
                  {priceRange[0] === minPriceDefault && priceRange[1] === maxPriceDefault
                    ? 'Any'
                    : `${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()} AED`}
                </span>
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl bg-white/95 backdrop-blur-xl p-4 text-base shadow-[0_4px_20px_rgb(0,0,0,0.08)] ring-1 ring-black/5 focus:outline-hidden data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in sm:text-sm"
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="minPrice" className="block text-xs font-medium text-gray-500 mb-1">
                      Minimum Price
                    </label>
                    <input
                      type="number"
                      id="minPrice"
                      className="w-full rounded-lg border-gray-200 bg-white/50 p-2 text-sm placeholder:text-gray-400 focus:border-[#353455] focus:ring-[#353455]/20"
                      placeholder="Min Price"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val <= priceRange[1]) {
                          setPriceRange([val, priceRange[1]]);
                        }
                      }}
                      onBlur={() => updateQuery('minPrice', String(priceRange[0]))}
                    />
                  </div>
                  <div>
                    <label htmlFor="maxPrice" className="block text-xs font-medium text-gray-500 mb-1">
                      Maximum Price
                    </label>
                    <input
                      type="number"
                      id="maxPrice"
                      className="w-full rounded-lg border-gray-200 bg-white/50 p-2 text-sm placeholder:text-gray-400 focus:border-[#353455] focus:ring-[#353455]/20"
                      placeholder="Max Price"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      onBlur={() => updateQuery('maxPrice', String(priceRange[1]))}
                    />
                  </div>
                </div>
              </PopoverPanel>
            </Popover>
          </div>
          {/* Floor Area Filter */}
          <div>
            <Popover className="relative">
              <p className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Floor Area (sqft)</p>
              <PopoverButton className="grid w-full cursor-pointer grid-cols-1 rounded-xl bg-white/50 border border-gray-200 py-3 pr-2 pl-4 text-left text-gray-700 outline-none focus:ring-2 focus:ring-[#353455]/10 focus:border-[#353455] transition-all shadow-sm hover:bg-white/80">
                <span className="col-start-1 row-start-1 truncate pr-6 font-medium">
                  {areaRange[0] === 0 && areaRange[1] === 50000
                    ? 'Any'
                    : `${areaRange[0].toLocaleString()} - ${areaRange[1].toLocaleString()} sqft`}
                </span>
                <ChevronUpDownIcon
                  aria-hidden="true"
                  className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                />
              </PopoverButton>
              <PopoverPanel
                transition
                className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl bg-white/95 backdrop-blur-xl p-4 text-base shadow-[0_4px_20px_rgb(0,0,0,0.08)] ring-1 ring-black/5 focus:outline-hidden data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in sm:text-sm"
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="minArea" className="block text-xs font-medium text-gray-500 mb-1">
                      Min Size
                    </label>
                    <input
                      type="number"
                      id="minArea"
                      className="w-full rounded-lg border-gray-200 bg-white/50 p-2 text-sm placeholder:text-gray-400 focus:border-[#353455] focus:ring-[#353455]/20"
                      placeholder="Min Size"
                      value={areaRange[0]}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val <= areaRange[1]) {
                          setAreaRange([val, areaRange[1]]);
                        }
                      }}
                      onBlur={() => updateQuery('minArea', String(areaRange[0]))}
                    />
                  </div>
                  <div>
                    <label htmlFor="maxArea" className="block text-xs font-medium text-gray-500 mb-1">
                      Max Size
                    </label>
                    <input
                      type="number"
                      id="maxArea"
                      className="w-full rounded-lg border-gray-200 bg-white/50 p-2 text-sm placeholder:text-gray-400 focus:border-[#353455] focus:ring-[#353455]/20"
                      placeholder="Max Size"
                      value={areaRange[1]}
                      onChange={(e) => setAreaRange([areaRange[0], Number(e.target.value)])}
                      onBlur={() => updateQuery('maxArea', String(areaRange[1]))}
                    />
                  </div>
                </div>
              </PopoverPanel>
            </Popover>
          </div>
          {/* Beds Filter */}
          <div>
            <Listbox value={beds} onChange={(e: any) => {
              let val = e;
              setBeds(val ? Number(val) : null);
              updateQuery('beds', val ? val : null);
            }}>
              <Label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Bedrooms</Label>
              <div className="relative mt-2">
                <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-xl bg-white/50 border border-gray-200 py-3 pr-2 pl-4 text-left text-gray-700 outline-none focus:ring-2 focus:ring-[#353455]/10 focus:border-[#353455] transition-all shadow-sm hover:bg-white/80">
                  <span className="col-start-1 row-start-1 truncate pr-6 font-medium">{beds || 'Any'}</span>
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                  />
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white/95 backdrop-blur-xl py-2 text-base shadow-[0_4px_20px_rgb(0,0,0,0.08)] ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                  <ListboxOption
                    value={null}
                    className="group relative cursor-pointer py-2.5 pr-9 pl-4 text-gray-700 select-none data-focus:bg-[#353455]/5 data-focus:text-[#353455]"
                  >
                    <span className="block truncate font-normal group-data-selected:font-semibold">Any</span>
                  </ListboxOption>
                  {[1, 2, 3, 4, 5].map((person: any) => (
                    <ListboxOption
                      key={person}
                      value={person}
                      className="group relative cursor-pointer py-2.5 pr-9 pl-4 text-gray-700 select-none data-focus:bg-[#353455]/5 data-focus:text-[#353455]"
                    >
                      <span className="block truncate font-normal group-data-selected:font-semibold">{person}</span>
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
          <div>
            <Listbox value={propertyType} onChange={(e: any) => {
              let val = e;
              setPropertyType(val || null);
              updateQuery('propertyType', val || null);
            }}>
              <Label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Property Type</Label>
              <div className="relative mt-2">
                <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-xl bg-white/50 border border-gray-200 py-3 pr-2 pl-4 text-left text-gray-700 outline-none focus:ring-2 focus:ring-[#353455]/10 focus:border-[#353455] transition-all shadow-sm hover:bg-white/80">
                  <span className="col-start-1 row-start-1 truncate pr-6 font-medium">{getSelectedPropertyTypeName(propertyType)}</span>
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                  />
                </ListboxButton>
                <ListboxOptions
                  transition
                  className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white/95 backdrop-blur-xl py-2 text-base shadow-[0_4px_20px_rgb(0,0,0,0.08)] ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                  <ListboxOption
                    value={null}
                    className="group relative cursor-pointer py-2.5 pr-9 pl-4 text-gray-700 select-none data-focus:bg-[#353455]/5 data-focus:text-[#353455]"
                  >
                    <span className="block truncate font-normal group-data-selected:font-semibold">Any</span>
                  </ListboxOption>
                  {propertyTypesList.map((person: any) => (
                    <ListboxOption
                      key={person.lookupId}
                      value={person.lookupId}
                      className="group relative cursor-pointer py-2.5 pr-9 pl-4 text-gray-700 select-none data-focus:bg-[#353455]/5 data-focus:text-[#353455]"
                    >
                      <span className="block truncate font-normal group-data-selected:font-semibold">{person.lookupName}</span>
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
      </Sticky>
    </div>
  );
}