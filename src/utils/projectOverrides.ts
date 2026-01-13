// src/app/utils/projectOverrides.ts
import type { ProjectMeta } from "@/types/projectMeta";
import { makeUtm } from "./registrationUtils";

export type SeoMeta = {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
};

export type LocalizedSeo = {
  en: SeoMeta;
  ar?: SeoMeta;
};

export type PerSlug = {
  branch: "auh" | "dubai" | "assets";
  override?: Partial<ProjectMeta>;
  seo?: SeoMeta | LocalizedSeo;
};
export const PROJECTS: Record<string, PerSlug> = {
  'aldar-roadshow-registration': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Aldar Roadshow 2026 | Exclusive Property Showcase in Abu Dhabi',
        description:
          'Register your interest for the Aldar Roadshow 2026 in Abu Dhabi. Discover Aldar’s latest real estate projects, investment opportunities, and exclusive offers during this limited-time property showcase.',
        keywords:
          'Aldar Roadshow 2026, Aldar properties Abu Dhabi, Aldar real estate event, Abu Dhabi property roadshow, Aldar developments, luxury real estate Abu Dhabi',
      },
      ar: {
        title: 'معرض الدار العقاري 2026 | فعالية عقارية حصرية في أبوظبي',
        description:
          'سجّل اهتمامك بحضور معرض الدار العقاري 2026 في أبوظبي. تعرّف على أحدث مشاريع الدار العقارية وفرص الاستثمار والعروض الحصرية خلال هذه الفعالية المحدودة.',
        keywords:
          'معرض الدار 2026, الدار العقارية, مشاريع الدار أبوظبي, فعالية عقارية أبوظبي, استثمار عقاري أبوظبي',
      },
    },
    override: {
      remarks: 'Aldar Roadshow in 24 & 25 January - Company',
      ...makeUtm({
        'zaineh_aldar_roadshow_news': {
          campaign: 3428,
          remarks:
            'Rotation:  Aldar Roadshow in 24 & 25 January - Company , Campaign name:Zaineh:Aldar Roadshow News',
        },
      }),
    },
  },
  'ohana-yas-island-registration': {
    branch: 'auh',
    seo: {
      en: {
        title: "Ohana Yas Island | Luxury Living in Abu Dhabi",
        description:
          "Register your interest for Ohana Yas Island residences. Discover luxury waterfront living, premium amenities, and exclusive homes in Abu Dhabi.",
        keywords:
          "Ohana Yas Island, Yas Island Abu Dhabi, luxury residences Abu Dhabi, waterfront property Abu Dhabi, premium apartments Yas Island",
      },
      ar: {
        title: "أوهانا جزيرة ياس | أسلوب حياة فاخر في أبوظبي",
        description:
          "سجّل اهتمامك بمساكن أوهانا في جزيرة ياس. اكتشف أسلوب حياة فاخر على الواجهة البحرية مع مرافق متميزة ومنازل حصرية في أبوظبي.",
        keywords:
          "أوهانا جزيرة ياس, جزيرة ياس أبوظبي, عقارات فاخرة أبوظبي, شقق فاخرة جزيرة ياس, عقارات على الواجهة البحرية",
      },
    },
    override: {
      remarks: 'Company',
      ...makeUtm({
        'shaza_ohana_yas_newsletter': {
          campaign: 3397,
          remarks:
            'Rotation:  Company, Campaign name:  shaza Ohana Yas Newsletter',
        },
      }),
    },
  },
  'radiant-wave-registration': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Radiant Wave | Luxury Waterfront Living in Abu Dhabi',
        description:
          'Register your interest for Radiant Wave residences. Experience premium waterfront living in Abu Dhabi.',
        keywords: 'Radiant Wave, Abu Dhabi property, luxury apartments, waterfront living',
      },
      ar: {
        title: 'راديانت ويف | أسلوب حياة فاخر على الواجهة البحرية في أبوظبي',
        description:
          'سجّل اهتمامك بسكن راديانت ويف. استمتع بحياة فاخرة على الواجهة البحرية في أبوظبي.',
        keywords: 'راديانت ويف, عقارات أبوظبي, شقق فاخرة, واجهة بحرية',
      },
    },
    override: {
      PropertyID: 25584,
      CommunityID: 70212,
      remarks: 'Radiant wave company',
      ...makeUtm({
        'ali_radiant_wave_newsletter_jan26': {
          campaign: 3397,
          remarks:
            'Rotation:  Radiant wave company, Campaign name:   	Ali Radiant Wave Newsletter Jan26',
        },
      }),
    },
  },
  'hilton-residences-registration': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Hilton Residences | Branded Luxury Living in Abu Dhabi',
        description:
          'Register your interest for Hilton Residences. Experience premium branded living with world-class amenities in Abu Dhabi.',
        keywords:
          'Hilton Residences, Abu Dhabi property, branded residences, luxury apartments',
      },
      ar: {
        title: 'هيلتون ريزيدنسز | أسلوب حياة فاخر بعلامة عالمية في أبوظبي',
        description:
          'سجّل اهتمامك بسكن هيلتون ريزيدنسز واستمتع بحياة فاخرة مع خدمات وعلامة هيلتون العالمية في أبوظبي.',
        keywords:
          'هيلتون ريزيدنسز, عقارات أبوظبي, مساكن بعلامة فاخرة, شقق فاخرة',
      },
    },
    override: {
      PropertyID: 25396,
      CommunityID: 95259,
      remarks: 'Hilton Residences JLT',
      ...makeUtm({
        'irani_broker_hilton_residence_newsletter': {
          campaign: 3166,
          remarks:
            'Rotation:  Hilton Residences JLT - Company (Agents Will Communicate As PSI), Campaign name:   Irani: Broker Hilton Residence Newsletter',
        },
      }),
    },
  },
  'radisson-blu-registration': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Radisson Blu Residences | Luxury Living in Abu Dhabi',
        description:
          'Register your interest for Radisson Blu Residences. Enjoy upscale waterfront living with premium amenities in Abu Dhabi.',
        keywords:
          'Radisson Blu Residences, Abu Dhabi property, branded residences, luxury apartments',
      },
      ar: {
        title: 'ريزيدنسز راديسون بلو | سكن فاخر بعلامة عالمية في أبوظبي',
        description:
          'سجّل اهتمامك بسكن ريزيدنسز راديسون بلو واستمتع بحياة فاخرة مع خدمات وضيافة عالمية في أبوظبي.',
        keywords:
          'ريزيدنسز راديسون بلو, عقارات أبوظبي, مساكن بعلامة فاخرة, شقق فاخرة',
      },
    },
    override: {
      PropertyID: 25581,
      CommunityID: 95259,
      remarks: 'Radisson Blu',
      ...makeUtm({
        'metwally_radisson_blu_newsletter_en': {
          campaign: 3357,
          remarks:
            'Rotation: Radisson Blu , Campaign name:Metwally: Radisson Blu - Newsletter - EN',
        },
      }),
    },
  },
  'hudayriyat-island-registration': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Hudayriyat Island | Abu Dhabi Waterfront Living',
        description:
          'Register your interest for Hudayriyat Island. Discover a vibrant waterfront destination in Abu Dhabi with lifestyle-focused communities and premium amenities.',
        keywords:
          'Hudayriyat Island, Abu Dhabi property, waterfront community, luxury living, real estate Abu Dhabi',
      },
      ar: {
        title: 'جزيرة الحديريات | وجهة سكنية على الواجهة البحرية في أبوظبي',
        description:
          'سجّل اهتمامك بجزيرة الحديريات واكتشف أسلوب حياة عصري على الواجهة البحرية في أبوظبي مع مرافق وخدمات مميزة.',
        keywords:
          'جزيرة الحديريات, عقارات أبوظبي, مجتمع على الواجهة البحرية, سكن فاخر, عقار في أبوظبي',
      },
    },
    override: {
      remarks: 'General Campaign',
      ...makeUtm({
        'zaineh-hudayriyat-news': {
          campaign: 3352,
          remarks:
            'Rotation: Hudayriyat Island Company, Campaign name: Zaineh: Hudayriyat News',
        },
      }),
    },
  },
  'hudayriyat-island-general-registration': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Hudayriyat Island Abu Dhabi | Register Your Interest',
        description:
          'Register your interest for Hudayriyat Island in Abu Dhabi. Explore a dynamic island destination offering waterfront living, lifestyle communities, and premium amenities.',
        keywords:
          'Hudayriyat Island, Abu Dhabi real estate, island living Abu Dhabi, waterfront properties, luxury homes',
      },
      ar: {
        title: 'جزيرة الحديريات أبوظبي | سجل اهتمامك الآن',
        description:
          'سجّل اهتمامك بجزيرة الحديريات في أبوظبي واكتشف وجهة جزيرية نابضة بالحياة تضم مجتمعات سكنية عصرية ومرافق مميزة.',
        keywords:
          'جزيرة الحديريات, عقارات أبوظبي, العيش في الجزر, واجهة بحرية, منازل فاخرة',
      },
    },
    override: {
      remarks: 'General Campaign',
      ...makeUtm({
        'hudayriyat_island_newsletter_dec_2025': {
          campaign: 3351,
          remarks:
            'Rotation: Hudayriyat Island Company, Campaign name: Irani: Hudayriyat Island Newsletter DEC 2025',
        },
      }),
    },
  },
  'muheira-maysan-registration': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Muheira Maysan on Al Reem Island | Register Your Interest',
        description:
          'Register your interest for Muheira Maysan on Al Reem Island, Abu Dhabi. Explore contemporary residences, island lifestyle living, and convenient access to key destinations.',
        keywords:
          'Muheira Maysan, Al Reem Island, Abu Dhabi property, Reem Island apartments, waterfront living, new launch Abu Dhabi',
      },
      ar: {
        title: 'مهيرة ميسان في جزيرة الريم | سجل اهتمامك الآن',
        description:
          'سجّل اهتمامك بمشروع مهيرة ميسان في جزيرة الريم، أبوظبي. اكتشف وحدات سكنية عصرية ونمط حياة جزيري مع سهولة الوصول إلى أهم الوجهات.',
        keywords:
          'مهيرة ميسان, جزيرة الريم, عقارات أبوظبي, شقق جزيرة الريم, العيش على الواجهة البحرية, مشروع جديد',
      },
    },
    override: {
      PropertyID: 24389,
      CommunityID: 95259,
      SubCommunityID: 83452,
      remarks: 'Muheira Maysan',
      ...makeUtm({
        'shaza_muheira_news': {
          campaign: 3338,
          remarks:
            'Rotation: Reem Island Muheira , Campaign name: shaza: Muheira Newsletter',
        },
        'zaineh_muheira_news': {
          campaign: 2485,
          remarks:
            'Rotation: Muheira company rotation , Campaign name: Zaineh_Muheira_News',
        },
      }),
    },
  },
  'reem-island-registration': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Reem Island Properties | Register Your Interest in Abu Dhabi',
        description:
          'Register your interest for premium properties on Reem Island, Abu Dhabi. Discover waterfront living, modern residences, and top communities including Radiant, Radisson, One Residence, and Muheira.',
        keywords:
          'Reem Island, Abu Dhabi property, Reem Island apartments, waterfront living Abu Dhabi, Radiant Wave, Radisson Blu Residences, One Residence, Muheira Maysan',
      },
      ar: {
        title: 'عقارات جزيرة الريم | سجّل اهتمامك في أبوظبي',
        description:
          'سجّل اهتمامك بالعقارات المميزة في جزيرة الريم، أبوظبي. استمتع بأسلوب حياة عصري على الواجهة البحرية مع نخبة من المشاريع السكنية.',
        keywords:
          'جزيرة الريم, عقارات أبوظبي, شقق جزيرة الريم, الواجهة البحرية أبوظبي, مشاريع سكنية جديدة',
      },
    },
    override: {
      CommunityID: 95259,
      remarks: 'General Campaign',
      ...makeUtm({
        'irani_reem_island_4_projects_newsletter': {
          campaign: 3335,
          remarks:
            'Rotation: Reem Island 4 Projects Company ( Radiant, Radisson, One Residence, Muheira) , Campaign name: Irani: Reem Island 4 Projects Newsletter',
        },
      }),
    },
  },
  'one-residence-registration': {
    branch: 'auh',
    seo: {
      en: {
        title: 'One Residence Reem Island | Luxury Waterfront Living in Abu Dhabi',
        description:
          'Register your interest for One Residence on Reem Island, Abu Dhabi. Discover contemporary waterfront apartments with premium amenities in one of the city’s most sought-after communities.',
        keywords:
          'One Residence, Reem Island, Abu Dhabi apartments, waterfront residences Abu Dhabi, luxury apartments Reem Island, One Residence Abu Dhabi',
      },
      ar: {
        title: 'ون ريزيدنس جزيرة الريم | شقق فاخرة على الواجهة البحرية',
        description:
          'سجّل اهتمامك في ون ريزيدنس بجزيرة الريم، أبوظبي. شقق عصرية بإطلالات بحرية ومرافق مميزة في واحدة من أرقى المجتمعات السكنية.',
        keywords:
          'ون ريزيدنس, جزيرة الريم, شقق أبوظبي, شقق فاخرة, الواجهة البحرية أبوظبي, عقارات جزيرة الريم',
      },
    },
    override: {
      PropertyID: 25582,
      CommunityID: 95259,
      remarks: 'One Residence',
      ...makeUtm({
        'zaineh_one_residence_news': {
          campaign: 3331,
          remarks:
            'Rotation: One development - company , Campaign name: Zaineh:One Residence News',
        },
      }),
    },
  },
  'yas-riva-registration': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Yas Riva on Yas Island | Exclusive Waterfront Living in Abu Dhabi',
        description:
          'Register your interest for Yas Riva on Yas Island, Abu Dhabi. Experience premium waterfront residences, elegant design, and a vibrant island lifestyle in one of Abu Dhabi’s most prestigious destinations.',
        keywords:
          'Yas Riva, Yas Island Abu Dhabi, waterfront residences Yas Island, luxury living Yas Island, Yas Island properties, Abu Dhabi waterfront homes',
      },
      ar: {
        title: 'ياس ريفا في جزيرة ياس | أسلوب حياة فاخر على الواجهة البحرية',
        description:
          'سجّل اهتمامك بمشروع ياس ريفا في جزيرة ياس، أبوظبي. استمتع بوحدات سكنية راقية على الواجهة البحرية ونمط حياة عصري في واحدة من أرقى وجهات أبوظبي.',
        keywords:
          'ياس ريفا, جزيرة ياس, عقارات جزيرة ياس, شقق فاخرة أبوظبي, الواجهة البحرية, مشاريع جزيرة ياس',
      },
    },
    override: {
      PropertyID: 25481,
      CommunityID: 165011,
      remarks: 'Yas Riva',
      ...makeUtm({
        'zaineh_yas_riva_news': {
          campaign: 3269,
          remarks:
            'Rotation:Yas Riva Company , Campaign name: Zaineh: Yas Riva News',
        },
      }),
    },
  },
  'bashayer-apartments-registration': {
    branch: 'auh',
    override: {
      PropertyID: 25477,
      remarks: 'Bashayer Apartments',
      ...makeUtm({
        'ali-bashayer-apartments-newsletter-nov25': {
          campaign: 3276,
          remarks:
            'Rotation: Bashayer Apartments- company , Campaign name: Ali Bashayer Apartments Newsletter Nov25',
        },
      }),
    },
  },
  'taraf-masdar-city-registration': {
    branch: 'auh',
    override: {
      PropertyID: 25484,
      remarks: 'Taraf Masdar city',
      ...makeUtm({
        'zaineh_fay_hills_by_taraf_news': {
          campaign: 3258,
          remarks:
            'Rotation: Taraf Masdar city Company , Campaign name:  Irani: Fay Hills Taraf Newsletter',
        },
      }),
    },
  },
  'al-hayat-island-registration': {
    branch: 'auh',
    override: {
      remarks: 'RAK Open house',
      ...makeUtm({
        'zaineh_rak_open_house_news': {
          campaign: 3167,
          remarks:
            'Rotation: Al Hayat Island – Ras Al Khaimah 15 November - Open Day , Campaign name: Zaineh:RAK Open house New',
        },
      }),
    },
  },
  'stellar-by-elie-Saab-registration': {
    branch: 'auh',
    override: {
      PropertyID: 25474,
      remarks: 'Stellar by Elie Saab',
      ...makeUtm({
        'ali_stellar_by_elie_saab_news': {
          campaign: 3204,
          remarks:
            'Rotation: Stellar by Elie Saab company, Campaign name: Ali Stellar by Elie Saab Newsletter Nov25',
        },
      }),
    },
  },
  'the-row-saadiyat-registration': {
    branch: 'auh',
    override: {
      PropertyID: 25405,
      CommunityID: 97198,
      remarks: 'The Row Saadiyat',
      ...makeUtm({
        'irani_the_row_saadiyat_island_newsletter': {
          campaign: 3398,
          remarks:
            'Rotation: The Row Saadiyat - Company, Campaign name: Irani: The Row Saadiyat Island Newsletter',
        },
        'irani_the_row_saadiyat_newsletter': {
          campaign: 3146,
          remarks:
            'Rotation: The Row Saadiyat - Company, Campaign name: Irani: The Row Saadiyat Newsletter',
        },
      }),
    },
  },
  'full-moon-festival-chinese-registration': {
    branch: 'auh',
    override: {
      remarks: 'Full Moon Festival – Chinese audience campaign',
      form: {
        extraFields: [
          {
            id: 'invitedBy',
            type: 'text',
            labelKey: 'fields.invitedBy.label',
            placeholderKey: 'fields.invitedBy.placeholder',
            required: false,
            payloadKey: 'InvitedBy',
          },
        ],
      },
      ...makeUtm({
        'qiuzi_li_mid_autumn_event_chinese_newsletter': {
          campaign: 3075,
          remarks:
            'Rotation: Mid Autumn Event - Chinese Team, Campaign name:	Qiuzi Li: Mid Autumn Event - Chinese',
        },
      }),
    },
  },
  'sodic-event-registration': {
    branch: 'auh',
    override: {
      remarks: 'SODIC event general campaign',
      form: {
        extraFields: [
          {
            id: 'timeSlot',
            type: 'select',
            labelKey: 'fields.timeSlot.label',
            placeholderKey: 'fields.timeSlot.placeholder',
            options: [
              { value: '10_11', labelKey: 'fields.timeSlot.opt.10_11' },
              { value: '11_12', labelKey: 'fields.timeSlot.opt.11_12' },
              { value: '13_14', labelKey: 'fields.timeSlot.opt.13_14' },
              { value: '14_15', labelKey: 'fields.timeSlot.opt.14_15' },
              { value: '16_17', labelKey: 'fields.timeSlot.opt.16_17' },
              { value: '17_18', labelKey: 'fields.timeSlot.opt.17_18' },
            ],
            required: true,
            payloadKey: 'PreferredTimeSlot',
          },
        ],
      },
      ...makeUtm({
        'irani-sodic-event-confirmation-news': {
          campaign: 3139,
          remarks:
            'Rotation: SODIC Event 25 and 26 (Egypt Rotation), Campaign name: Irani: SODIC Event Confirmation',
        },
      }),
    },
  },

  'malaga-registration': {
    branch: 'auh',
    override: {
      PropertyID: 25401,
      remarks: 'Malaga company',
      ...makeUtm({
        'shaza-malaga-newsletter': {
          campaign: 3134,
          remarks:
            'Rotation: Malaga company, Campaign name: shaza-Malaga-Newsletter',
        },
      }),
    },
  },

  'wadi-yemm-registration': {
    branch: 'auh',
    override: {
      PropertyID: 24466,
      CommunityID: 165011,
      SubCommunityID: 63724,
      remarks: 'Wadi Yemm Ras El Hekma',
      ...makeUtm({
        'ali-wadi-yemm-newsletter-oct25': {
          campaign: 3128,
          remarks:
            'Rotation: Wadi Yemm Ras El Hekma Company, Campaign Name: Ali Wadi Yemm Newsletter Oct25',
        },
      }),
    },
  },

  'bloom-living-marbella-registration': {
    branch: 'auh',
    override: {
      PropertyID: 25380,
      CommunityID: 95797,
      SubCommunityID: 167301,
      remarks: 'Company',
      ...makeUtm({
        'irani-bloom-living-newsletter': {
          campaign: 3121,
          remarks:
            'Rotation: Company, Campaign name: Irani: Bloom Living Newsletter',
        },
      }),
    },
  },

  'juman-2-registration': {
    branch: 'auh',
    override: {
      PropertyID: 25399,
      CommunityID: 70777,
      SubCommunityID: 167301,
      remarks: 'Company',
      ...makeUtm({
        'ali_juman_2_newsletter_oct25': {
          campaign: 3105,
          remarks:
            'Rotation: Juman 2 Al Raha company, Campaign name: Ali Juman 2 Newsletter Oct25',
        },
      }),
    },
  },

  'united-property-expo-baku': {
    branch: 'auh',
    override: {
      remarks: 'United property expo Event',
      ...makeUtm({
        'ali-united-prop-expo-poland-news': {
          campaign: 2984,
          remarks:
            'Rotation: No rotation, General campaign, Campaign name: Ali United Prop Expo Poland Newsletter',
        },
        'ali-united-prop-expo-baku-news': {
          campaign: 3098,
          remarks:
            'Rotation: United Property Expo – Baku Company, General campaign, Campaign name: Ali United Prop Expo Baku',
        },
      }),
    },
  },

  'yas-living-registration': {
    branch: 'auh',
    override: {
      PropertyID: 25397,
      CommunityID: 165011,
      SubCommunityID: 165012,
      remarks: 'Yas Living',
      ...makeUtm({
        'ali_yas_living_newsletter_oct2025': {
          campaign: 3105,
          remarks:
            'Rotation: Yas Living – Company, Campaign name: Ali Yas Living Newsletter Oct2025',
        },
      }),
    },
  },

  'expo-real-germany': {
    branch: 'auh',
    override: {
      remarks: 'Yas Living',
      ...makeUtm({
        'irani_expo_germany_newsletter': {
          campaign: 3105,
          remarks:
            'Rotation: Expo Real Germany – Company, Campaign name: Irani: Expo Germany Newsletter',
        },
      }),
    },
  },

  'al-durrah-open-house-registration': {
    branch: 'auh',
    override: {
      PropertyID: 24463,
      remarks: 'Al Durrah',
      ...makeUtm({
        'ebin-al-durrah-open-house-news': {
          campaign: 2834,
          remarks:
            'Rotation: Company, Campaign name: Irani: Al Durrah Open House – July 16',
        },
        'zaineh-al-durrah-internal-campaign': {
          campaign: 2999,
          remarks: 'Internal Al Durrah Campaign Lead',
        },
        'aldurrah-whatsapp-broadcast': {
          campaign: 3055,
          remarks: 'WhatsApp Al Durrah Lead',
        },
      }),
    },
  },

  'rak-general-registration': {
    branch: 'auh',
    override: {
      remarks: 'Company',
      ...makeUtm({
        Irani_RAK_General_Newsletter: {
          campaign: 2836,
          remarks: 'Rotation: Company, Campaign name: Irani: RAK General Newsletter',
        },
      }),
    },
  },

  'ogami-registration': {
    branch: 'dubai',
    override: {
      PropertyID: 24034,
      remarks: 'Company',
      ...makeUtm({
        Irani_Ogami_Newsletter_2025: {
          campaign: 2847,
          remarks: 'Rotation: Company, Campaign name: Irani: Ogami Newsletter 2025',
        },
      }),
    },
  },

  'yas-acres-registration': {
    branch: 'auh',
    override: {
      PropertyID: 14524,
      CommunityID: 165011,
      SubCommunityID: 167636,
      remarks: 'Company',
      ...makeUtm({
        'Irani-Yas-Acres-Open-House-News': {
          campaign: 2850,
          remarks:
            'Rotation: Open House for Yas Acres – Magnolias and Dahlias, Campaign name: Irani: Yas Acres Open House Newsletter',
        },
      }),
    },
  },

  'landlord-listing-registration': {
    branch: 'assets',
    override: {
      PropertyID: 20799,
      CommunityID: 95259,
      remarks: 'Company',
      ...makeUtm({
        'landlord-listing-newsletter': {
          campaign: 2259,
          remarks:
            'Rotation: LRO Rotation, Campaign name: Landlord listing newsletter hubspot',
        },
      }),
    },
  },
} satisfies Record<string, PerSlug>;

console.log('[projectOverrides] loaded slugs:', Object.keys(PROJECTS));
