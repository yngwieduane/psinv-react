'use client'

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { Libre_Baskerville} from "next/font/google";
import { FreeMode, Navigation} from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import "./UltraLuxuryProjectsSlider.css"

import { LuxuryProjectsData } from "@/types/LuxuryProjectsTypes";

const libreBaskervilleBold = Libre_Baskerville({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-libre-baskerville-bold',
});

type Slide = {
    proj_name: string;
    title: any,
    proj_location: string;
    content : any;
    starting_price: string;
    price_unit : string;
    image: string;
    brochure: string;
    facts:any[],
};

interface SliderProps {
  data: any[];
  slides: Slide[];  
  onAction: (dataToSend?: LuxuryProjectsData) => void;    //data is optional
}

const UltraLuxuryProjectsSlider = ({ data, slides, onAction }: SliderProps) => {
  const [activeThumb, setActiveThumb] = useState(0);    
  const [pageURL, setPageUrl] = useState("");

  const handleBtnClick = (dataToSend:{ name:string,proj_location:string, starting_price:string } ) => {    
    const luxuryProjectsData: LuxuryProjectsData = {      
      name: dataToSend.name,
      proj_location: dataToSend.proj_location,
      starting_price: dataToSend.starting_price,      
      downloadIntent: false,    
    };

    onAction(luxuryProjectsData);
    console.log("====Data to send====", luxuryProjectsData);
  };

  const handleDownloadBrochure = async (slide: Slide) => {
    await onAction(
      { 
        name: slide.proj_name,
        proj_location: slide.proj_location,         
        starting_price: slide.starting_price,
        projectBrochures: slide.brochure,
        downloadIntent: true,
      });
    console.log("====Brochure====", slide.brochure);
  };   

  useEffect(() => {
    const fetchData = async() => {
      if (!slides || slides.length === 0 || !slides[activeThumb] ) return;
      
       
        try {
          const currentPropId = slides[activeThumb].proj_name;
            const res = await fetch(`/api/external/unitsAssets?propertyId=${encodeURIComponent(currentPropId)}`);
            const results = await res.json();
            const finalRes = results.slice(0,5);            
            //console.log("Units Fetched", currentPropId, finalRes);
        } catch(error) {
            console.error("API fetch failed", error);
        }
    };
        fetchData();

    }, [activeThumb, slides]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  return (
    <>    
    <div className="md:min-h-[600px] py-3">
    {slides.length > 0 ? (
        <>
        <Swiper            
            slidesPerView={1}
            centeredSlides={false}
            loop={false}
            modules={[FreeMode, Navigation]}
            spaceBetween={10}
            navigation={true}
            allowTouchMove={false}  
            className=""
            >
            { slides?.map((slide, index) => (
                <SwiperSlide className="relative w-full h-full"
                key={index}
                >
                
            <h3 className={`lg:ml-20 text-[24px] md:text-[35px] lg:text-[45px] leading-tight ${libreBaskervilleBold.className} capitalize` }>
               { slide.title}
            </h3>
                        
          <div className="md:flex gap-5 mt-5">            
            <div className="md:w-[40%] md:h-auto h-[200px] relative"> 
              <img
                  src={slide.image}
                  alt={slide.proj_name} className=" rounded-md absolute inset-0 w-full md:h-full h-[200px] object-cover"
              /> 
              <span className="absolute d-md-none d-block bg-[#00000038] h-full w-full rounded-md"></span>

              <div className="absolute md:top-5 md:bottom-auto bottom-2 md:left-5 left-1/2 md:translate-none -translate-x-1/2 md:bg-[#00000030] md:p-5 p-2 text-center md:w-auto w-full">                    
                  { slide.starting_price && (
                  <>
                      <h3 className="md:text-lg text-lg">Starting Price</h3>
                      <p className="text-3xl mt-2 flex gap-2 items-baseline justify-center">
                          <FontAwesomeIcon icon={faTag} color="#fff" className="rotate-90 text-lg" />
                          {slide.starting_price} <span className="text-lg">AED </span>                                           
                      </p>
                  </>
                  )
                  }
                  
              </div>                
          </div>
          <div className="md:w-[60%]">
              <div className="flex flex-col gap-5">  
                <div>
                    <div className="rounded-md w-full h-full">                        
                        <div className="w-full px-5">
                            {slide.content}                             
                            <div className="md:grid flex md:gap-4 mx-auto md:overflow-x-auto overflow-x-scroll"
                            style={{
                                gridTemplateColumns: slide.facts.length === 4 
                                ? 'repeat(2, minmax(0, 1fr))'
                                : slide.facts.length === 5
                                ? 'repeat(3, minmax(0, 1fr))'
                                : slide.facts.length === 6
                                ? 'repeat(3, minmax(0, 1fr))'
                                : 'repeat(auto-fit, minmax(120px, 1fr))', // fallback
                                }}>
                                {slide.facts.map((fact, index) => {
                                    const isLastColumn = (index + 1) % (slide.facts.length === 4 ? 2 : 3 ) === 0;
                                    const isLastElement = (index + 1) === slide.facts.length;
                                    const isFiveFacts = slide.facts.length === 5;
                                    const is4thOnFiveFacts = isFiveFacts && (index + 1) === 4 ;
                                    const is5thOnFiveFacts = isFiveFacts && (index + 1) === 5 ;

                                    return(
                                    <div key={index} className={`md:mr-4 text-center py-5 md:px-1 px-10 relative md:w-auto min-w-fit 
                                    ${is4thOnFiveFacts ? 'col-start-1 col-span-2' : is5thOnFiveFacts ? 'col-start-3 col-span-1' : ''}`}>
                                        <p className="text-xl font-bold mb-2">{fact.value}</p>
                                        <p className="text-md flex justify-center items-center gap-2">
                                            {fact.icon && (
                                                <img src={fact.icon} />
                                            )}
                                            {fact.FaIcon && (
                                                <FontAwesomeIcon icon={fact.FaIcon} color="#C19A5B" className={fact.FaIcon === faTag ? 'rotate-90': ''} />
                                            )}
                                            
                                            {fact.label}
                                        </p>
                                        {!isLastColumn && !isLastElement && (
                                            <span className="d-md-block d-none absolute top-1/2 right-0 -translate-y-1/2">
                                                <img src="/assets/images/luxury-project-uae/icons/linegrad.svg" />
                                            </span>
                                        ) }
                                        
                                    </div>
                                    )
                                } )
                                }
                            </div>                
                            <div className="md:flex justify-stretch md:justify-start gap-3 pt-8 space-y-4 md:mb-5 mb-15">
                                <button className="cursor-pointer btn text-white  hover:text-black text-center bg-[#C19A5B] rounded-[5px] py-0 h-[40px] px-5 md:w-auto w-full"
                                onClick={() => handleBtnClick({ name: slide.proj_name, proj_location:slide.proj_location, starting_price: slide.starting_price })}>                                
                                    Book Your Villa Now
                                </button>
                                {slide.brochure ? (
                                    <button className="cursor-pointer btn text-center border border-2 border-[#C19A5B] text-[#C19A5B] hover:text-black bg-transparent rounded-[5px] py-0 h-[40px] px-5  md:w-auto w-full"
                                    onClick={() => handleDownloadBrochure(slide)} >                                
                                        Download Brochure
                                    </button>
                                )
                                :
                                    ""
                                }
                                                        
                            </div>
                        </div>
                    </div> 
                </div>               
            </div>
          </div>
          </div>
          </SwiperSlide>
    ))}
    </Swiper>
        </>
          )
          :
          (
              <p className="text-center text-white text-xl">No Projects to Show</p>
          )
      }
      </div>
  </>
  )
}

export default UltraLuxuryProjectsSlider;