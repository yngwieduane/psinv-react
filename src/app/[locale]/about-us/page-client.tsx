"use client";

import { Audrey, BrittanySignature } from "@/utils/fonts";
import { Great_Vibes, Inter, Montserrat, Open_Sans, Outfit } from "next/font/google";
import AboutCounter from "./_components/AboutCounter";
import AwardSlider from "./_components/AboutAwardsSlider";
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
import YoutubeVideoAbout from "./_components/YoutubeVideoAbout";


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

const testimonialData = [
    {
        name: "Said Abu Laila",
        designation: "Chairman",
        text: "Since 2007, Property Shop Investment (PSI) has led the transformation of UAE's real estate. Moving into 2024, our goal is global recognition, driving innovation and exceeding investor expectations. We're committed to redefining real estate globally, aligning with our vision to lead and inspire across markets",
        image: '/assets/images/about-us/ceo-said-photo.png',
    },
    {
        name: "Firas Abu Laila",
        designation: "Chief Executive Officer",
        text: "“ PSI aligns with Abu Dhabi's growth and diversification goals, aiming to bolster its position as a top investment destination. Our global ambitions complement Abu Dhabi's vision, promising to surpass investor expectations and contribute to its economic prosperity”.",
        image: '/assets/images/about-us/ceo-mr-firas.jpg',
    },
    {
        name: "Amer Saadeh",
        designation: "Chief Executive Officer",
        text: "“PSI aims to mirror Dubai's innovative spirit in real estate, contributing to its vision by attracting global investments and fostering economic growth. We're set to elevate Dubai's real estate market, enhancing investor confidence and setting new industry standards”.",
        image: '/assets/images/about-us/ceo-mr-amer.jpg',
    },
]

const aboutCardData = [
    { title: "United Arab Emirates", image: "/assets/images/about-us/uae-image.jpg" },
    { title: "India", image: "/assets/images/about-us/india-image.jpg" },
    { title: "USA", image: "/assets/images/about-us/usa-image.jpg" },
    { title: "Poland", image: "/assets/images/about-us/poland-image.jpg" },
    { title: "Romania", image: "/assets/images/about-us/romania-image.jpg" },
    { title: "United Kingdom", image: "/assets/images/about-us/uk-image.jpg" },
];

const coreValues = [
    { title: "WE GATHER", icon: "/assets/images/about-us/1.png", description: "Not only a slogan. We gather embodies everything we stand for in our culture, business philosophy and operations." },
    { title: "NOVELTY", icon: "/assets/images/about-us/2.png", description: "Devoted to originality in our services, efforts." },
    { title: "ACCOUNTABILITY", icon: "/assets/images/about-us/3.png", description: "Ensuring fairness, integrity, honesty, transparency, effectiveness and commitment to responsibility." },
];

