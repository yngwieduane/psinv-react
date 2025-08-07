import { projectMetaMap } from '@/utils/projectMeta';
import type { ProjectMeta } from '@/types/projectMeta';

interface CampaignDefaults {
  media_Type?: number;
  media_Name?: number;
  MethodOfContactVal?: number;
  PropertyCampaignId?: number;
}

function getCaseInsensitive<T>(map: Record<string, T> | undefined, key: string): T | undefined {
  if (!map) return undefined;
  const entry = Object.entries(map).find(([k]) => k.toLowerCase() === key.toLowerCase());
  return entry?.[1];
}

export function resolveMediaMeta(
  slug: string,
  utmCampaign: string | null,
  defaults: CampaignDefaults = {}
) {
  const projectMeta = projectMetaMap[slug] || {};
  const utmKey = (utmCampaign || '').toLowerCase();
  const utmMeta = getCaseInsensitive(projectMeta.utmMetaMap, utmKey) || {};
  const PropertyCampaignId = getCaseInsensitive(projectMeta.utmCampaignMap, utmKey) ?? defaults.PropertyCampaignId;
  const campaignRemark = getCaseInsensitive(projectMeta.utmRemarksMap, utmKey) ?? projectMeta.remarks ?? '';
  const mediatype = utmMeta.media_Type ?? projectMeta.media_Type ?? defaults.media_Type ?? 129475;
  const medianame = utmMeta.media_Name ?? projectMeta.media_Name ?? defaults.media_Name ?? 165233;
  const MethodOfContact = utmMeta.MethodOfContactVal ?? projectMeta.MethodOfContactVal ?? defaults.MethodOfContactVal ?? 115747;

  return {
    mediatype,
    medianame,
    MethodOfContact,
    PropertyCampaignId,
    campaignRemark,
  };
}
