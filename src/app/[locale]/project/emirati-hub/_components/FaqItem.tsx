import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full border-0 py-6 flex items-center justify-between text-left focus:outline-none group"
            >
                <span className={`text-xl text-gray-800 ${isOpen ? 'font-semibold' : 'font-medium'} group-hover:text-[#CE641D] transition-colors`}>{question}</span>
                <ChevronDownIcon className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#CE641D]' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
                <div className="pb-6 text-gray-600">
                    {answer}
                </div>
            </div>
        </div>
    );
}

export default FAQItem;