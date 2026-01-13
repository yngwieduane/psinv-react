'use client'

import { AudreyNormal, Audrey } from "@/utils/fonts";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-montserrat',
});

import { useTranslations } from 'next-intl';

function WhyInvest_2() {
    const t = useTranslations('InternationalPage.roi_comparison_section');

    return (
        <>
            <div className="lg:w-1/9 md:w-1/12 w-full md:block hidden">
                <h3 className="relative flex flex-column items-start gap-2 before:relative before:w-[1px] lg:w-[auto] w-[30px] 
                before:h-[250px] before:bg-[#fff] before:left-[15px]">
                    <div className=''></div>
                    <div className='lg:text-[21px] md:text-[18px] text-[20px] font-light text-white tracking-wider relative rotate-180 inline-block uppercase'
                        style={{ writingMode: "vertical-rl" }}>{t('vertical_text')}</div>
                </h3>
            </div>
            <div className="lg:w-8/9 md:w-1/2 w-full text-white">
                <div className="w-full md:flex gap-1">
                    <div className="md:w-[40%] w-full">
                        <h2 className={`lg:text-[40px] md:text-2xl text-4xl text-start md:mb-17 mb-7 ${AudreyNormal.className}`}>
                            {t('title')}
                        </h2>
                    </div>
                    <div className="md:w-[50%] w-full">
                        <p className={`lg:text-[35px] md:text-2xl text-md font-light leading-snug md:max-w-[650px] 
                            ${montserrat.className}`}>
                            {t('description')}
                        </p>
                    </div>
                </div>
                <div className="w-full md:flex">
                    <div className="relative md:w-1/3 my-10 flex flex-column items-center h-full py-15">
                        <h2 className="lg:text-5xl md:text-2xl text-4xl text-start md:mb-17 mb-7 z-10">
                            <p className={`my-0 text-[#ED9C4B] text-7xl ${AudreyNormal.className}`}>{t('dubai.value')}</p>
                            <p className={`my-0 text-white text-5xl uppercase ${AudreyNormal.className}`}>{t('dubai.location')}</p>
                            <p className="my-0 text-2xl text-white font-light">{t('dubai.tax')}</p>
                        </h2>
                        <img src="/assets/images/international/map.png" alt="map" title="map"
                            className="absolute top-0 right-0 w-full md:ml-10 md:ml-5" />
                    </div>
                </div>
            </div>


        </>
    )
}

export default WhyInvest_2