const AboutPageClient = () => {
    return (
        <>
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("/assets/images/about-us/psi-office.webp")' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
                </div>
                <div className="relative z-10 text-center text-white mt-16 px-4">
                    <h1 className={`text-5xl md:text-7xl font-bold mb-4 tracking-widest ${outfit.className}`}>ABOUT US</h1>
                    <p className="text-sm uppercase tracking-widest text-gray-300 font-medium">Home &gt; About Us</p>
                </div>
            </div>
            {/* Intro Text */}
            <section className="py-24 container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                    <div className="md:col-span-4 relative">
                        <h4 className={`text-5xl mb-2 absolute -top-8 -left-2 z-10 transform -rotate-6 font-great-vibes text-gray-800 ${greatVibes.className}`}>About</h4>
                        <h2 className={`text-4xl md:text-5xl font-serif font-bold text-primary uppercase leading-none pt-4 relative z-0 ${outfit.className}`}>
                            PROPERTY SHOP<br />INVESTMENT
                        </h2>
                        {/* <div className="w-20 h-1 bg-secondary mt-6"></div> */}
                    </div>
                    <div className={`md:col-span-8 text-gray-600 font-thin text-base leading-relaxed space-y-6 text-justify ${opensans.className}`}>
                        <p className="font-light">
                            Established in 2007 <strong className="font-bold">Property Shop Investment (PSI)</strong> has evolved into a preeminent force within the real estate sector, demonstrating a robust track record both within the UAE and across international markets. Headquartered in Abu Dhabi, and consistently recognized as the UAE’s leading brokerage firm, PSI’s sustained growth is underpinned by a commitment to innovation, superior performance, and an unwavering dedication to its clientele.
                        </p>
                        <p className="font-light">
                            Currently, PSI comprises a diverse team of over 1,500 professionals representing more than 50 nationalities, operating through 17 branches globally. This extensive expertise and international reach facilitate the provision of a fully integrated real estate ecosystem.
                        </p>
                        <p className="font-light">
                            Our capabilities span residential and commercial investments, off-plan and resale transactions, comprehensive asset management, sophisticated mortgage solutions, and pioneering AI-powered property technologies. Guided by a clear strategic vision and decisive leadership, PSI is actively pursuing expansion to deliver a unified, world-class real estate experience for institutional investors, developers, and global enterprises.
                        </p>
                    </div>
                </div>
            </section>

            {/* Office Images Strip */}
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
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        <div className={`${opensans.className} lg:w-5/12`}>
                            <h2 className={`text-5xl font-serif font-bold text-primary mb-8 ${outfit.className}`}>Our Core Values</h2>
                            <p className="text-gray-600 text-base leading-relaxed mb-6 font-light">
                                Our strong reputation in the industry is founded on our continuous commitment to quality and excellence in all the services we provide. With a blend of vision, expertise, specialized teams, enthusiasm, and transparency, Property Shop Investment has established itself as a leading influencer in Abu Dhabi's real estate market.
                            </p>
                            <p className="text-gray-600 text-base leading-relaxed font-light">
                                As an award-winning, full-service brokerage, Property Shop Investment is recognized for consistently exceeding expectations. We strive for the highest performance and have proudly held the title of 'Number One Real Estate Broker in Abu Dhabi' for ten consecutive years. Our focus on delivering straightforward and dependable services to both corporate and private clients guarantee complete customer satisfaction.
                            </p>
                            <p className="text-gray-600 text-base leading-relaxed font-light">
                                All our services are customized to meet individual client needs, and our dedication transforms promises into reality.
                            </p>

                        </div>

                        <div className="lg:w-7/12 space-y-6">
                            {coreValues.map((val, idx) => (
                                <div key={idx} className="flex gap-8 items-center bg-white p-8 rounded-lg shadow-sm border-l-4 border-primary hover:border-secondary transition-colors duration-300 group">
                                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-bold text-2xl flex-shrink-0 font-serif group-hover:bg-secondary group-hover:text-[#000] transition-colors duration-300 shadow-lg">
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

            <section className="container mx-auto px-4 md:px-8 my-24">
                <div className="mx-auto max-w-(--breakpoint-xl) bg-cover bg-center sm:h-[500px] h-[200px] rounded-3xl" style={{ backgroundImage: "url('/assets/images/about-us/awards-img.jpg')" }}>
                </div>
            </section>

            <section className={`w-full text-white text-center ${montserrat.className}`} style={{ backgroundImage: "url('/assets/images/about-us/our-services.jpg')" }} >
                <div className="w-full py-[60px]" style={{ backgroundColor: "rgba(44, 45, 101,.9)" }}>
                    <div className="max-w-[1320] mx-auto flex flex-col items-center px-4">
                        <h2 className={`${outfit.className} text-5xl tracking-widest mb-[40px]`}>OUR SERVICES</h2>
                        <p className={`${outfit.className} text-xl`}>Our reputation rests on excellence, transparency, and visionary leadership. Property Shop Investment sets industry benchmarks as Abu Dhabi&apos;s real estate influencer.</p>
                        <a target="_blank" href="/assets/documents/PSI-company-profile-2025.pdf" className="mb-5 bg-transparent hover:bg-white text-white hover:text-black rounded-xl border border-white p-[15px] flex text-center"><PrinterIcon width={30} style={{ marginRight: '7px' }} /> Download Company Profile</a>
                    </div>
                    <div className={`${outfit.className} mx-auto max-w-[1320] flex gap-[25] mt-5 px-4`}>
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
                <div className="max-w-(--breakpoint-xl) mx-auto bg-center bg-cover py-10 px-5" style={{ backgroundImage: "url('/assets/images/about-us/pattern-1.png')", }}>
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

            <div className="w-full py-10 text-gray-500 text-center" id="awards">
                <div className="container mx-auto px-4 md:px-8">
                    <h3 className="text-3xl text-gray-900 mb-4">
                        AWARDS-DRIVEN Excellence
                    </h3>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-12">We reaffirm our commitment to redefining real estate standards. Our dedication to innovation and unwavering client focus has earned us recognition in the industry. Explore our journey of accolades that inspire us to reach new pinnacles of success.</p>
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
                            DISCOVER PSI
                        </h3>
                        <p className={`text-gray-500 mb-12 font-light tracking-wide`}>Unveiling Our Vision, Innovations, and Commitment to Your Dream Home</p>
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
                            PARTNERS
                        </h3>
                        <p className="text-gray-500 mb-12 font-light tracking-wide">Meet the Visionaries Behind Your Dreams: Our Real Estate Developers.</p>
                    </div>
                    <PartnerSlider slides={partners} />
                </div>
            </section>

            <section className="w-full py-24 bg-white">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="text-center mb-[70] ">
                        <h3 className={`font-bold text-primary mb-3 text-3xl md:text-4xl ${outfit.className}`}>
                            STRATEGIC <span className={`${greatVibes.className} font-normal text-5xl md:text-6xl px-2`}>Alliances</span>
                        </h3>
                        <p className="text-gray-500 text-sm mt-2 tracking-wide">Bringing Real Estate Excellence to Your Doorstep</p>
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

            <section className="w-full my-4 locationsSection">
                <LocationsSection />
            </section>

        </>
    )
}

export default AboutPageClient