// src/types/projectMeta.ts

export interface ProjectMeta {
  PropertyID?: number;
  sendto: string;
  ContactType?: number;
  Bathroom: number;
  Bedroom: number;
  assignto: number;
  refby: number;
  refto: number;
  CountryID: number;
  StateID: number;
  CityID: number;
  DistrictID?: number;
  CommunityID?: number;
  SubCommunityID?: number;
  UnitType: number;
  remarks: string;
  PropertyCampaignId?: number;
  media_Type?: number;
  media_Name?: number;
  MethodOfContactVal?: number;
  utmCampaignMap?: Record<string, number>;
  utmRemarksMap?: Record<string, string>;
  utmMetaMap?: Record<
    string,
    {
      media_Type?: number;
      media_Name?: number;
      MethodOfContactVal?: number;
    }
  >;
  RequirementType: number;
  Budget?: number;
  Budget2?: number;
  Branch?: string;
  ReferredByID?: string | number;
  ReferredToID?: string | number;
  ActivityAssignedTo?: string | number;
  gclid?: string;
}
