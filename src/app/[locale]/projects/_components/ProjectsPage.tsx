import { Suspense } from "react";
import Breadcrumb from "../../_components/Breadcrumb";
import PropertyCard from "../../_components/tools/PropertyCard";
import { Skeleton } from "../../_components/tools/Skeleteon";
import PropertyList from "./PropertyList";
import SearchProperty from "./SearchProperty";


export default async function ProjectsPage({
    page,
    city,
    community,
    subcommunity,
    project,
    propertyname,
    isFeaturedProjectOnWeb
  }: {
    page: number;
    city: string;
    community: string;
    subcommunity: string;
    project: string;
    propertyname: string;
    isFeaturedProjectOnWeb: string;
  }) {


    return (  
        <>
        <div>
            <Breadcrumb/>
        </div>
        <div className="mx-auto container px-6 lg:px-8 mt-5">
            <div className="grid grid-cols-1 gap-4">
                <div className="">
                    <SearchProperty placeholder="Property Name"/>
                </div>
                <div className="">
                    <div className="mt-16 lg:mt-10">
                        <Suspense key={page} fallback={<Skeleton />}>
                            <PropertyList page={page} city={city} community={community} subcommunity={subcommunity} project={project} propertyname={propertyname} isFeaturedProjectOnWeb={isFeaturedProjectOnWeb}/>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}