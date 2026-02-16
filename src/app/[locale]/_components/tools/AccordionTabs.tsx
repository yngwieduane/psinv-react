'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

type AccordionItem = {
  title: string;
  content: string;
};

type Props = {
  items: AccordionItem[];
};

export default function AccordionTabs({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [schemaJson, setSchemaJson] = useState<string | null>(null);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.content,
      },
    })),
  }

  const toggleIndex = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* ... */}
      <div className="w-full relative">
        {items.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <div key={index} className="border-b border-gray-200 dark:border-gray-500">
              <button
                onClick={() => toggleIndex(index)}
                className={`w-full text-left px-4 py-3 font-medium ${isOpen ? 'bg-blue-100 dark:bg-gray-700 ' : 'text-gray-800 dark:text-white '} hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer transition`}
              >
                {item.title}
                <span className="text-xl absolute end-5 text-gray-500">{isOpen ? <MinusIcon aria-hidden="true" className="size-4" /> : <PlusIcon aria-hidden="true" className="size-4" />}</span>
              </button>
              {activeIndex === index && (
                <div className="px-4 py-3 text-sm text-gray-700 bg-white">
                  {item.content}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </>
  );
}