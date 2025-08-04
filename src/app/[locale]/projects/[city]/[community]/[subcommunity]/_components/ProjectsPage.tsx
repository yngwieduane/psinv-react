
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
        <>
        <div>
            <Breadcrumb/>
        </div>
        <div className="mx-auto container px-6 lg:px-8 mt-5">
            <div className="grid grid-cols-1 gap-4">
                <div className="">
                    <h1 className="text-2xl truncate">Real Estate Projects in {subcommunityname}, {communityname}, {cityname}</h1>
                    <div className="mt-4">
                        <PropertyList page={page} city={city} cityId={cityId} communityId={communityId} subcommunityId={subcommunityId} community={community} subcommunity={subcommunity} project={project} propertyname={propertyname} isFeaturedProjectOnWeb={isFeaturedProjectOnWeb}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}