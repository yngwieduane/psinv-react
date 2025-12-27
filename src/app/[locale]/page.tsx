import ListPropertyForm from './_components/ListPropertyForm';
import WhyPSI from './_components/WhyPSI';
import Calculator from'./mortgage-calculator/MortgageTabs';
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

const mainSliderData = [
  {
    title: "Bashayer Residences",
    title_ar: "باشاير ريزيدنسز",
    type: "Apartment",
    developer_img: '/images/banners/modon-white.webp',
    developer_img_mob:'/images/banners/modon-white.webp',
    location: "Hudayriyat Island",
    location_ar: "جزيرة الحديريات",
    description:"Situated on Hudayriyat Island, Abu Dhabi, Bashayer Residences is a refined collection of waterfront apartments with modern layouts, elegant finishes, and expansive skyline views - enhanced by community amenities that elevate everyday living.",
    description_ar:"تقع «باشاير ريزيدنسز» في جزيرة الحديريات بأبوظبي، وهي مجموعة راقية من الشقق المطلة على الواجهة البحرية، تتميز بتصاميم عصرية وتشطيبات أنيقة وإطلالات واسعة على أفق المدينة، مدعومة بمرافق مجتمعية تعزز أسلوب الحياة اليومي.",
    project_url: "",
    image: '/images/banners/bashayer-residences-banner.webp',
    bannerpropertyid : '25477',
    bannerunittype : '19',
    bannersubcommunityid : '',
    bannercommunityid : '62080',
    bannerdistrictid : '102625',
    bannercityid : '91823',
    bannerstateid : '91823',
    bannercountryid : '65946',
    bannerbedroom : '21935',
},
{
    title: "Bashayer Villas",
    title_ar: "فلل باشاير",
    type: "Villa",
    developer_img: '/images/banners/modon-white.webp',
    developer_img_mob:'/images/banners/modon-white.webp',
    location: "Hudayriyat Island",
    location_ar: "جزيرة الحديريات",
    description:"Situated on Hudayriyat Island, Abu Dhabi, Bashayer Villas is a serene gated community where every villa features spacious interiors, elegant finishes, and seamless waterfront views. With an array of world-class amenities, it stands as a distinctive retreat designed for exceptional living.",
    description_ar:"تقع «فلل باشاير» في جزيرة الحديريات بأبوظبي، وهي مجتمع سكني مسوّر يتميز بالهدوء والخصوصية، حيث تتمتع كل فيلا بمساحات داخلية واسعة، وتشطيبات أنيقة، وإطلالات بانورامية على الواجهة البحرية. ومع مجموعة من المرافق العالمية المستوى، تُعد وجهة مميزة صُممت لتجربة سكنية استثنائية.",
    project_url: "/projects/abu-dhabi/hudayriyat-island/hudayriyat-island/bashayer-villas",
    image: '/images/banners/bashayer-villas-banner.webp',
    bannerpropertyid : '25351',
    bannerunittype : '20',
    bannersubcommunityid : '',
    bannercommunityid : '62080',
    bannerdistrictid : '102625',
    bannercityid : '91823',
    bannerstateid : '91823',
    bannercountryid : '65946',
    bannerbedroom : '21935',
},
{
    title: "Muheira 2",
    title_ar: "مُهيرة 2",
    type: "Apartment",
    developer_img: '/images/banners/modon-white.webp',
    developer_img_mob:'/images/banners/modon-white.webp',
    location: "Al Reem Island",
    location_ar: "جزيرة الريم",
    description:"Muheira comprises two thoughtfully designed residential towers located on Reem Island. Offering a perfect blend of modern living and waterfront tranquility, Muheira provides residents with the opportunity to experience urban vibrancy surrounded by natural beauty.",
    description_ar:"تتألف «مُهيرة» من برجين سكنيين صُمِّما بعناية على جزيرة الريم، حيث تجمع بين أسلوب الحياة العصري وهدوء الواجهة البحرية. وتمنح «مُهيرة» سكانها فرصة فريدة للاستمتاع بحيوية الحياة الحضرية وسط جمال الطبيعة الساحر.",
    project_url: "/projects/abu-dhabi/al-reem-island/maysan/muheira",
    image: '/images/banners/muheira-banner.webp',
    bannerpropertyid : '',
    bannerunittype : '19',
    bannersubcommunityid : '',
    bannercommunityid : '',
    bannerdistrictid : '102625',
    bannercityid : '91823',
    bannerstateid : '91823',
    bannercountryid : '65946',
    bannerbedroom : '21935',
},
{
    title: "Stellar By Elie Saab",
    title_ar: "ستيـلار من إيلي صعب",
    type: "Villa",
    developer_img: '/images/banners/emirates-developments-white-logo.svg',
    developer_img_mob:'/images/banners/emirates-developments-white-logo.svg',
    location: "Yas Island",
    location_ar: "جزيرة ياس",
    description:"Stellar By Elie Saab stands as a masterpiece of form and fluidity. Its sculpted design blends soft lines with refined geometry, creating a seamless connection between architecture and nature.",
    description_ar:"يُعد «ستيـلار من إيلي صعب» تحفة فنية في التصميم والانسيابية. فتصميمه المنحوت يمزج بين الخطوط الناعمة والهندسة الراقية، ليخلق تواصلاً سلساً بين العمارة والطبيعة.",
    project_url: "/projects/abu-dhabi/yas-island/yas-bay/stellar-by-elie-saab",
    image: '/images/banners/stellar-banner.webp',
    bannerpropertyid : '',
    bannerunittype : '20',
    bannersubcommunityid : '',
    bannercommunityid : '',
    bannerdistrictid : '102625',
    bannercityid : '91823',
    bannerstateid : '91823',
    bannercountryid : '65946',
    bannerbedroom : '21937',
},
{
    title: "Hilton Residences",
    title_ar: "هيلتون ريزيدنسز",
    type: "Apartment",
    developer_img: '/images/banners/emirates-developments-white-logo.svg',
    developer_img_mob:'/images/banners/emirates-developments-white-logo.svg',
    location: "Dubai",
    location_ar: "دبي",
    description:
    "Rising 38 floors above Jumeirah Lake Towers, Hilton Residences Dubai JLT reimagines urban luxury through the lens of Hilton’s timeless hospitality. Every detail reflects sophistication designed for modern city living.",
    description_ar:
    "يرتفع «هيلتون ريزيدنسز دبي جميرا ليك تاورز» على 38 طابقاً فوق أبراج بحيرات جميرا، ويعيد تصور الفخامة الحضرية من خلال خبرة الضيافة الخالدة لهيلتون. كل تفصيلة فيه تعكس الأناقة المصممة لتناسب أسلوب الحياة العصري في المدينة.",
    project_url: "/project/hilton-residences-registration",
    image: '/images/banners/hilton-banner.webp',
    bannerpropertyid : '25396',
    bannerunittype : '19',
    bannersubcommunityid : '',
    bannercommunityid : '',
    bannerdistrictid : '102625',
    bannercityid : '91823',
    bannerstateid : '91823',
    bannercountryid : '65946',
    bannerbedroom : '21935',
},
  { 
    name:"loyalty",   
    loyaltyTitle: "Beyond Real Estate, Beyond Limits",
    loyaltyTitle_ar: "ما وراء العقارات، ما وراء الحدود",
    features: [
      "Exclusive discounts on furniture, landscaping, smart tech, tourism, and more",
      "B2B partnerships adding value beyond the sale",
      "Easy client registration via direct sign-up",
      "Boosts satisfaction, loyalty, and partner exposure",
      "Scalable with revenue potential through partner deals",
    ],
    features_ar: [
      "خصومات حصرية على الأثاث، وتصميم الحدائق، والتقنيات الذكية، والسياحة، والمزيد",
      "شراكات B2B تضيف قيمة تتجاوز البيع",
      "تسجيل العملاء بسهولة عبر الاشتراك المباشر",
      "يعزز الرضا، والولاء، وكشف الشركاء",
      "قابل للتوسع مع إمكانية تحقيق إيرادات من خلال صفقات الشركاء",
    ],
    img2: '/images/banners/Loyalty-gif.gif',
    developer_img: '/images/banners/loyalty-logo-new.webp',
    developer_img_mob: '/images/banners/loyalty-logo-3-mob.png',
    image: '/images/banners/loyalty-program-background-new.webp',
}
];
const citiesData = [
    {
      title: "Abu Dhabi", 
      title_ar: "أبوظبي",
      id: "26792",
      content: "#",
      image: '/images/gallery-1-new.webp',
      projects: [
        {
          title: "Al Reem Island", title_ar: "جزيرة الريم",
          type: "APT | VI | TH | PH",
          image: '/images/projects/al-reem-island.webp',
          project_url: '/projects/abu-dhabi/al-reem-island',
        },
        {
          title: "Saadiyat Island", title_ar: "جزيرة السعديات",
          type: "APT | VI | TH | PH",
          image: '/images/projects/saadiyat-island.webp',
          project_url: '/projects/abu-dhabi/saadiyat-island',
        },
        {
          title: "Yas Island", title_ar: "جزيرة ياس",
          type: "APT | VI | TH | PH",
          image: '/images/projects/yas-island.webp',
          project_url: '/projects/abu-dhabi/yas-island',
        },
        {
          title: "Al Raha Beach", title_ar: "شاطئ الراحة",
          type: "APT | VI | TH | PH",
          image: '/images/projects/al-raha-beach.webp',
          project_url: '/projects/abu-dhabi/al-raha-beach',
        },
      ],
    },
    {
      title: "Dubai", title_ar: "دبي",
      id: "26786",
      content: "#",
      image: '/images/gallery-2-new.webp',
      projects: [
        {
          title: "Palm Jumeirah", title_ar: "نخلة جميرا",
          type: "APT | VI | TH | PH",
          image: '/images/projects/palm-jumeriah.webp',
          project_url: '/projects/dubai/the-palm-jumeirah',
        },
        {
          title: "Downtown Dubai", title_ar: "وسط مدينة دبي",
          type: "APT | VI | TH | PH",
          image: '/images/projects/dubai-downtown.webp',
          project_url: '/projects/dubai/downtown-dubai',
        },
         {
          title: "Dubai Creek", title_ar: "خور دبي",
          type: "APT | VI | TH | PH",
          image: '/images/projects/dubai-creek.webp',
          project_url: '/projects/dubai/dubai-creek',
        },
        {
          title: "Town Square Dubai", title_ar: "تاون سكوير دبي",
          type: "APT | VI | TH | PH",
          image: '/images/projects/townsquare-dubai.webp',
          project_url: '/projects/dubai/town-square-dubai',
        },
      ],
    },
    {
      title: "Sharjah", title_ar: "الشارقة",
      id: "26953",
      content: "#",
      image: '/images/gallery-3-new.webp',
      projects: [
        {
          title: "Al Khan", title_ar: "الخان",
          type: "APT | VI | TH | PH",
          image: '/images/projects/al-khan.webp',
          project_url: '/projects/sharjah/al-khan',
        },
        {
          title: "Sharjah Waterfront City", title_ar: "مدينة الواجهة البحرية بالشارقة",
          type: "APT | VI | TH | PH",
          image: '/images/projects/sharjah-waterfront.webp',
          project_url: '/projects/sharjah/sharjah-waterfront-city',
        },
        {
          title: "Aljada", title_ar: "الجادّة",
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

  const locale = useLocale();
  const isRTL = locale.toLowerCase().startsWith("ar");
  const t = useTranslations("RealEstatePartner");
  const t_awards = useTranslations("AwardsSectionHome");

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
        {/* <div className="relative">
            <SwiperSlider slidePerView="1" slides={mainSliderData}></SwiperSlider>
        </div> */}
        <div className={`relative ${outfit.className}`}>
            <HomeBanner slidePerView="1" slides={mainSliderData}></HomeBanner>
        </div>
        <div className={`bg-gray-50`}>
            <CitiesTab
            cities={citiesData}
            />
        </div>
        
        <div className="my-10 bg-white">
            <ListPropertyForm/>
        </div>
        <div className="my-10 bg-gray-50 ">
            <WhyPSI/>
        </div>
        <div className="container mx-auto my-10">
            <Calculator/>
        </div>        
        
        <div className="bg-gray-50 px-4">
           <ReportDownloadSection />
        </div>
        <div className="w-full bg-secondary-color py-10 text-gray-500" dir={isRTL ? "rtl" : "ltr"}>
          <div  className="max-w-(--breakpoint-xl) mx-auto bg-center bg-cover py-10 px-5" style={{ backgroundImage: "url('/assets/images/about-us/pattern-1.png')",}}>
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