
import PropertyCard from "../../_components/tools/PropertyCard";
import Pagination from "../../_components/tools/Pagination";
import SearchProperty from "./SearchProperty";
import { Suspense } from "react";
import { Skeleton } from "../../_components/tools/Skeleteon";

export default async function PropertyList({
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

    const data = await fetch('https://psi.properties/api/external/allprojects?page='+page+'&propertyname='+propertyname+'&isFeaturedProjectOnWeb='+isFeaturedProjectOnWeb)
    const posts = await data.json() ;
    const totalPages = Math.ceil(Number(posts['totalCount']) / 24);
    
    return (
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-y-10 gap-y-5">
            <div className="">
                <SearchProperty placeholder="Property Name"/>
            </div>
            <div className="content-center text-end">
                <Pagination totalPages={totalPages} />
            </div>
            <div className="col-span-1 md:col-span-2">
                <Suspense key={totalPages} fallback={<Skeleton />}>
                    <ul
                        role="list"
                        className="grid grid-cols-1 md:grid-cols-4 gap-4"
                    >
                        {posts['result'].map((project:any, index:any) => (
                        <li
                            key={index}
                            className="text-center "
                        >
                            <PropertyCard csswidth="w-full" data={project} />
                        </li>
                        ))}
                    </ul>
                </Suspense>
            </div>
        </div>
    );
}