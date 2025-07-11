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

// Configure Poppins font
const poppins = Poppins({
    weight:["400","700"],
    variable: "--font-poppins",
    display: "swap",
    subsets: ["latin"],
});

const thumbnails = [
    '/assets/images/list-property/list-slide-1-1.webp',
    '/assets/images/list-property/list-slide-2.webp',
    '/assets/images/list-property/list-slide-3.webp',
  ];

const navItems = [
        {name:"Home", icon:"/assets/images/list-property/home-icon.svg", href:"#home" },
        {name:"About", href:"#about" },
        {name:"Providers", href:"#providers" },
        {name:"Our Solutions", href:"#our-solutions" },
        {name:"Benefits", href:"#benefits" },
        {name:"FAQs", href:"#faqs" }
  ];
const WhereToListItems = [
    {
        "title":"PSI",
        "image":"/assets/images/list-property/logos/psi-logo.png",
    },
    {
        "title":"Property Finder",
        "image":"/assets/images/list-property/logos/property-finder.png",
    },
    {
        "title":"Dubizzle",
        "image":"/assets/images/list-property/logos/dubizzle.png",
    },
    {
        "title":"Bayut",
        "image":"/assets/images/list-property/logos/bayut-logo.png",
    },
    {
        "title":"Google",
        "image":"/assets/images/list-property/logos/google-logo.png",
    },
    {
        "title":"Meta",
        "image":"/assets/images/list-property/logos/meta-logo.png",
    }
];

const propSliderContent = [
    {
        "title": "Property Exclusively Listing",
        "content": [ 
            "Higher commitment of service" ,
            "Maximum exposure to the right tenant/investor",
            "More quality leads",
            "Guaranteed high-quality offers",
            "Special marketing campaigns to sell or rent your property",
            "Your property will be shown by one dedicated agent",
            "1-year free property management",
        ],
        "image":"/assets/images/list-property/property-slider-img-1.webp",
    },
    {
        "title": "Property Non-Exclusive Listing",
        "content": [ 
            "List your property with numerous real estate agents." ,
            "Marketing your property in the same channels by different real estate agents.",
            "More leads for your property.",
            "Guaranteed high-quality offers",
            "Possibility of your property to be seen by same clients but with different agents.",
            "No obligation to pay commission if you sell/ rent your property with your own efforts.",
        ],
        "image":"/assets/images/list-property/property-slider-img-2-new.webp",
    }
];

