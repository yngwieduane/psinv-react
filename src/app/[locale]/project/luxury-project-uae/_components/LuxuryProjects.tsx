import { Montserrat, Libre_Baskerville, Parisienne } from "next/font/google"
import LuxuryProjectsSlider from "./LuxuryProjectsSlider";
import { LuxuryProjectsData } from "@/types/LuxuryProjectsTypes";

const montserratBolder = Montserrat({
    subsets: ['latin'],
    weight: ['900'],
    variable: '--font-montserrat-bolder',

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
  onAction: (data?: LuxuryProjectsData) => void;
  data: any[];
  loadingStatus: boolean;
}

export default function LuxuryProjects({onAction, data, loadingStatus}: Props) {    
    //const [brochureUrl, setBrochureUrl] = useState<string | null>(null);
    const handlePropDataToSend = (propData?: LuxuryProjectsData) => {        
        onAction(propData);
    };

    return(
        <>
        <div className="max-w-screen-xl mx-auto relative z-10 text-white px-4 ">
            <div className={`absolute md:-top-32 -top-10 md:left-auto left-7 text-[60px] md:text-[140px] lg:text-[180px] font-bolder 
                ${montserratBolder.className} text-[#fff] opacity-10`}>02</div>
            <h2 className="lg:ml-20 sm-ml-0 ml-10 text-sm md:text-md lg:text-xl uppercase text-[#FBD784] font-bold tracking-[6] mb-5 flex gap-2 md:gap-5 sm:justify-start justify-center items-center text-center md:text-start">
                <span className="w-[35px] md:w-[65px] w-[25px] h-[3px] bg-[#FBD784]"></span>Explore Elegance
            </h2>
            <h3 className={`lg:ml-20 text-[24px] md:text-[35px] lg:text-[55px] leading-tight ${libreBaskervilleBold.className} capitalize` }>
                Discover Our
                <span className={`text-[40px] md:text-[55px] lg:text-[70px] after:bg-[#C19A5B] after:absolute after:w-[90px] 
                after:h-[25px] after:left-0 after:top-4 after:z-[-1] md:after:w-[120px] 
                md:after:h-[30px] md:after:top-7  lg:after:w-[150px] 
                lg:after:h-[40px] lg:after:top-8 ${parisienne.className} relative `}>
                    Luxury </span>
                Projects
            </h3>
            <LuxuryProjectsSlider data = {data} loadingStatus={loadingStatus} slides={data} onAction={handlePropDataToSend}  />            
        </div>
        </>
    )
}