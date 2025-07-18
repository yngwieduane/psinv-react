'use client';

import { useParams } from "next/navigation";
import DevelopersList from "../_components/DevelopersList";
import DevPropertyList from "../_components/DevPropertyList";

const developerMap : Record<string, string> = {
        "aldar-properties-pjsc" :"Aldar Properties PJSC",
        "emaar": "Emaar",
        "hydra-properties": "Hydra Properties",
        "imkan-properties-llc": "IMKAN PROPERTIES LLC",
        "meeras": "Meeras",
        "nshama": "NSHAMA ",
        "aabar-properties-llc": "Aabar Properties LLC",
        "bloom": "Bloom",
        "manazel-real-estate": "Manazel Real Estate",
        "dubai-properties---idama": "Dubai Properties - IDAMA",
};

export default function DeveloperPageClient() {
    const params = useParams();

    const developerSlug = params?.developer as string;
    const developerName = developerMap[developerSlug];   
  
    return(
        <>            

            <div className="mx-auto container px-6 lg:px-8 mt-5">
                <h1 className="text-2xl text-center truncate">Developers</h1>
                <div className="w-full flex my-5 justify-content-center">
                    <DevelopersList slug={developerSlug} />
                </div>                
                <div className="mb-5 mt-10">
                    <DevPropertyList developer={developerName} />
                </div>
            </div>
        </>
    )
}