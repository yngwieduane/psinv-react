'use client'

import { useEffect, useState } from "react"
import PropBox from "./PropBox";

interface DevPropertyListProps {
    developer: string;
}

const DevPropertyList = ({ developer }: DevPropertyListProps) => {

    const [projects, setProjects] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`/api/external/developer?developer=${encodeURIComponent(developer)}`);
                const json = await res.json();

                const filtered = developer
                    ? json.result.filter(
                        (proj: any) =>
                            typeof proj.masterDeveloper === "string" &&
                            proj.masterDeveloper?.toLowerCase().trim().includes(developer.toLowerCase().trim())
                    )
                    : json.result;

                setProjects(filtered);
                console.log("filtered REsult:", filtered);
            } catch (error) {
                console.log("Failed to load developer projects:", error);
            }
        };
        fetchProjects();
    }, [developer]);

    if (!projects) {
        return (
            <>
           
            <div className="mb-6 text-center">
                <h2 className="text-2xl text-center truncate mt-10">
                    {developer} Properties & Projects
                </h2>

                <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
                    Explore the latest real estate projects by {developer}, featuring premium residences,
                    modern amenities, and prime locations across the UAE. Discover apartments, villas,
                    and off-plan developments designed for luxury living and smart investment.
                </p>
                </div>
               
                {

                    developer !== "" ?
                        <p className="text-center text-gray-500">Loading properties of {developer}...</p>
                        :
                        <p className="text-center text-gray-500">Loading properties...</p>
            
                }
                </>
        )
    }

    if (projects.length === 0) {
        return <p className="text-center text-gray-400">No projects found for this developer.</p>;
    }

    return (
        <PropBox data={projects} />

    )
}

export default DevPropertyList