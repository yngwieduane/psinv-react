'use client';

import Image from "next/image";
import { useEffect } from "react";
import './components/hubspotform.css'

declare global {
  interface Window {
    hbspt?: any;
  }
}

const ShareYourFeedBackPageClient = () => {
  useEffect(() => {
    // Load HubSpot's default CSS (for consistent design)
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "https://js-eu1.hsforms.net/forms/embed/v2.css";
    document.head.appendChild(styleLink);

    // Load HubSpot script
    const script = document.createElement("script");
    script.src = "//js-eu1.hsforms.net/forms/embed/v2.js";
    script.async = true;
    script.charset = "utf-8";

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "eu1",
          portalId: "144642261",
          formId: "3b18f5c1-cea2-4cb9-b536-9f180780e381",
          target: "#hubspot-form-container",
          cssRequired: true,
          cssClass: "hubspot-feedback-form"
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(styleLink);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="container mx-auto flex flex-col md:flex-row my-8">
      {/* Left side */}
      <div className="md:w-1/2 p-6 flex flex-col justify-center">
        <div className="logo-container mb-4">
          <Image
            width={100}
            height={100}
            src="/assets/images/ad-real-estate-logo-only-new-2.png"
            alt="psi-logo"
            title="psi-logo"
          />
        </div>

        <div className="form-hubspot text-left">
          <h1 className="text-2xl font-semibold mb-2">Sign up to the App waiting list</h1>
          <p className="text-gray-600 mb-6">Join our app waitlist and be the first to discover our exclusive offers</p>

          <div id="hubspot-form-container" className="mt-5"></div>
        </div>
      </div>

      {/* Right side image */}
      <div className="md:w-1/2 relative h-[400px] md:h-auto">
        <Image
          src="/images/mobile-app-waitlist-registration-2.webp"
          alt="feedback registration"
          title="feedback registration"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default ShareYourFeedBackPageClient;
