// src/types/projectMeta.ts

export type Branch = 'auh' | 'dubai' | 'assets';

export type FieldType =
  | 'text'
  | 'select'
  | 'checkbox'
  | 'number'
  | 'email'
  | 'phone'
  | 'property';

export interface FieldOption {
  value: string | number;
  labelKey?: string;
  label?: string;
}

export interface FieldConfig {
  id: string;
  type: FieldType;
  labelKey?: string;
  placeholderKey?: string;
  label?: string;
  required?: boolean;
  options?: FieldOption[];
  defaultValue?: unknown;
  min?: number;
  max?: number;
  pattern?: RegExp | string;
  showIfUtm?: string[];
  payloadKey?: string;
  propertyConfig?: {
    limit?: number;            
    dubaiCityId?: number;
    onlyFeatured?: boolean;
    developerName?: string;
  };
}

export interface ProjectMeta {
  Branch: Branch;

  sendto: string;
  assignto: number;
  refby: number;
  refto: number;

  ContactType: number;
  RequirementType: number;

  Bedroom: number | string;
  Bathroom: number | string;

  CountryID: number;
  StateID: number;
  CityID: number;
  DistrictID?: number;

  CommunityID?: number;
  SubCommunityID?: number;
  PropertyID?: number;
  UnitType: number;

  remarks: string;

  PropertyCampaignId?: number;
  media_Type?: number;
  media_Name?: number;
  MethodOfContactVal?: number;

  Budget?: number | string;
  Budget2?: number | string;

  ReferredByID?: string | number;
  ReferredToID?: string | number;
  ActivityAssignedTo?: string | number;

  gclid?: string;

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

  form?: {
    extraFields?: FieldConfig[];
  };
}

