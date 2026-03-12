import Breadcrumb from "../../_components/Breadcrumb";
import PropertyList from "./PropertyList";
import ProjectSearch from "./ProjectSearch";
import { getTranslations } from "next-intl/server";


export default async function ProjectsPage({
    page,
    city,
    community,
    subcommunity,
    project,
    propertyname,
    isFeaturedProjectOnWeb,
    cityId,
    propertyUnitTypes,
    propertyPlan
}: {
    page: number;
    city: string;
    community: string;
    subcommunity: string;
    project: string;
    propertyname: string;
    isFeaturedProjectOnWeb: string;
    cityId: string;
    propertyUnitTypes?: string;
    propertyPlan?: string;
}) {

    const t = await getTranslations("ProjectsPage");

    return (
        <div className="bg-white dark:bg-neutral-900 min-h-screen pb-0 mx-5 md:mx-0">
            <div className="pt-51 md:pt-45 lg:pt-36 border-b border-gray-100 bg-white dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="container mx-auto">
                    <Breadcrumb
                    />
                </div>
            </div>
            <div className="mt-5">
                <div className="grid grid-cols-1 gap-4">
                    <div className="">
                        <h1 className="mx-auto container text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight truncate mb-6 md:mb-10">
                            {t('mainTitle')} {t('UAE')}
                        </h1>
                        <div className="pt-5">
                            <ProjectSearch />
                            <PropertyList
                                page={page}
                                city={city}
                                cityId={cityId}
                                community={community}
                                subcommunity={subcommunity}
                                project={project}
                                propertyname={propertyname}
                                isFeaturedProjectOnWeb={isFeaturedProjectOnWeb}
                                propertyUnitTypes={propertyUnitTypes}
                                propertyPlan={propertyPlan}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}