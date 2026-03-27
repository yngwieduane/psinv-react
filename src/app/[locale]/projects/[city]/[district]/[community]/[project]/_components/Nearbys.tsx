'use client'
import { NearbysType } from "@/types/types";
import { calculateDistance, Coordinate } from "@/utils/utils";
import { useState, useEffect } from "react";

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
    const [results, setResults] = useState<NearbysType[]>([]);
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
                    const pointB: Coordinate = { lat: parseFloat(post.latitude), lng: parseFloat(post.longitude) }; 

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