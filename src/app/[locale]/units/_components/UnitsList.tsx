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
    const [totalCount, setTotalCount] = useState(0);

    const ITEMS_PER_PAGE = 10;
    // Current page logic: prefer 'currentPage' param, default to 1
    const pageNum = Number(currentPage) || 1;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch from our internal Firestore-backed API with Pagination
                const url = `/api/units?propertyId=${propertyId}&category=${category}&beds=${beds}&propertyType=${propertyType}&minPrice=${minPrice}&maxPrice=${maxPrice}&minArea=${minArea}&maxArea=${maxArea}&communityId=${communityId}&unitid=${unitid}&page=${pageNum}&limit=${ITEMS_PER_PAGE}`;

                const res = await fetch(url);
                let data = { units: [], total: 0 };

                if (res.ok) {
                    data = await res.json();
                } else {
                    console.error("Units API failed", res.status);
                }

                // If response is the old array format (fallback), handle it
                const units = Array.isArray(data) ? data : (data.units || []);
                const total = Array.isArray(data) ? data.length : (data.total || 0);

                setResults(units);
                setTotalCount(total);

                if (props.onDataLoaded) {
                    let locationName = "UAE";
                    let listingType = "Sale";

                    // Determine Category
                    if (category) {
                        listingType = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
                    } else if (units.length > 0) {
                        const sample = units[0];
                        if (sample._sourceCategory) {
                            listingType = sample._sourceCategory;
                        } else {
                            listingType = sample.sellprice ? "Sale" : "Rent";
                        }
                    }

                    // Determine Location
                    // Priority: Property Name -> Community -> City -> Default
                    if (units.length > 0) {
                        const firstItem = units[0];
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
                        count: total, // Pass TOTAL count, not just current page length
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
    }, [unitid, category, propertyId, beds, baths, propertyType, maxPrice, minPrice, minArea, maxArea, pageNum]);

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

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
                            {results.map((post: any, index: any) => {
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
                                        className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 transition-colors dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
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
                                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-primary hover:text-white dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => handlePageChange(pageNum + 1)}
                                        disabled={pageNum >= totalPages}
                                        className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 transition-colors dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
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
