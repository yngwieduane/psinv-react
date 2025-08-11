'use client';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { Montserrat, Lato } from 'next/font/google';
import { Audrey, BrittanySignature } from "@/utils/fonts";
import TabsContainer from './_components/TabsContainer';
import TabContent from './_components/TabContent';
import YoungstersForm from './_components/youngsters-form';
import Footer from './_components/Footer';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import style from './_components/TabContent.module.css';
import { programData, communityItems } from '@/data/youngsters';


const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});
type CardProps = {
  title: string;
  subtitle: string;
  iconName: string;
};

const Card = ({ title, subtitle, iconName }: CardProps) => (
  <div className="bg-white rounded-[5px] shadow-md p-8 text-[#2A3066] flex flex-col justify-between relative h-full text-center">
    <div className="flex flex-col grow justify-between">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-[13px] whitespace-nowrap truncate mb-5">{subtitle}</p>
    </div>
    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
      <div className="w-[60px] h-[60px] rounded-full bg-[#FD661F] flex items-center justify-center shadow-md">
        <img
          src={`/images/youngsters/${iconName}`}
          alt={title}
          className="w-8 h-8 object-contain"
        />
      </div>
    </div>
  </div>
);

export default function YoungstersProgramPage() {
  const [activeTab, setActiveTab] = useState<number>(-1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-multiply"
          style={{
            backgroundImage: "linear-gradient(#333A7B, #333A7B), url('/images/youngsters/youngster-top.webp')",
            backgroundBlendMode: 'multiply',
          }}
        />
        <header className="relative text-white py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-10">
              <a href="/" className="w-[72px] h-[64px] block">
                <img
                  src="/images/logo-psi-white.svg"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
            <nav className="hidden md:flex space-x-8 text-sm font-semibold tracking-wide leading-6 text-white/40">
              <a href="#introduction" className="hover:text-white">INTRODUCTION</a>
              <a href="#program" className="hover:text-white">OUR PROGRAM</a>
              <a href="#contacts" className="hover:text-white">CONTACT US</a>
            </nav>
            <div className="hidden md:block">
              <a href="#contacts">
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-md">
                  Sign Up
                </button>
              </a>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 absolute right-6 top-20 bg-orange-600 text-white rounded shadow-lg z-30 w-48 text-sm font-semibold">
              <a href="#introduction" className="block px-4 py-3 border-b border-white/20">INTRODUCTION</a>
              <a href="#program" className="block px-4 py-3 border-b border-white/20">OUR PROGRAM</a>
              <a href="#contacts" className="block px-4 py-3 border-b border-white/20">CONTACT US</a>
              <div className="p-4">
                <a href="#contacts">
                  <button className="bg-white text-orange-600 font-bold px-4 py-2 w-full rounded">Sign Up</button>
                </a>
              </div>
            </div>
          )}
        </header>
        {/* Hero Content */}
        <div className="relative text-white py-16 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">
            <div className="space-y-6">
              <h1 className="text-[32px] leading-[45px] tracking-wide font-sans md:text-[2.5rem] md:leading-none">
                Youngsters is Back!
              </h1>
              <p className="text-xl text-gray-100">Get set for an amazing Summer Break</p>
              <a href="#contacts">
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded">
                  Join us now!
                </button>
              </a>
            </div>
            <div className="relative w-[398px] h-[399px] mx-auto overflow-hidden -left-[41px]">
              <Image
                src="/images/youngsters/person1-1.webp"
                alt="Smiling girl"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-[20px] left-1/2 -translate-x-1/2 z-100 pointer-events-none">
          <a href="#introduction" className="block">
            <svg width="100" height="100" viewBox="0 0 24 24" className="fill-orange-600 block mb-[-67px]">
              <path d="M12 15.5l-6.5-6.5-1.5 1.5 8 8 8-8-1.5-1.5z" />
            </svg>
            <svg width="100" height="100" viewBox="0 0 24 24" className="fill-orange-600 block">
              <path d="M12 15.5l-6.5-6.5-1.5 1.5 8 8 8-8-1.5-1.5z" />
            </svg>
          </a>
        </div>
      </section>
      <section
        id="introduction"
        className="relative pt-24 pb-24 bg-[rgba(248,248,248,0.70)] z-0 overflow-hidden"
      >
        <div className="absolute left-[-60px] top-[-40px] w-[140px] md:w-[180px] z-0">
          <img
            src="/images/youngsters/group1.svg"
            alt="Decorative Scribble"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="relative z-10 max-w-(--breakpoint-xl) mx-auto px-4">
          <div className="text-center mt-10">
            <h2 className="font-extrabold text-[#333A7B] leading-[130%] md:text-[42px] text-[20px] font-[Lato]">
              <span className={`${BrittanySignature.className} text-[#333A7B] md:text-[42px] text-[20px] leading-none`}>
                Join
              </span>{" "}
              PSI's Youngsters Program?
            </h2>
            <svg
              className="hidden lg:block mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="180"
              height="9"
              viewBox="0 0 180 9"
              fill="none"
            >
              <path
                d="M0.792969 7.83689C49.6731 -0.309804 117.336 -0.988736 178.889 7.83689"
                stroke="#FD661F"
                strokeWidth="2.24694"
              />
            </svg>
            <svg
              className="block lg:hidden mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="94"
              height="6"
              viewBox="0 0 94 6"
              fill="none"
            >
              <path
                d="M0.580078 5.50608C26.0362 -0.862892 61.2742 -1.39367 93.3301 5.50608"
                stroke="#FD661F"
              />
            </svg>

            <p className={`${montserrat.className} max-w-[980px] mx-auto text-[20px] text-gray-700 leading-relaxed text-center mt-10`}>
              Our mission in PSI is to nurture the future generation of innovative leaders in the UAE through a three-level program which will be an internship program during the school holidays.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white py-16 px-4">
        <div className="max-w-(--breakpoint-xl) mx-auto text-center">
          <h2 className="text-[#333A7B] md:text-[42px] text-[20px] font-extrabold font-[Lato] leading-snug">
            Program <span className="relative inline-block">
              Objectives
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="180"
                height="9"
                viewBox="0 0 180 9"
                fill="none"
                className="absolute -bottom-5 left-1/2 -translate-x-1/2"
              >
                <path
                  d="M1.11328 7.83689C49.9934 -0.309804 117.656 -0.988736 179.209 7.83689"
                  stroke="#FD661F"
                  strokeWidth="2.24694"
                />
              </svg>
            </span>
          </h2>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-(--breakpoint-xl) mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <Card
            title="Empowering Tomorrow's Leaders"
            subtitle="Transformative Internship Experience"
            iconName="leaders.svg"
          />
          <Card
            title="Real-World Application"
            subtitle="Practical Experience for Future Success"
            iconName="success.svg"
          />
          <Card
            title="Tailored Learning Tracks for Different Ages"
            subtitle="Content designed for Gen Z Engagement."
            iconName="paths.svg"
          />
        </div>
      </section>
      {/* Tabs Section */}
      <section id="program" className="py-16 bg-[#272964] text-white relative">
        <div className="absolute left-[-60px] top-[-190px] w-[140px] md:w-[180px] z-0">
          <img
            src="/images/youngsters/group1.svg"
            alt="Decorative Scribble"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-full">
          {/* Custom Tabs */}
          <TabsContainer
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            levels={programData.levels}
          />
          {/* Tab Content */}
          {activeTab !== -1 && (
            <TabContent
              levelData={programData.levels[activeTab]}
              isComingSoon={programData.levels[activeTab]?.comingSoon}
            />
          )}
        </div>
      </section>
      <section className="w-full bg-white py-10 px-4 md:px-10">
        <div className="text-center mt-10">
          <h5 className="text-[#E0592A] font-[Lato] text-lg my-2 md:my-5">Program Gains</h5>
          <h2 className="text-base md:text-4xl font-bold text-[#333A7B] leading-tight">
            Diving into the <span className={`${BrittanySignature.className} text-[#333A7B] text-[48px] leading-none`}>Corporate</span>{" "}
            <span className="relative inline-block">
              Universe
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 173 19"
                fill="none"
                className="absolute w-[90%] h-[18px] -bottom-3 left-1"
              >
                <path
                  d="M1.25781 17.5569C48.0499 -2.87302 112.822 -4.57562 171.746 17.5569"
                  stroke="#FD661F"
                  strokeWidth="2.24694"
                />
              </svg>
            </span>
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
            <img
              src="/images/youngsters/younster-girl.webp"
              alt="Youngster with Laptop"
              className="max-w-xs md:max-w-md w-full"
              loading="lazy"
            />
          </div>
          {/* Bullet List */}
          <div className="md:col-span-7 order-2 md:order-1 space-y-6">
            <ul className="space-y-6">
              <li className="flex gap-4 items-start pb-5 pt-2 border-b border-[#E4E4E4]">
                <img src="/images/youngsters/marker.svg" alt="bullet" className="w-4 h-4 mt-1" />
                <div>
                  <h5 className="text-xl md:text-[25px] font-bold leading-[1.4] text-[#333A7B]">Industry Immersion</h5>
                  <p className="text-[1rem] md:text-[22px] font-light leading-[1.4] text-[#727272]">
                    This program gives understanding and exposure to youngsters about the UAE real estate industry.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start pb-5 pt-2 border-b border-[#E4E4E4]">
                <img src="/images/youngsters/marker.svg" alt="bullet" className="w-4 h-4 mt-1" />
                <div>
                  <h5 className="text-xl md:text-[25px] font-semibold text-blue-900">Career Exploration</h5>
                  <p className="text-[1rem] md:text-[22px] font-light leading-[1.4] text-[#727272]">
                    Encouraging young talents to explore corporate facets, aiding their unique career discovery in this dynamic field.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start pb-5 pt-2 border-b border-[#E4E4E4]">
                <img src="/images/youngsters/marker.svg" alt="bullet" className="w-4 h-4 mt-1" />
                <div>
                  <h5 className="text-xl md:text-[25px] font-semibold text-blue-900">Educational Guidance</h5>
                  <p className="text-[1rem] md:text-[22px] font-light leading-[1.4] text-[#727272]">
                    We guide higher education choices, by allowing the best practical experience and exposure to variety of job role assignments.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 order-1 md:order-1 flex justify-center md:justify-end">
            <img
              src="/images/youngsters/younster-boy.webp"
              alt="Youngster with Laptop"
              className="max-w-xs md:max-w-md w-full"
              loading="lazy"
            />
          </div>
          <div className="md:col-span-7 order-2 md:order-2 space-y-6">
            <ul className="space-y-6">
              <li className="flex gap-4 items-start pb-5 pt-2 border-b border-[#E4E4E4]">
                <img src="/images/youngsters/marker.svg" alt="bullet" className="w-4 h-4 mt-1" />
                <div>
                  <h5 className="text-xl md:text-[25px] font-bold leading-[1.4] text-[#333A7B]">Industry Access</h5>
                  <p className="text-[1rem] md:text-[22px] font-light leading-[1.4] text-[#727272]">
                    PSI Youngsters provides exclusive access for mentorship and best practice exposure.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start pb-5 pt-2 border-b border-[#E4E4E4]">
                <img src="/images/youngsters/marker.svg" alt="bullet" className="w-4 h-4 mt-1" />
                <div>
                  <h5 className="text-xl md:text-[25px] font-semibold text-blue-900">Multi-Department Experience</h5>
                  <p className="text-[1rem] md:text-[22px] font-light leading-[1.4] text-[#727272]">
                    Participants gain hands-on experience across different departments within PSI, enriching their well-rounded skillset and industry perspective.
                  </p>
                </div>
              </li>
              <li className="flex gap-4 items-start pb-5 pt-2 border-b border-[#E4E4E4]">
                <img src="/images/youngsters/marker.svg" alt="bullet" className="w-4 h-4 mt-1" />
                <div>
                  <h5 className="text-xl md:text-[25px] font-semibold text-blue-900">Corporate Skills & Knowledge</h5>
                  <p className="text-[1rem] md:text-[22px] font-light leading-[1.4] text-[#727272]">
                    Our program equips with essential corporate skills and knowledge, focusing on corporate and real estate's evolving demands.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="whySec pt-10 pb-20 text-white bg-[#2F3279] relative overflow-hidden">
        <div className="w-[100px] md:w-[150px] lg:w-[594px] h-[6px] bg-[#FD661F] absolute top-px left-1/2 transform -translate-x-1/2" />
        <div className="text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-xl md:text-4xl font-bold">
            <span className={`${BrittanySignature.className} text-white text-[48px] leading-none`}>Why </span>
            Real Estate Matters
          </h2>
          <div className="relative w-[180px] h-[20px] mx-auto mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 173 19"
              fill="none"
              className="absolute w-full h-full left-0 top-0"
            >
              <path
                d="M1.25781 17.5569C48.0499 -2.87302 112.822 -4.57562 171.746 17.5569"
                stroke="#FD661F"
                strokeWidth="2.25"
              />
            </svg>
          </div>
        </div>
        <div className="mt-8 px-6 max-w-5xl mx-auto text-center text-lg font-light leading-relaxed text-white">
          <p className='font-[Lato] text-base font-normal leading-relaxed'>
            The real estate industry is fundamentally interconnected with all sectors of the economy. It provides the physical
            space for them to operate—from commercial offices for businesses, industrial real estate for manufacturing,
            retail spaces for merchants, to residential properties for workers. Construction feeds directly into real estate,
            while banking supports it with finance options. Legal services are involved in facilitating transactions, and the
            technology sector is increasingly integral for property management and sales. Healthcare facilities contribute to
            the desirability of residential areas. In essence, real estate supports and reflects the broader economy’s health
            and growth as well. Real estate provides locations for hospitality businesses, while the success of these
            establishments boosts property demand and values in their vicinities.
          </p>
        </div>
        <div className="mx-auto max-w-7xl">
          {/* Desktop Image */}
          <img
            src="/images/youngsters/info-desk.png"
            alt="info"
            title="info"
            className="hidden md:block w-full!"
            loading="lazy"
          />
          {/* Mobile Image */}
          <img
            src="/images/youngsters/info-mob-new.png"
            alt="info"
            title="info"
            className="block md:hidden w-full!"
            loading="lazy"
          />
        </div>
        {/* YouTube Video */}
        <div className="mx-auto max-w-4xl px-4 mt-6 mb-6 md:px-0">
          <div className="hidden md:block">
            <iframe
              width="100%"
              height="450"
              src="https://www.youtube.com/embed/Lo4SNNKbeZE"
              title="Youngsters"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="block md:hidden">
            <iframe
              width="100%"
              height="300"
              src="https://www.youtube.com/embed/Lo4SNNKbeZE"
              title="Youngsters"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        <div className="absolute left-[-60px] top-[-50px] w-[140px] md:w-[180px] z-0">
          <img
            src="/images/youngsters/group1.svg"
            alt="Decorative Scribble"
            className="w-full h-auto object-contain"
          />
        </div>
      </section>
      <section className="communitySec py-10 text-white bg-[#272964] relative">
        <div className="absolute right-[0px] top-[-90px] w-[140px] md:w-[180px] z-100">
          <img
            src="/images/youngsters/group2.svg"
            alt="Decorative Scribble"
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="container px-4 max-w-[1400px] mx-auto font-lato">
          <div className="text-center mb-10">
            <h2 className="text-xl md:text-4xl font-extrabold leading-tight">
              <span className={`${BrittanySignature.className} text-white text-[48px] leading-none`}>Serving </span>
              Our Future{" "}
              <span className="relative inline-block">
                Generations
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 173 19"
                  fill="none"
                  className="absolute -bottom-5 left-0 w-full"
                >
                  <path
                    d="M1.25781 17.5569C48.0499 -2.87302 112.822 -4.57562 171.746 17.5569"
                    stroke="#FD661F"
                    strokeWidth="2.25"
                  />
                </svg>
              </span>
            </h2>
            <h6 className="text-orange-500 mt-5">For A Better Tomorrow</h6>
          </div>
          <div className="grid md:grid-cols-[1fr_1.5fr_1fr] gap-y-12 gap-x-8">
            {communityItems.map((item, index) => {
              const isFirstColumnImage = index % 2 === 0;
              return (
                <React.Fragment key={index}>
                  <div className="space-y-10 md:hidden">
                    {communityItems.map((item, index) => (
                      <div key={index} className="relative bg-[#2B2F66] rounded-xl pt-12 pb-6 px-5 text-white w-[90%] mx-auto">
                        <div className="absolute top-1/2 left-0 transform
                -translate-x-1/2 -translate-y-1/2
                w-[70px] h-[70px] rounded-full overflow-hidden z-10 shadow-lg">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className="text-center">
                          <h4 className="text-orange-400 font-semibold text-[14px] tracking-wide uppercase mb-2 leading-tight">
                            {item.title}
                          </h4>
                          <p className="text-[14.5px] font-light leading-normal">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Desktop View */}
                  <div className="hidden md:flex justify-center items-start">
                    {isFirstColumnImage ? (
                      <div className="relative group w-full max-w-[250px]">
                        <img src={item.image} alt={item.title} className="rounded-lg object-cover w-full" />
                        <div className="absolute top-1/2 right-[-60px] transform -translate-y-1/2 bg-orange-600 px-4 py-2 text-white w-max text-[13px] font-medium leading-[1.4] tracking-[0.1px] uppercase my-[6px]">
                          {item.title}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="hidden md:flex justify-center items-center col-span-1">
                    <p className="text-[22px] font-light leading-[1.2] tracking-[-0.24px] text-center [word-spacing:6px] max-w-[620px] mx-auto">
                      {item.text}
                    </p>
                  </div>

                  <div className="hidden md:flex justify-center items-start">
                    {!isFirstColumnImage ? (
                      <div className="relative group w-full max-w-[250px]">
                        <img src={item.image} alt={item.title} className="rounded-lg object-cover w-full" />
                        <div className="absolute top-1/2 right-[-60px] transform -translate-y-1/2 bg-orange-600 px-4 py-2 text-white w-max text-[13px] font-medium leading-[1.4] tracking-[0.1px] uppercase my-[6px]">
                          {item.title}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <div className="mx-auto max-w-xs mt-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="2"
              viewBox="0 0 264 2"
              fill="none"
            >
              <path d="M0 1H264" stroke="#E0592A" />
            </svg>
          </div>
        </div>
      </section>
      <section className="bg-[#272964] text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute left-[-60px] top-[-40px] w-[140px] md:w-[180px] z-0">
          <img
            src="/images/youngsters/group1.svg"
            alt="Decorative Scribble"
            className="w-full h-auto object-contain"
          />
        </div>
        {/* Header Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold">
            <span className="text-orange-500">GET </span>
            IN TOUCH WITH US
            <span className="block relative mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 173 19"
                fill="none"
                className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 w-[150px]"
              >
                <path
                  d="M1.25781 17.5569C48.0499 -2.87302 112.822 -4.57562 171.746 17.5569"
                  stroke="#FD661F"
                  strokeWidth="2.25"
                />
              </svg>
            </span>
          </h2>
        </div>
        {/* Form Box */}
        <div id="contacts" className="max-w-4xl mx-auto">
          <YoungstersForm></YoungstersForm>
          <img
            src="/images/youngsters/group5.svg"
            alt="Decorative"
            className="absolute bottom-0 right-0 w-[120px] md:w-[180px] z-0"
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
