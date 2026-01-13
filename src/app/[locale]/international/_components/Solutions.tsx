'use client'

import { AudreyNormal } from "@/utils/fonts";
import { Montserrat } from "next/font/google";

const montserratLight = Montserrat({
    subsets: ['latin'],
    weight: ['300'],
    variable: '--font-montserrat-light',
});

import { useTranslations } from 'next-intl';

function Solutions() {
    const t = useTranslations('InternationalPage.solutions_section');
    const services = t.raw('services') as any[];

    return (
        <>
            <div className="lg:w-1/12 md:w-1/12 w-full md:block hidden content-center">
                <h3 className="relative flex flex-column items-start gap-3 before:relative before:w-[0.5px] lg:w-[auto] w-[30px] 
                before:h-[250px] before:bg-[#000] before:left-[15px]" >
                    <div className=''></div>
                    <div className='lg:text-[21px] md:text-[18px] text-[20px] font-light tracking-wider relative rotate-180 inline-block uppercase'
                        style={{ writingMode: "vertical-rl" }}>{t('vertical_text')}</div>
                </h3>
            </div>
            <div className={`lg:w-5/6 md:w-1/2 w-full md:pr-0 px-0 relative md:pt-0 pt-10 md:pl-10 ${montserratLight.className}`}>
                <h2 className={`lg:text-5xl md:text-2xl text-3xl text-center uppercase ${AudreyNormal.className} mb-7`}>
                    {t('title')}
                </h2>
                <p className={`md:text-3xl text-sm font-light leading-normal ${montserratLight.className} text-center`}>{t('description')}</p>
                <div className="md:flex gap-5 pt-10">
                    {services.map((service: any, index: number) => (
                        <div key={index} className="md:w-1/4 w-full text-center">
                            <img src={service.image} alt={service.title} className="mb-10 w-full object-cover" />
                            <h3 className={`md:text-2xl text-xl text-center uppercase ${AudreyNormal.className} md:mb-4 mb-2`}>
                                {service.title}
                            </h3>
                            <p className="md:text-xl text-md md:mb-0 mb-4">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:w-1/12 md:w-1/12">

            </div>
        </>
    )
}

export default Solutions