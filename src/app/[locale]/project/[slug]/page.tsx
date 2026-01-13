// src/app/[locale]/project/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import RegistrationHeroImage from "../../_components/RegistrationHeroImage";
import RegistrationForm from "../../_components/RegistrationForm";
import BrightCallWidget from "@/app/[locale]/_components/BrightCallWidget";
import { resolveBrightCallWidgetKey } from "@/utils/brightCall/resolveBrightCall";

import { PROJECTS } from "@/utils/projectOverrides";

type Locale = "en" | "ar";

type PageProps = {
  params: {
    locale: Locale;
    slug: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
};

type SeoMeta = {
  title: string;
  description?: string;
  keywords?: string;
};

type LocalizedSeo = {
  en: SeoMeta;
  ar?: SeoMeta;
};

function resolveSeo(seo: undefined | SeoMeta | LocalizedSeo, locale: Locale): SeoMeta | null {
  if (!seo) return null;

  if ("en" in seo) {
    return (seo as LocalizedSeo)[locale] ?? (seo as LocalizedSeo).en;
  }

  return seo as SeoMeta;
}
function humanizeSlug(slug: string) {
  return slug
    .replace(/-registration$/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = PROJECTS[params.slug];
  if (!project) return {};

  const seo = resolveSeo(project.seo as any, params.locale);
  const canonicalPath = `/${params.locale}/project/${params.slug}`;

  return {
    metadataBase: new URL("https://www.psinv.net"),

    title: seo?.title ?? "Property Shop Investment",
    description: seo?.description,
    keywords: seo?.keywords,

    alternates: {
      canonical: canonicalPath,
      languages: {
        en: `/en/project/${params.slug}`,
        ar: `/ar/project/${params.slug}`,
      },
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug, locale } = params;

  if (!slug || !PROJECTS[slug]) return notFound();

  const sp = searchParams ?? {};
  const utmCampaign = typeof sp.utm_campaign === "string" ? sp.utm_campaign : null;

  const widgetKey = resolveBrightCallWidgetKey({
    pageType: "registration",
    locale: locale === "ar" ? "ar" : "en",
    slug,
    utmCampaign,
  });

  const project = PROJECTS[slug];
  const seo = resolveSeo(project.seo as any, locale);
  const h1Text =
    seo?.title
      ? seo.title.replace(/\s*\|\s*.*$/, "")
      : humanizeSlug(slug);
  return (
    <div>
      <h1 className="sr-only">
        {locale === "ar" ? `سجّل اهتمامك بـ ${h1Text}` : `Register your interest for ${h1Text}`}
      </h1>
      <RegistrationHeroImage slug={slug} locale={locale} />
      <RegistrationForm slug={slug} />

      {/* BrightCall widget */}
      <BrightCallWidget widgetKey={widgetKey} formType="registration" />
    </div>
  );
}