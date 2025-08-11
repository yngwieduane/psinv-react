// types/registrationTypes.ts

export interface RegistrationFormPayload {
  TitleID: string;
  FirstName: string;
  FamilyName: string;

  MobileCountryCode: string;
  MobileAreaCode: string;
  MobilePhone: string;

  TelephoneCountryCode: string;
  TelephoneAreaCode: string;
  Telephone: string;

  Email: string;
  NationalityID: string;
  LanguageID: string;

  CompanyID: string;
  Remarks: string;

  RequirementType?: number;
  ContactType?: number;

  CountryID: number | string;
  StateID: number | string;
  CityID: number | string;
  DistrictID: number | string;
  CommunityID?: number;
  SubCommunityID?: number;

  PropertyID?: number;
  UnitType: number;
  MethodOfContact: number;
  MediaType: number;
  MediaName: number;

  DeactivateNotification: string;

  Bedroom: number | string;
  Bathroom: number | string;
  Budget: number | string;
  Budget2: number | string;
  AreaFrom: string;

  RequirementCountryID: string | number;
  ExistingClient: string;
  CompaignSource: string;
  CompaignMedium: string;
  Company: string;
  NumberOfEmployee: string;

  LeadStageId: string;
  LeadRatingId: string;
  UnitId: string;

  ReferredToID: number | string;
  ReferredByID: number | string;
  ActivityAssignedTo: number | string;
  ActivityDate: string;
  ActivityTypeId: string;
  ActivitySubject: string;
  ActivityRemarks: string;
  IsForAutoRotation: string;
  PropertyCampaignId?: number;
  google_gclid: string;
}
