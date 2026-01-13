// src/utils/brightCall/resolveBrightCall.ts
import { brightCallDefaults } from "@/utils/brightCall/brightCallDefaults";
import type { BrightCallPageType, BrightCallLocale } from "@/utils/brightCall/brightCallDefaults";
import { ListPageBrightCallValues } from "./ListPageBrightCallValues";

export type ListPageBrightCallContext = {
    pageType: BrightCallPageType;     // "registration" | "landing" | "listpage"
    locale: BrightCallLocale; 
    utmCampaign?: string | null;
};

export function ListPageResolveBrightcallWidget(ctx: ListPageBrightCallContext): string {
    // 1) overrides (highest priority)
    const hit = ListPageBrightCallValues.find((o) => o.match(ctx));
    if (hit?.widgetKey) return hit.widgetKey;

    // 2) defaults by pageType + locale
    return brightCallDefaults[ctx.pageType][ctx.locale] || "";
}