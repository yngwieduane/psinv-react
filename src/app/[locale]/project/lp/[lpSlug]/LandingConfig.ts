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
  title: string;              // can keep as fallback
  description?: string;       // can keep as fallback
  ogImage?: string;
  meta?: {
    title?: string;           // SEO title (browser tab / OG / Twitter)
    description?: string;     // SEO description (OG / Twitter)
    ogImage?: string;         // optional per-page override
  };
  sections: ReadonlyArray<SectionKey>;
  data: {
    hero?: {
      img?: string;
      heading?: string;       // HERO title (UI)
      sub?: string;           // HERO subheading (UI)
      description?: string;   // HERO paragraph (UI)
      ctaText?: string;       // optional if you want
    };
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
    location?: { mapEmbedUrl: string };
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
  PropertyID?: number;
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
    meta: {
      title: "Sama Yas | PSI",
      description: "Experience the epitome of luxurious living on Yas Island.",
      ogImage: "/images/og/sama-yas.jpg",
    },
    sections: ["hero", "usp", "about", "gallery", "amenities", "floor-plan", "location", "footer"],
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
  "yas-riva": {
    title: "Yas Riva",
    description: "Experience the epitome of luxurious living on Yas Island.",
    ogImage: "/images/og/yas-riva.webp",
    meta: {
      title: "Yas Riva Villas on Yas Island | PSI",
      description: "Explore Yas Riva villas with waterfront living, flexible payment plans, and handover Q2 2028.",
      ogImage: "/images/og/yas-riva.webp",
    },
    sections: ["hero", "usp", "about", "gallery", "amenities", "floor-plan", "location", "footer"],
    data: {
      hero: {
        img: "/images/landing-page/yas-riva/hero.webp",
      },
      usp: {
        items: [
          { title: "4 – 6 BR", desc: "Bedroom" },
          { title: "8.3M AED", desc: "Starting From" },
          { title: "5%", desc: "Downpayment" },
          { title: "Flexible", desc: "Payment Plan" },
          { title: "Q2 2028", desc: "Handover" },
          { title: "Standalone", desc: "Villa" },
        ],
      },

      about: {
        img: "/images/landing-page/yas-riva/yas-riva-about.webp",
        heading: "Yas Riva – Yas Island",
        subheading: "About the Project",
        description:
          "Yas Riva, an exclusive villa community on Yas Island offering buyers a choice of both canal-front and canal-accessible homes designed to facilitate luxurious relaxation in a tranquil waterfront setting.\n\nSurrounded by world-class attractions, Yas Riva offers a distinctive lifestyle of ease and elegance, where every detail and moment matter, and the water becomes an extension of the home.\n\nWith sleek and elegant design principles, Yas Riva is one of the few residential developments in Abu Dhabi offering direct access to a canal.",
        ctaText: "Download Brochure",
        ctaHref: "#download-brochure",
      },

      gallery: {
        images: [
          "/images/landing-page/yas-riva/gallery/gallery-1.webp",
          "/images/landing-page/yas-riva/gallery/gallery-2.webp",
          "/images/landing-page/yas-riva/gallery/gallery-3.webp",
          "/images/landing-page/yas-riva/gallery/gallery-4.webp",
          "/images/landing-page/yas-riva/gallery/gallery-5.webp",
          "/images/landing-page/yas-riva/gallery/gallery-6.webp",
        ],
      },

      amenities: {
        items: [
          { key: "Waterfront Living", icon: "/images/landing-page/lp-icons/water-front.svg" },
          { key: "Community Market", icon: "/images/landing-page/lp-icons/retail.svg" },
          { key: "Pocket Parks", icon: "/images/landing-page/lp-icons/park.svg" },
          { key: "Relaxation spots", icon: "/images/landing-page/lp-icons/relaxation.svg" },
          { key: "Treatment room", icon: "/images/landing-page/lp-icons/treatment.svg" },
          { key: "Swimming Pool", icon: "/images/landing-page/lp-icons/shared-pool.svg" },
        ],
      },

      floorPlan: {
        heroImage: "/images/landing-page/yas-riva/yas-riva-master-plan.webp",
        ns: "LandingPages.yas-riva.floorPlans",
        groups: [
          {
            titleKey: "oneBed",
            images: ["/images/landing-page/yas-riva/bedroom/4br-1.webp"],
            pdfUrl: "/files/yas-riva/floorplans/1br.pdf",
          },
          {
            titleKey: "twoBed",
            images: [
              "/images/landing-page/yas-riva/bedroom/5br-1.webp",
              "/images/landing-page/yas-riva/bedroom/5br-2.webp",
              "/images/landing-page/yas-riva/bedroom/5br-3.webp",
              "/images/landing-page/yas-riva/bedroom/5br-4.webp",
              "/images/landing-page/yas-riva/bedroom/5br-5.webp",
            ],
            pdfUrl: "/files/yas-riva/floorplans/2br.pdf",
          },
          {
            titleKey: "threeBed",
            images: ["/images/landing-page/yas-riva/bedroom/6br-1.webp",
              "/images/landing-page/yas-riva/bedroom/6br-2.webp",
            ],
            pdfUrl: "/files/yas-riva/floorplans/3br.pdf",
          },
        ],
      },

      location: {
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10467.310161102645!2d54.61074782047766!3d24.513860818210784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e4f006ee69d99%3A0x57de6978f050f958!2sYas%20Riva!5e0!3m2!1sen!2sae!4v1766147796559!5m2!1sen!2sae",
      },

      footer: {
        heading: "OUR EXPERT WILL HELP YOU\nBUY THE BEST",
        address: "Addax Tower Level 44, Al Reem Island, City of Lights, Abu Dhabi, United Arab Emirates",
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
          PropertyID: 24093,
          CommunityID: 165011,
          UnitType: 20,
          remarks: "Company",
          RequirementType: 91212,
          Branch: "AUH",
          MethodOfContactVal: 115747,

          utmCampaignMap: {
            RamhanIsland_Hubspot: 2133,
          },
          utmRemarksMap: {
            RamhanIsland_Hubspot: "Rotation: Company, Campaign name: RamhanIsland_Hubspot",
          },
          utmMetaMap: {
            RamhanIsland_Hubspot: {
              media_Type: 63906,
              media_Name: 63907,
              MethodOfContactVal: 115747,
            },
          },
        },
      },
    },
  },
  "manarat-living-saadiyat": {
    title: "Manarat Living - Saadiyat Island",
    description:
      "Own a studio, 1 bed, 2-bed, or 2-bed + maid apartment in the first living development in Saadiyat Island’s Cultural District.",
    ogImage: "/images/og/manarat-living-saadiyat.webp",

    meta: {
      title: "Manarat Living Saadiyat | Apartments in Saadiyat Cultural District | PSI",
      description:
        "Own a studio, 1 bed, 2-bed, or 2-bed + maid apartment in the first living development in Saadiyat Island’s Cultural District.",
      ogImage: "/images/og/manarat-living-saadiyat.webp",
    },

    sections: ["hero", "usp", "about", "gallery", "amenities", "floor-plan", "location", "footer"],

    data: {
      hero: {
        img: "/images/landing-page/manarat-living-saadiyat/hero.webp",
        heading: "Manarat Living - Saadiyat Island",
        sub: "A NEW DESIGN CONCEPT BY ALDAR",
        description:
          "Own a studio, 1 bed, 2-bed, or 2-bed + maid apartment in the first living development in Saadiyat Island’s Cultural District.",
        ctaText: "Download Brochure",
      },

      usp: {
        items: [
          { title: "Studio - 2BR", desc: "Apartments" },
          { title: "Flexible", desc: "Payment Plan" },
          { title: "AED 634,000", desc: "Starting From" },
          { title: "2026", desc: "Handover" },
          { title: "5%", desc: "Down Payment" },
          { title: "By", desc: "ALDAR" },
        ],
      },

      about: {
        img: "/images/landing-page/manarat-living-saadiyat/manarat-living.webp",
        heading: "Manarat Living - Saadiyat Island",
        subheading: "About the Project",
        description:
          "A groundbreaking new approach that’s bringing home ownership down to earth, with properties to suit your tastes, amenities made for your needs, in locations that connect you to everything. Whether you’re growing your family or building a career, leave that rental behind and make the smart move to a home at Manarat Living.",
        ctaText: "Download Brochure",
        ctaHref: "#download-brochure",
      },

      gallery: {
        images: [
          "/images/landing-page/manarat-living-saadiyat/gallery/gallery-1.webp",
          "/images/landing-page/manarat-living-saadiyat/gallery/gallery-2.webp",
          "/images/landing-page/manarat-living-saadiyat/gallery/gallery-3.webp",
          "/images/landing-page/manarat-living-saadiyat/gallery/gallery-4.webp",
          "/images/landing-page/manarat-living-saadiyat/gallery/gallery-5.webp",
          "/images/landing-page/manarat-living-saadiyat/gallery/gallery-6.webp",
          "/images/landing-page/manarat-living-saadiyat/gallery/gallery-7.webp",
          "/images/landing-page/manarat-living-saadiyat/gallery/gallery-8.webp",
        ],
      },

      amenities: {
        items: [
          { key: "conciergeService", icon: "/images/landing-page/lp-icons/concierge-service.svg" },
          { key: "kidsPlayArea", icon: "/images/landing-page/lp-icons/child.svg" },
          { key: "park", icon: "/images/landing-page/lp-icons/park.svg" },
          { key: "gym", icon: "/images/landing-page/lp-icons/shared-gym.svg" },
          { key: "retail", icon: "/images/landing-page/lp-icons/retail.svg" },
          { key: "cafes", icon: "/images/landing-page/lp-icons/cafe.svg" },
          { key: "petsAllowed", icon: "/images/landing-page/lp-icons/pets.svg" },
          { key: "viewOfLandmark", icon: "/images/landing-page/lp-icons/landmark.svg" },
          { key: "pool", icon: "/images/landing-page/lp-icons/shared-pool.svg" },
        ],
      },

      floorPlan: {
        heroImage: "/images/landing-page/manarat-living-saadiyat/gallery/gallery-8.webp",
        ns: "LandingPages.manarat-living-saadiyat.floorPlans",
        groups: [
          {
            titleKey: "studio",
            images: [
              "/images/landing-page/manarat-living-saadiyat/floorplan/studio-type-1.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/studio-type-1a.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/studio-type-2.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/studio-type-3.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/studio-type-4.webp",
            ],
            pdfUrl: "/files/manarat-living-saadiyat/floorplans/studio.pdf",
          },
          {
            titleKey: "oneBed",
            images: [
              "/images/landing-page/manarat-living-saadiyat/floorplan/1-bed-type-1.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/1-bed-type-2.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/1-bed-type-3.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/1-bed-type-4.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/1-bed-type-5.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/1-bed-type-6.webp",
            ],
            pdfUrl: "/files/manarat-living-saadiyat/floorplans/1br.pdf",
          },
          {
            titleKey: "twoBed",
            images: [
              "/images/landing-page/manarat-living-saadiyat/floorplan/2-bed-type-1.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/2-bed-type-2.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/2-bed-type-3.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/2-bed-type-4.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/2-bed-type-5.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/2-bed-m-type-1.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/2-bed-m-type-2.webp",
            ],
            pdfUrl: "/files/manarat-living-saadiyat/floorplans/2br.pdf",
          },
          {
            titleKey: "twoBedMaid",
            images: [
              "/images/landing-page/manarat-living-saadiyat/floorplan/3-bed-type-1.webp",
              "/images/landing-page/manarat-living-saadiyat/floorplan/3-bed-type-2.webp",
            ],
            pdfUrl: "/files/manarat-living-saadiyat/floorplans/2br-maid.pdf",
          },
        ],
      },

      location: {
        mapEmbedUrl: "https://maps.google.com/?q=Saadiyat%20Island%20Abu%20Dhabi&output=embed",
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
          CountryID: 65946,
          StateID: 91823,
          CityID: 91823,
          DistrictID: 102625,
          CommunityID: 97198,
          SubCommunityID: 130713,
          PropertyID: 20742,
          UnitType: 19,
          Bedroom: 21938,
          remarks: "Manarat Living",
          assignto: 3458,
          refby: 3458,
          refto: 3458,
          MethodOfContactVal: 115747,
        },
      },
    },
  },
  "the-arthouse": {
    title: "The Arthouse - Saadiyat Grove",
    description:
      "Aldar Properties offers a new masterpiece in the cultural district in the heart of Saadiyat Island.",
    ogImage: "/images/og/the-arthouse.webp",

    meta: {
      title: "The Arthouse Saadiyat Grove | Apartments & Sky Villas | PSI",
      description:
        "Aldar Properties offers a new masterpiece in the cultural district in the heart of Saadiyat Island.",
      ogImage: "/images/og/the-arthouse.webp",
    },

    sections: ["hero", "usp", "about", "gallery", "amenities", "floor-plan", "location", "footer"],

    data: {
      hero: {
        img: "/images/landing-page/the-arthouse/hero.webp",

        heading: "The Arthouse - Saadiyat Grove",
        sub: "Life Between The Art & Elegancy",
        description:
          "Aldar Properties offers a new masterpiece in the cultural district in the heart of Saadiyat Island.",
        ctaText: "Download Brochure",
      },
      usp: {
        items: [
          { title: "1 - 3 BR Apartments", desc: "5 BR Sky Villas" },
          { title: "Q2 2028", desc: "Handover" },
          { title: "Flexible", desc: "Payment Plan" },
          { title: "Luxury", desc: "Finishing" },
          { title: "Strategic", desc: "Location" },
          { title: "10%", desc: "Down Payment" },
          { title: "Starting Price", desc: "AED 3.3 M" },
          { title: "Perfect", desc: "Facilities" },
        ],
      },
      about: {
        img: "/images/landing-page/the-arthouse/the-arthouse-about.webp",
        heading: "The Arthouse - Saadiyat Grove",
        subheading: "ABOUT THE PROJECT",
        description:
          "The Arthouse Saadiyat Grove is a luxury apartment complex by Aldar Properties located in Saadiyat Grove, a new development on Saadiyat Island in Abu Dhabi. It's designed to offer a high-end living experience that blends seamlessly with the surrounding natural environment.",
        ctaText: "Download Brochure",
        ctaHref: "#download-brochure",
      },
      gallery: {
        images: [
          "/images/landing-page/the-arthouse/gallery/the-arthouse-gallery-1.webp",
          "/images/landing-page/the-arthouse/gallery/the-arthouse-gallery-2.webp",
          "/images/landing-page/the-arthouse/gallery/the-arthouse-gallery-3.webp",
          "/images/landing-page/the-arthouse/gallery/the-arthouse-gallery-4.webp",
          "/images/landing-page/the-arthouse/gallery/the-arthouse-gallery-5.webp",
          "/images/landing-page/the-arthouse/gallery/the-arthouse-gallery-6.webp",
          "/images/landing-page/the-arthouse/gallery/the-arthouse-gallery-7.webp",
          "/images/landing-page/the-arthouse/gallery/the-arthouse-gallery-8.webp",
        ],
      },
      amenities: {
        items: [
          { key: "secretGarden", icon: "/images/landing-page/lp-icons/park.svg" },
          { key: "tennisCourt", icon: "/images/landing-page/como-residences/squash-court.svg" },
          { key: "grandLobby", icon: "/images/landing-page/lp-icons/private-lounge.svg" },
          { key: "arthouseCinema", icon: "/images/landing-page/lp-icons/theatre.svg" },
          { key: "healthClubGym", icon: "/images/landing-page/lp-icons/health .svg" },
          { key: "kidsPlayroom", icon: "/images/landing-page/lp-icons/kids-play.svg" },
          { key: "entertainmentLounge", icon: "/images/landing-page/lp-icons/bbq.svg" },
          { key: "yogaRooms", icon: "/images/landing-page/lp-icons/fitness-area.svg" },
          { key: "creativeMajlis", icon: "/images/landing-page/lp-icons/meeting.svg" },
        ],
      },
      floorPlan: {
        heroImage: "/images/landing-page/the-arthouse/gallery/the-arthouse-gallery-5.webp",
        ns: "LandingPages.the-arthouse.floorPlans",
        groups: [
          {
            titleKey: "oneBed",
            images: [
              "/images/landing-page/the-arthouse/floorplan/1br/1br-1.webp",
              "/images/landing-page/the-arthouse/floorplan/1br/1br-2.webp",
              "/images/landing-page/the-arthouse/floorplan/1br/1br-3.webp",
            ],
            pdfUrl: "/files/the-arthouse/floorplans/1br.pdf",
          },
          {
            titleKey: "twoBed",
            images: [
              "/images/landing-page/the-arthouse/floorplan/2br/2br-1.webp",
              "/images/landing-page/the-arthouse/floorplan/2br/2br-2.webp",
              "/images/landing-page/the-arthouse/floorplan/2br/2br-3.webp",
              "/images/landing-page/the-arthouse/floorplan/2br/2br-4.webp",
            ],
            pdfUrl: "/files/the-arthouse/floorplans/2br.pdf",
          },
          {
            titleKey: "threeBed",
            images: [
              "/images/landing-page/the-arthouse/floorplan/3br/3br-1.webp",
              "/images/landing-page/the-arthouse/floorplan/3br/3br-2.webp",
              "/images/landing-page/the-arthouse/floorplan/3br/3br-3.webp",
              "/images/landing-page/the-arthouse/floorplan/3br/3br-4.webp",
              "/images/landing-page/the-arthouse/floorplan/3br/3br-5.webp",
            ],
            pdfUrl: "/files/the-arthouse/floorplans/3br.pdf",
          },
          {
            titleKey: "fiveBed",
            images: ["/images/landing-page/the-arthouse/floorplan/5br/5br.webp"],
            pdfUrl: "/files/the-arthouse/floorplans/5br.pdf",
          },
        ],
      },

      location: {
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3629.506095667307!2d54.40234462536059!3d24.53716717814181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e670054aa77cb%3A0x30b81a6d55072ab5!2sThe%20Arthouse%20(Tower%20R10)!5e0!3m2!1sen!2sae!4v1766228678013!5m2!1sen!2sae",
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
          CountryID: 65946,
          StateID: 91823,
          CityID: 91823,
          DistrictID: 102625,
          CommunityID: 97198,
          PropertyID: 24037,
          UnitType: 20,
          Bedroom: 21938,
          remarks: "The Arthouse",
          assignto: 3458,
          refby: 3458,
          refto: 3458,
          ContactType: 3,
          MethodOfContactVal: 115747,
        },
      },
    },

  },
  "bloom-living-almeria": {
    title: "Bloom Living - Almeria",
    description:
      "Bloom Living is situated in Zayed City, near Zayed International Airport. This prime location offers Bloom Properties a unique opportunity to develop an iconic gateway community in Abu Dhabi, with convenient access to local, regional, and international destinations.",
    ogImage: "/images/og/bloom-living-almeria.webp",

    meta: {
      title: "Bloom Living - Almeria | Villas in Zayed City, Abu Dhabi | PSI",
      description:
        "Bloom Living is situated in Zayed City, near Zayed International Airport. This prime location offers Bloom Properties a unique opportunity to develop an iconic gateway community in Abu Dhabi, with convenient access to local, regional, and international destinations.",
      ogImage: "/images/og/bloom-living-almeria.webp",
    },

    sections: ["hero", "usp", "about", "gallery", "amenities", "floor-plan", "location", "footer"],

    data: {
      hero: {
        img: "/images/landing-page/bloom-living-almeria/hero.webp",
        heading: "Bloom Living - Almeria",
        sub: "Bloom Living – Zayed City",
        description:
          "Bloom Living is situated in Zayed City, near Zayed International Airport. This prime location offers Bloom Properties a unique opportunity to develop an iconic gateway community in Abu Dhabi, with convenient access to local, regional, and international destinations.",
        ctaText: "Download Brochure",
      },

      usp: {
        items: [
          { title: "3 to 6", desc: "Bedroom Villas" },
          { title: "40/60", desc: "Payment Plan" },
          { title: "3.7M AED", desc: "Starting From" },
          { title: "Q4 2027", desc: "Handover" },
          { title: "10%", desc: "Downpayment" },
          { title: "Standalone", desc: "Villa" },
        ],
      },

      about: {
        img: "/images/landing-page/bloom-living-almeria/bloom-living-aboutus.webp",
        heading: "Bloom Living",
        subheading: "About the Project",
        description:
          "Bloom Living is a fully integrated community featuring over 4,500 homes, including villas, townhouses, and apartments. The development boasts interconnected parks, walkways, and cycling tracks, creating a seamless experience for residents. The main Clubhouse offers pools and recreational facilities, while the Town Center provides a variety of dining options, retail outlets, a medical clinic, and a supermarket. The community also includes places of worship and two international schools.",
        ctaText: "Download Brochure",
        ctaHref: "#download-brochure",
      },

      gallery: {
        images: [
          "/images/landing-page/bloom-living-almeria/gallery/gallery-1.webp",
          "/images/landing-page/bloom-living-almeria/gallery/gallery-2.webp",
          "/images/landing-page/bloom-living-almeria/gallery/gallery-3.webp",
          "/images/landing-page/bloom-living-almeria/gallery/gallery-4.webp",
          "/images/landing-page/bloom-living-almeria/gallery/gallery-5.webp",
          "/images/landing-page/bloom-living-almeria/gallery/gallery-6.webp",
          "/images/landing-page/bloom-living-almeria/gallery/gallery-7.webp",
        ],
      },

      amenities: {
        items: [
          { key: "gymWithSauna", icon: "/images/landing-page/lp-icons/shared-gym.svg" },
          { key: "security247", icon: "/images/landing-page/lp-icons/security24-7.svg" },
          { key: "walkingJoggingTracks", icon: "/images/landing-page/lp-icons/fitness-area.svg" },
          { key: "centralLake", icon: "/images/landing-page/lp-icons/water-front.svg" },
          { key: "communityCenterRetailFnb", icon: "/images/landing-page/lp-icons/retail.svg" },
          { key: "worshipPlaces", icon: "/images/landing-page/lp-icons/mosque-1.svg" },
        ],
      },

      floorPlan: {
        heroImage: "/images/landing-page/bloom-living-almeria/floorplan/floorplan-banner.png",
        ns: "LandingPages.bloom-living-almeria.floorPlans",
        groups: [
          {
            titleKey: "threeBed",
            images: ["/images/landing-page/bloom-living-almeria/floorplan/3br-bloom-living.webp"],
            pdfUrl: "/files/bloom-living-almeria/floorplans/3br.pdf",
          },
          {
            titleKey: "fourBed",
            images: ["/images/landing-page/bloom-living-almeria/floorplan/4br-bloom-living.webp"],
            pdfUrl: "/files/bloom-living-almeria/floorplans/4br.pdf",
          },
          {
            titleKey: "fiveBed",
            images: ["/images/landing-page/bloom-living-almeria/floorplan/5br-bloom-living.webp"],
            pdfUrl: "/files/bloom-living-almeria/floorplans/5br.pdf",
          },
          {
            titleKey: "sixBed",
            images: ["/images/landing-page/bloom-living-almeria/floorplan/6br-bloom-living.webp"],
            pdfUrl: "/files/bloom-living-almeria/floorplans/6br.pdf",
          },
        ],
      },

      location: {
        mapEmbedUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97735.05555420088!2d54.5288462419539!3d24.44729019003327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e493c65941957%3A0x8440d66a884588f3!2sBloom%20Living%20Abu%20Dhabi!5e0!3m2!1sen!2sae!4v1729588061189!5m2!1sen!2sae",
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
          CountryID: 65946,
          StateID: 91823,
          CityID: 91823,
          DistrictID: 102625,
          CommunityID: 95797,
          SubCommunityID: 167301,
          PropertyID: 24091,
          UnitType: 20,
          Bedroom: 21938,
          remarks: "Bloom Living - Almeria",
          assignto: 3458,
          refby: 3458,
          refto: 3458,
          MethodOfContactVal: 115747,
        },
      },
    },
  },
} as const satisfies Record<string, LandingConfig>;

export type LpSlug = keyof typeof landingConfigs;
