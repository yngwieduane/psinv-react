'use client';
 
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import Form from 'next/form'
import {useLocale} from 'next-intl';
import Autocomplete from './AutocompleteSearch';
 
export default function Search({ placeholder }: { placeholder: string }) {
    
    const searchParams = useSearchParams();
    //const pathname = usePathname();
    //const { replace } = useRouter();
    const locale = useLocale();

    // function handleSearch(term: string) {

    //     console.log(`Searching... ${term}`);
    //     const params = new URLSearchParams(searchParams);
    //     if (term) {
    //         params.set('unitid', term);
    //     } else {
    //         params.delete('unitid');
    //     }
    //     replace(`${pathname}?${params.toString()}`);
    // }

  return (
    <Form action={`/${locale}/units`}>
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-5 items-center">
            <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                    Search By ID
                </label>
                <div className="mt-2">
                <input
                    placeholder={placeholder}
                    id="unitid"
                    name="unitid"
                    // onChange={(e) => {
                    // handleSearch(e.target.value);
                    // }}
                    defaultValue={searchParams.get('unitid')?.toString()}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                </div>
            </div>
            <div className="">
                <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
                    Category
                </label>
                <div className="mt-2 grid grid-cols-1">
                    <select
                        id="category"
                        name="category"
                        autoComplete="category"
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
            <div>
                <button type="submit"
                    className="rounded-xl bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                >Search</button>
            </div>
        </div>
    </Form>
  );
}