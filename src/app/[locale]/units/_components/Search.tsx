'use client';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Form from 'next/form'
import { useLocale } from 'next-intl';
import AutocompleteSearch from './AutocompleteSearch';
import { useState } from 'react';
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FilterUnitsDrawer from './FilterUnitsDrawer';

export default function Search({ placeholder }: { placeholder: string }) {

    const searchParams = useSearchParams();
    const locale = useLocale();
    const [loading, setLoading] = useState(false);
    const [reset, setReset] = useState(false);

    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice')?.toString());
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice')?.toString());
    const [beds, setBeds] = useState(searchParams.get('beds')?.toString());
    const [baths, setBaths] = useState(searchParams.get('baths')?.toString());
    const [propertyType, setPropertyType] = useState(searchParams.get('propertyType')?.toString());

    const router = useRouter();
    const pathname = usePathname();

    const onSubmit = (e: any) => {
        setLoading(true);

        setTimeout(() => {
            console.log('Action completed');
            console.log(e.target.value);
            updateQuery('category', e.target.value)
            setLoading(false);
        }, 2000);
    };

    const updateQuery = useDebouncedCallback((key: string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === null || value === '') {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        console.log(key + " = " + value);
        router.push(`${pathname}?${params.toString()}`);
    }, 300);

    const handleReset = (e: any) => {
        setReset(e);
        console.log("Search = " + e);
        if (e === 'true') {
            setMinPrice('');
            setMaxPrice('');
            setBeds('');
            setBaths('');
            setPropertyType('');
        }
    };

    return (
        <Form action={`/${locale}/units`}>
            <div className="w-full mx-auto backdrop-blur-xl bg-white/70 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <div className="flex flex-col md:grid md:grid-cols-12 gap-6 items-end">
                    <div className="w-full md:col-span-9 relative z-90">
                        <AutocompleteSearch isReset={reset} />
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

                    <div className="grid md:hidden w-full">
                        <FilterUnitsDrawer
                            onChange={handleReset}
                        // onChange={handleSliderRange}
                        />
                    </div>

                    <div className="hidden md:block md:col-span-3 w-full">
                        <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                            Category
                        </label>
                        <div className="relative">
                            <select
                                id="category"
                                name="category"
                                autoComplete="category"
                                defaultValue={searchParams.get('category')?.toString()}
                                onChange={onSubmit}
                                className="w-full appearance-none rounded-xl bg-white/50 border border-gray-200 py-3.5 pr-10 pl-5 text-base text-gray-700 outline-none focus:ring-2 focus:ring-[#353455]/10 focus:border-[#353455] transition-all duration-200 cursor-pointer shadow-sm hover:bg-white/80"
                            >
                                <option value="Sale">Sale</option>
                                <option value="Rent">Rent</option>
                            </select>
                            <ChevronDownIcon
                                aria-hidden="true"
                                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-500"
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
                        defaultValue={minPrice}
                        className="hidden"
                    />
                    <input
                        placeholder={placeholder}
                        id="maxPrice"
                        name="maxPrice"
                        defaultValue={maxPrice}
                        className="hidden"
                    />
                    <input
                        placeholder={placeholder}
                        id="beds"
                        name="beds"
                        defaultValue={beds}
                        className="hidden"
                    />
                    <input
                        placeholder={placeholder}
                        id="baths"
                        name="baths"
                        defaultValue={baths}
                        className="hidden"
                    />
                    <input
                        placeholder={placeholder}
                        id="propertyType"
                        name="propertyType"
                        defaultValue={propertyType}
                        className="hidden"
                    />
                </div>
            </div>
        </Form>
    );
}