import type { Metadata } from 'next'
import { siteBaseUrl } from '@/utils/i18n-config';
import Faqs from '../_components/Faqs';
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

    const metatitle = propertyName + " FAQs - " + communityName;
    const metadesc = "Frequently Asked Questions about " + propertyName + " in " + communityName + ", " + result?.['city'] + ". Find info on location, developer, and property types.";

    return {
        title: metatitle,
        description: metadesc,
        openGraph: {
            title: metatitle,
            description: metadesc,
            url: `${siteBaseUrl}/${locale}/projects/${city}/${community}/${subcommunity}/${project}/faqs`,
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

    return (
        <div className="pb-10">
            <div className="pt-28 md:pt-24 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-12 py-4 border-b border-gray-100">
                    <Breadcrumb />
                </div>
            </div>
            <div className="container mx-auto px-4 md:px-12 py-8">
                {result && (
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <Faqs data={result} propname={result.propertyName} />
                    </div>
                )}
            </div>
        </div>
    );
}
