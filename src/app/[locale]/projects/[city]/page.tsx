import { getLookupId } from "@/utils/lookup";
import { unslugify } from "@/utils/utils";
import type { Metadata } from 'next'
import ProjectsPage from "./_components/ProjectsPage";

type Props = {
  params: Promise<{ city:string;community:string;subcommunity:string;project:string }>
} 

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city, community, project } = await params;
  
    if (!city) {
      return {
        title: "Real Estate Projects in UAE | Property Shop Investment",
        description:
          "Explore new real estate projects in UAE including apartments, villas, and off-plan developments with Property Shop Investment today.",
      };
    }
  
    const cityName = unslugify(city);
  
    if (city && !community) {
      return {
        title: `${cityName} Real Estate Projects | New Developments by PSI`,
        description: `Discover new real estate projects in ${cityName} including apartments, villas, and off-plan properties with Property Shop Investment.`,
      };
    }
  
    if (project) {
      const projectName = unslugify(project);
      return {
        title: `${projectName} in ${cityName} | Prices, Units & Offers | PSI`,
        description: `View available units in ${projectName}, ${cityName}. Get latest prices, floor plans, payment plans, and exclusive real estate offers.`,
      };
    }
  
    return {
      title: `${cityName} Property Projects | PSI Real Estate`,
      description: `Browse property projects in ${cityName} with Property Shop Investment.`,
    };
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

    const cityname = unslugify(city);
    const cityId = await getLookupId(cityname, 'city');
    return (
        <>
            <ProjectsPage page={currentPage} city={city} cityId={cityId} community={community} subcommunity={subcommunity} project={project} propertyname={propertynamefinal} isFeaturedProjectOnWeb={isFeaturedProjectOnWebfinal}/>
        </>
    );
}