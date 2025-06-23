import { getLookupId } from "@/utils/lookup";
import { unslugify } from "@/utils/utils";
import type { Metadata } from 'next'
import ProjectsPage from "./_components/ProjectsPage";

type Props = {
  params: Promise<{ city:string;community:string;subcommunity:string;project:string }>
} 

export async function generateMetadata(
    { params }: Props,
    ): Promise<Metadata> {
    const {city, community, subcommunity, project} = await params;

    const metatitle = "⚡  "+ unslugify(subcommunity)+" "+ unslugify(community)+ " "+unslugify(city)+" Real Estate  - Property Shop Investment" ;
    const metadesc = "⚡  "+ unslugify(subcommunity)+" "+ unslugify(community)+ " "+unslugify(city)+" Real Estate  - PSI - Check out our stunning real estate projects - Property Shop Investments - Real Estate Projects - Buy or Rent";
    return {
        title: metatitle,
        description: metadesc,
    }
}


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
    const communityname = unslugify(community);
    const communityId = await getLookupId(communityname, 'community');
    const subcommunityname = unslugify(subcommunity);
    const subcommunityId = await getLookupId(subcommunityname, 'subcommunity');
    return (
        <>
            <ProjectsPage page={currentPage} city={city} cityId={cityId} communityId={communityId} subcommunityId={subcommunityId} community={community} subcommunity={subcommunity} project={project} propertyname={propertynamefinal} isFeaturedProjectOnWeb={isFeaturedProjectOnWebfinal}/>
        </>
    );
}