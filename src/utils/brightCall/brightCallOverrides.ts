import type { BrightCallContext } from "./resolveBrightCall";

export const brightCallOverrides: Array<{
    match: (ctx: BrightCallContext) => boolean;
    widgetKey: string;
}> = [
        // One Residence – EN
        {
            match: ({ pageType, slug, locale }) =>
                pageType === "registration" &&
                slug === "one-residence-registration" &&
                locale === "en",
            widgetKey: "306ae4d7339f5efe7242dd259068d4d8",
        },

        // One Residence – AR
        {
            match: ({ pageType, slug, locale }) =>
                pageType === "registration" &&
                slug === "one-residence-registration" &&
                locale === "ar",
            widgetKey: "306ae4d7339f5efe7242dd259068d4d8",
        },
    ];
