'use client';
import { useState } from 'react';
import Image from 'next/image';
import PopupForm from '../_components/PopupForm';
import ContactFormPopUp from '../_components/tools/ContactFormPopUp';
interface PopupFormProps {
    hideFeedbackButton?: boolean;
    isReportDownload?: boolean; // <-- add this
  }
  
export default function ReportDownloadSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
    <section className="report py-10 my-10"> 
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center rounded-xl bg-[#F0F0F0] md:h-[340px]">
          
          {/* Left Column - Text and Button */}
          <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-12 mb-6 md:mb-0">
            <p className="text-[28px] text-gray-900">Market Insights</p>
            <h5 className="text-[36px] text-[#333] font-bold">Monthly Report DXB</h5>
            
            <button
              className="mt-4 px-8 py-2 text-white text-lg font-medium rounded-lg"
              style={{ backgroundColor: '#E46027' }}
              onClick={() => setIsModalOpen(true)}
            >
              Download Now
            </button>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-[220px] h-[160px] md:w-[750px] md:h-[521px] mt-1 md:mt-[-35px] mb-6 md:mb-[-20px]">
            <Image
              src="/images/april-report.png"
              alt="Monthly Report DXB"
              fill
    className="object-contain rounded-md"
            />
          </div>
        </div>
      </div>
    </section>
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
