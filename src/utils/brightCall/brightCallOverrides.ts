// src/utils/brightCall/brightCallOverrides.ts
import type { BrightCallContext } from "./resolveBrightCall";

type Locale = "en" | "ar" | "de";

/**
 * 1) Slug-level widget keys
 */
const REG_WIDGET_KEYS_BY_SLUG: Record<string, Partial<Record<Locale, string>>> = {
    "hilton-residences-registration": {
        en: "0a3b4acbe31fbc0262343cef4d12c5a4",
        ar: "a3e9dd33f8264665bf7510ed806a3db3",
    },
    "radisson-blu-registration": {
        en: "2362802f6d685248fab13dac073a16c9",
        // ar: "...."
    },
    "hudayriyat-island-registration": {
        en: "dfd50233ef0abb5d275125d53a5be8a1",
        ar: "6d2693dc8f8c3595a7c967eb32598067",
    },
    "hudayriyat-island-general-registration": {
        en: "8c581e82a815e4eed2eec6751efe1d05",
        ar: "85922d070e62a716041e52b9ff3d7b74",
    },
    "muheira-maysan-registration": {
        en: "bd87bfb0dca1f3babd13d1ed174c276a",
        ar: "ba839451863f6e56f7ba09f0592cf22d",
    },
    "reem-island-registration": {
        en: "b5013d1f36ef002102c7035ba9ced1e5",
        ar: "8822e715c7ddc989345cfc6facdb5bd8",
    },
    "one-residence-registration": {
        en: "9f167fa24b1d9e9bc219042d31b73db0",
        ar: "d0e81f6475f4763bb8870d4d2d5f79e8",
    },
    "yas-riva-registration": {
        en: "6dc9fe9e4f6e6169d8c54c741c0c2788",
        ar: "4295d3b7e7623da2b155999500e62c93",
    },
    "bashayer-apartments-registration": {
        en: "ef955972d531fc53a80aa952c0f0f7ca",
        ar: "d0616194761f12d71135e12891c069e3",
    },
    "taraf-masdar-city-registration": {
        en: "696abff8ffbd05a11e8d5ed8711802ed",
        ar: "aa2474347e63550ee4ba32dff6f4de3a",
    },
    "al-hayat-island-registration": {
        en: "7ba12c6ff62fa46d39cb777767e00aa7",
        ar: "5be3785b376cd8b203aebb4c72c07264",
    },
    "stellar-by-elie-Saab-registration": {
        en: "5cba1b75493f9bb296d9929de3124153",
        ar: "ae07a73f207f06423ea1f75a09db4bd1",
    },
    "the-row-saadiyat-registration": {
        en: "998b6ed0c2c29dbd56ea3ee16a78968e",
        ar: "57aef31282ff7065d83b730d6c9a4ca8",
    },
    "sodic-event-registration": {
        en: "",
        ar: "04ce9472515e14979530fb11b0f2b199",
    },
    "malaga-registration": {
        en: "1cf47889ed8a1ecb4c94d8b37693a02c",
        ar: "a1731550b47ee36c076d050f9514a212",
    },
    "wadi-yemm-registration": {
        en: "b4020d7762595182ba587a9bb3c48225",
        ar: "112c34fcc3c3460c15ef50bf6241bb6d",
    },
    "bloom-living-marbella-registration": {
        en: "802174f1175454a4417e1a56f63d09b7",
        ar: "b96c3509a10e5cc1ada1ba701dec34ff",
    },
    "juman-2-registration": {
        en: "40b5d997f5f7a14e90f14a625b65a135",
        ar: "aad8258b78e0e22905052117657d9fe7",
    },
    "united-property-expo-baku": {
        en: "9075b4fec09993d00b655ec83bc93847",
        ar: "d08a9f261ebd834b6cbc5e914589d628",
    },
    "yas-living-registration": {
        en: "77f5f00472f7a9f70b593666006c071d",
        ar: "ea0a575cfff0a4aa402121f5ea0b0a53",
    },
    "expo-real-germany": {
        de: "8ed1ba276f0c831dbce07d0eb8eb464d",
    },
    "al-durrah-open-house-registration": {
        en: "3e286ef418e1b437217778a992ff12d0",
        ar: "196e1a4a5038383d1dabb14f06017d11",
    },
    "rak-general-registration": {
        en: "8c18af70c8c5f1541ce3aefc151a38d3",
        ar: "ecebdde6e5e5b41ec78b01eb050a99ca",
    },
    "ogami-registration": {
        en: "1dd87c494454eca732689facbeac6d27",
        ar: "804f8e2cf9b1d196d00b7d4a7d2d488a",
    },
    "yas-acres-registration": {
        en: "7bc4289db33ed2d594c47d4428b468be",
        ar: "175a0328b7720bfcdf0dba86e35afbfc",
    },
    "ohana-yas-island-registration": {
        en: "5b4fd4491147e7fc831d290996609cc3",
        ar: "2f302002ab7a51ac3941b26c76e71fb0",
    },
    "radiant-wave-registration": {
        en: "f65576dfefb9092530091671f1dc6ad4",
        ar: "928d7bc8ded69faeac9b8ee0965c163b",
    },
    "aldar-roadshow-registration": {
        en: "6d4c72dc8d8cadbfe8deb50825da4ed6",
        ar: "e7c69b151686d39e2642931a11ea5154",
    },
    "test-reg-page": {
        en: "3b3c2a37b7351ff5e13fd9b2fb1876f9",
    },
    "lp-listing": {
        en: "796da99655275939aebd8c8d19604345",
    },
    "psi-rental-units": {
        en: "0e3127ecb5024746ef9ace5679b452c8",
    },
    "hilton-residences-raha-beach-registration": {
        en: "44e36fad15f399da9f3906e5a04efe93",
        ar: "5b3f2203912e9a320f2a838940788a02",
    },
    "rotana-registration": {
        en: "502024cf05f882ac39db024fed593842",
        ar: "fc6d426ab09c9c5a820c1e63be4ea5b4",
    },
    // Add here
};

