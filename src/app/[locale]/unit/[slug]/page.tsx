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
    let posts = [];
    try {
        const data = await fetch(`https://www.psinv.net/api/external/unit?unitid=${code}&category=${category}`);
        posts = await data.json();
    } catch (e) {
        console.error("Failed to fetch unit for metadata", e);
    }

    if (!posts || posts.length === 0 || !posts[0]) {
        try {
            const data = await fetch(`https://www.psinv.net/api/external/unitAssets?unitid=${code}&category=${category}`);
            posts = await data.json();
        } catch (e) {
            console.error("Failed to fetch unitAssets for metadata", e);
        }
    }

    // Handle case where no data is found even after fallback
    if (!posts || posts.length === 0 || !posts[0]) {
        return {
            title: 'Unit Not Found',
        }
    }

    // if (!posts[0]) {
    //     redirect('/en/units')
    // }

    const propertyData = {
        bedrooms: posts[0].bedrooms,
        propertyType: posts[0].category,
        adType: category,
        name: posts[0].propertyname,
        community: posts[0].community,
        emirate: posts[0].city_name,
        refNo: posts[0].refNo,
        seoStart: "",
    };

    const seoData = generateSeoData(propertyData);

    return {
        title: seoData.seoTitle,
        description: seoData.seoDescription,
        keywords: seoData.seoKeyword,
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

    let posts = [];
    let source = '';
    try {
        const data = await fetch(`https://www.psinv.net/api/external/unit?unitid=${code}&category=${category}`);
        posts = await data.json();
        if (posts && posts.length > 0 && posts[0]) {
            source = 'auh';
        }
    } catch (e) {
        console.error("Failed to fetch unit", e);
    }

    if (!posts || posts.length === 0 || !posts[0]) {
        try {
            const data = await fetch(`https://www.psinv.net/api/external/unitAssets?unitid=${code}&category=${category}`);
            posts = await data.json();
            if (posts && posts.length > 0 && posts[0]) {
                source = 'assets';
            }
        } catch (e) {
            console.error("Failed to fetch unitAssets", e);
        }
    }

    if (posts && posts.length > 0) {
        posts = posts.map((post: any) => ({ ...post, source }));
    }

    if (!posts || posts.length === 0 || !posts[0]) {
        return <></>;
    }

    return (
        <>
            <UnitPageAI data={posts} />
        </>
    );
}