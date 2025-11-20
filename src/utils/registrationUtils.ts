import type { ProjectMeta } from '@/types/projectMeta';

export const DEFAULT_UTM_META = {
  media_Type: 63906,
  media_Name: 63907,
  MethodOfContactVal: 115747,
};

type UtmMetaEntry = NonNullable<ProjectMeta['utmMetaMap']>[string];

export function makeUtm(
  spec: Record<string, { campaign: number; remarks: string; meta?: UtmMetaEntry }>
) {
  const utmCampaignMap: Record<string, number> = {};
  const utmRemarksMap: Record<string, string> = {};
  const utmMetaMap: NonNullable<ProjectMeta['utmMetaMap']> = {};

  for (const [key, val] of Object.entries(spec)) {
    utmCampaignMap[key] = val.campaign;
    utmRemarksMap[key] = val.remarks;
    utmMetaMap[key] = { ...DEFAULT_UTM_META, ...val.meta };
  }

  return { utmCampaignMap, utmRemarksMap, utmMetaMap };
}
