import { Montserrat, Libre_Baskerville } from "next/font/google"
import ContactForm from "./ContactForm";

const montserratSemiBold = Montserrat({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-montserrat-bolder',

});
const libreBaskervilleBold = Libre_Baskerville({
    subsets: ['latin'],
    weight: ['700'],
    variable: '--font-libre-baskerville-bold',
});

export default function Contact() {
    
    return(
        <>
        <div className="max-w-screen-xl mx-auto px-4 md:flex text-white md:items-stretch md:gap-8"> 
            <div className="md:w-1/2  md:flex-1">
                <div className="w-[35px] md:w-[65px] w-[25px] h-[3px] bg-[#FBD784] mb-4"></div>        
                <h2 className={`text-sm md:text-md lg:text-lg uppercase text-[#FBD784] font-bold tracking-[6] md:mb-5 mb-10 ${montserratSemiBold.className}`}>
                    Let's Connect
                </h2>
                <h3 className={`text-[#F5DABC] text-[30px] md:text-[42px] lg:text-[52px] leading-tight ${libreBaskervilleBold.className} capitalize` }>
                Request A <span className="text-[#C19A5B]">Callback</span>
                </h3>
                <ContactForm />
            </div>   
              
            <div className="md:w-1/2 md:flex-1 flex flex-column">
                <p className="text-lg mb-5">Please fill in your contact details and submit. A member of our team will contact you shortly.</p>
                <div className="flex-1 bg-[url('/assets/images/luxury-project-uae/luxury-contact.webp')] bg-cover bg-center rounded-lg" >
                </div>
            </div>                 
        </div>
        </>
    )
}