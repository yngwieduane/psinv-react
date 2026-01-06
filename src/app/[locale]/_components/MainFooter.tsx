"use client";
import React from "react";
// import { DynamicIcon } from 'lucide-react/dynamic';
import { Poppins } from "next/font/google"; import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SocialMedia } from "@/types/navigation";
import { DownloadIcon, PlaneIcon, Send, Facebook, Twitter, Instagram, Linkedin, Youtube, Camera } from "lucide-react";

const socialMedia: SocialMedia[] = [
    {
        name: 'Facebook',
        href: 'https://www.facebook.com/PropertyShopInvestment',
        icon: 'facebook',
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/psinv',
        icon: 'twitter',
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/property_shop_investment/',
        icon: 'instagram',
    },
    {
        name: 'Snapchat',
        href: 'https://www.snapchat.com/add/property-shop',
        icon: 'camera',
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/property-shop-investment-llc',
        icon: 'linkedin',
    },
    {
        name: 'Youtube',
        href: 'https://www.youtube.com/user/propertyshopabudhabi',
        icon: 'youtube',
    }
];

const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});


const MainFooter = () => {
    return (
        <footer className={`${poppins.className} bg-[#111954] text-white w-full mt-12`}>
            {/* Full-width container */}
            <div className="container mx-auto px-6 md:px-10 lg:px-20 py-10">
                {/* Grid Layout for Footer Sections */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 pb-6 sm:text-[14px]">
                    {/* Column 1 - Company Info */}
                    <div className="order-1 md:order-0 md:text-left text-center">
                        <h4 className="font-bold text-base mb-4">Property Shop Investment L.L.C</h4>
                        <p className="text-sm leading-6">
                            Office No. 4410 & 4411 <br />
                            Addax Tower Level 44 <br />
                            Al Reem Island, City of Lights <br />
                            Abu Dhabi, United Arab Emirates
                        </p>
                        <div className="mt-4 space-y-4 sm:text-center text-left">
                            <p className="flex items-center gap-2 justify-center sm:justify-start">
                                <span className="w-6 h-6 flex items-center justify-center border border-white rounded-full">
                                    <Image width={200} height={200} src="/tel-icon.svg" alt="Phone Icon" title="Phone Icon" className="w-[10px]" />
                                </span>
                                <span className="font-semibold">Local Tel: 600 548 200</span>
                            </p>
                            <p className="flex items-center gap-2 justify-center sm:justify-start">
                                <span className="w-6 h-6 flex items-center justify-center border border-white rounded-full">
                                    <Image width={200} height={200} src="/tel-icon.svg" alt="Phone Icon" title="Phone Icon" className="w-[10px]" />
                                </span>
                                <span className="font-semibold">Int'l Tel: +971 2205 2999</span>
                            </p>
                        </div>
                        <div className="flex space-x-4 mb-3 mt-5 sm:text-[14px] justify-center sm:justify-start">
                            {socialMedia.map((item) => {
                                const Icon = {
                                    facebook: Facebook,
                                    twitter: Twitter,
                                    instagram: Instagram,
                                    camera: Camera,
                                    linkedin: Linkedin,
                                    youtube: Youtube,
                                }[item.icon as string] || Facebook;
                                return (
                                    <Link title={item.name} target="_blank" href={item.href} key={item.name} aria-label={item.name} className="flex items-center justify-center text-sm font-semibold leading-6 text-white hover:bg-indigo-900">
                                        <Icon size={20} />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className="sm:col-span-2 flex sm:flex-row md:grid md:grid-cols-2 gap-8 order-first md:order-0">
                        {/* Column 2 - Explore Links */}
                        <div className="w-full md:w-auto">
                            <h4 className="font-bold text-lg sm:text-base mb-4">Explore</h4>
                            <ul className="space-y-2 text-sm sm:text-[14px]">
                                <li><Link title="Buy" href="/units?category=Buy" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Buy</Link></li>
                                <li><Link title="Rent" href="/units?category=Rent" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Rent</Link></li>
                                <li><Link title="Youngster Program" href="/psi-youngsters-program" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Youngster Program</Link></li>
                                <li><Link title="List Your Property" href="/list-your-property" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">List Your Property</Link></li>
                                {/* <li><Link href="/build-your-villa" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Build Your Villa</Link></li>
                                <li><Link href="/articles" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Articles</Link></li> */}
                            </ul>
                        </div>
                        {/* Vertical Divider (Visible only on mobile, hidden on desktop) */}
                        <div className="w-px bg-white sm:block md:hidden"></div>
                        {/* Column 3 - New Projects */}
                        <div className="w-full md:w-auto">
                            <h4 className="font-bold text-lg sm:text-base mb-4">New Projects</h4>
                            <ul className="space-y-2 text-sm sm:text-[14px]">
                                <li><Link title="Mamsha Garden" href="/projects/abu-dhabi/saadiyat-island/cultural-district/mamsha-gardens" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Mamsha Gardens</Link></li>
                                <li><Link title="Rivage" href="/projects/abu-dhabi/al-reem-island/al-reem-island/rivage" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Rivage</Link></li>
                                <li><Link title="W Residences" href="/projects/dubai/the-palm-jumeirah/the-palm-jumeirah/w-residences" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">W Residences</Link></li>
                                <li><Link title="Reem Hills" href="/projects/abu-dhabi/al-reem-island/al-reem-hills/reem-hills" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Reem Hills</Link></li>
                                <li><Link title="More Projects" href="/projects" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 font-bold">More Projects</Link></li>
                            </ul>
                        </div>
                    </div>
                    {/* Column 4 & 5 - Centered in Mobile */}
                    <div className="md:col-span-1 md:order-3">
                        <h4 className="font-bold text-lg mb-4">Important Links</h4>
                        <ul className="space-y-2 text-sm text-left">
                            {/* <li><Link href="/mortgage-calculator" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Mortgage Calculator</Link></li> */}
                            <li><Link title="About Us" href="/about-us" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">About Us</Link></li>
                            <li><Link title="Contact Us" href="/contact-us" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Contact Us</Link></li>
                            <li><Link title="Careers" href="/careers" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Careers</Link></li>
                            {/* <li><Link href="/blog" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Blog</Link></li>
                            <li><Link href="/sitemap" className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100">Sitemap</Link></li> */}
                        </ul>
                    </div>
                    <div className="md:col-span-1 md:order-4">
                        <h4 className="font-bold text-lg mb-4">Subscribe to Our Newsletter</h4>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full p-2 border border-gray-400 rounded-l bg-[#111954] text-white"
                            />
                            <button className="border border-[#ABB0B2] p-2 rounded-r" aria-label="Subscribe to Newsletter">
                                <Send size={16} />
                            </button>
                        </div>
                        {/* Download Buttons */}
                        <div className="mt-4">
                            <a title="Holiday Homes Abu Dhabi Guides" href="/docs/holiday-homes-abu-dhabi.pdf" download="holiday-homes-abu-dhabi.pdf" className="flex justify-between text-xs items-center relative overflow-hidden rounded bg-orange-700 px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer">
                                Holiday Homes Abu Dhabi Guides
                                <DownloadIcon size={16} />
                            </a>
                            <a title="Holiday Homes Dubai Guides" href="/docs/holiday-homes-dubai.pdf" download="holiday-homes-dubai.pdf" className="flex w-ful justify-between mt-5 text-xs items-center relative overflow-hidden rounded bg-orange-700 px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer">
                                Holiday Homes Dubai Guides
                                <DownloadIcon size={16} />
                            </a>
                        </div>

                        <div className="flex w-full gap-2 mt-5 justify-between">
                            <div className="w-1/2">
                                <a title="Appstore" href="https://apps.apple.com/us/app/psi-real-estate/id6736644035" target="_blank"><img src="/assets/images/appstore.svg" alt="App Store" title="App Store" className="w-full" /></a>
                            </div>
                            <div className="w-1/2">
                                <a title="Google Play" href="https://play.google.com/store/apps/details?id=com.psi.psirealestate" target="_blank"><img src="/assets/images/googleplay.svg" alt="Google Play" title="Google Play" className="w-full" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="text-center text-[11px] sm:text-base py-4 bg-white text-[#111954] sm:bg-[#111954] sm:text-white">
                <p>All Rights Reserved. © 2025 Property Shop Investment LLC.</p>
                <p className="mt-1">
                    License No.: CN-1100434 | Brokerage No.: 20240000258226 |
                    <Link title="Privacy" href="/privacy" className="ml-1 cursor-pointer hover:underline">Privacy</Link> |
                    <Link title="Terms" href="/terms" className="ml-1 cursor-pointer hover:underline">Terms of Use</Link>
                </p>
            </div>
        </footer>
    );
};

export default MainFooter;
