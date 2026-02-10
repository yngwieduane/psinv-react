import { getTranslations } from "next-intl/server";
import FavoritesPage from "./_components/FavoritesPage";

export async function generateMetadata() {
  const t = await getTranslations("favorites_page.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}
export default async function Favorites() {

  return (
    <>
      <FavoritesPage />
    </>
  );
}