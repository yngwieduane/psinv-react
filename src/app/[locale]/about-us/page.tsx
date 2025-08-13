"use client";

import { Audrey, BrittanySignature } from "@/utils/fonts";
import { Montserrat, Open_Sans } from "next/font/google"; 
import AboutCounter from "./_components/AboutCounter";
import AwardSlider from "./_components/AboutAwardsSlider";
import YoutubeVideo from "../_components/YoutubeVideo";
import PartnerSlider from "./_components/AboutPartnerSlider";
import AboutTextSlider from "./_components/AboutTextSlider";
import AboutCard from "./_components/AboutCard";
import LocationsSection from "./_components/LocationsSection";
import { PrinterIcon } from "@heroicons/react/24/outline";
import LandlordsIcon from "./_components/Icons/LandlordsIcon";
import LeasingIcon from "./_components/Icons/LeasingIcon";
import ManagementIcon from "./_components/Icons/ManagementIcon";
import PropertyManagementIcon from "./_components/Icons/PropertyManagementIcon";
import MarketingIcon from "./_components/Icons/MarketingIcon";
import SalesIcon from "./_components/Icons/SalesIcon";
import "../../about.css";


const opensans = Open_Sans({
    variable: "--font-opensans",
    display:"swap",
    subsets: ["latin"],
  });

  const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
  });

  const awards = [
    {
        "title1":"ALDAR",
        "title2":"TOP PERFORMING",
        "title3": "Agency First Place - 2016",
        "image": "aldar-2016.jpg",
    },
    {
        "title1":"ALDAR",
        "title2":"TOP PERFORMING",
        "title3": "Agency First Place - 2022",
        "image": "aldar-2022.jpg",
    },
    {
        "title1":"ALDAR",
        "title2":"TOP PERFORMING",
        "title3": "Agency First Place - 2023",
        "image": "aldar-2022.jpg",
    },
    {
        "title1":"ALDAR",
        "title2":"TOP PERFORMING",
        "title3": "Agency First Place - 2023",
        "image": "aldar-2022.jpg",
    }
];

const partners = [
    {
        "title":"Aldar",
        "image":"/assets/images/about-us/partners/aldar.jpg",
    },
    {
        "title":"Emaar",
        "image":"/assets/images/about-us/partners/emaar.jpg",
    },
    {
        "title":"Imkan",
        "image":"/assets/images/about-us/partners/imkan.jpg",
    },
    {
        "title":"Meraas",
        "image":"/assets/images/about-us/partners/meraas.jpg",
    },
    {
        "title":"Nshama",
        "image":"/assets/images/about-us/partners/nshama.jpg",
    },
    {
        "title":"Dubai Properties",
        "image":"/assets/images/about-us/partners/dubai-properties.jpg",
    },
    {
        "title":"Aabar",
        "image":"/assets/images/about-us/partners/aabar.jpg",
    },
    {
        "title":"Hydra",
        "image":"/assets/images/about-us/partners/hydra.jpg",
    },
]

const testimonialData = [
    {
        name:"Said Abu Laila",
        designation: "Chairman",
        text:"Since 2007, Property Shop Investment (PSI) has led the transformation of UAE's real estate. Moving into 2024, our goal is global recognition, driving innovation and exceeding investor expectations. We're committed to redefining real estate globally, aligning with our vision to lead and inspire across markets",
        image: '/assets/images/about-us/ceo-said-photo.png',
    },
    {
        name:"Firas Abu Laila",
        designation: "Chief Executive Officer",
        text:"PSI aligns with Abu Dhabi's growth and diversification goals, aiming to bolster its position as a top investment destination. Our global ambitions complement Abu Dhabi's vision, promising to surpass investor expectations and contribute to its economic prosperity",
        image: '/assets/images/about-us/ceo-mr-firas.jpg',
    },
    {
        name:"Amer Saadeh",
        designation: "Chief Executive Officer",
        text:"PSI aims to mirror Dubai's innovative spirit in real estate, contributing to its vision by attracting global investments and fostering economic growth. We're set to elevate Dubai's real estate market, enhancing investor confidence and setting new industry standards",
        image: '/assets/images/about-us/ceo-mr-amer.jpg',
    },
]

