import { Metadata } from "next";
import PageClient from "./page-client";

type Props = {
  params: { locale: string };
};

// ✅ Hardcoded translations inside the page
const metadataByLocale: Record<string, Metadata> = {
  en: {
    title: "PSI Emirati Hub – Empowering UAE Nationals in Real Estate",
    description:
      "Discover PSI's Emirati Hub, a strategic partnership with the Dubai Real Estate Brokers Program aimed at increasing UAE national participation in the real estate sector.",
  },
  ar: {
    title: "مركز PSI الإماراتي – تمكين المواطنين الإماراتيين في قطاع العقارات",
    description:
      "اكتشف مركز PSI الإماراتي، شراكة استراتيجية مع برنامج وسطاء دبي العقاريين تهدف إلى زيادة مشاركة المواطنين الإماراتيين في قطاع العقارات.",
  },
};

// ✅ Generate metadata dynamically based on locale
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return metadataByLocale[params.locale] || metadataByLocale.en;
}

export default function Page() {
  return <PageClient />;
}
