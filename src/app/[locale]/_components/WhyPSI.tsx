"use client";

import { useState } from "react";
import { Poppins, Outfit } from "next/font/google";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const tabs = [
  { label: "Emirati Hub", key: "emirati" },
  { label: "Youngsters Program", key: "youngsters" },
  { label: "Crypto", key: "crypto" },
  { label: "PSI International", key: "international" },
  { label: "Company Profile", key: "company" },
];

const WhyPSI = () => {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <div className={`container mx-auto py-16 px-4 ${outfit.className}`}>
      <div className="container mx-auto px-4 md:px-8">
        {/* Tabs Header */}
        <div className="flex border-b overflow-x-auto mb-0 scrollbar-hide">
          {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-4 font-bold mr-6 whitespace-nowrap text-center cursor-pointer ${
              activeTab === tab.key
                ? "text-primary border-b-2 border-secondary font-bold"
                : "text-gray-500 hover:text-gray-800 font-light"
            }`}
          >
            {tab.label}
          </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "company" && (
          <div className="flex flex-col md:flex-row items-center gap-10 py-10 bg-gray-50">
            {/* Text Section */}
            <div className="flex-1">
               <h2 className={`text-3xl font-serif font-bold text-gray-900 mb-4 ${outfit.className}`}>
               Why PSI ?
              </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Our combination of vision, expertise, specialised teams, enthusiasm and transparency entitles Property Shop Invesment to set the market standard as an influencer of Abu Dhabi’s Real Estate Market.
          </p>
              <Link
                href="/corporate/"
                title="Learn more about PSI"
                className="w-full relative text-md md:text-lg px-3 overflow-hidden rounded bg-orange-700 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer"
              >
               Learn more about PSI
              </Link>
            </div>

            {/* Image Section */}
            <div className="flex-1 rounded-xl p-4 md:p-6"
      style={{
        backgroundImage: "url('/images/bg-cover.webp')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
              <Image
                src="/images/corporate_cover.webp"
                alt="Property Shop Investment"
                title="Property Shop Investment"
                className="w-full rounded-xl"
                width={600}
                height={300}
              />
            </div>
          </div>
        )}

        {activeTab === "emirati" && (
          <div className="flex flex-col md:flex-row items-center gap-10 py-10 md:py-0">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className={`text-3xl font-serif font-bold text-gray-900 mb-4 ${outfit.className}`}>
              PSI Emirati Hub
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Empowering UAE nationals to excel and lead in the real estate sector through 
              <span className="font-bold text-secondary"> PSI Emirati Hub.</span>
            </p>
              <Link
                href="/project/emirati-hub/"
                title="Learn more about PSI Emirati Hub"
                className="w-full relative text-md md:text-lg px-3 overflow-hidden rounded bg-orange-700 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer"
              >
               Learn more about PSI Emirati Hub
              </Link>
          </div>

          {/* Image Section */}
          <div className="flex-1 rounded-xl p-4 md:p-6"
      style={{
        backgroundImage: "url('/images/bg-cover.webp')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
            <Image
              src="/images/national-hub-home.webp"
              alt="Property Shop Investment"
              title="Property Shop Investment"
              className="w-full rounded-xl"
              width={600}
              height={300}
            />
          </div>
        </div>
        )}

        {activeTab === "youngsters" && (
          <div className="flex flex-col md:flex-row items-center gap-10 py-10 md:py-0">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className={`text-3xl font-serif font-bold text-gray-900 mb-4 ${outfit.className}`}>
              PSI Abu Dhabi Youngsters
            </h2>
           <p className="text-gray-600 text-lg mb-8 leading-relaxed">
           Unlock your potential through 
            <span className="font-bold text-secondary"> PSI Abu Dhabi Youngster</span> Program by empowering minds, and shaping futures
          </p>
              <Link
                href="/psi-youngsters-program"
                title="Learn more about PSI Youngsters"
                className="w-full relative text-md md:text-lg px-3 overflow-hidden rounded bg-orange-700 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer"
              >
               Learn more about PSI Youngsters
              </Link>
          </div>

          {/* Image Section */}
          <div className="flex-1 rounded-xl p-4 md:p-6"
      style={{
        backgroundImage: "url('/images/bg-cover.webp')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      >
            <Image
              src="/images/youngster_cover2.webp"
              alt="Property Shop Investment"
              title="Property Shop Investment"
              className="w-full rounded-xl"
              width={600}
              height={300}
            />
          </div>
        </div>
        )}

        {activeTab === "crypto" && (
          <div className="flex flex-col md:flex-row items-center gap-10 py-10 md:py-0">
          {/* Text Section */}
          <div className="flex-1">
             <h2 className={`text-3xl font-serif font-bold text-gray-900 mb-4 ${outfit.className}`}>
              Buy property with Crypto
            </h2>
           <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            With connections, network, knowledge and country guides, we build and design investment journeys based on
          </p>
           <p className={`text-[18px] font-semibold sm:text-[24px] leading-[1.77] mb-4 text-[#E46027] font-normal tracking-[-0.5px] uppercase ${poppins.className}`}>
            your needs, values, lifestyle and your goals.


          </p>
              <Link
                href="/crypto"
                title="Learn more about Crypto"
                className="w-full relative text-md md:text-lg px-3 overflow-hidden rounded bg-orange-700 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer"
              >
               Learn more about Crypto
              </Link>
          </div>

          {/* Image Section */}
          <div className="flex-1 rounded-xl p-4 md:p-6"
      style={{
        backgroundImage: "url('/images/bg-cover.webp')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
            <Image
              src="/images/crypto_cover-new.webp"
              alt="Property Shop Investment"
              title="Property Shop Investment"
              className="w-full rounded-xl"
              width={600}
              height={300}
            />
          </div>
        </div>
        )}

        {activeTab === "international" && (
          <div className="flex flex-col md:flex-row items-center gap-10 py-10 md:py-0">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className={`text-3xl font-serif font-bold text-gray-900 mb-4 ${outfit.className}`}>
              PSI International
            </h2>
             <p className="text-gray-600 text-lg mb-8 leading-relaxed">
           50 years young, the UAE offers the best climate for wealth management, relocation and investments portfolios.
          </p>
              <Link
                href="/international/"
                title="Learn more about PSI International"
                className="w-full relative text-md md:text-lg px-3 overflow-hidden rounded bg-orange-700  py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer"
              >
               Learn more about PSI International
              </Link>
          </div>

          {/* Image Section */}
          <div className="flex-1 rounded-xl p-4 md:p-6"
      style={{
        backgroundImage: "url('/images/bg-cover.webp')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
            <Image
              src="/images/international_cover.webp"
              alt="Property Shop Investment"
              title="Property Shop Investment"
              className="w-full rounded-xl"
              width={600}
              height={300}
            />
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default WhyPSI;
