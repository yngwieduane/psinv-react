'use client'

import { AudreyNormal } from "@/utils/fonts";
import { Montserrat } from "next/font/google";
import styles from './Partners.module.css';

const montserratLight = Montserrat({
    subsets: ['latin'],
    weight: ['300'],
    variable: '--font-montserrat-light',
});

import { useTranslations } from 'next-intl';

function Partners() {
    const t = useTranslations('InternationalPage.partners_section');

    return (
        <>
            <div className={`w-full md:pr-0 md:px-0 px-6 relative md:pt-0 pt-10 md:pl-10 ${montserratLight.className} md:mb-0 mb-10`}>
                <h2 className={`lg:text-5xl md:text-2xl text-3xl text-center uppercase ${AudreyNormal.className} mb-7 max-w-[1160px] mx-auto`}>
                    {t('title')}
                </h2>
                <p className={`md:text-3xl text-sm font-light leading-normal ${montserratLight.className} text-center max-w-[1160px] mx-auto`}>{t('description')}</p>
                <div className={`flex gap-5 pt-10 w-full mx-auto md:justify-center ${styles.scrollContainer}`}>
                    <img src="/assets/images/international/logos/aldar.png" alt="aldar" className="max-w-auto md:w-[90px] w-[50px] h-fit" />
                    <img src="/assets/images/international/logos/emaar.png" alt="emaar" className="max-w-auto md:w-[90px] w-[50px] h-fit" />
                    <img src="/assets/images/international/logos/imkan.png" alt="imkan" className="max-w-auto md:w-[90px] w-[50px] h-fit" />
                    <img src="/assets/images/international/logos/meraas.png" alt="meraas" className="max-w-auto md:w-[90px] w-[50px] h-fit" />
                    <img src="/assets/images/international/logos/dubai-properties.png" alt="dubai-properties" className="max-w-auto md:w-[90px] w-[50px] h-fit" />
                    <img src="/assets/images/international/logos/nshama.png" alt="nshama" className="max-w-auto md:w-[90px] w-[50px] h-fit" />
                    <img src="/assets/images/international/logos/q-properties.jpg" alt="q-properties" className="max-w-auto md:w-[90px] w-[50px] h-fit" />
                    <img src="/assets/images/international/logos/modon.jpg" alt="modon" className="max-w-auto md:w-[90px] w-[50px] h-fit" />
                    <img src="/assets/images/international/logos/bloom.jpg" alt="bloom" className="max-w-auto md:w-[90px] w-[50px] h-fit" />
                </div>
            </div>
        </>
    )
}

export default Partners