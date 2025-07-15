'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useDebouncedCallback } from 'use-debounce';
import MultiRangeSlider from './MultiRangeSlider';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import Sticky from 'react-sticky-el';

const minPriceDefault = 1000;
const maxPriceDefault = 100000000;

const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse'];

export default function UnitsSideSearch({ onChange }:{ onChange:any }) {
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
    console.log(key + " = " + value );
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

  const handleSliderRange = (e:any) => {
    //console.log(e);
    console.log(`min = ${e.min}, max = ${e.max}`)
    //setPriceRange([e.min, e.max]);
  };

  const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

  return (
    <div className="w-full block mainsidebar">
      <Sticky stickyClassName="" boundaryElement=".mainsidebar"  hideOnBoundaryHit={false}>
        <div className="p-4 grid grid-cols-1 border border-gray-300 rounded-md space-y-6 ">
          <div className='w-full'>
            <div className="flex justify-between items-center">
              <p className="font-medium">Filters</p>
              <button onClick={handleReset} className="text-blue-600 text-sm underline">
                Reset All
              </button>
            </div>
          </div>
          {/* Price Filter */}
          <div>
            <p className="block text-lg font-medium text-gray-900 mb-2">Price</p>
            <MultiRangeSlider
              min={0}
              max={50000000}
              onChange={handleSliderRange}
            />
          </div>
          {/* Beds Filter */}
          <div>
            <Listbox value={beds} onChange={(e:any) => {
                let val = e;
                setBeds(val ? Number(val) : null);
                updateQuery('beds', val ? val : null);
              }}>
              <Label className="block text-lg font-medium text-gray-900">Bedrooms</Label>
              <div className="relative mt-2">
                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-2.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-xl">
                  <span className="col-start-1 row-start-1 truncate pr-6">{beds}</span>
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-lg shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                  >
                  {[1, 2, 3, 4, 5].map((person:any) => (
                  <ListboxOption
                      key={person}
                      value={person}
                      className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                    >
                    <span className="block truncate font-normal group-data-selected:font-semibold">{person}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                      <CheckIcon aria-hidden="true" className="size-5" />
                    </span>
                  </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          {/* Baths Filter */}
          <div>
            <Listbox value={baths} onChange={(e:any) => {
                let val = e;
                setBaths(val ? Number(val) : null);
                updateQuery('baths', val ? val : null);
              }}>
              <Label className="block text-lg font-medium text-gray-900">Bathrooms</Label>
              <div className="relative mt-2">
                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-2.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-lg">
                  <span className="col-start-1 row-start-1 truncate pr-6">{baths}</span>
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-lg shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                >
                  {[1, 2, 3, 4, 5].map((person:any) => (
                    <ListboxOption
                      key={person}
                      value={person}
                      className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                      >
                      <span className="block truncate font-normal group-data-selected:font-semibold">{person}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
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
            <Listbox value={propertyType} onChange={(e:any) => {
              let val = e;
              setPropertyType(val || null);
              updateQuery('propertyType', val || null);
              }}>
              <Label className="block text-lg font-medium text-gray-900">Property Type</Label>
              <div className="relative mt-2">
                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-2.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-lg">
                  <span className="col-start-1 row-start-1 truncate pr-6">{propertyType}</span>
                  <ChevronUpDownIcon
                    aria-hidden="true"
                    className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </ListboxButton>
                <ListboxOptions
                  transition
                  className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-lg shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                  >
                  {propertyTypes.map((person:any) => (
                    <ListboxOption
                      key={person}
                      value={person}
                      className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                      >
                      <span className="block truncate font-normal group-data-selected:font-semibold">{person}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
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