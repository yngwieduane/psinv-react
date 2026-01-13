'use client'

import { AudreyNormal } from "@/utils/fonts";
import { Montserrat } from "next/font/google";

const montserratLight = Montserrat({
    subsets: ['latin'],
    weight: ['300'],
    variable: '--font-montserrat-light',
});
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-montserrat-light',
});

type Props = {
    openModal: () => void;
}

import { useTranslations } from 'next-intl';

const AwardsSection: React.FC<Props> = ({ openModal }) => {
    const t = useTranslations('InternationalPage.awards_section');
    const awards = t.raw('awards') as any[];

    return (
        <>
            <div className="max-w-screen-xl mx-auto text-white">
                <h2 className={`md:block hidden lg:text-5xl md:text-2xl text-3xl text-center uppercase ${AudreyNormal.className} md:mb-20 mb-7`}>
                    {t('title')}
                </h2>
            </div>
            <div className="max-w-screen-xl mx-auto md:flex text-white gap-5">
                <div className="lg:w-1/12 md:w-1/12 w-full md:block hidden content-center">
                    <h3 className="relative flex flex-column items-start gap-3 before:relative before:w-[0.5px] lg:w-[auto] w-[30px] 
                before:h-[250px] before:bg-[#fff] before:left-[15px]" >
                        <div className=''></div>
                        <div className='lg:text-[21px] md:text-[18px] text-[20px] font-light tracking-wider relative rotate-180 inline-block uppercase'
                            style={{ writingMode: "vertical-rl" }}>{t('vertical_text')}</div>
                    </h3>
                </div>
                <div className={`md:w-1/2 w-full md:pr-0 md:px-0 px-6 relative pt-0 md:pl-10 ${montserratLight.className}`}>
                    <img src="/assets/images/international/awards.webp" alt="awards" className="w-full" />
                    <h2 className={`md:hidden block text-3xl text-start uppercase ${AudreyNormal.className} my-7`}>
                        {t('title')}
                    </h2>
                </div>
                <div className="md:w-1/2 flex flex-column">
                    <div className={`order-2 md:order-1 w-full grid md:grid-cols-3 md:grid-rows-2 grid-cols-2 grid-rows-3 
                    text-black text-center gap-7 mb-10 uppercase md:px-0 px-6 ${montserrat.className}`}>
                        {awards.map((award: any, index: number) => (
                            <div key={index} className="bg-white py-5 px-3 md:space-y-2 space-y-1">
                                <h3 className={`${AudreyNormal.className} text-3xl`}>{award.developer}</h3>
                                <p className="text-[16px] text-[#666] leading-tight">{award.title}</p>
                                <span className="text-[#575757] text-[12px]">{award.year}</span>
                            </div>
                        ))}
                    </div>
                    <div className='order-1 md:order-2 flex md:justify-start justify-end md:mb-0 mb-10 md:mr-0 mr-5'>
                        <button onClick={openModal}
                            className={`${AudreyNormal.className} cursor-pointer
                    relative uppercase lg:text-lg text-sm md:px-5 md:py-8 px-7 py-5  hover:text-black self-end
                    after:content-[''] after:absolute lg:after:w-[195px] after:w-[175px] lg:after:h-[125px] after:h-[90px] 
                    after:border after:border-[#ED9C4B] after:inset-0  after:rounded-[50%] 
                    after:transition after:duration-300 after:rotate-[335deg]
                    hover:after:bg-[#ED9C4B] text-white hover:text-black text-center`}
                        >
                            <span className="relative z-10">{t('get_consultation_button').split(' ')[0]} {t('get_consultation_button').split(' ')[1]}<br />{t('get_consultation_button').split(' ')[2]}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AwardsSection