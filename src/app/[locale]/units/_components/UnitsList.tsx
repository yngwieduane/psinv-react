'use client'
import { UnitListing } from "@/types/types";
import { generateSeoData } from "../../_components/functions/generateSeoData";
import UnitListBox from "./UnitListBox";
import { useState, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "../../_components/tools/Skeleteon";
import UnitListBoxAI from "./UnitListBoxAI";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function UnitsList(props: any) {

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
    const minArea = searchParams.get('minArea') || '';
    const maxArea = searchParams.get('maxArea') || '';

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<UnitListing[]>([]);
    const [results1, setResults1] = useState<UnitListing[]>([]);
    const [allData, setAllData] = useState<UnitListing[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/external/unitsAssets?propertyId=${propertyId}&category=${category}&beds=${beds}&propertyType=${propertyType}&minPrice=${minPrice}&maxPrice=${maxPrice}&minArea=${minArea}&maxArea=${maxArea}`);
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

                // const p1 = fetch(`/api/external/units?propertyId=${propertyId}&category=${category}&beds=${beds}&propertyType=${propertyType}&minPrice=${minPrice}&maxPrice=${maxPrice}&minArea=${minArea}&maxArea=${maxArea}`)
                //     .then(res => res.ok ? res.json() : [])
                //     .catch(err => {
                //         console.error("Units API failed", err);
                //         return [];
                //     });

                // const p2 = fetch(`/api/external/unitsAssets?propertyId=${propertyId}&category=${category}&beds=${beds}&propertyType=${propertyType}&minPrice=${minPrice}&maxPrice=${maxPrice}&minArea=${minArea}&maxArea=${maxArea}`)
                //     .then(res => res.ok ? res.json() : [])
                //     .catch(err => {
                //         console.error("UnitsAssets API failed", err);
                //         return [];
                //     });

                // const [data1, data2] = await Promise.all([p1, p2]);
                // setResults([...data1, ...data2]);

            } catch (error) {
                console.error("API fetch failed", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [unitid, category, propertyId, beds, baths, propertyType, maxPrice, minPrice, minArea, maxArea]);

    const ITEMS_PER_PAGE = 10;
    const pageNum = Number(searchParams.get('currentPage')) || 1;
    const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);

    const startIdx = (pageNum - 1) * ITEMS_PER_PAGE;
    const currentResults = results.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('currentPage', String(newPage));
        router.push(`?${params.toString()}`, { scroll: true });
    };

    return (
        <>
            {loading ? (
                <Skeleton />
            ) : (
                <>
                    {results.length > 0 && (
                        <>
                            {currentResults.map((post: any, index: any) => {
                                let maincategory;
                                {
                                    post.sellprice !== null
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
                                return <UnitListBoxAI key={index} data={post} seoUrl={seoData.seoUrl} seoTitle={seoData.seoTitle} adType={maincategory} />
                            })}

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-8 pb-8">
                                    <button
                                        onClick={() => handlePageChange(pageNum - 1)}
                                        disabled={pageNum <= 1}
                                        className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 transition-colors"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>

                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            // Logic to center the current page in the window of 5
                                            let start = Math.max(1, pageNum - 2);
                                            if (start + 4 > totalPages) {
                                                start = Math.max(1, totalPages - 4);
                                            }
                                            return start + i;
                                        }).filter(page => page > 0 && page <= totalPages).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${pageNum === page
                                                    ? 'bg-primary text-gray-900 font-bold shadow-sm'
                                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(pageNum + 1)}
                                        disabled={pageNum >= totalPages}
                                        className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 transition-colors"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}

        </>
    );
}
