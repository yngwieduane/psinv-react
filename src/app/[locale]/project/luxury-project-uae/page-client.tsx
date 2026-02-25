'use client'

import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from 'next-intl';
import Opportunities from "./_components/Opportunities";
import LuxuryProjects from "./_components/LuxuryProjects";
import LuxuryInquireModal from "./_components/LuxuryInquireModal";

import { LuxuryProjectsData } from "@/types/LuxuryProjectsTypes";
import UltraLuxuryProjects from "./_components/UltraLuxuryProjects";
import FutureHome from "./_components/FutureHome";
import PropertyTours from "./_components/PropertyTours";
import "./_components/LuxuryProjectsUae.css";
import EntertainmentSlider from "./_components/EntertainmentSlider";
import FAQs from "./_components/FAQs";
import Contact from "./_components/Contact";
import LuxuryFooter from "./_components/LuxuryFooter";
import LuxuryHeader from "./_components/LuxuryHeader";

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-montserrat',
});

interface Project {
    maxPrice: string;
    propertyType: string;
    [key: string]: any;
}

export default function LuxuryProjectPageClient() {
    const t = useTranslations('LuxuryProjectUAE');
    const locale = useLocale();
    const isRTL = locale.toLowerCase().startsWith("ar");

    const [modal, setModal] = useState(false);

    const [currentUrl, setCurrentUrl] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedProject, setSelectedProject] = useState<LuxuryProjectsData | null>(null);
    const [location, setLocation] = useState("Abu Dhabi");
    const [modalTitle, setModalTitle] = useState<string>("");

    const faqs = [
        {
            id: "collapseOne",
            question: t('FAQs.items.0.question'),
            answer: t('FAQs.items.0.answer')
        },
        {
            id: "collapseTwo",
            question: t('FAQs.items.1.question'),
            answer: t('FAQs.items.1.answer')
        },
        {
            id: "collapseThree",
            question: t('FAQs.items.2.question'),
            answer: t('FAQs.items.2.answer')
        },
        {
            id: "collapseFour",
            question: t('FAQs.items.3.question'),
            answer: t('FAQs.items.3.answer')
        },
        {
            id: "collapseFive",
            question: t('FAQs.items.4.question'),
            answer: t('FAQs.items.4.answer')
        },
        {
            id: "collapseSix",
            question: t('FAQs.items.5.question'),
            answer: t('FAQs.items.5.answer')
        }
    ];

    const modalHandler = (project?: LuxuryProjectsData, title?: string) => {
        if (project) {
            setSelectedProject(project);
            setLocation(project.proj_location || "");
        }
        if (title) {
            setModalTitle(title);
        }
        else {
            setModalTitle(t('Hero.nav.freeConsultation')); // Default title
        }
        setModal(true);
    };

    const modalHandler2 = (location?: string) => {
        if (location) setLocation(location);     //from dream residences section, only location is passing
        setModal(true);
    };

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            let allFetched: any[] = [];
            const totalPages = 10;
            const batchSize = 5;

            for (let i = 1; i <= totalPages; i += batchSize) {
                const batch = Array.from({ length: batchSize }, (_, idx) => i + idx)
                    .filter(p => p <= totalPages);

                const responses = await Promise.all(
                    batch.map(page => fetch(`/api/external/allprojects?page=${page}`).then(r => r.json()))
                );

                responses.forEach(res => {
                    if (res?.result?.length) {
                        allFetched.push(...res.result);
                    }
                });
                const allowedTypes = ["residential", "residential building"];
                const filtered = allFetched.filter(proj => {
                    const maxPriceNum = Number(
                        typeof proj.maxPrice === "string"
                            ? proj.maxPrice.replace(/,/g, "")
                            : proj.maxPrice
                    );

                    return (
                        !isNaN(maxPriceNum) &&
                        maxPriceNum > 7000000 &&

                        typeof proj.propertyType === "string" &&
                        allowedTypes.includes(proj.propertyType.toLowerCase().trim()) &&

                        proj.featuredImages &&
                        proj.featuredImages.length > 0
                    );
                });

                setProjects(prev => {
                    const combined = [...prev, ...filtered];
                    return combined.slice(0, 7);
                });
            }
            console.log(`fetched projects:`, projects);
            setLoading(false);
        }

        fetchProjects();
    }, []);

    const modalUpdate = (event: any) => {
        setModal(event);
    };

    return (
        <>
            <div className="w-full" dir={isRTL ? "rtl" : "ltr"}>
                <LuxuryHeader onAction={(modalTitle?: string) => modalHandler(undefined, modalTitle)}
                    pageURL={currentUrl} />
            </div>
            <div className={`w-full bg-[#353B58] ${montserrat.className}`} dir={isRTL ? "rtl" : "ltr"}>
                <Opportunities onAction={(modalTitle?: string) => modalHandler(undefined, modalTitle)}
                    pageURL={currentUrl} />
            </div>
            <div className={`w-full bg-[#353B58] ${montserrat.className}`} id="luxury-projects">
                <div className="h-[100px]"></div>
                <LuxuryProjects onAction={modalHandler} data={projects} loadingStatus={loading} />
            </div>

            <div className={`w-full bg-[#353B58] ${montserrat.className} relative 
        bg-[url("/assets/images/luxury-project-uae/ultra-luxury-bg.webp")] bg-cover bg-no-repeat md:pb-20 md:pt-10 py-5`}
                id="ultra-luxury-projects">
                <div className="h-[500px] w-full absolute inset-0" style={{ backgroundImage: "linear-gradient(0deg, #FFFFFF00 10%, #353B58 100%, #131f526e 0%)" }}></div>
                <div className="h-[100px]"></div>
                <UltraLuxuryProjects onAction={modalHandler} data={projects} loadingStatus={loading} />
                <div className="h-[70%] w-full absolute bottom-0 left-0" style={{ backgroundImage: "linear-gradient(180deg, #FFFFFF00 10%, #131f526e 37%, #353b58 100%)" }}></div>
            </div>
            <div className={`w-full relative bg-[#353B58] ${montserrat.className} 
        bg-cover bg-center bg-no-repeat bg-right md:bg-[url("/assets/images/luxury-project-uae/dream-residence.webp")] bg-none`}
                id="future-residence" dir={isRTL ? "rtl" : "ltr"}>
                <div className=" h-full absolute inset-0 w-full"
                    style={{ backgroundImage: "linear-gradient(0deg, #FFFFFF00 10%, #131f52ad 100%, #131f526e 0%)" }}>
                </div> 
                <div className="md:h-[590px] "></div>
                <FutureHome onAction={modalHandler2} />
            </div>

            <div className={`w-full bg-[#353B58] ${montserrat.className} bg-[url("/assets/images/luxury-project-uae/property-tours.webp")] 
        h-[798px] bg-cover bg-center`} id="vip-tours"  dir={isRTL ? "rtl" : "ltr"}>
                <div style={{ background: "linear-gradient(0deg, #FFFFFF00 10%, #353B58 100%, #131f526e 0%),url('')" }} className="h-full relative">
                    <div className="h-[100px]"></div>
                    <PropertyTours onAction={modalHandler} />
                    <div className="h-[150px] absolute bottom-0 w-full"
                        style={{ background: "linear-gradient(180deg, #FFFFFF00 10%, #131f526e 37%, #353b58 100%)" }}>
                    </div>
                </div>
            </div>
            <div className="w-full bg-[#353B58] text-white">
                <div className="w-full mx-auto flex justify-between text-center content-center px-4 py-5 gap-0 relative">
                    <div className="flex flex-column items-center gap-3 relative w-1/3">
                        <div className="z-10 iconImage"
                            style={{ backgroundImage: "url('/assets/images/luxury-project-uae/icons/readytomove.svg')" }}></div>
                        <p className="md:text-lg sm:text-sm text-[12px] font-bold z-10">{t('Features.readyToMove')}</p>
                    </div>
                    <div className="flex flex-column items-center gap-3 relative w-1/3">
                        <div className="iconSeparator"></div>
                        <div className="z-10 iconImage"
                            style={{ backgroundImage: "url('/assets/images/luxury-project-uae/icons/sitevisit.svg')" }}></div>
                        <p className="md:text-lg sm:text-sm text-[12px] font-bold z-10">{t('Features.siteVisits')}</p>
                    </div>
                    <div className="flex flex-column items-center gap-3 relative w-1/3">
                        <div className="iconSeparator2"></div>
                        <div className="z-10 iconImage"
                            style={{ backgroundImage: "url('/assets/images/luxury-project-uae/icons/key.svg')" }}></div>
                        <p className="md:text-lg sm:text-sm text-[12px] font-bold z-10">{t('Features.getYourKeys')}</p>
                    </div>
                </div>
            </div>
            {/* Entertainment section */}
            <div id="entertainment"
                className={`md:min-h-[1100px] min-h-[600px] relative w-full bg-[#353B58] ${montserrat.className} md:pb-20 md:pt-10 py-5 pt-25`}  dir={isRTL ? "rtl" : "ltr"} >
                <div className="absolute inset-0 z-[5]"  dir={isRTL ? "rtl" : "ltr"}>
                    <EntertainmentSlider />
                </div>
            </div>
            {/* FAQs */}
            <div id="faqs"
                className={`w-full bg-[#353B58] ${montserrat.className} py-35`} dir={isRTL ? "rtl" : "ltr"}>
                <FAQs data={faqs} />
            </div>
            { /* contact */}
            <div id="connect" className={`w-full bg-[#353B58] ${montserrat.className} py-5`} dir={isRTL ? "rtl" : "ltr"}>
                <Contact />
            </div>
            { /* footer */}
            <LuxuryFooter />
            <LuxuryInquireModal modalState={modal} onModalUpdate={modalUpdate} project={selectedProject} location={location} title={modalTitle} />

        </>

    )
}