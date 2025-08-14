'use client'

import { AudreyNormal } from "@/utils/fonts";
import { Montserrat } from "next/font/google";
import ReviewSlider from "./ReviewSlider";

const montserratLight = Montserrat({
    subsets: ['latin'],
    weight: ['300'],
    variable: '--font-montserrat-light',
});

const reviews = [
    { "review": "My experience with them was awesome! They really made my home-buying journey smooth and stress-free. The team was super helpful, always there to answer my questions, and made sure I found a place that felt like home. I would definitely tell my friends and family to give a shot if they're on the hunt for a great real estate partner." }, 
    { "review": "Hello from Turkey. Lilit took very good care of us and answered all our questions and queries very clearly. It left no question marks in our minds. We were very pleased. Thank you very much."}, 
];

function ClientReview() {
    return(
        <>
        <div className="w-full relative">
            <div className="max-w-screen-xl mx-auto">
                <div className="w-full md:flex md:flex-row grid md:gap-8 md:px-5 px-6">
                    <div className="md:w-1/12 w-full md:order-1 order-2">
                        <h3 className={`md:block hidden lg:text-[20px] md:text-[17px] text-[20px] ${montserratLight.className}`}>
                            Let us know if you’re interested!
                        </h3>
                    </div>
                    <div className="md:w-1/3 w-full md:order-2 order-3">
                        <h2 className={`lg:text-5xl md:text-2xl text-[27px] text-start uppercase  ${AudreyNormal.className}`}>
                            What our clients say
                        </h2>                    
                    </div> 
                </div>
                <div className="w-full flex flex-row px-0 gap-8 mt-10 items-start">
                    <div className="lg:w-1/12 md:w-1/12 w-full md:block hidden content-center pt-13">
                        <h3 className="relative flex flex-column items-start gap-3 before:relative before:w-[0.5px] lg:w-[auto] w-[30px]
                        before:h-[250px] before:bg-[#000] before:left-[15px]" >
                            <div className=''></div>
                            <div className='lg:text-[21px] md:text-[18px] text-[20px] font-light tracking-wider relative rotate-180 uppercase 
                            inline-block ${montserratLight.className}' style={{writingMode:"vertical-rl"}}>Let’s Get Started</div>
                        </h3>
                    </div>
                    <div className={`md:w-2/3 w-full md:pr-0 md:py-5 py-0  ${montserratLight.className}`}> 
                        <div className="flex gap-10">
                            <ReviewSlider slides={reviews} />
                        </div>
                    </div> 
                </div>
            </div>
            <div className="absolute top-0 right-0 w-1/2 -z-1 md:block hidden">
                <img src="/assets/images/international/reviews.webp" alt="review" className="w-full object-cover" />
            </div>            
        </div>        
              
        </>
    )
}

export default ClientReview