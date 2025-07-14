'use client'

import { useEffect, useState } from "react"
import PropertyBox from "../../projects/_components/PropertyBox";

interface DevPropertyListProps {
    masterDeveloper: string;
}

export default function DevPropertyList({masterDeveloper} : DevPropertyListProps) {

    const[data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {

            try{
                const response = await fetch(`/api/external/allprojects?masterDeveloper=${masterDeveloper}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch(error) {
                console.log(error, "Error fetching properties");
            }
            
        };
        fetchData();
    },[masterDeveloper]);

    if(!data || !data.result){
        return <p className="text-center text-gray-500">Loading properties...</p>;
    }

    return(
        <>
        <div>
            <PropertyBox data={data.result} />

            {/* {data.result.map((project: any, index:any) => (
                <div key={index}>
                    <h3>{project.propertyName}</h3>
                </div>
            ))} */}
        </div>
        </>
    )
}