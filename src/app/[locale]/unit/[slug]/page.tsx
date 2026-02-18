import { generateSeoData } from "../../_components/functions/generateSeoData";
import UnitPage from "./components/UnitPage";
import type { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import UnitPageAI from "./components/UnitPageAI";
import { getTranslations } from "next-intl/server";


type Props = {
    params: Promise<{ slug: string, locale: string }>
}
export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    // read route params
    const { slug, locale } = await params

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
    if (!posts || posts.length === 0 || !posts[0]) {
        return {
            title: 'Unit Not Found',
        }
    }

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

// If Arabic => translated SEO
if (locale === "ar") {
  const tSeo = await getTranslations({ locale, namespace: "UnitSEO" });

  const typeRaw = (posts[0].category || "").toLowerCase();
  const typeLabel =
    typeRaw === "apartment" ? "شقة" :
    typeRaw === "villa" ? "فيلا" :
    typeRaw === "townhouse" ? "تاون هاوس" :
    posts[0].category;

  const adTypeLabel = category === "sale" ? "للبيع" : "للإيجار";
  const beds = posts[0].bedrooms || "";

  return {
    title: tSeo("title", {
      beds,
      type: typeLabel,
      adType: adTypeLabel,
      community: posts[0].community,
      emirate: posts[0].city_name,
      refNo: posts[0].refNo
    }),
    description: tSeo("description", {
      beds,
      type: typeLabel,
      adType: adTypeLabel,
      community: posts[0].community,
      emirate: posts[0].city_name,
      refNo: posts[0].refNo
    }),
    keywords: tSeo("keywords", {
      beds,
      type: typeLabel,
      adType: adTypeLabel,
      community: posts[0].community,
      emirate: posts[0].city_name,
      refNo: posts[0].refNo
    })
  };
}

// Non-arabic => keep your existing SEO generator
return {
  title: seoData.seoTitle + " | " + locale,
  description: seoData.seoDescription + " | " + locale,
  keywords: seoData.seoKeyword + " | " + locale
};

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