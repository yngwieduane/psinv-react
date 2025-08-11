'use client'

import { AudreyNormal } from "@/utils/fonts";
import { Montserrat } from "next/font/google";

const montserratLight = Montserrat({
    subsets: ['latin'],
    weight: ['300'],
    variable: '--font-montserrat-light',
});

function Solutions() {
    return(
        <>            
            <div className="lg:w-1/12 md:w-1/12 w-full md:block hidden content-center">
                <h3 className="relative flex flex-column items-start gap-3 before:relative before:w-[0.5px] lg:w-[auto] w-[30px] 
                before:h-[250px] before:bg-[#000] before:left-[15px]" >
                    <div className=''></div>
                    <div className='lg:text-[21px] md:text-[18px] text-[20px] font-light tracking-wider relative rotate-180 inline-block uppercase' 
                    style={{writingMode:"vertical-rl"}}>Solutions</div>
                </h3>
            </div>
            <div className={`lg:w-5/6 md:w-1/2 w-full md:pr-0 md:px-0 px-4 relative md:pt-0 pt-10 md:pl-10 ${montserratLight.className}`}>
                <h2 className={`lg:text-5xl md:text-2xl text-3xl text-center uppercase ${AudreyNormal.className} mb-7`}>
                    The Solutions We Offer
                </h2>
                <p className={`md:text-3xl text-sm font-light leading-normal ${montserratLight.className} text-center`}>We offer a wide range of services to help you achieve your financial goals, 
                    from real estate wealth management and assets management to business opportunities and family relocation in the UAE.</p>
                <div className="md:flex gap-5 pt-10">
                    <div className="md:w-1/4 w-full text-center">
                        <img src="/assets/images/international/wealth.jpg" alt="wealth" className="mb-10 w-full object-cover" />
                        <h3 className={`md:text-2xl text-xl text-center uppercase ${AudreyNormal.className} md:mb-4 mb-2`}>
                            Wealth Management
                        </h3>
                        <p className="md:text-xl text-md md:mb-0 mb-4">
                            We help you protect and grow your wealth through a variety of investment strategies.
                        </p>
                    </div>
                    <div className="md:w-1/4 w-full text-center">
                        <img src="/assets/images/international/assets.jpg" alt="assets" className="mb-10 w-full object-cover" />
                        <h3 className={`md:text-2xl text-xl text-center uppercase ${AudreyNormal.className} md:mb-4 mb-2`}>
                            Assets Management
                        </h3>
                        <p className="md:text-xl text-md md:mb-0 mb-4">We help you manage your assets, including real estate, businesses, and investments.</p>
                    </div>
                    <div className="md:w-1/4 w-full text-center">
                        <img src="/assets/images/international/business.jpg" alt="business" className="mb-10 w-full object-cover" />
                        <h3 className={`md:text-2xl text-xl text-center uppercase ${AudreyNormal.className} md:mb-4 mb-2`}>
                            Business Opportunities
                        </h3>
                        <p className="md:text-xl text-md md:mb-0 mb-4">We help you find and seize business opportunities in the UAE, 
                            providing the support to start and grow your business</p>
                    </div>
                    <div className="md:w-1/4 w-full text-center">
                        <img src="/assets/images/international/relocation.jpg" alt="relocation" className="mb-10 w-full object-cover" />
                        <h3 className={`md:text-2xl text-xl text-center uppercase ${AudreyNormal.className} md:mb-4 mb-2`}>
                            Family Relocation
                        </h3>
                        <p className="md:text-xl text-md md:mb-0 mb-4">Relocate your family to UAE hassle-free. Schools, healthcare, home, and more — we've got you covered.</p>
                    </div>
                </div>
            </div>  
            <div className="lg:w-1/12 md:w-1/12">
                
            </div>          
        </>
    )
}

export default Solutions