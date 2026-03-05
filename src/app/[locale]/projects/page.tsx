import { getLookupId } from "@/utils/lookup";
import ProjectsPage from "./_components/ProjectsPage";
import type { Metadata } from 'next'

type Props = {
    params: Promise<{ city: string; community: string; subcommunity: string; project: string }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    // read route params
    const { city, community, subcommunity, project } = await params;

    const metatitle = "⚡  Abu Dhabi Real Estate  - Property Shop Investment";
    const metadesc = "⚡  Abu Dhabi Real Estate  - PSI - Check out our stunning real estate projects - Property Shop Investments - Real Estate Projects - Buy or Rent";
    return {
        title: metatitle,
        description: metadesc,
    }
}

export default async function Projects({
    params,
    searchParams
}: {
    params: Promise<{ city: string; community: string; subcommunity: string; project: string; }>;
    searchParams: Promise<{ page?: number; propertyname?: string; isFeaturedProjectOnWeb?: string; community?: string; city?: string; subcommunity?: string; propertyUnitTypes?: string; propertyPlan?: string; }>;
}) {

    const { city, community, subcommunity, project } = await params;
    const { page = 1, propertyname, isFeaturedProjectOnWeb, community: searchCommunity, city: searchCity, subcommunity: searchSubcommunity, propertyUnitTypes, propertyPlan } = await searchParams;
    const propertynamefinal = (await searchParams)?.propertyname || '';
    const isFeaturedProjectOnWebfinal = (await searchParams)?.isFeaturedProjectOnWeb || '';
    const currentPage = Number(page) || 1;
    console.log("propertyname=" + propertynamefinal);

    const cityId = city;
    return (
        <>
            <ProjectsPage
                page={currentPage}
                city={city || searchCity || ''}
                cityId={cityId}
                community={community || searchCommunity || ''}
                subcommunity={subcommunity || searchSubcommunity || ''}
                project={project}
                propertyname={propertynamefinal}
                isFeaturedProjectOnWeb={isFeaturedProjectOnWebfinal}
                propertyUnitTypes={propertyUnitTypes || ''}
                propertyPlan={propertyPlan || ''}
            />
        </>
    );
}