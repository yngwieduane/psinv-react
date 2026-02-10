import { getTranslations } from "next-intl/server";
import ComparePage from "./_components/ComparePage";

export async function generateMetadata() {
    const t = await getTranslations("Compare_page.metadata");
  
    return {
      title: t("title"),
      description: t("description"),
    };
  }


export default async function Compare() {

    return (
        <>
            <ComparePage />
        </>
    );
}