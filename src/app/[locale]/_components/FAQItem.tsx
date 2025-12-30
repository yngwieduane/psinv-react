'use client';
import { Link } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQItem = ({ question, answer, slug }: { question: string, answer: string, slug?: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md bg-white">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full p-5 text-left bg-white hover:bg-gray-50/50 transition-colors group"
            >
                <span className="font-semibold text-[#353455] group-hover:text-[#7F56D9] transition-colors">{question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="text-gray-400" />
                </span>
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div
                    className="p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 bg-gray-50/30 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-gray-300 [&_th]:p-2 [&_td]:border [&_td]:border-gray-300 [&_td]:p-2 [&_th]:bg-gray-100"
                    dangerouslySetInnerHTML={{ __html: answer }}
                />
                {slug && (
                    <div className="px-5 pb-5 bg-gray-50/30">
                        <Link
                            href={`/mortgage-loan/faqs/${slug}`}
                            className="text-sm font-semibold text-[#7F56D9] hover:underline flex items-center gap-1"
                        >
                            Read full article
                            <ChevronDown className="rotate-[-90deg]" size={14} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQItem;