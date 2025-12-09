"use client";
import React from "react";
import { Link } from "@/i18n/navigation";
import { SocialMedia } from "@/types/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faTwitter, faInstagram, faSnapchat, faYoutube, faFacebookSquare} from "@fortawesome/free-brands-svg-icons";

const socialMedia: SocialMedia[] = [
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/property_shop_investment/',
        icon: faInstagram,
    },
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/PropertyShopInvestment',
        icon: faFacebookSquare,
    },
    {
        name: 'Snapchat',
        href: 'https://www.snapchat.com/add/property-shop',
        icon: faSnapchat,
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/psinv',
        icon: faTwitter,
    },
    {
        name: 'Youtube',
        href: 'https://www.youtube.com/user/propertyshopabudhabi',
        icon: faYoutube,
    }    
    
];

const LuxuryFooter = () => {
    return (
        <footer className="bg-[#353B58] text-white w-full mb-0">
            {/* Full-width container */}
            <div className="max-w-screen-xl mx-auto px-4 py-10">
                {/* Grid Layout for Footer Sections */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-6 sm:text-[14px] items-baseline">
                    {/* Column 1 - Company Info */}
                    <div className="md:text-left text-center col-span-2">
                        <img src="/logo-psi-white.svg" alt="logo" title="logo" className="md:mx-0 mx-auto"></img>
                        <h3 className="font-bold text-4xl mb-4 mt-5 hidden md:block">Luxury Projects</h3>
                        <h3 className="font-bold text-3xl mb-4 mt-5 block md:hidden">Your Prime Residences</h3>
                        <p className="text-lg mb-3 hidden md:block">
                        Check out all ultra luxury real estate projects in UAE.
                        </p>
                        <p className="text-lg mb-3 md:hidden visible">Find the perfect home for you in our diverse collection of villas and townhouses.</p>
                        <p className="text-lg">                            
                            <u>Contact us</u> for more details and free consultation.
                        </p>
                    </div>
                    <div className="md:col-span-1 hidden md:block">
                        {/* Column 2 - Explore Links */}
                        <div className="w-full md:w-auto">
                            <h4 className="font-bold text-xl sm:text-2xl mb-4">Explorers</h4>
                            <ul className="space-y-2 text-md sm:text-lg">
                                <li><Link title="dubai" href="/projects/dubai/" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Dubai</Link></li>
                                <li><Link title="abu dhabi" href="/" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Abu Dhabi</Link></li>
                                <li><Link title="sharjah" href="/sharjah-city/" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Sharjah</Link></li>
                                <li><Link title="ras al khaimah" href="/rak/" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Ras Al Khaimah</Link></li>
                            </ul>
                        </div>                        
                        <div className="w-px bg-white sm:block md:hidden"></div>
                    </div>
                    {/* Column 4 & 5 - Centered in Mobile */}
                    <div className="md:col-span-1 border-t  border-[#4F577C] py-5">
                        <h4 className="font-bold text-xl md:text-2xl mb-4 md:text-left text-center">Contact Us</h4>
                        <div className="mt-4 space-y-4 sm:text-center text-left">
                            <p className="flex items-center gap-2 justify-center sm:justify-start text-md sm:text-lg">                                
                                <FontAwesomeIcon icon={faPhone} ></FontAwesomeIcon> 600 548 200
                            </p>
                            <p className="flex items-center gap-2 justify-center sm:justify-start text-md sm:text-lg">
                                <FontAwesomeIcon icon={faWhatsapp} ></FontAwesomeIcon> +971 2205 2999
                            </p>
                        </div>
                        <div className="flex space-x-4 mb-3 mt-9 sm:text-[14px] justify-center sm:justify-start">
                            {socialMedia.map((item) => (
                                <Link title={item.name} target="_blank" href={item.href} key={item.name} aria-label={item.name} className="flex items-center justify-center text-sm font-semibold leading-6 text-white hover:bg-indigo-900">
                                    <FontAwesomeIcon icon={item.icon} width={18} />
                                </Link>
                            ))}
                        </div>
                    </div>                    
                </div>
            </div>

            {/* Copyright Section */}
            <div className="text-center text-[11px] sm:text-base py-4 text-[#000] bg-[#FFF7EC] mb-0">
                <p className="mb-2">
                    <Link title="Privacy" href="/privacy" className="ml-1 cursor-pointer hover:underline">Privacy</Link> |
                    <Link title="Terms" href="/terms" className="ml-1 cursor-pointer hover:underline">Terms of Use</Link>
                </p>                
                <p>© 2025 Property Shop Investment LLC. | All Rights Reserved.</p>                
            </div>
        </footer>
    );
};

export default LuxuryFooter