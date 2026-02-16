'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import Sticky from 'react-sticky-el';
import { RotateCcw } from 'lucide-react';
import MultiRangeSlider from './MultiRangeSlider';
import { useTranslations } from 'next-intl';

const minPriceDefault = 1000;
const maxPriceDefault = 40000000;

export default function UnitsSideSearch({ onChange }: { onChange: any }) {
  const t = useTranslations('UnitsPageAI');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPriceDefault,
    maxPriceDefault,
  ]);
  const [beds, setBeds] = useState<number | null>(null);
  const [baths, setBaths] = useState<number | null>(null);
  // Changed to array for multi-select
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [propertyTypesList, setPropertyTypesList] = useState<any[]>([]);
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 50000]);

  useEffect(() => {
    fetch('/api/external/fetchLookup?type=UnitType')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          console.log('Fetched property types:', data);

          const RESIDENTIAL_TYPES = [
            "Apartment", "Villa", "Townhouse", "Studio",
            "Twin House", "Penthouse"
          ];

          const COMMERCIAL_TYPES = [
            "Office", "Warehouse", "Retail", "Shop", "Plot",
          ];

          const residential: any[] = [];
          const commercial: any[] = [];

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
            { groupName: t('Residential'), items: residential },
            { groupName: t('Commercial'), items: commercial }
          ];

          setPropertyTypesList(grouped);
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

    // Parse propertyType from URL (comma separated)
    const typeParam = searchParams.get('propertyType');
    if (typeParam) {
      setSelectedPropertyTypes(typeParam.split(','));
    } else {
      setSelectedPropertyTypes([]);
    }
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

  const updatePropertyTypes = (newTypes: string[]) => {
    setSelectedPropertyTypes(newTypes);
    if (newTypes.length === 0) {
      updateQuery('propertyType', null);
    } else {
      updateQuery('propertyType', newTypes.join(','));
    }
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
    setSelectedPropertyTypes([]);
    console.log("reset");
    onChange('true')
  };

  const togglePropertyType = (id: string) => {
    const current = new Set(selectedPropertyTypes);
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    updatePropertyTypes(Array.from(current));
  };


  return (
    <div className="w-full block">
      <div className="p-6 grid grid-cols-1 backdrop-blur-xl bg-white/70 dark:bg-gray-800 border border-white/60 dark:border-gray-700 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl space-y-8 transition-all duration-300">
        <div className='w-full'>
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <p className="font-bold text-xl text-[#353455] dark:text-white">{t('filters')}</p>
            <button onClick={handleReset} className="text-gray-400 text-sm hover:text-secondary flex items-center gap-1 transition-colors dark:text-white dark:hover:text-gray-200">
              <RotateCcw size={14} /> {t('reset')}
            </button>
          </div>
        </div>
        {/* Beds Filter */}
        <div className="space-y-4">
          <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-white">{t('bedrooms')}</label>
          <div className="space-y-2">

            {/* Any Option */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className={`
                  w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200
                  ${beds === null ? 'border-[#353455]' : 'border-gray-300 group-hover:border-[#353455] dark:group-hover:border-white'}
               `}>
                {beds === null && <div className="w-2.5 h-2.5 rounded-full bg-[#353455]" />}
              </div>
              <input
                type="radio"
                name="beds"
                className="hidden"
                checked={beds === null}
                onChange={() => {
                  setBeds(null);
                  updateQuery('beds', null);
                }}
              />
              <span className={`text-sm transition-colors dark:text-white ${beds === null ? 'font-medium text-[#353455] ' : 'text-gray-600 group-hover:text-[#353455] dark:group-hover:text-white'}`}>
                {t('any')}
              </span>
            </label>

            {[1, 2, 3, 4, 5].map((bedCount) => (
              <label key={bedCount} className="flex items-center gap-3 cursor-pointer group">
                <div className={`
                        w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200
                        ${beds === bedCount ? 'border-[#353455] dark:border-white' : 'border-gray-300 group-hover:border-[#353455] dark:group-hover:border-white'}
                    `}>
                  {beds === bedCount && <div className="w-2.5 h-2.5 rounded-full bg-[#353455] dark:bg-white" />}
                </div>
                <input
                  type="radio"
                  name="beds"
                  className="hidden"
                  checked={beds === bedCount}
                  onChange={() => {
                    setBeds(bedCount);
                    updateQuery('beds', String(bedCount));
                  }}
                />
                <span className={`text-sm transition-colors dark:text-white ${beds === bedCount ? 'font-medium text-[#353455]' : 'text-gray-600 group-hover:text-[#353455] dark:group-hover:text-white'}`}>
                  {bedCount} {bedCount === 1 ? `${t('bedroom')}` : `${t('bedrooms')}`}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100" />

        {/* Property Type Groups (Radio Buttons) */}
        <div className="space-y-4">
          <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-white">{t('types')}</label>

          {/* Any Option */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`
              w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 
              ${selectedPropertyTypes.length === 0 ? 'border-[#353455] dark:border-white' : 'border-gray-300 group-hover:border-[#353455] dark:group-hover:border-white'}
            `}>
              {selectedPropertyTypes.length === 0 && <div className="w-2.5 h-2.5 rounded-full bg-[#353455] dark:bg-white" />}
            </div>
            <input
              type="radio"
              name="propertyType"
              className="hidden"
              checked={selectedPropertyTypes.length === 0}
              onChange={() => {
                setSelectedPropertyTypes([]);
                updateQuery('propertyType', null);
              }}
            />
            <span className={`text-sm transition-colors dark:text-white ${selectedPropertyTypes.length === 0 ? 'font-medium text-[#353455]' : 'text-gray-600 group-hover:text-[#353455] dark:group-hover:text-white'}`}>
              {t('any')}
            </span>
          </label>

          {propertyTypesList.map((group) => (
            <div key={group.groupName} className="space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{group.groupName}</p>
              <div className="space-y-2">
                {group.items.map((type: any) => {
                  const isSelected = selectedPropertyTypes.includes(String(type.lookupName));
                  return (
                    <label key={type.lookupId} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`
                        w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200
                        ${isSelected ? 'border-[#353455] dark:border-white' : 'border-gray-300 group-hover:border-[#353455] dark:group-hover:border-white'}
                      `}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#353455] dark:bg-white" />}
                      </div>
                      <input
                        type="radio"
                        name="propertyType"
                        className="hidden"
                        checked={isSelected}
                        onChange={() => {
                          const newType = String(type.lookupName);
                          setSelectedPropertyTypes([newType]);
                          updateQuery('propertyType', newType);
                        }}
                      />
                      <span className={`text-sm transition-colors dark:text-white ${isSelected ? 'font-medium text-[#353455]' : 'text-gray-600 group-hover:text-[#353455] dark:group-hover:text-white'}`}>
                        {t(type.lookupName)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100" />

        {/* Price Filter */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="block text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-white">{t('price')}</p>
            <button
              onClick={() => {
                setPriceRange([minPriceDefault, maxPriceDefault]);
                updateQuery('minPrice', null);
                updateQuery('maxPrice', null);
              }}
              className="text-sm font-medium text-[#005a9c] hover:underline dark:text-white"
            >
              {t('reset')}
            </button>
          </div>
          <MultiRangeSlider
            min={minPriceDefault}
            max={maxPriceDefault}
            minVal={priceRange[0]}
            maxVal={priceRange[1]}
            onChange={({ min, max }: { min: number; max: number }) => setPriceRange([min, max])}
            onAfterChange={({ min, max }: { min: number; max: number }) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set('minPrice', String(min));
              params.set('maxPrice', String(max));
              router.push(`${pathname}?${params.toString()}`);
            }}
          />
        </div>

        <div className="border-t border-gray-100" />

        {/* Floor Area Filter */}
        <div>
          {/* Floor Area Filter */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <p className="block text-sm font-bold uppercase tracking-wider text-gray-500">{t('Floor Area')}</p>
              <button
                onClick={() => {
                  setAreaRange([0, 50000]);
                  updateQuery('minArea', null);
                  updateQuery('maxArea', null);
                }}
                className="text-sm font-medium text-[#005a9c] hover:underline"
              >
                {t('reset')}
              </button>
            </div>
            <MultiRangeSlider
              min={0}
              max={50000}
              minVal={areaRange[0]}
              maxVal={areaRange[1]}
              onChange={({ min, max }: { min: number; max: number }) => setAreaRange([min, max])}
              onAfterChange={({ min, max }: { min: number; max: number }) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('minArea', String(min));
                params.set('maxArea', String(max));
                router.push(`${pathname}?${params.toString()}`);
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}