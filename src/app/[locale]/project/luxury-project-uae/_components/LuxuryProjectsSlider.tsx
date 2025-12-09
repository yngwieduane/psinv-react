'use client'

import React, { useEffect, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import TextShortner from "@/app/[locale]/_components/tools/TextShortner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHome, faLocationDot, faTag } from "@fortawesome/free-solid-svg-icons";
import { Montserrat } from "next/font/google";
import { FreeMode, Thumbs } from "swiper/modules";
import { UnitListing } from "@/types/types";
import LoadingIcon from "./LoadingIcon";
import LuxuryProjectsListMobile from "./LuxuryProjectsListMobile";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import { LuxuryProjectsData } from "@/types/LuxuryProjectsTypes";
import { any } from "zod";

const montserratLighter = Montserrat({
    subsets: ['latin'],
    weight: ['200'],
    variable: '--font-montserrat-lighter',

});

type Slide = {
    featuredImages: { imageURL: string }[];
    propertyName: string;
    handoverDate: string;
    addressLine1 : string;
    maxPrice: string;
    propertyType : string;
    enPropertyOverView: string;
    propertyID: string;
    projectBrochures: { imageURL: string } [];
};

interface SliderProps {
  data: any[];
  slides: Slide[];  
  onAction: (dataToSend?: LuxuryProjectsData) => void;    //data is optional
  loadingStatus : boolean;
}

// interface SliderProps {
//   data: any[];
//   slides: Slide[];
//   onAction: (dataToSend?: LuxuryProjectsData) => void;
// }

const LuxuryProjectsSlider = ({ data, slides, onAction, loadingStatus }: SliderProps) => {    
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const [isUnitsLoading, setIsUnitsLoading] = useState(false);
  const [units, setUnits] = useState<UnitListing[]>([]);
  const [pageURL, setPageUrl] = useState("");

  const handleBtnClick = (dataToSend:{ id:string,name:string, bedrooms?:string, type:string } ) => {    
    const luxuryProjectsData: LuxuryProjectsData = {
      id: dataToSend.id,
      name: dataToSend.name,
      bedrooms: dataToSend.bedrooms || '',
      type: dataToSend.type,      
    };

    onAction(luxuryProjectsData);
    console.log("====Data to send====", luxuryProjectsData);
  };

  const handleDownloadBrochure = async (slide: Slide) => {

    await onAction(
      { 
        id: slide.propertyID, name: slide.propertyName, 
        type: slide.propertyType, 
        projectBrochures: slide.projectBrochures?.[0]?.imageURL ,
        downloadIntent: true
      });
    //console.log("====Data to send====", luxuryProjectsData);
  };

  const thumbChange = (index: number) => {
    setActiveThumb(index);
    thumbsSwiper?.slideTo(index);
  }  

  useEffect(() => {
    const fetchData = async() => {
      if (!slides || slides.length === 0 || !slides[activeThumb] ) return;
      
        setIsUnitsLoading(true);
        try {
          const currentPropId = slides[activeThumb].propertyID;
            const res = await fetch(`/api/external/unitsAssets?propertyId=${encodeURIComponent(currentPropId)}`);
            const results = await res.json();
            const finalRes = results.slice(0,5);
            setUnits(finalRes);
            //console.log("Units Fetched", currentPropId, finalRes);
        } catch(error) {
            console.error("API fetch failed", error);
        } finally{
            setIsUnitsLoading(false);
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
    {/* DESKTOP view */}
    <div className="md:min-h-[500px] pt-3 pb-7 md:block hidden">
    {loadingStatus ? (      
        <p className="text-center text-white text-xl mt-5">Loading projects...</p>          
      
      )
      : (
          slides.length > 0 ? (
          <>
          <div className="md:flex gap-5 mt-5">
            <div className="w-[60%]">      
              <div className="flex flex-column gap-5">  
                <div className="mt-5">
                  <Swiper
                    thumbs={{ swiper: thumbsSwiper }}
                    slidesPerView={1}
                    centeredSlides={false}
                    loop={false}
                    modules={[FreeMode, Thumbs]}
                    spaceBetween={10}
                    onSlideChange={(swiper) => thumbChange(swiper.activeIndex)}
                    className="!h-[430px]"
                  >
                    { slides?.map((slide, index) => {
                      const handOverDateObject = new Date(slide.handoverDate);
                      const formattedDate = handOverDateObject.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric'
                        });
                      return(
                      <SwiperSlide className="relative w-full h-full"
                        key={index}
                      >
                        <div className="flex gap-5 bg-[#515779] rounded-md w-full h-full">
                            <div className="md:w-[40%]">
                                <div className="w-full h-full">
                                    <img
                                        src={slide.featuredImages?.[0]?.imageURL}
                                        alt={slide.propertyName} title={slide.propertyName} className="w-full h-full object-cover rounded-l-md"
                                    />
                                </div>
                            </div>
                            <div className="md:w-[60%] py-18 px-3">
                                <h3 className="text-2xl mb-3">{slide.propertyName}</h3>
                                {slide.addressLine1 && 
                                <h4 className="text-md mb-5 flex gap-2 mt-0 items-start">
                                    <FontAwesomeIcon icon={faLocationDot} color="#C19A5B" className="mt-1" /> 
                                    {slide.addressLine1}
                                </h4>
                                }
                                <TextShortner text={slide.enPropertyOverView} charLimit = {145} classes ={`text-md font-lighter ${montserratLighter.className}`} />
                                <div className="flex gap-5">
                                    { slide.maxPrice && 
                                        <p className="text-md font-bold mt-5 flex gap-2">
                                            <FontAwesomeIcon icon={faTag} color="#C19A5B" className="rotate-90 mt-1" />
                                            {new Intl.NumberFormat("en-US").format(Number(slide.maxPrice))} AED                                            
                                        </p>
                                    }

                                    { slide.handoverDate && 
                                        <p className="text-md font-bold mt-5 flex gap-2">
                                            <img src="/assets/images/luxury-project-uae/icons/hand.svg" alt="type" title="type" />
                                            {formattedDate}
                                        </p>
                                    }
                                </div>

                                <div className="flex justify-stretch md:justify-start gap-3 pt-5">
                                    <button className="cursor-pointer btn text-white text-center bg-[#C19A5B] rounded-[5px] py-0 h-[40px] w-[30%]"
                                    onClick={() => handleBtnClick({ id: slide.propertyID, name: slide.propertyName, type: slide.propertyType})}>                                
                                        Sign Up
                                    </button>
                                    {slide.projectBrochures?.[0].imageURL ? (
                                      <button className="cursor-pointer btn text-white text-center border border-2 border-[#C19A5B] bg-transparent rounded-[5px] py-0 h-[40px] w-[55%]"
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
                      </SwiperSlide>
                      )
})}
                  </Swiper>
                </div>

              {/* thumbs slider */}
                  <div>
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      breakpoints={{
                        576: { slidesPerView: 1.2 },
                        768: { slidesPerView: 1.2 },
                        992: { slidesPerView: 2.2 },
                        1200: { slidesPerView: 3.2 },
                      }}
                      centeredSlides={false}
                      loop={false}
                      modules={[FreeMode, Thumbs]}
                      freeMode={true}
                      watchSlidesProgress={true}
                      spaceBetween={10}
                      className="h-[100px]"        
                      initialSlide={activeThumb}
                    >
                      {slides?.map((slide, index) => (
                        <SwiperSlide
                          key={index} onClick={() => thumbChange(index)} 
                          className={`thumbsSlide relative cursor-pointer bg-[#4f577c59] p-5 h-full flex ${activeThumb === index ? 'border border-1 border-white opacity-100' : 'opacity-50'}`}
                        >
                          <div className="flex w-full h-full gap-2 items-stretch">
                            <div className="w-[40%] grow">
                              <img
                                src={slide.featuredImages?.[0]?.imageURL}
                                alt={slide.propertyName} title={slide.propertyName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="w-[60%] flex items-center">
                              <p>{slide.propertyName}</p>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>  
                </div>
          </div>
          <div className="w-[40%] py-5">
            <h3 className="text-2xl">Available Units</h3>
            
            { isUnitsLoading ?                                  
                  <LoadingIcon />

                : units.length > 0 ? (
                  <>
                  <div className="space-y-4 mt-4">
                    {units.map((unit, idx) => (                
                      <div className="flex justify-between border border-1 border-[#00000040] gap-5 p-2 items-center" key={idx}>
                        <div className="flex justify-between gap-7">
                          <img src={unit.imageurl?.split("|")[0]} 
                          alt={`${unit.propertyname} property`} title={`${unit.propertyname}`}
                          className="w-[70px] h-[70px] object-cover"  />
                          <div>
                            {(typeof unit.bedrooms === "object" || unit.bedrooms === "0") ? (
                              <p>Studio</p>
                            ) : (
                              <p>{unit.bedrooms} Bedrooms</p>
                            )}

                            <div className="flex gap-2 mt-1">
                              <div className="flex">
                                <FontAwesomeIcon icon={faTag} color="#C19A5B" className="rotate-90 mt-1 text-lg mr-2" /> 
                                AED{new Intl.NumberFormat("en-US").format(Number(unit.sellprice))}
                              </div>
                              <div className="flex">
                                <FontAwesomeIcon icon={faHome} color="#C19A5B" className="mt-1 text-lg mr-2" /> 
                                {unit.category}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 me-10 items-center">
                          <a target="_blank"
                          href={`https://api.whatsapp.com/send/?phone=97122052888&text=%2ALuxury+projects%2A+%0AI+am+Interested+on+%2A+${unit.propertyname}+project%2C${(typeof(unit.bedrooms) === "object" || unit.bedrooms === "0") ? ' studio' : unit.bedrooms+' Bedroom'}%2A+.+Kindly+send+me+more+information.%0A${pageURL}%2F%0A%0A&type=phone_number&app_absent=0`}>
                            <FontAwesomeIcon icon={faWhatsapp} />
                          </a>
                          <FontAwesomeIcon icon={faEnvelope} onClick={() => handleBtnClick({ id: unit.property_Pk, name: unit.propertyname, bedrooms: unit.bedrooms, type: unit.category})} className="cursor-pointer" />
                        </div>
                      </div>                   
                    
                    ))}
                  </div>
                    
                  </>
                ) 
                :
                (
                  <p className="text-gray-400">No units available</p>
                )
              }   
            </div>
          </div>
        </>
          )
          :
          (
              <p className="text-center text-white text-xl">No Projects to Show</p>
          )
        )
      }
      </div>

{/* MOBILE VIEW */}
      <div className="md:hidden block">
        <LuxuryProjectsListMobile tabs={data} onAction={onAction} loadingStatus={loadingStatus} />
      </div>
  </>
  )
}

export default LuxuryProjectsSlider;