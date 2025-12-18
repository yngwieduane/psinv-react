"use client";
import Image from "next/image";
import { BrittanySignature } from "@/utils/fonts";
import { Link } from "@/i18n/navigation";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function GetTheAppSection() {
  return (
    <div className="relative bg-white">
      <div className="container mx-auto px-3 lg:px-6 lg:px-12 py-0 md:py-15">
        <div className="text-center">
          <h2 className= {`${BrittanySignature.className} text-orange-600 text-[30px] md:text-[35px] mb-5`}>Get the app</h2>
          <h2 className={`text-4xl font-bold text-primary mb-12 ${outfit.className}`}>Your Journey Starts Here</h2>
        </div>

        <div className="flex flex-col lg:flex-row mt-10 md:mt-0 lg:mt-20 relative z-10">
          {/* Left Text */}
          <div className="w-full lg:w-[22%] text-center lg:text-left px-4 pt-0 lg:pt-20 order-3 lg:order-0">
            <p className="text-gray-500 leading-relaxed text-base text-[16px] md:text-[18px]">
              Take control of your real estate journey with our app. Whether you're booking a viewing,
              tracking your property progress, or staying updated on the latest listings, everything you
              need is at your fingertips. <br /> Download the app now and start your journey today!
            </p>
          </div>

{/* Image */}
  {/* Mobile background image */}
  <div className="relative w-full md:w-1/2 mx-auto h-[500px] bg-[url('/images/app-screens-mob.png')] bg-cover bg-top bg-no-repeat lg:hidden order-1" />

  {/* Desktop image */}
  <div className="hidden lg:flex relative w-full lg:w-[75%] justify-center items-center my-6 z-0 order-1 lg:order-0">
    <Image
      src="/images/app-screens-home.svg"
      alt="App Screens"
      title="App Screens"
      width={1200}
      height={1200}
      className="w-full max-w-[850px] h-auto -mt-20"
    />
    <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-white to-transparent -z-10" />
  </div>
          {/* Right Text */}
  <div className="w-full lg:w-[25%] lg:absolute lg:top-1/3 lg:-translate-y-[50%] lg:right-[20px] text-center lg:text-right px-4 mt-10 lg:mt-0 z-10 order-2 lg:order-0">
    <p className={`${BrittanySignature.className} text-orange-600 text-[24px] lg:text-[40px]`}>Start your journey today</p>
    <p className="text-blue-900 text-lg mt-2">with just one tap.</p>
  </div>
        </div>

{/* App Store Links */}
<div className="flex flex-col items-center justify-center mt-10 space-y-4">
  <p className="text-gray-800 text-lg font-medium text-center text-[#111954]">
    Available on App Store and Google Play
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
