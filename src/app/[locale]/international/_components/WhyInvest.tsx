'use client'

import { AudreyNormal, Audrey } from "@/utils/fonts";
import { IconFamily } from "./Icons/IconFamily";
import { IconSafe } from "./Icons/IconSafe";
import { IconEducation } from "./Icons/IconEducation";
import { IconCulture } from "./Icons/IconCulture";

function WhyInvest() {
    return(
        <>            
            <div className="lg:w-1/12 md:w-1/12 w-full md:block hidden">
                <h3 className="relative flex flex-column items-start gap-3 before:relative before:w-[1px] lg:w-[auto] w-[30px] 
                before:h-[250px] before:bg-[#000] before:left-[15px]" >
                    <div className=''></div>
                    <div className='lg:text-[21px] md:text-[18px] text-[20px] font-light tracking-wider relative rotate-180 inline-block uppercase' 
                    style={{writingMode:"vertical-rl"}}>Why Invest in UAE</div>
                </h3>
            </div>
            <div className="lg:w-1/2 md:w-1/2 w-full md:pr-0 relative md:pt-0 pt-10 md:pl-10">
                <div className="absolute md:-left-10 left-5 md:top-20 -top-10 px-5">
                    <h2 className={`lg:text-5xl md:text-2xl text-4xl text-start uppercase ${AudreyNormal.className} md:mb-17 mb-7`}>
                        UAE: Where Family Dreams Flourish
                    </h2>
                    <div className="md:block flex justify-end">
                        <a href="#" className={`${AudreyNormal.className} 
                        relative uppercase lg:text-lg text-sm p-9 place-self-end
                        after:content-[''] after:absolute lg:after:w-[180px] after:w-[160px] lg:after:h-[100px] after:h-[80px]
                        after:border after:border-[#ED9C4B] after:inset-0 after:rounded-[50%] 
                        after:transition after:duration-300 after:rotate-[335deg]
                        hover:after:bg-[#ED9C4B]`}>
                            <span className="relative z-10">Learn More</span>
                        </a>
                    </div>                    
                </div>                
                <img src="/assets/images/international/family.webp" alt="international-family" title="international-family" 
                className="h-full w-[90%] object-cover md:ml-10 ml-5"  />
            </div>
            <div className="lg:w-5/12 md:w-1/2 w-full">
                <div className="w-full flex flex-column md:gap-10 gap-5 py-2 md:px-auto px-4 md:pt-0 pt-10">
                    <div className="border-b border-b-1 border-b-[#00000057] md:py-5 py-4">
                        <div className="flex md:gap-8 gap-4 mb-5 items-center">
                            <IconFamily />
                            <h3 className={`uppercase ${AudreyNormal.className} md:text-2xl text-xl`}>
                            Family-Centric Activities:</h3>  
                        </div>                        
                        <p className="md:text-[22px] text-[19px] font-light leading-tight">Enjoy fun and culture with your family in the UAE, a safe and secure country.</p>                      
                    </div>
                    <div className="border-b border-b-1 border-b-[#00000057]  md:py-5 py-4">
                        <div className="flex md:gap-8 gap-4 mb-5 items-center">
                            <IconSafe />
                            <h3 className={`uppercase ${AudreyNormal.className} md:text-2xl text-xl`}>
                            Safe environment:</h3>  
                        </div>                        
                        <p className="md:text-[22px] text-[19px] font-light leading-tight">UAE in the second ranking worldwide for safety with Dubai and Abu Dhabi leading the city Safety ranking, with lowest crime rate..</p>                      
                    </div>
                    <div className="border-b border-b-1 border-b-[#00000057]  md:py-5 py-4">
                        <div className="flex md:gap-8 gap-4 mb-5 items-center">
                            <IconEducation />
                            <h3 className={`uppercase ${AudreyNormal.className} md:text-2xl text-xl`}>
                            Educational Excellence:</h3>  
                        </div>                        
                        <p className="md:text-[22px] text-[19px] font-light leading-tight">The UAE has many great schools and education options for your children’s future.</p>                      
                    </div>
                    <div className=" md:py-5 py-4">
                        <div className="flex md:gap-8 gap-4 mb-5 items-center">
                            <IconCulture />
                            <h3 className={`uppercase ${AudreyNormal.className} md:text-2xl text-xl`}>
                            Cultural Diversity:</h3>  
                        </div>                        
                        <p className="md:text-[22px] text-[19px] font-light leading-tight">The UAE offers cultural diversity and learning for families</p>                      
                    </div>
                </div>
            </div>
        </>
    )
}

export default WhyInvest