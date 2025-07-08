
import SwiperSlider from "./_components/SwiperSliderHome";
import MainNavbar from './_components/MainNavbar';
import FeaturedProjects from './_components/FeaturedProjects';
import ListPropertyForm from './_components/ListPropertyForm';
import WhyPSI from './_components/WhyPSI';
import Calculator from'../[locale]/calculators/MortgageTabs';
import AwardSlider from '../[locale]/about-us/_components/AboutAwardsSlider';
import { Audrey, BrittanySignature } from "@/utils/fonts";
import { Montserrat, Open_Sans } from "next/font/google";
import AboutCounter from "../[locale]/about-us/_components/AboutCounter";
import ReportDownloadSection from "../[locale]/_components/ReportDownloadSection";
import PopupForm from "./_components/PopupForm";
import GoogleReviewSection from "./_components/GoogleReviewSection";
import GetTheAppSection from "./_components/GetTheAppSection";

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
    title: "Muheira",
    type: "Apartment",
    developer_img: '/images/banners/modon-white.webp',
    location: "Maysan",
    description:
    "Muheira by Modon is a canal-side community in Maysan offering 1 to 3-bedroom apartments with premium finishes, laundry rooms, and staff quarters in larger units. It blends modern comfort with natural surroundings and easy access to key services.",
    project_url: "",
    image: '/images/banners/muheira.webp',
},
{
    title: "Waldorf Astoria Residences Yas",
    type: "Apartment",
    developer_img: '/images/banners/icon-design-homepage-02.svg',
    location: "Yas Island",
    description:
    "Developed by Aldar, Waldorf Astoria Residences Yas offers luxury 1 to 3-bedroom apartments on Yas Island, starting at AED 3.8M with a 60/40 payment plan. Handover is set for Q4 2028, near major entertainment attractions.",
    project_url: "",
    image: '/images/banners/waldorf-astoria-residences-banner.webp',
},
{
    title: "Hudayriyat Island",
    type: "Villa",
    developer_img: '/images/banners/modon-white.webp',
    location: "Hudayriyat Island",
    description:
    "Hudayriyat Island by Modon is a vast coastal development with luxury villas and mansions, offering resort-style living across 11.6 square miles. Communities like Nawayef and Al Naseem embrace nature, sport, and elegant design.",
    project_url: "",
    image: '/images/banners/hudayriyat-island.webp',
},
{
    title: "Bayn by ORA",
    type: "Villa",
    developer_img: '/images/banners/ora-logo-white.png',
    location: "Ghantoot",
    description:
    "Bayn is a smart, green waterfront community in Ghantoot by ORA, set to house 32,000+ residents. With over 50% green space, it features parks, a marina, beach clubs, and retail, redefining sustainable coastal living.",
    project_url: "",
    image: '/images/banners/waldorf-astoria-residences-banner.webp',
},
{
    title: "The Wilds – Moringa Mansions",
    type: "Villa",
    developer_img: '/images/banners/the-wilds-moringa-mansions-white-logo.png',
    location: "Dubailand",
    description:
    "Moringa Mansions in Dubailand offers 38 exclusive 5- and 6-bedroom homes with pools, gardens, and elevators. Designed by Nabil Gholam Architects, each mansion combines luxury with lush park views.",
    project_url: "",
    image: '/images/banners/the-wilds-moringa-mansions-banner.webp',
},
{
    title: "Athlon",
    type: "Apartment",
    developer_img: '/images/banners/icon-design-homepage-02.svg',
    location: "Dubai",
    description:
    "Athlon by Aldar is Dubai’s first active wellness community, featuring 3 to 6-bedroom villas and townhouses. It integrates movement and health into daily life, supported by expert design and premium amenities.",
    project_url: "",
    image: '/images/banners/Athlon-banner-1.webp',
},
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
  return (
    <div>
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
        <section className="w-full bg-secondary-color py-10 text-[var(--color-gray-500)]">
          <div  className="max-w-screen-xl mx-auto bg-center bg-cover py-10 px-5" style={{ backgroundImage: "url('/assets/images/about-us/pattern-1.png')",}}>
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
        <section className="w-full py-10 text-[var(--color-gray-500)] text-center">
          <div className="max-w-screen-xl mx-auto">
              <h3 className={`text-darkblue font-bold text-xl md:text-4xl ${Audrey.className}`}>
              AWARDS-DRIVEN
                  <span className={`font-brittany text-orange font-light ${BrittanySignature.className} text-[#CE641D]`}>
                  Excellence</span>
              </h3>
              <p className="text-lg mt-5">We reaffirm our commitment to redefining real estate standards. Our dedication to innovation and unwavering client focus has earned us recognition in the industry. 
                  Explore our journey of accolades that inspire us to reach new pinnacles of success.</p>
          </div>            
          <section className="w-full">
              <div className="max-w-screen-xl relative mx-auto">
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