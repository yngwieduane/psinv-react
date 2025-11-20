import type { ProjectMeta } from '@/types/projectMeta';

export type Branch = 'auh' | 'dubai' | 'assets';

export const GLOBAL_DEFAULTS: ProjectMeta = {
  sendto: 'wd3@psinv.net',
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
  MethodOfContactVal: 115747,
  Branch: 'auh',
};

export const BRANCH_DEFAULTS: Record<Branch, Partial<ProjectMeta>> = {
  auh: {
    Branch: 'auh',
  },

  dubai: {
    Branch: 'dubai',
    sendto: 'callcenter@psidubai',
    assignto: 4421,
    refby: 4421,
    refto: 4421,
    CountryID: 65948,
    StateID: 63719,
    CityID: 63719,
  },

  assets: {
    Branch: 'assets',
    assignto: 4794,
    refby: 4794,
    refto: 4794,
    sendto: 'callcenter@psiassets.com',
  },
};
 