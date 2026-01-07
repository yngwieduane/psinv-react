// src/utils/brightCall/resolveBrightCall.ts
import type { BrightCallPageType, BrightCallLocale } from "./brightCallDefaults";
import { brightCallDefaults } from "./brightCallDefaults";
import { brightCallOverrides } from "./brightCallOverrides";

export type BrightCallContext = {
    pageType: BrightCallPageType;     // "registration" | "landing"
    locale: BrightCallLocale;         // "en" | "ar"
    slug?: string | null;
    utmCampaign?: string | null;
};

export function resolveBrightCallWidgetKey(ctx: BrightCallContext): string {
    // 1) overrides (highest priority)
    const hit = brightCallOverrides.find((o) => o.match(ctx));
    if (hit?.widgetKey) return hit.widgetKey;

    // 2) defaults by pageType + locale
    return brightCallDefaults[ctx.pageType][ctx.locale] || "";
}
