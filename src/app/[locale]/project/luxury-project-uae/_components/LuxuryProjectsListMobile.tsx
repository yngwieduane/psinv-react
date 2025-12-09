'use client'

import React, { useEffect, useState } from "react";

import TextShortner from "@/app/[locale]/_components/tools/TextShortner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faTag } from "@fortawesome/free-solid-svg-icons";
import { Montserrat } from "next/font/google";

import { LuxuryProjectsData } from "@/types/LuxuryProjectsTypes";


const montserratLighter = Montserrat({
    subsets: ['latin'],
    weight: ['200'],
    variable: '--font-montserrat-lighter',

});

type Tabs = {
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

interface TabProps {  
  tabs: Tabs[];  
  onAction: (dataToSend?:{id: string, name: string, type: string}) => void;
  loadingStatus : boolean;
}

const LuxuryProjectsListMobile = ({ tabs, onAction, loadingStatus }: TabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    console.log("Tabs values:", tabs);
  }, [loadingStatus]);

  const handleBtnClick = (dataToSend:{id:string,name:string,type:string}) => {    
    onAction(dataToSend);
    //console.log("====Data to send====", dataToSend);
  };

  return (
    <>    
    <div className="min-h-[500px] pt-3 pb-7">
    {loadingStatus ? (      
        <p className="text-center text-white text-xl mt-5">Loading projects...</p>          
      
      )
      : (
          tabs.length > 0 ? (
          <>
          <div className="flex gap-2 mt-5 mb-4 overflow-x-scroll scrolling-auto" style={{ overflow:"-moz-scrollbars-horizontal"}}>
            {tabs?.map((tab,index) => (
                <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`mb-4 text-nowrap text-[18px] font-light w-max text-center px-4 py-3 transition-all duration-200 text-[#fff] border-2   ${
                    activeTab === index
                    ? "border-[#F5DABC] font-semibold"
                    : "border-[#FFFFFF1A] hover:text-[#111954]"
                }`}
                >
                    {tab.propertyName}
                </button>
            ))}

          </div>

            <div className="w-full">                   
              { tabs?.map((tab, index) => {
                const handOverDateObject = new Date(tab.handoverDate);
                const formattedDate = handOverDateObject.toLocaleDateString('en-US', {
                  year:'numeric',
                  month:'numeric',
                  day:'numeric',
                });

                return(
                activeTab === index && (
                  <div className="w-full h-full text-center"
                    key={index}
                  >
                    <div className="space-y-2">
                      <div className="w-full h-[190px]">
                        <img
                          src={tab.featuredImages?.[0]?.imageURL}
                          alt={tab.propertyName} title={tab.propertyName} className="w-full h-full object-cover"
                        />
                      </div>
                        <div className="w-full py-5 px-3">
                          <h3 className="text-2xl mb-3">{tab.propertyName}</h3>                            
                          <TextShortner text={tab.enPropertyOverView} charLimit = {145} classes ={`text-md font-lighter ${montserratLighter.className}`} />
                          <div className="flex gap-5 justify-center">
                            { tab.maxPrice && 
                                <p className="text-md font-bold mt-5 mb-3 flex gap-2">
                                    <FontAwesomeIcon icon={faTag} color="#C19A5B" className="rotate-90 mt-1" />
                                    {new Intl.NumberFormat("en-US").format(Number(tab.maxPrice))} AED                                            
                                </p>
                            }

                            { tab.handoverDate && 
                                <p className="text-md font-bold mt-5 flex gap-2">
                                    <img src="/assets/images/luxury-project-uae/icons/hand.svg" alt="" className="h-[27px]" />
                                    {formattedDate}
                                </p>
                            }
                          </div>

                          {tab.addressLine1 && 
                            <h4 className="text-md mb-5 flex gap-1 mt-0 items-start justify-center">
                              <FontAwesomeIcon icon={faLocationDot} color="#C19A5B" className="mt-1" /> 
                              {tab.addressLine1}
                            </h4>
                          }

                          <div className="w-full space-y-3 pt-5">
                            <button className="cursor-pointer btn text-white text-center bg-[#C19A5B] rounded-[5px] py-0 h-[40px] w-full"
                            onClick={() => handleBtnClick( {id: tab.propertyID, name: tab.propertyName, type: tab.propertyType }) }>                                
                                Sign Up
                            </button>
                            {tab.projectBrochures?.[0].imageURL ? (
                              <button className="cursor-pointer btn text-white text-center border border-2 border-[#C19A5B] bg-transparent rounded-[5px] py-0 h-[40px] w-full"
                              onClick={() => handleBtnClick({ id:tab.propertyID, name: tab.propertyName, type: tab.propertyType })}>                                
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
                  )
                )
                
              })}
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
  </>
  )
}

export default LuxuryProjectsListMobile;