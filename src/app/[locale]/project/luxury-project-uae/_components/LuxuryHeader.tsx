'use client'

import { Montserrat, Parisienne, Libre_Baskerville } from "next/font/google";
import { useEffect, useState } from "react";

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-montserrat',
});

const parisienne = Parisienne({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-parisienne',
});

interface Props {
  onAction: (title?: string) => void;
  pageURL: string;
}

const banners = [
    '/assets/images/luxury-project-uae/luxury-project-uae-main.webp',
    '/assets/images/luxury-project-uae/luxury-uae-banner-2.webp',
];

const navItems = [
    {name: "Home", url: "#home"},
    {name: "Luxury Projects", url: "#luxury-projects"},
    {name: "Ultra Luxury Projects", url: "#ultra-luxury-projects"},
    {name: "Entertainments", url: "#entertainment"},
    {name: "Future Residence", url: "#future-residence"},
    {name: "VIP Tour", url: "#vip-tours"},
]

export default function LuxuryHeader ({onAction, pageURL}: Props) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    const handleClick = (title? : string) => {
        onAction(title);
    }
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    useEffect(() => {
        const interval = setInterval(() => {            
                setCurrentBannerIndex((prevIndex) => 
                    (prevIndex + 1) % banners.length
                );
            },4000);        
        return () => clearTimeout(interval);
    }, []);

    return(
    <div className={`relative w-full md:h-[750px] h-[450px] md:py-0 ${montserrat.className} bg-cover! bg-center! bg-no-repeat!`} id="home"
        style={{ background: `url(${banners[currentBannerIndex]})` }}>                
            <div
            className="absolute inset-0 transition-opacity duration-500 ease-in-out w-full h-full"
            style={{
            background: `linear-gradient(0deg, #FFFFFF00 10%, #131f52ad 100%, #131f526e 0% )`,
            zIndex: 0,
            }} >
            </div>            
            <nav aria-label="Global" className="relative w-full mx-auto lg:px-8">
            {/* mobile toggle button */}
            <div className="lg:hidden px-5 flex items-center justify-between relative pt-3">                
                <a href="/">
                    <span className="sr-only">Property Shop Investment</span>
                    <img src="/logo-psi-white.svg" alt="logo" title="logo" width={60}></img>
                </a>
                <button
                className="h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle 
                text-xs uppercase transition-all hover:bg-transparent focus:bg-transparent 
                active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={toggleMobileMenu}
                type="button"
                >
                    <span className="w-[30px] h-[30px]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[30px] h-[30px]"
                            fill="none"
                            stroke="#C19A5B"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h26M4 13h26M4 21h26"
                            />
                        </svg>
                    </span>
                </button>
            </div>
            {/* mobile menu */}
            <div className={`flex flex-column justify-between fixed bottom-0 left-0 min-h-[96%] h-[96%] w-64 bg-white w-96 shadow-lg transform transition-transform duration-300 rounded-r-xl ease-in-out px-[45px]
            ${ isMobileMenuOpen ? "translate-x-0" : "-translate-x-full" } lg:hidden z-50`}>
                <div>
                    <div className="flex justify-start border-b border-[#dee2e6] pb-5">
                        <button onClick={toggleMobileMenu}
                        className="top-4 left-4 text-slate-600 hover:text-red-500"
                        >
                            <img src="/assets/images/list-property/menu-arrow.svg"></img>
                        </button>
                        <a href="/" className="justify-self-center translate-x-20">
                            <span className="sr-only">Property Shop Investment</span>
                            <img src="/PSI-Logo.svg" alt="logo" title="logo" width={70} className=""></img>
                        </a>
                    </div>
                                                                    
                    <ul className="flex flex-col gap-4 py-4 text-md font-semibold text-[#272963] leading-loose mt-5">
                        {navItems.map((item, index) => (
                            <a href={item.url} onClick={()=>setIsMobileMenuOpen(false)}>
                                <li key={index}>
                                    {item.name}
                                </li>
                            </a>
                        ))}
                    </ul>
                    <button className="cursor-pointer btn text-white text-center bg-[#C19A5B] rounded-[5px] py-0 h-[40px] w-[175px]"
                    onClick={() => handleClick('Let us know if you’re interested!')}>                                
                        Free Consultation
                    </button>
                </div>
            </div>

            {/* Desktop menu */}
            <div className="lg:flex hidden max-w-(--breakpoint-xl) mx-auto max-w-full items-center justify-between pt-5">
                <div>
                    <a href="/">
                        <span className="sr-only">Property Shop Investment</span>
                        <img src="/logo-psi-white.svg" alt="logo" title="logo" width={100}></img>
                    </a>
                </div>

                {/*menu items */}
                <div className="flex justify-center gap-10 text-md text-white">
                    {navItems.map((item,index) => (
                        <a key={index}
                            href={item.url} className="">                                    
                            {item.name} 
                        </a>
                    ))}                            
                </div>                        
                <button className="cursor-pointer btn text-white text-center bg-[#C19A5B] rounded-[5px] py-0 h-[40px] w-[175px]"
                onClick={() => handleClick('Let us know if you’re interested!')}>                               
                    Free Consultation
                </button>
            </div>
        </nav>
        
        <div className="mx-auto md:flex max-w-full text-white px-4 pt-30">
            <div className="mx-auto text-center">
                <h1 className="md:text-3xl text-3xl relative text-center">Discover  
                    <span className={`${parisienne.className} text-[#F2DAB4] md:text-8xl text-4xl`}>Luxury</span>
                    <span className="absolute -bottom-7 right-25"> Lifestyle</span>
                </h1>                     
            </div>                        
        </div>
        <div className="markerStar absolute top-[30%] left-[20%] opacity-50 
        before:absolute md:before:top-[-225px] before:top-[-140px] before:left-[12px] before:border md:before:h-[750px] before:h-[450px] before:border-1 before:border-[#c3c3c359]
        after:absolute after:top-[12px] after:left-[-400px] after:border after:w-[100vw] after:border-1 after:border-[#c3c3c359]">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 0L15.6658 10.3342L26 13L15.6658 15.6658L13 26L10.3342 15.6658L0 13L10.3342 10.3342L13 0Z" fill="#F5DABC"></path>
            </svg>
        </div>
        <div className="absolute bottom-0 w-full h-[336px] z-1" 
        style={{ background:"linear-gradient(180deg, #FFFFFF00 10%, #131f526e 37%, #353b58 100%),url('')" }}>

        </div>
    </div>
)
}