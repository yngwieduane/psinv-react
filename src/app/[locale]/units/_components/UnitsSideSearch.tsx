'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { useDebouncedCallback } from 'use-debounce';
import MultiRangeSlider from './MultiRangeSlider';

const minPriceDefault = 1000;
const maxPriceDefault = 100000000;

const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse'];

export default function FilterPanel() {
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
    router.push(`${pathname}?${params.toString()}`);

    setPriceRange([minPriceDefault, maxPriceDefault]);
    setBeds(null);
    setBaths(null);
    setPropertyType(null);
  };

  const handleSliderRange = (e:any) => {
        //console.log(e);
        console.log(`min = ${e.min}, max = ${e.max}`)
        //setPriceRange([e.min, e.max]);
  };

  const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

  return (
    <div>
        <div className="p-4 border border-gray-300 rounded-md space-y-6">
        <div className="flex justify-between items-center">
            <p className="font-medium">Filters</p>
            <button onClick={handleReset} className="text-blue-600 text-sm underline">
            Reset All
            </button>
        </div>
        {/* Price Filter */}
        <div>
            <p className="font-semibold mb-2">Price</p>
            <MultiRangeSlider
                min={0}
                max={50000000}
                onChange={handleSliderRange}
            />
        </div>

        {/* Beds Filter */}
        <div>
            <p className="font-semibold mb-2">Bedrooms</p>
            <select
            value={beds ?? ''}
            onChange={(e) => {
                const val = e.target.value;
                setBeds(val ? Number(val) : null);
                updateQuery('beds', val ? val : null);
            }}
            className="w-full border rounded px-3 py-2"
            >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                {num}+
                </option>
            ))}
            </select>
        </div>

        {/* Baths Filter */}
        <div>
            <p className="font-semibold mb-2">Bathrooms</p>
            <select
            value={baths ?? ''}
            onChange={(e) => {
                const val = e.target.value;
                setBaths(val ? Number(val) : null);
                updateQuery('baths', val ? val : null);
            }}
            className="w-full border rounded px-3 py-2"
            >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                {num}+
                </option>
            ))}
            </select>
        </div>

        {/* Property Type */}
        <div>
            <p className="font-semibold mb-2">Property Type</p>
            <select
            value={propertyType ?? ''}
            onChange={(e) => {
                const val = e.target.value;
                setPropertyType(val || null);
                updateQuery('propertyType', val || null);
            }}
            className="w-full border rounded px-3 py-2"
            >
            <option value="">Any</option>
            {propertyTypes.map((type) => (
                <option key={type} value={type}>
                {type}
                </option>
            ))}
            </select>
        </div>
        </div>
    </div>
  );
}