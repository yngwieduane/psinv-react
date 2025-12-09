// src/app/utils/projectOverrides.ts
import type { ProjectMeta } from '@/types/projectMeta';
import { makeUtm } from './registrationUtils';

export type PerSlug = { branch: 'auh' | 'dubai' | 'assets'; override?: Partial<ProjectMeta> };

export const PROJECTS :Record<string, PerSlug> = {
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
