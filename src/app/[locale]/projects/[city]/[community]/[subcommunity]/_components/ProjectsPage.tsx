
import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";
import PropertyList from "./PropertyList";
import { unslugify } from "@/utils/utils";


export default async function ProjectsPage({
    page,
    city,
    community,
    subcommunity,
    project,
    propertyname,
    isFeaturedProjectOnWeb,
    cityId,
    communityId,
    subcommunityId,
}: {
    page: number;
    city: string;
    community: string;
    subcommunity: string;
    project: string;
    propertyname: string;
    isFeaturedProjectOnWeb: string;
    cityId: string;
    communityId: string;
    subcommunityId: string;
}) {

    const cityname = unslugify(city);
    const communityname = unslugify(community);
    const subcommunityname = unslugify(subcommunity);
    return (
        <div className="bg-white min-h-screen pt-32 pb-0 mx-5 mt-10 md:mt-0 md:mx-0">
            <div>
                <Breadcrumb />
            </div>
            <div className="mt-5">
                <div className="grid grid-cols-1 gap-4">
                    <div className="">
                        <h1 className="mx-auto container text-3xl md:text-4xl font-bold text-gray-900 leading-tight truncate mb-6 md:mb-10">Real Estate Projects in {subcommunityname}, {communityname}, {cityname}UAE</h1>
                        <div className="">
                            <PropertyList page={page} city={city} cityId={cityId} communityId={communityId} subcommunityId={subcommunityId} community={community} subcommunity={subcommunity} project={project} propertyname={propertyname} isFeaturedProjectOnWeb={isFeaturedProjectOnWeb} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}