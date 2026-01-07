"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import './faq.css';

const FAQSection = ({ onOpenModal }: { onOpenModal?: () => void }) => {
    const t = useTranslations('CryptoPage.faq');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = Array.from({ length: 22 }, (_, i) => i + 1); // q1 to q22

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
        // Check if the clicked element or its parent is the modal trigger
        if (target.closest('[data-bs-target="#Modalform"]')) {
            e.preventDefault();
            if (onOpenModal) {
                onOpenModal();
            }
        }
    };

    return (
        <section className="py-20 bg-[#090953] text-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-4xl font-bold text-center mb-9 text-[#E46027]">
                    {t('title')}
                </h2>

                <div className="space-y-4">
                    {faqs.map((i) => (
                        <div key={i} className="bg-[#232563] rounded-lg overflow-hidden border border-gray-800">
                            <button
                                onClick={() => toggleAccordion(i)}
                                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-[#1a1a51]"
                            >
                                <span className="font-semibold text-lg">{t(`q${i}`)}</span>
                                <ChevronDownIcon
                                    className={`w-5 h-5 text-amber-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div
                                    className="p-5 pt-0 text-[#fff] border-t border-gray-800/50 [&_ul]:list-none [&_ul]:pl-4 [&_ul]:mt-2 [&_ul]:space-y-2 faq-content"
                                    dangerouslySetInnerHTML={{ __html: t.raw(`a${i}`) }}
                                    onClick={handleContentClick}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
