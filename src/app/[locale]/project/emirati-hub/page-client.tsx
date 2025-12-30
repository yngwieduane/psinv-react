"use client";

import { useTranslations, useLocale } from "next-intl";
import { Audrey, BrittanySignature } from "@/utils/fonts";
import { Montserrat, Outfit } from "next/font/google";
import { useState } from "react";
import AwardSlider from "../../about-us/_components/AboutAwardsSlider";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
});

const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
});

export default function PageClient() {
    const t = useTranslations("EmiratiHub");
    const locale = useLocale();
    const isRTL = locale.toLowerCase().startsWith("ar");

    return (
        <div className={`w-full overflow-hidden ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
            {/* Hero Section */}
            <section className="relative h-[80vh] w-full bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/about-us/main-office.webp')" }}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${outfit.className}`}>
                        {t("Hero.title_line1")} <br />
                        {t("Hero.title_line2")}
                    </h1>
                    <p className={`text-lg md:text-xl max-w-2xl mb-8 ${montserrat.className}`}>
                        {t("Hero.subtitle")}
                    </p>
                    <button className="bg-[#CE641D] hover:bg-[#b05216] text-white font-bold py-3 px-8 rounded transition duration-300">
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
                    <h2 className={`text-3xl md:text-4xl font-bold text-gray-800 mb-2 ${Audrey.className}`}>
                        {t("Stats.title")}
                    </h2>
                    <div className="w-24 h-1 bg-[#CE641D] mx-auto mb-12 rounded-full"></div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                        <div className="flex flex-col items-center">
                            <span className={`text-3xl md:text-4xl font-bold text-gray-800 ${Audrey.className}`}>{t("Stats.stat1.value")}</span>
                            <span className={`text-sm text-gray-500 mt-2 ${montserrat.className}`}>{t("Stats.stat1.label")}</span>
                        </div>
                        <div className="flex flex-col items-center border-l md:border-l border-gray-200">
                            <span className={`text-3xl md:text-4xl font-bold text-gray-800 ${Audrey.className}`}>{t("Stats.stat2.value")}</span>
                            <span className={`text-sm text-gray-500 mt-2 ${montserrat.className}`}>{t("Stats.stat2.label")}</span>
                        </div>
                        <div className="flex flex-col items-center border-l md:border-l border-gray-200">
                            <span className={`text-3xl md:text-4xl font-bold text-gray-800 ${Audrey.className}`}>{t("Stats.stat3.value")}</span>
                            <span className={`text-sm text-gray-500 mt-2 ${montserrat.className}`}>{t("Stats.stat3.label")}</span>
                        </div>
                        <div className="flex flex-col items-center border-l md:border-l border-gray-200">
                            <span className={`text-3xl md:text-4xl font-bold text-gray-800 ${Audrey.className}`}>{t("Stats.stat4.value")}</span>
                            <span className={`text-sm text-gray-500 mt-2 ${montserrat.className}`}>{t("Stats.stat4.label")}</span>
                        </div>
                        <div className="flex flex-col items-center border-l md:border-l border-gray-200 col-span-2 md:col-span-1 border-t md:border-t-0 pt-8 md:pt-0">
                            <span className={`text-3xl md:text-4xl font-bold text-gray-800 ${Audrey.className}`}>{t("Stats.stat5.value")}</span>
                            <span className={`text-sm text-gray-500 mt-2 ${montserrat.className}`}>{t("Stats.stat5.label")}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why PSI Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <span className="uppercase text-xs tracking-widest text-gray-500 font-semibold mb-2 block">{t("WhyPSI.super_title")}</span>
                    <h2 className={`text-3xl md:text-5xl font-bold text-gray-900 mb-6 ${Audrey.className}`}>
                        {t("WhyPSI.title")}
                    </h2>
                    <p className={`max-w-3xl mx-auto text-gray-600 mb-16 ${montserrat.className} leading-relaxed`}>
                        {t("WhyPSI.description")}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="relative group overflow-hidden rounded-xl h-96">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('/assets/images/about-us/1.png')" }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-left text-white w-full">
                                <span className="text-4xl font-bold opacity-50 block mb-2">{t("WhyPSI.cards.card1.step")}</span>
                                <h3 className={`text-2xl font-bold mb-3 ${outfit.className}`}>{t("WhyPSI.cards.card1.title")}</h3>
                                <p className="text-sm text-gray-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    {t("WhyPSI.cards.card1.desc")}
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="relative group overflow-hidden rounded-xl h-96">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('/assets/images/about-us/2.png')" }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-left text-white w-full">
                                <span className="text-4xl font-bold opacity-50 block mb-2">{t("WhyPSI.cards.card2.step")}</span>
                                <h3 className={`text-2xl font-bold mb-3 ${outfit.className}`}>{t("WhyPSI.cards.card2.title")}</h3>
                                <p className="text-sm text-gray-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    {t("WhyPSI.cards.card2.desc")}
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="relative group overflow-hidden rounded-xl h-96">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: "url('/assets/images/about-us/3.png')" }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-left text-white w-full">
                                <span className="text-4xl font-bold opacity-50 block mb-2">{t("WhyPSI.cards.card3.step")}</span>
                                <h3 className={`text-2xl font-bold mb-3 ${outfit.className}`}>{t("WhyPSI.cards.card3.title")}</h3>
                                <p className="text-sm text-gray-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    {t("WhyPSI.cards.card3.desc")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Training Program Banner */}
            <section className="relative py-24 bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/about-us/corporate-office.webp')" }}>
                <div className="absolute inset-0 bg-gray-900/70"></div>
                <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center text-white">
                    <div className="md:w-1/2 md:pr-12">
                        <span className="text-5xl font-bold opacity-30 block mb-4">{t("Training.step")}</span>
                        <h2 className={`text-4xl font-bold mb-6 ${outfit.className}`}>{t("Training.title")}</h2>
                        <p className={`text-lg leading-relaxed text-gray-200 ${montserrat.className}`}>
                            {t("Training.desc")}
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        {/* Empty right side to let background show or can add an image element */}
                    </div>
                </div>
            </section>

            {/* Awards Section */}
            <section className="py-20 bg-white text-center">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center mb-12">
                        <div className="h-px bg-[#CE641D] w-24 mr-4"></div>
                        <h2 className={`text-3xl md:text-4xl font-bold text-gray-800 ${Audrey.className}`}>{t("Awards.title")}</h2>
                        <div className="h-px bg-[#CE641D] w-24 ml-4"></div>
                    </div>

                    <div className="w-full">
                        <AwardSlider />
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-8 max-w-lg ${outfit.className}`}>
                                {t("Form.title")}
                            </h2>
                            <form className="space-y-6 max-w-md">
                                <div className="space-y-4">
                                    <input type="text" placeholder={t("Form.fields.firstName")} className="w-full border-b border-gray-300 py-3 focus:border-[#CE641D] outline-none text-gray-700 bg-transparent placeholder-gray-400" />
                                    <input type="text" placeholder={t("Form.fields.secondName")} className="w-full border-b border-gray-300 py-3 focus:border-[#CE641D] outline-none text-gray-700 bg-transparent placeholder-gray-400" />
                                    <input type="email" placeholder={t("Form.fields.email")} className="w-full border-b border-gray-300 py-3 focus:border-[#CE641D] outline-none text-gray-700 bg-transparent placeholder-gray-400" />
                                    <div className="flex items-center border-b border-gray-300">
                                        <span className="mr-2">🇦🇪</span>
                                        <input type="tel" placeholder={t("Form.fields.phone")} className="w-full py-3 focus:border-[#CE641D] outline-none text-gray-700 bg-transparent placeholder-gray-400" />
                                    </div>
                                    <div className="relative">
                                        <input type="text" placeholder={t("Form.fields.city")} className="w-full border-b border-gray-300 py-3 focus:border-[#CE641D] outline-none text-gray-700 bg-transparent placeholder-gray-400" />
                                        <ChevronDownIcon className="w-4 h-4 text-gray-400 absolute right-0 top-4" />
                                    </div>
                                    <input type="text" placeholder={t("Form.fields.profession")} className="w-full border-b border-gray-300 py-3 focus:border-[#CE641D] outline-none text-gray-700 bg-transparent placeholder-gray-400" />
                                </div>
                                <button type="button" className="w-full bg-[#CE641D] hover:bg-[#b05216] text-white font-bold py-3 rounded transition duration-300">
                                    {t("Form.fields.cta")}
                                </button>

                                <div className="text-xs text-gray-500 space-y-2 mt-4">
                                    <p>
                                        <span className="text-[#CE641D]">*</span> {t("Form.disclaimer.text1")}
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <input type="checkbox" className="mt-0.5" checked readOnly />
                                        <span>{t("Form.disclaimer.text2")}</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <input type="checkbox" className="mt-0.5" checked readOnly />
                                        <span>{t("Form.disclaimer.text3")}</span>
                                    </p>
                                </div>
                            </form>
                        </div>
                        <div className="md:w-1/2 relative h-[600px] w-full">
                            {/* Shape and Image Container - Needs custom masking ideally, using rounded for now */}
                            <div className="absolute inset-0 rounded-tl-[150px] rounded-br-[150px] overflow-hidden border-8 border-[#CE641D]/20">
                                <img src="/assets/images/about-us/uae-image.jpg" className="w-full h-full object-cover" alt="UAE Flag" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 inline-block border-b-2 border-[#CE641D] pb-2">{t("FAQ.title")}</h2>
                        <div className="h-px bg-gray-200 w-full mt-[-1px]"></div>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <FAQItem key={i} question={t(`FAQ.q${i}`)} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

function FAQItem({ question }: { question: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-100">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex items-center justify-between text-left focus:outline-none group"
            >
                <span className={`font-medium ${isOpen ? 'text-[#CE641D]' : 'text-gray-700'} group-hover:text-[#CE641D] transition-colors`}>{question}</span>
                {isOpen ? <ChevronUpIcon className="w-5 h-5 text-[#CE641D]" /> : <ChevronDownIcon className="w-5 h-5 text-gray-400" />}
            </button>
            <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
                <div className="pb-4 text-gray-500 text-sm">
                    {/* Placeholder answer since designs typically don't show all answers open */}
                    Placeholder answer content for this question. This expands to show more details.
                </div>
            </div>
        </div>
    );
}
