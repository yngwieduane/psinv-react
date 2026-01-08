import RegistrationHeroImage from "../../_components/RegistrationHeroImage";
import RegistrationForm from "../../_components/RegistrationForm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/utils/projectOverrides";

import BrightCallWidget from "@/app/[locale]/_components/BrightCallWidget";
import { resolveBrightCallWidgetKey } from "@/utils/brightCall/resolveBrightCall";

type Params = { locale: "en" | "ar"; slug: string };

type PageProps = {
  params: Promise<Params>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Registration: ${slug}` };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug, locale } = await params;
  const sp = (await searchParams) ?? {};
  const utmCampaign = typeof sp.utm_campaign === "string" ? sp.utm_campaign : null;

  const widgetKey = resolveBrightCallWidgetKey({
    pageType: "registration",
    locale: (locale === "ar" ? "ar" : "en"),
    slug,
    utmCampaign,
  });
  if (!slug || !PROJECTS[slug]) return notFound();
  return (
    <div>
      <RegistrationHeroImage slug={slug} locale={locale} />
      <RegistrationForm slug={slug} />

      {/* BrightCall widget */}
      <BrightCallWidget widgetKey={widgetKey} formType="registration" />
    </div>
  );
}
