'use client';
import { useState } from 'react';
import Image from 'next/image';
import PopupForm from '../_components/PopupForm';
import ContactFormPopUp from '../_components/tools/ContactFormPopUp';
import { Outfit } from 'next/font/google';
interface PopupFormProps {
    hideFeedbackButton?: boolean;
    isReportDownload?: boolean; // <-- add this
  }

  const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    display: "swap",
  });
  
export default function ReportDownloadSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
    <div className="report pb-10 pt-25"> 
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center lg:h-[340px]
        bg-white rounded-3xl p-8 md:p-0 shadow-lg flex ">
          
          {/* Left Column - Text and Button */}
          <div className="w-full md:w-2/3 lg:w-1/2 text-center md:text-left px-4 md:px-12 mb-6 md:mb-0">
            <p className={`text-gray-500 uppercase tracking-widest text-sm mb-2 ${outfit.className}`}>Market Insights</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 lg:mb-8 mb-4">Monthly Report DXB</p>
            
            <button
              className="mt-4 relative text-md lg:text-lg overflow-hidden rounded bg-orange-700 px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              Download Now
            </button>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-[220px] h-[160px] md:w-[500px] md:h-[321px] lg:w-[750px] lg:h-[521px] mt-1 md:mt-[-65px] mb-6 md:mb-[-20px] lg:mt-[-35px]">
            <Image
              src="/images/april-report.png"
              alt="Monthly Report DXB"
              title="Monthly Report DXB"
              fill
              className="object-contain rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
              <div className="bg-white p-6 rounded-xl w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
                <button
                  className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-black"
                  onClick={() => setIsModalOpen(false)}
                >
                  &times;
                </button>
                <ContactFormPopUp
  title="Monthly Report"
  submitLabel="Download Report"
  isReportDownload={true}
/>

              </div>
            </div>
          )}
        </>
  );
}
