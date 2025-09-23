import { NextResponse } from "next/server";
import {
  insertPSILead,
  insertHubspotLead,
  insertDubaiLead,
  insertAssetsLead,
} from "@/utils/crmApiHelpers";
import { resolveMediaMeta } from "@/utils/campaignMeta";
import { projectMetaMap } from "@/utils/projectMeta";
import type { ProjectMeta } from "@/types/projectMeta";

const S = (v: any) => (v ?? v === 0 ? String(v) : "");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      utm_source,
      utm_campaign,
      branch,
      slug,

      // explicit client values (highest priority)
      MediaType: bodyMediaType,
      MediaName: bodyMediaName,
      MethodOfContact: bodyMethodOfContact,
      PropertyCampaignId: bodyPropertyCampaignId,

      // optional meta / overrides
      refby, refto, sendto, assignto,
      PropertyID, CountryID, StateID, CityID, DistrictID,
      CommunityID, SubCommunityID, UnitType, remarks,

      // legacy campaign defaults
      media_Type, media_Name, MethodOfContactVal, PropertyCampaignId,
      hubspot, newslettercamid, facebookcamid, tiktokcamid,
      youtubecamid, chatbotcamid, googlecamid, snapchatcamid,

      // everything else (form)
      ...rest
    } = body;

    const projectOverrides: Partial<ProjectMeta> =
      slug ? projectMetaMap[slug] ?? {} : {};

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

    // Resolve meta from slug + campaign (may be empty)
    const meta = resolveMediaMeta(slug, utm_campaign, campaignDefaults) || {};

    // Final media/contact (priority: client → meta → defaults → hard fallback)
    const finalMediaType =
      bodyMediaType ?? meta.mediatype ?? campaignDefaults.media_Type ?? 129475;
    const finalMediaName =
      bodyMediaName ?? meta.medianame ?? campaignDefaults.media_Name ?? 165233;
    const finalMethodOfContact =
      bodyMethodOfContact ??
      meta.MethodOfContact ??
      MethodOfContactVal ??
      projectOverrides.MethodOfContactVal ??
      115747;
    const finalPropertyCampaignId =
      bodyPropertyCampaignId ??
      meta.PropertyCampaignId ??
      projectOverrides.PropertyCampaignId ??
      "";

    const payload = {
      ...rest,

      // location/meta overrides with safe fallbacks
      refby: refby ?? projectOverrides.refby,
      refto: refto ?? projectOverrides.refto,
      sendto: sendto ?? projectOverrides.sendto,
      assignto: assignto ?? projectOverrides.assignto,

      PropertyID: PropertyID ?? projectOverrides.PropertyID ?? "",
      CountryID: CountryID ?? projectOverrides.CountryID,
      StateID: StateID ?? projectOverrides.StateID,
      CityID: CityID ?? projectOverrides.CityID,
      DistrictID: DistrictID ?? projectOverrides.DistrictID,
      CommunityID: CommunityID ?? projectOverrides.CommunityID ?? "",
      SubCommunityID: SubCommunityID ?? projectOverrides.SubCommunityID ?? "",
      UnitType: UnitType ?? projectOverrides.UnitType,
      remarks: remarks ?? projectOverrides.remarks,

      // canonical media/contact
      MediaType: finalMediaType,
      MediaName: finalMediaName,
      MethodOfContact: finalMethodOfContact,
      PropertyCampaignId: finalPropertyCampaignId,

      // optional echoes
      ...(utm_source ? { utm_source } : {}),
      ...(utm_campaign ? { utm_campaign } : {}),
      branch: branch ?? projectOverrides.Branch ?? "",
      slug: slug ?? "",
    };

    // Destination selection
    const effectiveBranch = (branch ?? projectOverrides.Branch ?? "").toLowerCase();
    const isAssetsBranch = effectiveBranch === "assets";
    const isDubaiBranch = effectiveBranch === "dubai";
    const isHubspotMedia = S(payload.MediaName) === "63907";

    let crmResponse;
    if (isHubspotMedia) {
      console.log("Sending lead to: HubSpot", isAssetsBranch ? "(Assets)" : "(AUH)");
      crmResponse = await insertHubspotLead(payload, isAssetsBranch);
    } else if (isDubaiBranch) {
      console.log("Sending lead to: Dubai CRM");
      crmResponse = await insertDubaiLead(payload);
    } else if (isAssetsBranch) {
      console.log("Sending lead to: PSI Assets CRM");
      crmResponse = await insertAssetsLead(payload);
    } else {
      console.log("Sending lead to: PSI AUH CRM");
      crmResponse = await insertPSILead(payload);
    }

    const result = await crmResponse.json();
    return NextResponse.json({
      success: true,
      sentTo: isHubspotMedia
        ? isAssetsBranch
          ? "hubspot-assets"
          : "hubspot-auh"
        : isDubaiBranch
          ? "dubai"
          : isAssetsBranch
            ? "assets"
            : "auh",
      result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
