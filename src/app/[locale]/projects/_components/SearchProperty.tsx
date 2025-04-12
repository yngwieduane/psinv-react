'use client';
 
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import Form from 'next/form'
import {useLocale} from 'next-intl';
 
export default function SearchProperty({ placeholder }: { placeholder: string }) {
    
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
    <Form action={`/${locale}/projects`}>
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-5 items-center">
            <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                {placeholder}
                </label>
                <div className="mt-2">
                <input
                    placeholder={placeholder}
                    id="propertyname"
                    name="propertyname"
                    // onChange={(e) => {
                    // handleSearch(e.target.value);
                    // }}
                    defaultValue={searchParams.get('propertyname')?.toString()}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                </div>
            </div>
            <div className="">
                <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
                    Is Featured?
                </label>
                <div className="mt-2 grid grid-cols-1">
                    <select
                        id="isFeaturedProjectOnWeb"
                        name="isFeaturedProjectOnWeb"
                        autoComplete="isFeaturedProjectOnWeb"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                </div>
            </div>
            <div>
                <button type="submit"
                    className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                >Search</button>
            </div>
        </div>
    </Form>
  );
}