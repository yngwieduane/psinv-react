'use client';

import React, { useState } from 'react';
import Breadcrumb from '../_components/Breadcrumb';
import SideBannerCarousel from '../_components/SideBannerCarousel';
import { newsletters } from '@/data/newsletters';
import SocialMediaTabs from '../_components/SocialMediaTabs';
import FooterBannerCarousel from '../_components/FooterBannerCarousel';

export default function NewsletterPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const totalPages = Math.ceil(newsletters.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = newsletters.slice(indexOfFirst, indexOfLast);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="w-full">
      <Breadcrumb />

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <main className="w-full lg:w-[75%] border border-[#dee2e6] rounded-lg p-6 bg-white shadow-sm">
          <h1 className="text-3xl font-bold mb-6">Newsletters</h1>

         {currentItems.map((item, idx) => (
  <div
    key={idx}
    className="border border-[#dee2e6] rounded-lg p-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
  >
    <div className="flex-1">
      <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
      <p className="text-sm text-gray-500 mb-2">{item.date}</p>
      {item.link && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={item.link}
          className="inline-block w-1/4 px-[9px] py-[6px] text-center bg-[#11174c] text-white border border-[#11174c] rounded hover:bg-[#0d133a] transition"
        >
          View Newsletter
        </a>
      )}
    </div>

    {item.image && (
      <img
        src={item.image}
        alt="Newsletter visual"
        style={{ width: '200px', height: '200px' }}
        className="object-cover rounded shadow-md"
      />
    )}
  </div>
))}


          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded ${
                currentPage === 1
                  ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                  : 'text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded ${
                currentPage === totalPages
                  ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                  : 'text-blue-600 border-gray-300 hover:bg-gray-100'
              }`}
            >
              Next
            </button>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="hidden lg:block lg:w-[25%]">
          <SideBannerCarousel />
        </aside>
      </div>

      {/* Optional Social Sections */}
      <section className="container max-w-[1320px] mx-auto px-4 mt-10 md:mt-20 hidden md:block">
        <SocialMediaTabs />
      </section>

      <section className="container max-w-[1320px] mx-auto px-4 mt-10 md:mt-20 hidden md:block">
        <FooterBannerCarousel />
      </section>
    </div>
  );
}
