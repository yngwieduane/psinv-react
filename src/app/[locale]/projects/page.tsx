import ProjectsPage from "./_components/ProjectsPage";

export default async function Projects({
    params,
}:{
    params: Promise<{city:string;community:string;subcommunity:string;project:string}>
}){
    
    const {city, community, subcommunity, project} = await params;
    const pagenumber = 1;

    const data = await fetch('https://psi.properties/api/external/projects?page='+pagenumber)
    const posts = await data.json() 

    return (
        <>
            <ProjectsPage data={posts['result']} />
        </>
    );
}