import { getLookupId } from "@/utils/lookup";
import ProjectsPage from "./_components/ProjectsPage";
import type { Metadata } from 'next';
import { getTranslations } from "next-intl/server";

type Props = {
    params: Promise<{ city: string; district: string; community: string; project: string }>
}
export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {

    const t = await getTranslations("ProjectPage.metadata");

    return {
        title: t("title"),
        description: t("description"),
    };
}
export default async function Projects({
    params,
    searchParams
}: {
    params: Promise<{ city: string; district: string; community: string; project: string; }>;
    searchParams: Promise<{ page?: number; propertyname?: string; isFeaturedProjectOnWeb?: string; community?: string; district?: string; city?: string; propertyUnitTypes?: string; propertyPlan?: string; }>;
}) {

    const { city, district, community, project } = await params;
    const { page = 1, propertyname, isFeaturedProjectOnWeb, community: searchCommunity, district: searchDistrict, city: searchCity, propertyUnitTypes, propertyPlan } = await searchParams;
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
                district={district || searchDistrict || ''}
                community={community || searchCommunity || ''}
                project={project}
                propertyname={propertynamefinal}
                isFeaturedProjectOnWeb={isFeaturedProjectOnWebfinal}
                propertyUnitTypes={propertyUnitTypes || ''}
                propertyPlan={propertyPlan || ''}
            />
        </>
    );
}