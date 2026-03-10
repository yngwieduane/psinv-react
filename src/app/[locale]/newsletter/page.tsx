import { getTranslations } from "next-intl/server";
import NewsletterPage from "./newsletterPage";

export async function generateMetadata() {
  const t = await getTranslations("NewsletterPage");

  return {
    title: t("title"),
     description: t("description"),
  };
}

export default function Page() {
  return <NewsletterPage />;
}