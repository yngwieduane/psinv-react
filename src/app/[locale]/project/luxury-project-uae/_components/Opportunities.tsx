'use client'
import { Montserrat, Libre_Baskerville, Parisienne } from "next/font/google"
import { FaWhatsapp } from "react-icons/fa";

const montserratBolder = Montserrat({
    subsets: ['latin'],
    weight: ['900'],
    variable: '--font-montserrat-bolder',

});
const montserratSemiBold = Montserrat({
    subsets: ['latin'],
    weight: ['500'],
    variable: '--font-montserrat-semi-bold',

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
  onAction: (title?: string) => void;
  pageURL: string;
}

export default function Opportunities ({onAction, pageURL}: Props) {

    const handleClick = (title? : string) => {
        onAction(title);
    }

    return(
        <>
        <div className="max-w-screen-xl mx-auto relative py-10 md:py-20 z-10 text-white px-4 ">
            <div className={`md:absolute md:-top-30 lg:-top-40 text-[60px] md:text-[140px] lg:text-[170px] font-bolder 
                ${montserratBolder.className} text-[#fff] opacity-10`}>01</div>
            <div className="md:flex gap-10 lg:gap-25">
                <div className="md:w-1/2 lg:pl-20 md:py-8 md:text-start text-center">
                    <h2 className="text-md lg:text-xl uppercase text-[#FBD784] font-bold tracking-[6] mb-5 md:mb-0 flex gap-2 md:gap-5md:justify-start justify-center items-center text-center md:text-start">
                        <span className="w-[35px] md:w-[65px] h-[3px] bg-[#FBD784]"></span>Opportunities Await!
                    </h2>
                    <h3 className={`text-[24px] md:text-[35px] lg:text-[50px] leading-tight ${libreBaskervilleBold.className} capitalize` }>
                        <span className={`text-[40px] md:text-[55px] lg:text-[65px] before:bg-[#C19A5B] before:absolute before:w-[90px] 
                        before:h-[25px] before:left-0 before:top-4 before:z-[-1] md:before:w-[120px] 
                        md:before:h-[30px] md:before:top-7  lg:before:w-[150px] 
                        lg:before:h-[40px] lg:before:top-8 ${parisienne.className} relative `}>
                            Rare </span>
                        investment real estate opportunities available
                    </h3>
                    <p className={`text-md md:text-[16px] xl:text-lg my-5 ${montserratSemiBold.className}`}>Enjoy privileged access to exclusive properties in prime destinations that are available only for the most discerning clientele.
                    <br/>
                    Our experienced specialists will ensure that each personalised experience is bespoke, seamlessly uniting sellers with ideal buyers.</p>
                    <div className="flex justify-stretch md:justify-start gap-3 pt-5">
                        <button className="cursor-pointer btn text-white text-center bg-[#C19A5B] rounded-[5px] py-0 h-[40px] w-[50%] md:w-[150px]"
                        onClick={() => handleClick('Let us know if you’re interested!')}>                                
                            Call back
                        </button>
                        <a className="hidden md:flex gap-2 items-center justify-center cursor-pointer btn text-center bg-[#41A138] text-[#1bd741] rounded-[5px] py-0 h-[40px] w-[250px]"
                        href={`https://wa.me/97122052888?text=*Luxury%20projects*%0AI%20am%20Interested%20.%20Kindly%20send%20me%20more%20information.%0A${pageURL}/%0A%0A`}
                        target="_blank">                            
                            <FaWhatsapp />                         
                            Find us on WhatsApp
                        </a>
                        <a className="flex md:hidden gap-2 items-center justify-center cursor-pointer btn text-center bg-[#41A138] text-[#1bd741] rounded-[5px] py-0 h-[40px] w-[50%]"
                        href={`https://wa.me/97122052888?text=*Luxury%20projects*%0AI%20am%20Interested%20.%20Kindly%20send%20me%20more%20information.%0A${pageURL}/%0A%0A`}
                        target="_blank">                            
                            <FaWhatsapp />                         
                            WhatsApp
                        </a>
                    </div>                    
                </div>
                <div className="md:w-1/2">
                    <img src="/assets/images/luxury-project-uae/luxury-project-uae-opportunity.webp" alt="opportunity" title="opportunity"
                    className="object-cover rounded-md w-full h-full mt-5 md:mt-0" />
                </div>
            </div>            
        </div>
        </>
    )
}