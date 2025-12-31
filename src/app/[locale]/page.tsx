import ListPropertyForm from './_components/ListPropertyForm';
import WhyPSI from './_components/WhyPSI';
import Calculator from './mortgage-calculator/MortgageTabs';
import AwardSlider from '../[locale]/about-us/_components/AboutAwardsSlider';
import AboutCounter from "../[locale]/about-us/_components/AboutCounter";
import ReportDownloadSection from "../[locale]/_components/ReportDownloadSection";
import GoogleReviewSection from "./_components/GoogleReviewSection";
import GetTheAppSection from "./_components/GetTheAppSection";

import { Organization, WithContext } from "schema-dts";
import { Audrey, BrittanySignature } from "@/utils/fonts";
import { Montserrat, Outfit } from "next/font/google";
import HomeBanner from "./_components/HomeBanner";
import CitiesTab from "./_components/CitiesTab";
import { useLocale, useTranslations } from 'next-intl';


// const SwiperSlider = dynamic(() => import('./_components/SwiperSliderHome'));
// const MainNavbar = dynamic(() => import('./_components/MainNavbar'));
// const FeaturedProjects = dynamic(() => import('./_components/FeaturedProjects'));
// const ListPropertyForm = dynamic(() => import('./_components/ListPropertyForm'));
// const WhyPSI = dynamic(() => import('./_components/WhyPSI'));
// const Calculator = dynamic(() => import('./mortgage-calculator/MortgageTabs'));
// const AwardSlider = dynamic(() => import('../[locale]/about-us/_components/AboutAwardsSlider'));
// const AboutCounter = dynamic(() => import('../[locale]/about-us/_components/AboutCounter'));
// const ReportDownloadSection = dynamic(() => import('../[locale]/_components/ReportDownloadSection'));
// const GoogleReviewSection = dynamic(() => import('./_components/GoogleReviewSection'));
// const GetTheAppSection = dynamic(() => import('./_components/GetTheAppSection'));

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
})

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

  const mainSliderData = [
    {
      title: t_slider('slides.bashayer_residences.title'),
      type: "Apartment",
      developer_img: '/images/banners/modon-white.webp',
      developer_img_mob: '/images/banners/modon-white.webp',
      location: t_slider('slides.bashayer_residences.location'),
      description: t_slider('slides.bashayer_residences.description'),
      project_url: "",
      image: '/images/banners/bashayer-residences-banner.webp',
      bannerpropertyid: '25477',
      bannerunittype: '19',
      bannersubcommunityid: '',
      bannercommunityid: '62080',
      bannerdistrictid: '102625',
      bannercityid: '91823',
      bannerstateid: '91823',
      bannercountryid: '65946',
      bannerbedroom: '21935',
    },
    {
      title: t_slider('slides.bashayer_villas.title'),
      type: "Villa",
      developer_img: '/images/banners/modon-white.webp',
      developer_img_mob: '/images/banners/modon-white.webp',
      location: t_slider('slides.bashayer_villas.location'),
      description: t_slider('slides.bashayer_villas.description'),
      project_url: "/projects/abu-dhabi/hudayriyat-island/hudayriyat-island/bashayer-villas",
      image: '/images/banners/bashayer-villas-banner.webp',
      bannerpropertyid: '25351',
      bannerunittype: '20',
      bannersubcommunityid: '',
      bannercommunityid: '62080',
      bannerdistrictid: '102625',
      bannercityid: '91823',
      bannerstateid: '91823',
      bannercountryid: '65946',
      bannerbedroom: '21935',
    },
    {
      title: t_slider('slides.muheira_2.title'),
      type: "Apartment",
      developer_img: '/images/banners/modon-white.webp',
      developer_img_mob: '/images/banners/modon-white.webp',
      location: t_slider('slides.muheira_2.location'),
      description: t_slider('slides.muheira_2.description'),
      project_url: "/projects/abu-dhabi/al-reem-island/maysan/muheira",
      image: '/images/banners/muheira-banner.webp',
      bannerpropertyid: '',
      bannerunittype: '19',
      bannersubcommunityid: '',
      bannercommunityid: '',
      bannerdistrictid: '102625',
      bannercityid: '91823',
      bannerstateid: '91823',
      bannercountryid: '65946',
      bannerbedroom: '21935',
    },
    {
      title: t_slider('slides.stellar_by_elie_saab.title'),
      type: "Villa",
      developer_img: '/images/banners/emirates-developments-white-logo.svg',
      developer_img_mob: '/images/banners/emirates-developments-white-logo.svg',
      location: t_slider('slides.stellar_by_elie_saab.location'),
      description: t_slider('slides.stellar_by_elie_saab.description'),
      project_url: "/projects/abu-dhabi/yas-island/yas-bay/stellar-by-elie-saab",
      image: '/images/banners/stellar-banner.webp',
      bannerpropertyid: '',
      bannerunittype: '20',
      bannersubcommunityid: '',
      bannercommunityid: '',
      bannerdistrictid: '102625',
      bannercityid: '91823',
      bannerstateid: '91823',
      bannercountryid: '65946',
      bannerbedroom: '21937',
    },
    {
      title: t_slider('slides.hilton_residences.title'),
      type: "Apartment",
      developer_img: '/images/banners/emirates-developments-white-logo.svg',
      developer_img_mob: '/images/banners/emirates-developments-white-logo.svg',
      location: t_slider('slides.hilton_residences.location'),
      description: t_slider('slides.hilton_residences.description'),
      project_url: "/project/hilton-residences-registration",
      image: '/images/banners/hilton-banner.webp',
      bannerpropertyid: '25396',
      bannerunittype: '19',
      bannersubcommunityid: '',
      bannercommunityid: '',
      bannerdistrictid: '102625',
      bannercityid: '91823',
      bannerstateid: '91823',
      bannercountryid: '65946',
      bannerbedroom: '21935',
    },
    {
      name: "loyalty",
      loyaltyTitle: t_slider('slides.loyalty_program.title'),
      features: [
        t_slider('slides.loyalty_program.features.0'),
        t_slider('slides.loyalty_program.features.1'),
        t_slider('slides.loyalty_program.features.2'),
        t_slider('slides.loyalty_program.features.3'),
        t_slider('slides.loyalty_program.features.4'),
      ],
      img2: '/images/banners/Loyalty-gif.gif',
      developer_img: '/images/banners/loyalty-logo-new.webp',
      developer_img_mob: '/images/banners/loyalty-logo-3-mob.png',
      image: '/images/banners/loyalty-program-background-new.webp',
    }
  ];

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

      <div className={`relative ${outfit.className}`}>
        <HomeBanner slidePerView="1" slides={mainSliderData}></HomeBanner>
      </div>
      <div className={`bg-gray-50`}>
        <CitiesTab
          cities={citiesData}
        />
      </div>

      <div className="my-10 bg-white">
        <ListPropertyForm />
      </div>
      <div className="my-10 bg-gray-50 ">
        <WhyPSI />
      </div>
      <div className="container mx-auto my-10">
        <Calculator />
      </div>

      <div className="bg-gray-50 px-4">
        <ReportDownloadSection />
      </div>
      <div className="w-full bg-secondary-color py-10 text-gray-500" dir={isRTL ? "rtl" : "ltr"}>
        <div className="max-w-(--breakpoint-xl) mx-auto bg-center bg-cover py-10 px-5" style={{ backgroundImage: "url('/assets/images/about-us/pattern-1.png')", }}>
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
      <div className="w-full py-10 text-gray-500 text-center" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-3xl text-gray-900 mb-4">
            {t_awards("title")}
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto mb-12">{t_awards("desc")}</p>
        </div>
        <div className="w-full">
          <div className="container mx-auto px-4 md:px-8 relative mx-auto">
            <AwardSlider />
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