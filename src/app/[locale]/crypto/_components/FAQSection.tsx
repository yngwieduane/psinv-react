"use client";
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const FAQSection = () => {
    const t = useTranslations('CryptoPage.faq');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = Array.from({ length: 14 }, (_, i) => i + 1); // q1 to q14

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-[#0A0A2E] text-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-4 text-amber-500">
                    {t('title')}
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-600 mx-auto mb-16 rounded-full" />

                <div className="space-y-4">
                    {faqs.map((i) => (
                        <div key={i} className="bg-[#11113a] rounded-lg overflow-hidden border border-gray-800">
                            <button
                                onClick={() => toggleAccordion(i)}
                                className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-[#1a1a51]"
                            >
                                <span className="font-medium text-lg">{t(`q${i}`)}</span>
                                <ChevronDownIcon
                                    className={`w-5 h-5 text-amber-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-5 pt-0 text-gray-400 border-t border-gray-800/50">
                                    {t(`a${i}`)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
