'use client'
import { useEffect, useState } from "react"
import PropBox from "./PropBox";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface DevPropertyListProps {
    developer: string;
}

const DevPropertyList = ({ developer }: DevPropertyListProps) => {

    const [projects, setProjects] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!developer) {
                setProjects([]);
                return;
            }
            try {
                const q = query(
                    collection(db, 'properties'),
                    where('masterDeveloper', '==', developer)
                );
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => doc.data());

                console.log(`Fetched ${data.length} properties for developer: ${developer}`);
                setProjects(data);
            } catch (error) {
                console.log("Failed to load developer projects from Firestore:", error);
                setProjects([]);
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