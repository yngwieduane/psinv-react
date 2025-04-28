"use client";

import { Audrey, BrittanySignature } from "@/utils/fonts";
import { Montserrat, Open_Sans } from "next/font/google"; 
import AboutCounter from "./_components/AboutCounter";
import AwardSlider from "./_components/AboutAwardsSlider";
import YoutubeVideo from "../_components/YoutubeVideo";
import PartnerSlider from "./_components/AboutPartnerSlider";
import AboutTextSlider from "./_components/AboutTextSlider";
import AboutCard from "./_components/AboutCard";
import LocationsSection from "./_components/LocationsSection";


const opensans = Open_Sans({
    variable: "--font-opensans",
    display:"swap",
    subsets: ["latin"],
  });

const montserrat = Montserrat({
    variable: "--font-montserrat",
    display:"swap",
    subsets: ["latin"],
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

const testimonialData = [
    {
        name:"Said Abu Laila",
        designation: "Chairman",
        text:"Since 2007, Property Shop Investment (PSI) has led the transformation of UAE's real estate. Moving into 2024, our goal is global recognition, driving innovation and exceeding investor expectations. We're committed to redefining real estate globally, aligning with our vision to lead and inspire across markets",
        image: '/assets/images/about-us/ceo-said-photo.png',
    },
    {
        name:"Firas Abu Laila",
        designation: "Chief Executive Officer",
        text:"PSI aligns with Abu Dhabi's growth and diversification goals, aiming to bolster its position as a top investment destination. Our global ambitions complement Abu Dhabi's vision, promising to surpass investor expectations and contribute to its economic prosperity",
        image: '/assets/images/about-us/ceo-mr-firas.jpg',
    },
    {
        name:"Amer Saadeh",
        designation: "Chief Executive Officer",
        text:"PSI aims to mirror Dubai's innovative spirit in real estate, contributing to its vision by attracting global investments and fostering economic growth. We're set to elevate Dubai's real estate market, enhancing investor confidence and setting new industry standards",
        image: '/assets/images/about-us/ceo-mr-amer.jpg',
    },
]

const aboutCardData = [
    { title: "United Arab Emirates", background: "/assets/images/about-us/uae-image.jpg" },
    { title: "India", background: "/assets/images/about-us/india-image.jpg" },
    { title: "USA", background: "/assets/images/about-us/usa-image.jpg" },
    { title: "Poland", background: "/assets/images/about-us/poland-image.jpg" },
    { title: "Romania", background: "/assets/images/about-us/romania-image.jpg"},
    { title: "United Kingdom", background: "/assets/images/about-us/uk-image.jpg" },
  ];

const DevPage = () => {
    return(
        <>
        <section className={`w-full relative py-5 ${opensans.className}`}>
            {/* Background Grid */}
            <div className="absolute inset-0 w-full h-full grid-bg z-0"></div>

            {/* Main Content */}
            <div className="relative md:flex mx-auto px-4 max-w-[1320px] items-center py-5 gap-10">
                {/* Left Content */}
                <div className="md:w-[60%] w-full relative z-10 py-20">
                    <h2 className={`text-[#CE641D] text-5xl md:text-6xl mb-2 aboutTitle ${BrittanySignature.className}`}> About </h2>
                    <h2 className="text-[var(--color-gray-900)] font-bold md:text-5xl text-4xl mb-6">Property Shop Investment</h2>
                    <div className="text-[var(--color-gray-500)] sm:text-lg text-xs mt-6">
                        <p className="mb-4">
                        Established in 2007{" "}
                        <span className="font-bold"> Property Shop Investment (PSI)</span> is
                        one of the leading real estate firms serving the entire UAE landscape.
                        Driven by passion for success, PSI has been awarded number 1 real
                        estate agent by key giant developers for the past years. PSI continues
                        to innovate and increase its services to ensure seamless and
                        comprehensive clients’ journeys.
                        </p>
                        <p className="mb-4">
                        <span className="font-bold">Property Shop Investment</span>, led by Mr.
                        Said Abu Laila, is Abu Dhabi&apos;s premier real estate company,
                        featuring a team of over 200 licensed professionals and specialized
                        sales teams across every area of Abu Dhabi and Dubai.
                        </p>
                        <p className="mb-4">
                        Since 2016, we have built a proven track record of excellence,
                        expanding to six branches in Abu Dhabi and partnering with leading
                        developer Aldar Properties. Our expertise encompasses a diverse range
                        of property types, including villas, penthouses, and apartments.
                        </p>
                        <p className="mb-4">
                        Our mission is to elevate real estate investments and build
                        generational wealth, while our vision is to transform the industry
                        into a catalyst for capital growth for investors, communities, and
                        nations.
                        </p>
                    </div>
                </div>

                {/* Right Image Section */}
                <div className="md:w-[40%] w-full relative z-10 ml-auto">
                    <div className="flex sm:gap-10 gap-4">
                        {/* Left Column */}
                        <div className="w-1/2 h-full pt-[100px] flex flex-col sm:gap-10 gap-3">
                        <div
                            className="sm:h-[250px] h-[100px] bg-cover bg-center rounded-xl"
                            style={{
                            backgroundImage:
                                "url('/assets/images/about-us/corporate-office.webp')",
                            }}
                        ></div>
                        <div
                            className="sm:h-[300px] h-[100px] bg-cover bg-center rounded-xl"
                            style={{
                            backgroundImage:
                                "url('/assets/images/about-us/main-office.webp')",
                            }}
                        ></div>
                        </div>

                        {/* Middle Column */}
                        <div className="w-1/2 h-full flex flex-col sm:gap-10 gap-3">
                        <div
                            className="sm:h-[300px] h-[100px] bg-cover bg-center rounded-xl"
                            style={{
                            backgroundImage:
                                "url('/assets/images/about-us/main-office.webp')",
                            }}
                        ></div>
                        <div
                            className="sm:h-[250px] h-[100px] flex-grow bg-cover bg-center rounded-xl"
                            style={{
                            backgroundImage: "url('/assets/images/about-us/psi-office.webp')",
                            }}
                        ></div>
                        </div>                        
                    </div>
                </div>
            </div>
        </section>

        <AboutTextSlider slides={testimonialData} />

        <section className={`w-full my-4 ${opensans.className}`}>
            <div className="max-w-screen-xl mx-auto px-4">
                <h2 className={`text-5xl color-[var(--color-gray-900)] mb-6 ${opensans.className} font-bold`}>Our Core Values</h2>
                <div className="w-full md:flex items-top gap-[50]">
                    <div className="md:w-2/3 text-[var(--color-gray-600)]">
                        <p className="sm:text-2xl text-lg leading-8 mt-0">Our strong reputation in the industry is founded on our continuous commitment to quality and excellence in all the services we provide. With a blend of vision, expertise, specialized teams, enthusiasm, and transparency, Property Shop Investment has established itself as a leading influencer in Abu Dhabi&apos;s real estate market.</p>
                        <p className="sm:text-lg text-xs text-xs leading-7">As an award-winning, full-service brokerage, Property Shop Investment is recognized for consistently exceeding expectations. We strive for the highest performance and have proudly held the title of &apos;Number One Real Estate Broker in Abu Dhabi&apos; for ten consecutive years. Our focus on delivering straightforward and dependable services to both corporate and private clients guarantee complete customer satisfaction.</p>
                        <p className="sm:text-lg text-xs text-xs leading-7">All our services are customized to meet individual client needs, and our dedication transforms promises into reality.</p>
                    </div>
                    <div className="md:w-1/3 flex flex-col gap-[15px] ps-5">
                        <div className="w-full">
                            <h5 className="color-[var(--color-gray-900)] mb-4 md:text-3xl sm:text-2xl text-xl font-bold">We Gather</h5>
                            <p className="sm:text-[16px] text-xs text-[var(--color-gray-600)]">Not only a slogan. We gather embodies everything we stand for in our culture, business philosophy and operations.</p>
                        </div>
                        <div className="w-full">
                            <h5 className="color-[var(--color-gray-900)] mb-4 md:text-3xl sm:text-2xl text-xl font-bold">Novelty</h5>
                            <p className="sm:text-[16px] text-xs text-[var(--color-gray-600)]">Devoted to originality in our services, efforts.</p>
                        </div>
                        
                        <div className="w-full">
                            <h5 className="color-[var(--color-gray-900)] mb-4 md:text-3xl sm:text-2xl text-xl font-bold">Accountability</h5>
                            <p className="sm:text-[16px] text-xs text-[var(--color-gray-600)]">Ensuring fairness, integrity, honesty, transparency, effectiveness and commitment to responsibility.</p>
                        </div>
                    </div>
                </div>  
            </div>                                      
        </section>

        <section className="w-full md:mb-20 mb-10 md:px-auto px-4"> 
            <div className="mx-auto max-w-screen-xl bg-cover bg-center sm:h-[500px] h-[200px] rounded-3xl" style={{backgroundImage: "url('/assets/images/about-us/awards-img.jpg')"}}>
            </div>
        </section>

        <section className="w-full bg-[#2C2D65] text-white">
            <div className="mx-auto max-w-screen-xl py-20 px-4">
                <h2 className="text-5xl mb-7">Our Services</h2>
                <p className="sm:text-lg text-xs text-xs leading-8 md:max-w-2/3">Our reputation rests on excellence, transparency, and visionary leadership. Property Shop Investment sets industry benchmarks as Abu Dhabi&apos;s real estate influencer.</p>
                <div className="md:grid lg:grid-cols-3 lg:grid-rows-2 md:grid-cols-2 md:grid-rows-3 block mt-15 gap-7">                
                    <div className="w-full flex justify-start gap-5">
                        <div className="w-1/3">
                            <span className="block w-[55px] h-[55px] flex items-center justify-center">
                                <svg width="39" height="40" viewBox="0 0 39 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32.5226 0.260986C32.8389 0.48694 32.9143 0.803276 32.9143 1.17987C32.8992 2.80673 32.9143 4.43361 32.9143 6.06048C32.9143 6.15086 32.9143 6.24123 32.9143 6.33161C32.8841 6.72326 32.6431 6.97937 32.2966 6.9643C31.9502 6.9643 31.7092 6.70821 31.6941 6.31656C31.6941 5.29223 31.6941 4.25284 31.6941 3.22852C31.6941 2.97243 31.6941 2.7013 31.6941 2.3699C31.5435 2.49041 31.4531 2.56573 31.3627 2.65611C27.5667 6.19606 23.4543 9.34434 18.8599 11.7846C15.9376 13.3362 12.8797 14.5714 9.61088 15.1589C8.70706 15.3246 7.80324 15.3999 6.89943 15.4903C6.41739 15.5355 6.13119 15.3095 6.10106 14.9329C6.086 14.5563 6.35716 14.3153 6.82413 14.2852C9.86697 14.0894 12.729 13.2458 15.5007 12.0407C19.5679 10.2632 23.2434 7.83798 26.693 5.05122C28.0789 3.93651 29.4044 2.76154 30.7451 1.60164L30.6999 1.51127C30.5945 1.51127 30.489 1.49622 30.3836 1.48116C29.2689 1.48116 28.1542 1.48116 27.0395 1.48116C26.693 1.48116 26.3767 1.43594 26.226 1.05935C26.0904 0.682765 26.3315 0.471877 26.5725 0.260986H32.5075H32.5226Z" fill="#fff"></path><path d="M0 31.8804C0.195827 31.1875 0.331381 30.4644 0.61759 29.8167C1.83774 27.045 4.71489 25.5085 7.75774 25.9454C10.6499 26.3672 12.9547 28.7623 13.3463 31.7298C13.8133 35.2999 11.2826 38.6741 7.75774 39.1863C4.00691 39.7285 0.617589 37.228 0.0752996 33.5374C0.0752996 33.432 0.0301272 33.3416 0 33.2512C0 32.7993 0 32.3324 0 31.8804ZM6.70329 27.0752C3.66045 27.0752 1.22015 29.5305 1.22015 32.5734C1.22015 35.5861 3.70564 38.0415 6.73343 38.0415C9.73108 38.0415 12.2015 35.5409 12.1864 32.5432C12.1714 29.5154 9.71601 27.0752 6.70329 27.0752Z" fill="#fff"></path><path d="M26.8137 34.9985H29.254V34.5165C29.254 26.2466 29.254 17.9917 29.254 9.72184C29.254 8.96866 29.4197 8.80298 30.1578 8.80298C31.5738 8.80298 32.9747 8.80298 34.3907 8.80298C35.2041 8.80298 35.3548 8.9536 35.3548 9.75197C35.3548 18.0068 35.3548 26.2617 35.3548 34.5015V34.9835C35.4903 34.9835 35.6108 34.9985 35.7314 34.9985C36.5749 34.9985 37.4335 34.9985 38.2771 34.9985C38.7591 34.9985 38.9851 35.2245 39.0002 35.6915C39.0002 36.6556 39.0002 37.6196 39.0002 38.5837C39.0002 39.0356 38.7591 39.2465 38.3072 39.2616C38.2319 39.2616 38.1566 39.2616 38.0813 39.2616C29.721 39.2616 21.3607 39.2616 12.9853 39.2616C12.3677 39.2616 12.0665 39.0657 12.0514 38.659C12.0514 38.2372 12.3527 38.0414 12.9853 38.0414C21.0895 38.0414 29.1787 38.0414 37.2829 38.0414H37.7499V36.2187H37.2678C29.8565 36.2187 22.4453 36.2187 15.034 36.2187C14.9135 36.2187 14.7779 36.2187 14.6574 36.2187C14.2959 36.1886 14.0548 35.9475 14.0548 35.6011C14.0548 35.2546 14.2959 35.0136 14.6574 34.9985C15.3051 34.9985 15.9528 34.9985 16.6006 34.9985C16.7362 34.9985 16.8717 34.9985 17.0224 34.9985V17.3591H13.3921V17.7658C13.3921 20.6128 13.3921 23.4598 13.3921 26.2918C13.3921 26.4123 13.3921 26.5479 13.3921 26.6684C13.3318 26.9998 13.1209 27.1956 12.7895 27.1956C12.4581 27.1956 12.2472 26.9998 12.187 26.6684C12.1719 26.5629 12.187 26.4726 12.187 26.3671C12.187 23.2339 12.187 20.1007 12.187 16.9674C12.187 16.2896 12.3677 16.1088 13.0456 16.1088C14.5218 16.1088 15.983 16.1088 17.4592 16.1088C18.0768 16.1088 18.2726 16.3046 18.2726 16.9373C18.2726 22.782 18.2726 28.6417 18.2726 34.4864V34.9684H20.713V34.5316C20.713 27.4818 20.713 20.4471 20.713 13.3974C20.713 12.599 20.8636 12.4484 21.677 12.4484C23.1081 12.4484 24.5391 12.4484 25.9852 12.4484C26.6329 12.4484 26.8137 12.6442 26.8137 13.2919C26.8137 20.3567 26.8137 27.4366 26.8137 34.5015V34.9835V34.9985ZM30.4892 10.0382V34.9684H34.1045V10.0382H30.4892ZM25.5634 34.9835V13.6986H21.9482V34.9835H25.5634Z" fill="#fff"></path><path d="M8.54065 20.3865H4.88018C4.88018 20.5371 4.88018 20.6727 4.88018 20.8083C4.88018 21.9682 4.88018 23.113 4.88018 24.2729C4.88018 24.7098 4.62409 24.996 4.26257 24.9809C3.91611 24.9809 3.66003 24.7098 3.66003 24.288C3.66003 22.7967 3.66003 21.3205 3.66003 19.8292C3.66003 19.3622 3.90105 19.1362 4.36802 19.1362C5.93464 19.1362 7.48619 19.1362 9.0528 19.1362C9.51977 19.1362 9.74574 19.3622 9.74574 19.8442C9.74574 21.3205 9.74574 22.7816 9.74574 24.2579C9.74574 24.6947 9.48965 24.9809 9.12812 24.9658C8.7666 24.9658 8.52557 24.6796 8.52557 24.2277C8.52557 22.9473 8.52557 21.6669 8.52557 20.3564L8.54065 20.3865Z" fill="#fff"></path><path d="M6.08565 34.8925V33.2355C5.67893 32.9944 5.25716 32.8438 4.94082 32.5727C3.73573 31.4881 4.20269 29.5298 5.7693 29.0478C5.935 29.0026 6.08564 28.9724 6.13084 28.7465C6.19109 28.4753 6.40197 28.3247 6.68818 28.3247C6.97439 28.3247 7.18529 28.4603 7.2606 28.7314C7.3058 28.9272 7.41124 28.9724 7.59201 29.0176C8.37531 29.2134 8.93267 29.6654 9.09836 30.4939C9.18875 30.9307 8.99293 31.2772 8.61634 31.3525C8.26988 31.4278 7.99873 31.2019 7.90835 30.75C7.8481 30.4186 7.62214 30.2981 7.32087 30.2227C7.32087 30.2981 7.3058 30.3432 7.29074 30.3884C7.29074 30.9156 7.29074 31.4579 7.29074 32.0002C7.42631 32.0454 7.53174 32.0756 7.65225 32.1057C8.541 32.3919 9.11342 33.1902 9.11342 34.1091C9.11342 35.0129 8.52594 35.8113 7.65225 36.0824C7.44136 36.1427 7.30581 36.2181 7.20036 36.444C7.12504 36.6248 6.83883 36.8055 6.65807 36.8055C6.47731 36.8055 6.23629 36.6097 6.11578 36.4289C6.01034 36.2632 5.93502 36.1879 5.73919 36.1276C4.98601 35.9318 4.44371 35.51 4.26294 34.7117C4.1575 34.2447 4.33826 33.8832 4.71485 33.8079C5.07638 33.7326 5.30233 33.9585 5.46803 34.4254C5.54335 34.6363 5.76931 34.8021 5.91995 34.9828C5.96514 34.9527 6.01033 34.9226 6.04046 34.8925H6.08565ZM6.07059 30.2679C5.66387 30.4186 5.45299 30.7047 5.48311 31.0964C5.51324 31.4579 5.694 31.714 6.07059 31.8496V30.2679ZM7.33593 33.2806V34.8925C7.71252 34.7268 7.90835 34.4706 7.90835 34.094C7.90835 33.7175 7.74264 33.4313 7.33593 33.2656V33.2806Z" fill="#fff"></path>
                                </svg>
                            </span>
                        </div>
                        <div>
                            <h3 className="xl:text-2xl lg:text-lg text-2xl font-bold">Sales</h3>
                            <p className="text-md leading-loose">Our sales team serves as your trusted guide, simplifying the complex property market. From negotiations to legalities, we ensure fair deals and protect your interests, providing tailored advice to match your financial needs.</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-start gap-5">
                        <div className="w-1/3">
                            <span className="block w-[55px] h-[55px] flex items-center justify-center">
                                <svg width="39" height="26" viewBox="0 0 39 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39 24.6845C38.8309 25.0349 38.5651 25.1556 38.1664 25.1556C25.7106 25.1556 13.2669 25.1556 0.811132 25.1556C0.219149 25.1556 -0.0224925 24.9503 0.00167001 24.3583C0.0620764 22.6911 0.219127 21.048 0.750703 19.4533C1.18563 18.1485 2.05549 17.327 3.32402 16.8437C4.33885 16.4692 5.32953 16.0464 6.32019 15.6356C6.45308 15.5752 6.59805 15.4182 6.64637 15.2732C6.80343 14.7295 6.8276 14.2583 6.39268 13.7388C5.88526 13.1468 5.54696 12.3978 5.12412 11.7213C5.02747 11.5642 4.90666 11.383 4.7496 11.2863C3.75894 10.6339 3.10657 9.05132 3.44484 7.98817C3.52941 7.7103 3.69855 7.43242 3.90394 7.21495C4.06099 7.04581 4.09723 6.90084 4.08515 6.68337C4.00058 5.60814 4.03683 4.55707 4.508 3.55433C4.82211 2.88986 5.24493 2.30998 5.83691 1.87505C6.03021 1.73008 6.15106 1.57299 6.17522 1.31929C6.21147 0.799792 6.48933 0.473613 6.99674 0.3528C7.46791 0.244069 7.93906 0.0991052 8.41023 0.0628614C10.017 -0.0700326 11.6118 -0.00965276 13.1703 0.413192C15.1878 0.981011 16.3355 2.38245 16.6013 4.42418C16.7221 5.3182 16.5772 6.23637 16.5772 7.14247C16.5772 7.34785 16.5772 7.57741 16.6376 7.75862C17.0604 8.89426 16.4564 10.5615 15.357 11.2743C15.2241 11.3588 15.1153 11.5159 15.0308 11.6609C14.5959 12.3374 14.1972 13.0502 13.726 13.7026C13.5569 13.9442 13.4602 14.1496 13.4844 14.4517C13.581 15.5269 13.5689 15.5269 14.5717 15.9497C15.3328 16.2638 16.0819 16.6263 16.8551 16.88C18.1357 17.3149 18.8968 18.1848 19.3076 19.4291C19.4405 19.8399 19.5613 20.2507 19.7062 20.7097C19.9358 19.8882 20.1291 19.1029 20.3586 18.3418C20.4915 17.8827 20.6365 17.4236 20.8298 16.9766C21.1197 16.288 21.6513 15.8047 22.3037 15.4423C22.497 15.3336 22.6782 15.1403 22.7749 14.947C23.234 14.0288 23.4635 13.0382 23.391 11.9992C23.379 11.7817 23.3306 11.5521 23.2581 11.3347C22.4608 8.91842 22.2796 6.50216 23.089 4.04967C23.3548 3.26438 23.8018 2.58782 24.5266 2.1529C24.5991 2.10457 24.6716 2.04417 24.7079 1.97169C25.5898 0.497771 26.9912 0.0266028 28.5739 0.123253C32.005 0.328635 34.6628 2.90195 35.1099 6.35719C35.3152 7.97608 35.2065 9.54663 34.5662 11.0568C33.9017 12.6274 34.24 14.0288 35.3032 15.2973C35.3877 15.4061 35.4844 15.5148 35.6052 15.5873C36.6321 16.2155 37.1999 17.1458 37.4778 18.2935C37.9369 20.2265 38.4322 22.1595 38.9155 24.0804C38.9275 24.1529 38.9638 24.2133 39 24.2858V24.6724V24.6845ZM5.17245 23.8871H14.8858C14.8858 23.7905 14.91 23.718 14.91 23.6455C14.91 22.981 14.91 22.3286 14.91 21.6642C14.91 21.3138 15.1878 21.0601 15.514 21.048C15.8402 21.048 16.106 21.2896 16.1423 21.64C16.1544 21.8091 16.1423 21.9662 16.1423 22.1353C16.1423 22.7152 16.1423 23.2951 16.1423 23.8871H18.788C18.7276 23.3556 18.7277 22.8481 18.6189 22.3528C18.4256 21.3984 18.2081 20.4439 17.9303 19.5137C17.7249 18.8371 17.2175 18.3902 16.5409 18.1485C16.0577 17.9673 15.5744 17.7619 15.0912 17.5686C14.4871 17.3149 13.871 17.0733 13.2427 16.8075C13.1582 16.9404 13.0736 17.0612 13.0011 17.1699C12.2159 18.4747 11.4185 19.7674 10.6332 21.0722C10.2466 21.7004 9.73917 21.7004 9.35257 21.0722C8.54312 19.7432 7.72162 18.4143 6.92425 17.0733C6.80344 16.8679 6.69472 16.8317 6.47725 16.9283C5.49867 17.3511 4.52008 17.7619 3.52942 18.1364C2.73205 18.4385 2.17632 18.958 1.94677 19.7674C1.71723 20.5648 1.54808 21.3863 1.4031 22.2078C1.30645 22.7636 1.2823 23.3314 1.22189 23.8992H3.86769C3.86769 23.1985 3.86769 22.5098 3.86769 21.8333C3.86769 21.3621 4.10929 21.0722 4.48381 21.0722C4.87041 21.0722 5.12412 21.3621 5.12412 21.8574C5.12412 22.534 5.12412 23.1985 5.12412 23.9113L5.17245 23.8871ZM37.5744 23.8871C37.0791 21.9179 36.62 19.9849 36.0884 18.076C35.8951 17.3632 35.3877 16.8437 34.6991 16.5417C34.3367 16.3846 33.9621 16.2759 33.5876 16.1551C32.754 15.8893 31.9083 15.6235 31.0143 15.3457C30.5673 16.1309 30.072 16.9887 29.6008 17.8706C29.4921 18.076 29.4075 18.3418 29.4075 18.5834C29.3954 20.2023 29.4075 21.8333 29.4075 23.4522C29.4075 23.5851 29.4075 23.7301 29.4075 23.875H33.6722C33.6722 23.271 33.6722 22.679 33.6722 22.0991C33.6722 21.35 33.8534 21.048 34.2883 21.0359C34.7474 21.0359 34.9286 21.338 34.9286 22.1232C34.9286 22.7031 34.9286 23.2831 34.9286 23.8871H37.5744ZM7.68538 4.85913C7.51624 5.28197 7.38332 5.65649 7.23834 6.03101C6.83966 7.08208 6.4893 8.10899 6.74301 9.28088C6.8759 9.87286 6.74301 10.489 6.33225 11.0085C6.28392 11.0689 6.27185 11.2018 6.3081 11.2743C6.75511 12.277 7.34707 13.159 8.25317 13.8114C9.18342 14.4879 10.1741 14.5724 11.201 14.0771C12.4333 13.4851 13.2428 12.4703 13.7985 11.2501C13.8347 11.1655 13.7864 11.0206 13.7502 10.9239C13.6414 10.5977 13.4481 10.2957 13.424 9.96948C13.3394 8.90633 13.3273 7.8432 13.2911 6.78004C13.2911 6.63507 13.2911 6.4901 13.2911 6.2968C11.2131 6.58675 9.40091 6.01893 7.70953 4.85913H7.68538ZM26.4114 15.4544C25.7469 15.6477 25.1307 15.8289 24.5146 16.0101C24.0313 16.1551 23.5481 16.288 23.0769 16.4813C22.4608 16.7229 22.0138 17.1337 21.8325 17.8103C21.5184 18.9821 21.1801 20.154 20.866 21.3259C20.6486 22.1716 20.4673 23.0173 20.262 23.875H22.6782C22.6782 23.7059 22.6782 23.573 22.6782 23.428C22.6782 22.8361 22.6782 22.232 22.6782 21.64C22.6782 21.3138 22.8715 21.0722 23.1735 21.0722C23.391 21.0722 23.6326 21.2172 23.8139 21.3621C23.9105 21.4467 23.9105 21.6641 23.9105 21.8212C23.9105 22.4978 23.9105 23.1864 23.9105 23.8871H28.1027C28.1148 23.8026 28.139 23.7421 28.139 23.6817C28.139 22.0628 28.139 20.4319 28.139 18.813C28.139 18.6922 28.0907 18.5713 28.0302 18.4626C27.692 17.8344 27.3416 17.2304 27.0033 16.6021C26.7859 16.2034 26.5926 15.7927 26.4114 15.4544ZM33.4547 14.802C33.3339 14.4396 33.2131 14.1496 33.1406 13.8597C32.8023 12.6515 33.0198 11.5038 33.4789 10.3682C34.1675 8.62848 34.1313 6.86462 33.5151 5.12492C32.6815 2.76907 30.4344 1.24682 28.0302 1.37972C27.0154 1.44012 26.1576 1.80255 25.6985 2.8053C25.6502 2.92611 25.5415 3.04692 25.4207 3.10733C24.7562 3.39728 24.4179 3.95301 24.2246 4.60539C23.5722 6.74378 23.7293 8.85801 24.4542 10.9602C24.5387 11.2018 24.5992 11.4434 24.6233 11.6971C24.72 12.6516 24.5871 13.5939 24.2971 14.5121C24.273 14.5845 24.2609 14.6691 24.2367 14.802C24.6112 14.6933 24.9495 14.6208 25.2636 14.5121C25.7348 14.3671 26.0489 14.0771 26.0489 13.5335C26.0489 13.316 26.0852 13.0985 26.1456 12.8932C26.2543 12.4582 26.2422 12.0717 25.9402 11.6971C25.6381 11.3226 25.5657 10.7548 24.9978 10.5856C24.9253 10.5615 24.8529 10.4406 24.8166 10.344C24.5992 9.60704 24.3575 8.87009 24.1884 8.12105C24.0917 7.71028 24.3213 7.43244 24.7079 7.23914C24.8166 7.17873 24.9374 7.04583 24.9616 6.92501C25.1066 6.06724 25.2394 5.1974 25.3603 4.32755C25.4086 4.00135 25.4328 3.68725 25.7831 3.54227C26.1335 3.3973 26.3872 3.59056 26.6288 3.80803C27.692 4.79869 28.9242 5.16115 30.3498 4.81079C30.9056 4.6779 31.4613 4.54502 32.0291 4.48461C32.5366 4.43629 32.754 4.62956 32.8265 5.13697C32.9111 5.75312 32.9231 6.36927 32.9956 6.9975C33.0077 7.15455 33.1285 7.29954 33.1889 7.45659C33.2735 7.69822 33.4668 7.96401 33.4185 8.18148C33.2735 8.87011 33.044 9.54665 32.8144 10.2111C32.754 10.3923 32.597 10.6098 32.4399 10.6581C32.1137 10.7669 31.9808 11.0085 31.8479 11.2863C31.7634 11.4555 31.6909 11.6488 31.558 11.7817C31.0626 12.2408 31.1835 12.7482 31.3164 13.3281C31.4613 13.9805 31.8479 14.3067 32.4278 14.5C32.754 14.6087 33.0802 14.6812 33.4668 14.7899L33.4547 14.802ZM26.5201 5.34237C26.4355 5.84978 26.3751 6.32094 26.2664 6.76795C26.1093 7.42034 26.0972 8.12106 25.6502 8.70096C25.5536 8.82177 25.6986 9.32919 25.8435 9.37751C26.363 9.57081 26.4597 10.042 26.7013 10.4286C27.0396 10.9722 27.3899 11.528 27.8369 11.975C28.3927 12.5307 28.9726 12.5066 29.6249 12.0354C29.8182 11.8904 30.0237 11.7334 30.1445 11.5401C30.4465 11.0931 30.6881 10.5977 30.9781 10.1507C31.1472 9.89699 31.3284 9.60706 31.5821 9.46209C31.9325 9.24463 32.0654 8.8701 31.8358 8.50766C31.7392 8.3506 31.715 8.13314 31.715 7.93984C31.7029 7.23912 31.715 6.5384 31.715 5.77728C29.8666 6.22429 28.1511 6.44177 26.5201 5.34237ZM14.5354 6.9975C14.7287 6.93709 14.8617 6.86461 15.0066 6.85253C15.2966 6.82837 15.3932 6.6834 15.3932 6.40553C15.3932 5.83771 15.4415 5.2578 15.3691 4.70206C15.1758 3.28856 14.4992 2.17705 13.0857 1.6938C12.5179 1.5005 11.9017 1.40388 11.2977 1.34347C10.0895 1.23474 8.86932 1.12602 7.66119 1.42805C7.46789 1.47638 7.35916 1.54884 7.35916 1.77838C7.35916 2.17706 7.16588 2.45496 6.81553 2.67242C6.15106 3.08318 5.6678 3.67516 5.52282 4.43628C5.37785 5.18531 5.37785 5.97059 5.34161 6.73171C5.34161 6.82836 5.47448 6.93709 5.58321 7.10623C5.77651 6.50216 5.90942 5.99474 6.09064 5.51149C6.33227 4.89534 6.58596 4.29129 6.90007 3.71139C7.12961 3.27647 7.44375 3.24023 7.86659 3.49394C8.09614 3.62683 8.3136 3.7839 8.54314 3.91679C9.43716 4.46045 10.3553 4.97993 11.4185 5.04034C12.1313 5.08866 12.8561 5.04032 13.581 5.01615C14.2213 5.00407 14.4992 5.22156 14.5354 5.87395C14.5596 6.22431 14.5354 6.58672 14.5354 6.98541V6.9975ZM7.99947 15.1644C7.74576 15.6719 7.78201 16.0947 8.12029 16.5417C8.47065 17.0129 8.74851 17.5565 9.06263 18.0639C9.37674 18.5834 9.70294 19.115 10.0533 19.6828C10.15 19.5379 10.2224 19.4291 10.2828 19.3325C10.8748 18.3539 11.4305 17.3632 12.0709 16.4209C12.385 15.9497 12.3729 15.5269 12.2279 15.0074C10.8386 15.7806 9.42507 15.8772 8.01156 15.1765L7.99947 15.1644ZM27.3537 13.1469C27.3175 13.6059 27.1362 14.0409 27.2691 14.3308C27.6557 15.2249 28.1752 16.0584 28.6585 16.9525C29.1175 16.1309 29.5283 15.3457 30.0116 14.5966C30.3377 14.1013 30.1444 13.7147 29.9753 13.2435C29.0934 13.763 28.2598 13.7026 27.3537 13.1348V13.1469ZM5.35367 10.187C5.55905 9.48626 5.54699 8.88216 5.14831 8.3385C5.06374 8.21769 4.8946 8.15732 4.77379 8.07275C4.71338 8.21772 4.59257 8.35059 4.58048 8.49556C4.55632 9.14795 4.87042 9.65538 5.35367 10.1749V10.187ZM14.7287 10.199C15.1999 9.65537 15.514 9.14796 15.4899 8.50766C15.4899 8.36268 15.3691 8.22978 15.2966 8.08481C15.1758 8.16937 15.0187 8.21771 14.9341 8.32645C14.4992 8.8701 14.5354 9.47415 14.7287 10.199Z" fill="#fff"/></svg>
                            </span>
                        </div>
                        <div>
                            <h3 className="xl:text-2xl lg:text-lg text-2xl font-bold">Landlords</h3>
                            <p className="text-md leading-loose">Our listing teams, for sales and leasing, strategically maximize property value while prioritizing client confidentiality. Close collaboration with our marketing team ensures a robust inventory of property listings across the UAE.</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-start gap-5">
                        <div className="w-1/3">
                            <span className="block w-[55px] h-[55px] flex items-center justify-center">
                                <svg width="31" height="41" viewBox="0 0 31 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M27.5755 40.5225C26.6687 40.0828 25.762 39.657 24.869 39.2036C24.7454 39.1486 24.5943 39.0937 24.5393 38.9701C24.4569 38.7915 24.402 38.5579 24.402 38.3381C24.402 38.132 24.4981 37.926 24.5668 37.61C24.3745 37.61 24.1959 37.555 24.0448 37.61C23.2068 37.9534 22.3687 38.3518 21.517 38.6953C21.3109 38.7777 21.0499 38.7915 20.8575 38.6953C17.4642 37.1017 14.0846 35.508 10.705 33.9007C9.70215 33.4198 9.16637 32.3483 9.2488 31.0569C9.3587 29.532 10.5539 28.3917 11.6805 28.8176C12.6971 29.2022 13.6862 29.7243 14.6891 30.1914C14.8128 30.2463 14.9501 30.315 15.1013 30.3837C15.5958 29.0786 16.5712 28.9824 17.4917 28.7626C19.3875 28.323 21.2971 27.8834 23.193 27.4575C23.4128 27.4163 23.6601 27.4438 23.8662 27.5399C24.8966 28.007 25.8994 28.5016 26.9573 28.9962C27.0122 28.8038 27.0672 28.6115 27.1359 28.4329C27.2733 28.0208 27.5068 27.8696 27.8365 28.0208C28.7569 28.4466 29.6774 28.8725 30.5841 29.3259C30.7352 29.4083 30.8452 29.6144 30.9825 29.7655V30.1502C30.9413 30.2601 30.9001 30.3837 30.8589 30.5074C29.9934 33.6122 29.1279 36.7033 28.2487 39.7943C28.18 40.0554 28.0014 40.2614 27.864 40.495H27.5618L27.5755 40.5225ZM22.932 32.8841C20.9949 33.3237 19.0991 33.7908 17.2032 34.1892C16.0629 34.4365 15.06 33.4199 14.8952 31.9224C14.8952 31.8125 14.8128 31.6751 14.7578 31.6339C13.6862 31.1118 12.6146 30.5898 11.5293 30.1227C10.9523 29.8754 10.3891 30.3837 10.2792 31.1393C10.183 31.7713 10.499 32.4032 11.076 32.678C14.3869 34.2441 17.6977 35.8103 21.0086 37.3764C21.1323 37.4314 21.2971 37.4314 21.4345 37.3764C22.1489 37.0879 22.8633 36.7857 23.5502 36.4422C23.9898 36.2224 24.4157 36.0851 24.869 36.3873C24.869 36.3873 24.9103 36.3873 24.9515 36.3598C25.5148 34.3403 26.0918 32.3071 26.655 30.2464C25.5972 29.7518 24.5806 29.2572 23.5639 28.7901C23.4678 28.7489 23.3441 28.7901 23.248 28.7901C22.6297 28.9275 22.0115 29.0786 21.3933 29.216C19.8821 29.5594 18.3709 29.9029 16.8597 30.2464C16.1866 30.3975 15.8156 31.0569 15.9393 31.84C16.0492 32.5818 16.585 32.9802 17.2582 32.8291C18.5358 32.5269 19.8272 32.2384 21.1048 31.9361C21.6543 31.8125 22.2176 31.6888 22.7946 31.5652C22.8496 32.0186 22.9045 32.417 22.9595 32.8566L22.932 32.8841ZM27.9327 29.4633C27.1221 32.3758 26.3253 35.2195 25.5147 38.1183C26.1604 38.4205 26.7649 38.709 27.4106 39.025C28.2212 36.1263 29.018 33.2687 29.8285 30.37C29.1828 30.0678 28.5646 29.7792 27.9327 29.4633Z" fill="#fff"/><path d="M12.1747 11.3984C11.2543 12.6898 10.1003 13.3217 8.69896 13.1432C7.33889 12.9646 6.19861 12.3051 5.51171 10.5879C5.51171 10.9313 5.51171 11.2885 5.51171 11.632C5.51171 12.3051 5.34685 12.5112 4.8248 12.5112C3.58837 12.5112 2.35196 12.5112 1.11553 12.5112C0.634696 12.5112 0.456085 12.3051 0.456085 11.6732C0.456085 8.2936 0.456085 4.90028 0.456085 1.5207C0.456085 0.902487 0.634683 0.668945 1.10178 0.668945C2.35195 0.668945 3.58838 0.668945 4.83855 0.668945C5.33312 0.668945 5.498 0.888755 5.498 1.54818C5.498 1.89164 5.498 2.24881 5.498 2.68843C5.73155 2.63348 5.93761 2.61975 6.12994 2.52358C7.13282 1.98779 8.12196 1.4108 9.12484 0.861278C9.33091 0.751373 9.56448 0.682676 9.78429 0.682676C11.4329 0.668938 13.0952 0.682676 14.7437 0.682676C15.8016 0.682676 16.6946 1.14976 17.4364 2.11143C18.7553 3.84244 20.0879 5.55971 21.4067 7.29071C22.1211 8.22491 22.286 9.37891 21.8464 10.4505C21.4892 11.316 20.9259 11.7556 20.1703 11.7419C19.9642 11.7419 19.8681 11.8106 19.7994 12.0578C19.7032 12.3463 19.5933 12.6623 19.4284 12.8959C19.1949 13.2393 19.14 13.624 19.1537 14.0636C19.1674 14.9016 19.1537 15.7534 19.1537 16.5914C19.1537 18.24 18.8789 18.7208 17.6425 19.1605V19.5726C17.6425 21.5372 17.6425 23.5155 17.6425 25.48C17.6425 25.9334 17.5188 26.2219 17.2029 26.3867C16.9693 26.5104 16.7495 26.6615 16.5297 26.8263C16.2412 27.0461 15.9665 27.0324 15.678 26.8263C15.4856 26.689 15.2933 26.5516 15.0872 26.4417C14.7025 26.2493 14.5789 25.9059 14.5789 25.3838C14.5926 23.4605 14.5789 21.5509 14.5789 19.6276C14.5789 19.4902 14.5789 19.339 14.5789 19.1742C14.5102 19.1467 14.4553 19.1055 14.3866 19.0918C13.576 18.8994 13.0677 18.1576 13.0677 17.0585C13.0677 15.932 13.0677 14.8055 13.0677 13.6789C13.0677 13.5416 13.054 13.3904 12.999 13.2805C12.7242 12.6623 12.4357 12.0441 12.1335 11.4122L12.1747 11.3984ZM10.0865 5.28496C11.3917 5.28496 12.6693 5.28496 13.9469 5.28496C14.1118 5.28496 14.2904 5.23 14.4278 5.14757C16.7083 3.74628 19.4284 5.39486 20.0329 8.56837C20.1428 9.15911 20.1566 9.79106 20.2115 10.4093C20.6924 10.4093 21.0495 9.96965 21.0633 9.31022C21.077 8.84312 20.8984 8.49966 20.6649 8.18368C19.3597 6.49389 18.0547 4.79037 16.7495 3.10058C16.1863 2.35872 15.5131 2.00154 14.7163 2.01528C13.1501 2.01528 11.584 2.01528 10.0178 2.01528C9.78426 2.01528 9.52325 2.0977 9.30344 2.20761C8.03954 2.79835 6.88553 3.77374 5.52546 4.06224V9.24153C5.63536 9.24153 5.71778 9.24153 5.81395 9.24153C6.32226 9.24153 6.43216 9.35143 6.54207 10.0109C6.61076 10.4642 6.81686 10.7802 7.09163 11.0412C8.13572 12.0578 9.74306 12.1265 10.8421 11.2198C11.1856 10.9313 11.4878 10.6016 11.5702 10.0521C11.6801 9.35143 11.79 9.25528 12.3396 9.25528C13.4111 9.25528 14.4965 9.25528 15.568 9.25528C16.2275 9.25528 16.6808 8.65078 16.6396 7.84023C16.6121 7.12585 16.1588 6.61754 15.5268 6.61754C13.8233 6.61754 12.1198 6.61754 10.4162 6.61754C10.3063 6.61754 10.2102 6.61754 10.0865 6.61754V5.29869V5.28496ZM1.5002 2.02901V11.1649H4.48135V2.02901H1.5002ZM14.5514 13.2668C14.7575 13.3905 14.9498 13.4866 15.1284 13.5965C15.2795 13.6927 15.3894 13.6515 15.5268 13.5004C15.9664 13.0195 16.6121 13.1294 16.9556 13.7202C17.3128 14.3109 17.2166 15.1352 16.7495 15.5748C16.2824 16.0144 15.6642 15.8633 15.3345 15.2588C15.2796 15.1627 15.2246 15.0528 15.1559 15.0115C14.8262 14.8329 14.4964 14.6818 14.1393 14.5032C14.1393 15.3413 14.1393 16.1518 14.1393 16.9624C14.1393 17.5668 14.3179 17.8004 14.7987 17.8004C15.7054 17.8004 16.6121 17.8004 17.5189 17.8004C17.986 17.8004 18.1783 17.5668 18.1783 16.9624C18.1783 16.2068 18.1783 15.4649 18.1783 14.7093C18.1783 13.4179 18.1783 13.4317 17.2578 12.9096C16.3099 12.3738 15.4444 12.5387 14.5651 13.2668H14.5514ZM18.5355 12.2914C18.6042 12.154 18.6591 12.0578 18.7141 11.9479C18.9247 11.5175 18.8927 11.1282 18.6179 10.7802C18.2195 10.2582 17.8211 9.73611 17.3952 9.18658C16.8732 10.3406 16.0764 10.6291 15.1559 10.5741C14.6339 10.5466 14.098 10.5741 13.576 10.5741H13.0677C13.2875 11.2198 13.4798 11.7693 13.6722 12.3326C15.7466 10.9176 16.5297 10.9313 18.5217 12.3051L18.5355 12.2914ZM15.6505 19.133C15.6505 19.2704 15.6367 19.3803 15.6367 19.4902C15.6367 21.3036 15.6367 23.117 15.6367 24.9305C15.6367 25.2327 15.9252 25.5762 16.145 25.5762C16.3923 25.5762 16.6396 25.2327 16.6396 24.9167C16.6396 23.1033 16.6396 21.2899 16.6396 19.4764C16.6396 19.3665 16.6396 19.2566 16.6258 19.133H15.6505ZM19.1262 9.57125C19.0712 8.07379 18.1783 6.57634 17.2715 6.28784C17.4639 7.7166 18.3431 8.54089 19.1262 9.57125Z" fill="#fff"/></svg>
                            </span>
                        </div>
                        <div>
                            <h3 className="xl:text-2xl lg:text-lg text-2xl font-bold">Leasing</h3>
                            <p className="text-md leading-loose">Our listing teams, for sales and leasing, maximize property value with strict confidentiality. Collaborating closely with marketing ensures a vast inventory for your property needs.</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-start gap-5">
                        <div className="w-1/3">
                            <span className="block w-[55px] h-[55px] flex items-center justify-center">
                                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="24" height="24" fill="none"/>
                                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="white" />
                                    <path d="M3 9H21" stroke="white" />
                                    <rect x="6" y="13" width="4" height="4" stroke="white" />
                                    <path d="M12 13H18M12 17H18" stroke="white" />
                                </svg>
                            </span>
                        </div>
                        <div>
                            <h3 className="xl:text-2xl lg:text-lg text-2xl font-bold">Development Management</h3>
                            <p className="text-md leading-loose">PSI builds on best practices and trusted partners to deliver high-quality, innovative developments that provide lasting value for clients and investors, aiming to redefine the standards in quality, creativity, and client focus.</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-start gap-5">
                        <div className="w-1/3">
                            <span className="block w-[55px] h-[55px] flex items-center justify-center">
                                <svg width="45px" height="45px" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="45" height="45" fill="none"/>
                                    <path d="M2 30V35C2 36.5 3.5 38 5 38H10M35 38H40C41.5 38 43 36.5 43 35V30" stroke="white" 
                                    strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"/>
                                    <path  d="M22.5 10L10 22H15V32H30V22H35L22.5 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" 
                                    strokeLinejoin="round" />
                                    <path  d="M5 30C6 27 8 26 10 26H14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path  d="M40 30C39 27 37 26 35 26H31" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                        </div>
                        <div>
                            <h3 className="xl:text-2xl lg:text-lg text-2xl font-bold">Property Management</h3>
                            <p className="text-md leading-loose">PSI has a centralised property management department that manages residential, commercial, and industrial properties on behalf of owners to preserve the value of their property and maintaining promising returns on investments.</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-start gap-5">
                        <div className="w-1/3">
                            <span className="block w-[55px] h-[55px] flex items-center justify-center">
                            <svg width="40" height="39" viewBox="0 0 40 39" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_626_3073)"><path d="M23.6097 26.2798H24.8915V37.6907H26.1576V26.2955H27.4394V37.6907H28.7055V27.5616H29.9873V37.6907H31.269V27.5616H32.5352V37.7063H33.8169V25.0293H35.0987V37.7063H36.3648V23.1067H37.6466V37.7063H39.538V38.9568H1.38207V37.7375H3.24219V32.6574H4.52395V37.6907H5.80571V30.7347H7.07185V37.6907H8.35361V28.8277H9.63537V37.6907H10.9015V28.1868H12.1833V37.675H13.4494V29.4686H14.7312V37.6907H15.9973V30.0939H17.2791V37.675H18.5608V30.0939H19.827V37.6907H21.1087V28.2025H22.3905V37.7063H23.6566V26.2955L23.6097 26.2798Z" fill="#fff"/><path d="M22.8594 22.325C22.4217 22.4031 22.0466 22.4813 21.7183 22.5438C20.7336 20.0897 18.9672 18.167 17.5917 16.0256C16.8258 14.8376 15.9817 13.6809 15.2001 12.5085C15.0751 12.3209 14.9344 12.2584 14.7155 12.2584C13.0117 12.2584 11.3235 12.2584 9.61974 12.2584C9.38527 12.2584 9.26022 12.3366 9.13517 12.5242C7.27505 15.2284 5.41493 17.9482 3.55481 20.6524C2.1011 22.7783 2.33557 25.1542 4.16443 26.9674C4.19569 26.9987 4.22696 27.0456 4.28948 27.1081C4.02375 27.4207 3.75802 27.7334 3.49229 28.0616C2.3512 27.0925 1.67906 25.8889 1.44459 24.4508C1.17886 22.8252 1.55401 21.3558 2.47625 19.9959C4.36764 17.2604 6.24339 14.525 8.11914 11.7739C8.25982 11.5706 8.32235 11.3049 8.35361 11.0548C8.55682 9.81995 8.1973 8.77265 7.30631 7.8973C7.13437 7.72536 6.99369 7.50652 6.85301 7.28768C6.27465 6.42796 6.32154 5.33378 6.96243 4.55221C7.60331 3.77065 8.6975 3.50492 9.63537 3.92696C10.3857 4.27085 11.1047 4.646 11.8394 5.02115C12.0738 5.1462 12.2614 5.16183 12.4959 5.02115C13.1524 4.67726 13.8246 4.34901 14.4811 4.02075C15.5596 3.48929 16.6538 3.67686 17.3728 4.52095C18.0763 5.36504 18.0763 6.47486 17.3728 7.444C17.2791 7.58468 17.1853 7.74099 17.0602 7.85041C16.1692 8.74139 15.7941 9.78869 15.9973 11.0392C16.0286 11.258 16.0755 11.5081 16.2005 11.6957C18.0763 14.4468 19.9833 17.1666 21.8278 19.9334C22.2342 20.5274 22.4686 21.2308 22.7656 21.8873C22.8125 21.9967 22.8282 22.1374 22.8594 22.3093V22.325ZM12.152 8.42877C13.0117 8.42877 13.8714 8.42877 14.7312 8.42877C14.8875 8.42877 15.0907 8.31935 15.1845 8.20993C15.5909 7.70973 15.966 7.1939 16.3412 6.6937C16.7007 6.20913 16.7007 5.74019 16.3724 5.34941C16.0442 4.97426 15.5909 4.91173 15.0751 5.16183C14.2622 5.55261 13.465 5.95903 12.6678 6.38107C12.3083 6.56865 12.0113 6.55301 11.6518 6.38107C10.8546 5.95903 10.0418 5.56825 9.24459 5.16183C8.72876 4.91173 8.25982 4.98989 7.9472 5.38067C7.63457 5.75582 7.63457 6.22476 7.97846 6.6937C8.35361 7.20953 8.72876 7.72536 9.13517 8.20993C9.24459 8.33498 9.4478 8.4444 9.61974 8.4444C10.4638 8.47566 11.3235 8.4444 12.1676 8.4444L12.152 8.42877ZM9.651 9.72616V10.961H14.6843V9.72616H9.651Z" fill="#fff"/><path d="M30.55 24.8259C33.4105 22.1686 36.2398 19.5426 39.1003 16.8853C39.3817 17.1979 39.6474 17.4792 39.9444 17.8075C39.8662 17.9013 39.7881 17.9794 39.7099 18.0576C36.8807 20.6837 34.0514 23.3097 31.2221 25.9358C30.7845 26.3422 30.5969 26.3578 30.0654 26.0295C28.6586 25.1542 27.2518 24.2788 25.8606 23.3879C25.6262 23.2472 25.4855 23.2472 25.2666 23.4191C23.0314 25.1073 20.7961 26.7798 18.5608 28.468C18.1388 28.7806 17.7793 28.8432 17.2947 28.6243C15.1063 27.6865 12.9023 26.7798 10.6983 25.8576C10.4326 25.7482 10.245 25.7794 10.0262 25.9514C7.4001 28.0303 4.75842 30.0937 2.11673 32.1726C1.99168 32.2664 1.86663 32.3602 1.71032 32.4853C1.44459 32.157 1.19449 31.8287 0.928759 31.5005C1.1476 31.3285 1.3508 31.1722 1.53838 31.0159C4.21132 28.9057 6.8999 26.8111 9.57285 24.6853C9.97926 24.357 10.3388 24.3257 10.8077 24.5289C12.9961 25.4668 15.2001 26.3734 17.4041 27.2957C17.6698 27.4051 17.8574 27.4051 18.1075 27.2175C20.3741 25.4981 22.6562 23.7943 24.9384 22.0748C25.4073 21.7153 25.5324 21.7153 26.0482 22.0279C27.5332 22.9502 29.0181 23.8724 30.5344 24.8259H30.55Z" fill="#fff"/><path d="M30.6282 22.4187H29.362V18.636H27.4706V17.3699H29.3308V16.0881H27.4863V14.8063H29.3464V13.5402H27.4863V12.2584H29.3464V10.9767H27.4863V9.71053H29.3464V6.67807C26.8141 7.22516 24.2975 7.75662 21.7496 8.30372V12.2115H20.4678V11.9302C20.4678 10.6015 20.4678 9.27286 20.4678 7.95983C20.4678 7.42837 20.6085 7.24079 21.1243 7.13137C24.0005 6.50612 26.861 5.8965 29.7372 5.27125C30.3312 5.1462 30.6438 5.3963 30.6438 6.02155C30.6438 8.9446 30.6438 11.852 30.6438 14.7751C30.6438 17.1666 30.6438 19.5426 30.6438 21.9342V22.3875L30.6282 22.4187Z" fill="#fff"/><path d="M35.6927 12.8682H34.4578V11.6333H31.9255V10.3672H34.4266V9.08541H31.9412V7.80364H34.4422V6.53751H31.9412V5.25575H34.4266V3.23931C31.9099 2.87979 29.3933 2.52028 26.8298 2.16076V4.5836H25.548C25.548 3.50504 25.548 2.44212 25.548 1.36356C25.548 0.957149 25.9075 0.738311 26.3452 0.800836C27.8614 1.01967 29.3933 1.23851 30.9095 1.45735C32.3007 1.66056 33.6919 1.84813 35.0831 2.06697C35.5207 2.12949 35.7083 2.34833 35.7083 2.78601C35.7083 6.09983 35.7083 9.41366 35.7083 12.7275C35.7083 12.7588 35.7083 12.8056 35.6771 12.8682H35.6927Z" fill="#fff"/><path d="M26.1264 20.5118H24.8915V13.681C23.0157 14.0874 21.1869 14.4782 19.2955 14.8689C19.2017 14.4625 19.1235 14.0561 19.0298 13.6341C20.0302 13.4152 21.0149 13.1964 21.9997 12.9932C23.0939 12.7587 24.2037 12.5242 25.2979 12.2898C25.7981 12.1804 26.1576 12.4305 26.1576 12.9307C26.1576 15.416 26.1576 17.917 26.1576 20.4024C26.1576 20.4337 26.1576 20.4493 26.1264 20.5118Z" fill="#fff"/><path d="M12.6991 23.7005H11.5268C11.6674 23.1691 11.3548 22.919 10.964 22.6689C10.4638 22.3563 10.2763 21.8248 10.2606 21.1995H11.5111C11.5737 21.5903 11.7769 21.8248 12.2145 21.8092C12.4959 21.8092 12.6991 21.6685 12.7773 21.4028C12.8554 21.1214 12.7304 20.9026 12.4959 20.7775C12.152 20.5899 11.7925 20.4023 11.433 20.246C10.7296 19.9178 10.2919 19.3863 10.2763 18.5891C10.2606 17.7919 10.6514 17.2605 11.3392 16.8697C11.5111 16.7759 11.5268 16.4164 11.6362 16.1194H12.8085C12.6678 16.6508 12.9805 16.8853 13.3869 17.1354C13.8871 17.448 14.0747 17.9795 14.0747 18.6048H12.8398C12.6835 18.1046 12.4646 17.917 12.0426 18.0108C11.855 18.0577 11.6049 18.2609 11.558 18.4328C11.5111 18.5891 11.6518 18.8861 11.8081 18.9799C12.1364 19.2144 12.5272 19.3707 12.9023 19.5426C13.6057 19.8709 14.0434 20.418 14.059 21.1995C14.0747 21.9811 13.6839 22.5282 12.9961 22.919C12.8242 23.0128 12.8085 23.3723 12.6991 23.6693V23.7005Z" fill="#fff"/><path d="M36.9745 17.323H35.7239V15.4473H31.9256V14.1812C32.0193 14.1812 32.1131 14.1499 32.2225 14.1499C33.5512 14.1499 34.8642 14.1499 36.1929 14.1499C36.7712 14.1499 36.9901 14.3687 36.9901 14.9315C36.9901 15.6661 36.9901 16.4164 36.9901 17.1511C36.9901 17.1824 36.9901 17.2293 36.9745 17.3074V17.323Z" fill="#fff"/><path d="M31.9256 16.729H34.4266V17.9639H31.9256V16.729Z" fill="#fff"/><path d="M31.9256 19.2769H34.4266V20.4961H31.9256V19.2769Z" fill="#fff"/><path d="M21.734 16.0881H23.5941V17.323H21.734V16.0881Z" fill="#fff"/><path d="M23.5941 19.8709H22.3749V18.636H23.5941V19.8709Z" fill="#fff"/><path d="M8.96323 19.2769V20.4961H7.72836V19.2769H8.96323Z" fill="#fff"/><path d="M16.5913 20.5117H15.372V19.2925H16.5913V20.5117Z" fill="#fff"/></g><defs><clipPath id="clip0_626_3073"><rect width="39" height="38.1559" fill="white" transform="translate(0.960022 0.800781)"/></clipPath></defs></svg>
                            </span>
                        </div>
                        <div>
                            <h3 className="xl:text-2xl lg:text-lg text-2xl font-bold">Marketing</h3>
                            <p className="text-md leading-loose">PSI&apos;s in-house marketing hub offers tailored solutions for client journeys. With multi-channel strategies and deep insights, we create seamless experiences for developers, investors, sellers, and landlords, fostering brand loyalty and recognition.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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

        <section className="w-full my-4">
            <div  className="max-w-screen-xl mx-auto bg-center bg-cover py-10 px-5">
                <div className="text-center mb-[70] ">
                    <h3 className={`text-darkblue  font-bold text-xl md:text-4xl ${Audrey.className}`}>
                    DISCOVER PSI
                    </h3>
                    <p className={`text-lg font ${montserrat.className}`}>Unveiling Our Vision, Innovations, and Commitment to Your Dream Home</p>
                </div>
                <YoutubeVideo videoId="f_K-ZrzuZLs" thumb="/assets/images/about-us/video-thumb.jpg" height="h-[350px] md:h-[690px]" />
            </div>
        </section>

        <section className="w-full my-4">
            <div  className="max-w-screen-xl mx-auto bg-center bg-cover py-10 px-5">
                <div className="text-center mb-[70] ">
                    <h3 className={`text-darkblue  font-bold text-xl md:text-4xl ${Audrey.className} mb-4`}>
                    PARTNERS
                    </h3>
                    <p className={`text-lg font ${montserrat.className}`}>Meet the Visionaries Behind Your Dreams: Our Real Estate Developers.</p>
                </div>
                <PartnerSlider slides={partners} />
            </div>
        </section>

        <section className="w-full my-4">
            <div className="max-w-screen-xl mx-auto bg-center bg-cover py-10 px-5">
                <div className="text-center mb-[70] ">
                    <h3 className={`text-darkblue  font-bold text-xl md:text-4xl ${Audrey.className}`}>
                    STRATEGIC <span className={`${BrittanySignature.className} text-[#CE641D]`}>Alliances</span>
                    </h3>
                    <p className={`text-lg font ${montserrat.className} mt-5`}>Bringing Real Estate Excellence to Your Doorstep</p>
                </div>

                <div className="aboutCards grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {aboutCardData.map((card, idx) => {
                    let spanClass = '';
                    if(idx === 0) spanClass = 'lg:col-span-2';
                    else if (idx === aboutCardData.length -1 ) spanClass = 'lg:col-span-2';
                
                    return (
                        <div key={idx} className={spanClass}>
                            <AboutCard background={card.background} >
                                <h2 className="text-2xl font-[200] cardText rounded-xl">{card.title}</h2>                                
                            </AboutCard>
                        </div>
                    );
                })}
        
                </div>
            </div>            
        </section>

        <section className="w-full my-4 locationsSection">            
            <LocationsSection />
        </section>

        </>
    )
}

export default DevPage;