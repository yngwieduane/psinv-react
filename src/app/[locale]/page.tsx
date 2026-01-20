import dynamic from 'next/dynamic';
import Image from 'next/image';

import { Organization, WithContext } from "schema-dts";
import { Audrey, BrittanySignature } from "@/utils/fonts";
import { Montserrat, Outfit } from "next/font/google";
import HomeBanner from "./_components/HomeBanner";
import CitiesTab from "./_components/CitiesTab";
import { useLocale, useTranslations } from 'next-intl';

import HomeCalculatorClientWrapper from './_components/HomeCalculatorClientWrapper';
import { Suspense } from 'react';
import { homeSliderData } from '@/data/homeSliderData';

const HomeSearch = dynamic(() => import('./_components/HomeSearch'));
const ListPropertyForm = dynamic(() => import('./_components/ListPropertyForm'));
const WhyPSI = dynamic(() => import('./_components/WhyPSI'));
 
const AwardSlider = dynamic(
  () => import('../[locale]/about-us/_components/AboutAwardsSlider'),
  { loading: () => <></> } // lightweight placeholder, no SSR
);

const AboutCounter = dynamic(() => import('../[locale]/about-us/_components/AboutCounter'));
const GoogleReviewSection = dynamic(() => import('./_components/GoogleReviewSection'));
const GetTheAppSection = dynamic(() => import('./_components/GetTheAppSection'));
const ReportDownloadSection = dynamic(() => import('./_components/ReportDownloadSection'));

const montserrat = Montserrat({  subsets: ['latin'],  display: 'swap',});
const outfit = Outfit({  subsets: ['latin'],  display: 'swap',})

