import { getTranslations } from "next-intl/server";
import BlogPage from "./blogPage";

export async function generateMetadata() {
    const t = await getTranslations("BlogPage.metadata");
  
    return {
      title: t("title"),
      description: t("description"),
    };
  }

export default function Page() {
  return <BlogPage />;
}
