"use client";

import { Audrey, BrittanySignature } from "@/utils/fonts";
import { Great_Vibes, Montserrat, Open_Sans, Outfit } from "next/font/google";
import AboutCounter from "./_components/AboutCounter";
import AwardSlider from "./_components/AboutAwardsSlider";
import PartnerSlider from "./_components/AboutPartnerSlider";
import AboutTextSlider from "./_components/AboutTextSlider";
import LocationsSection from "./_components/LocationsSection";
import { PrinterIcon } from "@heroicons/react/24/outline";
import LandlordsIcon from "./_components/Icons/LandlordsIcon";
import LeasingIcon from "./_components/Icons/LeasingIcon";
import ManagementIcon from "./_components/Icons/ManagementIcon";
import PropertyManagementIcon from "./_components/Icons/PropertyManagementIcon";
import MarketingIcon from "./_components/Icons/MarketingIcon";
import SalesIcon from "./_components/Icons/SalesIcon";
import "../../about.css";
import YoutubeVideoAbout from "./_components/YoutubeVideoAbout";
import { useLocale, useTranslations } from "next-intl";


const opensans = Open_Sans({
    variable: "--font-opensans",
    display: "swap",
    subsets: ["latin"],
});

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
});

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
});

const greatVibes = Great_Vibes({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-great-vibes',
});

const partners = [
    {
        "title": "Aldar",
        "image": "/assets/images/about-us/partners/aldar.jpg",
    },
    {
        "title": "Emaar",
        "image": "/assets/images/about-us/partners/emaar.jpg",
    },
    {
        "title": "Imkan",
        "image": "/assets/images/about-us/partners/imkan.jpg",
    },
    {
        "title": "Meraas",
        "image": "/assets/images/about-us/partners/meraas.jpg",
    },
    {
        "title": "Nshama",
        "image": "/assets/images/about-us/partners/nshama.jpg",
    },
    {
        "title": "Dubai Properties",
        "image": "/assets/images/about-us/partners/dubai-properties.jpg",
    },
    {
        "title": "Aabar",
        "image": "/assets/images/about-us/partners/aabar.jpg",
    },
    {
        "title": "Hydra",
        "image": "/assets/images/about-us/partners/hydra.jpg",
    },
]

