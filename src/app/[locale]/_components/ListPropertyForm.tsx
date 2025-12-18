"use client";
import "react-phone-number-input/style.css";
import DynamicForm from "../_components/DynamicForm";
import Image from "next/image";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const ListPropertyForm: React.FC = () => {
  return (
    <>
      {/* <div className="w-full bg-[#f8f9fa] py-10 flex justify-center">
        <div className="relative w-full max-w-[1320px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
          
          <div className="relative w-full md:w-full h-[400px] md:h-[450px] overflow-hidden sm:px-2 px-1.5">
            <Image 
              src="/images/list-your-property-main-homepage-new.webp" 
              alt="List Your Property" 
              title="List Your Property" 
              className="w-full h-full object-cover rounded-lg"
              width={1000}
              height={300}
            />
            
            <button 
              className="absolute inset-0 flex items-center justify-center" 
              aria-label="Play Video"
            >
              <div className="w-12 h-12 bg-[#033f80] text-white rounded-full flex items-center justify-center shadow-md">
                ▶
              </div>
            </button>
          </div>

          <div className="hidden md:block absolute top-[120px] right-[30px] w-full md:w-[450px] bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-[#212529] mb-4 text-center">
              List Your Property
            </h2>
            <DynamicForm formType="propertyListing" />
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto text-left py-10 mt-10 md:mt-20 px-4 md:px-0">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
          Be with the Brand You Trust
        </h2>
      
        <div className="w-12 h-[2px] bg-black my-4"></div>
      
        <p className="text-[#6c757d] text-2xl md:text-2xl">
          Where will we list your property?
        </p>
      
        <div className="overflow-x-auto sm:overflow-hidden flex space-x-4 mt-6 px-4 scrollbar-hide">
          <Image src="/images/psi-logo.png" alt="PSI" title="PSI" width={70} height={50} className="h-10 md:h-12 shrink-0" />
          <Image src="/images/bayut-logo.png" alt="Bayut" title="Bayut" width={130} height={50} className="h-10 md:h-12 shrink-0" />
          <Image src="/images/dubizzle.png" alt="Dubizzle" title="Dubizzle" width={120} height={50} className="h-10 md:h-12 shrink-0" />
          <Image src="/images/property-finder.png" alt="Property Finder" title="Property Finder" width={150} height={50} className="h-10 md:h-12 shrink-0" />
        </div>
      </div> */}


    <section id="list-property" className="container mx-auto py-10 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          
          {/* Left Content */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url("/images/list-your-property-main-homepage-new.webp")' }}
            >
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px]" />
            </div>
            
            <div className="absolute bottom-0 left-0 p-10 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent w-full">
              <h2 className={`text-3xl font-serif font-bold text-white mb-4 ${outfit.className}`}>
                BE with the Brand you Trust
              </h2>
              <div className="w-16 h-1 bg-secondary mb-6" />
              <p className={`text-gray-200 mb-6 font-light ${outfit.className}`}>Where will we list your property?</p>
              
              <div className="flex gap-6 items-center opacity-90 flex-wrap">
                <div className="font-bold text-xl text-white">PSI</div>
                <div className="font-bold text-xl text-white">bayut</div>
                <div className="font-bold text-xl text-white">dubizzle</div>
                <div className="font-bold text-xl text-white">Property Finder</div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:w-1/2 p-8 md:p-12 bg-white">
            <h3 className={`text-2xl font-serif font-bold mb-6 text-gray-800 ${outfit.className}`}>List Your Property</h3>
            <DynamicForm formType="propertyListing" />
          </div>

        </div>
      </div>
    </section>
    </>
  );
};

export default ListPropertyForm;

