import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Montserrat, Libre_Baskerville } from "next/font/google"
import { useState } from "react";

const montserratBolder = Montserrat({
    subsets: ['latin'],
    weight: ['900'],
    variable: '--font-montserrat-bolder',

});

const libreBaskervilleBold = Libre_Baskerville({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-libre-baskerville-bold',

});

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface Props {
  data: FAQItem[];
}

export default function FAQs({data}: Props) {
    const [isActiveId, setIsActiveId]  = useState<string | null>(null);

    const toggleAccordion = (id: string) => {
        setIsActiveId(prev => (prev === id ? null : id));
    }
    
    return(
        <>
        <div className="max-w-[930px] mx-auto relative z-10 text-white px-4 ">
            <div className={`absolute md:-top-36 -top-10 left-[30%] md:left-0 text-[60px] md:text-[140px] lg:text-[180px] font-bolder 
                ${montserratBolder.className} text-[#fff] opacity-10`}>07</div>
            <h2 className="lg:ml-40 sm-ml-0 ml-10 text-sm md:text-md lg:text-xl uppercase text-[#FBD784] font-bold tracking-[6] md:mb-5 mb-10 flex gap-2 md:gap-5 sm:justify-start justify-center items-center text-center md:text-start">
                <span className="w-[35px] md:w-[65px] w-[25px] h-[3px] bg-[#FBD784]"></span>FAQS
            </h2>
            <h3 className={`lg:ml-20 text-center text-[24px] md:text-[30px] lg:text-[40px] leading-tight ${libreBaskervilleBold.className} capitalize` }>
                Frequently asked questions
            </h3>  
            <div className="mt-10 space-y-3">
                {data.map((faq) => (
                    <div key={faq.id} className="md:text-[19px] text-[16px] text-start border-[#00000030] bg-[#353B58] border-1 border-t-0 rounded-md">
                        <button onClick={() => toggleAccordion(faq.id)} className={`cursor-pointer  px-5 pb-4 pt-5 rounded-md flex w-full justify-between gap-3 text-start  shadow-lg font-medium 
                        ${isActiveId === faq.id 
                        ? "border-1 border-[#F5DABC]  text-[#F5DABC] bg-[#353B58] " 
                        : ""}`}>
                            {faq.question}
                            <div className={isActiveId === faq.id ? "h-[43px] w-[43px] animate-rotateToLeft" 
                                : "animate-rotateBack h-[43px] w-[43px]"}>
                                <FontAwesomeIcon icon={isActiveId === faq.id ? faMinus : faPlus} className={isActiveId === faq.id ? "transition-all duration-200 text-white" : "transition-all duration-200 text-[#fff] text-[21px]"} />
                            </div>
                        </button>   
                        <div className={`text-[#F5DABC99] md:text-lg text-[15px] font-medium p-4 ${isActiveId === faq.id ? "border-[#fff]" : "border border-1 border-[#000] hidden"}`}>
                            {faq.answer}
                        </div>
                    </div>
                ))}
                
            </div>                 
        </div>
        </>
    )
}