"use client";
import Image from "next/image";
import { BrittanySignature } from "@/utils/fonts";
import { Link } from "@/i18n/navigation";
import { Outfit } from "next/font/google";
import { useLocale, useTranslations } from "next-intl";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function GetTheAppSection() {
  const locale = useLocale();
  const isRtl = locale.toLowerCase().startsWith("ar");
  const t = useTranslations("getTheApp");

  return (
    <div className="relative bg-white dark:bg-neutral-900" dir={isRtl ? "rtl" : "ltr"}>
      <div className="container mx-auto px-3 lg:px-6 lg:px-12 py-0 md:py-15 dark:bg-neutral-900">
        <div className="text-center">
          <h2 className={`${BrittanySignature.className} text-orange-600 text-[30px] md:text-[35px] mb-5`}>{t("title1")}</h2>
          <h2 className={`text-4xl font-bold text-primary mb-12 dark:text-white ${outfit.className}`}>{t("title2")}</h2>
        </div>

        <div className="flex flex-col lg:flex-row mt-10 md:mt-0 lg:mt-20 relative z-10" dir={isRtl ? "rtl" : "ltr"}>
          {/* Left Text */}
          <div className="w-full lg:w-[22%] text-center lg:text-left px-4 pt-0 lg:pt-20 order-3 lg:order-0">
            <p className="text-gray-500 leading-relaxed text-base text-[16px] md:text-[18px] dark:text-white">
              {t("desc.part1")} <br /> {t("desc.part2")}
            </p>
          </div>

          {/* Image */}
          {/* Mobile background image */}
          <div className="relative w-full md:w-1/2 mx-auto h-[500px] lg:hidden order-1">
            <Image
              src="/images/app-screens-mob.png"
              alt="Mobile App Screens"
              title="Mobile App Screens"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Desktop image */}
          <div className={`hidden lg:flex relative w-full lg:w-[75%] justify-center items-center my-6 z-0 order-1 lg:order-0 ${isRtl ? "scale-x-[-1]" : ""}`} dir={isRtl ? "rtl" : "ltr"}>
            <Image
              src="/images/app-screens-home.svg"
              alt="App Screens"
              title="App Screens"
              width={1200}
              height={1200}
              className="w-full max-w-[850px] h-auto -mt-20"
            />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-white to-transparent -z-10 dark:from-neutral-900 dark:to-neutral-700" />
          </div>
          {/* Right Text */}
          <div className={`w-full lg:w-[25%] lg:absolute lg:top-1/3 text-center lg:text-right px-4 mt-10 lg:mt-0 z-10 order-2 lg:order-0 ${isRtl ? 'lg:translate-y-[50%] lg:left-[20px] ' : 'lg:-translate-y-[50%] lg:right-[20px] '}`}>
            <p className={`${BrittanySignature.className} text-orange-600 text-[24px] lg:text-[40px]`}>{t("rightSideContent.title")}</p>
            <p className="text-blue-900 text-lg mt-2 dark:text-white">{t("rightSideContent.para")}.</p>
          </div>
        </div>

        {/* App Store Links */}
        <div className="flex flex-col items-center justify-center mt-10 space-y-4">
          <p className="text-gray-800 text-lg font-medium text-center text-[#111954] dark:text-white">
            {t("appLinks")}
          </p>

          <div className="flex items-center justify-center space-x-4">
            <Link
              href="https://apps.apple.com/us/app/psi-real-estate/id6736644035"
              target="_blank"
              rel="noopener noreferrer"
              title="App Store Link"
            >
              <Image
                src="/images/appstore.svg"
                alt="App Store"
                title="App Store"
                width={180}
                height={60}
              />
            </Link>
            <Link
              href="https://play.google.com/store/apps/details?id=com.psi.psirealestate"
              target="_blank"
              rel="noopener noreferrer"
              title="Gogle Store Link"
            >
              <Image
                src="/images/googleplay.svg"
                alt="Google Play"
                title="Google Play"
                width={180}
                height={60}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
