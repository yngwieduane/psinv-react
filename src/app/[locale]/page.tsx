
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
    title: "Ramhan Island",
    type: "Villa",
    developer_img: '/images/banners/eagle-hills-logo.svg',
    location: "Ramhan",
    description:
    "An island that some may think is a fantasy, but it is one of Abu Dhabi's modern masterpieces. Choose to live luxury and serenity in our breathtaking standalone beachfront villas, 3 - 7 bedrooms, meticulously crafted in the glamorous Maldivian style.",
    project_url: "",
    image: '/images/banners/eagle-hills-slider.webp',
},
{
    title: "Bloom Granada",
    type: "Villa",
    developer_img: '/images/banners/eagle-hills-logo.svg',
    location: "Zayed City",
    description:
    "The latest jewel in the prestigious Bloom Living project, perfectly situated in the heart of Zayed City, the bustling new downtown of Abu Dhabi.",
    project_url: "",
    image: '/images/banners/bloom-holding-slider.webp',
},
{
    title: "Saadiyat Lagoons",
    type: "Villa",
    developer_img: '/images/banners/eagle-hills-logo.svg',
    location: "Saddiyat Island",
    description:
    "Nestled in the heart of Abu Dhabi, the Saadiyat Lagoons is an upscale residential development Providing 4-6 BR Standalone villas With zero service charge.",
    project_url: "",
    image: '/images/banners/saadiyat-lagoons.jpg',
},
{
    title: "Gardenia Bay",
    type: "Villa",
    developer_img: '/images/banners/eagle-hills-logo.svg',
    location: "Yas Island",
    description:
    "Discover Gardenia: Aldar's latest masterpiece on Yas Island, Abu Dhabi. Gardenia offers a harmonious blend of luxurious apartments and elegant townhouses in a prime waterfront location that redefine your expectations of island living.",
    project_url: "",
    image: '/images/banners/aldar-slider.webp',
},
];
const citiesData = [
    {
      title: "Abu Dhabi",
      content: "#",
      image: '/images/gallery-1-new.webp',
      projects: [
        {
          title: "Al Reem Island",
          type: "APT | VI | TH | PH",
          image: '/images/gallery-1-new.webp',
        },
        {
          title: "Al Reem Island 2",
          type: "APT | VI | TH | PH",
          image: '/images/gallery-2-new.webp',
        },
        {
          title: "Al Reem Island 3",
          type: "APT | VI | TH | PH",
          image: '/images/gallery-3-new.webp',
        },
        {
          title: "Al Reem Island",
          type: "APT | VI | TH | PH",
          image: '/images/gallery-1-new.webp',
        },
        {
          title: "Al Reem Island 2",
          type: "APT | VI | TH | PH",
          image: '/images/gallery-2-new.webp',
        },
        {
          title: "Al Reem Island 3",
          type: "APT | VI | TH | PH",
          image: '/images/gallery-3-new.webp',
        },
      ],
    },
    {
      title: "Dubai",
      content: "#",
      image: '/images/gallery-2-new.webp',
      projects: [
        {
          title: "Dubai",
          type: "APT | VI | TH | PH",
          image: 'images/gallery-1-new.webp',
        },
        {
          title: "Dubai 2",
          type: "APT | VI | TH | PH",
          image: '/images/gallery-2-new.webp',
        },
        {
          title: "Dubai 3",
          type: "APT | VI | TH | PH",
          image: '/images/gallery-3-new.webp',
        },
      ],
    },
    {
      title: "Sharjah",
      content: "#",
      image: '/images/gallery-3-new.webp',
      projects: [
        {
          title: "Sharjah",
          type: "APT | VI | TH | PH",
          image: '/images/gallery-1-new.webp',
        },
        {
          title: "Sharjah 2",
          type: "APT | VI | TH | PH",
          image: '/images/gallery-2-new.webp',
        },
        {
          title: "Sharjah 3",
          type: "APT | VI | TH | PH",
          image: '/images/gallery-3-new.webp',
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
    </div>
  );
}