const ListYourPropertyPage = () => {
    const[isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const[isLeftHovering, setIsLeftHovered] = useState(false);
    const[isTopHovering, setIsTopHovered] = useState(false);
    const[isBottomHovering, setIsBottomHovered] = useState(false); 
    const[modal, setModal] = useState(false); 
    
    const modalHandler = () => {
        //console.log("clicked = " + modal);
        setModal(true);
    };
    const modalUpdate = (event:any) => {
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

    return(
        <>
            <div className={`relative w-full md:h-[800px] overflow-hidden md:py-0`} id="home">
                {thumbnails.map((img, index) => (
                    <div key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out 
                        ${ sliderImg === img ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{
                        background: `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${img}") center center / cover no-repeat`,
                        zIndex: 0,
                        }} >
                    </div>
                ))}                
                
                <div
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    sliderImg === thumbnails[2] ? 'opacity-100' : 'opacity-0'
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
                        <a href="/">
                            <span className="sr-only">Property Shop Investment</span>
                            <img src="/logo-psi-white.svg" alt="logo" title="logo" width={100}></img>
                        </a>
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
                                    <img src="/PSI-Logo.svg" alt="logo" title="logo" width={100} className=""></img>
                                </a>
                            </div>
                                                                            
                            <ul className="flex flex-col h-full gap-4 py-4 text-md font-semibold text-[#272963] leading-loose mt-5">
                                {navItems.map((item, index) => (
                                    <li key={index}>
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mobMenuFooter border-t border-[#dee2e6] py-5">
                            <h3 className="text-center h3-section text-[#9D9D9D] text-xs leading-normal">© 2024 Property Shop Investment LLC <br/>| All Rights Reserved.</h3>
                        </div>
                    </div>

                    {/* Desktop menu */}
                    <div className="lg:flex hidden max-w-screen-xl mx-auto max-w-full items-center justify-between ">
                        <div>
                            <Link href="/">
                                <span className="sr-only">Property Shop Investment</span>
                                <img src="/PSI-Logo.svg" alt="logo" title="logo" width={100}></img>
                            </Link>
                        </div>

                        {/*menu items */}
                        <div className="flex justify-center gap-10 text-md text-[#272963]">
                            {navItems.map((item,index) => (
                                <Link key={index}
                                 href={item.href} className="">
                                    {item.icon ? 
                                    <img src="/assets/images/list-property/home-icon.svg" alt="home" title="home"></img>
                                    :
                                    item.name
                                    }                                    
                                    
                                </Link>
                            ))}
                            
                        </div>
                        <div className="btnOuter relative bg-[#E35F27] rounded-[8px] h-[48px] w-[201px] font-semibold">
                            <button className="btn btnPrimary btnAnimate text-white flex justify-between py-0 gap-2 items-center h-[48px] w-[201px]"
                            onClick={modalHandler}>
                                <CircleIcon />
                                List Your Property
                            </button>
                            <div className="btnAnimateBorder absolute"></div>
                        </div>
                    </div>
                </nav>
                <div className="relative w-full h-full md:px-auto px-1 md:py-5 pt-[100px] pb-[70px]">
                    <div className="max-w-screen-xl mx-auto md:flex max-w-full text-white h-full px-4">
                        <div className="md:w-2/3 w-full h-full content-center md:text-start text-center">
                            <h1 className="md:text-6xl text-3xl font-bold capitalize leading-normal">We make your property stand out, list with us</h1>
                            <h3 className="md:text-2xl text-lg my-5 md:leading-normal leading-loose">Sell or rent out your property with PSI, #1 real estate agency in the UAE. We manage everything from marketing to bookings</h3> 
                            <div className="flex lg:justify-between justify-center md:w-[400px] sm:gap-auto gap-[10px]">
                                <div className="btnOuter relative bg-[#E35F27] rounded-[8px] mt-5 h-[48px] sm:w-[201px] w-[180px] ">
                                    <button className="btn btnPrimary btnAnimate text-white flex justify-between py-0 gap-2 items-center h-[48px] sm:w-[201px] w-[180px]"
                                    onClick={modalHandler}>
                                        <CircleIcon />
                                        List Your Property
                                    </button>
                                    <div className="banner-btn btnAnimateBorder absolute"></div>
                                </div>    
                                <a className="btn btnSecondary flex text-center items-center justify-center border border-1-[#fff] h-[48px] w-[180px] rounded-[8px] mt-5" 
                                href="https://www.youtube.com/watch?v=fchpHRqT7mg" 
                                target="_blank" 
                                title="video">
                                    <img src="/assets/images/list-property/play.png"></img>
                                    Watch Video
                                </a>
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
                                    alt={`Thumbnail ${index + 1}`}
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
                <div className="max-w-screen-xl mx-auto md:flex px-4 justify-stretch">
                    <div className="md:w-1/2 h-full md:pr-5">
                        <h2 className="md:text-4xl text-3xl max-w-[500px] text-[#272963] font-[500] leading-normal mb-5">Why To List Your Property With US?</h2>
                        <p className="text-[#808080] leading-loose mb-5 ">We try to make the process of listing and renting/selling your property as simple and easy as possible. 
                            With our expert team, you can avoid all the hassles of the traditional property market and get the desired results without any stress.
                        </p> 
                        <ul className="text-[#686A93] font-[500]">
                            <li className="flex gap-6">
                                <img src="https://psinv.net/assets/img/list-your-property/images/check.svg"
                                    alt="" className="w-6 h-6" />
                                Choose an experienced Listing agent.
                            </li>
                            <li className="flex gap-6">
                                <img src="https://psinv.net/assets/img/list-your-property/images/check.svg"
                                    alt="" className="w-6 h-6" />
                                Discuss the right price of your property.
                            </li>
                            <li className="flex gap-6">
                                <img src="https://psinv.net/assets/img/list-your-property/images/check.svg"
                                    alt="" className="w-6 h-6"/>
                                Free professional photos & Videos for your property.
                            </li>
                            <li className="flex gap-6">
                                <img src="https://psinv.net/assets/img/list-your-property/images/check.svg"
                                    alt="" className="w-6 h-6" />
                                Get your property verified in Real Estate portals.
                            </li>
                        </ul> 
                        <div className="btnOuter relative bg-[#E35F27] rounded-[8px] mt-[50px] h-[48px] w-[201px] ms-0 md:flex hidden">
                            <button className="btn btnPrimary btnAnimate text-white flex justify-between py-0 gap-2 items-center h-[48px] w-[201px]"
                            onClick={modalHandler}>
                                <CircleIcon />
                                List Your Property
                            </button>
                            <div className="btnAnimateBorder absolute"></div>
                        </div>    
                    </div>
                    <div className="md:w-1/2 md:pl-5">
                        <div className="flex flex-row h-full items-stretch gap-[15px]">
                            <div className="w-1/2 h-full">
                                <div className="w-full md:h-full h-[335px] relative" style={{ aspectRatio: "3/4" }}
                                onMouseEnter={()=> setIsLeftHovered(true)} onMouseLeave={()=> setIsLeftHovered(false)} >
                                    <img src="/assets/images/list-property/list-about-1-2.webp"
                                        className={`w-full h-full object-cover rounded-[30px] absolute inset-0
                                        transition-opacity duration-500 ease-in-out
                                        ${isLeftHovering ? 'opacity-100' : 'opacity-0'} `}></img>
                                    
                                    <img src="/assets/images/list-property/list-about-1.webp"
                                        className={`w-full h-full object-cover rounded-[30px] transition-opacity duration-500 ease-in-out
                                        ${isLeftHovering ? 'opacity-0' : 'opacity-100'}`}></img>
                                </div>
                            </div>
                            <div className="w-1/2 flex flex-column md:h-full gap-[15px] md:mt-[-50px]">
                                <div className="w-full h-[60%] relative" 
                                onMouseEnter={()=> setIsTopHovered(true)} onMouseLeave={()=> setIsTopHovered(false)} >
                                    <img src="/assets/images/list-property/list-about-2-2.webp" 
                                        className={`w-full h-full object-cover rounded-[30px] 
                                        absolute inset-0 transition-opacity duration-500 ease-in-out
                                        ${isTopHovering ? 'opacity-100' : 'opacity-0'}`}></img>
                                    
                                    <img src="/assets/images/list-property/list-about-2-desk.webp" 
                                        className={`w-full h-full object-cover rounded-[30px] 
                                        absolute inset-0 transition-opacity duration-500 ease-in-out
                                        ${isTopHovering ? 'opacity-0' : 'opacity-100'}`}></img>
                                </div>
                                <div className="w-full h-[40%] relative" 
                                onMouseEnter={()=> setIsBottomHovered(true)} onMouseLeave={()=> setIsBottomHovered(false)}>
                                    <img src="/assets/images/list-property/list-about-3-2.webp" 
                                        className={`w-full h-full object-cover rounded-[30px] 
                                        absolute inset-0 transition-opacity duration-500 ease-in-out
                                        ${isBottomHovering ? 'opacity-100' : 'opacity-0'}`}></img>
                                                                        
                                    <img src="/assets/images/list-property/list-about-3.webp" 
                                        className={`w-full h-full object-cover rounded-[30px] 
                                        absolute inset-0 transition-opacity duration-500 ease-in-out
                                        ${isBottomHovering ? 'opacity-0' : 'opacity-100'}`}></img>
                                </div>
                            </div>
                        </div>
                        <div className="btnOuter relative bg-[#E35F27] rounded-[8px] mt-[50px] h-[48px] w-[201px] ms-0 md:hidden flex justify-self-center">
                            <button className="btn btnPrimary btnAnimate text-white flex justify-between py-0 gap-2 items-center h-[48px] w-[201px]"
                            onClick={modalHandler}>
                                <CircleIcon />
                                List Your Property
                            </button>
                            <div className="btnAnimateBorder absolute"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="spacer h-[100]"></div>

            <div className="w-full why-to-list pt-5">
                <div className="max-w-screen-xl mx-auto md:flex px-4 justify-stretch">
                    <div className="md:w-1/2 h-full md:pr-5 relative">
                        <div className="bg-[#e35f2733] rounded-[10px] w-[90%] h-[70%] absolute left-[-30px] top-[-30px] z-[-1]"></div>
                        <video width="100%" height="400" autoPlay loop muted playsInline className="rounded-[10px] z-99999">
                            <source src="/assets/images/list-property/virtual-tour.mp4" type="video/mp4" />                            
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="md:w-1/2 md:pl-5">
                        <h2 className="text-4xl text-[#272963] font-[500] leading-normal mb-5">Live in tours with 360° virtual view of your property</h2>
                        <p className="text-[#808080] leading-loose mb-5">Experience your home like never before! It is more than ever essential to stand out among the competition, 
                            PSI will provide a 360° tour of your property to be included within other marketing materials. 
                            The most remarkable presentation of a panorama is most definitely the 360° Virtual Tour. The need for Virtual Technology is growing fast. 
                            Almost everyone is now searching the web to see the availability of Virtual tours.
                        </p> 
                        <div className="btnOuter relative bg-[#E35F27] rounded-[8px] mt-[50px] h-[48px] w-[201px] ms-0">
                            <button className="btn btnPrimary btnAnimate text-white flex justify-between py-0 gap-2 items-center h-[48px] w-[201px]"
                            onClick={modalHandler}>
                                <CircleIcon />
                                List Your Property
                            </button>
                            <div className="btnAnimateBorder absolute"></div>
                        </div> 
                    </div>
                </div>
            </div>
            <div className="spacer h-[100]"></div>

            <div className="w-full bg-[#f8f8f8] py-[80px]" id="providers">
                <div className="max-w-screen-xl mx-auto md:flex px-4">
                    <div className="md:w-4/7">
                        <h2 className="text-4xl text-[#272963] font-[500] leading-normal mb-5">Where Will We List Your Property?</h2>
                        <p className="text-[#808080] leading-loose mb-5">Property owners! List your property with us for sale or rent. 
                            Reach our specialized consultants to deliver the best value for your property.
                        </p>
                    </div>
                    <div className="md:w-3/7 justify-items-end content-end mb-5 md:block hidden">
                        <div className="btnOuter relative bg-[#E35F27] rounded-[8px] mt-[50px] h-[48px] w-[201px] ms-0 justify-self-end">
                            <button className="btn btnPrimary btnAnimate text-white flex justify-between py-0 gap-2 items-center h-[48px] w-[201px]"
                            onClick={modalHandler}>
                                <CircleIcon />
                                List Your Property
                            </button>
                            <div className="btnAnimateBorder absolute"></div>
                        </div>
                    </div>                   
                </div>   
                <div className="w-full">
                    <WhereToListPropertySlider slides={WhereToListItems} />
                </div> 
                <div className="md:hidden block justify-self-center">
                    <div className="btnOuter relative bg-[#E35F27] rounded-[8px] mt-[50px] h-[48px] w-[205px] ms-0 justify-self-end">
                        <button className="btn btnPrimary btnAnimate text-white flex justify-between py-0 gap-2 items-center h-[48px] w-[201px]"
                        onClick={modalHandler}>
                            <CircleIcon />
                            List Your Property
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
                style={{backgroundImage:"url('/assets/images/list-property/bg-vector.svg')"}}></div>
                <div className="md:w-2/3 text-center flex-3 flex flex-col justify-center md:p-10 px-4 py-10 gap-8">
                    <h2 className="text-4xl text-[#272963] font-[500] leading-normal">Benefits to list with Us</h2>
                    <span className="w-[171px] h-[5px] self-center " style={{background:"linear-gradient(90deg, #FFFFFF 0%, #E35F27 100%)"}}></span>
                    <p className="text-[#808080] leading-loose mb-5">Properties with We understand how busy you are and that’s 
                        why we do everything in our power to make the process of renting/selling your property hassle free.
                        -In Tours generate 30% more inquiries
                    </p>
                    <div className="grid md:grid-cols-3 md:grid-rows-2 grid-cols-2 grid-rows-3 justify-content-center text-center text-[#808080] gap-x-5 gap-y-10">
                        <div className="iconBox justify-items-center md:px-8 px-2">
                            <img src="/assets/images/list-property/icons/benefits-1.svg" alt="experience" className="mb-4"></img>
                            <p className="md:text-[16px] text-sm">13+ years of Experience in Real Estate</p>
                        </div>
                        <div className="iconBox justify-items-center md:px-8 px-2">
                            <img src="/assets/images/list-property/icons/benefits-2.svg" alt="experience" className="mb-4"></img>
                            <p className="md:text-[16px] text-sm">Covering 50+ Districts in The UAE</p>
                        </div>
                        <div className="iconBox justify-items-center md:px-8 px-2">
                            <img src="/assets/images/list-property/icons/benefits-3.svg" alt="experience" className="mb-4"></img>
                            <p className="md:text-[16px] text-sm">Advanced Real Estate Technology And Process</p>
                        </div>
                        <div className="iconBox justify-items-center md:px-8 px-2">
                            <img src="/assets/images/list-property/icons/benefits-4.svg" alt="experience" className="mb-4"></img>
                            <p className="md:text-[16px] text-sm">Highest Transactions in Abu Dhabi Real Estate Market</p>
                        </div>
                        <div className="iconBox justify-items-center md:px-8 px-2">
                            <img src="/assets/images/list-property/icons/benefits-5.svg" alt="experience" className="mb-4"></img>
                            <p className="md:text-[16px] text-sm">Specialized Team For each Area in Abu Dhabi & Dubai</p>
                        </div>
                        <div className="iconBox justify-items-center md:px-8 px-2">
                            <img src="/assets/images/list-property/icons/benefits-6.svg" alt="experience" className="mb-4"></img>
                            <p className="md:text-[16px] text-sm">1 Year Free Property Management</p>
                        </div>
                    </div>
                </div> 
                <div className="md:block hidden md:w-1/6 bg-contain bg-repeat bg-center flex-1 scale-x-[-1]" 
                style={{backgroundImage:"url('/assets/images/list-property/bg-vector.svg')"}}></div>
            </div>

            <div className="w-full bg-cover bg-no-repeat bg-center formBg relative z-0">
                <div className="w-full h-full md:hidden block absolute inset-0 z-[1] formBg-grad" 
                style={{background:"linear-gradient(0deg, #f7f7f700, #f7f7f700), linear-gradient(0deg, rgba(39, 41, 99, 0.5), rgba(39, 41, 99, 0.5))"}} ></div>
                <div className="max-w-screen-xl md:flex mx-auto px-4 items-center relative z-[10]">
                    <div className="md:w-1/2 md:block hidden gap-4 py-10">
                        <img src="/PSI-Logo.svg" alt="logo" width={104} className="mb-5"></img>
                        <h5 className="text-sm text-[#E35F27] font-semibold mb-3">List Your Property</h5>
                        <h2 className="text-4xl text-[#272963] font-[500] leading-normal mb-3">BE with the Brand you Trust</h2>
                        <p className="text-[#212529]">Trust the brand that delivers quality, reliability, and meets your needs. Stick with the brand you trust.</p>
                    </div> 
                    <div className="md:w-1/2 md:pl-5 md:py-0 py-5" style={{zIndex:"9999"}}>
                        <div className="formBox bg-white rounded-[16px] md:p-5 py-5 px-3 md:my-[-40px]" style={{boxShadow:"0px 4px 40px 0px rgba(0, 0, 0, 0.25)"}}>                            
                            <ListForm />
                        </div>
                    </div>
                </div>
            </div>

            <div className="spacer h-[50]"></div>

            <div className="max-w-screen-xl mx-auto px-4 items-center" id="faqs">
                <h2 className="text-4xl text-[#272963] font-[500] leading-normal mb-3">FAQs</h2>
                <div className="w-full py-10">                   
                    <Accordion />
                </div>                 
            </div>            
            <InquireModal modalState={modal} onModalUpdate={modalUpdate} />
        </>
    )
}

export default ListYourPropertyPage