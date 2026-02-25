import { Montserrat, Parisienne } from "next/font/google"
import { LuxuryProjectsData } from "@/types/LuxuryProjectsTypes";
import UltraLuxuryProjectsSlider from "./UltraLuxuryProjectsSlider";
import { faFlag, faLocationDot, faTag } from "@fortawesome/free-solid-svg-icons";
import { useLocale, useTranslations } from 'next-intl';

const montserratBolder = Montserrat({
    subsets: ['latin'],
    weight: ['900'],
    variable: '--font-montserrat-bolder',
});
const parisienne = Parisienne({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-parisienne',
});

interface Props {
    onAction: (data?: LuxuryProjectsData) => void;
    data: any[];
    loadingStatus: boolean;
}

export default function UltraLuxuryProjects({ onAction, data, loadingStatus }: Props) {
    const t = useTranslations('LuxuryProjectUAE.UltraLuxuryProjects');
    const locale = useLocale();
    const isRTL = locale.toLowerCase().startsWith("ar");
    const t_projects = useTranslations("LuxuryProjectUAE.UltraLuxuryProjects.Projects");

    const UltraLuxuryProjectsData = [
        {
            proj_name: t_projects('hudayriyat.title1') + ' ' + t_projects('hudayriyat.title2'),
            title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute
                    after:h-[25px] after:left-0 after:top-4 after:z-[-1]
                    md:after:h-[30px] md:after:top-7 after:w-full  
                    lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>{t_projects('hudayriyat.title1')}</span>
                {' '}
                {t_projects('hudayriyat.title2')}
            </>),
            proj_location: t_projects('locations.Abu Dhabi'),
            content: (
                <>
                    <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">{t_projects('hudayriyat.content1')}</p>
                    <p className="mb-5 md:text-lg text-md md:text-start text-center">{t_projects('hudayriyat.content2')}</p>
                </>
            ),
            image: '/assets/images/luxury-project-uae/ultra-luxury-projects/hudayriyat-island.jpg',
            starting_price: '+ 41,000,000',
            price_unit: 'AED',
            facts: [
                { label: t('Slider.Facts.bedroom'), value: t('Slider.FactsValues.hudayriyat.bedroom'), icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
                { label: t('Slider.Facts.type'), value: t('Slider.FactsValues.hudayriyat.type'), icon: '/assets/images/luxury-project-uae/icons/home.svg' },
                { label: t('Slider.Facts.freeHold'), value: t('Slider.FactsValues.hudayriyat.freeHold'), FaIcon: faFlag },
                { label: t('Slider.Facts.handover'), value: t('Slider.FactsValues.hudayriyat.handover'), icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
                { label: t('Slider.Facts.location'), value: t('Slider.FactsValues.hudayriyat.location'), FaIcon: faLocationDot },
                { label: t('Slider.Facts.downpayment'), value: t('Slider.FactsValues.hudayriyat.downpayment'), FaIcon: faTag },
            ],
            brochure: '/assets/images/luxury-project-uae/brochures/hudayriyat-island-brochure.pdf',
        },
        {
            proj_name: t_projects('saadiyat.title1') + ' ' + t_projects('saadiyat.title2'),
            title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute 
                    after:h-[25px] after:left-0 after:top-4 after:z-[-1] 
                    md:after:h-[30px] md:after:top-7 after:w-full  
                    lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>{t_projects('saadiyat.title1')}</span>
                {' '}
                {t_projects('saadiyat.title2')}
            </>),
            proj_location: t_projects('locations.Abu Dhabi'),
            content: (
                <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">{t_projects('saadiyat.content')}</p>
            ),
            image: '/assets/images/luxury-project-uae/ultra-luxury-projects/saadiyat-island-grove.webp',
            starting_price: '2,300,000',
            price_unit: 'AED',
            facts: [
                { label: t('Slider.Facts.bedroom'), value: t('Slider.FactsValues.saadiyat.bedroom'), icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
                { label: t('Slider.Facts.type'), value: t('Slider.FactsValues.saadiyat.type'), icon: '/assets/images/luxury-project-uae/icons/home.svg' },
                { label: t('Slider.Facts.handover'), value: t('Slider.FactsValues.saadiyat.handover'), icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
                { label: t('Slider.Facts.location'), value: t('Slider.FactsValues.saadiyat.location'), FaIcon: faLocationDot },
                { label: t('Slider.Facts.downpayment'), value: t('Slider.FactsValues.saadiyat.downpayment'), FaIcon: faTag },
            ],
            brochure: '',
        },
        {
            proj_name: t_projects('bugatti.title1') + ' ' + t_projects('bugatti.title2'),
            title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute 
                    after:h-[25px] after:left-0 after:top-4 after:z-[-1] 
                    md:after:h-[30px] md:after:top-7 after:w-full  
                    lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>{t_projects('bugatti.title1')}</span>
                {' '}
                {t_projects('bugatti.title2')}
            </>),
            proj_location: t_projects('locations.Abu Dhabi'),
            content: (
                <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">
                    {t_projects('bugatti.content')}
                </p>
            ),
            image: '/assets/images/luxury-project-uae/ultra-luxury-projects/bugatti-residences.webp',
            starting_price: '19,000,000',
            price_unit: 'AED',
            facts: [
                { label: t('Slider.Facts.skyMansions'), value: t('Slider.FactsValues.bugatti.skyMansions'), icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
                { label: t('Slider.Facts.skyPenthouses'), value: t('Slider.FactsValues.bugatti.skyPenthouses'), icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
                { label: t('Slider.Facts.type'), value: t('Slider.FactsValues.bugatti.type'), icon: '/assets/images/luxury-project-uae/icons/home.svg' },
                { label: t('Slider.Facts.handover'), value: t('Slider.FactsValues.bugatti.handover'), icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
                { label: t('Slider.Facts.location'), value: t('Slider.FactsValues.bugatti.location'), FaIcon: faLocationDot },
                { label: t('Slider.Facts.downpayment'), value: t('Slider.FactsValues.bugatti.downpayment'), FaIcon: faTag },
            ],
            brochure: '',
        },
        {
            proj_name: t_projects('reemHills.title1') + ' ' + t_projects('reemHills.title2'),
            title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute 
                    after:h-[25px] after:left-0 after:top-4 after:z-[-1]
                    md:after:h-[30px] md:after:top-7 after:w-full 
                    lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>{t_projects('reemHills.title1')}</span>
                {' '}
                {t_projects('reemHills.title2')}
            </>),
            proj_location: t_projects('locations.Abu Dhabi'),
            content: (
                <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">
                    {t_projects('reemHills.content')}
                </p>
            ),
            image: '/assets/images/luxury-project-uae/ultra-luxury-projects/reem-hills.webp',
            starting_price: '1,500,000',
            price_unit: 'AED',
            facts: [
                { label: t('Slider.Facts.bedroom'), value: t('Slider.FactsValues.reemHills.bedroom'), icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
                { label: t('Slider.Facts.type'), value: t('Slider.FactsValues.reemHills.type'), icon: '/assets/images/luxury-project-uae/icons/home.svg' },
                { label: t('Slider.Facts.handover'), value: t('Slider.FactsValues.reemHills.handover'), icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
                { label: t('Slider.Facts.downpayment'), value: t('Slider.FactsValues.reemHills.downpayment'), FaIcon: faTag },
            ],
            brochure: '/assets/images/luxury-project-uae/brochures/reem-hills-brochure.pdf',
        },
        {
            proj_name: t_projects('tilalAlGhaf.title1') + ' ' + t_projects('tilalAlGhaf.title2'),
            title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute
                    after:h-[25px] after:left-0 after:top-4 after:z-[-1]
                    md:after:h-[30px] md:after:top-7 after:w-full 
                    lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>{t_projects('tilalAlGhaf.title1')}</span>
                {' '}
                {t_projects('tilalAlGhaf.title2')}
            </>),
            proj_location: t_projects('locations.Abu Dhabi'),
            content: (
                <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">
                    {t_projects('tilalAlGhaf.content')}
                </p>
            ),
            image: '/assets/images/luxury-project-uae/ultra-luxury-projects/tilal-al-ghaf.webp',
            starting_price: '10,500,000',
            price_unit: 'AED',
            facts: [
                { label: t('Slider.Facts.bedroom'), value: t('Slider.FactsValues.tilalAlGhaf.bedroom'), icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
                { label: t('Slider.Facts.type'), value: t('Slider.FactsValues.tilalAlGhaf.type'), icon: '/assets/images/luxury-project-uae/icons/home.svg' },
                { label: t('Slider.Facts.handover'), value: t('Slider.FactsValues.tilalAlGhaf.handover'), icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
                { label: t('Slider.Facts.downpayment'), value: t('Slider.FactsValues.tilalAlGhaf.downpayment'), FaIcon: faTag },
            ],
            brochure: '',
        },
        {
            proj_name: t_projects('golfPlaces.title1') + ' ' + t_projects('golfPlaces.title2'),
            title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute 
                    after:h-[25px] after:left-0 after:top-4 after:z-[-1]
                    md:after:h-[30px] md:after:top-7  after:w-full 
                    lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>{t_projects('golfPlaces.title1')}</span>
                {' '}
                {t_projects('golfPlaces.title2')}
            </>),
            proj_location: t_projects('locations.Dubai'),
            content: (
                <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">
                    {t_projects('golfPlaces.content')}
                </p>
            ),
            image: '/assets/images/luxury-project-uae/ultra-luxury-projects/golf-places.webp',
            starting_price: '15,000,000',
            price_unit: 'AED',
            facts: [
                { label: t('Slider.Facts.bedroom'), value: t('Slider.FactsValues.golfPlaces.bedroom'), icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
                { label: t('Slider.Facts.type'), value: t('Slider.FactsValues.golfPlaces.type'), icon: '/assets/images/luxury-project-uae/icons/home.svg' },
                { label: t('Slider.Facts.handover'), value: t('Slider.FactsValues.golfPlaces.handover'), icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
                { label: t('Slider.Facts.downpayment'), value: t('Slider.FactsValues.golfPlaces.downpayment'), FaIcon: faTag },
            ],
            brochure: '',
        },
        {
            proj_name: t_projects('districtOne.title1') + ' ' + t_projects('districtOne.title2'),
            title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute
                    after:h-[25px] after:left-0 after:top-4 after:z-[-1]
                    md:after:h-[30px] md:after:top-7  after:w-full 
                    lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>{t_projects('districtOne.title1')}</span>
                {' '}
                {t_projects('districtOne.title2')}
            </>),
            proj_location: t_projects('locations.Abu Dhabi'),
            content: (
                <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">
                    {t_projects('districtOne.content')}
                </p>
            ),
            image: '/assets/images/luxury-project-uae/ultra-luxury-projects/district-one-west.webp',
            starting_price: '11,000,000',
            price_unit: 'AED',
            facts: [
                { label: t('Slider.Facts.bedroom'), value: t('Slider.FactsValues.districtOne.bedroom'), icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
                { label: t('Slider.Facts.type'), value: t('Slider.FactsValues.districtOne.type'), icon: '/assets/images/luxury-project-uae/icons/home.svg' },
                { label: t('Slider.Facts.handover'), value: t('Slider.FactsValues.districtOne.handover'), icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
                { label: t('Slider.Facts.downpayment'), value: t('Slider.FactsValues.districtOne.downpayment'), FaIcon: faTag },
            ],
            brochure: '',
        },
        {
            proj_name: t_projects('laMer.title1') + ' ' + t_projects('laMer.title2'),
            title: (<> <span className={`text-[40px] md:text-[55px] lg:text-[62px] after:bg-[#C19A5B] after:absolute
                    after:h-[25px] after:left-0 after:top-4 after:z-[-1]
                    md:after:h-[30px] md:after:top-7  after:w-full 
                    lg:after:h-[40px] lg:after:top-6 ${parisienne.className} relative `}>{t_projects('laMer.title1')}</span>
                {' '}
                {t_projects('laMer.title2')}
            </>),
            proj_location: t_projects('locations.Dubai'),
            content: (
                <p className="mb-5 md:mt-0 mt-3 md:text-lg text-md md:text-start text-center">
                    {t_projects('laMer.content')}
                </p>
            ),
            image: '/assets/images/luxury-project-uae/ultra-luxury-projects/la-mer-mansion.webp',
            starting_price: '35,000,000',
            price_unit: 'AED',
            facts: [
                { label: t('Slider.Facts.bedroom'), value: t('Slider.FactsValues.laMer.bedroom'), icon: '/assets/images/luxury-project-uae/icons/bed-orange.svg' },
                { label: t('Slider.Facts.type'), value: t('Slider.FactsValues.laMer.type'), icon: '/assets/images/luxury-project-uae/icons/home.svg' },
                { label: t('Slider.Facts.handover'), value: t('Slider.FactsValues.laMer.handover'), icon: '/assets/images/luxury-project-uae/icons/hand.svg' },
                { label: t('Slider.Facts.downpayment'), value: t('Slider.FactsValues.laMer.downpayment'), FaIcon: faTag },
            ],
            brochure: '',
        }
    ]

    const handlePropDataToSend = (propData?: LuxuryProjectsData) => {
        onAction(propData);
    };

    return (
        <>
            <div className="max-w-screen-xl mx-auto relative z-10 text-white px-4" dir={isRTL ? "rtl" : "ltr"}>
                <div className={`absolute md:-top-32 -top-10 md:left-auto left-7 text-[60px] md:text-[140px] lg:text-[180px] font-bolder 
                ${montserratBolder.className} text-[#fff] opacity-10`} dir={isRTL ? "rtl" : "ltr"}>03</div>
                <h2 className="lg:ml-20 sm-ml-0 ml-10 text-sm md:text-md lg:text-xl uppercase text-[#FBD784] font-bold tracking-[6] mb-5 flex gap-2 md:gap-5 sm:justify-start justify-center items-center text-center md:text-start"
                dir={isRTL ? "rtl" : "ltr"}>
                    <span className="w-[35px] md:w-[65px] w-[25px] h-[3px] bg-[#FBD784]"></span>{t('title')}
                </h2>
                <UltraLuxuryProjectsSlider data={data} slides={UltraLuxuryProjectsData} onAction={handlePropDataToSend} />
            </div>
        </>
    )
}
