export type UtmConfig = {
  campaignId: string;
  remarks: string;
};

export const normalizeUtm = (v: string) => {
  try {
    return decodeURIComponent(v || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");
  } catch {
    return (v || "").trim().toLowerCase().replace(/\s+/g, "_");
  }
};
const RAW_UTM_CAMPAIGN_MAP: Record<string, UtmConfig> = {
  "Landlord_Hubspot": {
    campaignId: "2199",
    remarks:
      "Campaign name: 	Landlords_General_Hubspot",
  },
    "Hudayriyat_HubSpot": {
    campaignId: "2177",
    remarks:
      "Campaign name: 	Hudayriyat_HubSpot",
  },
    "Luxury_Projects_Hubspot": {
    campaignId: "2178",
    remarks:
      "Campaign name: Luxury_Projects_HubSpot",
  },
  "RamhanIsland_Hubspot": {
    campaignId: "2133",
    remarks:
      "Rotation: Ramhan, Campaign name: Ramhan_Hubspot",
  },
    "ALReemHills_Hubspot": {
    campaignId: "2127",
    remarks:
      "Campaign name: AlReemHills_Hubspot",
  },
    "SaadiyatLagoonsNur": {
    campaignId: "2128",
    remarks:
      "Campaign name: SaadiyatLagoons_Hubspot",
  },
    "SaadiyatLagoons_Hubspot": {
    campaignId: "2128",
    remarks:
      "Campaign name: SaadiyatLagoons_Hubspot",
  },
   "YasRiva_Hubspot": {
    campaignId: "2132",
    remarks:
      "Campaign name: YasRiva_HubSpot                           ",
  },
  // add more...
};
export const UTM_CAMPAIGN_MAP: Record<string, UtmConfig> = Object.fromEntries(
  Object.entries(RAW_UTM_CAMPAIGN_MAP).map(([key, val]) => [normalizeUtm(key), val])
);

export type UtmInfo = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
};

export type UtmResolved = {
  utm: UtmInfo;
  matched: boolean;
  campaignId: string;
  campaignRemarks: string;
};

export function parseUtmFromSearch(search: string): UtmInfo {
  const params = new URLSearchParams(search);
  return {
    utm_source: normalizeUtm(params.get("utm_source") || ""),
    utm_medium: normalizeUtm(params.get("utm_medium") || ""),
    utm_campaign: normalizeUtm(params.get("utm_campaign") || ""),
    utm_term: normalizeUtm(params.get("utm_term") || ""),
    utm_content: normalizeUtm(params.get("utm_content") || ""),
  };
}

export function resolveUtmCampaignFromSearch(search: string): UtmResolved {
  const utm = parseUtmFromSearch(search);
  const hit = utm.utm_campaign ? UTM_CAMPAIGN_MAP[utm.utm_campaign] : undefined;

  return {
    utm,
    matched: Boolean(hit),
    campaignId: hit?.campaignId || "",
    campaignRemarks: hit?.remarks || "",
  };
}
