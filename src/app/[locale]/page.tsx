
//import SwiperSlider from "./_components/SwiperSliderHome";
//import MainNavbar from './_components/MainNavbar';
//import FeaturedProjects from './_components/FeaturedProjects';
//import ListPropertyForm from './_components/ListPropertyForm';
//import WhyPSI from './_components/WhyPSI';
//import Calculator from'./mortgage-calculator/MortgageTabs';
//import AwardSlider from '../[locale]/about-us/_components/AboutAwardsSlider';
//import AboutCounter from "../[locale]/about-us/_components/AboutCounter";
//import ReportDownloadSection from "../[locale]/_components/ReportDownloadSection";
//import GoogleReviewSection from "./_components/GoogleReviewSection";
//import GetTheAppSection from "./_components/GetTheAppSection";
import dynamic from "next/dynamic";
import { Organization, WithContext } from "schema-dts";
import { Audrey, BrittanySignature } from "@/utils/fonts";
import { Montserrat, Open_Sans } from "next/font/google";


const SwiperSlider = dynamic(() => import('./_components/SwiperSliderHome'));
const MainNavbar = dynamic(() => import('./_components/MainNavbar'));
const FeaturedProjects = dynamic(() => import('./_components/FeaturedProjects'));
const ListPropertyForm = dynamic(() => import('./_components/ListPropertyForm'));
const WhyPSI = dynamic(() => import('./_components/WhyPSI'));
const Calculator = dynamic(() => import('./mortgage-calculator/MortgageTabs'));
const AwardSlider = dynamic(() => import('../[locale]/about-us/_components/AboutAwardsSlider'));
const AboutCounter = dynamic(() => import('../[locale]/about-us/_components/AboutCounter'));
const ReportDownloadSection = dynamic(() => import('../[locale]/_components/ReportDownloadSection'));
const GoogleReviewSection = dynamic(() => import('./_components/GoogleReviewSection'));
const GetTheAppSection = dynamic(() => import('./_components/GetTheAppSection'));

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});
const awards = [
  {
      "title1":"ALDAR",
      "title2":"TOP PERFORMING",
      "title3": "Agency First Place - 2016",
      "image": "aldar-2016.jpg",
  },
  {
      "title1":"ALDAR",
      "title2":"TOP PERFORMING",
      "title3": "Agency First Place - 2022",
      "image": "aldar-2022.jpg",
  },
  {
      "title1":"ALDAR",
      "title2":"TOP PERFORMING",
      "title3": "Agency First Place - 2023",
      "image": "aldar-2022.jpg",
  },
  {
      "title1":"ALDAR",
      "title2":"TOP PERFORMING",
      "title3": "Agency First Place - 2023",
      "image": "aldar-2022.jpg",
  }
];
const partners = [
  {
      "title":"Aldar",
      "image":"/assets/images/about-us/partners/aldar.jpg",
  },
  {
      "title":"Emaar",
      "image":"/assets/images/about-us/partners/emaar.jpg",
  },
  {
      "title":"Imkan",
      "image":"/assets/images/about-us/partners/imkan.jpg",
  },
  {
      "title":"Meraas",
      "image":"/assets/images/about-us/partners/meraas.jpg",
  },
  {
      "title":"Nshama",
      "image":"/assets/images/about-us/partners/nshama.jpg",
  },
  {
      "title":"Dubai Properties",
      "image":"/assets/images/about-us/partners/dubai-properties.jpg",
  },
  {
      "title":"Aabar",
      "image":"/assets/images/about-us/partners/aabar.jpg",
  },
  {
      "title":"Hydra",
      "image":"/assets/images/about-us/partners/hydra.jpg",
  },
]
const mainSliderData = [
{
    title: "Yas Island Living",
    type: "Apartment",
    developer_img: '/images/banners/aldar-logo.svg',
    developer_img_mob:'/images/banners/aldar-logo-black.svg',
    location: "Yas Island",
    description:
    "Yas Living by Aldar Properties offers a contemporary residential community in the heart of Yas Island. Designed for modern families, it features elegant homes with high-quality finishes, open layouts, and access to world-class leisure and entertainment destinations. Combining comfort, connectivity, and a vibrant island lifestyle, Yas Living is the ideal address for those seeking refined urban living in Abu Dhabi.",
    project_url: "/projects/abu-dhabi/yas-island/yas-island/yas-living",
    image: '/images/banners/yas-living-new-banner.webp',
    bannerpropertyid : '24034',
    bannerunittype : '19',
    bannersubcommunityid : '63724',
    bannercommunityid : '63721',
    bannerdistrictid : '63720',
    bannercityid : '63719',
    bannerstateid : '91823',
    bannercountryid : '65948',
    bannerbedroom : '21937',
},
{
    title: "Bloom Living - Malaga",
    type: "Villa",
    developer_img: '/images/banners/bloom-holding-logo.svg',
    developer_img_mob:'/images/banners/bloom-holding-logo-black.svg',
    location: "Zayed City",
    description:
    "Malaga marks the final phase of Bloom Living, a vibrant community inspired by Mediterranean charm. The development offers a selection of 3–6 bedroom villas designed for modern family living, combining privacy, comfort, and contemporary elegance. Surrounded by landscaped parks and tranquil lagoons, Málaga provides residents with a refined lifestyle in the heart of Abu Dhabi.",
    project_url: "/projects/abu-dhabi/yas-island/yas-island/yas-living",
    image: '/images/banners/bloom-living-malaga.webp',
    bannerpropertyid : '24034',
    bannerunittype : '19',
    bannersubcommunityid : '63724',
    bannercommunityid : '63721',
    bannerdistrictid : '63720',
    bannercityid : '63719',
    bannerstateid : '91823',
    bannercountryid : '65948',
    bannerbedroom : '21937',
},
{
    title: "Al Deem",
    type: "Villa",
    developer_img: '/images/banners/aldar-logo.svg',
    developer_img_mob:'/images/banners/aldar-logo-black.svg',
    location: "Yas Island",
    description:
    "Al Deem on Yas Island is a community created exclusively for Emirati families.It merges modern architecture with traditional values and green surroundings.Homes are designed for privacy, comfort, and strong family connections.Unique live-work units allow residents to combine business with home life.",
    project_url: "/projects/ras-al-hekma/ras-al-hekma/ras-al-hekma/ogami",
    image: '/images/banners/al-deem-banner.jpg',
    bannerpropertyid : '24034',
    bannerunittype : '19',
    bannersubcommunityid : '63724',
    bannercommunityid : '63721',
    bannerdistrictid : '63720',
    bannercityid : '63719',
    bannerstateid : '91823',
    bannercountryid : '65948',
    bannerbedroom : '21937',
},
{
    title: "Seamont",
    type: "Apartment",
    developer_img: '/images/banners/saas-hills-logo.png',
    developer_img_mob:'/images/banners/saas-hills-logo-black.png',
    location: "Al Reem Island",
    description:
    "Seamont on Al Reem Island combines elegant design with the serenity of waterfront living.Residences range from modern apartments to spacious townhouses and penthouses.Private terraces and garden spaces bring outdoor tranquility into daily life.The development blends luxury, comfort, and breathtaking sea views.",
    project_url: "/projects/ras-al-hekma/ras-al-hekma/ras-al-hekma/ogami",
    image: '/images/banners/Seamont-banner.webp',
    bannerpropertyid : '24034',
    bannerunittype : '19',
    bannersubcommunityid : '63724',
    bannercommunityid : '63721',
    bannerdistrictid : '63720',
    bannercityid : '63719',
    bannerstateid : '91823',
    bannercountryid : '65948',
    bannerbedroom : '21937',
},
  { 
    name:"loyalty",   
    loyaltyTitle: "Beyond Real Estate, Beyond Limits",
    features: [
      "Exclusive discounts on furniture, landscaping, smart tech, tourism, and more",
      "B2B partnerships adding value beyond the sale",
      "Easy client registration via direct sign-up",
      "Boosts satisfaction, loyalty, and partner exposure",
      "Scalable with revenue potential through partner deals",
    ],
    img2: '/images/banners/Loyalty-gif.gif',
    developer_img: '/images/banners/loyalty-logo-3.png',
    developer_img_mob: '/images/banners/loyalty-logo-3-mob.png',
    image: '/images/banners/loyalty-program-background-new.webp',
}
];
const citiesData = [
    {
      title: "Abu Dhabi",
      id: "26792",
      content: "#",
      image: '/images/gallery-1-new.webp',
      projects: [
        {
          title: "Al Reem Island",
          type: "APT | VI | TH | PH",
          image: '/images/projects/al-reem-island.webp',
          project_url: '/projects/abu-dhabi/al-reem-island',
        },
        {
          title: "Saadiyat Island",
          type: "APT | VI | TH | PH",
          image: '/images/projects/saadiyat-island.webp',
          project_url: '/projects/abu-dhabi/saadiyat-island',
        },
        {
          title: "Yas Island",
          type: "APT | VI | TH | PH",
          image: '/images/projects/yas-island.webp',
          project_url: '/projects/abu-dhabi/yas-island',
        },
        {
          title: "Al Raha Beach",
          type: "APT | VI | TH | PH",
          image: '/images/projects/al-raha-beach.webp',
          project_url: '/projects/abu-dhabi/al-raha-beach',
        },
      ],
    },
    {
      title: "Dubai",
      id: "26786",
      content: "#",
      image: '/images/gallery-2-new.webp',
      projects: [
        {
          title: "Palm Jumeirah",
          type: "APT | VI | TH | PH",
          image: '/images/projects/palm-jumeriah.webp',
          project_url: '/projects/dubai/the-palm-jumeirah',
        },
        {
          title: "Downtown Dubai",
          type: "APT | VI | TH | PH",
          image: '/images/projects/dubai-downtown.webp',
          project_url: '/projects/dubai/downtown-dubai',
        },
         {
          title: "Dubai Creek",
          type: "APT | VI | TH | PH",
          image: '/images/projects/dubai-creek.webp',
          project_url: '/projects/dubai/dubai-creek',
        },
        {
          title: "Town Square Dubai",
          type: "APT | VI | TH | PH",
          image: '/images/projects/townsquare-dubai.webp',
          project_url: '/projects/dubai/town-square-dubai',
        },
      ],
    },
    {
      title: "Sharjah",
      id: "26953",
      content: "#",
      image: '/images/gallery-3-new.webp',
      projects: [
        {
          title: "Al Khan",
          type: "APT | VI | TH | PH",
          image: '/images/projects/al-khan.webp',
          project_url: '/projects/sharjah/al-khan',
        },
        {
          title: "Sharjah Waterfront City",
          type: "APT | VI | TH | PH",
          image: '/images/projects/sharjah-waterfront.webp',
          project_url: '/projects/sharjah/sharjah-waterfront-city',
        },
        {
          title: "Aljada",
          type: "APT | VI | TH | PH",
          image: '/images/projects/aljada.webp',
          project_url: '/projects/sharjah/aljada',
        },
      ],
    },
  ];