export default function HomePage() {

  const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://psinv.net",
    "logo": "/PSI-Logo.svg"
  }
  const organizationSchema1: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Property Shop Investment",
    "url": "https://psinv.net",
    "sameAs": ["https://www.facebook.com/PropertyShopInvestment", "https://twitter.com/psinv", "https://www.facebook.com/PropertyShopInvestment", "https://www.instagram.com/property_shop_investment/", "https://www.linkedin.com/company/property-shop-investment-llc", "https://www.youtube.com/user/propertyshopabudhabi"]
  }  

  const locale = useLocale();
  const isRTL = locale.toLowerCase().startsWith("ar");
  const t = useTranslations("RealEstatePartner");
  const t_awards = useTranslations("AwardsSectionHome");
  const t_slider = useTranslations('MainSliderHome');
  const t_cities = useTranslations('citiesHome');

  const mainSliderData = homeSliderData.map((item) => {
    if(item.name === "loyalty") {
      return {
        ...item,
        loyaltyTitle : t_slider(`slides.${item.key}.title`),
        features: Array.from({ length: 5}, (_,i) => 
        t_slider(`slides.${item.key}.features.${i}`)
        ),
      };
    }
    return{
      ...item,
      title: t_slider(`slides.${item.key}.title`),
      location: t_slider(`slides.${item.key}.location`),
      description: t_slider(`slides.${item.key}.description`),
    };
  });

  const citiesData = [
    {
      title: t_cities('abu_dhabi.title'),
      id: "26792",
      content: "#",
      image: '/images/gallery-1-new.webp',
      projects: [
        {
          title: t_cities('abu_dhabi.al_reem_island'),
          type: "APT | VI | TH | PH",
          image: '/images/projects/al-reem-island.webp',
          project_url: '/projects/abu-dhabi/al-reem-island',
        },
        {
          title: t_cities('abu_dhabi.saadiyat_island'),
          type: "APT | VI | TH | PH",
          image: '/images/projects/saadiyat-island.webp',
          project_url: '/projects/abu-dhabi/saadiyat-island',
        },
        {
          title: t_cities('abu_dhabi.yas_island'),
          type: "APT | VI | TH | PH",
          image: '/images/projects/yas-island.webp',
          project_url: '/projects/abu-dhabi/yas-island',
        },
        {
          title: t_cities('abu_dhabi.al_raha_beach'),
          type: "APT | VI | TH | PH",
          image: '/images/projects/al-raha-beach.webp',
          project_url: '/projects/abu-dhabi/al-raha-beach',
        },
      ],
    },
    {
      title: t_cities('dubai.title'),
      id: "26786",
      content: "#",
      image: '/images/gallery-2-new.webp',
      projects: [
        {
          title: t_cities('dubai.palm_jumeirah'),
          type: "APT | VI | TH | PH",
          image: '/images/projects/palm-jumeriah.webp',
          project_url: '/projects/dubai/the-palm-jumeirah',
        },
        {
          title: t_cities('dubai.downtown_dubai'),
          type: "APT | VI | TH | PH",
          image: '/images/projects/dubai-downtown.webp',
          project_url: '/projects/dubai/downtown-dubai',
        },
        {
          title: t_cities('dubai.dubai_creek'),
          type: "APT | VI | TH | PH",
          image: '/images/projects/dubai-creek.webp',
          project_url: '/projects/dubai/dubai-creek',
        },
        {
          title: t_cities('dubai.town_square_dubai'),
          type: "APT | VI | TH | PH",
          image: '/images/projects/townsquare-dubai.webp',
          project_url: '/projects/dubai/town-square-dubai',
        },
      ],
    },
    {
      title: t_cities('sharjah.title'),
      id: "26953",
      content: "#",
      image: '/images/gallery-3-new.webp',
      projects: [
        {
          title: t_cities('sharjah.al_khan'),
          type: "APT | VI | TH | PH",
          image: '/images/projects/al-khan.webp',
          project_url: '/projects/sharjah/al-khan',
        },
        {
          title: t_cities('sharjah.sharjah_waterfront_city'),
          type: "APT | VI | TH | PH",
          image: '/images/projects/sharjah-waterfront.webp',
          project_url: '/projects/sharjah/sharjah-waterfront-city',
        },
        {
          title: t_cities('sharjah.aljada'),
          type: "APT | VI | TH | PH",
          image: '/images/projects/aljada.webp',
          project_url: '/projects/sharjah/aljada',
        },
      ],
    },
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema1).replace(/</g, '\\u003c'),
        }}
      />
      
      <section className={`relative min-h-[600px] ${outfit.className}`}> 
        <HomeBanner slidePerView="1" slides={mainSliderData} />
        <HomeSearch />
      </section>
      
      <section className="bg-gray-50">
        <CitiesTab  cities={citiesData}  />
      </section>

      <div className="my-10 bg-white min-h-[400px]">
        <ListPropertyForm />
      </div>
      <div className="my-10 bg-gray-50 ">
        <WhyPSI />
      </div>
      <div className="container mx-auto my-10">
        <HomeCalculatorClientWrapper />
      </div>

      <div className="bg-gray-50 px-4">
        <ReportDownloadSection />
      </div>
      <div className="w-full bg-secondary-color py-10 text-gray-500" dir={isRTL ? "rtl" : "ltr"}>
        <div className="relative max-w-(--breakpoint-xl) mx-auto py-10 px-5 overflow-hidden">
          <Image src="/assets/images/about-us/pattern-1.svg"
            alt='pattern' title='pattern'
            fill
            className="object-cover object-center z-0" />
          <div className="relative z-10">
            {/* Heading */}
            <div className="text-center mt-[50px] mb-[70px]">
              <h3 className={`text-darkblue  font-bold text-xl md:text-4xl ${Audrey.className}`}>
                {t("title.part1")}{" "}
                <span className={`font-brittany text-orange font-light ${BrittanySignature.className} text-[#CE641D]`}>
                  {t("title.part2")}
                </span>{" "}
                {t("title.part3")}
              </h3>
            </div>

            {/* script for counter working */}
            <AboutCounter />

            {/* Counter Section */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-6 text-center counter1">
              <div>
                <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="150">  0 </span>K</h4>
                <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("aboutCounter.customers")}</p>
              </div>
              <div>
                <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="15"> 0</span></h4>
                <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("aboutCounter.languages")}</p>
              </div>
              <div>
                <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}> +<span className="data-count" data-count="120"> 0</span></h4>
                <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("aboutCounter.projects")}</p>
              </div>
              <div className="hidden md:block">
                <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="10"> 0</span></h4>
                <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("aboutCounter.locationWorldwide")}</p>
              </div>
            </div>

            {/* Second Counter Section */}
            <div className="grid grid-cols-3 gap-6 text-center mt-10 counter2">
              <div>
                <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}> +<span className="data-count" data-count="17"> 0</span></h4>
                <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("aboutCounter.years")}</p>
              </div>
              <div>
                <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="12"> 0 </span></h4>
                <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("aboutCounter.branches")}</p>
              </div>
              <div>
                <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}> +<span className="data-count" data-count="700"> 0</span></h4>
                <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("aboutCounter.expertEmployees")}</p>
              </div>
            </div>

            {/* Mobile Only - Location Worldwide */}
            <div className="mt-10 text-center md:hidden">
              <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="10"> 0 </span></h4>
              <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>{t("aboutCounter.locationWorldwide")}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-10 text-gray-500 text-center" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-3xl text-gray-900 mb-4">
            {t_awards("title")}
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto mb-12">{t_awards("desc")}</p>
        </div>
        <div className="w-full">
          <div className="container mx-auto px-4 md:px-8 relative mx-auto">
            <Suspense fallback={<div className="min-h-[200px] bg-gray-100 animate-pulse" />}>
              <AwardSlider />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="w-full py-10">
        <GoogleReviewSection />
      </div>
      <div className="w-full py-10">
        <GetTheAppSection />
      </div>
    </div>
  );
}