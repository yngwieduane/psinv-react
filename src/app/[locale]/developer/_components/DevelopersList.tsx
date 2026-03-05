'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { UsersIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import InquiryForm from "@/app/[locale]/_components/InquiryForm";

interface DeveloperData {
  id: string;
  name: string;
  slug: string;
  logo: string;
}

const DevelopersList = ({ slug }: { slug: string }) => {
  const [developersData, setDevelopersData] = useState<DeveloperData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState<DeveloperData | null>(null);

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "developers"));
        const fetched = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "Unknown Developer",
            slug: data.slug || "",
            logo: data.logo || "",
          } as DeveloperData;
        });

        // Sort alphabetically
        fetched.sort((a, b) => a.name.localeCompare(b.name));
        setDevelopersData(fetched);
      } catch (error) {
        console.error("Failed to load developers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  const handleOpenModal = (developer: DeveloperData, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedDeveloper(developer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDeveloper(null);
  };

  const isMainPage = !slug;

  const filteredDevelopers = developersData.filter((dev) =>
    dev.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredDevelopers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDevelopers = filteredDevelopers.slice(indexOfFirstItem, indexOfLastItem);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const sortedForSlider = [...developersData].sort((a, b) => {
    if (a.slug === slug) return -1;
    if (b.slug === slug) return 1;
    return a.name.localeCompare(b.name);
  });

  if (loading) {
    return (
      <div className="w-full h-40 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isMainPage) {
    return (
      <div className="w-full px-4 md:px-0">
        <div className="mb-12 max-w-3xl mx-auto relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-14 pr-6 py-4 rounded-full border border-gray-200 bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md focus:shadow-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 text-lg dark:bg-gray-800 dark:border-neutral-800 dark:text-white"
            placeholder="Search our premium real estate developers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredDevelopers.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <MagnifyingGlassIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-lg text-gray-600 font-medium">No developers found matching &quot;{searchQuery}&quot;</p>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your search criteria</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentDevelopers.map((developer) => (
                <div
                  key={developer.id}
                  className="group relative bg-white border border-gray-200 rounded-xl flex flex-col justify-start min-h-[300px] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden dark:bg-gray-800 dark:border-neutral-800 dark:text-white"
                >
                  <Link href={`/en/developer/${developer.slug || developer.id}`} className="absolute inset-0 z-10" aria-label={`View ${developer.name}`} />

                  {/* Image Header Section */}
                  <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center p-6 border-b border-gray-100 overflow-hidden dark:bg-gray-800 dark:border-neutral-800 dark:text-white">
                    {/* Placeholder Background for developers without project images to match the design's "hero" feel */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-gray-100/80"></div>

                    {/* Developer Logo */}
                    <div className="relative z-20 w-32 h-32 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center p-4">
                      {developer.logo ? (
                        <img
                          src={developer.logo}
                          className="max-h-full max-w-full object-contain filter group-hover:scale-110 transition-transform duration-500 ease-out"
                          alt={`${developer.name} logo`}
                          loading="lazy"
                        />
                      ) : (
                        <UsersIcon className="h-10 w-10 text-gray-300 group-hover:scale-110 transition-transform duration-500" />
                      )}
                    </div>
                  </div>

                  {/* Body Section */}
                  <div className="p-5 flex-1 flex flex-col relative z-20 bg-white dark:bg-gray-800 dark:border-neutral-800 dark:text-white">
                    <h3 className="text-[17px] font-bold text-gray-900 uppercase tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors dark:text-white">
                      {developer.name}
                    </h3>
                  </div>

                  {/* Contact / Action Footer (Matching the specs bar in image) */}
                  <div className="w-full border-t border-gray-100 py-3 px-5 flex items-center justify-between bg-white relative z-20 dark:bg-gray-800 dark:border-dark-900 dark:text-white">
                    <div className="flex items-center gap-4 w-full justify-between">

                      {/* Email */}
                      <button
                        onClick={(e) => handleOpenModal(developer, e)}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors bg-transparent border-none cursor-pointer p-0 dark:text-white"
                        title="Email Developer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <span className="">Email</span>
                      </button>

                      {/* Website */}
                      <a
                        href={`https://www.${developer.slug || 'example'}.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors dark:text-white"
                        title="Visit Website"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                        <span className="">Visit Site</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {
              totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:bg-gray-800 dark:border-neutral-800 dark:text-white"
                  >
                    Previous
                  </button>
                  <div className="flex items-center gap-1 mx-2">
                    {(() => {
                      // Logic to show clustered pagination (e.g. 1 2 3 ... 9 10)
                      const delta = 2; // How many pages to show before and after current page
                      const range = [];
                      for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
                        range.push(i);
                      }

                      if (currentPage - delta > 2) {
                        range.unshift("...");
                      }
                      if (currentPage + delta < totalPages - 1) {
                        range.push("...");
                      }

                      range.unshift(1);
                      if (totalPages > 1) {
                        range.push(totalPages);
                      }

                      return range.map((page, index) => (
                        page === "..." ? (
                          <span key={`ellipsis-${index}`} className="w-8 flex justify-center text-gray-400">...</span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page as number)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                            ${currentPage === page
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-gray-600 hover:bg-gray-100"
                              }`}
                          >
                            {page}
                          </button>
                        )
                      ));
                    })()}
                  </div>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:bg-gray-800 dark:border-neutral-800 dark:text-white"
                  >
                    Next
                  </button>
                </div>
              )
            }
          </>
        )}

        {/* Inquiry Form Modal */}
        {isModalOpen && selectedDeveloper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200 dark:bg-black/60 dark:backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl relative dark:bg-gray-800 dark:border-neutral-800">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors z-10"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>

              <div className="p-6 pb-2 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-1 dark:text-white">Inquire with {selectedDeveloper.name}</h2>
                <p className="text-sm text-gray-500 dark:text-white">Please fill out the form below and their team will get back to you shortly.</p>
              </div>

              <div className="p-2">
                <InquiryForm branchCode="auh" hideFeedbackButton={true} defaultMessage={`I would like to inquire regarding ${selectedDeveloper.name}.`} />
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // Slider for specific developer page (Alternative View)
  return (
    <div className="flex 2xl:justify-center gap-5 xl:overflow-x-hidden overflow-x-auto w-full scroll-smooth snap-x snap-mandatory scrollbar-hide py-6 px-2 hidden">
      {sortedForSlider.map((developer) => {
        const isActive = slug === developer.slug;
        return (
          <div
            key={developer.id}
            className={`relative flex-shrink-0 w-[150px] md:w-[170px] h-[170px] md:h-[190px] snap-start rounded-3xl flex flex-col items-center justify-between p-5 transition-all duration-500 cursor-pointer overflow-hidden
            ${isActive
                ? "bg-gradient-to-br from-gray-50 to-white border-2 border-black shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] ring-4 ring-black/5"
                : "bg-white border border-gray-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 hover:border-gray-200"
              }`}
          >
            <Link href={`/en/developer/${developer.slug || developer.id}`} className="absolute inset-0 z-10" aria-label={`View ${developer.name}`} />

            <div className="flex-1 w-full flex items-center justify-center">
              {developer.logo ? (
                <img
                  src={developer.logo}
                  className={`max-h-16 max-w-[110px] object-contain transition-transform duration-500 ease-out ${isActive ? 'scale-105' : 'group-hover:scale-110'}`}
                  alt={developer.name}
                  loading="lazy"
                />
              ) : (
                <div className="h-14 w-14 rounded-full bg-gray-50 flex items-center justify-center">
                  <UsersIcon className="h-7 w-7 text-gray-300" />
                </div>
              )}
            </div>

            <div className="w-full mt-4 text-center border-t border-gray-50 pt-3">
              <p className={`text-xs md:text-sm font-semibold line-clamp-2 leading-tight ${isActive ? 'text-black' : 'text-gray-700 group-hover:text-blue-600 transition-colors'}`}>
                {developer.name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DevelopersList;