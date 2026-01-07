// src/utils/brightCall/brightCallDefaults.ts

export type BrightCallPageType = "registration" | "landing";
export type BrightCallLocale = "en" | "ar";

/**
 * Default widget key per page type + locale
 */
export const brightCallDefaults: Record<
    BrightCallPageType,
    Record<BrightCallLocale, string>
> = {
    registration: {
        en: process.env.NEXT_PUBLIC_BRIGHTCALL_REG_EN ?? "",
        ar: process.env.NEXT_PUBLIC_BRIGHTCALL_REG_AR ?? "",
    },
    landing: {
        en: process.env.NEXT_PUBLIC_BRIGHTCALL_LP_EN ?? "",
        ar: process.env.NEXT_PUBLIC_BRIGHTCALL_LP_AR ?? "",
    },
} as const;

export type SupportedLocale = keyof typeof brightCallDefaults["registration"]; // "en" | "ar"
