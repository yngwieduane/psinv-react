export interface RealEstateListing {
  latitude: string;
  longitude: string;
  fallbackImage:string;
}

export interface UnitListing {
  category: string;
  code: string;
  status: string;
  refNo: string;
  community: string;
  propertyname: string;
  built_upArea: string;
  bedrooms: string;
  unitView: string | null;
  unitModel: string | null;
  floorNo: string | null;
  handoverDate: string;
  agent: string;
  contactNumber: string | null;
  remarks: string;
  imageurl: string;
  facilities: string;
  country_name: string;
  state_name: string;
  city_name: string;
  district_name: string;
  financing_company: string | null;
  parking: string;
  sub_type: string;
  floorPlans: string | null;
  sellprice: string;
  rent: string | null;
  sub_community: string;
  property_overview: string;
  local_area_amenities_des: string | null;
  no_of_bathrooms: string;
  pdfBrochureLink: string | null;
  fittingFixtures: string | null;
  unit_Amenities: string;
  agent_Pk: string;
  property_Pk: string;
  property_ownership_desc: string | null;
  country_pk: string;
  state_pk: string;
  city_pk: string;
  district_pk: string;
  community_pk: string;
  sub_community_pk: string | null;
  view_360: string | null;
  agent_rera_no: string | null;
  pro_google_coordinates: string;
  salesmanemail: string;
  last_updated: string;
  listing_date: string;
  expiry_date: string;
  recomended_properties: string | null;
  financeOffered: string | null;
  newspaper: string | null;
  roi: string | null;
  externalUrl: string | null;
  infoGraphics: string | null;
  marketingTitle: string;
  title_AR: string | null;
  description_Ar: string | null;
  externalUrl_youtube: string | null;
  externalUrl_VirtualTour: string | null;
  featuredProperty: string;
  dealOfTheDay: string;
  dealExpirationPeriod: string | null;
  targetPrice: string | null;
  developerName: string;
  currentOffer: string | null;
  marketingOptions: string;
  mandate: string | null;
  currencyAbr: string;
  areaMeasurement: string;
  reraStrNo: string | null;
  furnish_status: string;
}

export interface NearbysType {
  landmarkId: string;
  landmarkEnglishName: string;
  landmarkArabicName: string;
  categoryId: string;
  categoryName: string;
  longitude: string;
  latitude: string;
  addressLine1English: string;
  addressLine1Arabic: string;
  website: string;
  youtubeLink: string;
  usefulLink: string;
  virtualTourLink: string;
  facebookLink: string;
  instagramLink: string;
  cityName: string;
  communityName: string;
  subCommunityName: string;
  isFeatured: string;
  communityImages: string;
  landmarkImageLogo: string;
  landmarkLogo: string;
};

export interface Installment {
  installmentTypeId: number;
  installmentTypeName: string;
  amountPercentage: number;
  frequencyId: number;
  frequencyName: string;
  instalmentDate: string;
  installmentNumber: number | null;
  isBasedOnBookingDate: boolean;
}

export interface PaymentPlan {
  propertyPaymentPlanId: number;
  paymentPlanName: string | null;
  description: string;
  propertyPlanStatusId: number;
  statusName: string;
  planTypeId: number;
  planTypeName: string;
  isForSpecificProperty: boolean;
  isSelectedUnit: boolean;
  isConfigrationSelected: boolean;
  propertyPlanInstallments: Installment[];
  paymentPlanDevelopers: any[]; // Define more if structure is known
  paymentPlanDocuments: any[]; // Define more if structure is known
}

export interface PaymentPlansResponse {
  result: PaymentPlan[];
  totalCount: number;
}


export interface Articles  {
  name: string,
  image: string,
  category: string
  content: string
}