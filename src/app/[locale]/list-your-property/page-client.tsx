"use client"

import { Poppins } from "next/font/google";
import Link from "next/link";
import CircleIcon from "./Components/CircleIcon";
import "./Components/list-projects.css";
import { useEffect, useState } from "react";
import WhereToListPropertySlider from "./Components/WhereToListPropertySlider";
import PropertiesSlider from "./Components/PropertiesSlider";
import ListForm from "./Components/ListForm";
import Accordion from "./Components/Accordion";
import InquireModal from "./Components/InquireModal";
import { useTranslations } from "next-intl";
import BrightCallWidget from "../_components/BrightCallWidget";
import { useSearchParams } from "next/navigation";
import { ListPageResolveBrightcallWidget } from "./Components/Brightcall/ListPageResolveBrightcallWidget";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

// Configure Poppins font
const poppins = Poppins({
    weight: ["400", "700"],
    variable: "--font-poppins",
    display: "swap",
    subsets: ["latin"],
});

const thumbnails = [
    '/assets/images/list-property/list-slide-1-1.webp',
    '/assets/images/list-property/list-slide-2.webp',
    '/assets/images/list-property/list-slide-3.webp',
];

const WhereToListItems = [
    {
        "title": "PSI",
        "image": "/assets/images/list-property/logos/psi-logo.png",
    },
    {
        "title": "Property Finder",
        "image": "/assets/images/list-property/logos/property-finder.png",
    },
    {
        "title": "Dubizzle",
        "image": "/assets/images/list-property/logos/dubizzle.png",
    },
    {
        "title": "Bayut",
        "image": "/assets/images/list-property/logos/bayut-logo.png",
    },
    {
        "title": "Google",
        "image": "/assets/images/list-property/logos/google-logo.png",
    },
    {
        "title": "Meta",
        "image": "/assets/images/list-property/logos/meta-logo.png",
    }
];

