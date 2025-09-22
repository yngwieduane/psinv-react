// src/app/[locale]/project/lp/[lpSlug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { landingConfigs, type LpSlug, type LandingConfig } from "./LandingConfig";

import HeroSection from "./_components/HeroSection";
import MainNavbar from "./_components/MainNavbar";
import InquiryForm from "./_components/InquiryForm";
import UspSection from "./_components/UspSection";
import AboutSection from "./_components/AboutSection";
import GallerySection from "./_components/GallerySection";
import AmenitiesSection from "./_components/AmenitiesSection";
import FloorPlans from "./_components/FloorPlans";
import LocationMap from "./_components/LocationMap";
import LandingFooter from "./_components/LandingFooter";

type Params = { locale: string; lpSlug: LpSlug };
type UspItem = { title: string; desc?: string };

/* ----------------------------- METADATA (per slug) ----------------------------- */
export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { locale, lpSlug } = await params;

  const cfg = landingConfigs[lpSlug];
  if (!cfg) return { title: "Property Shop Investment" };

  const tHero = await getTranslations({
    locale,
    namespace: `LandingPages.${lpSlug}.hero`,
  });

  const opt = (key: string): string | undefined => {
    try { return tHero(key); } catch { return undefined; }
  };

  const rawTitle = opt("heading") ?? cfg.title ?? "Property Shop Investment";
  const title = `${rawTitle} - Property Shop Investment`;

  const description =
    opt("description") ?? opt("sub") ?? cfg.description ?? "Discover premier properties with PSI.";

  const ogImage = cfg.ogImage ?? cfg.data.hero?.img ?? "/images/og/default.jpg";
  const url = `/${locale}/project/lp/${lpSlug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "PSI",
      images: [{ url: ogImage, width: 1200, height: 630, alt: rawTitle }],
      locale,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

/* ----------------------------------- PAGE UI ----------------------------------- */
type PageProps = { params: Promise<Params> };

export default async function Page({ params }: PageProps) {
  const { locale, lpSlug } = await params;
  const cfg = landingConfigs[lpSlug] as LandingConfig;
  if (!cfg) return notFound();

  const crmMeta = cfg.data.integration?.meta;
  const heroVariant = cfg.data.integration?.heroVariant ?? "glass";
  const footerVariant = cfg.data.integration?.footerVariant ?? "solid";

  const t = await getTranslations({ locale, namespace: `LandingPages.${lpSlug}.hero` });

  const safe = (key: string): string | undefined => {
    try { return t(key); } catch { return undefined; }
  };

  const heading = safe("heading") ?? cfg.title;
  const sub = safe("sub");
  const description = safe("description");
  const ctaText = safe("cta");
  const heroImg = cfg.data.hero?.img ?? "/images/og/default.jpg";
  const isRTL = locale === "ar";

  // -------------------- USP --------------------
  const MAX_USP = 8;
  type MaybeReadonlyUsp = ReadonlyArray<UspItem> | undefined;
  let uspItems: UspItem[] = (cfg.data.usp?.items as MaybeReadonlyUsp)?.slice(0, MAX_USP) ?? [];

  try {
    const tUsp = await getTranslations({ locale, namespace: `LandingPages.${lpSlug}.usp` });

    const unresolved = (key: string, val: string) =>
      val === `LandingPages.${lpSlug}.usp.${key}`;

    const collect = (n: number): UspItem | null => {
      const keyTitle = `item${n}.title`;
      const title = tUsp(keyTitle);
      if (!title || unresolved(keyTitle, title)) return null;

      const keyDesc = `item${n}.desc`;
      let desc: string | undefined;
      try {
        const d = tUsp(keyDesc);
        desc = unresolved(keyDesc, d) ? undefined : d;
      } catch {
        desc = undefined;
      }
      return { title, desc };
    };

    const translated: UspItem[] = Array.from({ length: MAX_USP }, (_, i) => collect(i + 1))
      .filter((x): x is UspItem => x !== null);

    if (translated.length) uspItems = translated;
  } catch {
  }

  // -------------------- ABOUT --------------------
  const tAbout = await getTranslations({
    locale,
    namespace: `LandingPages.${lpSlug}.about`,
  }).catch(() => null);

  const aboutFrom = (key: string, fb?: string) => {
    try {
      return tAbout ? tAbout(key) : fb;
    } catch {
      return fb;
    }
  };

  // -------------------- GALLERY --------------------
  const galleryImages = cfg.data.gallery?.images ?? [];

  // -------------------- AMENITIES --------------------
  const tAmenities = await getTranslations({
    locale,
    namespace: `LandingPages.${lpSlug}.amenities`,
  }).catch(() => null);

  const aSafe = (key: string): string | undefined => {
    try {
      return tAmenities ? tAmenities(key) : undefined;
    } catch {
      return undefined;
    }
  };

  const amenitiesTitle = aSafe("title");
  const amenitiesDesc = aSafe("desc");
  const amenitiesCta = aSafe("cta");

  const cfgAmenities = cfg.data.amenities?.items ?? [];
  const humanize = (s: string) =>
    s
      .replace(/([A-Z])/g, " $1")
      .replace(/[-_]+/g, " ")
      .trim()
      .replace(/^\w/, (c) => c.toUpperCase());
  type AmenityItem = { label: string; icon: string };

  const amenitiesItems: AmenityItem[] = cfgAmenities
    .map((it, i) => {
      const byIndexLabel = aSafe(`items.item${i + 1}.label`);
      const byIndexIcon = aSafe(`items.item${i + 1}.icon`);

      return {
        label: byIndexLabel ?? humanize(it.key),
        icon: byIndexIcon ?? it.icon ?? "/icons/default.svg",
      };
    })
    .filter((x) => Boolean(x.label));

  // -------------------- FLOOR PLANS --------------------
  const floorCfg: LandingConfig["data"]["floorPlan"] | undefined = cfg.data.floorPlan;

  // -------------------- LOCATION --------------------
  const mapEmbedUrl = cfg.data.location?.mapEmbedUrl;

  return (
    <main dir={isRTL ? "rtl" : "ltr"}>
      <HeroSection
        sectionId="home"
        img={heroImg}
        heading={heading}
        sub={sub}
        description={description}
        ctaText={ctaText}
        topSlot={<MainNavbar locale={locale} />}
        rightSlot={
          crmMeta ? (
            <InquiryForm crm={crmMeta} variant={heroVariant} />
          ) : null
        }
      />
      {cfg.sections.includes("usp") && uspItems.length > 0 && (
        <UspSection items={uspItems} />
      )}
      {cfg.sections.includes("about") && (
        <AboutSection
          image={cfg.data.about?.img}
          heading={aboutFrom("heading", cfg.data.about?.heading)}
          subheading={aboutFrom("subheading", cfg.data.about?.subheading)}
          description={aboutFrom("description", cfg.data.about?.description)}
          ctaText={aboutFrom("cta", cfg.data.about?.ctaText)}
          ctaHref={cfg.data.about?.ctaHref}
          videoId={cfg.data.about?.videoId}
        />
      )}
      {cfg.sections.includes("gallery") && galleryImages.length > 0 && (
        <GallerySection
          images={galleryImages}
          split="alternate"
          ns={`LandingPages.${lpSlug}.gallery`}
          titleKey="title"
          sectionId="gallery"
          className="mt-12"
        />
      )}
      {cfg.sections.includes("amenities") && amenitiesItems.length > 0 && (
        <AmenitiesSection
          sectionId="amenities"
          title={amenitiesTitle}
          desc={amenitiesDesc}
          cta={amenitiesCta}
          ctaHref="#contact"
          items={amenitiesItems}
          className="mt-14"
        />
      )}
      {cfg.sections.includes("floor-plan") && floorCfg && (
        <FloorPlans
          title="Floor Plans"
          heroImage={floorCfg.heroImage}
          groups={floorCfg.groups}
          {...(floorCfg.files ? { files: floorCfg.files } : {})}
          sectionId="floor-plans"
          ns={floorCfg.ns}
        />
      )}
      {cfg.sections.includes("location") && mapEmbedUrl && (
        <LocationMap
          mapEmbedUrl={mapEmbedUrl}
          titleNs={`LandingPages.${lpSlug}.floorPlans`}
          titleKey="title"
        />
      )}
      {cfg.sections.includes("footer") && (
        <LandingFooter
          crm={crmMeta}
          heading={cfg.data.footer?.heading}
          address={cfg.data.footer?.address}
          localTel={cfg.data.footer?.localTel}
          intlTel={cfg.data.footer?.intlTel}
          socials={cfg.data.footer?.socials}
          formHeading={cfg.data.footer?.formHeading}
          dir={isRTL ? "rtl" : "ltr"}
          variant={footerVariant}
        />
      )}
    </main>
  );
}
