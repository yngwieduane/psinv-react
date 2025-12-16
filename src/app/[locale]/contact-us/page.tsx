"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

export default function ContactPage() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<ContactLocation>(contactLocations[0]);

  const handleOfficeSelect = (location: ContactLocation) => {
    setSelectedLocation(location);
    router.push(`/en/contact-us/${location.slug}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-white pt-28 md:pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#111954] mb-8 md:mb-12">
          Contact Us
        </h1>

        {/* Branch Tabs */}
        <div className="w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView="auto"
            spaceBetween={16}
            navigation={false}
            pagination={false}
            className="w-full"
          >
            {contactLocations.map((location) => (
              <SwiperSlide key={location.id} className="!w-auto">
                <button
                  type="button"
                  onClick={() => handleOfficeSelect(location)}
 className={`min-w-[200px] p-6 rounded-xl border transition-all text-left group
    ${
      selectedLocation.id === location.id
        ? "border-primary bg-white shadow-lg"
        : "border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md"
    }`}
                >
                  <h4
                    className={`font-bold text-sm mb-1 ${
                      selectedLocation.id === location.id ? "text-primary" : "text-gray-700"
                    }`}
                  >
                    {location.name}
                  </h4>
                  <p className="text-xs text-gray-500 leading-tight group-hover:text-gray-600">
                    {location.address_community}, {location.address_city}
                  </p>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Content */}
<div className="flex flex-col lg:flex-row gap-12 mt-10 items-stretch">
  {/* Left */}
  <div className="lg:w-5/12 order-2 lg:order-1">
    <div className="bg-white rounded-xl">
      {/* Phone buttons */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <a
          href={`tel:${selectedLocation.phone1}`}
          className="flex items-center justify-center gap-2 border border-[#111954] text-[#111954] font-bold py-3 rounded hover:bg-[#111954] hover:text-white transition-colors text-sm"
        >
          <FontAwesomeIcon icon={faPhoneAlt} className="w-4 h-4 fa-flip-horizontal" />
          {selectedLocation.phone1}
        </a>

        {selectedLocation.phone2 ? (
          <a
            href={`tel:${selectedLocation.phone2}`}
            className="flex items-center justify-center gap-2 border border-[#111954] text-[#111954] font-bold py-3 rounded hover:bg-[#111954] hover:text-white transition-colors text-sm"
          >
            <FontAwesomeIcon icon={faPhoneAlt} className="w-4 h-4 fa-flip-horizontal" />
            {selectedLocation.phone2}
          </a>
        ) : (
          <div className="border border-gray-200 rounded py-3 text-center text-sm text-gray-400 font-bold">
            —
          </div>
        )}
      </div>

      {/* Office details */}
      <h2 className="text-3xl font-normal text-[#333333] mb-4">
        {selectedLocation.name}
      </h2>

      <div className="flex items-start gap-3 text-gray-600">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-[#014081] shrink-0" />
        <p className="text-sm leading-relaxed break-words">
          {selectedLocation.off_address.split(", ").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>

      {/* Inquiry */}
      <div className="mt-10">
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Inquire</h3>
        <InquiryForm />
      </div>
    </div>
  </div>

  {/* Right */}
  <div className="lg:w-7/12 order-1 lg:order-2">
    <div className="bg-gray-200 rounded-xl relative overflow-hidden border border-gray-300 h-[420px] md:h-[600px] lg:h-full">
      <MapComponent
        latitude={selectedLocation.latitude}
        longitude={selectedLocation.longitude}
        fallbackImage={selectedLocation.img}
        height="100%"
      />

      {/* Map Controls (design only) */}
      <div className="absolute top-4 left-4 flex bg-white rounded shadow-md text-xs font-bold text-gray-700 overflow-hidden">
        <button className="px-3 py-2 hover:bg-gray-100 border-r border-gray-200">Map</button>
        <button className="px-3 py-2 hover:bg-gray-100 text-gray-500">Satellite</button>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}
