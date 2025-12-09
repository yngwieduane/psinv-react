import { Montserrat, Libre_Baskerville, Parisienne } from "next/font/google"
import {Swiper as SwiperType} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

import 'swiper/css';
import { FreeMode, Thumbs } from "swiper/modules";

const montserratBolder = Montserrat({
    subsets: ['latin'],
    weight: ['900'],
    variable: '--font-montserrat-bolder',

});
const libreBaskervilleBold = Libre_Baskerville({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-libre-baskerville-bold',

});
const parisienne = Parisienne({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-parisienne',
});

interface Props {
  onAction: (location: string) => void;  
}

const slidesData = [
    { title: "Abu Dhabi",
      content:"Nestled along the azure Arabian Gulf, Abu Dhabi stands as a beacon of sophistication and opportunity. Boasting a harmonious blend of rich cultural heritage and modernity, it offers an ideal environment to live, visit, work, and invest. Experience luxury, innovation, and a thriving cosmopolitan lifestyle in this dynamic global hub.",
      thumbImage:'/assets/images/luxury-project-uae/abu-dhabi-thumb.webp',
      image:'/assets/images/luxury-project-uae/abu-dhabi.webp',
    },
    { title: "Dubai",
      content:"The vibrant metropolis of Dubai dazzles with its iconic skyline, luxurious lifestyle, and cultural diversity. From the world's tallest building, the Burj Khalifa, to extravagant shopping malls and pristine beaches, Dubai seamlessly blends modernity with tradition, offering visitors an unforgettable fusion of experiences.",
      thumbImage:'/assets/images/luxury-project-uae/dubai-thumb.webp',
      image:'/assets/images/luxury-project-uae/dubai.webp',
    },
    { title: "Ras Al Khaimah",
      content:"Boasting a rich tapestry of history, culture, and natural beauty, Ras Al Khaimah offers enticing adventures with its rugged mountain landscapes, ancient forts, and pristine beaches. Discover its historic charm, embark on desert safaris, or unwind at luxury resorts in a unique destination located between the Hajar Mountains and the Arabian Gulf.",
      thumbImage:'/assets/images/luxury-project-uae/rak-thumb.webp',
      image:'/assets/images/luxury-project-uae/rak.webp',
    }
];


