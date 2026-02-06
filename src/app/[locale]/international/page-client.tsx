'use client';

import './_components/page.css';
import Link from "next/link";
import { AudreyNormal, Audrey } from "@/utils/fonts";
import { Lato } from "next/font/google";
import { useState } from "react";
import { FaWhatsapp, FaArrowDown } from "react-icons/fa";
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';
import LocationsSlider from './_components/LocationsSlider';
import InquireForm from './_components/InquireForm';
import { Handshake } from './_components/Icons/HandShake';
import { Database } from './_components/Icons/Database';
import { Roi } from './_components/Icons/Roi';
import WhyInvest from './_components/WhyInvest';
import WhyInvest_2 from './_components/WhyInvest_2';
import LocationsSlider_2 from './_components/LocationsSlider_2';
import WhyInvestMain from './_components/WhyInvestMain';
import Solutions from './_components/Solutions';
import AwardsSection from './_components/AwardsSection';
import Partners from './_components/Partners';
import ClientReview from './_components/ClientReview';
import FooterSection from './_components/FooterSection';
import LearnMoreModal from './_components/LearnMoreModal';

const latoLight = Lato({
    subsets: ['latin'],
    weight: ['300'],
    variable: '--font-lato',
});

const lato = Lato({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-lato',
});

interface props {
    iconColor: string,
    iconWidth: string,
    iconHeight: string,
}