const ListYourPropertyPageClient = () => {
    const sp = useSearchParams();
    const utmCampaign = typeof sp.get("utm_campaign") === "string" ? sp.get("utm_campaign") : null;

    const widgetKey = ListPageResolveBrightcallWidget({
        pageType: "listpage",
        locale: "en",
        utmCampaign,
    });

    const t = useTranslations("ListYourPropertyPage");

    const navItems = [
        { name: t("nav.home"), icon: "/assets/images/list-property/home-icon.svg", href: "#home" },
        { name: t("nav.about"), href: "#about" },
        { name: t("nav.providers"), href: "#providers" },
        { name: t("nav.solutions"), href: "#our-solutions" },
        { name: t("nav.benefits"), href: "#benefits" },
        { name: t("nav.faqs"), href: "#faqs" }
    ];

    const propSliderContent = [
        {
            "title": t("exclusive_listing.title"),
            "content": t.raw("exclusive_listing.points"),
            "image": "/assets/images/list-property/property-slider-img-1.webp",
        },
        {
            "title": t("non_exclusive_listing.title"),
            "content": t.raw("non_exclusive_listing.points"),
            "image": "/assets/images/list-property/property-slider-img-2-new.webp",
        }
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLeftHovering, setIsLeftHovered] = useState(false);
    const [isTopHovering, setIsTopHovered] = useState(false);
    const [isBottomHovering, setIsBottomHovered] = useState(false);
    const [modal, setModal] = useState(false);

    const modalHandler = () => {
        //console.log("clicked = " + modal);
        setModal(true);
    };
    const modalUpdate = (event: any) => {
        setModal(event);
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const [sliderImg, setSliderImg] = useState(thumbnails[0]);
    const thumbnailImgs = thumbnails.filter((thumb) => thumb !== sliderImg);

    useEffect(() => {
        const interval = setTimeout(() => {
            setSliderImg(prevImg => {
                const currentIndex = thumbnails.indexOf(prevImg);
                const nextIndex = (currentIndex + 1) % thumbnails.length;
                return thumbnails[nextIndex];
            });
        }, 5000);

        return () => clearTimeout(interval);
    }, [sliderImg]);

    return (
        <>
            <div className={`relative w-full md:h-[800px] overflow-hidden md:py-0`} id="home">
                {thumbnails.map((img, index) => (
                    <div key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ease-in-out 
                        ${sliderImg === img ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{
                            background: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${img}") center center / cover no-repeat`,
                            zIndex: 0,
                        }} >
                    </div>
                ))}

                <div
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${sliderImg === thumbnails[2] ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{
                        background: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${thumbnails[2]}") center center / cover no-repeat`,
                        zIndex: 0,
                    }}
                ></div>

                <nav aria-label="Global" className="relative w-full mx-auto lg:px-8 lg:bg-[#FFFFFF99]">
                    {/* mobile toggle button */}
                    <div className="lg:hidden px-5 flex items-center justify-center relative pt-3">
                        <button
                            className="absolute left-[30px] h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle 
                        text-xs uppercase transition-all hover:bg-transparent focus:bg-transparent 
                        active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            onClick={toggleMobileMenu}
                            type="button"
                        >
                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-[30px] h-[30px]"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="1"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h26M4 13h26M4 21h26"
                                    />
                                </svg>
                            </span>
                        </button>
                        <Link href="/" title="Property Shop Investment">
                            <span className="sr-only">Property Shop Investment</span>
                            <img src="/logo-psi-white.svg" alt="logo" title="logo" width={100}></img>
                        </Link>
                    </div>
                    {/* mobile menu */}
                    <div className={`flex flex-column justify-between fixed bottom-0 left-0 min-h-[96%] h-[96%] bg-white w-96 shadow-lg transform transition-transform duration-300 rounded-r-xl ease-in-out px-[45px]
                    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden z-50`}>
                        <div>
                            <div className="flex justify-start border-b border-[#dee2e6] pb-5">
                                <button onClick={toggleMobileMenu}
                                    className="top-4 left-4 text-slate-600 hover:text-red-500"
                                >
                                    <img src="/assets/images/list-property/menu-arrow.svg" alt="menu arrow" title="menu arrow"></img>
                                </button>
                                <Link href="/" className="justify-self-center translate-x-20" title="Property Shop Investment">
                                    <span className="sr-only">Property Shop Investment</span>
                                    <img src="/PSI-Logo.svg" alt="logo" title="logo" width={100} className=""></img>
                                </Link>
                            </div>

                            <ul className="flex flex-col h-full gap-4 py-4 text-md font-semibold text-[#272963] leading-loose mt-5">
                                {navItems.map((item, index) => (
                                    <Link key={index} href={item.href} onClick={() => setIsMobileMenuOpen(false)} title={item.name}>
                                        <li key={index}>
                                            {item.name}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                        <div className="mobMenuFooter border-t border-[#dee2e6] py-5">
                            <h3 className="text-center h3-section text-[#9D9D9D] text-xs leading-normal">{t("footer.copyright")}</h3>
                        </div>
                    </div>

                    {/* Desktop menu */}
                    <div className="lg:flex hidden max-w-(--breakpoint-xl) mx-auto max-w-full items-center justify-between ">
                        <div>
                            <Link href="/" title="Property Shop Investment">
                                <span className="sr-only">Property Shop Investment</span>
                                <img src="/PSI-Logo.svg" alt="logo" title="logo" width={100}></img>
                            </Link>
                        </div>

                        {/*menu items */}
                        <div className="flex justify-center gap-10 text-md text-[#272963]">
                            {navItems.map((item, index) => (
                                <Link key={index}
                                    href={item.href} title={item.name} className="">
                                    {item.icon ?
                                        <img src="/assets/images/list-property/home-icon.svg" alt="home" title="home"></img>
                                        :
                                        item.name
                                    }

                                </Link>
                            ))}

                        </div>
                        <div className="btnOuter relative bg-[#E35F27] rounded-[8px] px-2 h-[50px] w-[201px] font-semibold">
                            <button className="btn btnPrimary btnAnimate text-white flex justify-between py-0 gap-2 items-center h-[48px] w-[201px]"
                                onClick={modalHandler}>
                                <CircleIcon />
                                {t("hero.button")}
                            </button>
                            <div className="btnAnimateBorder absolute"></div>
                        </div>
                    </div>
                </nav>
                <div className="relative w-full h-full md:px-auto px-1 md:py-5 pt-[100px] pb-[70px]">
                    <div className="max-w-(--breakpoint-xl) mx-auto md:flex max-w-full text-white h-full px-4">
                        <div className="md:w-2/3 w-full h-full content-center md:text-start text-center">
                            <h1 className="md:text-6xl text-3xl font-bold capitalize leading-normal">{t("hero.title")}</h1>
                            <h3 className="md:text-2xl text-lg my-5 md:leading-normal leading-loose">{t("hero.subtitle")}</h3>
                            <div className="flex lg:justify-between justify-center md:w-[400px] sm:gap-auto gap-[10px]">
                                <div className="btnOuter relative bg-[#E35F27] rounded-[8px] mt-5 h-[48px] sm:w-[201px] w-[180px] ">
                                    <button className="btn btnPrimary btnAnimate text-white flex justify-between py-1 gap-2 px-2 items-center h-[50px] sm:w-[201px] w-[180px]"
                                        onClick={modalHandler}>
                                        <CircleIcon />
                                        {t("hero.button")}
                                    </button>
                                    <div className="banner-btn btnAnimateBorder absolute"></div>
                                </div>
                                <Link className="btn btnSecondary flex text-center items-center justify-center border border-1-[#fff] h-[50px] w-[180px] rounded-[8px] mt-5"
                                    href="https://www.youtube.com/watch?v=fchpHRqT7mg"
                                    target="_blank"
                                    title="video">
                                    <img src="/assets/images/list-property/play.png" alt="play" title="play"></img>
                                    {t("hero.watch_video")}
                                </Link>
                            </div>
                            <div className="dots-container flex gap-[10px] mt-[40px] md:justify-start justify-center">
                                {thumbnails.map((img, index) => (
                                    <div key={index}
                                        onClick={() => setSliderImg(img)}
                                        className={`dot w-[10px] h-[10px] rounded-full bg-white cursor-pointer transition-all duration-300 ${sliderImg == img ? 'active' : ''}`}>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-1/3 w-full content-center md:block hidden ">
                            <div className="thumbnail-container md:flex flex-column gap-[10px] items-end mt-[80px]">
                                {thumbnailImgs.map((thumb, index) => (
                                    <img
                                        key={index}
                                        className="thumbnail w-[317px] h-[154px] rounded-[15px] cursor-pointer"
                                        src={thumb}
                                        alt={`Thumbnail ${index + 1}`} title={`Thumbnail ${index + 1}`}
                                        onClick={() => setSliderImg(thumb)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="spacer md:h-[100] h-[30px]"></div>
            <div className="w-full why-to-list pt-5" id="about">
                <div className="max-w-(--breakpoint-xl) mx-auto md:flex px-4 justify-stretch">
                    <div className="md:w-1/2 h-full md:pr-5">
                        <h2 className="md:text-4xl text-3xl max-w-[500px] text-[#272963] font-medium leading-normal mb-5">{t("about.title")}</h2>
                        <p className="text-[#808080] leading-loose mb-5 ">{t("about.description")}
                        </p>
                        <ul className="text-[#686A93] font-medium">
                            {t.raw("about.points").map((point: string, index: number) => (
                                <li key={index} className="flex gap-3 items-center">
                                    <FontAwesomeIcon icon={faCheckCircle} color="#e35f27" className="w-6 h-6" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                        <div className="btnOuter relative bg-[#E35F27] rounded-[8px] mt-[50px] h-[48px] w-[201px] ms-0 md:flex hidden">
                            <button className="btn btnPrimary btnAnimate text-white flex justify-between py-0 gap-2 items-center px-2 h-[50px] w-[201px]"
                                onClick={modalHandler}>
                                <CircleIcon />
                                {t("hero.button")}
                            </button>
                            <div className="btnAnimateBorder absolute"></div>
                        </div>
                    </div>
                    <div className="md:w-1/2 md:pl-5">
                        <div className="flex flex-row h-full items-stretch gap-[15px]">
                            <div className="w-1/2 h-full">
                                <div className="w-full md:h-full h-[335px] relative" style={{ aspectRatio: "3/4" }}
                                    onMouseEnter={() => setIsLeftHovered(true)} onMouseLeave={() => setIsLeftHovered(false)} >
                                    <img src="/assets/images/list-property/list-about-1-2.webp"
                                        alt="about psi" title="about psi" className={`w-full h-full object-cover rounded-[30px] absolute inset-0
                                        transition-opacity duration-500 ease-in-out
                                        ${isLeftHovering ? 'opacity-100' : 'opacity-0'} `}></img>

                                    <img src="/assets/images/list-property/list-about-1.webp"
                                        alt="about psi" title="about psi" className={`w-full h-full object-cover rounded-[30px] transition-opacity duration-500 ease-in-out
                                        ${isLeftHovering ? 'opacity-0' : 'opacity-100'}`}></img>
                                </div>
                            </div>
                            <div className="w-1/2 flex flex-column md:h-full gap-[15px] md:mt-[-50px]">
                                <div className="w-full h-[60%] relative"
                                    onMouseEnter={() => setIsTopHovered(true)} onMouseLeave={() => setIsTopHovered(false)} >
                                    <img src="/assets/images/list-property/list-about-2-2.webp"
                                        alt="about psi" title="about psi" className={`w-full h-full object-cover rounded-[30px] 
                                        absolute inset-0 transition-opacity duration-500 ease-in-out
                                        ${isTopHovering ? 'opacity-100' : 'opacity-0'}`}></img>

                                    <img src="/assets/images/list-property/list-about-2-desk.webp"
                                        alt="about psi" title="about psi" className={`w-full h-full object-cover rounded-[30px] 
                                        absolute inset-0 transition-opacity duration-500 ease-in-out
                                        ${isTopHovering ? 'opacity-0' : 'opacity-100'}`}></img>
                                </div>
                                <div className="w-full h-[40%] relative"
                                    onMouseEnter={() => setIsBottomHovered(true)} onMouseLeave={() => setIsBottomHovered(false)}>
                                    <img src="/assets/images/list-property/list-about-3-2.webp"
                                        alt="about psi" title="about psi" className={`w-full h-full object-cover rounded-[30px] 
                                        absolute inset-0 transition-opacity duration-500 ease-in-out
                                        ${isBottomHovering ? 'opacity-100' : 'opacity-0'}`}></img>

                                    <img src="/assets/images/list-property/list-about-3.webp"
                                        alt="about psi" title="about psi" className={`w-full h-full object-cover rounded-[30px] 
                                        absolute inset-0 transition-opacity duration-500 ease-in-out
                                        ${isBottomHovering ? 'opacity-0' : 'opacity-100'}`}></img>
                                </div>
                            </div>
                        </div>
                        <div className="btnOuter relative bg-[#E35F27] rounded-[8px] mt-[50px] h-[48px] w-[201px] ms-0 md:hidden flex justify-self-center">
                            <button className="btn btnPrimary btnAnimate text-white flex justify-between py-0 gap-2 items-center h-[48px] w-[201px]"
                                onClick={modalHandler}>
                                <CircleIcon />
                                {t("hero.button")}
                            </button>
                            <div className="btnAnimateBorder absolute"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="spacer h-[100]"></div>

            <div className="w-full why-to-list pt-5">
                <div className="max-w-(--breakpoint-xl) mx-auto md:flex px-4 justify-stretch">
                    <div className="md:w-1/2 h-full md:pr-5 relative">
                        <div className="bg-[#e35f2733] rounded-[10px] w-[90%] h-[70%] absolute left-[-30px] top-[-30px] z-[-1]"></div>
                        <video width="100%" height="400" autoPlay loop muted playsInline className="rounded-[10px] z-99999">
                            <source src="/assets/images/list-property/virtual-tour.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="md:w-1/2 md:pl-5">
                        <h2 className="text-4xl text-[#272963] font-medium leading-normal mb-5">{t("virtual_tour.title")}</h2>
                        <p className="text-[#808080] leading-loose mb-5">{t("virtual_tour.description")}
                        </p>
                        <div className="btnOuter relative bg-[#E35F27] rounded-[8px] mt-[50px] py-0 px-2 h-[50px] w-[201px] ms-0">
                            <button className="btn btnPrimary btnAnimate text-white flex justify-between py-0 gap-2 items-center h-[48px] w-[201px]"
                                onClick={modalHandler}>
                                <CircleIcon />
                                {t("hero.button")}
                            </button>
                            <div className="btnAnimateBorder absolute"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="spacer h-[100]"></div>

            <div className="w-full bg-[#f8f8f8] py-[80px]" id="providers">
                <div className="max-w-(--breakpoint-xl) mx-auto md:flex px-4">
                    <div className="md:w-4/7">
                        <h2 className="text-4xl text-[#272963] font-medium leading-normal mb-5">{t("where_to_list.title")}</h2>
                        <p className="text-[#808080] leading-loose mb-5">{t("where_to_list.description")}
                        </p>
                    </div>
                    <div className="md:w-3/7 justify-items-end content-end mb-5 md:block hidden">
                        <div className="btnOuter relative bg-[#E35F27] rounded-[8px] mt-[50px] px-2 h-[50px] w-[201px] ms-0 justify-self-end">
                            <button className="btn btnPrimary btnAnimate text-white flex justify-between py-0 gap-2 items-center h-[48px] w-[201px]"
                                onClick={modalHandler}>
                                <CircleIcon />
                                {t("hero.button")}
                            </button>
                            <div className="btnAnimateBorder absolute"></div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <WhereToListPropertySlider slides={WhereToListItems} />
                </div>
                <div className="md:hidden block justify-self-center">
                    <div className="btnOuter relative bg-[#E35F27] rounded-[8px] mt-[50px] px-2 h-[50px] w-[205px] ms-0 justify-self-end">
                        <button className="btn btnPrimary btnAnimate text-white flex justify-between py-0 gap-2 items-center h-[48px] w-[201px]"
                            onClick={modalHandler}>
                            <CircleIcon />
                            {t("hero.button")}
                        </button>
                        <div className="btnAnimateBorder absolute"></div>
                    </div>
                </div>
            </div>
            <div className="spacer h-[50]"></div>

            <div className="w-full overflow-visible z-0 relative" id="our-solutions">
                <PropertiesSlider slides={propSliderContent}
                    modal={modal}
                    onOpenModal={modalHandler}
                    onUpdateModal={modalUpdate} />
            </div>

            <div className="w-full flex md:py-[80px] pt-[80px] pb-[40px] items-stretch min-h-[400px]" id="benefits">
                <div className="md:block hidden md:w-1/6 bg-contain bg-repeat bg-center flex-1"
                    style={{ backgroundImage: "url('/assets/images/list-property/bg-vector.svg')" }}></div>
                <div className="md:w-2/3 text-center flex-3 flex flex-col justify-center md:p-10 px-4 py-10 gap-8">
                    <h2 className="text-4xl text-[#272963] font-medium leading-normal">{t("benefits.title")}</h2>
                    <span className="w-[171px] h-[5px] self-center " style={{ background: "linear-gradient(90deg, #FFFFFF 0%, #E35F27 100%)" }}></span>
                    <p className="text-[#808080] leading-loose mb-5">{t("benefits.description")}
                    </p>
                    <div className="grid md:grid-cols-3 md:grid-rows-2 grid-cols-2 grid-rows-3 justify-content-center text-center text-[#808080] gap-x-5 gap-y-10">
                        {t.raw("benefits.items").map((benefit: string, index: number) => (
                            <div key={index} className="iconBox justify-items-center md:px-8 px-2">
                                <img src={`/assets/images/list-property/icons/benefits-${index + 1}.svg`} alt={`benefit-${index + 1}`} title={`benefit-${index + 1}`} className="mb-4" />
                                <p className="md:text-[16px] text-sm">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:block hidden md:w-1/6 bg-contain bg-repeat bg-center flex-1 scale-x-[-1]"
                    style={{ backgroundImage: "url('/assets/images/list-property/bg-vector.svg')" }}></div>
            </div>

            <div className="w-full bg-cover bg-no-repeat bg-center formBg relative z-0">
                <div className="w-full h-full md:hidden block absolute inset-0 z-1 formBg-grad"
                    style={{ background: "linear-gradient(0deg, #f7f7f700, #f7f7f700), linear-gradient(0deg, rgba(39, 41, 99, 0.5), rgba(39, 41, 99, 0.5))" }} ></div>
                <div className="max-w-(--breakpoint-xl) md:flex mx-auto px-4 items-center relative z-10">
                    <div className="md:w-1/2 md:block hidden gap-4 py-10">
                        <img src="/PSI-Logo.svg" alt="logo" title="logo" width={104} className="mb-5"></img>
                        <h5 className="text-sm text-[#E35F27] font-semibold mb-3">{t("form.title")}</h5>
                        <h2 className="text-4xl text-[#272963] font-medium leading-normal mb-3">{t("form.footer_branding.title")}</h2>
                        <p className="text-[#212529]">{t("form.footer_branding.description")}</p>
                    </div>
                    <div className="md:w-1/2 md:pl-5 md:py-0 py-5" style={{ zIndex: "9999" }}>
                        <div className="formBox bg-white rounded-[16px] md:p-5 py-5 px-3 md:my-[-40px]" style={{ boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.25)" }}>
                            <ListForm />
                        </div>
                    </div>
                </div>
            </div>

            <div className="spacer h-[50]"></div>

            <div className="max-w-(--breakpoint-xl) mx-auto px-4 items-center" id="faqs">
                <h2 className="text-4xl text-[#272963] font-medium leading-normal mb-3">{t("faqs_section.title")}</h2>
                <div className="w-full py-10">
                    <Accordion />
                </div>
            </div>
            <div className="spacer h-[50]"></div>

            <footer className="absolute w-full">
                {/* Copyright Section */}
                <div className="text-center text-[119px] sm:text-base py-4 bg-white text-[#111954] sm:bg-[#111954] sm:text-white">
                    <p>{t("footer.copyright")}</p>
                </div>
            </footer>

            <InquireModal modalState={modal} onModalUpdate={modalUpdate} />
            <BrightCallWidget widgetKey={widgetKey} formType="listpage" />
        </>
    )
}

export default ListYourPropertyPageClient