export default function FutureHome({onAction}: Props) {
    const[thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [activeThumb, setActiveThumb] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handlePropDataToSend = (location: string) => {        
        onAction(location);
    };

    const thumbChange = (index:number) => {
        setActiveThumb(index);
        thumbsSwiper?.slideTo(index);
    } 
    function showContent(index:number) {
        setHoveredIndex(index);
    }
    function hideContent() {
        setHoveredIndex(null);
    }

    return(
        <>
        <div className="max-w-screen-xl md:flex mx-auto relative text-white md:px-4 md:py-10">
            <div className="md:w-1/2">
                <div className={`md:bg-none bg-[url("/assets/images/luxury-project-uae/dream-residence-mobile.webp")] bg-cover bg-center
                    md:px-0 md:py-0 px-4 py-10`}>
                    <div className="md:hidden block h-full absolute inset-0 w-full" 
                        style={{ backgroundImage: "linear-gradient(0deg, #FFFFFF00 10%, #131f52ad 100%, #131f526e 0%)" }}>
                    </div>
                    <div className="md:hidden block h-[280px]"></div>
                    <div className={`md:block hidden absolute md:-top-32 -top-10 md:left-auto left-7 text-[60px] md:text-[140px] lg:text-[180px] font-bolder 
                        ${montserratBolder.className} text-[#fff] opacity-10`}>04</div>
                    <h2 className="relative lg:ml-20 sm-ml-0 text-[12px] md:text-md lg:text-xl uppercase text-[#FBD784] font-bold tracking-[6] mb-10 flex gap-2 md:gap-5 sm:justify-start justify-center items-center text-center md:text-start">
                        <span className="w-[35px] md:w-[65px] w-[25px] h-[3px] bg-[#FBD784]"></span>Dream Residence in UAE
                        <span className={`md:hidden block absolute -top-10  left-0 text-[60px] font-bolder 
                        ${montserratBolder.className} text-[#fff] opacity-10`}>04</span>
                    </h2>
                    <h3 className={`lg:ml-20 text-[24px] md:text-[35px] lg:text-[48px] leading-tight ${libreBaskervilleBold.className} capitalize` }>
                        Let the journey to your&nbsp;
                        <span className={`text-[40px] md:text-[55px] lg:text-[70px] after:bg-[#C19A5B] z-0 relative after:absolute after:w-full
                        after:h-[25px] after:left-0 after:top-4 after:z-[-1] 
                        md:after:h-[30px] md:after:top-7   
                        lg:after:h-[40px] lg:after:top-6 ${parisienne.className} `}>
                            Future Home </span>
                        Begin
                    </h3>
                </div>
                
                <div className={`md:block hidden md:mt-7 md:px-0 md:py-0 px-4 py-10`}>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        breakpoints={{
                            0: { slidesPerView: 1.5 }, 
                            576: { slidesPerView: 'auto' },
                            768: { slidesPerView: 'auto' },
                            992: { slidesPerView: 2.2 },
                            1200: { slidesPerView: 3 },
                        }}
                        centeredSlides={false}
                        loop={true}
                        modules={[FreeMode, Thumbs]}
                        freeMode={true}
                        watchSlidesProgress={true}
                        spaceBetween={10}
                        className="md:h-[150px] h-[250px]"        
                        initialSlide={activeThumb}
                    >
                    {slidesData?.map((slide, index) => (
                    <SwiperSlide
                        key={index} 
                        onClick={() => thumbChange(index)}                                      
                        className={`thumbsSlide  relative cursor-pointer p-5 h-full bg-cover rounded-md ${activeThumb === index ? 'opacity-100' : 'opacity-30'}`}
                        style={{ backgroundImage: `url(${slide.thumbImage})` }}         
                    >
                        <div className={`absolute left-0 bottom-0 bg-[#353B58] p-3 rounded-bl-md`}>
                            <p>{slide.title}</p>
                        </div>
                    </SwiperSlide>
                    )) }
                </Swiper>
                </div>
            </div>        
            <div className={`md:w-1/2 w-full md:h-auto h-[340px] md:px-auto px-5 md:pb-0 pb-10 md:bg-none bg-[url("/assets/images/luxury-project-uae/mask-bg.svg")] bg-cover bg-center`}>
                <Swiper
                thumbs={{ swiper: thumbsSwiper }}
                onSlideChange={(swiper) => thumbChange(swiper.activeIndex)}
                loop={false}
                modules={[FreeMode, Thumbs]}                
                centeredSlides={false}
                spaceBetween={10}
                breakpoints={{
                    0: { slidesPerView: 1.3 }, 
                    576: { slidesPerView: 1.5 },
                    768: { slidesPerView: 1 },
                    992: { slidesPerView: 1 },
                    1200: { slidesPerView: 1 },
                }}
                className="h-full"
                >
                    {slidesData?.map((slide,index) => (
                        <SwiperSlide 
                        className="h-full w-full relative rounded-md opacity-100 bg-cover" 
                        key={index} 
                        style={{ backgroundImage: `url(${slide.image})` }}
                        onMouseOver={() => showContent(index)}
                        onMouseOut={hideContent} 
                        >
                            {hoveredIndex !== index && (
                                <div className="absolute left-0 bottom-0 bg-[#353B58] p-3 rounded-bl-md ">
                                    <p>{slide.title}</p>
                                </div>
                            )}                            

                            {hoveredIndex === index && (
                                <>
                                <div className="w-full h-full bg-[#353B58] md:pt-5 pt-3 md:px-10 px-3 ext-light rounded-md md:pb-auto pb-5">
                                    <h2 className="md:text-3xl text-md font-500 leading-loose">{slide.title}</h2>
                                    <p className="md:text-xl text-[12px] leading-normal">{slide.content}</p>
                                    <button className="cursor-pointer btn text-white text-center border border-2 border-[#fff] bg-transparent rounded-[5px] py-0 h-[30px] px-5 mt-5 md:text-[16px] text-[12px]"
                                      onClick={() => handlePropDataToSend(slide.title)} >                                
                                        Learn More
                                    </button>
                                </div>
                                </>
                            )}
                        </SwiperSlide>
                    ))}
                    
                </Swiper>
            </div>
        </div> 
        </>
    )
}