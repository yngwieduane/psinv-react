import React, { FC, useState, FormEvent, useEffect, Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { XMarkIcon, MagnifyingGlassIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";
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
    onModalUpdate(false);
  };

  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<any[]>([]); // Typed as any[] based on usage, normally SearchResult['result']
  const [loading, setLoading] = useState<boolean>(false);

  const locale = useLocale();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    // Manual submission if needed, but useEffect handles it
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim() !== "") {
        setLoading(true);
        fetch(`/api/external/search?query=${query}`)
          .then(res => res.json())
          .then(data => {
            setResults(data.result || []);
            setLoading(false);
          })
          .catch(() => {
            setResults([]);
            setLoading(false);
          });
      } else {
        setResults([]);
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  // Highlight matches function could be added here for extra premium feel

  return (
    <Transition show={modalState} as={Fragment}>
      <Dialog className="relative z-90" onClose={onCloseModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white dark:bg-gray-800 shadow-2xl">
                    <div className="px-4 py-6 sm:px-6 border-b border-gray-100 dark:border-gray-700">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-xl font-bold leading-6 text-gray-900 dark:text-white">
                          Search Projects
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 dark:text-white dark:bg-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                            onClick={onCloseModal}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Search Input Area */}
                    <div className="p-4 sm:p-6 bg-gray-50/50 dark:bg-gray-800">
                      <form onSubmit={handleSearch} className="relative">
                        <div className="relative rounded-xl shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          <input
                            type="text"
                            placeholder="Search by project, community..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="block w-full rounded-xl border-0 py-4 pl-11 pr-10 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-200 dark:ring-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#111954] sm:text-sm sm:leading-6 shadow-sm transition-shadow"
                            autoFocus
                          />
                          {query && (
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              <button
                                type="button"
                                onClick={() => setQuery('')}
                                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
                              >
                                <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </div>
                          )}
                        </div>
                      </form>
                    </div>

                    {/* Results Area */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
                      {loading ? (
                        <div className="space-y-4 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="animate-pulse flex space-x-4 p-3 rounded-lg border border-gray-100">
                              <div className="h-10 w-10 bg-gray-200 rounded-md"></div>
                              <div className="flex-1 space-y-2 py-1">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {results.length === 0 && query.trim() !== '' ? (
                            <div className="flex flex-col items-center justify-center pt-20 text-center text-gray-500 dark:text-gray-400">
                              <MagnifyingGlassIcon className="h-12 w-12 text-gray-300 mb-3" />
                              <p className="text-lg font-medium text-gray-900 dark:text-white">No projects found</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">We couldn't find anything matching "{query}"</p>
                            </div>
                          ) : (
                            <ul className="space-y-3">
                              {results.map((project: any, index: any) => {
                                const subCommunity = project.subCommunity ? project.subCommunity : "n-a";
                                const url = "/" + locale + '/projects/' + slugify(project.city) + "/" + slugify(project.community) + "/" + slugify(subCommunity) + "/" + slugify(project.propertyName);

                                return (
                                  <li key={index}>
                                    <Link
                                      href={url}
                                      onClick={onCloseModal}
                                      className="group flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all duration-200"
                                    >
                                      <div className="flex-shrink-0 mt-1">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-50 text-[#111954] group-hover:bg-[#111954] group-hover:text-white transition-colors duration-200">
                                          <BuildingOffice2Icon className="h-6 w-6" />
                                        </div>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-base font-semibold text-gray-900 group-hover:text-[#111954] transition-colors dark:text-white">
                                          {project.propertyName}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate mt-0.5 dark:text-gray-400">
                                          {[project.community, project.city].filter(Boolean).join(', ')}
                                        </p>
                                        {project.subCommunity && (
                                          <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mt-2 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700">
                                            {project.subCommunity}
                                          </span>
                                        )}
                                      </div>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      )}

                      {!query && !loading && (
                        <div className="pt-10 text-center">
                          <p className="text-sm text-gray-400">Start typing to search for projects...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProjectSearch;