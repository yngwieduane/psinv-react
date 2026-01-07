'use client';

import { useParams } from "next/navigation";
import DevelopersList from "../_components/DevelopersList";
import DevPropertyList from "../_components/DevPropertyList";
import Breadcrumb from "../../_components/Breadcrumb";

const developerMap: Record<string, string> = {
    "aldar-properties-pjsc": "Aldar Properties PJSC",
    "emaar": "Emaar Properties",
    "hydra-properties": "Hydra Properties",
    "imkan-properties-llc": "IMKAN PROPERTIES LLC",
    "meraas": "Meraas",
    "nshama": "NSHAMA ",
    "aabar-properties-llc": "Aabar Properties LLC",
    "bloom": "Bloom",
    "manazel-real-estate": "Manazel Real Estate",
    "dubai-properties---idama": "Dubai Properties - IDAMA",
};

export default function DeveloperPageClient() {
    const params = useParams();
    const developerSlug = params?.developer as string;
    const developerName = developerMap[developerSlug]; // Maps slug to actual developer name   

    return (
        <>

            <div className="mx-auto container pt-28 md:pt-40 pb-24">
                <div>
                    <Breadcrumb />
                </div>
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