"use client";

import { useState } from "react";
import { Poppins, Outfit } from "next/font/google";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const WhyPSI = () => {
  const locale = useLocale();
  const isRtl = locale.toLowerCase().startsWith("ar");
  const t = useTranslations("Why_PSI");

  const tabs = [
    { label: t("emirati_title"), key: "emirati" },
    { label: t("youngster_title"), key: "youngsters" },
    { label: t("crypto_title"), key: "crypto" },
    { label: t("international_title"), key: "international" },
    { label: t("company_title"), key: "company" },
  ];
    
  const [activeTab, setActiveTab] = useState("company");

  return (
    <div className={`container mx-auto py-16 px-4 ${outfit.className}`} dir={isRtl ? "rtl" : "ltr"}>
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
               {t("why_psi.title")}
              </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {t("why_psi.desc")}
          </p>
              <Link
                href="/corporate/"
                title="Learn more about PSI"
                className="w-full relative text-md md:text-lg px-3 overflow-hidden rounded bg-orange-700 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer"
              >
               {t("why_psi.btn")}
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
              {t("emirati_hub.title")}
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {t("emirati_hub.desc.part1")}
              <span className="font-bold text-secondary"> {t("emirati_hub.desc.part2")}</span>
            </p>
              <Link
                href="/project/emirati-hub/"
                title="Learn more about PSI Emirati Hub"
                className="w-full relative text-md md:text-lg px-3 overflow-hidden rounded bg-orange-700 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer"
              >
               {t("emirati_hub.btn")}
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
              {t("youngster_program.title")}
            </h2>
           <p className="text-gray-600 text-lg mb-8 leading-relaxed">
           {t("youngster_program.desc.part1")}
            <span className="font-bold text-secondary"> {t("youngster_program.desc.part2")}</span> {t("youngster_program.desc.part3")}
          </p>
              <Link
                href="/psi-youngsters-program"
                title="Learn more about PSI Youngsters"
                className="w-full relative text-md md:text-lg px-3 overflow-hidden rounded bg-orange-700 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer"
              >
               {t("youngster_program.btn")}
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
              {t("crypto.title")}
            </h2>
           <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {t("crypto.desc.part1")}
          </p>
           <p className={`text-[18px] font-semibold sm:text-[24px] leading-[1.77] mb-4 text-[#E46027] font-normal tracking-[-0.5px] uppercase ${poppins.className}`}>
            {t("crypto.desc.part2")}
          </p>
              <Link
                href="/crypto"
                title="Learn more about Crypto"
                className="w-full relative text-md md:text-lg px-3 overflow-hidden rounded bg-orange-700 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer"
              >
               {t("crypto.btn")}
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
              {t("international.title")}
            </h2>
             <p className="text-gray-600 text-lg mb-8 leading-relaxed">
           {t("international.desc")}
          </p>
              <Link
                href="/international/"
                title="Learn more about PSI International"
                className="w-full relative text-md md:text-lg px-3 overflow-hidden rounded bg-orange-700  py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer"
              >
               {t("international.btn")}
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
