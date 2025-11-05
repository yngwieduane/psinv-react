"use client";

import { useState } from "react";
import { Poppins } from "next/font/google";
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
    <section className="bg-white py-16 px-4">
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
      : "text-[#6c757d] hover:text-[#111954]"
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
              <a
                href="#"
                className="inline-block  bg-orange-700  text-white px-6 py-3 rounded-md font-medium hover:bg-[#d94f1f] transition"
              >
               Learn more  about PSI
              </a>
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
              <img
                src="/images/corporate_cover.webp"
                alt="Property Shop Investment"
                className="w-full rounded-xl"
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
        <a
  href="#"
  className="inline-block text-[20px] bg-[#E46027] text-white px-[20px] py-[8px] rounded-[8px] font-medium hover:bg-[#d94f1f] transition"
>
  Learn more about PSI
</a>
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
            <img
              src="/images/national-hub-home.webp"
              alt="Property Shop Investment"
              className="w-full rounded-xl"
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
            <a
              href="#"
               className="inline-block text-[20px] bg-[#E46027] text-white px-[20px] py-[8px] rounded-[8px] font-medium hover:bg-[#d94f1f] transition"
            >
              Learn more
            </a>
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
            <img
              src="/images/youngster_cover2.webp"
              alt="Property Shop Investment"
              className="w-full rounded-xl"
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
            <a
              href="#"
              className="inline-block  bg-orange-700  text-white px-6 py-3 rounded-md font-medium hover:bg-[#d94f1f] transition"
            >
              Learn more about PSI
            </a>
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
            <img
              src="/images/crypto_cover-new.webp"
              alt="Property Shop Investment"
              className="w-full rounded-xl"
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
            <a
              href="#"
              className="inline-block  bg-orange-700  text-white px-6 py-3 rounded-md font-medium hover:bg-[#d94f1f] transition"
            >
             Learn more about PSI International
            </a>
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
            <img
              src="/images/international_cover.webp"
              alt="Property Shop Investment"
              className="w-full rounded-xl"
            />
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default WhyPSI;
