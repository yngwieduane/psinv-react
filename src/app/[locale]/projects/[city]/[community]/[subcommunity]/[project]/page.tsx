
import PropertyPage from "./_components/PropertyPage";
import type { Metadata } from 'next'


type Props = {
  params: Promise<{ city:string;community:string;subcommunity:string;project:string }>
} 

export async function generateMetadata(
    { params }: Props,
    ): Promise<Metadata> {
    // read route params
    const {city, community, subcommunity, project} = await params;

    const classify = (project: string) => project.replace(/[a-z][a-z]*-?/g, ([f, ...rest]) => f.toUpperCase() + rest.join('').replace('-', ' '));
    const projectId = classify(project);

    const data = await fetch('https://psi.properties/api/external/projects?query='+projectId)
    //const data = await fetch('http://localhost:3000/api/external/projects?query='+projectId)
    const posts = await data.json() ;
    const metatitle = "⚡ " + posts['result'][0]['propertyName'] + " in " + posts['result'][0]['community'] + " " + posts['result'][0]['city'];
    const subCommunity = posts['result'][0]["subCommunity"] ? posts['result'][0]["subCommunity"] : "n-a";
    const metadesc = "⚡ Discover Properties in "+posts['result'][0]['propertyName']+" in " + subCommunity + " " + posts['result'][0]['community'] + " " + posts['result'][0]['city'] + "by " + posts['result'][0]['masterDeveloper'] + " . Explore our available units in "+posts['result'][0]['propertyName']+" sale";
    return {
        title: metatitle,
        description: metadesc,
    }
}

export default async function ProjectPage({
    params,
}:{
    params: Promise<{city:string;community:string;subcommunity:string;project:string}>
}){
    
    const {city, community, subcommunity, project} = await params;

    const classify = (project: string) => project.replace(/[a-z][a-z]*-?/g, ([f, ...rest]) => f.toUpperCase() + rest.join('').replace('-', ' '));
    const projectId = classify(project);

    const data = await fetch('https://psi.properties/api/external/projects?query='+projectId)
    //const data = await fetch('http://localhost:3000/api/external/projects?query='+projectId)
    const posts = await data.json() 

    return (
        <>
            <PropertyPage data={posts['result'][0]} />
        </>
    );
}