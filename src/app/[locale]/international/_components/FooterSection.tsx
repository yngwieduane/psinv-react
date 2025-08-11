'use client'

import { AudreyNormal } from "@/utils/fonts";
import { Montserrat } from "next/font/google";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin, faSnapchat, faXingSquare, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";
import ContactForm from "./ContactForm";

const montserratLight = Montserrat({
    subsets: ['latin'],
    weight: ['300'],
    variable: '--font-montserrat-light',
});

function FooterSection() {
    return(
        <>
        <div className="w-full relative py-30">
            <div className="max-w-screen-xl mx-auto">
                <div className="w-full md:flex lg:flex-row grid px-4 md:gap-8 px-5">
                    <div className="lg:w-1/12 md:w-1/10 w-full">
                        <h3 className={`lg:text-[20px] text-[17px] ${montserratLight.className}`}>
                            Let us know if you’re interested!
                        </h3>
                        <div className="lg:w-1/12 md:w-1/12 w-full md:block hidden content-center pt-13">
                            <h3 className="relative flex flex-column items-start gap-3 before:relative before:w-[0.5px] lg:w-[auto] w-[30px]
                            before:h-[250px] before:bg-[#000] before:left-[15px]">
                                <div className=''></div>
                                <div className='lg:text-[21px] md:text-[18px] text-[20px] font-light tracking-wider relative rotate-180 uppercase 
                                inline-block ${montserratLight.className}' style={{writingMode:"vertical-rl"}}>Let’s Get Started</div>
                            </h3>
                        </div>
                    </div>
                    <div className={`lg:w-1/4 md:w-9/10 w-full  ${montserratLight.className} md:space-y-10 space-y-5`}>
                        <h2 className={`lg:text-[40px] md:text-2xl text-[27px] uppercase md:pt-15 pt-5 ${AudreyNormal.className}`}>
                            To gain further information about PSI and investing in the UAE,
                        </h2>  
                        <p className="md:text-2xl text-lg">kindly complete the provided form.</p>
                        <div className="space-y-7">
                            <div>
                                <h2 className={`md:text-2xl text-xl uppercase mb-2 ${AudreyNormal.className}`}>
                                    Abu Dhabi
                                </h2>
                                <p className="md:text-lg text-md">
                                    PSI Head Office:
                                </p>
                            </div>
                            <div>
                                <p className="md:text-lg text-md md:mb-5 mb-3 hover:text-[#ED9C4B] flex gap-4 items-start leading-none"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-xl hover:text-[#ED9C4B]" /> 
                                Addax Tower, Al Reem Island, Abu Dhabi</p>
                                <p className="md:text-lg text-md hover:text-[#ED9C4B] flex gap-4 items-start leading-none"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-xl hover:text-[#ED9C4B]" />Mamsha Al Saadiyat</p>
                            </div>                                                        
                        </div> 
                        <div className="w-full">
                            <h2 className={`md:text-lg text-xl uppercase md:mb-4 mb-7 ${AudreyNormal.className} text-[#999] leading-tight`}>
                                Connect With Us On<br />Our Social Media
                            </h2>
                            <div className="flex md:w-[90%] w-full md:justify-between md:gap-auto gap-7 justify-center">
                                <a href="https://www.facebook.com/PropertyShopInvestment" target="_blank" title="Facebook">
                                    <FontAwesomeIcon icon={faFacebook} color="#999" className="md:text-[22px] text-[30px]" /></a>
                                <a href="https://twitter.com/psinv" target="_blank" title="Twitter">
                                    <FontAwesomeIcon icon={faXingSquare} color="#999" className="md:text-[22px] text-[30px]" /></a>
                                <a href="https://www.instagram.com/property_shop_investment/" target="_blank" title="Instagram">
                                    <FontAwesomeIcon icon={faInstagram} color="#999" className="md:text-[22px] text-[30px]" /></a>
                                <a href="https://www.linkedin.com/company/property-shop-investment-llc" target="_blank" title="LinkedIn">
                                    <FontAwesomeIcon icon={faLinkedin} color="#999" className="md:text-[22px] text-[30px]" /></a>
                                <a href="https://www.snapchat.com/add/property-shop" target="_blank" title="GooglePlus">
                                    <FontAwesomeIcon icon={faSnapchat} color="#999" className="md:text-[22px] text-[30px]" /></a>
                                <a href="https://www.youtube.com/user/propertyshopabudhabi" target="_blank" title="Youtube">
                                    <FontAwesomeIcon icon={faYoutubeSquare} color="#999" className="md:text-[22px] text-[30px]" /></a>
                            </div>
                        </div>             
                    </div>
                    <div className="lg:w-2/3 w-full lg:pl-15 md:pt-0 pt-12">
                        <ContactForm />
                    </div>
                </div>                     
            </div>
        </div>  
        <div className="w-full bg-black h-[60px]">
        </div>  
              
        </>
    )
}

export default FooterSection