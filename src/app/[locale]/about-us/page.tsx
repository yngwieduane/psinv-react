
import { Metadata } from "next";
import AboutPageClient from "./page-client";
type Props = {
    params: Promise<{ locale: string }>;
  };
  
  // ✅ Hardcoded translations inside the page
  const metadataByLocale: Record<string, Metadata> = {
    en: {
      title: "About Us - property shop investment",
      description:
        "Property Shop Investment is a vision brought to life by real estate experts. A trusted UAE real estate company headquartered in Abu Dhabi.",
    },
    ar: {
        title: "من نحن - بروبرتي شوب للاستثمار",
        description:
              "بروبرتي شوب للاستثمار هي رؤية تحققت لخبراء العقارات، وشركة عقارية موثوقة تعمل في دولة الإمارات العربية المتحدة من مقرها الرئيسي في أبوظبي."
      },
      zh: {
        title: "关于我们 - Property Shop Investment",
        description:
          "Property Shop Investment 是房地产专家愿景的成功体现，是一家总部位于阿布扎比、在阿联酋运营的知名房地产公司。"
      },
      ru: {
        title: "О нас - Property Shop Investment",
        description:
          "Property Shop Investment — это воплощение видения экспертов в сфере недвижимости. Компания является хорошо известным и уважаемым агентством недвижимости, работающим в ОАЭ, с головным офисом в Абу-Даби."
      },
      de: {
        title: "Über uns - Property Shop Investment",
        description:
          "Property Shop Investment — это воплощение видения экспертов в сфере недвижимости, известная и уважаемая компания в ОАЭ с офисом в Абу-Даби."
      }
      
      
  };
  
  // ✅ Generate metadata dynamically based on locale (Next 15 compatible)
  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
  
    return metadataByLocale[locale] || metadataByLocale.en;
  }
  




export default function AboutPage() {

    return (
        <AboutPageClient />
    )
}