import { getLookupId } from "@/utils/lookup";
import ProjectsPage from "../_components/ProjectsPage";
import { unslugify } from "@/utils/utils";


export default async function Projects({
    params,
    searchParams
}:{
    params: Promise<{city:string;community:string;subcommunity:string;project:string;}>;
    searchParams: Promise<{page?:number;propertyname?:string;isFeaturedProjectOnWeb?:string;}>;
}){
    
    const {city, community, subcommunity, project} = await params;
    const {page = 1,propertyname,isFeaturedProjectOnWeb} = await searchParams;
    const propertynamefinal = (await searchParams)?.propertyname || '';
    const isFeaturedProjectOnWebfinal = (await searchParams)?.isFeaturedProjectOnWeb || '';
    const currentPage = Number(page) || 1;
    console.log("propertyname="+propertyname);

    const cityname = unslugify(city);
    const cityId = await getLookupId(cityname, 'city');
    return (
        <>
            <ProjectsPage page={currentPage} city={city} cityId={cityId} community={community} subcommunity={subcommunity} project={project} propertyname={propertynamefinal} isFeaturedProjectOnWeb={isFeaturedProjectOnWebfinal}/>
        </>
    );
}