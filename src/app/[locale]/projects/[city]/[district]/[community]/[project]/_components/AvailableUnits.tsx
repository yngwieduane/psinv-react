
'use client'
import { generateSeoData } from "@/app/[locale]/_components/functions/generateSeoData";
import UnitBox from "@/app/[locale]/units/_components/UnitBox";
import { useState, useEffect } from "react";
import { UnitListing } from "@/types/types";
import UnitBoxAI from "@/app/[locale]/units/_components/UnitBoxAI";

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
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50 dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700/50">
          <h2 className="font-medium text-center text-3xl my-10 dark:text-white">
            Available for {category}
          </h2>
          <ul
            role="list"
            className="flex space-x-3 overflow-x-auto"
          >
            {results.slice(0, display).map((post, index) => {
              const propertyData = {
                bedrooms: post.bedrooms,
                propertyType: post.category,
                adType: category,
                name: post.propertyname,
                community: post.community,
                emirate: post.city_name,
                refNo: post.refNo,
                code: post.code,
                seoStart: "",
              };
              const seoData = generateSeoData(propertyData);

              return (
                <li
                  key={index}
                  className="inline-flex flex-col w-96 "
                >
                  <UnitBoxAI data={post} seoUrl={seoData.seoUrl} />
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </>
  );
};


export default AvailableUnits;