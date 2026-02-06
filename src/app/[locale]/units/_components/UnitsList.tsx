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

    const router = useRouter();
    const searchParams = useSearchParams();
    const unitid = searchParams.get('unitid') || '';
    const category = searchParams.get('category') || '';
    const propertyId = searchParams.get('propertyId') || '';
    const communityId = searchParams.get('communityId') || '';
    const beds = searchParams.get('beds') || '';
    const baths = searchParams.get('baths') || '';
    const propertyType = searchParams.get('propertyType') || '';
    const currentPage = searchParams.get('currentPage') || '';
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const minArea = searchParams.get('minArea') || '';
    const maxArea = searchParams.get('maxArea') || '';

    const [results, setResults] = useState<UnitListing[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch from our internal Firestore-backed API
                const url = `/api/units?propertyId=${propertyId}&category=${category}&beds=${beds}&propertyType=${propertyType}&minPrice=${minPrice}&maxPrice=${maxPrice}&minArea=${minArea}&maxArea=${maxArea}&communityId=${communityId}&unitid=${unitid}`;

                const res = await fetch(url);
                let data = [];
                if (res.ok) {
                    data = await res.json();
                } else {
                    console.error("Units API failed", res.status);
                }

                setResults(data);

                if (props.onDataLoaded) {
                    let locationName = "UAE";
                    let listingType = "Sale";

                    // Determine Category
                    if (category) {
                        listingType = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
                    } else if (data.length > 0) {
                        // Infer from first item if not in params
                        // Default to Rent if check explicitly fails, or Sale?
                        const sample = data[0];
                        // If it has a sell price that is non-zero/null, it's likely Sale.
                        // But wait, the API filter probably enforced it if category param was passed.
                        if (sample._sourceCategory) {
                            listingType = sample._sourceCategory;
                        } else {
                            listingType = sample.sellprice ? "Sale" : "Rent";
                        }
                    }

                    // Determine Location
                    // Priority: Property Name -> Community -> City -> Default
                    if (data.length > 0) {
                        const firstItem = data[0];
                        if (propertyId && (firstItem.propertyname || firstItem.project)) {
                            locationName = firstItem.propertyname || firstItem.project;
                        } else if (communityId && firstItem.community) {
                            locationName = firstItem.community;
                        } else if (firstItem.city_name) {
                            locationName = firstItem.city_name;
                            if (locationName === 'Abu Dhabi Gate City') locationName = 'Abu Dhabi';
                        }
                    }

                    props.onDataLoaded({
                        count: data.length,
                        location: locationName,
                        category: listingType
                    });
                }

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
                                // If source category is available, use it
                                if (post._sourceCategory) maincategory = post._sourceCategory;

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
                                        className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 transition-colors"
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
                                                    ? 'bg-primary text-white font-bold shadow-sm'
                                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-primary hover:text-white'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(pageNum + 1)}
                                        disabled={pageNum >= totalPages}
                                        className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 transition-colors"
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
