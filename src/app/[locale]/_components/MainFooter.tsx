"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane, faDownload } from "@fortawesome/free-solid-svg-icons";
import { Poppins } from "next/font/google";import Image from "next/image";
import { Link } from "@/i18n/navigation";
;

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
          <div className="order-1 md:order-none md:text-left text-center">
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
                  <Image width={200} height={200} src="/tel-icon.svg" alt="Phone Icon" className="w-[10px]" />
                </span>
                <span className="font-semibold">Local Tel: 600 548 200</span>
              </p>

              <p className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="w-6 h-6 flex items-center justify-center border border-white rounded-full">
                  <Image width={200} height={200} src="/tel-icon.svg" alt="Phone Icon" className="w-[10px]" />
                </span>
                <span className="font-semibold">Int'l Tel: +971 2205 2999</span>
              </p>
            </div>
            <div className="flex space-x-4 mb-3 mt-5 sm:text-[14px] justify-center sm:justify-start">
              <Link target="_blank" href="https://www.instagram.com" className="text-white hover:text-gray-400"><FontAwesomeIcon icon={faInstagram} size="lg" /></Link>
              <Link target="_blank" href="https://www.facebook.com" className="text-white hover:text-gray-400"><FontAwesomeIcon icon={faFacebook} size="lg" /></Link>
              <Link target="_blank" href="https://twitter.com" className="text-white hover:text-gray-400"><FontAwesomeIcon icon={faTwitter} size="lg" /></Link>
              <Link target="_blank" href="https://www.linkedin.com" className="text-white hover:text-gray-400"><FontAwesomeIcon icon={faLinkedin} size="lg" /></Link>
              <Link target="_blank" href="https://www.youtube.com" className="text-white hover:text-gray-400"><FontAwesomeIcon icon={faYoutube} size="lg" /></Link>
              <Link target="_blank" href="https://www.tiktok.com" className="text-white hover:text-gray-400"><FontAwesomeIcon icon={faTiktok} size="lg" /></Link>
            </div>
          </div>

          <div className="sm:col-span-2 flex sm:flex-row md:grid md:grid-cols-2 gap-8 order-first md:order-none">
  {/* Column 2 - Explore Links */}
  <div className="w-full md:w-auto">
    <h4 className="font-bold text-lg sm:text-base mb-4">Explore</h4>
    <ul className="space-y-2 text-sm sm:text-[14px]">
      <li><Link href="/buy" className="cursor-pointer no-underline hover:no-underline">Buy</Link></li>
      <li><Link href="/rent" className="cursor-pointer no-underline hover:no-underline">Rent</Link></li>
      {/* <li><Link href="/youngster-program" className="cursor-pointer no-underline hover:no-underline">Youngster Program</Link></li>
      <li><Link href="/list-your-property" className="cursor-pointer no-underline hover:no-underline">List Your Property</Link></li>
      <li><Link href="/build-your-villa" className="cursor-pointer no-underline hover:no-underline">Build Your Villa</Link></li>
      <li><Link href="/articles" className="cursor-pointer no-underline hover:no-underline">Articles</Link></li> */}
    </ul>
  </div>

  {/* Vertical Divider (Visible only on mobile, hidden on desktop) */}
  <div className="w-[1px] bg-white sm:block md:hidden"></div>

  {/* Column 3 - New Projects */}
  <div className="w-full md:w-auto">
    <h4 className="font-bold text-lg sm:text-base mb-4">New Projects</h4>
    <ul className="space-y-2 text-sm sm:text-[14px]">
      <li><Link href="/projects/abu-dhabi/saadiyat-island/cultural-district/mamsha-gardens" className="cursor-pointer no-underline hover:no-underline">Mamsha Gardens</Link></li>
      <li><Link href="/projects/abu-dhabi/al-reem-island/al-reem-island/rivage" className="cursor-pointer no-underline hover:no-underline">Rivage</Link></li>
      <li><Link href="/projects/dubai/the-palm-jumeirah/the-palm-jumeirah/w-residences" className="cursor-pointer no-underline hover:no-underline">W Residences</Link></li>
      <li><Link href="/projects/abu-dhabi/al-reem-island/al-reem-hills/reem-hills" className="cursor-pointer no-underline hover:no-underline">Reem Hills</Link></li>
      <li><Link href="/projects" className="cursor-pointer no-underline hover:no-underline font-bold">More</Link></li>
    </ul>
  </div>
</div>



          {/* Column 4 & 5 - Centered in Mobile */}
          <div className="md:col-span-1 md:order-3">
    <h4 className="font-bold text-lg mb-4">Important Links</h4>
    <ul className="space-y-2 text-sm text-left">
      {/* <li><Link href="/mortgage-calculator" className="cursor-pointer no-underline hover:no-underline">Mortgage Calculator</Link></li> */}
      <li><Link href="/about-us" className="cursor-pointer no-underline hover:no-underline">About Us</Link></li>
      <li><Link href="/contact-us" className="cursor-pointer no-underline hover:no-underline">Contact Us</Link></li>
      <li><Link href="/careers" className="cursor-pointer no-underline hover:no-underline">Careers</Link></li>
      {/* <li><Link href="/blog" className="cursor-pointer no-underline hover:no-underline">Blog</Link></li>
      <li><Link href="/sitemap" className="cursor-pointer no-underline hover:no-underline">Sitemap</Link></li> */}
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
      <button className="border border-[#ABB0B2] p-2 rounded-r">
        <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
      </button>
    </div>
    {/* Download Buttons */}
    <div className="mt-4">
      <a href="/docs/holiday-homes-abu-dhabi.pdf" download="holiday-homes-abu-dhabi.pdf"
         className="flex bg-[#E46027] text-white py-4 px-4 items-center justify-between mt-2 text-xs rounded-lg">
        Holiday Homes Abu Dhabi Guides
        <FontAwesomeIcon icon={faDownload} />
      </a>
      <a href="/docs/holiday-homes-dubai.pdf" download="holiday-homes-dubai.pdf"
         className="flex bg-[#E46027] text-white py-4 px-4 items-center justify-between mt-5 text-xs rounded-lg">
        Holiday Homes Dubai Guides
        <FontAwesomeIcon icon={faDownload} />
      </a>
    </div>

    <div className="flex w-full gap-2 mt-5 justify-between">              
      <div className="w-1/2">
        <a href="https://apps.apple.com/us/app/psi-real-estate/id6736644035" target="_blank"><img src="/assets/images/appstore.svg" alt="App Store" title="App Store" className="w-full" /></a>
      </div>
      <div className="w-1/2">
        <a href="https://play.google.com/store/apps/details?id=com.psi.psirealestate" target="_blank"><img src="/assets/images/googleplay.svg" alt="Google Play" title="Google Play" className="w-full" /></a>
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
    <Link href="/privacy" className="ml-1 cursor-pointer hover:underline">Privacy</Link> |
    <Link href="/terms" className="ml-1 cursor-pointer hover:underline">Terms of Use</Link>
  </p>
</div>
    </footer>
  );
};

export default MainFooter;
