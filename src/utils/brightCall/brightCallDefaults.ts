// src/utils/brightCall/brightCallDefaults.ts

export type BrightCallPageType = "registration" | "landing";
export type BrightCallLocale = "en" | "ar" | "de";

/**
 * Defaults are only FALLBACKS.
 * UTM-specific or slug-specific widgets should be done via overrides.
 */
export const brightCallDefaults: Record<
    BrightCallPageType,
    Record<BrightCallLocale, string>
> = {
    registration: {
        en: process.env.NEXT_PUBLIC_BRIGHTCALL_REG_EN ?? "",
        ar: process.env.NEXT_PUBLIC_BRIGHTCALL_REG_AR ?? "",
        de: process.env.NEXT_PUBLIC_BRIGHTCALL_REG_EN ?? "",
    },
    landing: {
        en: process.env.NEXT_PUBLIC_BRIGHTCALL_LP_EN ?? "",
        ar: process.env.NEXT_PUBLIC_BRIGHTCALL_LP_AR ?? "",
        de: process.env.NEXT_PUBLIC_BRIGHTCALL_REG_EN ?? "",
    },
} as const;

export type SupportedLocale = keyof typeof brightCallDefaults["registration"]; // "en" | "ar"
