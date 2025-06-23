
import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";
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
        <>
        <div>
            <Breadcrumb/>
        </div>
        <div className="mx-auto container px-6 lg:px-8 mt-5">
            <div className="grid grid-cols-1 gap-4">
                <div className="">
                    <h1 className="text-2xl truncate">Real Estate Projects in UAE</h1>
                    <div className="mt-4">
                        <PropertyList page={page} city={city} cityId={cityId} community={community} subcommunity={subcommunity} project={project} propertyname={propertyname} isFeaturedProjectOnWeb={isFeaturedProjectOnWeb}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}