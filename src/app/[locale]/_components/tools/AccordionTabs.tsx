'use client';

import { useState } from 'react';

type AccordionItem = {
  title: string;
  content: string;
};

type Props = {
  items: AccordionItem[];
};

export default function AccordionTabs({ items }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="w-full relative">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return(
            <div key={index} className="border-b border-gray-200">
            <button
                onClick={() => toggleIndex(index)}
                className={`w-full text-left px-4 py-3 font-medium ${isOpen ? 'bg-blue-100 ' : 'text-gray-800 '} hover:bg-blue-100 cursor-pointer transition`}
            >
                {item.title}
                <span className="text-xl absolute end-5 text-gray-500">{isOpen ? '−' : '+'}</span>
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
  );
}