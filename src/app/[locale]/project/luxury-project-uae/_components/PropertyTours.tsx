'use client'

import { Montserrat, Libre_Baskerville, Parisienne } from "next/font/google"
import { LuxuryProjectsData } from "@/types/LuxuryProjectsTypes";
import { useTranslations } from 'next-intl';

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
const parisienne = Parisienne({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-parisienne',
});

interface Props {
    onAction: (data?: LuxuryProjectsData) => void;
}

export default function PropertyTours({ onAction }: Props) {
    const t = useTranslations('LuxuryProjectUAE.VIPTour');

    //const [brochureUrl, setBrochureUrl] = useState<string | null>(null);

    const handleBtnClick = () => {
        onAction();
    };

    return (
        <>
            <div className="max-w-screen-xl mx-auto relative z-10 text-white px-4 md:flex ">
                <div className="md:w-1/2">
                    <div className={`absolute md:-top-32 -top-10 md:left-auto left-7 text-[60px] md:text-[140px] lg:text-[180px] font-bolder 
                    ${montserratBolder.className} text-[#fff] opacity-10`}>05</div>
                    <h2 className="lg:ml-20 sm-ml-0 ml-10 text-sm md:text-md lg:text-lg uppercase text-[#FBD784] font-bold tracking-[6] mb-5 flex gap-2 md:gap-5 sm:justify-start justify-center items-center text-center md:text-start">
                        <span className="w-[35px] md:w-[65px] w-[25px] h-[3px] bg-[#FBD784]"></span>{t('title')}
                    </h2>
                </div>

            </div>
            <div className="max-w-screen-xl mx-auto relative z-10 text-white px-4 md:flex ">
                <div className="md:w-1/2">
                    <h3 className={`lg:ml-20 text-[24px] md:text-[35px] lg:text-[48px] leading-tight ${libreBaskervilleBold.className} capitalize`}>
                        {t('bespoke')} <br />
                        <span className={`text-[40px] md:text-[55px] lg:text-[60px] after:bg-[#C19A5B] after:absolute after:w-full 
                    after:h-[25px] after:left-0 after:top-4 after:z-[-1] 
                    md:after:h-[30px] md:after:top-7  
                    lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>
                            {t('tours')}</span>
                    </h3>
                </div>
                <div className="md:w-1/2">
                    <p className="text-lg">{t('description')}</p>
                    <button className="cursor-pointer btn text-white  hover:text-black text-center bg-[#C19A5B] rounded-[5px] py-0 h-[40px] px-5 md:w-auto w-full mt-5"
                        onClick={handleBtnClick}>
                        {t('schedule')}
                    </button>
                </div>
            </div>
        </>
    )
}
