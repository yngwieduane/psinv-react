
'use client'
import { generateSeoData } from "@/app/[locale]/_components/functions/generateSeoData";
import UnitBox from "@/app/[locale]/units/_components/UnitBox";
import { useState, useEffect } from "react";
import { UnitListing } from "@/types/types";

const AvailableUnits = ({
    propid,
    category,
    display
  }: {
    propid: number;
    category: string;
    display: number;
  }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<UnitListing[]>([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        if (category.trim() !== "") {
          setLoading(true);
          fetch(`/api/external/units/project?propertyId=${propid}&category=${category}`)
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
            <h2 className="font-medium text-center text-3xl my-10">
                Available for {category}
            </h2>
            <ul
                role="list"
                className="mx-4 flex space-x-3 sm:mx-6 overflow-x-auto"
            >
                {results.slice(0,display).map((post, index) => {
                    const propertyData = {
                        bedrooms: post.bedrooms,
                        propertyType: post.category,
                        adType: category,
                        name: post.propertyname,
                        community: post.community,
                        emirate: post.city_name,
                        refNo: post.refNo,
                        seoStart: "",
                    };
                    const seoData = generateSeoData(propertyData);
                    
                    return (
                        <li
                        key={index}
                        className="inline-flex flex-col text-center w-96 "
                        >
                            <UnitBox data={post} seoUrl={seoData.seoUrl}/>
                        </li>
                    )
                })}
            </ul>
            </>
        )}
        </>
    );
};


export default AvailableUnits;