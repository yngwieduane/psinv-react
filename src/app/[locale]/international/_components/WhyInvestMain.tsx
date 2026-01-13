'use client'

import { AudreyNormal } from "@/utils/fonts";
import { Montserrat } from "next/font/google";
import { TaxFree } from "./Icons/TaxFree";
import { Architecture } from "./Icons/Architecture";
import { Award } from "./Icons/Award";
import { GlobalHub } from "./Icons/GlobalHub";

const montserratLight = Montserrat({
    subsets: ['latin'],
    weight: ['300'],
    variable: '--font-montserrat-light',
});
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-montserrat',
});

type Props = {
    openModal: () => void;
}

import { useTranslations } from 'next-intl';

const WhyInvestMain: React.FC<Props> = ({ openModal }) => {
    const t = useTranslations('InternationalPage');
    const categories = t.raw('why_invest_main_section.categories') as any[];
    const reasons = t.raw('four_reasons_section.reasons') as any[];

    return (
        <>
            <div className={`max-w-screen-xl md:flex lg:gap-5 gap-2 md:py-[20vh] py-7 mx-auto text-white ${montserratLight.className}`}>
                <div className="lg:w-1/9 md:w-1/12 w-full md:block hidden content-end">
                    <h3 className="relative flex flex-column items-start gap-2 before:relative before:w-[1px] lg:w-[auto] w-[30px] 
                before:h-[250px] before:bg-[#fff] before:left-[15px]">
                        <div className=''></div>
                        <div className='lg:text-[21px] md:text-[18px] text-[20px] font-light text-white tracking-wider relative rotate-180 inline-block uppercase'
                            style={{ writingMode: "vertical-rl" }}>{t('why_invest_main_section.vertical_text')}</div>
                    </h3>
                </div>
                <div className="lg:w-8/9 md:w-1/2 w-full">
                    <div>
                        <h2 className={`lg:text-5xl text-white md:text-2xl text-3xl text-start uppercase ${AudreyNormal.className} md:mb-17 mb-7`}>
                            {t('why_invest_main_section.title')}
                        </h2>
                    </div>
                    <div className="w-full md:flex gap-7">
                        <div className="lg:w-[24%] md:block hidden">
                            <img src="/assets/images/international/international-why-invest.webp" alt="why invest" title="why invest"
                                className="w-full h-full object-cover" />
                        </div>
                        <div className="lg:w-[38%] text-white space-y-7">
                            {categories.slice(0, 2).map((category, index) => (
                                <div key={index} className={`${index === 1 ? 'md:space-y-5 space-y-3 md:mb-0 mb-5' : 'md:space-y-5 space-y-3'}`}>
                                    {index === 0 && <TaxFree width="60px" height="60px" />}
                                    {index === 1 && <Architecture width="60px" height="60px" />}
                                    <h3 className={`uppercase ${AudreyNormal.className} md:text-2xl text-lg md:mb-5 mb-2`}>
                                        {category.title}</h3>
                                    <ul className={`md:text-lg text-sm list-disc ml-5 space-y-3 ${montserratLight.className}`}>
                                        {category.points.map((point: string, i: number) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div className="lg:w-[38%] text-white space-y-7 ">
                            {categories.slice(2, 4).map((category, index) => (
                                <div key={index} className="md:space-y-5 space-y-3">
                                    {index === 0 && <Award width="56px" height="56px" />}
                                    {index === 1 && <GlobalHub width="50px" height="50px" />}
                                    <h3 className={`uppercase ${AudreyNormal.className} md:text-2xl text-lg md:mb-5 mb-2`}>
                                        {category.title}</h3>
                                    <ul className={`md:text-lg text-sm list-disc ml-5 space-y-3 ${montserratLight.className}`}>
                                        {category.points.map((point: string, i: number) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            <div className={`max-w-screen-xl md:flex lg:gap-5 gap-2 md:pt-[10vh] md:pb-[20vh] py-5 mx-auto ${montserratLight.className}`}>
                <div className="lg:w-1/9 md:w-1/12 w-full md:block hidden">
                    <h3 className="relative flex flex-column items-start gap-2 before:relative before:w-[1px] lg:w-[auto] w-[30px] 
                before:h-[250px] before:bg-[#fff] before:left-[15px]">
                        <div className=''></div>
                        <div className='lg:text-[21px] md:text-[18px] text-[20px] font-light text-white tracking-wider relative rotate-180 inline-block uppercase'
                            style={{ writingMode: "vertical-rl" }}>{t('four_reasons_section.vertical_text')}</div>
                    </h3>
                </div>
                <div className="lg:w-8/9 md:w-1/2 w-full md:flex gap-7">
                    <div className="lg:w-2/5 w-full">
                        <h2 className={`lg:text-5xl text-white md:text-2xl text-3xl text-start uppercase mb-7 leading-tight ${AudreyNormal.className}`}>
                            {t('four_reasons_section.title')}
                        </h2>
                        <div className='flex md:justify-start justify-end md:mb-0 mb-10'>
                            <button onClick={openModal}
                                className={`${AudreyNormal.className} cursor-pointer
                        relative uppercase lg:text-lg text-sm p-9 hover:text-black self-end
                        after:content-[''] after:absolute lg:after:w-[190px] after:w-[170px] lg:after:h-[100px] after:h-[80px] 
                        after:border after:border-[#ED9C4B] after:inset-0 after:rounded-[50%] 
                        after:transition after:duration-300 after:rotate-[335deg]
                        hover:after:bg-[#ED9C4B] text-white hover:text-black`}
                            >
                                <span className="relative z-10">{t('four_reasons_section.learn_more_button')}</span>
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-3/5 w-full">
                        <div className="text-white">
                            {reasons.map((reason: any, index: number) => (
                                <div key={index} className={`w-full ${index < reasons.length - 1 ? 'md:pb-15 pb-3' : 'md:py-15 py-3'} border-b border-b-1 border-white flex md:gap-7 gap-4`}>
                                    <div className="md:w-1/3 w-1/4">
                                        <img src={reason.image} alt={reason.title}
                                            className="w-full" />
                                    </div>
                                    <div className="md:w-2/3 w-3/4">
                                        <h3 className={`uppercase md:text-3xl text-xl md:mb-5 mb-2 font-400 ${montserrat.className} md:leading-tight leading-none`}>
                                            {reason.title}</h3>
                                        <p className="md:text-lg text-sm leading-tight">
                                            {reason.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhyInvestMain