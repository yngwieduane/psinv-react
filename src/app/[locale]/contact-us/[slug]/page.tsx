"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Breadcrumb from "../../_components/Breadcrumb";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import MapComponent from "../../_components/MapComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import InquiryForm from "../../_components/InquiryForm";
import { ContactLocation, contactLocations } from "@/data/contactLocations";
import { Poppins } from 'next/font/google';
import { Outfit } from "next/font/google";
import { MapPin } from "lucide-react";

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export default function ContactPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string | undefined;

  const initialOffice =
    contactLocations.find((location) => location.slug === slug) || contactLocations[0];
  const [selectedOffice, setSelectedOffice] = useState<ContactLocation>(initialOffice);

  useEffect(() => {
    if (selectedOffice.slug !== slug) {
      router.push(`/en/contact-us/${selectedOffice.slug}`, { scroll: false });
    }
  }, [selectedOffice, slug, router]);

  return (
    <>
      {/* <div className="container-fluid px-0">
        <Breadcrumb />
      </div> */}
        <div className="mx-auto px-6 md:px-12 pt-30">
      <div id="contact-container" className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-outfit font-bold text-[#111954] mb-8 md:mb-12">Contact Us</h1>
        <div className="w-full">
          <Swiper
    modules={[Navigation, Pagination]}
    slidesPerView="auto"
    spaceBetween={16}   // ✅ same as gap-4 (16px)
    navigation={false}
    pagination={false}
    className="!w-auto"
          >
            {contactLocations.map((location) => (
              <SwiperSlide key={location.id} className="!w-auto">
                <div
                  className={`min-w-[200px] p-6 rounded-xl border transition-all text-left group ${
                    selectedOffice.id === location.id
                      ? "border-primary bg-white shadow-lg"
                      : "border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md"
                  }`}
                  onClick={() => setSelectedOffice(location)}
                >
                  <h3 className="font-bold text-sm mb-1 text-primary font-outfit">{location.name}</h3>
                  
                  <p className="text-xs text-gray-500 leading-tight font-outfit group-hover:text-gray-600">{location.address_community},{location.address_city}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
<div className="mt-8 flex flex-col lg:flex-row gap-12 items-stretch">
  {/* Left */}
  <div className="order-2 lg:order-1 lg:w-5/12 space-y-6">
    <div className="bg-white rounded-xl">
      {/* Phones */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <a
          href={`tel:${selectedOffice.phone1}`}
          className="flex items-center justify-center gap-2 border border-primary text-primary font-bold py-3 rounded hover:bg-[#111954] hover:text-white transition-colors text-sm"
        >
          <FontAwesomeIcon icon={faPhoneAlt} className="w-4 h-4 fa-flip-horizontal" />
          {selectedOffice.phone1}
        </a>

        {selectedOffice.phone2 ? (
          <a
            href={`tel:${selectedOffice.phone2}`}
            className="flex items-center justify-center gap-2 border border-primary text-primary font-bold py-3 rounded hover:bg-[#111954] hover:text-white transition-colors text-sm"
          >
            <FontAwesomeIcon icon={faPhoneAlt} className="w-4 h-4 fa-flip-horizontal" />
            {selectedOffice.phone2}
          </a>
        ) : (
          <div className="flex items-center justify-center border border-gray-200 rounded py-3 text-sm text-gray-400 font-bold">
            —
          </div>
        )}
      </div>

      {/* Office */}
      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
        {selectedOffice.name}
      </h2>

      <div className={`flex items-start gap-2 text-gray-600 ${poppins.className}`}>
        <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-[#014081] shrink-jShrink-0" />
        <p className="text-sm leading-relaxed break-words text-gray-600">
          {selectedOffice.off_address.split(", ").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>

    {/* Form */}
    <div className="w-full">
      <InquiryForm />
    </div>
  </div>

  {/* Right */}
<div className="order-1 lg:order-2 lg:w-7/12">
  <div className="rounded-xl overflow-hidden border border-gray-300 bg-gray-200 h-[420px] md:h-[600px] lg:h-full relative">

    {/* Map */}
    <MapComponent
      latitude={selectedOffice.latitude}
      longitude={selectedOffice.longitude}
      fallbackImage={selectedOffice.img}
      height="100%"
    />

    {/* ✅ CENTER BOUNCING PIN */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <MapPin
        size={48}
        className="text-red-600 drop-shadow-lg animate-bounce"
        fill="currentColor"
      />
    </div>

    {/* Map Controls (design only) */}
    <div className="absolute top-4 left-4 flex bg-white rounded shadow-md text-xs font-bold text-gray-700 overflow-hidden">
      <button className="px-3 py-2 hover:bg-gray-100 border-r border-gray-200">
        Map
      </button>
      <button className="px-3 py-2 hover:bg-gray-100 text-gray-500">
        Satellite
      </button>
    </div>

  </div>
</div>
</div>

      </div>
      </div>
    </>
  );
}