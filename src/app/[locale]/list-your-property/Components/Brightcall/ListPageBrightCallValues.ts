// src/utils/brightCall/brightCallOverrides.ts
import type { BrightCallContext } from "@/utils/brightCall/resolveBrightCall";

type Locale = "en" | "ar" | "de";


const REG_WIDGET_KEYS_BY_UTM: Record<string, string> = {
    "SAADIYATLAGOONS_hupspot": "09e5a347f6f2d696ba743b6e3de4ea82",
    "ALReemHills_Hubspot": "910b00ce56663bd619de61c6bab5d88c",
    "RamhanIsland_Hubspot": "d3522237adb993fb54089cccc2d29812",
    "Hudayriyat_Hubspot": "d8b6e0264d3e86b065335cadb9a17198",
    "YasRiva_Hubspot": "408010eec3747815237d10cd7efd26be",
    "Landlord_Hubspot": "52f086a6812a20304347df8b9d5d48ed",
    "DripCampaign": "1c27616759b41602c0e96ad5e141b52d",
    "DripCampaign_hubspot": "1c27616759b41602c0e96ad5e141b52d",
    "": "a42370634aea3e6253fd817064a0824c",
};


function buildRules() {
    const rules: Array<{ match: (ctx: BrightCallContext) => boolean; widgetKey: string }> = [];

    // A) UTM-specific overrides (highest priority)
    for (const [slug, utmMap] of Object.entries(REG_WIDGET_KEYS_BY_UTM)) {
        for (const [utmCampaign, byLocale] of Object.entries(utmMap)) {
            for (const [locale, widgetKey] of Object.entries(byLocale) as Array<[Locale, string]>) {
                if (!widgetKey) continue;

                rules.push({
                    match: (ctx) =>
                        ctx.pageType === "registration" &&
                        ctx.slug === slug &&
                        ctx.locale === locale &&
                        ctx.utmCampaign === utmCampaign,
                    widgetKey,
                });
            }
        }
    }

    return rules;
}

export const ListPageBrightCallValues = buildRules();