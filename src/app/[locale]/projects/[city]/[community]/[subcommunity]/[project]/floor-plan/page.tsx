import type { Metadata } from 'next'
import { siteBaseUrl } from '@/utils/i18n-config';
import UnitModelsAI from '../_components/UnitModelsAI';
import Breadcrumb from '@/app/[locale]/_components/Breadcrumb';

type Props = {
    params: Promise<{ locale: string; city: string; community: string; subcommunity: string; project: string }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const { locale, city, community, subcommunity, project } = await params;

    const classify = (project: string) => project.replace(/[a-z][a-z]*-?/g, ([f, ...rest]) => f.toUpperCase() + rest.join('').replace('-', ' '));
    const projectId = classify(project);

    const data = await fetch('https://psinv-react-gilt.vercel.app/api/external/projects?query=' + projectId)
    const posts = await data.json();
    const result = posts['result'][0];

    // Fallback if result or propertyName is missing
    const propertyName = result?.['propertyName'] || projectId;
    const communityName = result?.['community'] || community;

    const metatitle = propertyName + " Floor Plans - " + communityName;
    const metadesc = "View the floor plans for " + propertyName + " in " + communityName + ", " + result?.['city'] + ". Check layouts for apartments, villas, and townhouses.";

    return {
        title: metatitle + ' | ' + locale,
        description: metadesc + ' | ' + locale,
        openGraph: {
            title: metatitle + ' | ' + locale,
            description: metadesc + ' | ' + locale,
            url: `${siteBaseUrl}/${locale}/projects/${city}/${community}/${subcommunity}/${project}/floor-plan`,
            images: result && result['featuredImages'] && result['featuredImages'][0] ? [{ url: result['featuredImages'][0]['imageURL'] }] : undefined,
        }
    }
}

export default async function Page({
    params,
}: {
    params: Promise<{ locale: string; city: string; community: string; subcommunity: string; project: string }>
}) {
    const { project } = await params;

    const classify = (project: string) => project.replace(/[a-z][a-z]*-?/g, ([f, ...rest]) => f.toUpperCase() + rest.join('').replace('-', ' '));
    const projectId = classify(project);

    const data = await fetch('https://psinv-react-gilt.vercel.app/api/external/projects?query=' + projectId)
    const posts = await data.json()
    const result = posts['result'][0];

    const unitModels = result?.["unitModels"] ? result["unitModels"] : [];
    let fpGroup: any[] = [];

    if (unitModels && unitModels.length > 0) {
        fpGroup = Object.entries(
            unitModels.reduce((acc: any, value: any) => {
                if (value.unitType == 'Office') {
                    if (!acc[value.unitType]) {
                        acc[value.unitType] = [];
                    }
                    acc[value.unitType].push(value);
                } else if (value.unitType == 'Retail') {
                    if (!acc[value.unitType]) {
                        acc[value.unitType] = [];
                    }
                    acc[value.unitType].push(value);
                } else if (value.bedrooms === '0') {
                    if (!acc['Studio']) {
                        acc['Studio'] = [];
                    }
                    acc['Studio'].push(value);
                } else {
                    if (!acc[value.bedrooms]) {
                        acc[value.bedrooms] = [];
                    }
                    acc[value.bedrooms].push(value);
                }

                return acc;
            }, {})
        ).map(([title, options]) => ({ title, options }));
    }

    return (
        <div className="pb-10">
            <div className="pt-28 md:pt-36 border-b border-gray-100 bg-white dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="container mx-auto">
                    <Breadcrumb
                    />
                </div>
            </div>
            <div className="">
                {result && fpGroup.length > 0 && (
                    <UnitModelsAI data={fpGroup} propname={result.propertyName} />
                )}
            </div>
        </div>
    );
}
