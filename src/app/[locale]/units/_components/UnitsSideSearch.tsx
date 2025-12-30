'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import Sticky from 'react-sticky-el';
import { RotateCcw } from 'lucide-react';

const minPriceDefault = 1000;
const maxPriceDefault = 100000000;

const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse'];

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

  useEffect(() => {
    const min = Number(searchParams.get('minPrice')) || minPriceDefault;
    const max = Number(searchParams.get('maxPrice')) || maxPriceDefault;
    setPriceRange([min, max]);

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
    params.delete('beds');
    params.delete('baths');
    params.delete('propertyType');
    params.delete('propertyId');
    params.delete('category');
    router.push(`${pathname}?${params.toString()}`);

    setPriceRange([minPriceDefault, maxPriceDefault]);
    setBeds(null);
    setBaths(null);
    setPropertyType(null);
    console.log("reset");
    onChange('true')
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
          <div className='hidden'>
            <p className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">Price</p>
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
                  <span className="col-start-1 row-start-1 truncate pr-6 font-medium">{propertyType || 'Any'}</span>
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
                  {propertyTypes.map((person: any) => (
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
        </div>
      </Sticky>
    </div>
  );
}