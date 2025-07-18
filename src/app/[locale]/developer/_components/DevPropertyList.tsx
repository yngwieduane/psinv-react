'use client'

import { useEffect, useState } from "react"
import PropBox from "./PropBox";

interface DevPropertyListProps {
    developer: string;
}

const DevPropertyList = ({developer} : DevPropertyListProps) => {

    const [projects, setProjects] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try{
                const res = await fetch('/api/external/developer');
                const json = await res.json();

                const filtered = developer 
                ?  json.result.filter(
                    (proj: any) => 
                        typeof proj.masterDeveloper === "string" &&
                        proj.masterDeveloper?.toLowerCase().trim().includes(developer.toLowerCase().trim())
                )
                : json.result;

                setProjects(filtered);
                console.log("filtered REsult:", filtered);
            } catch(error) {
                console.log("Failed to load developer projects:", error);
            }            
        };
        fetchProjects();
    },[developer]);

    if(!projects){
        return(
            developer !== "" ?
                <p className="text-center text-gray-500">Loading properties of {developer}...</p>
            :
                <p className="text-center text-gray-500">Loading properties...</p>
        )
         }
        
     if (projects.length === 0) {
        return <p className="text-center text-gray-400">No projects found for this developer.</p>;
    }

    return(
            <PropBox data={projects} />           
        
    )
}

export default DevPropertyList