export default function HomePage() {
  const organizationSchema: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://psinv.net",
    "logo": "/PSI-Logo.svg"
  }
  const organizationSchema1: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type" : "Organization",
    "name" : "Property Shop Investment",
    "url" : "https://psinv.net",
    "sameAs" : [ "https://www.facebook.com/PropertyShopInvestment","https://twitter.com/psinv","https://www.facebook.com/PropertyShopInvestment","https://www.instagram.com/property_shop_investment/","https://www.linkedin.com/company/property-shop-investment-llc","https://www.youtube.com/user/propertyshopabudhabi"]
  }
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
        <div className="relative">
            <SwiperSlider slidePerView="1" slides={mainSliderData}></SwiperSlider>
        </div>
        <div className="container mx-auto my-10">
            <MainNavbar
            cities={citiesData}
            />
        </div>
        <div className="container mx-auto my-10">
            <FeaturedProjects/>
        </div>
        <div className="container mx-auto my-10">
            <ListPropertyForm/>
        </div>
        <div className="container mx-auto my-10">
            <WhyPSI/>
        </div>
        <div className="container mx-auto my-10">
            <Calculator/>
        </div>
        <div className="w-full bg-secondary-color py-10 text-gray-500">
          <div  className="max-w-(--breakpoint-xl) mx-auto bg-center bg-cover py-10 px-5" style={{ backgroundImage: "url('/assets/images/about-us/pattern-1.png')",}}>
            {/* Heading */}
            <div className="text-center mt-[50px] mb-[70px]">
                <h3 className={`text-darkblue  font-bold text-xl md:text-4xl ${Audrey.className}`}>
                    YOUR TRUSTED{" "}
                    <span className={`font-brittany text-orange font-light ${BrittanySignature.className} text-[#CE641D]`}>
                    Real Estate
                    </span>{" "}
                    PARTNER
                </h3>
            </div>

            {/* script for counter working */}
            <AboutCounter />    

            {/* Counter Section */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-6 text-center counter1">
                <div>
                    <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="150">  0 </span>K</h4>
                    <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Customers</p>
                </div>
                <div>
                    <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="15"> 0</span></h4>
                    <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Languages</p>
                </div>
                <div>
                    <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}> +<span className="data-count" data-count="120"> 0</span></h4>
                    <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Projects</p>
                </div>
                <div className="hidden md:block">
                    <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="10"> 0</span></h4>
                    <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Location Worldwide</p>
                </div>
            </div>

            {/* Second Counter Section */}
            <div className="grid grid-cols-3 gap-6 text-center mt-10 counter2">
                <div>
                    <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}> +<span className="data-count" data-count="17"> 0</span></h4>
                    <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Years in Business</p>
                </div>
                <div>
                    <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="12"> 0 </span></h4>
                    <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Branches</p>
                </div>
                <div>
                    <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}> +<span className="data-count" data-count="700"> 0</span></h4>
                    <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Expert Employees</p>
                </div>
            </div>

            {/* Mobile Only - Location Worldwide */}
            <div className="mt-10 text-center md:hidden">
                <h4 className={`text-darkblue font-bold md:text-6xl text-4xl ${Audrey.className}`}><span className="data-count" data-count="10"> 0 </span></h4>
                <p className={`md:text-lg text-sm font-medium ${montserrat.className}`}>Location Worldwide</p>
            </div>
          </div>
        </div>
        <div className="w-full py-10 text-gray-500 text-center">
          <div className="max-w-(--breakpoint-xl) mx-auto">
              <h3 className={`text-darkblue font-bold text-xl md:text-4xl ${Audrey.className}`}>
              AWARDS-DRIVEN
                  <span className={`font-brittany text-orange font-light ${BrittanySignature.className} text-[#CE641D]`}>
                  Excellence</span>
              </h3>
              <p className="text-lg mt-5">We reaffirm our commitment to redefining real estate standards. Our dedication to innovation and unwavering client focus has earned us recognition in the industry. 
                  Explore our journey of accolades that inspire us to reach new pinnacles of success.</p>
          </div>            
          <div className="w-full">
              <div className="max-w-(--breakpoint-xl) relative mx-auto">
                  <AwardSlider slides={awards} />
              </div>
          </div>            
        </div>
        <div className="max-w-[1320px] mx-auto px-4 py-8">
           <ReportDownloadSection />
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