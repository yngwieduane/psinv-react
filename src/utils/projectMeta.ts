import type { ProjectMeta } from '@/types/projectMeta';

export const projectMetaMap: Record<string, ProjectMeta> = {
  'al-durrah-open-house-registration': {
    PropertyID: 24463,
    sendto: 'callcenter@psinv.net',
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
    Branch:'AUH',
    RequirementType: 91212,
    MethodOfContactVal: 115747, 
    remarks: 'Al Durrah',

    utmCampaignMap: {
      'ebin-al-durrah-open-house-news': 2834,
      'zaineh-al-durrah-internal-campaign': 2999,
      'aldurrah-whatsapp-broadcast': 3055,
    },

    utmRemarksMap: {
      'ebin-al-durrah-open-house-news': 'Rotation: Company, Campaign name: Irani: Al Durrah Open House - July 16',
      'zaineh-al-durrah-internal-campaign': 'Internal Al Durrah Campaign Lead',
      'aldurrah-whatsapp-broadcast': 'WhatsApp Al Durrah Lead',
    },

    utmMetaMap: {
      'ebin-al-durrah-open-house-news': {
    media_Type: 63906,
    media_Name: 63907,
    MethodOfContactVal: 115747,
      },
      'zaineh-al-durrah-internal-campaign': {
    media_Type: 63906,
    media_Name: 63907,
    MethodOfContactVal: 115747,
      },
      'aldurrah-whatsapp-broadcast': {
    media_Type: 63906,
    media_Name: 63907,
    MethodOfContactVal: 115747,
      },
    },
  },

 'rak-general-registration': {
    sendto: 'callcenter@psinv.net',
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
    remarks: 'Company',
    RequirementType: 91212,
    Branch: 'AUH',
    MethodOfContactVal: 115747,

    utmCampaignMap: {
      'Irani_RAK_General_Newsletter': 2836,
    },

    utmRemarksMap: {
      'Irani_RAK_General_Newsletter': 'Rotation: Company, Campaign name: Irani: RAK General Newsletter',
    },

    utmMetaMap: {
      'Irani_RAK_General_Newsletter': {
    media_Type: 63906,
    media_Name: 63907,
    MethodOfContactVal: 115747,
      },
    },
  },
  'ogami-registration': {
    sendto: 'callcenter@psinv.net',
    ContactType: 3,
    Bathroom: 21935,
    Bedroom: 21935,
    assignto: 3458,
    refby: 3458,
    refto: 3458,
    CountryID: 65948,
    StateID: 63719,
    CityID: 63719,
    PropertyID: 24034,
    UnitType: 19,
    remarks: 'Company',
    RequirementType: 91212,
    Branch: 'AUH',
    MethodOfContactVal: 115747,

    utmCampaignMap: {
      'Irani_Ogami_Newsletter_2025': 2847,
    },

    utmRemarksMap: {
      'Irani_Ogami_Newsletter_2025': 'Rotation: Company, Campaign name: Irani: Ogami Newsletter 2025',
    },

    utmMetaMap: {
      'Irani_Ogami_Newsletter_2025': {
    media_Type: 63906,
    media_Name: 63907,
    MethodOfContactVal: 115747,
      },
    },
  },
    'yas-acres-registration': {
    sendto: 'callcenter@psinv.net',
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
    CommunityID: 165011,
    SubCommunityID: 167636,
    PropertyID: 14524,
    UnitType: 19,
    remarks: 'Company',
    RequirementType: 91212,
    Branch: 'AUH',
    MethodOfContactVal: 115747,

    utmCampaignMap: {
      'Irani-Yas-Acres-Open-House-News': 2850,
    },

    utmRemarksMap: {
      'Irani-Yas-Acres-Open-House-News': 'Rotation: Open House for Yas Acres – Magnolias and Dahlias, Campaign name:Irani: Yas Acres Open House Newsletter',
    },

    utmMetaMap: {
      'Irani-Yas-Acres-Open-House-News': {
    media_Type: 63906,
    media_Name: 63907,
    MethodOfContactVal: 115747,
      },
    },
  },
    'landlord-listing-registration': {
    sendto: 'callcenter@psiassets.com',
    ContactType: 3,
    Bathroom: 21935,
    Bedroom: 21935,
    assignto: 4794,
    refby: 4794,
    refto: 4794,
    CountryID: 65946,
    StateID: 91823,
    CityID: 91823,
    DistrictID: 102625,
    CommunityID: 95259,
    //SubCommunityID: 167636,
    PropertyID: 20799,
    UnitType: 19,
    remarks: 'Company',
    RequirementType: 91212,
    Branch: 'assets',
    MethodOfContactVal: 115747,

    utmCampaignMap: {
      'landlord-listing-newsletter': 2259,
    },

    utmRemarksMap: {
      'landlord-listing-newsletter': 'Rotation:LRO Rotation , Campaign name: Landlord listing newsletter hubspot',
    },

    utmMetaMap: {
      'landlord-listing-newsletter': {
    media_Type: 63906,
    media_Name: 63907,
    MethodOfContactVal: 115747,
      },
    },
  },
};
