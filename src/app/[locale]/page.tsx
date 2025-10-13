
import SwiperSlider from "./_components/SwiperSliderHome";
import MainNavbar from './_components/MainNavbar';
import FeaturedProjects from './_components/FeaturedProjects';
import ListPropertyForm from './_components/ListPropertyForm';
import WhyPSI from './_components/WhyPSI';
import Calculator from'./mortgage-calculator/MortgageTabs';
import AwardSlider from '../[locale]/about-us/_components/AboutAwardsSlider';
import { Audrey, BrittanySignature } from "@/utils/fonts";
import { Montserrat, Open_Sans } from "next/font/google";
import AboutCounter from "../[locale]/about-us/_components/AboutCounter";
import ReportDownloadSection from "../[locale]/_components/ReportDownloadSection";
import PopupForm from "./_components/PopupForm";
import GoogleReviewSection from "./_components/GoogleReviewSection";
import GetTheAppSection from "./_components/GetTheAppSection";
import { Organization, WithContext } from "schema-dts";

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
},
{
    title: "Wadi Yemm by Modon",
    type: "Apartment",
    developer_img: '/images/banners/modon-white.webp',
    developer_img_mob:'/images/banners/modon-mobile.webp',
    location: 'Ras El Hekma',
    description:
    "Wadi Yemm is Modon’s first ultra-premium beachfront residential destination in Ras El Hekma, North Coast Egypt, offering smart-enabled apartments and spacious villas with sea or pool views. Residents enjoy direct beach access, lush parks, golf, equestrian trails, and wellness facilities in a Mediterranean-inspired community.",
    project_url: "/en/projects/ras-al-hekma/ras-al-hekma/ras-al-hekma/wadi-yemm",
    image: '/images/banners/wadiyem-banner.webp',
    bannerpropertyid: '24466',
    bannerunittype: '20',
    bannersubcommunityid: '63724',
    bannercommunityid: '63721',
    bannerdistrictid: '63720',
    bannercityid:'63719',
    bannerstateid:'63719',
    bannercountryid: '65948',
    bannerbedroom: '21935',

},
{
    title: "Ogami by SODIC",
    type: "Apartment",
    developer_img: '/images/banners/sodic-logo-white.png',
    developer_img_mob:'/images/banners/sodic-logo-black.png',
    location: "Ras El Hekma",
    description:
    "Located in Ras El Hekma, Ogami by SODIC is a 440-acre coastal retreat designed for relaxation, connection, and unforgettable summer moments. Inspired by Japan’s Ogami Island, the development blends Mediterranean charm with elegant design and curated amenities for every type of traveler.",
    project_url: "/en/projects/ras-al-hekma/ras-al-hekma/ras-al-hekma/ogami",
    image: '/images/banners/ogami-banner.webp',
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
    title: "Bashayer by Modon",
    type: "Apartment",
    developer_img: '/images/banners/modon-white.webp',
    developer_img_mob:'/images/banners/modon-mobile.webp',
    location: "Hudayriyat Island",
    description:
    "Bashayer Villas on Hudayriyat Island, Abu Dhabi, feature elegant 4- and 5-bedroom villas designed to embody peace, harmony, and the beauty of nature. More than just homes, they are a poetic reflection of serene living where sea, sky, and soul unite.",
    project_url: "/en/projects/abu-dhabi/hudayriyat-island/hudayriyat-island/bashayer-hudayriyat-island",
    image: '/images/banners/basayer-banner.webp',
    bannerpropertyid : '25351',
    bannerunittype : '20',
    bannersubcommunityid : '62081',
    bannercommunityid : '62080',
    bannerdistrictid : '102625',
    bannercityid : '91823',
    bannerstateid : '91823',
    bannercountryid : '65946',
    bannerbedroom : '21935',
},
// {
//     title: "Muheira",
//     type: "Apartment",
//     developer_img: '/images/banners/modon-white.webp',
//     location: "Maysan",
//     description:
//     "Muheira by Modon is a canal-side community in Maysan offering 1 to 3-bedroom apartments with premium finishes, laundry rooms, and staff quarters in larger units. It blends modern comfort with natural surroundings and easy access to key services.",
//     project_url: "",
//     image: '/images/banners/muheira.webp',
// },
// {
//     title: "Waldorf Astoria Residences Yas",
//     type: "Apartment",
//     developer_img: '/images/banners/icon-design-homepage-02.svg',
//     location: "Yas Island",
//     description:
//     "Developed by Aldar, Waldorf Astoria Residences Yas offers luxury 1 to 3-bedroom apartments on Yas Island, starting at AED 3.8M with a 60/40 payment plan. Handover is set for Q4 2028, near major entertainment attractions.",
//     project_url: "",
//     image: '/images/banners/waldorf-astoria-residences-banner.webp',
// },
// {
//     title: "Hudayriyat Island",
//     type: "Villa",
//     developer_img: '/images/banners/modon-white.webp',
//     location: "Hudayriyat Island",
//     description:
//     "Hudayriyat Island by Modon is a vast coastal development with luxury villas and mansions, offering resort-style living across 11.6 square miles. Communities like Nawayef and Al Naseem embrace nature, sport, and elegant design.",
//     project_url: "",
//     image: '/images/banners/hudayriyat-island.webp',
// },
// {
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
      {/* <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link> */}
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
        <section className="w-full bg-secondary-color py-10 text-gray-500">
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
        </section>
        <section className="w-full py-10 text-gray-500 text-center">
          <div className="max-w-(--breakpoint-xl) mx-auto">
              <h3 className={`text-darkblue font-bold text-xl md:text-4xl ${Audrey.className}`}>
              AWARDS-DRIVEN
                  <span className={`font-brittany text-orange font-light ${BrittanySignature.className} text-[#CE641D]`}>
                  Excellence</span>
              </h3>
              <p className="text-lg mt-5">We reaffirm our commitment to redefining real estate standards. Our dedication to innovation and unwavering client focus has earned us recognition in the industry. 
                  Explore our journey of accolades that inspire us to reach new pinnacles of success.</p>
          </div>            
          <section className="w-full">
              <div className="max-w-(--breakpoint-xl) relative mx-auto">
                  <AwardSlider slides={awards} />
              </div>
          </section>            
        </section>
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