export default function InternationalPageClient() {
    const t = useTranslations('InternationalPage');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [iconColor, setIconColor] = useState('white');
    const [iconWidth, setIconWidth] = useState('100%');
    const [iconHeight, setIconHeight] = useState('100%');
    const [modal, setModal] = useState(false);

    // Navigation items from translations
    const navItems = [
        { name: t('nav.items.uae_market'), href: "#UAE_MARKET" },
        { name: t('nav.items.investment_opportunities'), href: "#INVESTMENT" },
        { name: t('nav.items.why_invest_in_uae'), href: "#WHY_INVEST" },
        { name: t('nav.items.about_us'), href: "#ABOUT_US" },
        { name: t('nav.items.client'), href: "#CLIENT" },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const scrollToSection = (id: any) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const modalHandler = () => {
        setModal(true);
    }
    const modalUpdate = (event: any) => {
        setModal(event);
    }

    // Get location data from translations
    const locationsData = t.raw('investment_section.locations') as any[];
    const locationsData_2 = t.raw('roi_comparison_section.locations') as any[];

    return (
        <>
            <div className="w-full bg-[url('/assets/images/international/international-header.webp')] relative
        bg-cover bg-center bg-no-repeat items-stretch">
                <nav className="w-full xl:px-5 text-white border-b border-[#ffffff80]">
                    <div className="xl:hidden flex relative items-center justify-between items-stretch">
                        <a href="/">
                            <div className="w-[103px] border border-[#ffffff80] border-b-0 p-5">
                                <img src="/logo-psi-white.svg" alt="PSI-logo" className="w-[50px]" />
                            </div>
                        </a>
                        <div className=" ps-5 text-md leading-tight content-center">
                            {t('nav.real_estate').split(' ')[0]}<br />{t('nav.real_estate').split(' ')[1]}
                        </div>
                        {/* mobile toggle button */}
                        <div className="bg-[#ffffff80] min-h-full w-[103px] border border-[#ffffff80] px-5 flex flex-column justify-center items-center gap-1 ease-in transition duration-300"
                            onClick={toggleMobileMenu}>
                            {!isMobileMenuOpen && (
                                <>
                                    <span className="h-[1px] bg-white rounded-[100px] w-[20px]">
                                    </span>
                                    <span className="h-[1px] bg-white rounded-[100px] w-[10px]">
                                    </span>
                                    <span className="h-[1px] bg-white rounded-[100px] w-[20px]">
                                    </span>
                                </>
                            )
                            }
                            {isMobileMenuOpen && (
                                <FontAwesomeIcon icon={faClose} />
                            )
                            }
                        </div>
                    </div>
                    {/* mobile menu */}
                    <div className={`flex flex-column justify-between fixed bottom-0 left-0 min-h-[96%] h-full w-[75%] bg-[#0000004d] backdrop-blur transform transition-transform duration-300 ease-in-out px-[25px]
                ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} xl:hidden z-50`}>
                        <div>
                            <div className="border-b border-[#dee2e6] py-5">
                                <a href="/" className="justify-self-center translate-x-20">
                                    <span className="sr-only">Property Shop Investment</span>
                                    <img src="/logo-psi-white.svg" alt="logo" title="logo" width={70} className=""></img>
                                </a>
                            </div>

                            <ul className="flex flex-col h-full gap-4 py-4 text-sm text-white leading-normal mt-5">
                                {navItems.map((item, index) => (
                                    <a href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                                        <li key={index}>
                                            {item.name}
                                        </li>
                                    </a>
                                ))}
                            </ul>
                        </div>
                        <div className="mobMenuFooter border-t border-[#dee2e6] py-5">
                            <h3 className="text-center h3-section text-[#9D9D9D] text-xs leading-normal">{t('mobile_menu.copyright').split('|')[0]}<br />| {t('mobile_menu.copyright').split('|')[1]}</h3>
                        </div>
                    </div>

                    {/* desktop menu */}
                    <div className="xl:flex hidden w-full items-center align-stretch">
                        <div className="w-1/14 border border-[#ffffff80] border-b-0 p-6">
                            <a href="/">
                                <img src="/logo-psi-white.svg" alt="PSI-logo" className="w-[50px]" />
                            </a>
                        </div>
                        <span className="w-1/14 ps-5 text-lg leading-tight">
                            {t('nav.real_estate').split(' ')[0]}<br />{t('nav.real_estate').split(' ')[1]}
                        </span>
                        <div className="w-5/7 flex justify-center text-center gap-10 text-md">
                            {navItems.map((item) => (
                                <Link key={item.name}
                                    href={item.href} className="">
                                    {
                                        item.name
                                    }
                                </Link>
                            ))}

                        </div>
                    </div>
                </nav>

                <div className="w-full flex px-5 text-white min-h-full">
                    <div className="lg:block hidden  w-1/14 border border-[#ffffff80] border-t-0 border-l-0 p-6 min-h-full">

                    </div>
                    <div className="lg:w-12/14 w-full min-h-full lg:flex lg:px-5 lg:py-0 pb-20 px-2 items-center gap-5">
                        <div className="lg:w-[55%] w-full content-center lg:py-30 pt-20 pb-0 lg:px-4">
                            <h1 className={`lg:text-[90px] text-5xl lg:text-start text-center uppercase ${AudreyNormal.className}`}>
                                {t('hero.title')}
                            </h1>
                            <h3 className={`lg:text-3xl text-xl font-extralight ${latoLight.className} font-light lg:my-5 my-2 
                        lg:text-start text-center lg:normal-case uppercase`}>
                                {t('hero.subtitle')}
                            </h3>

                            <a className="w-full text-xl py-3 rounded flex justify-center gap-2 items-center"
                                href="https://wa.me/+97122052999?text=Please%20contact%20me" target="blank"
                                style={{ backgroundImage: "linear-gradient(180deg, rgb(37 211 102) 14%, rgb(7 94 84) 100%)" }}>
                                <FaWhatsapp />{t('hero.whatsapp_button')}
                            </a>
                            <div className="w-full bg-[#00000070] px-5 py-7 my-12">
                                <ul className={`lg:text-xl text-md ${latoLight.className} list-disc pl-5`}>
                                    {(t.raw('hero.stats') as string[]).map((stat, index) => (
                                        <li key={index}>{stat}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="lg:w-[45%] w-full md:pl-10">
                            <div className='bg-[#00000066] p-10'>
                                <h2 className={`text-white text-3xl ${lato.className}} mb-7`}>{t('form_section.title')}</h2>
                                <InquireForm />
                            </div>
                        </div>
                    </div>
                    <div className="lg:block hidden  w-1/14 border border-[#ffffff80] border-t-0 border-r-0 p-6 min-h-full">

                    </div>
                </div>

                <div className="absolute -bottom-10 lg:right-[35%] md:right-[45%] sm:right-[40%] right-[30%] translate-x-[-50%]">
                    <div className="w-[78px] h-[78px] bg-[#3A748A] rounded-[50%] place-content-center place-items-center cursor-pointer"
                        onClick={() => scrollToSection('UAE_MARKET')}>
                        <FaArrowDown color="white" size={30} />
                    </div>
                </div>
            </div>

            <div className="w-full bg-[url('/assets/images/international/sec1-bg.webp')] md:pt-40 pt-20 bg-cover md:bg-right-top bg-top" id="UAE_MARKET">
                <div className="max-w-screen-xl mx-auto md:flex md:flex-row grid md:px-5 px-6 lg:gap-8 gap-2">
                    <div className="md:w-[10%] w-full md:order-1 order-2">
                        <h3 className="lg:text-[20px] md:text-[17px] text-[16px]">
                            {t('market_section.subtitle')}
                        </h3>
                    </div>
                    <div className="md:w-[34%] w-full md:order-2 order-3">
                        <h2 className={`lg:text-5xl md:text-2xl text-[27px] text-start leading-tight uppercase ${AudreyNormal.className}`}>
                            {t('market_section.title')}
                        </h2>
                        <div className="lg:pl-0 lg:pr-12 lg:py-12 md:p-4 md:px-10 pl-0 pr-15 py-7 relative">
                            <img src="/assets/images/international/international-market.webp" className="w-full"
                                alt="International market" title="International market" />
                            <p className="lg:text-3xl md:text-2xl text-2xl absolute lg:bottom-30 bottom-15 md:right-[20px] right-8 text-white">
                                {t('market_section.market_in')}<br /><span className={`${AudreyNormal.className} lg:text-7xl md:text-5xl text-7xl`}>{t('market_section.year')}</span>
                            </p>
                        </div>
                    </div>
                    <div className="md:w-[45%] w-full md:order-3 order-1">
                        <h2 className={`lg:text-[120px] md:text-7xl text-6xl text-start
                    uppercase font-extrabold bg-clip-text text-transparent bg-cover bg-no-repeat
                    ${Audrey.className} bg-[url('/assets/images/international/clip.webp')]`}>
                            {t('market_section.growth_title')}
                        </h2>
                        <p className="lg:text-[28px] md:text-2xl text-xl font-light leading-snug lg:py-10 lg:pb-3 py-5 md:mb-1">
                            {t('market_section.description')}
                        </p>
                        <div className='md:w-auto w-full flex md:justify-start justify-end'>
                            <button className={`${AudreyNormal.className} cursor-pointer
                        relative uppercase lg:text-lg text-sm p-9 hover:text-white place-self-end
                        after:content-[''] after:absolute lg:after:w-[190px] after:w-[170px] lg:after:h-[100px] after:h-[80px]
                        after:border after:border-black after:inset-0 after:rounded-[50%] 
                        after:transition after:duration-300 after:rotate-[335deg]
                        hover:after:bg-black`} onClick={modalHandler}>
                                <span className="relative z-10">{t('market_section.learn_more_button')}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='md:h-[350px] h-[50px]'></div>

                <div className="max-w-screen-xl mx-auto md:flex md:flex-row grid md:gap-8 md:px-5 px-6" id='INVESTMENT'>
                    <div className="md:w-1/12 w-full md:order-1 order-2">
                        <h3 className="lg:text-[20px] md:text-[17px] text-[20px] text-white">
                            {t('investment_section.subtitle')}
                        </h3>
                    </div>
                    <div className="md:w-5/12 w-full md:order-2 order-3">
                        <h2 className={`lg:text-5xl md:text-2xl text-[27px] text-start uppercase md:text-[#ED9C4B] text-white ${AudreyNormal.className}`}>
                            {t('investment_section.title')}
                        </h2>
                    </div>
                </div>
                <div className="w-full md:ml-10 md:px-0 px-6 flex flex-row px-0 gap-8 mt-10 overflow-visible items-center">
                    <div className="md:w-2/12 w-full md:block hidden">
                        <h3 className="relative flex flex-column items-center gap-3 before:relative before:w-[1px] lg:w-[auto] w-[30px] before:h-[250px] before:bg-[#ED9C4B]" >
                            <div className=''></div>
                            <div className='lg:text-[21px] md:text-[18px] text-[20px] font-light tracking-wider text-white relative rotate-180 inline-block' style={{ writingMode: "vertical-rl" }}>{t('investment_section.vertical_text')}</div>
                        </h3>
                    </div>
                    <div className="md:w-5/6 w-full md:pr-0 md:py-5 py-0">
                        <LocationsSlider slides={locationsData} openModal={modalHandler} />
                    </div>
                </div>

                <div className="max-w-screen-xl mx-auto md:px-4 px-6 md:gap-8 pt-15 relative flex">
                    <div className=''>
                        <div className="absolute lg:left-0 md:left-10 left-0 h-full items-center flex">
                            <h3 className="relative md:flex hidden flex-column items-center gap-3 before:relative before:w-[1px] before:h-[350px] before:bg-[#ED9C4B] " >
                                <div className=''></div>
                                <div className='lg:text-[21px] md:text-[18px] text-[20px] font-light tracking-wider text-white relative rotate-180 inline-block uppercase' style={{ writingMode: "vertical-rl" }}>{t('growth_section.vertical_text')}</div>
                            </h3>
                        </div>
                    </div>

                    <div className='flex flex-column w-full'>
                        <div className="w-full md:flex md:flex-row grid ">
                            <div className="md:w-1/2 w-full md:pl-20">
                                <h2 className={`lg:text-[40px] md:text-2xl text-[27px] text-start uppercase text-white ${AudreyNormal.className} mb-15`}>
                                    {t('growth_section.title')}
                                </h2>
                                <div className='flex md:justify-start justify-end md:mb-0 mb-10'>
                                    <button onClick={modalHandler}
                                        className={`${AudreyNormal.className} cursor-pointer
                                relative uppercase lg:text-lg text-sm p-9 hover:text-black self-end
                                after:content-[''] after:absolute lg:after:w-[190px] after:w-[170px] lg:after:h-[100px] after:h-[80px] 
                                after:border after:border-[#ED9C4B] after:inset-0 after:rounded-[50%] 
                                after:transition after:duration-300 after:rotate-[335deg]
                                hover:after:bg-[#ED9C4B] text-white hover:text-black`}
                                    >
                                        <span className="relative z-10">{t('growth_section.learn_more_button')}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='w-full flex justify-end md:pb-0 pb-15'>
                            <div className="lg:w-1/2 md:w-3/4 w-full b-0">
                                <div className="md:grid md:grid-cols-3 md:grid-row-2 items-stretch flex flex-column gap-[1px] mb-0">
                                    <div className="order-first bg-[#00000080] md:px-3 px-10 md:py-15 py-20 text-white flex gap-5 align-center 
                                transition ease-in-out duration-600
                                hover:bg-white hover:text-black" onMouseOver={() => setIconColor('#ED9C4B')}
                                        onMouseOut={() => setIconColor('white')}>
                                        <div className='md:w-[45%] w-[20%]'>
                                            <Handshake iconColor={iconColor} iconHeight={iconHeight} iconWidth={iconWidth} />
                                        </div>
                                        <div>
                                            <p className={`${AudreyNormal.className} md:text-lg text-2xl my-0 leading-tight`}>{t.raw('growth_section.benefits.0.title')}</p>
                                            <p className='md:text-[13px] text-xl my-0 leading-tight'>{t.raw('growth_section.benefits.0.description')}</p>
                                        </div>
                                    </div>
                                    <div className="md:order-1 md:flex hidden"></div>
                                    <div className="md:order-2 order-last bg-[#00000080] md:px-3 px-10 md:py-15 py-20 text-white flex gap-5 align-center 
                                transition ease-in-out duration-600
                                hover:bg-white hover:text-black" onMouseOver={() => setIconColor('#ED9C4B')}
                                        onMouseOut={() => setIconColor('white')}>
                                        <div className='md:w-[40%] w-[20%]'>
                                            <Database iconColor={iconColor} iconHeight={iconHeight} iconWidth={iconWidth} />
                                        </div>
                                        <div>
                                            <p className={`${AudreyNormal.className} md:text-lg text-2xl my-0 uppercase leading-tight`}>{t.raw('growth_section.benefits.1.title')}</p>
                                            <p className='md:text-[13px] text-xl my-0 leading-tight'>{t.raw('growth_section.benefits.1.description')}</p>
                                        </div>

                                    </div>
                                    <div className="md:order-3 md:block hidden"></div>
                                    <div className="md:order-4 order-2 bg-[#00000080] md:px-3 px-10 md:py-15 py-20 text-white flex gap-5 align-center 
                                transition ease-in-out duration-600
                                hover:bg-white hover:text-black" onMouseOver={() => setIconColor('#ED9C4B')}
                                        onMouseOut={() => setIconColor('white')}>
                                        <div className='md:w-[30%] w-[20%]'>
                                            <Roi iconColor={iconColor} iconHeight="90%" iconWidth="90%" />
                                        </div>
                                        <div>
                                            <p className='md:text-[13px] text-xl my-0 leading-tight'>{t.raw('growth_section.benefits.2.description_prefix')}</p>
                                            <p className={`${AudreyNormal.className} md:text-lg text-2xl my-0 leading-tight`}>{t.raw('growth_section.benefits.2.title')}</p>
                                            <p className='md:text-[13px] text-xl my-0 leading-tight'>{t.raw('growth_section.benefits.2.description')}</p>
                                        </div>

                                    </div>
                                    <div className="md:order-last md:block hidden"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className={`absolute lg:right-[-110px] md:right-[10px] top-10 lg:text-[145px] 
                md:text-[68px] text-[27px] z-1 md:block hidden
                text-start uppercase text-[#ffffff4d] ${Audrey.className} mb-15`}>
                        {t('growth_section.real_estate_title')}
                    </h2>
                </div>
            </div>
            <div className="w-full" id='WHY_INVEST'>
                <div className="max-w-screen-xl md:flex lg:gap-5 gap-2 py-25 md:px-4 px-6 mx-auto">
                    <WhyInvest openModal={modalHandler} />
                </div>
            </div>

            <div className={`w-full md:bg-[url('/assets/images/international/international-bg-3.webp')] 
        bg-[url('/assets/images/international/international-dubai-bg.webp')] 
        bg-cover bg-top bg-center md:px-0 px-6 md:overflow-visible relative ${latoLight.className}`}>
                <div className="md:inline-block md:w-full">
                    <div className="max-w-screen-xl md:flex lg:gap-5 gap-2 xl:pt-[90vh] lg:pt-[70vh] md:pt-[60vh] pt-[23vh] md:px-4 mx-auto">
                        <WhyInvest_2 />
                    </div>
                    <div className="w-full md:flex md:justify-end 2xl:-mt-[calc(16%+40px)] xl:-mt-[calc(21%+0px)] lg:-mt-[calc(28%)] mb-5">
                        <div className="md:w-[52%] w-full md:pr-5">
                            <LocationsSlider_2 slides={locationsData_2} />
                        </div>
                    </div>
                    <WhyInvestMain openModal={modalHandler} />
                </div>
            </div>

            <div className="max-w-screen-xl md:flex lg:gap-5 gap-2 md:py-[20vh] py-5 md:px-4 px-6 mx-auto" id='ABOUT_US'>
                <Solutions />
            </div>

            <div className={`w-full md:py-30 py-7 bg-[url('/assets/images/international/international-awards.webp')] 
            bg-cover bg-top bg-center`}>
                <AwardsSection openModal={modalHandler} />
            </div>
            <div className="max-w-screen-xl md:py-30 py-7 mx-auto">
                <Partners />
            </div>

            <div className="w-full" id='CLIENT'>
                <ClientReview />
            </div>

            <footer>
                <FooterSection />
            </footer>

            <LearnMoreModal modalState={modal} onModalUpdate={modalUpdate} />


        </>
    )
}