// src/utils/brightCall/brightCallOverrides.ts
import type { ListPageBrightCallContext } from "../Brightcall/ListPageResolveBrightcallWidget";

type Locale = "en" | "ar" | "de";


const WIDGETS_BY_UTM_CAMPAIGN: Record<string, Partial<Record<Locale, string>>> = {
    "SAADIYATLAGOONS_hupspot": {
        "en": "09e5a347f6f2d696ba743b6e3de4ea82",
    },
    "ALReemHills_Hubspot": {
        "en": "910b00ce56663bd619de61c6bab5d88c",
    },"RamhanIsland_Hubspot": {
        "en": "d3522237adb993fb54089cccc2d29812",
    },"Hudayriyat_Hubspot": {
        "en": "d8b6e0264d3e86b065335cadb9a17198",
    },"YasRiva_Hubspot": {
        "en": "408010eec3747815237d10cd7efd26be",
    },"Landlord_Hubspot": {
        "en": "52f086a6812a20304347df8b9d5d48ed",
    },"DripCampaign": {
        "en": "1c27616759b41602c0e96ad5e141b52d",
    },"DripCampaign_hubspot": {
        "en": "1c27616759b41602c0e96ad5e141b52d",
    },"":  {
        "en": "a42370634aea3e6253fd817064a0824c",
    }
};


function buildRules() {
    const rules: Array<{ match: (ctx: ListPageBrightCallContext) => boolean; widgetKey: string }> = [];

    // A) UTM-specific overrides (highest priority)    
        for (const [utmCampaign, localeMap] of Object.entries(WIDGETS_BY_UTM_CAMPAIGN)) {
            for (const [locale, widgetKey] of Object.entries(localeMap) as Array<[Locale, string]>) {
                if (!widgetKey) continue;

                rules.push({
                    match: (ctx) => {
                        const isCampaignMatch = ctx.utmCampaign === utmCampaign;
                        const isLocaleMatch = ctx.locale === locale;
                        const isPageTypeMatch = ctx.pageType === "listpage";

                        return isCampaignMatch && isLocaleMatch && isPageTypeMatch;
                    },
                    widgetKey, 
                });
            }
        }

    return rules;
}

export const ListPageBrightCallValues = buildRules();