const aboutCardData = [
    { title: "United Arab Emirates", background: "/assets/images/about-us/uae-image.jpg" },
    { title: "India", background: "/assets/images/about-us/india-image.jpg" },
    { title: "USA", background: "/assets/images/about-us/usa-image.jpg" },
    { title: "Poland", background: "/assets/images/about-us/poland-image.jpg" },
    { title: "Romania", background: "/assets/images/about-us/romania-image.jpg"},
    { title: "United Kingdom", background: "/assets/images/about-us/uk-image.jpg" },
  ];

const AboutPage = () => {
    return(
        <>

        <section className={`w-full relative py-5 ${opensans.className}`}>
            {/* Background Grid */}
            <div className="w-full h-full grid-bg z-0"></div>

            {/* Main Content */}
            <div className="relative md:flex mx-auto px-4 max-w-[1320px] items-center py-5 gap-10">
                {/* Left Content */}
                <div className="md:w-[60%] w-full relative md:py-20 py-10">
                    <h2 className={`text-[#CE641D] text-5xl md:text-6xl mb-2 aboutTitle ${BrittanySignature.className}`}> About </h2>
                    <h2 className="text-gray-900 font-bold md:text-5xl text-4xl mb-6">Property Shop Investment</h2>
                    <div className="text-gray-500 sm:text-lg text-xs mt-6">
                        <p className="mb-4">
                        Established in 2007{" "}
                        <span className="font-bold"> Property Shop Investment (PSI)</span> is
                        one of the leading real estate firms serving the entire UAE landscape.
                        Driven by passion for success, PSI has been awarded number 1 real
                        estate agent by key giant developers for the past years. PSI continues
                        to innovate and increase its services to ensure seamless and
                        comprehensive clients’ journeys.
                        </p>
                        <p className="mb-4">
                        <span className="font-bold">Property Shop Investment</span>, led by Mr.
                        Said Abu Laila, is Abu Dhabi&apos;s premier real estate company,
                        featuring a team of over 200 licensed professionals and specialized
                        sales teams across every area of Abu Dhabi and Dubai.
                        </p>
                        <p className="mb-4">
                        Since 2016, we have built a proven track record of excellence,
                        expanding to six branches in Abu Dhabi and partnering with leading
                        developer Aldar Properties. Our expertise encompasses a diverse range
                        of property types, including villas, penthouses, and apartments.
                        </p>
                        <p className="mb-4">
                        Our mission is to elevate real estate investments and build
                        generational wealth, while our vision is to transform the industry
                        into a catalyst for capital growth for investors, communities, and
                        nations.
                        </p>
                    </div>
                </div>
               

                <div className="sm:gap-5 gap-4 sm:h-[430px] h-[350px] md:w-[40%] w-full">
                    <div className="w-full h-50 mb-5">
                        <div className="h-full bg-cover bg-center rounded-xl" style={{backgroundImage: "url('/assets/images/about-us/psi-office.webp')"}}></div>
                    </div>
                    <div className="w-full flex flex-row sm:gap-5 gap-3">                                    
                        <div className="sm:h-[200] w-1/2 h-[90] bg-cover bg-center rounded-xl" style={{backgroundImage: "url('/assets/images/about-us/main-office.webp')"}}></div>
                        <div className="sm:h-[200] w-1/2 h-[90] grow bg-cover bg-center rounded-xl img2" style={{backgroundImage: "url('/assets/images/about-us/corporate-office.webp')"}}></div>
                        
                    </div>
                </div>
            </div>
        </section>

        <AboutTextSlider slides={testimonialData} />

        <section className={`w-full my-4 ${opensans.className}`}>
            <div className="max-w-(--breakpoint-xl) mx-auto px-4">
                <h2 className={`text-5xl color-[var(--color-gray-900)] mb-6 ${opensans.className} font-bold`}>Our Core Values</h2>
                <div className="w-full md:flex items-top gap-[50]">
                    <div className="md:w-2/3 text-gray-600">
                        <p className="sm:text-2xl text-lg leading-8 mt-0">Our strong reputation in the industry is founded on our continuous commitment to quality and excellence in all the services we provide. With a blend of vision, expertise, specialized teams, enthusiasm, and transparency, Property Shop Investment has established itself as a leading influencer in Abu Dhabi&apos;s real estate market.</p>
                        <p className="sm:text-lg text-xs text-xs leading-7">As an award-winning, full-service brokerage, Property Shop Investment is recognized for consistently exceeding expectations. We strive for the highest performance and have proudly held the title of &apos;Number One Real Estate Broker in Abu Dhabi&apos; for ten consecutive years. Our focus on delivering straightforward and dependable services to both corporate and private clients guarantee complete customer satisfaction.</p>
                        <p className="sm:text-lg text-xs text-xs leading-7">All our services are customized to meet individual client needs, and our dedication transforms promises into reality.</p>
                    </div>
                    <div className="md:w-1/3 flex flex-col gap-[15px] md:ps-5">
                        <div className="w-full">
                            <h5 className="color-[var(--color-gray-900)] mb-4 md:text-3xl sm:text-2xl text-xl font-bold">We Gather</h5>
                            <p className="sm:text-[16px] text-xs text-gray-600">Not only a slogan. We gather embodies everything we stand for in our culture, business philosophy and operations.</p>
                        </div>
                        <div className="w-full">
                            <h5 className="color-[var(--color-gray-900)] mb-4 md:text-3xl sm:text-2xl text-xl font-bold">Novelty</h5>
                            <p className="sm:text-[16px] text-xs text-gray-600">Devoted to originality in our services, efforts.</p>
                        </div>
                        
                        <div className="w-full">
                            <h5 className="color-[var(--color-gray-900)] mb-4 md:text-3xl sm:text-2xl text-xl font-bold">Accountability</h5>
                            <p className="sm:text-[16px] text-xs text-gray-600">Ensuring fairness, integrity, honesty, transparency, effectiveness and commitment to responsibility.</p>
                        </div>
                    </div>
                </div>  
            </div>                                      
        </section>

        <section className="w-full md:mb-20 mb-10 md:px-auto px-4"> 
            <div className="mx-auto max-w-(--breakpoint-xl) bg-cover bg-center sm:h-[500px] h-[200px] rounded-3xl" style={{backgroundImage: "url('/assets/images/about-us/awards-img.jpg')"}}>
            </div>
        </section>

    <section className={`w-full text-white text-center ${montserrat.className}`} style={{backgroundImage:"url('/assets/images/about-us/our-services.jpg')"}} >
        <div className="w-full py-[60px]" style={{backgroundColor:"rgba(44, 45, 101,.9)"}}>
            <div className="max-w-[1320] mx-auto flex flex-col items-center px-4">
                <h2 className={`${Audrey.className} text-5xl tracking-widest mb-[40px]`}>OUR SERVICES</h2>
                <p className="text-xl">Our reputation rests on excellence, transparency, and visionary leadership. Property Shop Investment sets industry benchmarks as Abu Dhabi&apos;s real estate influencer.</p>
                <a target="_blank" href="/assets/documents/PSI-company-profile-2024.pdf" className="mb-5 bg-transparent hover:bg-white text-white hover:text-black rounded-xl border border-white p-[15px] flex text-center"><PrinterIcon width={30} style={{marginRight:'7px'}} /> Download Company Profile</a>
            </div>   
            <div className="mx-auto max-w-[1320] flex gap-[25] mt-5 px-4">
                <div className="w-full grid lg:grid-cols-3 lg:grid-rows-2 sm:grid-cols-2 sm:grid-rows-3 grid-cols-1 gap-[25]">
                    <div className="bg-[#2C2D65] rounded-xl xl:p-[40px] p-[30px]">
                        <div className="w-full text-left">
                            <div className="w-full flex justify-start relative lg:mb-[50] mb-[30]">
                                <div className="w-1/3">
                                    <SalesIcon />
                                </div>
                                <h3 className="xl:text-2xl md:text-lg text-2xl font-bold pt-3">SALES</h3>
                            </div>
                            <p className="text-md leading-loose">Our sales team serves as your trusted guide, simplifying the complex property market. From negotiations to legalities, we ensure fair deals and protect your interests, providing tailored advice to match your financial needs.</p>
                        </div>                                
                    </div>
                    <div className="bg-[#2C2D65] rounded-lg xl:p-[40px] p-[30px]">
                        <div className="w-full text-left">
                            <div className="w-full flex justify-start items-center relative lg:mb-[50] mb-[30]">
                                <div className="w-1/3">
                                    <LandlordsIcon />
                                </div>
                                <h3 className="xl:text-2xl md:text-lg text-2xl font-bold">LANDLORDS</h3>
                            </div>
                            <p className="text-md leading-loose">Our listing teams, for sales and leasing, strategically maximize property value while prioritizing client confidentiality. Close collaboration with our marketing team ensures a robust inventory of property listings across the UAE.</p>
                        </div>                                
                    </div>
                    <div className="bg-[#2C2D65] rounded-lg xl:p-[40px] p-[30px]">
                        <div className="w-full text-left">
                            <div className="w-full flex justify-start items-center relative lg:mb-[50] mb-[30]">
                                <div className="w-1/3">
                                    <LeasingIcon />
                                </div>
                                <h3 className="xl:text-2xl md:text-lg text-2xl font-bold">LEASING</h3>
                            </div>
                            <p className="text-md leading-loose">Our listing teams, for sales and leasing, maximize property value with strict confidentiality. Collaborating closely with marketing ensures a vast inventory for your property needs.</p>
                        </div>                                
                    </div>
                    <div className="bg-[#2C2D65] rounded-lg xl:p-[40px] p-[30px]">
                        <div className="w-full text-left">
                            <div className="w-full flex justify-start items-center lg:mb-[50] mb-[30]">
                                <div className="w-1/3">
                                    <ManagementIcon />
                                </div>                                            
                                <h3 className="xl:text-2xl md:text-lg text-2xl font-bold">DEVELOPMENT MANAGEMENT</h3>
                            </div>
                            <p className="text-md leading-loose">PSI builds on best practices and trusted partners to deliver high-quality, innovative developments that provide lasting value for clients and investors, aiming to redefine the standards in quality, creativity, and client focus.</p>
                        </div>                                
                    </div>
                    <div className="bg-[#2C2D65] rounded-lg xl:p-[40px] p-[30px]">
                        <div className="w-full text-left">
                            <div className="w-full flex justify-start items-center relative lg:mb-[50] mb-[30]">
                                <div className="w-1/3">
                                    <PropertyManagementIcon />
                                </div>
                                <h3 className="xl:text-2xl md:text-lg text-2xl font-bold md:max-w-[215px]">PROPERTY MANAGEMENT</h3>
                            </div>
                            <p className="text-md leading-loose">PSI has a centralised property management department that manages residential, commercial, and industrial properties on behalf of owners to preserve the value of their property and maintaining promising returns on investments.</p>
                        </div>                                
                    </div>
                    <div className="bg-[#2C2D65] rounded-lg xl:p-[40px] p-[30px]">
                        <div className="w-full text-left">
                            <div className="w-full flex justify-start items-center relative lg:mb-[50] mb-[30]">
                                <div className="w-1/3">
                                    <MarketingIcon />
                                </div>
                                <h3 className="xl:text-2xl md:text-lg text-2xl font-bold">MARKETING</h3>
                            </div>
                            <p className="text-md leading-loose">PSI&apos;s in-house marketing hub offers tailored solutions for client journeys. With multi-channel strategies and deep insights, we create seamless experiences for developers, investors, sellers, and landlords, fostering brand loyalty and recognition.</p>
                        </div>                                
                    </div>
                </div>   
            </div>                 
        </div>
    </section>      

        
        <section className="w-full bg-secondary-color py-10 text-gray-500">
            <div  className="max-w-(--breakpoint-xl) mx-auto bg-center bg-cover py-10 px-5" style={{ backgroundImage: "url('/assets/images/about-us/pattern-1.png')",}}>
                {/* Heading */}
                <div className="text-center mt-[50px] mb-[70px]">
                    <h3 className={`text-darkblue  font-bold text-xl md:text-4xl ${Audrey.className}`}>
                        YOUR TRUSTED{" "}
                        <span className={`font-brittany text-orange font-light ${BrittanySignature.className} text-[#CE641D]`}>
                        Real Estate
                        </span>{" "}
                        PARTNER
                    </h3>
                </div>

                {/* script for counter working */}
                <AboutCounter />    

                {/* Counter Section */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-6 text-center counter1">
                    <div>
                        <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="150">  0 </span>K</h4>
                        <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Customers</p>
                    </div>
                    <div>
                        <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="15"> 0</span></h4>
                        <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Languages</p>
                    </div>
                    <div>
                        <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}> +<span className="data-count" data-count="120"> 0</span></h4>
                        <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Projects</p>
                    </div>
                    <div className="hidden md:block">
                        <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="10"> 0</span></h4>
                        <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Location Worldwide</p>
                    </div>
                </div>

                {/* Second Counter Section */}
                <div className="grid grid-cols-3 gap-6 text-center mt-10 counter2">
                    <div>
                        <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}> +<span className="data-count" data-count="17"> 0</span></h4>
                        <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Years in Business</p>
                    </div>
                    <div>
                        <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="12"> 0 </span></h4>
                        <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Branches</p>
                    </div>
                    <div>
                        <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}> +<span className="data-count" data-count="700"> 0</span></h4>
                        <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Expert Employees</p>
                    </div>
                </div>

                {/* Mobile Only - Location Worldwide */}
                <div className="mt-10 text-center md:hidden">
                    <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="10"> 0 </span></h4>
                    <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Location Worldwide</p>
                </div>
            </div>
        </section>

        <section className="w-full py-10 text-gray-500 text-center">
            <div className="max-w-(--breakpoint-xl) mx-auto">
                <h3 className={`text-darkblue font-bold text-xl md:text-4xl ${Audrey.className}`}>
                AWARDS-DRIVEN
                    <span className={`font-brittany text-orange font-light ${BrittanySignature.className} text-[#CE641D]`}>
                    Excellence</span>
                </h3>
                <p className="text-lg mt-5">We reaffirm our commitment to redefining real estate standards. Our dedication to innovation and unwavering client focus has earned us recognition in the industry. 
                    Explore our journey of accolades that inspire us to reach new pinnacles of success.</p>
            </div>            
            <section className="w-full">
                <div className="max-w-(--breakpoint-xl) relative mx-auto">
                    <AwardSlider slides={awards} />
                </div>
            </section>            
        </section>

        <section className="w-full my-4">
            <div  className="max-w-(--breakpoint-xl) mx-auto bg-center bg-cover py-10 px-5">
                <div className="text-center mb-[70] ">
                    <h3 className={`text-darkblue  font-bold text-xl md:text-4xl ${Audrey.className}`}>
                    DISCOVER PSI
                    </h3>
                    <p className={`text-lg font ${montserrat.className}`}>Unveiling Our Vision, Innovations, and Commitment to Your Dream Home</p>
                </div>
                <YoutubeVideo videoId="f_K-ZrzuZLs" thumb="/assets/images/about-us/video-thumb.jpg" height="h-[350px] md:h-[690px]" />
            </div>
        </section>

        <section className="w-full my-4">
            <div  className="max-w-(--breakpoint-xl) mx-auto bg-center bg-cover py-10 px-5">
                <div className="text-center mb-[70] ">
                    <h3 className={`text-darkblue  font-bold text-xl md:text-4xl ${Audrey.className} mb-4`}>
                    PARTNERS
                    </h3>
                    <p className={`text-lg font ${montserrat.className}`}>Meet the Visionaries Behind Your Dreams: Our Real Estate Developers.</p>
                </div>
                <PartnerSlider slides={partners} />
            </div>
        </section>

        <section className="w-full my-4">
            <div className="max-w-(--breakpoint-xl) mx-auto bg-center bg-cover py-10 px-5">
                <div className="text-center mb-[70] ">
                    <h3 className={`text-darkblue  font-bold text-xl md:text-4xl ${Audrey.className}`}>
                    STRATEGIC <span className={`${BrittanySignature.className} text-[#CE641D]`}>Alliances</span>
                    </h3>
                    <p className={`text-lg font ${montserrat.className} mt-5`}>Bringing Real Estate Excellence to Your Doorstep</p>
                </div>

                <div className="aboutCards grid grid-cols-2 md:grid-cols-4 gap-4">
                {aboutCardData.map((card, idx) => {
                    let spanClass = '';
                    if(idx === 0) spanClass = 'col-span-2';
                    else if (idx === aboutCardData.length -1 ) spanClass = 'col-span-2 md:order-last order-4';
                    else if (idx === aboutCardData.length -3 ) spanClass = 'md:order-4 order-5';
                    else if (idx === aboutCardData.length -2 ) spanClass = 'md:order-5 order-6';
                
                    return (
                        <div key={idx} className={spanClass}>
                            <AboutCard background={card.background} >
                                <h2 className="text-2xl font-extralight cardText rounded-xl">{card.title}</h2>                                
                            </AboutCard>
                        </div>
                    );
                })}
        
                </div>
            </div>            
        </section>

        <section className="w-full my-4 locationsSection">            
            <LocationsSection />
        </section>

        </>
    )
}

export default AboutPage;