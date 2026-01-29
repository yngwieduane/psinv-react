'use client';

import Image from "next/image";
import { useEffect } from "react";

declare global {
  interface Window {
    hbspt?: any;
  }
}

const ShareYourFeedBackPageClient = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js-eu1.hsforms.net/forms/embed/v2.js";
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;

    script.onload = () => {
      if (window?.hbspt) {
        window.hbspt.forms.create({
          region: "eu1",
          portalId: "144642261",
          formId: "0271f7fb-35ba-4038-9e78-10fa3203a72b",
          target: "#hubspot-form-container",
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="container mx-auto flex flex-col md:flex-row">
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
          <h1 className="text-2xl font-semibold mb-2">We want to hear from you!</h1>
          <p className="text-gray-600 mb-6">Share with us how we can help you better</p>

          <div id="hubspot-form-container" className="mt-5"></div>
        </div>
      </div>

      {/* Right side image */}
      <div className="md:w-1/2 relative h-[400px] md:h-auto">
        <Image
          src="/images/share-your-feedback-registration.jpg"
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
