
import PropertyPage from "./_components/PropertyPage";
import type { Metadata } from 'next'


import { siteBaseUrl } from '@/utils/i18n-config';

type Props = {
    params: Promise<{ locale: string; city: string; community: string; subcommunity: string; project: string }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    // read route params
    const { locale, city, community, subcommunity, project } = await params;

    const classify = (project: string) => project.replace(/[a-z][a-z]*-?/g, ([f, ...rest]) => f.toUpperCase() + rest.join('').replace('-', ' '));
    const projectId = classify(project);

    const data = await fetch('https://psinv-react-gilt.vercel.app/api/external/projects?query=' + projectId)
    //const data = await fetch('http://localhost:3000/api/external/projects?query='+projectId)
    const posts = await data.json();
    const result = posts['result'][0];

    // Construct Metadata
    const metatitle = "⚡ " + result['propertyName'] + " in " + result['community'] + " " + result['city'];
    const subCommunity = result["subCommunity"] ? result["subCommunity"] : "n-a";
    const metadesc = "⚡ Discover Properties in " + result['propertyName'] + " in " + subCommunity + " " + result['community'] + " " + result['city'] + "by " + result['masterDeveloper'] + " . Explore our available units in " + result['propertyName'] + " sale";

    const ogImages: { url: string; alt: string }[] = [];
    if (result['featuredImages'] && Array.isArray(result['featuredImages'])) {
        result['featuredImages'].forEach((img: any) => {
            if (img['imageURL']) {
                ogImages.push({
                    url: img['imageURL'],
                    alt: result['propertyName'],
                })
            }
        });
    }

    return {
        title: metatitle + ' | ' + locale,
        description: metadesc + ' | ' + locale,
        openGraph: {
            title: metatitle + ' | ' + locale,
            description: metadesc + ' | ' + locale,
            url: `${siteBaseUrl}/${locale}/projects/${city}/${community}/${subcommunity}/${project}`,
            images: ogImages.length > 0 ? ogImages : undefined,
        }
    }
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ locale: string; city: string; community: string; subcommunity: string; project: string }>
}) {

    const { locale, city, community, subcommunity, project } = await params;

    const classify = (project: string) => project.replace(/[a-z][a-z]*-?/g, ([f, ...rest]) => f.toUpperCase() + rest.join('').replace('-', ' '));
    const projectId = classify(project);

    const data = await fetch('https://psinv-react-gilt.vercel.app/api/external/projects?query=' + projectId)
    //const data = await fetch('http://localhost:3000/api/external/projects?query='+projectId)
    const posts = await data.json()

    return (
        <>
            <PropertyPage data={posts['result'][0]} />
        </>
    );
}