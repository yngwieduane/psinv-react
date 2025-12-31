"use client";

import { useTranslations, useLocale } from "next-intl";
import { Montserrat, Outfit } from "next/font/google";
import { useEffect, useState } from "react";
import { Facebook, Linkedin, Menu, X } from "lucide-react";
import AwardSlider from "../../about-us/_components/AboutAwardsSlider";
import EmiratiHubForm from "./_components/EmiratiHubForm";
import FAQItem from "./_components/FaqItem";
import { FaFacebook, FaLinkedin, FaInstagram, FaYoutube, FaSnapchat, FaVk } from "react-icons/fa";

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
});

const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
});

const banners = [
    "/assets/images/emirati-hub/header-2-national.webp",
    "/assets/images/emirati-hub/national-hub.webp"
];

export default function PageClient() {
    const t = useTranslations("EmiratiHub");
    const locale = useLocale();
    const isRTL = locale.toLowerCase().startsWith("ar");

    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const totalBanners = banners.length;
        const timer = setTimeout(() => {
            if (currentBannerIndex == totalBanners - 1) {
                setCurrentBannerIndex(0);
            }
            else {
                setCurrentBannerIndex(currentBannerIndex + 1);
            }
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentBannerIndex, banners.length]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={`w-full overflow-hidden ${montserrat.className}`} dir={isRTL ? "rtl" : "ltr"}>
            {/* Custom Top Bar */}
            <div className="sticky top-0 z-50 bg-white shadow-sm py-4">
                <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <div className="h-12 w-auto">
                        <img src="/assets/images/emirati-hub/emirati-hub-logo.webp" alt="PSI Emirati Hub" className="h-full object-contain" />
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-[#CE641D] font-medium transition-colors">{t('Hero.nav_about')}</button>
                        <button onClick={() => scrollToSection('awards')} className="text-gray-700 hover:text-[#CE641D] font-medium transition-colors">{t('Hero.nav_awards')}</button>
                        <button onClick={() => scrollToSection('faqs')} className="text-gray-700 hover:text-[#CE641D] font-medium transition-colors">{t('Hero.nav_faqs')}</button>
                    </nav>

                    {/* CTA & Language */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button onClick={() => scrollToSection('form')} className="bg-[#CE641D] hover:bg-[#b05518] text-white font-medium py-2 px-6 rounded transition duration-300">
                            {t('Hero.cta')}
                        </button>
                        {isRTL && (
                            <a href="/en/project/emirati-hub" className="flex items-center space-x-1 text-gray-700 font-medium">
                                <img src="/assets/images/emirati-hub/uk-flag.svg" alt="uk-flag" title="uk-flag" />
                                <span>EN</span>
                            </a>
                        )}
                        {!isRTL && (
                            <a href="/ar/project/emirati-hub" className="flex items-center space-x-1 text-gray-700 font-medium">
                                <img src="/assets/images/emirati-hub/uae-flag.svg" alt="uae-flag" title="uae-flag" />
                                <span>AR</span>
                            </a>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button className="md:hidden text-[#CE641D]" onClick={() => setIsMobileMenuOpen(true)}>
                        <Menu className="w-8 h-8" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center p-4">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20 bg-repeat z-[-1]" style={{ backgroundImage: "url('/assets/images/list-property/bg-vector.svg')" }}></div>

                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute top-6 right-6 text-[#CE641D] p-2"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Logo container with white background to make it pop if pattern is busy? No, just logo on pattern */}
                    <div className="block w-64 mt-30 bg-white p-4 rounded-lg">
                        <img src="/assets/images/emirati-hub/emirati-hub-logo.webp" alt="PSI Emirati Hub" className="w-full h-auto" />
                    </div>

                    <nav className="flex flex-col items-center space-y-8 w-full">
                        <button onClick={() => { scrollToSection('about'); setIsMobileMenuOpen(false); }} className="text-[#CE641D] text-xl font-medium w-full text-center py-2 border-b border-gray-100">{t('Hero.nav_about')}</button>
                        <button onClick={() => { scrollToSection('awards'); setIsMobileMenuOpen(false); }} className="text-[#CE641D] text-xl font-medium w-full text-center py-2 border-b border-gray-100">{t('Hero.nav_awards')}</button>
                        <button onClick={() => { scrollToSection('faqs'); setIsMobileMenuOpen(false); }} className="text-[#CE641D] text-xl font-medium w-full text-center py-2 border-b border-gray-100">{t('Hero.nav_faqs')}</button>
                    </nav>

                    <div className="mt-auto mb-8 text-center w-full">
                        <p className="text-gray-600 mb-6 text-sm">Follow us on social media</p>
                        <div className="flex items-center justify-center space-x-6 text-gray-600">
                            <a href="https://www.facebook.com/PropertyShopInvestment" target="_blank"><FaFacebook className="w-6 h-6 hover:text-[#CE641D]" /></a>
                            <a href="https://twitter.com/psinv" target="_blank">
                                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current hover:text-[#CE641D]">
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/propertyshopinvestment" target="_blank"><FaInstagram className="w-6 h-6 hover:text-[#CE641D]" /></a>
                            <a href="https://www.linkedin.com/company/property-shop-investment-llc" target="_blank"><FaLinkedin className="w-6 h-6 hover:text-[#CE641D]" /></a>
                            <a href="https://www.youtube.com/user/PropertyShopVideo" target="_blank"><FaYoutube className="w-6 h-6 hover:text-[#CE641D]" /></a>
                            <a href="https://www.snapchat.com/add/property-shop" target="_blank"><FaSnapchat className="w-6 h-6 hover:text-[#CE641D]" /></a>
                            <a href="https://vk.com/psinvuae" target="_blank"><FaVk className="w-6 h-6 hover:text-[#CE641D]" /></a>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section
                className="relative h-[70vh] md:h-[120vh] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${banners[currentBannerIndex]})` }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center md:mt-[-150px] text-center text-white px-4">
                    <h1 className={`text-4xl md:text-6xl font-semibold mb-4 leading-tight`}>
                        <span className="block text-xl md:text-3xl mb-2 font-normal">{t("Hero.title_line1")}</span>
                        {t("Hero.title_line2")}
                    </h1>
                    <p className={`text-sm md:text-2xl max-w-2xl mb-8`}>
                        {t("Hero.subtitle")}
                    </p>
                    <button onClick={() => scrollToSection('form')} className="bg-[#E0592A] hover:text-[#000] text-white font-bold py-3 px-8 rounded transition duration-300 text-lg">
                        {t("Hero.cta")}
                    </button>
                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                        {/* Language Switcher Placeholder if needed, usually in Navbar */}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-medium text-gray-800 mb-2">
                        {t("Stats.title")}
                    </h2>
                    <img src="/assets/images/emirati-hub/vector-1.svg" className="mx-auto" alt="vector" title="vector"></img>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-0 md:gap-0 mt-15">
                        <div className="flex flex-col items-center col-span-2 md:col-span-1 pb-4 md:pb-0 md:py-10">
                            <span className="text-4xl md:text-4xl font-medium mb-3">{t("Stats.stat1.value")}</span>
                            <span className="text-md text-gray-500 mt-0">{t("Stats.stat1.label")}</span>
                        </div>
                        <div className="flex flex-col items-center border-l-0 md:border-l border-gray-300 py-4 md:py-10">
                            <span className="text-3xl md:text-4xl font-medium mb-3">{t("Stats.stat2.value")}</span>
                            <span className="text-sm text-gray-500 mt-2">{t("Stats.stat2.label")}</span>
                        </div>
                        <div className="flex flex-col items-center border-l border-gray-300 py-4 md:py-10">
                            <span className="text-3xl md:text-4xl font-medium mb-3">{t("Stats.stat3.value")}</span>
                            <span className="text-sm text-gray-500 mt-2">{t("Stats.stat3.label")}</span>
                        </div>
                        <div className="flex flex-col items-center border-l-0 md:border-l border-gray-300 py-4 md:py-10">
                            <span className="text-3xl md:text-4xl font-medium mb-3">{t("Stats.stat4.value")}</span>
                            <span className="text-sm text-gray-500 mt-2">{t("Stats.stat4.label")}</span>
                        </div>
                        <div className="flex flex-col items-center border-l md:border-l border-gray-300 col-span-1 py-4 md:py-10 ">
                            <span className="text-3xl md:text-4xl font-medium mb-3">{t("Stats.stat5.value")}</span>
                            <span className="text-sm text-gray-500 mt-2">{t("Stats.stat5.label")}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why PSI Section */}
            <section id="about">
                <div className="container px-4 md:px-8 text-center">
                    <span className="uppercase text-lg tracking-widest text-gray-500 font-semibold mb-2 block">{t("WhyPSI.super_title")}</span>
                    <h2 className={`text-3xl md:text-5xl font-medium text-gray-900 mb-6`}>
                        {t("WhyPSI.title")}
                    </h2>
                    <p className={`max-w-3xl mx-auto text-lg text-gray-600 mb-16 ${montserrat.className} leading-relaxed`}>
                        {t("WhyPSI.description")}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="relative group overflow-hidden rounded-xl h-96">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('/assets/images/emirati-hub/career2.webp')" }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-left text-white w-full">
                                <span className="text-4xl font-bold opacity-50 block mb-2">{t("WhyPSI.cards.card1.step")}</span>
                                <h3 className={`text-2xl font-bold mb-3 ${outfit.className}`}>{t("WhyPSI.cards.card1.title")}</h3>
                                <p className="text-md text-gray-300 leading-relaxed">
                                    {t("WhyPSI.cards.card1.desc")}
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="relative group overflow-hidden rounded-xl h-96">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('/assets/images/emirati-hub/rewards.webp')" }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-left text-white w-full">
                                <span className="text-4xl font-bold opacity-50 block mb-2">{t("WhyPSI.cards.card2.step")}</span>
                                <h3 className={`text-2xl font-bold mb-3 ${outfit.className}`}>{t("WhyPSI.cards.card2.title")}</h3>
                                <p className="text-md text-gray-300 leading-relaxed">
                                    {t("WhyPSI.cards.card2.desc")}
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="relative group overflow-hidden rounded-xl h-96">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('/assets/images/emirati-hub/partnership.webp')" }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-left text-white w-full">
                                <span className="text-4xl font-bold opacity-50 block mb-2">{t("WhyPSI.cards.card3.step")}</span>
                                <h3 className={`text-2xl font-bold mb-3 ${outfit.className}`}>{t("WhyPSI.cards.card3.title")}</h3>
                                <p className="text-md text-gray-300 leading-relaxed">
                                    {t("WhyPSI.cards.card3.desc")}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Card 4 */}
                    <div className="relative group overflow-hidden rounded-xl h-96 mt-6">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('/assets/images/emirati-hub/training.webp')" }}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 text-left text-white w-full md:w-1/2">
                            <span className="text-4xl font-bold opacity-50 block mb-2">{t("Training.step")}</span>
                            <h3 className={`text-2xl font-bold mb-3 ${outfit.className}`}>{t("Training.title")}</h3>
                            <p className="text-md text-gray-300 leading-relaxed">
                                {t("Training.desc")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Awards Section */}
            <section id="awards" className="py-15 bg-white text-center">
                <div className="container px-4 md:px-8 mx-auto">
                    <div className="flex items-center justify-center mb-12">
                        <div className="h-px bg-[#CE641D] w-24 mr-4"></div>
                        <h2 className="text-3xl md:text-5xl font-medium text-gray-800">{t("Awards.title")}</h2>
                        <div className="h-px bg-[#CE641D] w-24 ml-4"></div>
                    </div>
                    <div className="w-full">
                        <AwardSlider />
                    </div>
                </div>
            </section>

            {/* Emirati Hub Form Section */}
            <section id="form" className="bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-end gap-15">
                        <div className="md:w-1/2 ">
                            <h2 className={`text-3xl md:text-5xl font-medium text-gray-900 mb-15`}>
                                {t("Form.title")}
                            </h2>
                            <EmiratiHubForm />
                        </div>
                        <div className="md:w-1/2 relative w-full content-end items-center justify-items-center px-10 pt-20 z-99">
                            {/* Shape and Image Container */}
                            <img src="/assets/images/emirati-hub/national-flag.webp" className="w-[80%] h-auto z-99" alt="UAE Flag" />
                            {/* Subtler background blur effects */}

                        </div>
                    </div>
                </div>
                {/* Vector Pattern */}
                <div className="absolute bottom-0 left-1/2 w-[200px] md:w-[30%] h-[30%] bg-repeat z-9 "
                    style={{ backgroundImage: "url(/assets/images/emirati-hub/vector-2.svg)" }} >
                </div>
                <div className="absolute top-[-40px] right-0 w-[200px] md:w-[30%] h-[60%] bg-repeat z-10 md:block hidden"
                    style={{ backgroundImage: "url(/assets/images/emirati-hub/vector-2.svg)" }} >
                </div>
            </section >

            {/* FAQ Section */}
            <section id="faqs" className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center justify-center mb-12">
                        <div className="h-[2px] bg-[#CE641D] w-50 mr-4"></div>
                        <h2 className="text-3xl md:text-5xl font-medium text-gray-800">{t("FAQ.title")}</h2>
                        <div className="h-[2px] bg-[#CE641D] w-50 ml-4"></div>
                    </div>

                    <div className="space-y-0">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <FAQItem key={i} question={t(`FAQ.q${i}`)} answer={t(`FAQ.a${i}`)} />
                        ))}
                    </div>
                </div>
            </section>
            {/* Footer Section */}
            <footer className="bg-[#EBF2F7] py-8 border-t border-gray-200 mt-0">
                <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm text-center md:text-left">
                        {t('Footer.copyright')}
                    </p>
                    <div className="flex items-center space-x-4">
                        <a href="https://twitter.com/psinv" target="_blank" className="text-slate-400 hover:text-[#CE641D] transition-colors">
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path>
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/company/property-shop-investment-llc" target="_blank" className="text-slate-400 hover:text-[#CE641D] transition-colors">
                            <FaLinkedin className="h-6 w-6" />
                        </a>
                        <a href="https://www.facebook.com/PropertyShopInvestment" target="_blank" className="text-slate-400 hover:text-[#CE641D] transition-colors">
                            <FaFacebook className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </footer>
        </div >
    );
}