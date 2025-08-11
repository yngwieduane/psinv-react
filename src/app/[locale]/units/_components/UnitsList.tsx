'use client'
import { UnitListing } from "@/types/types";
import { generateSeoData } from "../../_components/functions/generateSeoData";
import UnitListBox from "./UnitListBox";
import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "../../_components/tools/Skeleteon";

export default function UnitsList(props:any) {

    // const data = await fetch('http://localhost:3000/api/external/units/project?unitid='+unitid+'&propertyId='+propertyId+'&beds='+beds+'&category='+category)
    // const posts = await data.json() ;

    const router = useRouter();
    const searchParams = useSearchParams();
    const unitid = searchParams.get('unitid') || '';
    const category = searchParams.get('category') || '';
    const propertyId = searchParams.get('propertyId') || '';
    const beds = searchParams.get('beds') || '';
    const baths = searchParams.get('baths') || '';
    const propertyType = searchParams.get('propertyType') || '';
    const currentPage = searchParams.get('currentPage') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<UnitListing[]>([]);
    const [results1, setResults1] = useState<UnitListing[]>([]);
    const [allData, setAllData] = useState<UnitListing[]>([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/external/unitsAssets?propertyId=${propertyId}&category=${category}&beds=${beds}`);
            const result = await res.json();
            setResults(result);

            // const [res1, res2] = await Promise.all([
            //     fetch(`/api/external/units?propertyId=${propertyId}&category=${category}&beds=${beds}`),
            //     fetch(`/api/external/unitsAssets?propertyId=${propertyId}&category=${category}&beds=${beds}`),
            // ]);
            // const [json1, json2] = await Promise.all([
            //     res1.json(),
            //     res2.json()
            // ]);
            // setResults(json1);
            // setResults1(json2);

            // const res = await fetch(`/api/external/units?propertyId=${propertyId}&category=${category}&beds=${beds}`);
            // const result = await res.json();
            // const res1 = await fetch(`/api/external/unitsAssets?propertyId=${propertyId}&category=${category}&beds=${beds}`);
            // const result1 = await res1.json();
            // setAllData([...result, ...result1]);

        } catch (error) {
            console.error("API fetch failed", error);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [unitid,category,propertyId,currentPage,beds,baths,propertyType,maxPrice,minPrice]);

    return (
        <>
            {loading ? (
                <Skeleton />
            ) : (
                <>
                {results.length > 0 && (
                    <>
                        {results.slice(0, 11).map((post:any,index:any) => { 
                            let maincategory;
                            {post.sellprice !== null
                                ? maincategory = "Sale"
                                : maincategory = "Rent";
                            }
                            const propertyData = {
                                bedrooms: post.bedrooms,
                                propertyType: post.category,
                                adType: maincategory,
                                name: post.propertyname,
                                community: post.community,
                                emirate: post.city_name,
                                refNo: post.refNo,
                                code: post.code,
                                seoStart: "",
                            };
                            const seoData = generateSeoData(propertyData);
                            return <UnitListBox key={index} data={post} seoUrl={seoData.seoUrl}/>
                        })}
                    </>
                )}
                </>
            )}
            
        </>
    );
}
