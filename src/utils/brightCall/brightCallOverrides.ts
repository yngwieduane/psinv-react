import type { BrightCallContext } from "./resolveBrightCall";

type Locale = "en" | "ar";

const REG_WIDGET_KEYS: Record<string, Record<Locale, string>> = {
    "hilton-residences-registration": {
        en: "0a3b4acbe31fbc0262343cef4d12c5a4",
        ar: "a3e9dd33f8264665bf7510ed806a3db3",
    },
    "radisson-blu-registration": {
        en: "2362802f6d685248fab13dac073a16c9",
        ar: "",
    },
    "hudayriyat-island-registration": {
        en: "dfd50233ef0abb5d275125d53a5be8a1",
        ar: "6d2693dc8f8c3595a7c967eb32598067",
    },
};

export const brightCallOverrides = Object.entries(REG_WIDGET_KEYS).flatMap(
    ([slug, byLocale]) =>
        (Object.entries(byLocale) as Array<[Locale, string]>)
            .filter(([, widgetKey]) => Boolean(widgetKey))
            .map(([locale, widgetKey]) => ({
                match: (ctx: BrightCallContext) =>
                    ctx.pageType === "registration" &&
                    ctx.slug === slug &&
                    ctx.locale === locale,
                widgetKey,
            }))
);