/**
 * 2) Optional UTM-specific widget keys
 * Use this ONLY when a particular utm_campaign needs a different widget.
 *
 * Structure: slug -> utm_campaign -> locale -> widgetKey
 */
const REG_WIDGET_KEYS_BY_UTM: Record<
    string,
    Record<string, Partial<Record<Locale, string>>>
> = {
    "muheira-maysan-registration": {
        "shaza_muheira_news": { en: "76b9a46b2707f482130587f4727a2705", ar: "721d19fa98b7a245734a466563455f8e" },
        "zaineh_muheira_news": { en: "bd87bfb0dca1f3babd13d1ed174c276a", ar: "ba839451863f6e56f7ba09f0592cf22d" },
    },
    "yas-riva-registration": {
        "zaineh_yas_riva_news": { en: "23ab7dcc1609835e5b1288616f1bc9e1", ar: "cc2fc78a40a756491d169da6dd42c741" },
    },
    "wadi-yemm-registration": {
        "ali-wadi-yemm-newsletter-oct25": { en: "14cde702e1b626683380810fc477dff7", ar: "a37f72c1191c1698ca3f469acaa455b8" },
    },
    "the-row-saadiyat-registration": {
        "irani_the_row_saadiyat_island_newsletter": { en: "46e42c0cf2c2e512a46a73db631e22a6", ar: "abea317459d6eaf3cbac1174edccac01" },
    },
    "real-estate-tour": {
    "11.2015_rental_Campaign": { en: "ed79ff21331448d40612ff6a353d2aa2", ar: "ed79ff21331448d40612ff6a353d2aa2" },
    "ALReemHills_Hubspot": { en: "910b00ce56663bd619de61c6bab5d88c", ar: "910b00ce56663bd619de61c6bab5d88c" },
    "SaadiyatLagoons_Hubspot": { en: "09e5a347f6f2d696ba743b6e3de4ea82", ar: "09e5a347f6f2d696ba743b6e3de4ea82" },
    "YasRiva_Hubspot": { en: "408010eec3747815237d10cd7efd26be", ar: "408010eec3747815237d10cd7efd26be" },
    "RamhanIsland_Hubspot": { en: "d3522237adb993fb54089cccc2d29812", ar: "d3522237adb993fb54089cccc2d29812" },
    "Hudayriyat_HubSpot": { en: "d8b6e0264d3e86b065335cadb9a17198", ar: "d8b6e0264d3e86b065335cadb9a17198" },
    "Luxury_Projects_Campaign": { en: "78aa896d87cd37e55740dad30f30d4f0", ar: "78aa896d87cd37e55740dad30f30d4f0" },
    },
    "ramhan-island": {
    "Ramhan_Hubspot": { en: "d3522237adb993fb54089cccc2d29812", ar: "d3522237adb993fb54089cccc2d29812" },
    "RamhanIsland_Hubspot": { en: "d3522237adb993fb54089cccc2d29812", ar: "d3522237adb993fb54089cccc2d29812" },
    },

};

const LP_WIDGET_KEYS_BY_SLUG: Record<string, Partial<Record<Locale, string>>> = {
    "sama-yas": {
        en: "6b7e59add8142621e894bbd83c79d58c",
        ar: "5a2866c627e980f0cb8b0026a9609525",
    },
    // add more lp slugs
};

const LP_WIDGET_KEYS_BY_UTM: Record<
    string,
    Record<string, Partial<Record<Locale, string>>>
> = {
    // only if any LP needs utm-specific widget keys
    // "sama-yas": { "some_utm": { en: "...", ar: "..." } }
};

/* ------------------ builder: UTM rules first, then slug rules ------------------ */

function buildRules() {
    const rules: Array<{ match: (ctx: BrightCallContext) => boolean; widgetKey: string }> = [];

    // A) UTM-specific overrides
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

    // B) Slug-specific overrides
    for (const [slug, byLocale] of Object.entries(REG_WIDGET_KEYS_BY_SLUG)) {
        for (const [locale, widgetKey] of Object.entries(byLocale) as Array<[Locale, string]>) {
            if (!widgetKey) continue;

            rules.push({
                match: (ctx) =>
                    ctx.pageType === "registration" &&
                    ctx.slug === slug &&
                    ctx.locale === locale,
                widgetKey,
            });
        }
    }

    return rules;
}

export const brightCallOverrides = buildRules();
