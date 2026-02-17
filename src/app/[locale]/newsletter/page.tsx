'use client';

import React from 'react';
import { newsletters } from '@/data/newsletters';
import Image from 'next/image';
import HubspotNewsletterForm from '../_components/HubspotNewsletterForm';
import { ChevronLeft, ChevronRight, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Breadcrumb from '../_components/Breadcrumb';

const ALL_NEWSLETTER = 'All Newsletter';

export default function NewsletterPage() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [activeCategory, setActiveCategory] = React.useState(ALL_NEWSLETTER);
  const itemsPerPage = 9;

  // In a real app, you'd filter by category here if `newsletters` had a category field
  const filteredItems = activeCategory === ALL_NEWSLETTER
    ? newsletters
    : newsletters;

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="pt-28 md:pt-36 border-b border-gray-100 bg-white dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="container mx-auto">
          <Breadcrumb
          />
        </div>
      </div>
      {/* Hero Section */}
      <section className="relative bg-white pt-24 pb-16 overflow-hidden dark:bg-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.4] mask-image:linear-gradient(to_bottom,black,transparent)" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-psiblue/5 text-psiblue text-sm font-medium rounded-full mb-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-psiblue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-psiblue"></span>
              </span>
              PSI Market Insights
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 dark:text-white">
              Latest Insights & <span className="text-psiblue">News</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200 dark:text-gray-400">
              Stay ahead of the market with exclusive updates, real estate trends, and investment opportunities from PSI.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="flex justify-center mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 inline-flex flex-wrap gap-1 dark:bg-gray-800 dark:border-gray-700">
            {[ALL_NEWSLETTER].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-6 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 ${activeCategory === category
                  ? 'bg-psiblue text-white shadow-md shadow-psiblue/20'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <main className="min-h-[600px]">
          {currentItems.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {currentItems.map((item, idx) => (
                <div
                  key={idx}
                  className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-psiblue/5 border border-gray-200/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      title={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="inline-flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-psiblue" />
                        Newsletter
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{item.date}</span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-psiblue transition-colors duration-200 dark:text-white">
                      {item.title}
                    </h2>

                    {/* Spacer to push button to bottom */}
                    <div className="flex-1" />

                    {item.link && (
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        title={item.title}
                        href={item.link}
                        className="inline-flex items-center gap-2 mt-4 font-semibold text-psiblue hover:text-blue-700 transition-colors group/link hidden"
                      >
                        Read Newsletter
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p>No newsletters found.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-16">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-psiblue disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:disabled:bg-gray-800 dark:disabled:text-gray-600"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-10 h-10 font-semibold rounded-xl transition-all duration-300 ${currentPage === page
                      ? 'bg-psiblue text-white shadow-lg shadow-psiblue/20 scale-105'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-psiblue disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:disabled:bg-gray-800 dark:disabled:text-gray-600"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Subscription Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background definition */}
        <div className="absolute inset-0 bg-[#11174c]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#11174c] via-transparent to-[#11174c]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-xl shadow-black/10">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Subscribe to our Newsletter</h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            Get the latest insights, property trends, and exclusive offers delivered directly to your inbox.
          </p>

          <HubspotNewsletterForm />

          <p className="text-sm text-white/40 mt-6 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </section>
    </div>
  );
}