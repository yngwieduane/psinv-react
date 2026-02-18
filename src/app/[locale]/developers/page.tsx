import Breadcrumb from "../_components/Breadcrumb"
import DevelopersList from "../developer/_components/DevelopersList"
import DevPropertyList from "../developer/_components/DevPropertyList"
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("developers_page.metadata");
  
    return {
      title: t("title"),
      description: t("description"),
    };
  }
// export const metadata = {
//     title: "Top Real Estate Developers in UAE | Property Shop Investment",
//     description: "Explore leading real estate developers in the UAE and discover their latest residential and commercial projects with Property Shop Investment.",
// };
export default async function AllDevelopersPage() {


    return (
        <>
            <div className="">

                <div className="pt-28 md:pt-36 border-b border-gray-100 bg-white dark:border-neutral-800 bg-white dark:bg-neutral-900">
                    <div className="container mx-auto">
                        <Breadcrumb
                        />
                    </div>
                </div>
                <div className="mx-auto container">
                    <h1 className="text-2xl text-center truncate">Developers</h1>
                    <div className="w-full flex my-5 justify-content-center">
                        <DevelopersList slug="" />
                    </div>
                    <div className="mb-5 mt-10">
                        <DevPropertyList developer="" />
                    </div>
                </div>
            </div>
        </>
    )
}