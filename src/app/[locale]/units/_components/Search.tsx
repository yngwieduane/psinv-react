'use client';
 
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Form from 'next/form'
import {useLocale} from 'next-intl';
import Autocomplete from './AutocompleteSearch';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FilterUnitsDrawer from './FilterUnitsDrawer';
 
export default function Search({ placeholder }: { placeholder: string }) {
    
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const onSubmit = (e:any) => {
        setLoading(true);

        setTimeout(() => {
            console.log('Action completed');
            console.log(e.target.value);
            updateQuery('category',e.target.value)
            setLoading(false);
        }, 2000);
    };
    const searchParams = useSearchParams();
    const locale = useLocale();

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

  return (
    <Form action={`/${locale}/units`}>
        <div className="relative flex md:grid md:grid-cols-4 gap-5 items-end">
            <div className="col-span-3 w-full">
                <Autocomplete />
            </div>
            <div className='hidden'>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Search By ID
                </label>
                <div className="">
                <input
                    placeholder={placeholder}
                    id="unitid"
                    name="unitid"
                    defaultValue={searchParams.get('unitid')?.toString()}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                </div>
            </div>
            <div className="grid md:hidden min-w-[45px]">
                <FilterUnitsDrawer
                    // onChange={handleSliderRange}
                />
            </div>
            <div className="hidden md:grid">
                <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
                    Category
                </label>
                <div className=" grid grid-cols-1">
                    <select
                        id="category"
                        name="category"
                        autoComplete="category"
                        onChange={onSubmit}
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                        <option value="sale">Sale</option>
                        <option value="rent">Rent</option>
                    </select>
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                </div>
            </div>
            <div className='hidden'>
                <button 
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 cursor-pointer"
                >{loading ? 'Searching ...' : 'Search'}</button>
            </div>
            <input
                placeholder={placeholder}
                id="minPrice"
                name="minPrice"
                defaultValue={searchParams.get('minPrice')?.toString()}
                className="hidden"
            />
            <input
                placeholder={placeholder}
                id="maxPrice"
                name="maxPrice"
                defaultValue={searchParams.get('maxPrice')?.toString()}
                className="hidden"
            />
            <input
                placeholder={placeholder}
                id="beds"
                name="beds"
                defaultValue={searchParams.get('beds')?.toString()}
                className="hidden"
            />
            <input
                placeholder={placeholder}
                id="baths"
                name="baths"
                defaultValue={searchParams.get('baths')?.toString()}
                className="hidden"
            />
            <input
                placeholder={placeholder}
                id="propertyType"
                name="propertyType"
                defaultValue={searchParams.get('propertyType')?.toString()}
                className="hidden"
            />
        </div>
    </Form>
  );
}