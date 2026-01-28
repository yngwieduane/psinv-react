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
      'rotana-registration': {
    branch: 'auh',
seo: {
  en: {
    title: 'Rotana Residences Reem Island | Branded Waterfront Living in Abu Dhabi',
    description:
      'Register your interest for Rotana Residences on Reem Island. Explore premium waterfront homes with modern amenities and a vibrant lifestyle in one of Abu Dhabi’s most sought-after communities.',
    keywords:
      'Rotana Residences Reem Island, Reem Island Abu Dhabi, branded residences Abu Dhabi, waterfront apartments Abu Dhabi, luxury living Reem Island, Abu Dhabi real estate',
  },
  ar: {
    title: 'روتانا ريزيدنسز جزيرة الريم | أسلوب حياة فاخر على الواجهة البحرية في أبوظبي',
    description:
      'سجّل اهتمامك في روتانا ريزيدنسز بجزيرة الريم. اكتشف وحدات سكنية مميزة على الواجهة البحرية مع مرافق عصرية ونمط حياة نابض في واحدة من أبرز مناطق أبوظبي.',
    keywords:
      'روتانا ريزيدنسز جزيرة الريم، جزيرة الريم أبوظبي، مساكن بعلامة روتانا، شقق على الواجهة البحرية أبوظبي، سكن فاخر جزيرة الريم، عقارات أبوظبي',
  },
},
    override: {
      PropertyID: 25588,
      CommunityID: 95259,
      remarks: 'Rotana Residences - company campaign',
      ...makeUtm({
        'ali_rotana_reem_island_newsletter_jan2026': {
          campaign: 3456,
          remarks:
            'Rotation:  Rotana Residences - company campaign, Campaign name: 	Ali Rotana Reem Island Newsletter Jan2026',
        },
      }),
    },
  },
    'hilton-residences-raha-beach-registration': {
    branch: 'auh',
      seo: {
    en: {
      title: 'Hilton Residences Al Raha Beach | Luxury Waterfront Living in Abu Dhabi',
      description:
        'Register your interest for Hilton Residences at Al Raha Beach. Discover premium waterfront apartments with world-class amenities and iconic Hilton living in Abu Dhabi.',
      keywords:
        'Hilton Residences Al Raha Beach, Al Raha Beach apartments, luxury waterfront residences Abu Dhabi, Hilton branded residences UAE',
    },
    ar: {
      title: 'هيلتون ريزيدنسز شاطئ الراحة | أسلوب حياة فاخر على الواجهة البحرية في أبوظبي',
      description:
        'سجّل اهتمامك في هيلتون ريزيدنسز شاطئ الراحة. استمتع بشقق فاخرة على الواجهة البحرية مع خدمات عالمية وأسلوب حياة يحمل علامة هيلتون في أبوظبي.',
      keywords:
        'هيلتون ريزيدنسز شاطئ الراحة، شقق شاطئ الراحة، عقارات فاخرة في أبوظبي، مساكن هيلتون الفاخرة',
    },
  },
    override: {
      PropertyID: 25586,
      remarks: 'Al raha beach (Hilton Residences) - company campaign',
      ...makeUtm({
        'zaineh_ibinu_hilton_raha_news': {
          campaign: 3451,
          remarks:
            'Rotation:  Al raha beach (Hilton Residences) - company campaign, Campaign name: Ibinu:Hilton raha Newsletter',
        },
      }),
    },
  },
  'share-address': {
  branch: 'auh',
  seo: {
    en: {
      title: 'Share Address | Register Your Interest – PSI',
      description: 'Select a property and submit your details. Our team will contact you shortly.',
      keywords: 'PSI registration, select property, UAE real estate, PSI Abu Dhabi',
    },
    ar: {
      title: 'شارك العنوان | سجّل اهتمامك – PSI',
      description: 'اختر العقار وأرسل بياناتك. سيتواصل معك فريقنا قريبًا.',
      keywords: 'تسجيل PSI، اختيار العقار، عقارات الإمارات، PSI أبوظبي',
    },
  },
  override: {
    UnitType: 20,
    remarks: 'Share Address Registration',
    form: {
      extraFields: [
        {
          id: 'propertyId',
          type: 'select',
          label: 'Select Property',
          required: true,
          options: [{ value: '', label: 'Loading...' }],
        },
      ],
    },
  },
},
  'the-market-insight': {
    branch: 'auh',
  seo: {
    en: {
      title: 'Dubai Real Estate Market Insights | Monthly Property Report by PSI',
      description:
        'Explore PSI’s Dubai Market Insights Monthly Report. Get the latest data on property prices, trends, demand, and investment opportunities across Dubai’s real estate market.',
      keywords:
        'Dubai real estate market insights, Dubai property market report, monthly real estate report Dubai, Dubai property trends, real estate investment Dubai, PSI market insights',
    },
    ar: {
      title: 'رؤى سوق العقارات في دبي | التقرير العقاري الشهري من PSI',
      description:
        'اطّلع على تقرير PSI الشهري لرؤى سوق العقارات في دبي. تعرّف على أحدث اتجاهات الأسعار والطلب وفرص الاستثمار في سوق دبي العقاري.',
      keywords:
        'رؤى سوق العقارات دبي, تقرير سوق العقارات دبي, التقرير العقاري الشهري دبي, اتجاهات العقارات في دبي, الاستثمار العقاري دبي, رؤى PSI العقارية',
    },
  },
    override: {
      UnitType: 20,
      remarks: 'Market Insights Monthly Report Dubai - General campaign',
      ...makeUtm({
        'DripCampaign': {
          campaign: 2134,
          remarks:
            'Rotation:  Market Insights Monthly Report Dubai - General campaign',
        },
        'DripCampaign_hubspot': {
          campaign: 2134,
          remarks:
            'Rotation: Drip Campaign – HubSpot (General)',
        },
        'DripCampaign_HubSpot_V2': {
          campaign: 2134,
          remarks:
            'Rotation: Drip Campaign – HubSpot V2',
        },
        'AppWaitlist_Hubspot': {
          campaign: 2134,
          remarks:
            'Rotation: App Waitlist – HubSpot campaign',
        },

      }),
    },
  },
  'hudayriyat-island': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Hudayriyat Island | Where Tranquility Meets Adventure – PSI',
        description:
          'Discover Hudayriyat Island, a unique destination in Abu Dhabi where tranquility meets adventure. Explore premium waterfront living, world-class leisure facilities, and vibrant outdoor experiences with Property Shop Investment.',
        keywords:
          'Hudayriyat Island, Hudayriyat Abu Dhabi, waterfront living Abu Dhabi, luxury island living UAE, Hudayriyat properties, PSI Hudayriyat Island, Abu Dhabi lifestyle destinations',
      },
      ar: {
        title: 'جزيرة الحديريات | حيث تلتقي الراحة بالمغامرة – PSI',
        description:
          'اكتشف جزيرة الحديريات، الوجهة المميزة في أبوظبي حيث تلتقي الراحة بالمغامرة. استمتع بأسلوب حياة عصري على الواجهة البحرية مع مرافق ترفيهية عالمية وتجارب خارجية فريدة مع شركة بروفيرتي شوب للاستثمار.',
        keywords:
          'جزيرة الحديريات، الحديريات أبوظبي، الحياة على الواجهة البحرية، جزيرة فاخرة في الإمارات، عقارات جزيرة الحديريات، PSI الحديريات، وجهات نمط الحياة في أبوظبي',
      },
    },
    override: {
      PropertyID: 23250,
      UnitType: 20,
      remarks: 'company rotation,Hudayriyat island project',
      ...makeUtm({
        'Hudayriyat_HubSpot': {
          campaign: 2177,
          remarks:
            'Rotation: company, Campaign name:	Hudayriyat_HubSpot',
        },
      }),
    },
  },
  'psi-rental-units': {
    branch: 'auh',
    seo: {
      en: {
        title: 'PSI Rental Units | Find Premium Properties for Rent in the UAE',
        description:
          'Browse PSI’s exclusive selection of rental units, including apartments, villas, and commercial spaces. Find your ideal property for rent in top locations across the UAE.',
        keywords:
          'PSI rental units, properties for rent UAE, apartments for rent UAE, villas for rent UAE, commercial property for rent UAE, UAE rental listings, PSI real estate rentals',
      },
      ar: {
        title: 'وحدات الإيجار من PSI | اعثر على عقارات مميزة للإيجار في الإمارات',
        description:
          'استعرض مجموعة مختارة من وحدات الإيجار لدى PSI، بما في ذلك الشقق والفلل والعقارات التجارية. اعثر على العقار المثالي للإيجار في أفضل المواقع داخل دولة الإمارات.',
        keywords:
          'وحدات إيجار PSI، عقارات للإيجار في الإمارات، شقق للإيجار في الإمارات، فلل للإيجار في الإمارات، عقارات تجارية للإيجار، قوائم الإيجار في الإمارات، إيجارات PSI',
      },
    },
    override: {
      UnitType: 19,
      remarks: 'PSI Rental Units, PSI Exclusive Units',
      ...makeUtm({
        '11.2015_rental_Campaign': {
          campaign: 2380,
          remarks:
            'Campaign name: 11.2015_rental_Campaign',
        },
      }),
    },
  },
  'lp-listing': {
    branch: 'auh',
    seo: {
      en: {
        title: 'PSI Property Listings | Buy, Sell, or Rent Real Estate in the UAE',
        description:
          'Explore PSI’s comprehensive property listings. Discover apartments, villas, and commercial properties available for sale or rent across the UAE’s most sought-after locations.',
        keywords:
          'PSI property listings, buy property UAE, rent property UAE, UAE real estate listings, apartments for sale UAE, villas for rent UAE, commercial properties UAE, PSI real estate',
      },
      ar: {
        title: 'قوائم عقارات PSI | شراء وبيع وتأجير العقارات في الإمارات',
        description:
          'استكشف قوائم العقارات الشاملة من PSI. اعثر على شقق وفلل وعقارات تجارية للبيع أو الإيجار في أهم وأفضل المواقع داخل دولة الإمارات.',
        keywords:
          'قوائم عقارات PSI، شراء عقار في الإمارات، تأجير عقار في الإمارات، عقارات الإمارات، شقق للبيع في الإمارات، فلل للإيجار في الإمارات، عقارات تجارية في الإمارات، PSI للعقارات',
      },
    },
    override: {
      UnitType: 20,
      remarks: 'Listing Page',
      ...makeUtm({
        'ready_nur_hubspot': {
          campaign: 2374,
          remarks:
            'Rotation: Hot deals AUH , Campaign name: Ready_Nur_Hubspot',
        },
        '2025_March_HotDeals': {
          campaign: 2374,
          remarks:
            'Campaign name:2025_March_HotDeals',
        },
      }),
    },
  },
  'jubail-island': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Jubail Island – Exclusive Living in the UAE',
        description:
          'Discover luxury living at Jubail Island, a serene island destination on the edge of the UAE’s vibrant capital. Explore exclusive homes surrounded by nature, privacy, and waterfront beauty.',
        keywords:
          'Jubail Island, luxury living UAE, waterfront villas Abu Dhabi, island living Abu Dhabi, exclusive residential community UAE, premium villas Abu Dhabi',
      },
      ar: {
        title: 'جزيرة الجبيل – أسلوب حياة حصري في الإمارات',
        description:
          'اكتشف أسلوب الحياة الفاخر في جزيرة الجبيل، وجهة سكنية هادئة على أطراف العاصمة الإماراتية النابضة بالحياة. استمتع بمنازل حصرية وسط الطبيعة والخصوصية وإطلالات الواجهة البحرية.',
        keywords:
          'جزيرة الجبيل، حياة فاخرة في الإمارات، فلل مطلة على البحر أبوظبي، السكن في الجزر أبوظبي، مجتمع سكني حصري، فلل فاخرة في أبوظبي',
      },
    },
    override: {
      PropertyID: 20422,
      DistrictID: 165218,
      CommunityID: 165219,
      SubCommunityID: 165220,
      UnitType: 20,
      remarks: 'Jubail landlord listing rotation,Jubail island project',
      ...makeUtm({
        '10.2025_jubail_island_lisitingCampaign': {
          campaign: 2374,
          remarks:
            'Rotation: Jubail landlord listing rotation, Jubail island, Campaign name:	 10.2025_jubail_island_lisitingCampaign',
        },
      }),
    },
  },
  'property-evalution': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Jubail Island Property Evaluation | Accurate Valuation by PSI',
        description:
          'Get a professional property evaluation for your Jubail Island home. PSI provides accurate market-based property valuations to help you sell, invest, or plan with confidence in Abu Dhabi.',
        keywords:
          'Jubail Island property valuation, property evaluation Abu Dhabi, Jubail Island real estate value, property appraisal UAE, PSI property evaluation, Abu Dhabi property assessment',
      },
      ar: {
        title: 'تقييم عقارات جزيرة الجبيل | تقييم دقيق من PSI',
        description:
          'احصل على تقييم احترافي لعقارك في جزيرة الجبيل. تقدم PSI تقييماً دقيقاً يعتمد على السوق لمساعدتك في البيع أو الاستثمار أو التخطيط بثقة في أبوظبي.',
        keywords:
          'تقييم عقارات جزيرة الجبيل, تقييم العقارات أبوظبي, قيمة العقار في جزيرة الجبيل, تقييم الممتلكات في الإمارات, تقييم عقاري PSI, تقييم السوق العقاري',
      },
    },
    override: {
      UnitType: 20,
      remarks: 'Company',
      ...makeUtm({
        '10.2025_jubail_island_lisitingCampaign': {
          campaign: 2374,
          remarks:
            'Rotation:  General property campaign , Campaign name:	 10.2025_jubail_island_lisitingCampaign',
        },
      }),
    },
  },
  'saadiyat-lagoons': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Saadiyat Lagoons – Last Phase | Exclusive Registration by PSI Abu Dhabi',
        description:
          'Register now for the last phase of Saadiyat Lagoons. Explore premium villas surrounded by nature on Saadiyat Island with Property Shop Investment (PSI), Abu Dhabi.',
        keywords:
          'Saadiyat Lagoons last phase, Saadiyat Lagoons registration, Saadiyat Island villas, Aldar Saadiyat Lagoons, luxury villas Abu Dhabi, PSI Abu Dhabi projects',
      },
      ar: {
        title: 'سعديات لاجونز – المرحلة الأخيرة | تسجيل حصري من PSI أبوظبي',
        description:
          'سجّل الآن في المرحلة الأخيرة من مشروع سعديات لاجونز. اكتشف فلل فاخرة وسط الطبيعة في جزيرة السعديات مع شركة بروبرتي شوب للاستثمار (PSI) أبوظبي.',
        keywords:
          'سعديات لاجونز المرحلة الأخيرة, تسجيل سعديات لاجونز, فلل جزيرة السعديات, سعديات لاجونز من الدار, فلل فاخرة أبوظبي, مشاريع PSI أبوظبي',
      },
    },
    override: {
      PropertyID: 23310,
      CommunityID: 97198,
      SubCommunityID: 130713,
      UnitType: 20,
      remarks: 'Saadiyat Lagoons - Last Phase- PSI AUH saadiayt lagoons last phase',
      ...makeUtm({
        'SaadiyatLagoons_Hubspot': {
          campaign: 2128,
          remarks:
            'Campaign name:	SaadiyatLagoons_Hubspot',
        },
        'zaineh-thawabi-campaign': {
          campaign: 1634,
          remarks:
            'Campaign name:	Zaineh:Lagoons news',
        },
      }),
    },
  },
  'reem-hills-villa-reem-island': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Reem Hills Villas | Luxury Living on Reem Island – PSI Abu Dhabi',
        description:
          'Discover Reem Hills Villas on Reem Island, Abu Dhabi. Explore spacious 3–7 bedroom villas in a premium gated community featuring green parks, jogging tracks, retail promenades, and world-class amenities with Property Shop Investment (PSI).',
        keywords:
          'Reem Hills Villas, Reem Island villas Abu Dhabi, luxury villas Reem Island, Reem Hills community, Abu Dhabi gated community, PSI Reem Hills',
      },
      ar: {
        title: 'فلل ريم هيلز | أسلوب حياة فاخر في جزيرة الريم – PSI أبوظبي',
        description:
          'اكتشف فلل ريم هيلز في جزيرة الريم بأبوظبي. فلل فاخرة من 3 إلى 7 غرف نوم ضمن مجتمع مسوّر راقٍ يضم مساحات خضراء، مسارات للمشي والجري، مرافق تجارية وخدمات متكاملة مع بروبرتي شوب للاستثمار (PSI).',
        keywords:
          'فلل ريم هيلز, فلل جزيرة الريم أبوظبي, فلل فاخرة في جزيرة الريم, مجتمع ريم هيلز, مشاريع أبوظبي السكنية, PSI أبوظبي',
      },
    },
    override: {
      PropertyID: 22864,
      CommunityID: 95259,
      UnitType: 20,
      remarks: 'Reem Hills',
      ...makeUtm({
        'AlReemNur': {
          campaign: 2374,
          remarks:
            'Campaign name:	10.2025_jubail_island_lisitingCampaign',
        },
        'Ramhan_Hubspot': {
          campaign: 2133,
          remarks:
            'Rotation:  ramhan rotation , Campaign name:	Ramhan_Hubspot',
        },
        'Reem-Hills-website-home-page-banner': {
          campaign: 2143,
          remarks: 'campaign name: Reem Hills - website-home page banner',
        },
        'ReemHills_Newsletter_HubSpot': {
          campaign: 2126,
          remarks: 'campaign name: ReemHills_Newsletter_HubSpot',
        },
        'Newsletter%20Campaign_ReemHills_100': {
          campaign: 2126,
          remarks: 'campaign name: ReemHills_Newsletter_HubSpot',
        },
        'ALReemHills_Hubspot': {
          campaign: 2127,
          remarks: 'campaign name: AlReemHills_Hubspot',
        },
        'zaineh-thawabi-campaign': {
          campaign: 2100,
          remarks:
            'Rotation: Reem Hills - Company Campaign 28Sep, campaign name: Zaineh: Reem Hills News',
        },
        'zaineh-thawabi-new-campaign': {
          campaign: 2102,
          remarks:
            'Rotation: Reem Hills - Company Campaign 28Sep, campaign name: Zaineh: Reem Hills News - 2',
        },
        'ReemHills-Retarget-hubspot-21oct': {
          campaign: 2170,
          remarks:
            'Rotation: jamal team, campaign name: ReemHills - Retarget - hubspot - 21oct',
        },
      }),
    },
  },
  'real-estate-tour': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Real Estate Tour UAE | Explore Exclusive Properties with PSI',
        description:
          'Join PSI’s Real Estate Tour and explore premium residential communities across Abu Dhabi and the UAE. Discover villas, townhouses, and apartments from top developers with expert guidance.',
        keywords:
          'real estate tour UAE, property tour Abu Dhabi, PSI real estate projects, luxury properties UAE, property showcase Abu Dhabi, real estate investment UAE',
      },
      ar: {
        title: 'جولة عقارية في الإمارات | استكشف مشاريع مميزة مع PSI',
        description:
          'انضم إلى جولة PSI العقارية واكتشف نخبة من المشاريع السكنية المميزة في أبوظبي والإمارات. فلل وشقق ومنازل تاون هاوس من أفضل المطورين مع استشارات عقارية متخصصة.',
        keywords:
          'جولة عقارية الإمارات, جولة عقارية أبوظبي, مشاريع PSI العقارية, عقارات فاخرة في الإمارات, استثمار عقاري أبوظبي, معارض عقارية',
      },
    },
    override: {
      UnitType: 20,
      remarks: 'ramhan rotation',
      ...makeUtm({
        'Luxury_Projects_Campaign': {
          campaign: 2178,
          remarks:
            'Campaign name:	Luxury_Projects_HubSpot',
        },
        'AlReemHillsNur': {
          campaign: 2374,
          remarks:
            'Campaign name:		10.2025_jubail_island_lisitingCampaign',
        },
        'YasRiva_HubSpot': {
          campaign: 2132,
          remarks:
            'Campaign name:	YasRiva_Hubspot',
        },
        'Raha_Hubspot_Newsletter': {
          campaign: 2737,
          remarks:
            'Campaign name: Raha_Hubspot',
        },
        '11.2015_rental_Campaign': {
          campaign: 2380,
          remarks: 'campaign name: 11.2015_rental_Campaign, rotation: rental',
        },
        'DripCampaign_HubSpot_V2': {
          campaign: 2134,
          remarks: 'campaign name:Drip_Campaign_HubSpot',
        },
        'ALReemHills_Hubspot': {
          campaign: 2127,
          remarks: 'Campaign name: AlReemHills_Hubspot',
        },
        'SAADIYATLAGOONS_hubspot': {
          campaign: 2128,
          remarks: 'Campaign name: SaadiyatLagoons_Hubspot',
        },
        'RamhanIsland_Hubspot': {
          campaign: 2133,
          remarks: 'Rotation:Ramhan rotation, Campaign name: RamhanIsland_Hubspot',
        },
        'Hudayriyat_HubSpot': {
          campaign: 2177,
          remarks: 'Campaign name: Hudayriyat_HubSpot',
        },
        'zaineh-thawabi-campaign': {
          campaign: 1475,
          remarks: 'Ajwan Event Registration, Campaign name: Zaineh:Ajwan Invitation News',
        },
        'NUR_RAK_GEN_HUBSPOT': {
          campaign: 2944,
          remarks: 'RAK General , Campaign name: NUR_RAK_GEN_HUBSPOTs',
        },
      }),
    },
  },
  'ramhan-island': {
    branch: 'auh',
    seo: {
      en: {
        title: 'Ramhan Island Beachfront Villas | Eagle Hills Luxury Living Abu Dhabi',
        description:
          'Experience refined island living at Ramhan Island by Eagle Hills. Discover exclusive standalone beachfront villas with 3 to 7 bedrooms, blending luxury, serenity, and modern design in Abu Dhabi.',
        keywords:
          'Ramhan Island villas, Eagle Hills Ramhan Island, beachfront villas Abu Dhabi, luxury island living UAE, standalone villas Abu Dhabi, Ramhan Island Eagle Hills',
      },
      ar: {
        title: 'فلل جزيرة رمحان الشاطئية | أسلوب حياة فاخر من إيجل هيلز أبوظبي',
        description:
          'استمتع بأسلوب حياة فاخر وهادئ في جزيرة رمحان من إيجل هيلز. اكتشف فلل مستقلة مطلة على الشاطئ من 3 إلى 7 غرف نوم تجمع بين الفخامة والتصميم العصري في أبوظبي.',
        keywords:
          'فلل جزيرة رمحان, إيجل هيلز جزيرة رمحان, فلل شاطئية أبوظبي, فلل فاخرة مستقلة, أسلوب حياة جزري فاخر, عقارات أبوظبي الفاخرة',
      },
    },
    override: {
      PropertyID: 20786,
      UnitType: 20,
      remarks: 'ramhan Island rotation - Ramhan Island',
      ...makeUtm({
        'Ramhan_Hubspot': {
          campaign: 2133,
          remarks:
            'Rotation:  ramhan rotation , Campaign name:	Ramhan_Hubspot',
        },
        'RamhanIsland_Hubspot': {
          campaign: 2133,
          remarks:
            'Rotation:  ramhan rotation , Campaign name:	Ramhan_Hubspot',
        },
      }),
    },
  },
  'test-reg-page': {
    branch: 'auh',
    override: {
      remarks: 'Company',
      ...makeUtm({
        'test-reg': {
          campaign: 2941,
          remarks:
            'Rotation:  Company , Campaign name:	AI test',
        },
      }),
    },
  },
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
          campaign: 3399,
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
         'metwally_muheira_newsletter_jan_2026': {
          campaign: 3465,
          remarks:
            'Rotation: Muheira Residences - company campaign , Campaign name: Metwally: Muheira - Newsletter - Jan 2026',
        },
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
    seo: {
      en: {
        title: "Bashayer Apartments | Modern Living in Abu Dhabi",
        description:
          "Register your interest for Bashayer Apartments. Discover well-designed homes offering comfort, convenience, and excellent value in Abu Dhabi.",
        keywords:
          "Bashayer Apartments, Abu Dhabi apartments, modern apartments Abu Dhabi, residential property Abu Dhabi",
      },
      ar: {
        title: "شقق بشاير | أسلوب حياة عصري في أبوظبي",
        description:
          "سجّل اهتمامك بشقق بشاير واكتشف وحدات سكنية عصرية تجمع بين الراحة والموقع المميز في أبوظبي.",
        keywords:
          "شقق بشاير, شقق أبوظبي, عقارات أبوظبي السكنية, شقق عصرية في أبوظبي",
      },
    },
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
    seo: {
      en: {
        title: "Taraf at Masdar City | Sustainable Living in Abu Dhabi",
        description:
          "Register your interest for Taraf at Masdar City. Experience modern residences designed for sustainable living in one of Abu Dhabi’s most innovative communities.",
        keywords:
          "Taraf Masdar City, Masdar City residences, sustainable living Abu Dhabi, eco friendly apartments Abu Dhabi",
      },
      ar: {
        title: "تراف في مدينة مصدر | أسلوب حياة مستدام في أبوظبي",
        description:
          "سجّل اهتمامك بمشروع تراف في مدينة مصدر واستمتع بوحدات سكنية عصرية مصممة لأسلوب حياة مستدام في أبوظبي.",
        keywords:
          "تراف مدينة مصدر, مدينة مصدر أبوظبي, عقارات مستدامة في أبوظبي, شقق صديقة للبيئة",
      },
    },
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
    seo: {
      en: {
        title: "Al Hayat Island | Island Living in Ras Al Khaimah",
        description:
          "Register your interest for Al Hayat Island in Ras Al Khaimah. Discover waterfront living and exclusive residences in a vibrant island community.",
        keywords:
          "Al Hayat Island, Ras Al Khaimah property, island living RAK, waterfront residences RAK",
      },
      ar: {
        title: "جزيرة الحياة | أسلوب حياة جزيري في رأس الخيمة",
        description:
          "سجّل اهتمامك بمشروع جزيرة الحياة في رأس الخيمة واكتشف وحدات سكنية مميزة توفر أسلوب حياة جزيري قريب من الواجهة البحرية.",
        keywords:
          "جزيرة الحياة, عقارات رأس الخيمة, أسلوب حياة جزيري, شقق مطلة على البحر في رأس الخيمة",
      },
    },
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
    seo: {
      en: {
        title: "Stellar by Elie Saab | Luxury Branded Residences in Abu Dhabi",
        description:
          "Register your interest for Stellar by Elie Saab. Discover exclusive branded residences offering refined luxury, iconic design, and elevated living in Abu Dhabi.",
        keywords:
          "Stellar by Elie Saab, Elie Saab residences Abu Dhabi, luxury branded residences, designer homes UAE",
      },
      ar: {
        title: "ستيلار من إيلي صعب | مساكن فاخرة بعلامة عالمية في أبوظبي",
        description:
          "سجّل اهتمامك بمشروع ستيلار من إيلي صعب في أبوظبي واكتشف مساكن فاخرة تحمل توقيع علامة عالمية تجمع بين التصميم الأيقوني والرقي.",
        keywords:
          "ستيلار إيلي صعب, مساكن إيلي صعب أبوظبي, عقارات فاخرة بعلامة عالمية, منازل مصممة في الإمارات",
      },
    },
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
    seo: {
      en: {
        title: "The Row Saadiyat | Luxury Residences on Saadiyat Island",
        description:
          "Register your interest for The Row Saadiyat. Explore contemporary luxury residences on Saadiyat Island, offering refined living in one of Abu Dhabi’s most prestigious destinations.",
        keywords:
          "The Row Saadiyat, Saadiyat Island residences, luxury property Abu Dhabi, premium homes Saadiyat",
      },
      ar: {
        title: "ذا رو السعديات | مساكن فاخرة في جزيرة السعديات",
        description:
          "سجّل اهتمامك بمشروع ذا رو السعديات واكتشف مساكن فاخرة توفر أسلوب حياة راقٍ في واحدة من أرقى الوجهات السكنية في أبوظبي.",
        keywords:
          "ذا رو السعديات, عقارات جزيرة السعديات, مساكن فاخرة أبوظبي, فلل وشقق السعديات",
      },
    },
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
    seo: {
      en: {
        title: "Full Moon Festival Event | Exclusive Property Showcase",
        description:
          "Register your interest for the Full Moon Festival event. Join an exclusive property showcase curated for the Chinese community, featuring premium real estate opportunities.",
        keywords:
          "Full Moon Festival event, Mid Autumn Festival property event, Chinese property showcase Abu Dhabi, real estate event UAE",
      },
      ar: {
        title: "فعالية مهرجان القمر الكامل | عرض عقاري حصري",
        description:
          "سجّل اهتمامك بفعالية مهرجان القمر الكامل واستمتع بعرض عقاري حصري موجّه للجالية الصينية مع فرص استثمارية مميزة.",
        keywords:
          "مهرجان القمر الكامل, فعالية مهرجان منتصف الخريف, عرض عقاري حصري, فعاليات عقارية في الإمارات",
      },
    },
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
    seo: {
      en: {
        title: "SODIC Event Registration | Book Your Time Slot",
        description:
          "Register for the SODIC event and select your preferred time slot. Meet our team, explore opportunities, and get tailored guidance during your visit.",
        keywords:
          "SODIC event registration, book time slot, property event, real estate consultation, UAE property event",
      },
      ar: {
        title: "التسجيل في فعالية SODIC | احجز موعدك",
        description:
          "سجّل في فعالية SODIC واختر الوقت المناسب لك. تعرّف على الفرص المتاحة واحصل على استشارة مخصصة خلال زيارتك.",
        keywords:
          "التسجيل في فعالية SODIC, حجز موعد, فعالية عقارية, استشارة عقارية, فعاليات العقارات في الإمارات",
      },
    },
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
    seo: {
      en: {
        title: "Malaga Residences Registration | Premium Living Opportunities",
        description:
          "Register your interest in Malaga residences. Discover premium living options, get project details, and connect with our property consultants.",
        keywords:
          "Malaga residences, Malaga property registration, premium residences, real estate registration, luxury property",
      },
      ar: {
        title: "التسجيل في مشروع مالاجا السكني | فرص سكنية مميزة",
        description:
          "سجّل اهتمامك بمشروع مالاجا السكني. تعرّف على تفاصيل المشروع وخيارات السكن وتواصل مع مستشاري العقارات لدينا.",
        keywords:
          "مشروع مالاجا السكني, التسجيل في مالاجا, عقارات فاخرة, فرص سكنية, التسجيل العقاري",
      },
    },
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
    seo: {
      en: {
        title: "Wadi Yemm Ras El Hekma Registration | Coastal Living Opportunities",
        description:
          "Register your interest in Wadi Yemm at Ras El Hekma. Explore coastal living opportunities, project details, and connect with our property experts.",
        keywords:
          "Wadi Yemm Ras El Hekma, Wadi Yemm registration, Ras El Hekma properties, coastal residences, premium real estate",
      },
      ar: {
        title: "التسجيل في مشروع وادي يم رأس الحكمة | فرص سكنية ساحلية",
        description:
          "سجّل اهتمامك بمشروع وادي يم في رأس الحكمة. اطّلع على تفاصيل المشروع وفرص السكن الساحلي وتواصل مع خبراء العقارات لدينا.",
        keywords:
          "وادي يم رأس الحكمة, التسجيل في وادي يم, عقارات رأس الحكمة, سكن ساحلي, فرص سكنية مميزة",
      },
    },
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
    seo: {
      en: {
        title: "Bloom Living Marbella Registration | Mediterranean-Style Living in Abu Dhabi",
        description:
          "Register your interest in Bloom Living Marbella. Discover Mediterranean-inspired homes, community living, and premium lifestyle opportunities in Abu Dhabi.",
        keywords:
          "Bloom Living Marbella, Bloom Living registration, Marbella Abu Dhabi, Mediterranean style homes, Abu Dhabi residential community",
      },
      ar: {
        title: "التسجيل في بلوم ليفينج ماربيلا | أسلوب حياة متوسطي في أبوظبي",
        description:
          "سجّل اهتمامك بمشروع بلوم ليفينج ماربيلا واستكشف منازل مستوحاة من الطراز المتوسطي ضمن مجتمع سكني مميز في أبوظبي.",
        keywords:
          "بلوم ليفينج ماربيلا, التسجيل في بلوم ليفينج, ماربيلا أبوظبي, منازل الطراز المتوسطي, مجتمعات سكنية في أبوظبي",
      },
    },
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
    seo: {
      en: {
        title: "Juman 2 Al Raha Registration | Contemporary Living in Abu Dhabi",
        description:
          "Register your interest in Juman 2 at Al Raha. Explore modern residential living, community amenities, and property opportunities in Abu Dhabi.",
        keywords:
          "Juman 2 Al Raha, Juman 2 registration, Al Raha properties, Abu Dhabi residential projects, modern living",
      },
      ar: {
        title: "التسجيل في مشروع جمان 2 الراحة | أسلوب حياة عصري في أبوظبي",
        description:
          "سجّل اهتمامك بمشروع جمان 2 في منطقة الراحة واكتشف وحدات سكنية عصرية وفرص مميزة للعيش في أبوظبي.",
        keywords:
          "جمان 2 الراحة, التسجيل في جمان 2, عقارات الراحة, مشاريع سكنية في أبوظبي, أسلوب حياة عصري",
      },
    },
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
    seo: {
      en: {
        title: "United Property Expo Baku Registration | Meet PSI & Explore Opportunities",
        description:
          "Register your interest for the United Property Expo in Baku. Connect with Property Shop Investment (PSI) and explore real estate opportunities tailored for you.",
        keywords:
          "United Property Expo Baku, Baku property expo, PSI Baku event, real estate expo Azerbaijan, property investment",
      },
      ar: {
        title: "التسجيل في معرض يونايتد بروبرتي إكسبو باكو | تواصل مع PSI واستكشف الفرص",
        description:
          "سجّل اهتمامك لحضور معرض يونايتد بروبرتي إكسبو في باكو. تواصل مع شركة بروبرتي شوب للاستثمار (PSI) واستكشف فرصًا عقارية تناسب احتياجاتك.",
        keywords:
          "معرض يونايتد بروبرتي إكسبو باكو, معرض عقارات باكو, فعالية PSI في باكو, معرض عقاري أذربيجان, الاستثمار العقاري",
      },
    },
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
    seo: {
      en: {
        title: "Yas Living Abu Dhabi | Register Your Interest",
        description:
          "Register your interest for Yas Living in Abu Dhabi. Discover contemporary residences in a prime community offering comfort, connectivity, and lifestyle-focused living.",
        keywords:
          "Yas Living Abu Dhabi, Yas Living registration, Abu Dhabi residential community, modern homes Yas Island, property investment Abu Dhabi",
      },
      ar: {
        title: "ياس ليفينغ أبوظبي | سجّل اهتمامك",
        description:
          "سجّل اهتمامك بمشروع ياس ليفينغ في أبوظبي واكتشف منازل عصرية ضمن مجتمع متكامل يجمع بين الراحة ونمط الحياة الحديث.",
        keywords:
          "ياس ليفينغ أبوظبي, التسجيل في ياس ليفينغ, مجمع سكني في أبوظبي, منازل عصرية جزيرة ياس, الاستثمار العقاري في أبوظبي",
      },
    },
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
    seo: {
      en: {
        title: "Expo Real Germany | Property Investment Registration with PSI",
        description:
          "Register your interest for Expo Real Germany with Property Shop Investment (PSI). Meet our team and explore international real estate investment opportunities.",
        keywords:
          "Expo Real Germany, Expo Real registration, property expo Germany, PSI Expo Real, international real estate investment",
      },
      ar: {
        title: "معرض إكسبو ريال ألمانيا | التسجيل للاستثمار العقاري مع PSI",
        description:
          "سجّل اهتمامك لحضور معرض إكسبو ريال في ألمانيا مع شركة بروبرتي شوب للاستثمار (PSI) واستكشف فرص الاستثمار العقاري الدولية.",
        keywords:
          "معرض إكسبو ريال ألمانيا, التسجيل في إكسبو ريال, معرض عقاري ألمانيا, الاستثمار العقاري الدولي, PSI ألمانيا",
      },
    },
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
    seo: {
      en: {
        title: "Al Durrah Open House | Register Your Interest with PSI",
        description:
          "Register your interest for the Al Durrah Open House with Property Shop Investment (PSI). Get event details and connect with our team.",
        keywords:
          "Al Durrah Open House, Al Durrah registration, PSI open house, Abu Dhabi open house, real estate open house UAE",
      },
      ar: {
        title: "أوبن هاوس الدرة | سجّل اهتمامك مع PSI",
        description:
          "سجّل اهتمامك لحضور أوبن هاوس الدرة مع شركة بروبرتي شوب للاستثمار (PSI). احصل على تفاصيل الفعالية وتواصل مع فريقنا.",
        keywords:
          "أوبن هاوس الدرة, التسجيل في الدرة, أوبن هاوس أبوظبي, بروبرتي شوب للاستثمار, فعالية عقارية الإمارات",
      },
    },
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
    seo: {
      en: {
        title: "RAK Properties | Register Your Interest with PSI",
        description:
          "Register your interest for Ras Al Khaimah real estate opportunities with Property Shop Investment (PSI). Explore current and upcoming projects.",
        keywords:
          "RAK properties, Ras Al Khaimah real estate, RAK property registration, PSI RAK, UAE property investment",
      },
      ar: {
        title: "عقارات رأس الخيمة | سجّل اهتمامك مع PSI",
        description:
          "سجّل اهتمامك بالفرص العقارية في رأس الخيمة مع شركة بروبرتي شوب للاستثمار (PSI)، واطّلع على المشاريع الحالية والقادمة.",
        keywords:
          "عقارات رأس الخيمة, التسجيل العقاري رأس الخيمة, الاستثمار العقاري الإمارات, بروبرتي شوب للاستثمار",
      },
    },
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
    seo: {
      en: {
        title: "Ogami Dubai | Register Your Interest with PSI",
        description:
          "Register your interest for Ogami in Dubai with Property Shop Investment (PSI). Get updates on availability, pricing, and launch details.",
        keywords:
          "Ogami Dubai, Ogami registration, Dubai real estate, Dubai property investment, PSI Dubai, register interest Ogami",
      },
      ar: {
        title: "أوغامي دبي | سجّل اهتمامك مع PSI",
        description:
          "سجّل اهتمامك بمشروع أوغامي في دبي مع شركة بروبرتي شوب للاستثمار (PSI). احصل على آخر التحديثات حول التوفر والأسعار وتفاصيل الإطلاق.",
        keywords:
          "أوغامي دبي, التسجيل أوغامي, عقارات دبي, الاستثمار العقاري دبي, بروبرتي شوب للاستثمار دبي, سجّل اهتمامك",
      },
    },
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
    seo: {
      en: {
        title: "Yas Acres Abu Dhabi | Register Your Interest with PSI",
        description:
          "Register your interest for Yas Acres in Abu Dhabi with Property Shop Investment (PSI). Explore villas at Magnolias and Dahlias and receive the latest updates.",
        keywords:
          "Yas Acres Abu Dhabi, Yas Acres registration, Magnolias Yas Acres, Dahlias Yas Acres, Abu Dhabi villas, PSI Yas Acres",
      },
      ar: {
        title: "ياس إيكرز أبوظبي | سجّل اهتمامك مع PSI",
        description:
          "سجّل اهتمامك بمشروع ياس إيكرز في أبوظبي مع شركة بروبرتي شوب للاستثمار (PSI). اكتشف فلل ماغنوليا ودهاليا واحصل على أحدث العروض.",
        keywords:
          "ياس إيكرز أبوظبي, التسجيل في ياس إيكرز, فلل أبوظبي, ماغنوليا ياس إيكرز, دهاليا ياس إيكرز, بروبرتي شوب للاستثمار",
      },
    },
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
    seo: {
      en: {
        title: "List Your Property with PSI | Landlord Registration Abu Dhabi",
        description:
          "List your property with Property Shop Investment (PSI). Register as a landlord in Abu Dhabi and let our experts manage, market, and lease your property.",
        keywords:
          "list property Abu Dhabi, landlord registration Abu Dhabi, property management PSI, rent out property UAE, PSI landlord services",
      },
      ar: {
        title: "سجّل عقارك مع PSI | تسجيل المُلّاك في أبوظبي",
        description:
          "سجّل عقارك مع شركة بروبرتي شوب للاستثمار (PSI). خدمات متكاملة لإدارة وتسويق وتأجير العقارات في أبوظبي.",
        keywords:
          "تسجيل المُلّاك أبوظبي, تسجيل عقار, إدارة العقارات PSI, تأجير العقارات الإمارات, بروبرتي شوب للاستثمار",
      },
    },
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
