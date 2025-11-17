"use client";
import "react-phone-number-input/style.css";
import DynamicForm from "../_components/DynamicForm";
import Image from "next/image";

const ListPropertyForm: React.FC = () => {
  return (
    <>
      <div className="w-full bg-[#f8f9fa] py-10 flex justify-center">
        <div className="relative w-full max-w-[1320px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
          
          {/* Image Section */}
          <div className="relative w-full md:w-full h-[400px] md:h-[450px] overflow-hidden sm:px-2 px-1.5">
            <Image 
              src="/images/list-your-property-main-homepage-new.webp" 
              alt="List Your Property" 
              title="List Your Property" 
              className="w-full h-full object-cover rounded-lg"
              width={1000}
              height={300}
            />

            {/* Play Button */}
            <button 
              className="absolute inset-0 flex items-center justify-center" 
              aria-label="Play Video"
            >
              <div className="w-12 h-12 bg-[#033f80] text-white rounded-full flex items-center justify-center shadow-md">
                ▶
              </div>
            </button>
          </div>

          {/* Desktop Form - Overlapping Image */}
          <div className="hidden md:block absolute top-[120px] right-[30px] w-full md:w-[450px] bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-[#212529] mb-4 text-center">
              List Your Property
            </h2>
            <DynamicForm formType="propertyListing" />
          </div>
        </div>
      </div>

      {/* Branding Section - Always Below Form */}
      <div className="max-w-[1320px] mx-auto text-left py-10 mt-10 md:mt-20 px-4 md:px-0">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
          Be with the Brand You Trust
        </h2>
      
        <div className="w-12 h-[2px] bg-black my-4"></div>
      
        <p className="text-[#6c757d] text-2xl md:text-2xl">
          Where will we list your property?
        </p>
      
        {/* Logos */}
        <div className="overflow-x-auto sm:overflow-hidden flex space-x-4 mt-6 px-4 scrollbar-hide">
          <Image src="/images/psi-logo.png" alt="PSI" title="PSI" width={70} height={50} className="h-10 md:h-12 shrink-0" />
          <Image src="/images/bayut-logo.png" alt="Bayut" title="Bayut" width={130} height={50} className="h-10 md:h-12 shrink-0" />
          <Image src="/images/dubizzle.png" alt="Dubizzle" title="Dubizzle" width={120} height={50} className="h-10 md:h-12 shrink-0" />
          <Image src="/images/property-finder.png" alt="Property Finder" title="Property Finder" width={150} height={50} className="h-10 md:h-12 shrink-0" />
        </div>

      </div>
    </>
  );
};

export default ListPropertyForm;

