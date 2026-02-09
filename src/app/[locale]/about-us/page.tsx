
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutPageClient from "./page-client";

type Props = {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About_Us_Page.metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function AboutPage() {
  return (
    <AboutPageClient />
  )
}