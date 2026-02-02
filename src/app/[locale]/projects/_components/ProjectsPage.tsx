import Breadcrumb from "../../_components/Breadcrumb";
import PropertyList from "./PropertyList";


export default async function ProjectsPage({
    page,
    city,
    community,
    subcommunity,
    project,
    propertyname,
    isFeaturedProjectOnWeb,
    cityId,
}: {
    page: number;
    city: string;
    community: string;
    subcommunity: string;
    project: string;
    propertyname: string;
    isFeaturedProjectOnWeb: string;
    cityId: string;
}) {

    return (
        <div className="bg-white min-h-screen pb-0 mx-5 md:mx-0">
            <div className="pt-28 md:pt-36 border-b border-gray-100 bg-white">
                <div className="container mx-auto py-4">
                    <Breadcrumb
                    />
                </div>
            </div>
            <div className="mt-5">
                <div className="grid grid-cols-1 gap-4">
                    <div className="">
                        <h1 className="mx-auto container text-3xl md:text-4xl font-bold text-gray-900 leading-tight truncate mb-6 md:mb-10">Real Estate Projects in UAE</h1>
                        <div className="">
                            <PropertyList page={page} city={city} cityId={cityId} community={community} subcommunity={subcommunity} project={project} propertyname={propertyname} isFeaturedProjectOnWeb={isFeaturedProjectOnWeb} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}