const AboutPageClient = () => {
    const t = useTranslations('About_Us_Page');
    const t_awards = useTranslations("AwardsSectionHome");
    const locale = useLocale();
    const isRTL = locale.toLowerCase().startsWith("ar");

    const testimonialData = [
        {
            name: t('Testimonials.Said'),
            designation: t('Testimonials.Said_designation'),
            text: t('Testimonials.Said_text'),
            image: '/assets/images/about-us/ceo-said-photo.png',
        },
        {
            name: t('Testimonials.Firas'),
            designation: t('Testimonials.Firas_designation'),
            text: t('Testimonials.Firas_text'),
            image: '/assets/images/about-us/ceo-mr-firas.jpg',
        },
        {
            name: t('Testimonials.Amer'),
            designation: t('Testimonials.Amer_designation'),
            text: t('Testimonials.Amer_text'),
            image: '/assets/images/about-us/ceo-mr-amer.jpg',
        },
    ];

    const coreValues = [
        { title: t('CoreValues_List.WE_GATHER.title'), icon: "/assets/images/about-us/1.png", description: t('CoreValues_List.WE_GATHER.description') },
        { title: t('CoreValues_List.NOVELTY.title'), icon: "/assets/images/about-us/2.png", description: t('CoreValues_List.NOVELTY.description') },
        { title: t('CoreValues_List.ACCOUNTABILITY.title'), icon: "/assets/images/about-us/3.png", description: t('CoreValues_List.ACCOUNTABILITY.description') },
    ];

    const aboutCardData = [
        { title: t('STRATEGIC_places.UAE'), image: "/assets/images/about-us/uae-image.jpg" },
        { title: t('STRATEGIC_places.India'), image: "/assets/images/about-us/india-image.jpg" },
        { title: t('STRATEGIC_places.USA'), image: "/assets/images/about-us/usa-image.jpg" },
        { title: t('STRATEGIC_places.Poland'), image: "/assets/images/about-us/poland-image.jpg" },
        { title: t('STRATEGIC_places.Romania'), image: "/assets/images/about-us/romania-image.jpg" },
        { title: t('STRATEGIC_places.UK'), image: "/assets/images/about-us/uk-image.jpg" },
    ];

    return (
        <>
            <div className={isRTL ? 'rtl' : ''} dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="relative h-[60vh] flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: 'url("/assets/images/about-us/psi-office.webp")' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
                    </div>
                    <div className="relative z-10 text-center text-white mt-16 px-4">
                        <h1 className={`text-5xl md:text-7xl font-bold mb-4 tracking-widest ${outfit.className}`}>{t('heroTitle')}</h1>
                        <p className="text-sm uppercase tracking-widest text-gray-300 font-medium">{t('heroBreadcrumb')}</p>
                    </div>
                </div>
                <section className="py-24 container mx-auto px-4 md:px-8" dir={isRTL ? 'rtl' : 'ltr'}>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-4 relative">
                            <h4 className={`text-5xl mb-2 absolute -top-8 z-10 transform ${isRTL ? 'rotate-6 -right-2' : '-rotate-6 -left-2 '} font-great-vibes text-gray-800 ${greatVibes.className}`}>{t('aboutTag')}</h4>
                            <h2 className={`text-4xl md:text-5xl font-serif font-bold text-primary uppercase leading-none pt-4 relative z-0 ${outfit.className}`}>
                                {t('mainHeading')}
                            </h2>
                        </div>
                        <div className={`md:col-span-8 text-gray-600 font-thin text-base leading-relaxed space-y-6 text-justify ${opensans.className}`}>
                            <p className="font-light">
                                {t('paragraph1.part1')} <strong className="font-bold">{t('paragraph1.part2')}</strong> {t('paragraph1.part3')}
                            </p>
                            <p className="font-light">
                                {t('paragraph2')}
                            </p>
                            <p className="font-light">
                                {t('paragraph3')}
                            </p>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-1">
                    <div className="overflow-hidden h-72">
                        <img src="/assets/images/about-us/psi-office.webp" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Office" />
                    </div>
                    <div className="overflow-hidden h-72">
                        <img src="/assets/images/about-us/main-office.webp" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Meeting" />
                    </div>
                    <div className="overflow-hidden h-72">
                        <img src="/assets/images/about-us/corporate-office.webp" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Lobby" />
                    </div>
                </div>

                <AboutTextSlider slides={testimonialData} />

                {/* Core Values */}
                <section className="py-24 bg-slate-50" dir={isRTL ? 'rtl' : 'ltr'}>
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="flex flex-col lg:flex-row gap-16 items-start">
                            <div className={`${opensans.className} lg:w-5/12`}>
                                <h2 className={`text-5xl font-serif font-bold text-primary mb-8 ${outfit.className}`}>{t('CoreValues.title')}</h2>
                                <p className="text-gray-600 text-base leading-relaxed mb-6 font-light">
                                    {t('CoreValues.paragraph1')}
                                </p>
                                <p className="text-gray-600 text-base leading-relaxed font-light">
                                    {t('CoreValues.paragraph2')}
                                </p>
                                <p className="text-gray-600 text-base leading-relaxed font-light">
                                    {t('CoreValues.paragraph3')}
                                </p>

                            </div>

                            <div className="lg:w-7/12 space-y-6">
                                {coreValues.map((val, idx) => (
                                    <div key={idx} className={`flex gap-8 items-center bg-white p-8 rounded-lg shadow-sm  border-primary hover:border-secondary transition-colors duration-300 group ${isRTL ? 'border-r-4' : 'border-l-4'}`}>
                                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center font-bold text-2xl flex-shrink-0 font-serif group-hover:bg-secondary text-[#fff] transition-colors duration-300 shadow-lg">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary text-xl mb-2 uppercase tracking-wide group-hover:text-[#000]">{val.title}</h4>
                                            <p className="text-gray-500 text-sm font-light leading-relaxed">{val.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container mx-auto px-4 md:px-8 my-24" dir={isRTL ? 'rtl' : 'ltr'}>
                    <div className="mx-auto max-w-(--breakpoint-xl) bg-cover bg-center sm:h-[500px] h-[200px] rounded-3xl" style={{ backgroundImage: "url('/assets/images/about-us/awards-img.jpg')" }}>
                    </div>
                </section>

                <section dir={isRTL ? 'rtl' : 'ltr'} className={`w-full text-white text-center ${montserrat.className}`} style={{ backgroundImage: "url('/assets/images/about-us/our-services.jpg')" }} >
                    <div className="w-full py-[60px]" style={{ backgroundColor: "rgba(44, 45, 101,.9)" }}>
                        <div className="max-w-[1320] mx-auto flex flex-col items-center px-4">
                            <h2 className={`${outfit.className} text-5xl tracking-widest mb-[40px]`}>{t('Our_Services.heroTitle')}</h2>
                            <p className={`${outfit.className} text-xl`}>{t('Our_Services.heroDescription')}</p>
                            <a target="_blank" href="/assets/documents/PSI-company-profile-2025.pdf" className="my-5 bg-transparent hover:bg-white text-white hover:text-black rounded-xl border border-white p-[15px] flex text-center"><PrinterIcon width={30} style={{ marginRight: '7px' }} /> {t('Our_Services.downloadProfile')}</a>
                        </div>
                        <div className={`${outfit.className} mx-auto max-w-[1320] flex gap-[25] mt-5 px-4`} >
                            <div className={`${isRTL ? 'text-right' : 'text-left'} w-full grid lg:grid-cols-3 lg:grid-rows-2 sm:grid-cols-2 sm:grid-rows-3 grid-cols-1 gap-[25]`}>
                                <div className="bg-[#2C2D65] rounded-xl xl:p-[40px] p-[30px]">
                                    <div className="w-full">
                                        <div className="w-full flex justify-start relative lg:mb-[50] mb-[30] gap-3">
                                            <div className="w-1/3">
                                                <SalesIcon />
                                            </div>
                                            <h3 className="xl:text-2xl md:text-lg text-2xl font-bold pt-3">{t('Our_Services.SALES_title')}</h3>
                                        </div>
                                        <p className="text-md leading-loose">{t('Our_Services.SALES_description')}</p>
                                    </div>
                                </div>
                                <div className="bg-[#2C2D65] rounded-lg xl:p-[40px] p-[30px]">
                                    <div className="w-full">
                                        <div className="w-full flex gap-3 justify-start items-center relative lg:mb-[50] mb-[30]">
                                            <div className="w-1/3">
                                                <LandlordsIcon />
                                            </div>
                                            <h3 className="xl:text-2xl md:text-lg text-2xl font-bold">{t('Our_Services.LANDLORDS_title')}</h3>
                                        </div>
                                        <p className="text-md leading-loose">{t('Our_Services.LANDLORDS_description')}</p>
                                    </div>
                                </div>
                                <div className="bg-[#2C2D65] rounded-lg xl:p-[40px] p-[30px]">
                                    <div className="w-full">
                                        <div className="w-full flex gap-3 justify-start items-center relative lg:mb-[50] mb-[30]">
                                            <div className="w-1/3">
                                                <LeasingIcon />
                                            </div>
                                            <h3 className="xl:text-2xl md:text-lg text-2xl font-bold">{t('Our_Services.LEASING_title')}</h3>
                                        </div>
                                        <p className="text-md leading-loose">{t('Our_Services.LEASING_description')}</p>
                                    </div>
                                </div>
                                <div className="bg-[#2C2D65] rounded-lg xl:p-[40px] p-[30px]">
                                    <div className="w-full">
                                        <div className="w-full flex gap-3 justify-start items-center lg:mb-[50] mb-[30]">
                                            <div className="w-1/3">
                                                <ManagementIcon />
                                            </div>
                                            <h3 className="xl:text-2xl md:text-lg text-2xl font-bold">{t('Our_Services.DEVELOPMENT_MANAGEMENT_title')}</h3>
                                        </div>
                                        <p className="text-md leading-loose">{t('Our_Services.DEVELOPMENT_MANAGEMENT_description')}</p>
                                    </div>
                                </div>
                                <div className="bg-[#2C2D65] rounded-lg xl:p-[40px] p-[30px]">
                                    <div className="w-full">
                                        <div className="w-full flex gap-3 justify-start items-center relative lg:mb-[50] mb-[30]">
                                            <div className="w-1/3">
                                                <PropertyManagementIcon />
                                            </div>
                                            <h3 className="xl:text-2xl md:text-lg text-2xl font-bold md:max-w-[215px]">{t('Our_Services.PROPERTY_MANAGEMENT_title')}</h3>
                                        </div>
                                        <p className="text-md leading-loose">{t('Our_Services.PROPERTY_MANAGEMENT_description')}</p>
                                    </div>
                                </div>
                                <div className="bg-[#2C2D65] rounded-lg xl:p-[40px] p-[30px]">
                                    <div className="w-full">
                                        <div className="w-full flex gap-3 justify-start items-center relative lg:mb-[50] mb-[30]">
                                            <div className="w-1/3">
                                                <MarketingIcon />
                                            </div>
                                            <h3 className="xl:text-2xl md:text-lg text-2xl font-bold">{t('Our_Services.MARKETING_title')}</h3>
                                        </div>
                                        <p className="text-md leading-loose">{t('Our_Services.MARKETING_description')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full bg-secondary-color py-10 text-gray-500" dir={isRTL ? "rtl" : "ltr"}>
                    <div className="max-w-(--breakpoint-xl) mx-auto bg-center bg-cover py-10 px-5" style={{ backgroundImage: "url('/assets/images/about-us/pattern-1.png')", }}>
                        {/* Heading */}
                        <div className="text-center mt-[50px] mb-[70px]">
                            <h3 className={`text-darkblue  font-bold text-xl md:text-4xl ${Audrey.className}`}>
                                {t("RealEstatePartner.title.part1")}{" "}
                                <span className={`font-brittany text-orange font-light ${BrittanySignature.className} text-[#CE641D]`}>
                                    {t("RealEstatePartner.title.part2")}
                                </span>{" "}
                                {t("RealEstatePartner.title.part3")}
                            </h3>
                        </div>

                        {/* script for counter working */}
                        <AboutCounter />

                        {/* Counter Section */}
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-6 text-center counter1">
                            <div>
                                <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="150">  0 </span>K</h4>
                                <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("RealEstatePartner.aboutCounter.customers")}</p>
                            </div>
                            <div>
                                <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="15"> 0</span></h4>
                                <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("RealEstatePartner.aboutCounter.languages")}</p>
                            </div>
                            <div>
                                <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}> +<span className="data-count" data-count="120"> 0</span></h4>
                                <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("RealEstatePartner.aboutCounter.projects")}</p>
                            </div>
                            <div className="hidden md:block">
                                <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="10"> 0</span></h4>
                                <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("RealEstatePartner.aboutCounter.locationWorldwide")}</p>
                            </div>
                        </div>

                        {/* Second Counter Section */}
                        <div className="grid grid-cols-3 gap-6 text-center mt-10 counter2">
                            <div>
                                <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}> +<span className="data-count" data-count="17"> 0</span></h4>
                                <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("RealEstatePartner.aboutCounter.years")}</p>
                            </div>
                            <div>
                                <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="12"> 0 </span></h4>
                                <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("RealEstatePartner.aboutCounter.branches")}</p>
                            </div>
                            <div>
                                <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}> +<span className="data-count" data-count="700"> 0</span></h4>
                                <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("RealEstatePartner.aboutCounter.expertEmployees")}</p>
                            </div>
                        </div>

                        {/* Mobile Only - Location Worldwide */}
                        <div className="mt-10 text-center md:hidden">
                            <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="10"> 0 </span></h4>
                            <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("RealEstatePartner.aboutCounter.locationWorldwide")}</p>
                        </div>
                    </div>
                </section>

                <div className="w-full py-10 text-gray-500 text-center" id="awards">
                    <div className="container mx-auto px-4 md:px-8">
                        <h3 className="text-3xl text-gray-900 mb-4">
                            {t_awards("title")}
                        </h3>
                        <p className="text-gray-500 max-w-2xl mx-auto mb-12">{t_awards("desc")}</p>
                    </div>
                    <div className="w-full">
                        <div className="container mx-auto px-4 md:px-8 relative mx-auto">
                            <AwardSlider />
                        </div>
                    </div>
                </div>

                <section className="w-full py-24 bg-white text-center">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="text-center mb-[70] ">
                            <h3 className="font-bold text-primary mb-3 text-3xl  md:text-4xl">
                                {t('DISCOVER_title')}
                            </h3>
                            <p className={`text-gray-500 mb-12 font-light tracking-wide`}>{t('DISCOVER_desc')}</p>
                        </div>
                        <div className="max-w-5xl mx-auto">
                            <YoutubeVideoAbout videoId="f_K-ZrzuZLs" thumb="/assets/images/about-us/video-thumb.jpg" height="h-[350px] md:h-[690px]" />
                        </div>
                    </div>
                </section>

                <section className="w-full pt-24 bg-white border-t border-gray-100">
                    <div className="container mx-auto  max-w-6xl px-4 md:px-8 text-center">
                        <div className="text-center mb-[70] ">
                            <h3 className="font-bold text-primary mb-3 text-3xl  md:text-4xl">
                                {t('PARTNERS_title')}
                            </h3>
                            <p className="text-gray-500 mb-12 font-light tracking-wide">{t('PARTNERS_desc')}</p>
                        </div>
                        <PartnerSlider slides={partners} />
                    </div>
                </section>

                <section className="w-full py-24 bg-white">
                    <div className="container mx-auto px-4 md:px-8">
                        <div className="text-center mb-[70] ">
                            <h3 className={`font-bold text-primary mb-3 text-3xl md:text-4xl ${outfit.className}`}>
                                {t('STRATEGIC_title.part1')} <span className={`${greatVibes.className} font-normal text-5xl md:text-6xl px-2`}>{t('STRATEGIC_title.part2')}</span>
                            </h3>
                            <p className="text-gray-500 text-sm mt-2 tracking-wide">{t('STRATEGIC_desc')}</p>
                        </div>

                        <div className="aboutCards grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
                            {aboutCardData.map((card, idx) => {
                                return (
                                    <div key={idx} className="bg-gray-400 h-64 relative group overflow-hidden cursor-pointer">
                                        <img src={card.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                                            <span className="text-white font-serif text-xl font-bold">{card.title}</span>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </section>
                <section className="w-full my-4 locationsSection" dir={isRTL ? 'rtl' : 'ltr'}>
                    <LocationsSection />
                </section>

            </div>

        </>
    )
}

export default AboutPageClient