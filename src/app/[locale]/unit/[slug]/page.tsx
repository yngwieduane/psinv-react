import { generateSeoData } from "../../_components/functions/generateSeoData";
import UnitPage from "./components/UnitPage";
import type { Metadata, ResolvingMetadata } from 'next'
 
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
    // fetch data
    //const product = await fetch(`http://localhost:3000/api/external/units?unitid=${code}`).then((res) => res.json())


    const data = await fetch('http://localhost:3000/api/external/units?unitid='+code)
    const posts = await data.json();

    // optionally access and extend (rather than replace) parent metadata
    //const previousImages = (await parent).openGraph?.images || []

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

export default async function Page({ params }: Props){
    
    const {slug} = await params;

    // const classify = (slug: string) => slug.replace(/[a-z][a-z]*-?/g, ([f, ...rest]) => f.toUpperCase() + rest.join('').replace('-', ' '));
    // const projectId = classify(slug);
    //const lastString = slug === "string" ? slug.split("-").pop() : "";

    const slugString = Array.isArray(slug) ? slug[0] : slug || "";
    const lastString = slugString.split("-").pop() ?? "";
  
    // Extract only numeric part
    const code = lastString.replace(/\D/g, ""); 

    const data = await fetch('http://localhost:3000/api/external/units?unitid='+code)
    const posts = await data.json();
    
    return (
        <>
        <UnitPage data={posts}/>
        </>
    );
}