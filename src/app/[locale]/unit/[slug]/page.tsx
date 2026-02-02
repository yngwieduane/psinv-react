import { generateSeoData } from "../../_components/functions/generateSeoData";
import UnitPage from "./components/UnitPage";
import type { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import UnitPageAI from "./components/UnitPageAI";

type Props = {
    params: Promise<{ slug: string }>
}
export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    // read route params
    const { slug } = await params

    const slugString = Array.isArray(slug) ? slug[0] : slug || "";
    const lastString = slugString.split("-").pop() ?? "";

    const code = lastString.replace(/\D/g, "");
    let category = 'rent';

    if (slugString.split("-").includes('sale')) {
        category = 'sale';
    } else {
        category = 'rent';
    }
    // fetch data
    const posts = await fetch(`https://psinv-react-gilt.vercel.app/api/external/unit?unitid=${code}&category=${category}`).then((res) => res.json())

    // if (!posts[0]) {
    //     redirect('/en/units')
    // }

    const propertyData = {
        bedrooms: posts[0].bedrooms,
        propertyType: posts[0].category,
        adType: posts[0].category,
        name: posts[0].propertyname,
        community: posts[0].community,
        emirate: posts[0].city_name,
        refNo: posts[0].refNo,
        seoStart: "",
    };

    const seoData = generateSeoData(propertyData);

    return {
        title: seoData.seoTitle,
    }
}

export default async function Page({ params }: Props) {

    const { slug } = await params;

    // const classify = (slug: string) => slug.replace(/[a-z][a-z]*-?/g, ([f, ...rest]) => f.toUpperCase() + rest.join('').replace('-', ' '));
    // const projectId = classify(slug);
    //const lastString = slug === "string" ? slug.split("-").pop() : "";

    const slugString = Array.isArray(slug) ? slug[0] : slug || "";
    const lastString = slugString.split("-").pop() ?? "";

    // Extract only numeric part
    const code = lastString.replace(/\D/g, "");
    let category = 'rent';

    if (slugString.split("-").includes('sale')) {
        category = 'sale';
    } else {
        category = 'rent';
    }

    const data = await fetch(`https://psinv-react-gilt.vercel.app/api/external/unit?unitid=${code}&category=${category}`)
    const posts = await data.json();

    return (
        <>
            <UnitPageAI data={posts} />
        </>
    );
}