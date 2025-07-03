"use client";

import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

// interface AccordionProps {
//     title: string;
//     children: React.ReactNode;
// }

type faqItem = {
 id: string,
 question: string,
 answer: string
}

const faqData: faqItem[] = [
    {
        id:"collapseOne",
        question: "What are exclusive Seller's Agency Services?",
        answer: "This is a service available to owners of premium properties that want their listing to stand out from the crowd and realize the highest possible price on the market.",
    },
    {
        id: 'collapseTwo',
        question: "Why should I choose an exclusive agreement for selling my property?",
        answer:
        "Trust and experience are the main reason for choosing an exclusive agreement with Exotiq. Owners nowadays realize how complex it has become to successfully sell a property in Bali, particularly, if owned by a foreigner. It requires not only extensive knowhow in selling luxury properties, but also solid knowledge of legal and fiscal matters, something that only comes with years of experience. Founded in 2002, Exotiq is Bali’s oldest real estate agency.",
    },
    {
        id: 'collapseThree',
        question: "What kind of properties qualify for the exclusive listing service?",
        answer:
        "All our exclusive properties are special and unique. They are typically priced in the higher segment of the market. Call us to find out if your property qualifies for an exclusive listing.",
    },
    {
        id: 'collapseFour',
        question: "What extra service do I get under an exclusive listing agreement?",
        answer:
        "We create a comprehensive campaign and invest up to 1% of our commission in the marketing of your property. This includes the production of a video and professional photography and even a dedicated website, just for your property.",
    },
];

const Accordion: React.FC<any> = () => {
    const [activeId, setIsActiveId] = useState<string | null>(null);

    const toggleAccordion = (id:string) => {
        setIsActiveId((prev) => (prev === id ? null : id));
    }

    return(
        <>
        <div className="grid md:grid-cols-2 gap-6">
            {faqData.map(({ id, question, answer }) => (
                <div key={id}>
                    <div className={activeId === id ? "rounded-t-xl overflow-hidden bg-white h-25" : "rounded-xl overflow-hidden bg-white h-25"} style={{boxShadow: activeId === id ?"0px -5px -16px 0px #080F340F" :"0px 5px 16px 0px #080F340F"}}>
                        <button onClick={() => toggleAccordion(id)}
                            className="w-full h-full text-left px-4 py-5 transition-all duration-200 md:text-lg text-sm cursor-pointer flex justify-between gap-15">
                                {question}
                                <div className={activeId === id ? "bg-[#E35F27] px-3 py-2 h-[43px] w-[43px] rounded-[8px] animate-rotateToLeft" : "animate-rotateBack bg-[#000B3333] px-3 py-2 h-[43px] w-[43px] rounded-[8px] flex items-center"}>
                                    <FontAwesomeIcon icon={activeId === id ? faMinus : faPlus} className={activeId === id ? "transition-all duration-200 text-[#fff]" : "transition-all duration-200 text-[#000B33] text-[19px]"} />
                                </div>
                        </button>                        
                    </div>
                    <div className={ activeId === id ? "block rounded-b-xl overflow-hidden bg-white pt-10 pb-5 px-4 mt-[-15px] md:text-sm text-[13px]": "hidden"} 
                        style={{boxShadow:"0px 15px 16px 0px #080F340F"}} >
                        {answer}
                    </div>
                </div>
            ))}
        </div>
        
        </>
    )

};

export default Accordion