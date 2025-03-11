"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "../_components/Breadcrumb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import MapComponent from "../_components/MapComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import InquiryForm from "../../[locale]/_components/InquiryForm";
import { ContactLocation, contactLocations } from "@/data/contactLocations";
import MainFooter from "@/app/[locale]/_components/MainFooter";


export default function ContactPage() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<ContactLocation>(contactLocations[0]); 

  const handleOfficeSelect = (location: ContactLocation) => {
    setSelectedLocation(location);
    router.push(`/en/contact-us/${location.slug}`, { scroll: false });
  };
  return (
    <>
      <div className="container-fluid px-0">
        <Breadcrumb />
      </div>
      <div id="contact-container" className="container mx-auto max-w-[1200px]">
        <h1 className="lg:text-3xl sm:text-2xl font-bold my-4 sm:pl-6">Contact Us</h1>
        {/* Office Slider */}
        <div className="w-full overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1.5}
            spaceBetween={5}
            navigation={false}
            pagination={false}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 6 },
            }}
            className="w-full contact-swiper"
            style={{ maxWidth: "1200px", margin: "0 auto", overflow: "hidden" }}
          >
            {contactLocations.map((location) => (
              <SwiperSlide key={location.id} className="mx-1 my-1 h-[150px]">
                <div
                  className={`p-2 rounded-lg cursor-pointer flex flex-col items-center justify-center text-center shadow-lg h-full ${
                    selectedLocation.id === location.id
                      ? "bg-[#111954] text-white"
                      : "bg-white text-black hover:bg-[#111954] hover:text-white"
                  }`}
                  onClick={() => handleOfficeSelect(location)}
                  style={{
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                    minHeight: "100%",
                  }}
                >
                  <h3 className="text-sm font-semibold">{location.name}</h3>
                  <p className="text-sm">{location.address_community}</p>
                  <p className="text-sm">{location.address_city}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* Contact Details Section */}
        <div className="row contact-row mx-0 d-flex align-items-stretch flex-grow-1 mt-8">
          <div className="order-1 md:order-2 col-md-6 space-y-4 d-flex flex-grow-1 align-items-stretch">
            <div className="p-4 border-none rounded bg-white h-100 d-flex flex-column">
              <MapComponent
                latitude={selectedLocation.latitude}
                longitude={selectedLocation.longitude}
                fallbackImage={selectedLocation.img}
              />
            </div>
          </div>
          {/* Contact Information */}
          <div className="col-md-6 order-2 md:order-1 space-y-4 d-flex flex-grow-1 align-items-stretch">
            <div className="p-4 border-none rounded bg-white d-flex flex-col">
              {/* Office Name & Address */}
              <div className="order-1 md:order-1">
                <h2 className="mt-5 mb-3 text-[1.75em] text-[#333333]">{selectedLocation.name}</h2>
                <p className="text-[#333333] text-[16px] leading-6 whitespace-normal flex items-start gap-2">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#014081] mt-1" />
                  <span className="flex flex-col">
                    {selectedLocation.off_address.split(", ").map((line, index) => (
                      <span key={index}>{line}</span>
                    ))}
                  </span>
                </p>
              </div>
              <div className="flex gap-4 justify-center mt-8 order-2 md:order-1">
                <a
                  href={`tel:${selectedLocation.phone1}`}
                  className="flex-1 flex items-center justify-center border-2 border-[#111954] rounded-md lg:px-6 sm:px-1 sm:py-1 lg:py-3 text-[#111954] font-semibold bg-white transition-all duration-300 hover:text-white hover:bg-[#111954] hover:border-[#111954] shadow-sm text-center group"
                >
                  <FontAwesomeIcon icon={faPhoneAlt} className="w-5 h-5 mr-2 fa-flip-horizontal text-[#111954] transition-all duration-300 group-hover:text-white" />
                  {selectedLocation.phone1}
                </a>
                <a
                  href={`tel:${selectedLocation.phone2}`}
                  className="flex-1 flex items-center justify-center border-2 border-[#111954] rounded-md lg:px-6 sm:px-1 sm:py-1 lg:py-3 text-[#111954] font-semibold bg-white transition-all duration-300 hover:text-white hover:bg-[#111954] hover:border-[#111954] shadow-sm text-center group"
                >
                  <FontAwesomeIcon icon={faPhoneAlt} className="mr-2 fa-flip-horizontal w-5 h-5 text-[#111954] transition-all duration-300 group-hover:text-white" />
                  {selectedLocation.phone2}
                </a>
              </div>
            </div>
            {/* Inquiry Form */}
            <div className="w-full">
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-10">
      <MainFooter />
      </div>
    </>
  );
}