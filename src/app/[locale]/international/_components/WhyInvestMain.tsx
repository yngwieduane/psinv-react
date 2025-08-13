'use client'

import { AudreyNormal } from "@/utils/fonts";
import {Montserrat } from "next/font/google";
import { TaxFree } from "./Icons/TaxFree";
import { Architecture } from "./Icons/Architecture";
import { Award } from "./Icons/Award";
import { GlobalHub } from "./Icons/GlobalHub";

const montserratLight = Montserrat({
    subsets: ['latin'],
    weight: ['300'],
    variable: '--font-montserrat-light',
});
const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-montserrat',
});

type Props = {
    openModal: () => void;
}

const WhyInvestMain:React.FC<Props> = ({openModal}) => {
    return(
        <>
        <div className={`max-w-screen-xl md:flex lg:gap-5 gap-2 md:py-[20vh] py-7 mx-auto text-white ${montserratLight.className}`}>
            <div className="lg:w-1/9 md:w-1/12 w-full md:block hidden content-end">                
                <h3 className="relative flex flex-column items-start gap-2 before:relative before:w-[1px] lg:w-[auto] w-[30px] 
                before:h-[250px] before:bg-[#fff] before:left-[15px]">
                    <div className=''></div>
                    <div className='lg:text-[21px] md:text-[18px] text-[20px] font-light text-white tracking-wider relative rotate-180 inline-block uppercase' 
                    style={{writingMode:"vertical-rl"}}>Why Invest in UAE</div>
                </h3>
            </div>
            <div className="lg:w-8/9 md:w-1/2 w-full">
                <div>
                    <h2 className={`lg:text-5xl text-white md:text-2xl text-3xl text-start uppercase ${AudreyNormal.className} md:mb-17 mb-7`}>
                        Why Invest in UAE
                    </h2>
                </div>
                <div className="w-full md:flex gap-7">
                    <div className="lg:w-[24%] md:block hidden">
                        <img src="/assets/images/international/international-why-invest.webp" alt="why invest" title="why invest"
                        className="w-full h-full object-cover" />
                    </div>
                    <div className="lg:w-[38%] text-white space-y-7">
                        <div className="md:space-y-5 space-y-3">
                            <TaxFree width="60px" height="60px" />
                            <h3 className={`uppercase ${AudreyNormal.className} md:text-2xl text-lg md:mb-5 mb-2`}>
                            Sun-Kissed Yields & Tax-Free Bliss:</h3>
                            <ul className={`md:text-lg text-sm list-disc ml-5 space-y-3 ${montserratLight.className}`}>
                                <li>Rental Riches: Watch your bank account tan like a beach bum with yields up to 10% - hotter than the Dubai sun!</li>
                                <li>Zero-Tax Oasis: Forget sandcastles - build tax-free wealth! The UAE’s friendly tax regime lets you keep every shimmering dirham.</li>
                            </ul>
                        </div>
                        <div className="md:space-y-5 space-y-3 md:mb-0 mb-5">
                            <Architecture width="60px" height="60px" />
                            <h3 className={`uppercase ${AudreyNormal.className} md:text-2xl text-lg md:mb-5 mb-2`}>
                            Architectural Gems & Glittering Lifestyle:</h3>
                            <ul className={`md:text-lg text-sm list-disc ml-5 space-y-3 ${montserratLight.className}`}>
                                <li>From Burj Khalifa to Beachfront Bliss: Choose your own adventure - sleek skyscrapers, family-friendly communities, or beachfront havens..</li>
                                <li>World-Class Playground: Dive into endless pools, tee off on championship courses, and shop till you drop in luxury mall.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="lg:w-[38%] text-white space-y-7 ">
                        <div className="md:space-y-5 space-y-3">
                            <Award width="56px" height="56px" />                           
                            <h3 className={`uppercase ${AudreyNormal.className} md:text-2xl text-lg md:mb-5 mb-2`}>
                            Boomtown Playground for Global Nomads:</h3>
                            <ul className={`md:text-lg text-sm list-disc ml-5 space-y-3 ${montserratLight.className}`}>
                                <li>Expat Paradise: Millions flock to the UAE’s vibrant life, making your property the hottest Airbnb in town.</li>
                                <li>Future-Proof Investment: Dubai’s Expo 2020 legacy keeps the investment party going, with futuristic infrastructure and a booming economy.</li>
                            </ul>
                        </div>
                        <div className="md:space-y-5 space-y-3">
                            <GlobalHub width="50px" height="50px" />
                            <h3 className={`uppercase ${AudreyNormal.className} md:text-2xl text-lg md:mb-5 mb-2`}>
                            Gateway to the World, Key to Your Portfolio:</h3>
                            <ul className={`md:text-lg text-sm list-disc ml-5 space-y-3 ${montserratLight.className}`}>
                                <li>Global Hub: Connect with the world’s top businesses from your Dubai doorstep - your investment passport to prosperity.</li>
                                <li>Solid & Sophisticated: The UAE’s stable government and cutting-edge technology ensure your real estate dreams stay grounded in reality.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>            
        </div>


        <div className={`max-w-screen-xl md:flex lg:gap-5 gap-2 md:pt-[10vh] md:pb-[20vh] py-5 mx-auto ${montserratLight.className}`}>
            <div className="lg:w-1/9 md:w-1/12 w-full md:block hidden">                
                <h3 className="relative flex flex-column items-start gap-2 before:relative before:w-[1px] lg:w-[auto] w-[30px] 
                before:h-[250px] before:bg-[#fff] before:left-[15px]">
                    <div className=''></div>
                    <div className='lg:text-[21px] md:text-[18px] text-[20px] font-light text-white tracking-wider relative rotate-180 inline-block uppercase' 
                    style={{writingMode:"vertical-rl"}}>4 Reasons</div>
                </h3>
            </div>
            <div className="lg:w-8/9 md:w-1/2 w-full md:flex gap-7">
                <div className="lg:w-2/5 w-full">
                    <h2 className={`lg:text-5xl text-white md:text-2xl text-3xl text-start uppercase mb-7 leading-tight ${AudreyNormal.className}`}>
                        4 Reasons Your Money Will Blossom in UAE
                    </h2>
                    <div className='flex md:justify-start justify-end md:mb-0 mb-10'>
                        <button onClick={openModal}
                        className={`${AudreyNormal.className} cursor-pointer
                        relative uppercase lg:text-lg text-sm p-9 hover:text-black self-end
                        after:content-[''] after:absolute lg:after:w-[190px] after:w-[170px] lg:after:h-[100px] after:h-[80px] 
                        after:border after:border-[#ED9C4B] after:inset-0 after:rounded-[50%] 
                        after:transition after:duration-300 after:rotate-[335deg]
                        hover:after:bg-[#ED9C4B] text-white hover:text-black`}
                        >
                            <span className="relative z-10">Learn More</span>
                        </button> 
                    </div>
                </div>
                <div className="lg:w-3/5 w-full">
                    <div className="text-white">
                        <div className="w-full md:pb-15 pb-3 border-b border-b-1 border-white flex md:gap-7 gap-4">
                            <div className="md:w-1/3 w-1/4">
                                <img src="/assets/images/international/international-visa.webp" alt="golden visa" 
                                className="w-full"/>
                            </div>
                            <div className="md:w-2/3 w-3/4">
                                <h3 className={`uppercase md:text-3xl text-xl md:mb-5 mb-2 font-400 ${montserrat.className} md:leading-tight leading-none`}>
                                Golden Visa Bloom: Invest just €503,000 in UAE real estate</h3>
                                <p className="md:text-lg text-sm leading-tight">
                                    Unlock a decade of living, working, and thriving. 
                                    This renewable 10-year visa extends to your family, creating a legacy of opportunity.
                                </p>
                            </div>                            
                        </div>
                        <div className="w-full md:py-15 py-3 border-b border-b-1 border-white flex md:gap-7 gap-4">
                            <div className="md:w-1/3 w-1/4">
                                <img src="/assets/images/international/international-tax-free.webp" alt="Tax-Free" 
                                className="w-full"/>
                            </div>                            
                            <div className="md:w-2/3 w-3/4">
                                <h3 className={`uppercase md:text-3xl text-xl mb-5 font-400 ${montserrat.className} md:leading-tight leading-none`}>
                                Tax-Free Sanctuary: Unlike many landscapes</h3>
                                <p className="md:text-lg text-sm leading-tight">
                                    The UAE is devoid of property and income taxes. Your investments flourish undisturbed, maximizing your returns.
                                </p>
                            </div>                            
                        </div>
                        <div className="w-full md:py-15 py-3 border-b border-b-1 border-white flex md:gap-7 gap-4">
                            <div className="md:w-1/3 w-1/4">
                                <img src="/assets/images/international/international-global-hub.webp" alt="global-hub" 
                                className="w-full"/>
                            </div>
                            <div className="md:w-2/3 w-3/4">
                                <h3 className={`uppercase md:text-3xl text-xl mb-5 font-400 ${montserrat.className} md:leading-tight leading-none`}>
                                Global Hub Connection: The UAE is a business nexus</h3>
                                <p className="md:text-lg text-sm leading-tight">
                                    Invest here and connect your portfolio to the pulse of the global market. 
                                    Your visa grants visa-free access, making managing your desert oasis a breeze.
                                </p>
                            </div>                            
                        </div>
                        <div className="w-full md:py-15 py-3 border-b border-b-1 border-white flex md:gap-7 gap-4">
                            <div className="md:w-1/3 w-1/4">
                                <img src="/assets/images/international/international-haven.webp" alt="Peace of Mind" 
                                className="w-full"/>
                            </div>
                            <div className="md:w-2/3 w-3/4">
                                <h3 className={`uppercase md:text-3xl text-xl mb-5 font-400 ${montserrat.className} md:leading-tight leading-none`}>
                                Peace of Mind Haven: The UAE's stable government</h3>
                                <p className="md:text-lg text-sm leading-tight">
                                    Secure environment ensure your financial oasis thrives. Your Golden Visa comes with no employment ties, 
                                    and even in unforeseen circumstances, your family's residency remains uninterrupted.
                                </p>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>            
        </div>
        </>
    )
}

export default WhyInvestMain