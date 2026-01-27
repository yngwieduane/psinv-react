import Breadcrumb from "../_components/Breadcrumb"
import DevelopersList from "../developer/_components/DevelopersList"
import DevPropertyList from "../developer/_components/DevPropertyList"

export const metadata = {
    title: "Top Real Estate Developers in UAE | Property Shop Investment",
    description:"Explore leading real estate developers in the UAE and discover their latest residential and commercial projects with Property Shop Investment.",
  };
export default async function AllDevelopersPage() {
    

    return (
        <>
            <div className="mx-auto container pt-28 md:pt-40 pb-24">
                <div>
                    <Breadcrumb />
                </div>
                <h1 className="text-2xl text-center truncate">Developers</h1>
                <div className="w-full flex my-5 justify-content-center">
                    <DevelopersList slug="" />
                </div>
                <div className="mb-5 mt-10">
                    <DevPropertyList developer="" />
                </div>
            </div>
        </>
    )
}