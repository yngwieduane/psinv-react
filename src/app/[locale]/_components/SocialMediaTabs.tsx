"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useTranslations } from "next-intl";
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const tabs = [
  { icon: faInstagram, label: "Instagram" },
  { icon: faXTwitter, label: "Twitter" },
  { icon: faYoutube, label: "YouTube" },
];

export default function SocialMediaTabs() {
  const t = useTranslations("SocialMediaTabs");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (window.twttr?.widgets) {
        window.twttr.widgets.load();
      }
      if (window.instgrm?.Embeds) {
        window.instgrm.Embeds.process();
      }
    });
  }, [selectedIndex]);


  return (
    <div className="container py-10 text-center" id="social">
      {/* ✅ Embed scripts only when this component mounts */}
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
      />

      <h2 className="text-3xl font-bold mb-6 dark:text-white">{t('title')}</h2>

      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex justify-center items-center gap-6 mb-6">
          {tabs.map((tab, idx) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                `w-16 h-16 rounded-full flex items-center justify-center text-xl transition-all shadow-md ${selected ? "bg-[#E35F27] text-white" : "bg-white text-[#969696] dark:bg-gray-800 dark:text-gray-400"
                }`
              }
              aria-label={tab.label}
            >
              <FontAwesomeIcon icon={tab.icon} />
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {/* Instagram Panel */}
          <Tab.Panel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "https://www.instagram.com/p/DC9J2JYJKDo/",
                "https://www.instagram.com/p/DCG8OauS3TH/",
                "https://www.instagram.com/p/DCjWPMEyNcl/",
              ].map((url, index) => (
                <div key={index} className="p-0 m-0">
                  <div className="w-full max-w-[360px] mx-auto min-h-[500px] overflow-hidden">
                    <blockquote
                      className="instagram-media"
                      style={{
                        width: "100%",
                        maxWidth: "100%",
                        minWidth: "auto",
                        margin: "0 auto",
                      }}
                    >
                      <a title="instagram" href={url}>
                        <span style={{ display: "none" }}>instagram</span>
                      </a>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>

          {/* Twitter Panel */}
          <Tab.Panel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "https://twitter.com/PSIEstate/status/1823353049835852281",
                "https://twitter.com/PSIEstate/status/1822239265696157966",
                "https://twitter.com/PSIEstate/status/1821512037421244585",
              ].map((url, index) => (
                <div key={index} className="card border-0">
                  <div className="card-body p-0 m-0">
                    <blockquote
                      className="twitter-tweet"
                      data-dnt="true"
                      style={{ maxWidth: "540px", minWidth: "326px" }}
                    >
                      <a title="twitter" href={url}>
                        <span style={{ display: "none" }}>twitter</span>
                      </a>
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>

          {/* YouTube Panel */}
          <Tab.Panel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { id: "SbwfmHfLZ1U", title: "1-3 Bedroom Apartments & Duplexes" },
                { id: "Afy2iHs6bds", title: "VISTA Heights | PSI Real Estate" },
                { id: "Uy75ISz1uy4", title: "Rove Home Marasi Drive" },
              ].map((video, index) => (
                <div key={index} className="card border-0 text-center">
                  <div className="card-body p-0 m-0">
                    <div className="aspect-video w-full">
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}`}
                        frameBorder="0"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>
                    <h5 className="text-base font-semibold mt-2 dark:text-white">{video.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
