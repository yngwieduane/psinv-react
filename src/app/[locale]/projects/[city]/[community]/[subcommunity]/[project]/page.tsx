
import PropertyPage from "./_components/PropertyPage";


export default async function ProjectPage({
    params,
}:{
    params: Promise<{city:string;community:string;subcommunity:string;project:string}>
}){
    
    const {city, community, subcommunity, project} = await params;

    const classify = (project: string) => project.replace(/[a-z][a-z]*-?/g, ([f, ...rest]) => f.toUpperCase() + rest.join('').replace('-', ' '));
    const projectId = classify(project);

    const data = await fetch('https://psinv-react-duane-borjas-projects.vercel.app/api/external/projects?query='+projectId)
    const posts = await data.json() 

    return (
        <>
            <PropertyPage data={posts['result'][0]} />
        </>
    );
}