import { getTranslations } from "next-intl/server";
import ContactPage from "./contactPage";

export async function generateMetadata() {
    const t = await getTranslations("ContactPage.metadata");
    console.log(t("title"));
    return {
      title: t("title"),
      description: t("description"),
    };
  }

export default function Page() {
  return <ContactPage />;
}
