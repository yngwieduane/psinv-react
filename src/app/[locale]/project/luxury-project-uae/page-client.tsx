'use client'

import { Montserrat } from "next/font/google";
import { useEffect, useState } from "react";
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

const faqs = [
    { id: "collapseOne",
      question: "What distinguishes these ultra-luxury properties from other real estate offerings in terms of amenities and features?",
      answer: "Ultra-luxury properties distinguish themselves through unparalleled amenities and features. They often include custom-designed interiors by top-tier designers, advanced home automation systems, private pools and spas, in-house wellness facilities, and exclusive concierge services. These exclusive properties also feature personalised touches, expansive layouts, high-end finishes, panoramic views, and private access features such as elevators and entrances, which set them apart from standard real estate offerings."
    },
    { id: "collapseTwo",
      question: "How is the privacy and security of residents ensured in these exclusive projects?",
      answer: "Privacy and security in these exclusive projects are ensured through comprehensive and sophisticated measures. These include 24/7 security, gated entrances, advanced surveillance, and secure, and private parking areas, which offer residents peace of mind. Furthermore, each architectural design emphasises privacy with features like private gardens or terraces, and limited access points, providing residents with a secure and secluded living environment."
    },
    { id: "collapseThree",
      question: "How does the investment potential of these ultra-luxury projects compare to traditional real estate options?",
      answer: "Ultra-luxury projects often offer superior investment potential compared to traditional real estate options. They are typically located in prime, highly sought-after areas, leading to greater appreciation in value. The scarcity and exclusivity of these properties further enhance their demand among affluent buyers, often resulting in higher returns on investment. Moreover, their premium quality, brand prestige, and unique features provide stability and growth even in fluctuating markets."
    },
    { id: "collapseFour",
      question: "How does the resale market typically perform for luxury and ultra-luxury properties in your portfolio?",
      answer: "The resale market for luxury and ultra-luxury properties in our portfolio generally performs exceptionally well. These properties tend to retain or increase their value over time due to their prime locations, superior build quality, and exclusive features. They attract high-net-worth buyers looking for premium and prestigious living spaces, which creates a competitive market. Historical data shows that luxury properties in our portfolio often appreciate at rates higher than the general market, ensuring strong resale performance."
    },
    { id: "collapseFive",
      question: "Why is investing in real estate a good choice?",
      answer: "Investing in real estate is a wise choice because it provides multiple financial benefits. It offers a steady income stream through rental payments, and properties typically increase in value over time, leading to significant long-term gains. Real estate investments also serve as a strong hedge against inflation, as property values and rental income generally increase with inflation rates. Additionally, real estate can diversify an investment portfolio, reducing overall risk."
    },
    { id: "collapseSix",
      question: "What are the benefits of investing in real estate in the UAE?",
      answer: "Investing in UAE real estate offers substantial benefits. The country’s robust economy and strategic location make it a prime spot for international business and tourism. This ensures high demand for properties, leading to attractive rental yields and capital appreciation. Additionally, property owners can benefit from the country’s Golden Visa programme, which grants long-term residency qualifying investors, offering stability and opportunities to live, work, and study."
    }
];


export default function LuxuryProjectPageClient() {
    const [modal, setModal] = useState(false);
    
    const[currentUrl, setCurrentUrl] = useState('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedProject, setSelectedProject] = useState<LuxuryProjectsData | null>(null);
    const [location, setLocation] = useState("Abu Dhabi");
    const [modalTitle, setModalTitle] = useState<string>("");
    
    const modalHandler = (project?: LuxuryProjectsData, title?: string ) => {
        if (project) {             
            setSelectedProject(project);            
            setLocation(project.proj_location || "");
        }
        if(title) { 
            setModalTitle(title);
        }
        else { 
            setModalTitle('Let us know if you’re interested!');
        }
        setModal(true);
    };

    const modalHandler2 = (location?:string) => {
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

                return(
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

    return(
        <>
        <LuxuryHeader onAction = {(modalTitle?: string) => modalHandler(undefined, modalTitle)} 
        pageURL = {currentUrl} />
        
    <div className={`w-full bg-[#353B58] ${montserrat.className}`}>        
        <Opportunities onAction = {(modalTitle?: string) => modalHandler(undefined, modalTitle)} 
        pageURL = {currentUrl} />
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
     id="future-residence">
        <div className=" h-full absolute inset-0 w-full" 
            style={{ backgroundImage: "linear-gradient(0deg, #FFFFFF00 10%, #131f52ad 100%, #131f526e 0%)" }}>
        </div>
        <div className="md:h-[590px] "></div>
        <FutureHome onAction={modalHandler2} />
    </div>

    <div className={`w-full bg-[#353B58] ${montserrat.className} bg-[url("/assets/images/luxury-project-uae/property-tours.webp")] 
    h-[798px] bg-cover bg-center`} id="vip-tours">
        <div style={{ background:"linear-gradient(0deg, #FFFFFF00 10%, #353B58 100%, #131f526e 0%),url('')"}} className="h-full relative">
            <div className="h-[100px]"></div>
            <PropertyTours onAction={modalHandler} /> 
            <div className="h-[150px] absolute bottom-0 w-full"
            style={{ background:"linear-gradient(180deg, #FFFFFF00 10%, #131f526e 37%, #353b58 100%)"}}>
            </div>    
        </div>  
    </div>
    <div className="w-full bg-[#353B58] text-white">        
        <div className="w-full mx-auto flex justify-between text-center content-center px-4 py-5 gap-0 relative">
            <div className="flex flex-column items-center gap-3 relative w-1/3">                
                <div className="z-10 iconImage" 
                style={{backgroundImage: "url('/assets/images/luxury-project-uae/icons/readytomove.svg')"}}></div>
                <p className="md:text-lg sm:text-sm text-[12px] font-bold z-10">Ready to move in</p>                
            </div>
            <div className="flex flex-column items-center gap-3 relative w-1/3">
                <div className="iconSeparator"></div>                
                <div className="z-10 iconImage" 
                style={{backgroundImage: "url('/assets/images/luxury-project-uae/icons/sitevisit.svg')"}}></div>
                <p className="md:text-lg sm:text-sm text-[12px] font-bold z-10">Site visits</p>                
            </div> 
            <div className="flex flex-column items-center gap-3 relative w-1/3">
                <div className="iconSeparator2"></div>                
                <div className="z-10 iconImage" 
                style={{backgroundImage: "url('/assets/images/luxury-project-uae/icons/key.svg')"}}></div>                
                <p className="md:text-lg sm:text-sm text-[12px] font-bold z-10">Get your keys</p>                
            </div> 
        </div>
    </div>

    {/* Entertainment section */}
    <div id="entertainment"
    className={`md:min-h-[1100px] min-h-[600px] relative w-full bg-[#353B58] ${montserrat.className} md:pb-20 md:pt-10 py-5 pt-25`} >   
        <div className="absolute inset-0 z-[5]">
            <EntertainmentSlider />
        </div>
    </div>
    {/* FAQs */}
    <div id="faqs"
    className={`w-full bg-[#353B58] ${montserrat.className} py-35`} >   
        <FAQs data={faqs} />
    </div>

    { /* contact */}
    <div id="connect" className={`w-full bg-[#353B58] ${montserrat.className} py-5`}>
        <Contact />
    </div>
    { /* footer */ }
    <LuxuryFooter />

    <LuxuryInquireModal modalState ={modal} onModalUpdate = {modalUpdate} project = {selectedProject} location = {location} title={modalTitle} />

 </>

)
}