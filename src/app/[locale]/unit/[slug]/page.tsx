import { generateSeoData } from "../../_components/functions/generateSeoData";
import UnitPage from "./components/UnitPage";
 
type Props = {
  params: Promise<{ slug: string }>
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

    const data = await fetch('https://psinv-react.vercel.app/api/external/units?unitid='+code)
    const posts = await data.json();
    
    return (
        <>
        <UnitPage data={posts}/>
        </>
    );
}