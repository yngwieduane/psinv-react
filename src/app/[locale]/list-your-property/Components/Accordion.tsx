"use client";

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslations, useMessages } from "next-intl";

const Accordion: React.FC<any> = () => {
    const t = useTranslations("ListYourPropertyPage.faqs_section");
    const [activeId, setIsActiveId] = useState<string | null>(null);

    const messages = useMessages() as any;
    const faqData = (messages.ListYourPropertyPage.faqs_section.items || []) as { question: string, answer: string }[];

    const toggleAccordion = (index: number) => {
        const id = `collapse-${index}`;
        setIsActiveId((prev) => (prev === id ? null : id));
    }

    return (
        <>
            <div className="grid md:grid-cols-2 gap-6">
                {faqData.map(({ question, answer }, index) => {
                    const id = `collapse-${index}`;
                    return (
                        <div key={id}>
                            <div className={activeId === id ? "rounded-t-xl overflow-hidden bg-white h-25" : "rounded-xl overflow-hidden bg-white h-25"} style={{ boxShadow: activeId === id ? "0px -5px -16px 0px #080F340F" : "0px 5px 16px 0px #080F340F" }}>
                                <button onClick={() => toggleAccordion(index)}
                                    className="w-full h-full text-left px-4 py-5 transition-all duration-200 md:text-lg text-sm cursor-pointer flex justify-between gap-15">
                                    {question}
                                    <div className={activeId === id ? "bg-[#E35F27] px-3 py-2 h-[43px] w-[43px] rounded-[8px] animate-rotateToLeft" : "animate-rotateBack bg-[#000B3333] px-3 py-2 h-[43px] w-[43px] rounded-[8px] flex items-center"}>
                                        <FontAwesomeIcon icon={activeId === id ? faMinus : faPlus} className={activeId === id ? "transition-all duration-200 text-white" : "transition-all duration-200 text-[#000B33] text-[19px]"} />
                                    </div>
                                </button>
                            </div>
                            <div className={activeId === id ? "block rounded-b-xl overflow-hidden bg-white pt-10 pb-5 px-4 mt-[-15px] md:text-sm text-[13px]" : "hidden"}
                                style={{ boxShadow: "0px 15px 16px 0px #080F340F" }} >
                                {answer}
                            </div>
                        </div>
                    );
                })}
            </div>

        </>
    )

};

export default Accordion;