
import { generateSeoData } from "@/app/[locale]/_components/functions/generateSeoData";
import UnitBox from "@/app/[locale]/units/_components/UnitBox";
import { calculateDistance, Coordinate } from "@/utils/utils";
import { useState, useEffect } from "react";

type Units = {
    landmarkId: string;
    landmarkEnglishName: string;
    landmarkArabicName: string;
    categoryId: string;
    categoryName: string;
    longitude: number;
    latitude: number;
    addressLine1English: string;
    addressLine1Arabic: string;
    website: string;
    youtubeLink: string;
    usefulLink: string;
    virtualTourLink: string;
    facebookLink: string;
    instagramLink: string;
    cityName: string;
    communityName: string;
    subCommunityName: string;
    isFeatured: string;
    communityImages: string;
    landmarkImageLogo: string;
    landmarkLogo: string;
};
const Nearbys = ({
    latitude,
    longitude,
    distance
  }: {
    latitude: number;
    longitude: number;
    distance: number;
  }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Units[]>([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        if (latitude) {
          setLoading(true);
          fetch(`/api/external/nearbys?latitude=${latitude}&longitude=${longitude}&distance=${distance}`)
            .then(res => res.json())
            .then(data => {
              setResults(data);
              setLoading(false);
            })
            .catch(() => setLoading(false));
        } else {
          setResults([]);
          setLoading(false);
        }
      }, 300);
  
      return () => clearTimeout(timeout);
    }, [query]);

    return (
        <>
        {loading && <p className="text-sm text-gray-500 mt-1">Loading...</p>}
        {results.length > 0 && (
            <>
            <h2 className="text-xl mb-5 text-[#111954]">
                Nearbys
            </h2>
            <ul role="list" className="grid grid-cols-2 md:grid-cols-4 space-y-3 space-x-3 overflow-auto max-h-92 py-2">
                {results.slice(0, 20).map((post, index) => {
                    const pointA: Coordinate = { lat: latitude, lng: longitude }; 
                    const pointB: Coordinate = { lat: post.latitude, lng: post.longitude }; 

                    const distance = calculateDistance(pointA, pointB);

                    return (
                        <li
                        key={index}
                        className="overflow-hidden bg-white px-4 py-4 shadow-sm sm:rounded-md sm:px-6"
                        >
                            <p className="text-xs">{post.categoryName}</p>
                            <p className="text-sm truncate normal-case">{post.landmarkEnglishName}, {post.addressLine1English}</p>
                            <p>{distance}km</p>
                        </li>
                    )
                })}
            </ul>
            </>
        )}
        </>
    );
};


export default Nearbys;