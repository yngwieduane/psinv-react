import type { Metadata } from 'next'
import { siteBaseUrl } from '@/utils/i18n-config';
import PhotoGallery from '../_components/PhotoGallery';
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

    const metatitle = result['propertyName'] + " Photo Gallery - " + result['community'];
    const metadesc = "Explore the photo gallery of " + result['propertyName'] + " in " + result['community'] + ", " + result['city'] + ". View facilities, amenities, and community images.";

    return {
        title: metatitle,
        description: metadesc,
        openGraph: {
            title: metatitle,
            description: metadesc,
            url: `${siteBaseUrl}/${locale}/projects/${city}/${community}/${subcommunity}/${project}/photo-gallery`,
            images: result['featuredImages'] && result['featuredImages'][0] ? [{ url: result['featuredImages'][0]['imageURL'] }] : undefined,
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

    return (
        <div className="pb-10">
            <div className="pt-28 md:pt-36 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-12 py-4 border-b border-gray-100">
                    <Breadcrumb />
                </div>
            </div>
            <PhotoGallery data={posts['result'][0]} />
        </div>
    );
}
