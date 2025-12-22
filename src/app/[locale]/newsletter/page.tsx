'use client';

import React, * as react from 'react';
import { newsletters } from '@/data/newsletters';
import Image from 'next/image';

const ALL_NEWSLETTER = 'All Newsletter';

export default function NewsletterPage() {
  const [currentPage, setCurrentPage] = react.useState(1);
  const [activeCategory, setActiveCategory] = react.useState(ALL_NEWSLETTER);
  const itemsPerPage = 9;

  const categories = [ALL_NEWSLETTER];
  const filteredItems = newsletters;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  return (
    <div className="bg-white min-h-screen">
     

      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">Latest Insights & News</h1>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            Stay ahead of the market with exclusive updates, real estate trends, and investment opportunities from PSI.
          </p>
        </header>

        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-2 font-semibold rounded-full transition-colors duration-300 ${
                activeCategory === category
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>


        {/* Main Content */}
        <main className="w-full">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md overflow-hidden group border border-gray-200"
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* <span className="absolute top-4 left-4 bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item.category}
                  </span> */}
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-2">{item.date}</p>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 h-20 overflow-hidden">
                    {item.title}
                  </h2>
                  {item.link && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item.link}
                      className="font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300 group"
                    >
                      READ NEWSLETTER <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">&rarr;</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 text-gray-700 bg-white rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              &larr;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 font-semibold rounded-full transition-colors duration-300 ${
                  currentPage === page
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-gray-700 bg-white rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              &rarr;
            </button>
          </div>
        </main>
      </div>

      {/* Subscription Section */}
      <section className="bg-[#11174c] py-20 mt-16">
        <div className="container mx-auto px-4 text-center">
            <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
          <h2 className="text-4xl font-bold text-white mb-4">Subscribe to our Newsletter</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Get the latest insights, property trends, and exclusive offers delivered directly to your inbox.
          </p>
          <form className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-6 py-3 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full md:w-auto bg-white text-[#11174c] font-bold px-8 py-3 rounded-md hover:bg-gray-200 transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
            <p className="text-xs text-white/50 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>
    </div>
  );
}