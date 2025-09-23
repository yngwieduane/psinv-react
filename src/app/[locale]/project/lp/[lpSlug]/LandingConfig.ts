// src/app/[locale]/project/lp/[lpSlug]/LandingConfig.ts

import type { FloorGroup, FileLink } from "./_components/FloorPlans";

export type SectionKey =
  | "hero"
  | "usp"
  | "about"
  | "gallery"
  | "overview"
  | "floor-plan"
  | "location"
  | "amenities"
  | "footer";

export interface LandingConfig {
  title: string;
  description?: string;
  ogImage?: string;
  sections: ReadonlyArray<SectionKey>;
  data: {
    hero?: { img?: string };
    usp?: { items: ReadonlyArray<{ title: string; desc?: string }> };
    about?: {
      img?: string;          // image shown on the left
      heading?: string;      // fallback if translation missing
      subheading?: string;   // e.g., "About the Project"
      description?: string;  // rich copy
      ctaText?: string;      // fallback for CTA label
      ctaHref?: string;      // CTA target
      videoId?: string;      // optional YouTube ID
    };
    amenities?: {
      img?: string;
      items: ReadonlyArray<{ key: string; icon?: string }>;
    };
    gallery?: { images: string[] };
    floorPlan?: {
      heroImage?: string;
      groups: FloorGroup[];  // tabs & images
      files?: FileLink[];    // optional fallback list
      ns?: string;           // optional i18n namespace
    };
    location?: {mapEmbedUrl : string};
    footer?: {
      heading?: string;
      address?: string;
      localTel?: string;
      intlTel?: string;
      socials?: ReadonlyArray<{ type: "facebook" | "instagram" | "x" | "linkedin" | "youtube" | "tiktok" | "whatsapp" | "snapchat"; href: string }>;
      formHeading?: string;
    };
     integration?: {
      metaSlug?: string;
      meta?: CRMMeta;
      heroVariant?: "glass" | "solid";
      footerVariant?: "glass" | "solid";
    };
  };
}
export type UtmMeta = {
  media_Type?: number;
  media_Name?: number;
  MethodOfContactVal?: number;
};

