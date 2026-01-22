'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Outfit } from 'next/font/google';
import { useLocale, useTranslations } from 'next-intl';
import BannerModals from '../../_components/HomeBannerModal';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function ReportDownloadDubai(props: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [setModal, setSetModal] = useState(false);

  const locale = useLocale();
  const isRTL = locale.toLowerCase().startsWith("ar");
  const t = useTranslations("ReportDownload");

  const modalHandler = () => {
    console.log("clicked = " + setModal);
    setSetModal(true);
  };

  const modalUpdate = (event: any) => {
    console.log(event);
    setSetModal(event);
  };

  return (
    <>
      <div className="report pb-10 pt-25" dir={isRTL ? "rtl" : "ltr"}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col-reverse md:flex-row items-center lg:h-[340px]
        bg-white rounded-3xl p-8 md:p-0 shadow-lg flex ">

            {/* Left Column - Text and Button */}
            <div className="w-full md:w-2/3 lg:w-1/2 text-center md:text-left px-4 md:px-12 mb-6 md:mb-0">
              <p className={`text-gray-500 uppercase tracking-widest text-sm mb-2 ${outfit.className}`}>{t("title")}</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 lg:mb-8 mb-4">{t("desc_dubai")}</p>

              <button
                className="mt-4 relative text-md lg:text-lg overflow-hidden rounded bg-orange-700 px-5 py-2.5 text-white transition-all duration-300 hover:bg-orange-800 hover:ring-2 hover:ring-orange-800 hover:ring-offset-2 cursor-pointer font-semibold"
                onClick={() => modalHandler()}
              >
                {t("download")}
              </button>
            </div>

            {/* Right Column - Image */}
            <div className="relative w-[220px] h-[160px] md:w-[500px] md:h-[321px] lg:w-[750px] lg:h-[521px] mt-1 md:mt-[-65px] mb-6 md:mb-[-20px] lg:mt-[-35px]">
              <Image
                src="/images/april-report-image.webp"
                alt="Monthly Report DXB"
                title="Monthly Report DXB"
                width={666}
                height={454}
                loading="lazy"
                quality={85}
                className="object-contain rounded-md"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
      <BannerModals modalState={setModal} onModalUpdate={modalUpdate} title={t('form.title')}
        submitLabel={t('form.title')}
        isReportDownload={true} city="Dubai" />
    </>
  );
}
