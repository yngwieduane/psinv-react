
import { generateSeoData } from "@/app/[locale]/_components/functions/generateSeoData";
import UnitBox from "@/app/[locale]/units/_components/UnitBox";
import { UnitListing } from "@/types/types";
import { useState, useEffect } from "react";

const SimilarUnits = ({
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
            <ul
                role="list"
                className="mx-4 flex space-x-3 sm:mx-6 overflow-x-auto"
            >
                {results.slice(0,display).map((post, index) => {
                    return (
                        <li
                        key={index}
                        className="inline-flex flex-col text-center w-96 "
                        >
                            <UnitBox {...post}/>
                        </li>
                    )
                })}
            </ul>
            </>
        )}
        </>
    );
};


export default SimilarUnits;