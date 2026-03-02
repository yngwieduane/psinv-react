import { Metadata } from "next";
import LuxuryProjectPageClient from "./page-client";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'LuxuryProjectUAE.metadata' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default function LuxuryProjectPage() {
    
    return(
        <LuxuryProjectPageClient />
    )
}