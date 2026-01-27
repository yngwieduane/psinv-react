"use client";

import { Audrey, BrittanySignature } from "@/utils/fonts";
import { Montserrat, Poppins } from "next/font/google";
import AboutCounter from "../about-us/_components/AboutCounter";
import { useState } from "react";
import JobList from "./_components/JobList";
import CareerJourney from "./_components/CareerJourney";
import SocialMediaTabs from "../_components/SocialMediaTabs";
import FooterBannerCarousel from "../_components/FooterBannerCarousel";
import { useTranslations } from "next-intl";

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
});

const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
});

const stackedImages = [
    "/images/career/careers-2.jpg",
    "/images/career/careers-1.jpg",
    "/images/career/careers-3.jpg",
];

const hiddenImages = [
    "/images/career/careers-4-2.jpg",
    "/images/career/careers-5.jpg",
    "/images/career/careers-6.jpg",
    "/images/career/careers-7.jpg",
];

export default function CareersPageClient() {
    const t = useTranslations("Careers_Page");
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <section className="w-full">
                {/* Hero Section */}
                <div className="relative h-[60vh] flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: "url('/images/job-single-bg.webp')" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
                    </div>
                    <div className="relative z-10 text-center text-white mt-16 px-4">
                        <h1 className={`text-5xl md:text-7xl font-bold mb-4 tracking-widest ${Audrey.className}`}>
                            {t("heroTitle")}
                        </h1>
                        <p className="text-sm uppercase tracking-widest text-gray-300 font-medium">
                            {t("heroBreadcrumb")}
                        </p>
                    </div>
                </div>

                <div className="h-8 bg-transparent" />
                {/* Careers Section */}
                <div className="container max-w-[1320px] mx-auto px-4 mt-10 md:mt-32">
                    <div className="w-full px-4 relative">
                        <div
                            className="flex flex-col md:flex-row gap-12 group"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {/* Left Text */}
                            <div className="md:w-7/12 md:pr-8 pr-2">
                                <h2 className="text-xl md:text-3xl text-[#2C2D65] uppercase mb-4">
                                    {t("unlockSection.title")}{" "}
                                    <span
                                        className={`${BrittanySignature.className} text-2xl md:text-3xl capitalize  text-orange-600`}
                                    >
                                        {t("unlockSection.highlight")}
                                    </span>
                                </h2>
                                <p
                                    className={`text-base md:text-base text-gray-700 leading-relaxed max-w-sm md:max-w-xl ${poppins.className}`}
                                >
                                    {t("unlockSection.description")}
                                </p>
                            </div>
                            {/* Right Image Stack */}
                            <div className="relative md:w-5/12 h-[330px] flex items-center justify-center hidden md:block">
                                {[...stackedImages].reverse().map((src, i) => (
                                    <div
                                        key={i}
                                        className="absolute rounded-lg border-4 border-white transition-all duration-500 bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url(${src})`,
                                            width: "100%",
                                            height: "330px",
                                            transform: isHovered
                                                ? "translate(0px, 0px)"
                                                : i === 0
                                                    ? "translate(0px, -145px)"
                                                    : i === 1
                                                        ? "translate(-44px, -65px)"
                                                        : "translate(-85px, 15px)",
                                            zIndex: i + 1,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-[267px] mt-10 w-full md:hidden">
                    <div className="absolute top-0 right-0 w-[70%] z-10">
                        <img
                            src="/images/career/careers-3.jpg"
                            alt="Left Image"
                            className="rounded-lg shadow-md w-full object-cover"
                        />
                    </div>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[70%] z-20">
                        <img
                            src="/images/career/careers-1.jpg"
                            alt="Center Image"
                            className="rounded-lg shadow-md w-full object-cover"
                        />
                    </div>
                    <div className="absolute top-20 left-0 w-[70%] z-30">
                        <img
                            src="/images/career/careers-2.jpg"
                            alt="Right Image"
                            className="rounded-lg shadow-md w-full object-cover"
                        />
                    </div>
                </div>
            </section>
            {isHovered && (
                <div className="w-full flex justify-center">
                    <div className="w-full max-w-[1320px] px-4 mt-8 mb-28 z-30">
                        {" "}
                        {/**/}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {hiddenImages.map((src, i) => (
                                <div
                                    key={i}
                                    className="h-[330px] bg-cover bg-center rounded-lg transition-transform duration-300 hover:scale-105"
                                    style={{ backgroundImage: `url(${src})` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* Award Section */}
            <section className="w-full bg-secondary-color py-10 text-gray-500">
                <div
                    className="max-w-(--breakpoint-xl) mx-auto bg-center bg-cover py-10 px-5"
                    style={{
                        backgroundImage: "url('/assets/images/about-us/pattern-1.png')",
                    }}
                >
                    <div className="text-center mt-[50px] mb-[70px]">
                        <h3
                            className={`text-darkblue font-bold text-xl md:text-4xl ${Audrey.className}`}
                        >
                            {t("trustedSection.title")}{" "}
                            <span
                                className={`font-brittany text-orange font-light ${BrittanySignature.className} text-[#CE641D]`}
                            >
                                {t("trustedSection.highlight")}
                            </span>{" "}
                            {t("trustedSection.subtitle")}
                        </h3>
                    </div>
                    <AboutCounter />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center counter1">
                        {/* Counters */}
                        <div className="flex items-center gap-4">
                            <h4
                                className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}
                            >
                                +
                                <span className="data-count" data-count="8">
                                    0
                                </span>
                            </h4>
                            <p
                                className={`md:text-lg text-sm text-[#2C2D65] font-medium ${montserrat.className}`}
                            >
                                {t("counters.billion_population")}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <h4
                                className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}
                            >
                                +
                                <span className="data-count" data-count="18">
                                    0
                                </span>
                            </h4>
                            <p
                                className={`md:text-lg text-sm text-[#2C2D65] font-medium ${montserrat.className}`}
                            >
                                {t("counters.years_expertise")}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <h4
                                className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}
                            >
                                +{" "}
                                <span className="data-count" data-count="52">
                                    0
                                </span>
                            </h4>
                            <p
                                className={`md:text-lg text-sm font-medium text-[#2C2D65] ${montserrat.className}`}
                            >
                                {t("counters.nationalities")}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <h4
                                className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}
                            >
                                <span className="data-count" data-count="1384">
                                    0
                                </span>
                            </h4>
                            <p
                                className={`md:text-lg text-sm text-[#2C2D65] font-medium ${montserrat.className}`}
                            >
                                {t("counters.expert_employees")}
                            </p>
                        </div>
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center mt-10 counter2">
                        <div className="flex items-center gap-4 justify-center">
                            <h4
                                className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}
                            >
                                +
                                <span className="data-count" data-count="17">
                                    0
                                </span>
                            </h4>
                            <p
                                className={`md:text-lg text-sm text-[#2C2D65] font-medium ${montserrat.className}`}
                            >
                                {t("counters.local_global_branches")}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 justify-center">
                            <h4
                                className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}
                            >
                                <span className="data-count" data-count="12">
                                    0
                                </span>
                            </h4>
                            <p
                                className={`md:text-lg text-sm text-[#2C2D65] font-medium ${montserrat.className}`}
                            >
                                {t("counters.number_one_brokerage")}
                            </p>
                        </div>
                    </div>
                    {/* Mobile Counter */}
                    <div className="mt-10 text-center hidden">
                        <h4
                            className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}
                        >
                            <span className="data-count" data-count="10">
                                0
                            </span>
                        </h4>
                        <p
                            className={`md:text-lg text-sm font-medium ${montserrat.className}`}
                        >
                            {t("counters.location_worldwide")}
                        </p>
                    </div>
                </div>
            </section>
            {/* List of Job */}
            <div className="mt-20">
                <JobList />
            </div>
            {/* Career Journey */}
            <section className="container px-4 mt-32">
                <CareerJourney />
            </section>
            {/* Social media */}
            <section className="container max-w-[1320px] mx-auto px-4 mt-10 md:mt-20 mt-0 hidden md:block">
                <SocialMediaTabs />
            </section>
            <section className="container max-w-[1320px] mx-auto px-4 mt-10 md:mt-20 mt-10 hidden md:block">
                <FooterBannerCarousel />
            </section>
        </>
    );
}
