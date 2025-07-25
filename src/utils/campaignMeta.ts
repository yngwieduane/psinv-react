import { projectMetaMap } from '@/utils/projectMeta';
import type { ProjectMeta } from '@/types/projectMeta';

interface CampaignDefaults {
  media_Type?: number;
  media_Name?: number;
  MethodOfContactVal?: number;
  PropertyCampaignId?: number;
}

export function resolveMediaMeta(
  slug: string,
  utmCampaign: string | null,
  defaults: CampaignDefaults = {}
) {
  const projectMeta = projectMetaMap[slug] || {};
  const utmKey = (utmCampaign || '').toLowerCase();
  const resolveMapValue = <T>(map: Record<string, T> | undefined): T | undefined =>
  Object.entries(map || {}).find(([key]) => key.toLowerCase() === utmKey)?.[1];

  const utmMeta = resolveMapValue(projectMeta.utmMetaMap) || {};
  const PropertyCampaignId = resolveMapValue(projectMeta.utmCampaignMap) ?? defaults.PropertyCampaignId;
  const campaignRemark = resolveMapValue(projectMeta.utmRemarksMap) ?? projectMeta.remarks ?? '';

  const mediatype = utmMeta.media_Type ?? projectMeta.media_Type ?? defaults.media_Type ?? 129475;
  const medianame = utmMeta.media_Name ?? projectMeta.media_Name ?? defaults.media_Name ?? 165233;
  const MethodOfContact =
    utmMeta.MethodOfContactVal ?? projectMeta.MethodOfContactVal ?? defaults.MethodOfContactVal ?? 115747;

  return {
    mediatype,
    medianame,
    MethodOfContact,
    PropertyCampaignId,
    campaignRemark,
  };
}
