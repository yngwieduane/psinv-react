// /app/[locale]/contact-us/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import InquiryForm from "../../[locale]/_components/ContactInquiryForm";
import { Phone, MapPin } from "lucide-react";
import { Outfit } from "next/font/google";
import { ContactLocation, contactLocations } from "@/data/contactLocations";
import Breadcrumb from "../_components/Breadcrumb";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function ContactPage() {
  const locale = useLocale();
  const t = useTranslations("ContactPage");
  const isRTL = locale.toLowerCase().startsWith("ar");

  const L = (en: string, ar?: string) => (isRTL && ar ? ar : en);

  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<ContactLocation>(
    contactLocations[0]
  );

  const handleOfficeSelect = (location: ContactLocation) => {
    setSelectedLocation(location);

    const qs = typeof window !== "undefined" ? window.location.search : "";
    router.push(`/${locale}/contact-us/${location.slug}${qs}`, { scroll: false });
  };

  return (
    <>
      <div
        dir={isRTL ? "rtl" : "ltr"}
        className={`min-h-screen bg-white dark:bg-neutral-900 ${isRTL ? "text-right" : ""
          }`}
      >
        <div className="pt-28 md:pt-36 border-b border-gray-100 bg-white dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <div className="container mx-auto">
            <Breadcrumb
            />
          </div>
        </div>
        <div className="container mx-auto px-6 md:px-12 py-10">
          <h1
            className={`${outfit.className} text-2xl sm:text-3xl md:text-3xl font-bold text-primary mb-2 md:mb-4 leading-tight dark:text-white`}
          >
            {t("title")}
          </h1>

          <div className="w-full">
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView="auto"
              spaceBetween={16}
              navigation={false}
              pagination={false}
              className="w-full py-4"
            >
              {contactLocations.map((location) => (
                <SwiperSlide key={location.id} className="!w-auto">
                  <button
                    type="button"
                    onClick={() => handleOfficeSelect(location)}
                    className={`cursor-pointer min-w-[200px] p-6 rounded-xl border transition-all group ${isRTL ? "text-right" : "text-left"
                      } ${selectedLocation.id === location.id
                        ? "border-primary bg-white shadow-lg dark:bg-gray-800 dark:border-primary"
                        : "border-gray-100 bg-gray-50 hover:bg-white hover:shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                      }`}
                  >
                    <h4
                      className={`font-bold text-sm mb-1 ${selectedLocation.id === location.id
                        ? "text-primary dark:text-white"
                        : "text-gray-700 dark:text-gray-300"
                        }`}
                    >
                      {L(location.name, location.name_ar)}
                    </h4>
                    <p className="text-xs text-gray-500 leading-tight group-hover:text-gray-600 dark:text-gray-400 dark:group-hover:text-gray-300">
                      {L(location.address_community, location.address_community_ar)}
                      {", "}
                      {L(location.address_city, location.address_city_ar)}
                    </p>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 mt-10 items-stretch">
              {/* Left */}
              <div className="lg:w-5/12 order-2 lg:order-1">
                <div className="bg-white rounded-xl dark:bg-gray-800 p-6 shadow-sm dark:shadow-none">
                  {/* Phone buttons */}
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    <a
                      href={`tel:${selectedLocation.phone1}`}
                      className="flex items-center justify-center gap-2 border border-[#111954] text-[#111954] font-bold py-3 rounded hover:bg-[#111954] hover:text-white transition-colors text-sm dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-[#111954]"
                    >
                      <Phone size={16} />
                      {selectedLocation.phone1}
                    </a>

                    {selectedLocation.phone2 ? (
                      <a
                        href={`tel:${selectedLocation.phone2}`}
                        className="flex items-center justify-center gap-2 border border-[#111954] text-[#111954] font-bold py-3 rounded hover:bg-[#111954] hover:text-white transition-colors text-sm dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-[#111954]"
                      >
                        <Phone size={16} />
                        {selectedLocation.phone2}
                      </a>
                    ) : (
                      <div className="border border-gray-200 rounded py-3 text-center text-sm text-gray-400 font-bold">
                        —
                      </div>
                    )}
                  </div>
                  <h2 className="text-3xl font-normal text-[#333333] mb-4 dark:text-white">
                    {L(selectedLocation.name, selectedLocation.name_ar)}
                  </h2>
                  <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                    <MapPin size={18} className="mt-1 text-secondary shrink-0" />
                    <p className="text-sm leading-relaxed break-words">
                      {L(selectedLocation.off_address, selectedLocation.off_address_ar)
                        .split(", ")
                        .map((line, index) => (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        ))}
                    </p>
                  </div>
                  <div className="mt-10">
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-6 dark:text-white">
                      {t("inquire")}
                    </h3>
                    <InquiryForm />
                  </div>
                </div>
              </div>
              {/* Right */}
              <div className="lg:w-7/12 order-1 lg:order-2">
                <div className="bg-gray-200 rounded-xl relative overflow-hidden border border-gray-300 h-[420px] md:h-[600px] lg:h-full dark:bg-gray-800 dark:border-gray-700">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps?q=${selectedLocation.latitude},${selectedLocation.longitude}&z=15&output=embed`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <MapPin
                      size={48}
                      className="text-red-600 drop-shadow-lg animate-bounce"
                      fill="currentColor"
                    />
                  </div>
                  <div
                    className={`absolute top-4 flex bg-white rounded shadow-md text-xs font-bold text-gray-700 overflow-hidden dark:bg-gray-800 dark:text-gray-200 ${isRTL ? "right-4" : "left-4"
                      }`}
                  >
                    <button className="px-3 py-2 hover:bg-gray-100 border-r border-gray-200 dark:hover:bg-gray-700 dark:border-gray-700">
                      {t("map")}
                    </button>
                    <button className="px-3 py-2 hover:bg-gray-100 text-gray-500 dark:hover:bg-gray-700 dark:text-gray-400">
                      {t("satellite")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
