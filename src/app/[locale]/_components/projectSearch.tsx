import React, { FC, useState, FormEvent, useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useLocale } from 'next-intl';
import slugify from "react-slugify";

interface ProjectSearchProps {
  modalState: boolean;
  onModalUpdate: (state: boolean) => void;
}
type SearchResult = {
    result: [];
    totalCount: string;
};
const ProjectSearch: FC<ProjectSearchProps> = ({ modalState, onModalUpdate }) => {

  const onCloseModal = () => {
    //setOpen(false);
    onModalUpdate(false);
  };

  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const locale = useLocale();

  
  // const searchHandler = async (event:any) => {
  //   setQuery(event.target.value);
    
  //   setLoading(true);
  //   try {
  //     const res = await fetch(`http://localhost:3000/api/external/search?query=${encodeURIComponent(query)}`)
  //     const data: SearchResult[] = await res.json();
  //     console.log(data);
  //     setResults(data['result']);
  //   } catch (error) {
  //     console.error('Search failed', error);
  //     setResults([]);
  //   }

  //   setLoading(false);
  // };

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // try {
    //   const res = await fetch(`/api/external/search?query=${encodeURIComponent(query)}`)
    //   const data = (await res.json()) as { result: SearchResult[] };
    //   console.log(data);
    //   setResults(data.result);
    // } catch (error) {
    //   console.error('Search failed', error);
    //   setResults([]);
    // }

    setLoading(false);
  };
    useEffect(() => {
      const timeout = setTimeout(() => {
        if (query.trim() !== "") {
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
        }
      }, 300);
  
      return () => clearTimeout(timeout);
    }, [query]);

    const handleFocus = (e:any) => {
        //setShowDropdown(true);
        //setQuery('Al Reem');
    };
    const handleBlur = (e:any) => {
        //setShowDropdown(false);
    };

  return (
    <Dialog className="relative z-10" open={modalState} onClose={onCloseModal}>
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                      Search Projects
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={onCloseModal}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <form onSubmit={handleSearch} className="flex  divide-y divide-gray-200 bg-white shadow-xl">
                        <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onClick={handleFocus}
                        onBlur={handleBlur}
                        className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                        <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring"
                        >
                        {loading ? 'Searching...' : 'Search'}
                        </button>
                    </form>
                    <div className="mt-4">
                        {results.length === 0 && query.trim() !== '' ? (
                        <p>No results found.</p>
                        ) : (
                        <ul className="space-y-2">
                            {results.map((project:any,index:any) => {
                                const subCommunity = project.subCommunity ? project.subCommunity : "n-a";
                                const url = "/" + locale + '/projects/' + slugify(project.city) + "/" + slugify(project.community) + "/" + slugify(subCommunity) + "/" + slugify(project.propertyName);
                                return(
                                    <li key={index} className="border p-2 rounded-md">
                                        <Link href={url}>{project.propertyName} </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        )}
                    </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ProjectSearch;