/** CRM/Integration meta stored per slug */
export type CRMMeta = {
  sendto?: string;
  ContactType?: number;
  Bathroom?: number;
  Bedroom?: number;
  assignto?: number | string;
  refby?: number | string;
  refto?: number | string;
  CountryID?: number;
  StateID?: number;
  CityID?: number;
  DistrictID?: number;
  CommunityID?: number;
  SubCommunityID?: number;
  UnitType?: number;
  remarks?: string;
  RequirementType?: number;
  Branch?: string;
  MethodOfContactVal?: number;

  utmCampaignMap?: Record<string, number>;
  utmRemarksMap?: Record<string, string>;
  utmMetaMap?: Record<string, UtmMeta>;
};
export const landingConfigs = {
  "sama-yas": {
    title: "Sama Yas",
    description: "Experience the epitome of luxurious living on Yas Island.",
    ogImage: "/images/og/sama-yas.jpg",
    sections: ["hero", "usp", "about", "gallery", "amenities", "floor-plan", "location", "footer"], // 👈 include "floor-plan"
    data: {
      hero: {
        img: "/images/landing-page/sama-yas/hero.webp",
      },
      usp: {
        items: [
          { title: "1 - 3 BR", desc: "Apartments" },
          { title: "Duplexes", desc: "Penthouses" },
          { title: "Flexible", desc: "payment plan" },
          { title: "AED 1,900,000", desc: "Starting from" },
          { title: "2027", desc: "Handover" },
          { title: "10%", desc: "Down Payment" },
          { title: "For All", desc: "Nationalities" },
          { title: "YAS", desc: "Island" },
        ],
      },
      about: {
        img: "/images/landing-page/sama-yas/sama-yas-about.webp",
        heading: "Sama Yas - Yas Island",
        subheading: "About the Project",
        description:
          "The first collection of exquisite homes that embrace a holistic approach to well-being and offer luxury park living on Yas Island.",
        ctaText: "Download Brochure",
        ctaHref: "#download-brochure",
        videoId: "v8asArEvRXU",
      },
      gallery: {
        images: [
          "/images/landing-page/sama-yas/gallery/gallery-1.webp",
          "/images/landing-page/sama-yas/gallery/gallery-2.webp",
          "/images/landing-page/sama-yas/gallery/gallery-3.webp",
          "/images/landing-page/sama-yas/gallery/gallery-4.webp",
          "/images/landing-page/sama-yas/gallery/gallery-5.webp",
          "/images/landing-page/sama-yas/gallery/gallery-6.webp",
        ],
      },
      amenities: {
        items: [
          { key: "theatreRoom", icon: "/images/landing-page/lp-icons/theatre.svg" },
          { key: "conciergeService", icon: "/images/landing-page/lp-icons/concierge-service.svg" },
          { key: "communityGardens", icon: "/images/landing-page/lp-icons/gardens.svg" },
          { key: "gym", icon: "/images/landing-page/lp-icons/gym.svg" },
          { key: "retail", icon: "/images/landing-page/lp-icons/retail.svg" },
          { key: "cafes", icon: "/images/landing-page/lp-icons/cafe.svg" },
          { key: "spa", icon: "/images/landing-page/lp-icons/spa.svg" },
          { key: "cycling", icon: "/images/landing-page/lp-icons/cycling.svg" },
          { key: "joggingTracks", icon: "/images/landing-page/lp-icons/jogging.svg" },
        ],
      },
      floorPlan: {
        heroImage: "/images/landing-page/sama-yas/gallery/gallery-8.webp",
        ns: "LandingPages.sama-yas.floorPlans",
        groups: [
          {
            titleKey: "oneBed",
            images: [
              "/images/landing-page/sama-yas/bedroom/1br-1.webp",
            ],
            pdfUrl: "/files/sama-yas/floorplans/1br.pdf",
          },
          {
            titleKey: "twoBed",
            images: ["/images/landing-page/sama-yas/bedroom/2br-1.webp",
                     "/images/landing-page/sama-yas/bedroom/2br-2.webp",
            ],
            pdfUrl: "/files/sama-yas/floorplans/2br.pdf",
          },
          {
            titleKey: "threeBed",
            images: ["/images/landing-page/sama-yas/bedroom/3br-1.webp",
                     "/images/landing-page/sama-yas/bedroom/3br-2.webp",
            ],
            pdfUrl: "/files/sama-yas/floorplans/3br.pdf",
          },
        ],
      },
      location: {
        mapEmbedUrl: "https://maps.google.com/?q=Yas%20Island&output=embed",
      },
         footer: {
        heading: "OUR EXPERT WILL HELP YOU\nBUY THE BEST",
        address:
          "Addax Tower Level 44, Al Reem Island, City of Lights, Abu Dhabi, United Arab Emirates",
        localTel: "600 548 200",
        intlTel: "+971 2205 2999",
        socials: [
          { type: "facebook", href: "https://facebook.com/PSI" },
          { type: "instagram", href: "https://instagram.com/PSI" },
          { type: "linkedin", href: "https://linkedin.com/company/PSI" },
          { type: "youtube", href: "https://youtube.com/@PSI" },
        ],
        formHeading: "Let us know if you’re interested!",
      },
          integration: {
      meta: {
        sendto: "callcenter@psinv.net",
        ContactType: 3,
        Bathroom: 21935,
        Bedroom: 21935,
        assignto: 3458,
        refby: 3458,
        refto: 3458,
        CountryID: 65946,
        StateID: 91823,
        CityID: 91823,
        DistrictID: 102625,
        UnitType: 19,
        remarks: "Company",
        RequirementType: 91212,
        Branch: "AUH",
        MethodOfContactVal: 115747,

        utmCampaignMap: {
          Irani_RAK_General_Newsletter: 2836,
        },
        utmRemarksMap: {
          Irani_RAK_General_Newsletter:
            "Rotation: Company, Campaign name: Irani: RAK General Newsletter",
        },
        utmMetaMap: {
          Irani_RAK_General_Newsletter: {
            media_Type: 63906,
            media_Name: 63907,
            MethodOfContactVal: 115747,
          },
        },
      },
    },
    },
  },
} as const satisfies Record<string, LandingConfig>;

export type LpSlug = keyof typeof landingConfigs;
