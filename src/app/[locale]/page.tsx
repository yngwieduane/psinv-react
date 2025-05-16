
import SwiperSlider from "./_components/SwiperSliderHome";
import MainNavbar from './_components/MainNavbar';
import FeaturedProjects from './_components/FeaturedProjects';
import ListPropertyForm from './_components/ListPropertyForm';
import WhyPSI from './_components/WhyPSI';
import Calculator from'../[locale]/calculators/MortgageTabs';

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
    </div>
  );
}