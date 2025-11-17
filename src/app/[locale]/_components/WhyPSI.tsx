"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
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
    <div className="bg-white py-16 px-4">
      <div className="max-w-[1320px] mx-auto">

        {/* Tabs Header */}
        <div className="flex border-b border-gray-200 overflow-x-auto mb-0 scrollbar-hide">
          {tabs.map((tab) => (
<button
  key={tab.key}
  onClick={() => setActiveTab(tab.key)}
  className={`text-[20px] font-light w-max text-center px-4 py-2 transition-all duration-200 cursor-pointer ${
    activeTab === tab.key
      ? "text-[#033f80] border-b-2 border-[#ea5b27] font-semibold opacity-100"
      : "relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
  }`}
>
  {tab.label}
</button>

          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "company" && (
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Text Section */}
            <div className="flex-1">
               <h2 className={`text-[22px] sm:text-[36px] text-[#333] font-bold ${poppins.className}`}>
               Why PSI ?
              </h2>
 <p className={`text-[18px] sm:text-[24px] leading-[1.77] mb-4 text-[#333] font-normal tracking-[-0.5px] ${poppins.className}`}>
            Our combination of vision, expertise, specialised teams, enthusiasm and transparency entitles Property Shop Invesment to set the market standard as an influencer of Abu Dhabi’s Real Estate Market.
          </p>
              <Link
                href="#"
                title="Learn more about PSI"
                className="w-full relative text-xl overflow-hidden rounded bg-orange-600 px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer"
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
          <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className={`text-[22px] sm:text-[36px] text-[#333] font-bold ${poppins.className}`}>
              PSI Emirati Hub
            </h2>
            <p className={`text-[18px] sm:text-[24px] leading-[1.77] mb-4 text-[#333] font-normal tracking-[-0.5px] ${poppins.className}`}>
              Empowering UAE nationals to excel and lead in the real estate sector through 
              <span className="text-[#E46027] font-semibold"> PSI Emirati Hub.</span>
            </p>
              <Link
                href="#"
                title="Learn more about PSI Emirati Hub"
                className="w-full relative text-xl overflow-hidden rounded bg-orange-600 px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer"
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
          <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className={`text-[22px] sm:text-[36px] text-[#333] font-bold ${poppins.className}`}>
              PSI Abu Dhabi Youngsters
            </h2>
           <p className={`text-[18px] sm:text-[24px] leading-[1.77] mb-4 text-[#333] font-normal tracking-[-0.5px] ${poppins.className}`}>
           Unlock your potential through 
            <span className="text-[#E46027] font-semibold"> PSI Abu Dhabi Youngster</span> Program by empowering minds, and shaping futures
          </p>
              <Link
                href="#"
                title="Learn more about PSI Youngsters"
                className="w-full relative text-xl overflow-hidden rounded bg-orange-600 px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer"
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
          <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Section */}
          <div className="flex-1">
             <h2 className={`text-[22px] sm:text-[36px] text-[#333] font-bold ${poppins.className}`}>
              Buy property with Crypto
            </h2>
           <p className={`text-[18px] sm:text-[24px] leading-[1.77] mb-4 text-[#333] font-normal tracking-[-0.5px] ${poppins.className}`}>
            With connections, network, knowledge and country guides, we build and design investment journeys based on
          </p>
           <p className={`text-[18px] font-semibold sm:text-[24px] leading-[1.77] mb-4 text-[#E46027] font-normal tracking-[-0.5px] uppercase ${poppins.className}`}>
            your needs, values, lifestyle and your goals.


          </p>
              <Link
                href="#"
                title="Learn more about Crypto"
                className="w-full relative text-xl overflow-hidden rounded bg-orange-600 px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer"
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
          <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Section */}
          <div className="flex-1">
            <h2 className={`text-[22px] sm:text-[36px] text-[#333] font-bold ${poppins.className}`}>
              PSI International
            </h2>
             <p className={`text-[18px] sm:text-[24px] leading-[1.77] mb-4 text-[#333] font-normal tracking-[-0.5px] ${poppins.className}`}>
           50 years young, the UAE offers the best climate for wealth management, relocation and investments portfolios.
          </p>
              <Link
                href="#"
                title="Learn more about PSI International"
                className="w-full relative text-xl overflow-hidden rounded bg-orange-600 px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer"
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
