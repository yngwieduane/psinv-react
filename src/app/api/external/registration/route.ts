import { NextResponse } from 'next/server';
import {
  insertPSILead,
  insertHubspotLead,
  insertDubaiLead,
  insertAssetsLead,
} from '@/utils/crmApiHelpers';
import { resolveMediaMeta } from '@/utils/campaignMeta';
import { projectMetaMap } from '@/utils/projectMeta';
import type { ProjectMeta } from '@/types/projectMeta';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      utm_source,
      utm_campaign,
      branch,
      slug,
      refby,
      refto,
      sendto,
      assignto,
      PropertyID,
      CountryID,
      StateID,
      CityID,
      DistrictID,
      CommunityID,
      SubCommunityID,
      UnitType,
      remarks,
      media_Type,
      media_Name,
      MethodOfContactVal,
      PropertyCampaignId,
      hubspot,
      newslettercamid,
      facebookcamid,
      tiktokcamid,
      youtubecamid,
      chatbotcamid,
      googlecamid,
      snapchatcamid,
      ...rest
    } = body;

    const projectOverrides: Partial<ProjectMeta> = slug ? projectMetaMap[slug] ?? {} : {};

    const campaignDefaults = {
      media_Type,
      media_Name,
      MethodOfContactVal,
      PropertyCampaignId,
      hubspot,
      newslettercamid,
      facebookcamid,
      tiktokcamid,
      youtubecamid,
      chatbotcamid,
      googlecamid,
      snapchatcamid,
    };

    const meta = resolveMediaMeta(slug, utm_campaign, campaignDefaults);
    const payload = {
      ...rest,
      ...meta,
      ...projectOverrides,

      // Override priority: request > projectMetaMap
      refby: refby || projectOverrides.refby,
      refto: refto || projectOverrides.refto,
      sendto: sendto || projectOverrides.sendto,
      assignto: assignto || projectOverrides.assignto,
      PropertyID: PropertyID || projectOverrides.PropertyID,
      CountryID: CountryID || projectOverrides.CountryID,
      StateID: StateID || projectOverrides.StateID,
      CityID: CityID || projectOverrides.CityID,
      DistrictID: DistrictID || projectOverrides.DistrictID,
      CommunityID: CommunityID || projectOverrides.CommunityID,
      SubCommunityID: SubCommunityID || projectOverrides.SubCommunityID,
      UnitType: UnitType || projectOverrides.UnitType,
      remarks: remarks || projectOverrides.remarks,
      MediaType: meta.mediatype ?? media_Type ?? 129475,
      MediaName: meta.medianame ?? media_Name ?? 165233,
      MethodOfContact: meta.MethodOfContact ?? MethodOfContactVal ?? projectOverrides.MethodOfContactVal ?? 115747,
      PropertyCampaignId: meta.PropertyCampaignId,
    };

    const effectiveBranch = branch || projectOverrides.Branch || '';
    const isAssetsBranch = effectiveBranch.toLowerCase() === 'assets';
    const isDubaiBranch = effectiveBranch.toLowerCase() === 'dubai';
    const isHubspotMedia = meta.medianame === 63907;
    let crmResponse;

    if (isHubspotMedia) {
      console.log('Sending lead to: HubSpot', isAssetsBranch ? '(Assets)' : '(AUH)');
      crmResponse = await insertHubspotLead(payload, isAssetsBranch);
    } else if (isDubaiBranch) {
      console.log('Sending lead to: Dubai CRM');
      crmResponse = await insertDubaiLead(payload);
    } else if (isAssetsBranch) {
      console.log('Sending lead to: PSI Assets CRM');
      crmResponse = await insertAssetsLead(payload);
    } else {
      console.log('Sending lead to: PSI AUH CRM');
      crmResponse = await insertPSILead(payload);
    }
    const result = await crmResponse.json();
    return NextResponse.json({
      success: true,
      sentTo: isHubspotMedia
        ? isAssetsBranch
          ? 'hubspot-assets'
          : 'hubspot-auh'
        : isDubaiBranch
          ? 'dubai'
          : isAssetsBranch
            ? 'assets'
            : 'auh',
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}