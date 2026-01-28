'use client'

import { useState, useEffect } from "react";
import PropertyCard from "../../_components/tools/PropertyCard";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";

import SearchProperty from "./SearchProperty";
import PropertyBox from "./PropertyBox";
import PropertyMapBox from "./PropertyMapBox";
import PropertyListView from "./PropertyListView";
import { BlogItem, Skeleton } from "../../_components/tools/Skeleteon";
import SearchPropertyAI, { TabType } from "./SearchPropertyAI";

interface PropertyListProps {
    page: number;
    city: string;
    community: string;
    subcommunity: string;
    project: string;
    propertyname: string;
    isFeaturedProjectOnWeb: string;
    cityId: string;
}

export default function PropertyList({
    page,
    city,
    community,
    subcommunity,
    project,
    propertyname,
    isFeaturedProjectOnWeb,
    cityId
}: PropertyListProps) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [activeTab, setActiveTab] = useState<TabType>('gallery');
    let loadingData;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Try API Fetch
                const response = await fetch(
                    `/api/external/allprojects?page=${page}&propertyname=${propertyname}&city=${cityId}`
                );

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const result = await response.json();

                // Validate API result structure
                if (result && result['result']) {
                    setData(result);
                    setTotalPages(Math.ceil(Number(result['totalCount']) / 24));
                    return; // Success, exit
                } else {
                    throw new Error("Invalid API response");
                }
                //throw new Error("Invalid API response");

            } catch (error) {
                console.warn("API Fetch failed, switching to Firestore fallback:", error);

                // 2. Firestore Fallback
                try {
                    const q = query(collection(db, "properties"));
                    const querySnapshot = await getDocs(q);

                    let allItems = querySnapshot.docs.map(doc => doc.data());
                    // Client-side Filtering
                    // if (cityId) {
                    //     allItems = allItems.filter(item => String(item.CityID) === String(cityId));
                    // }
                    // if (propertyname) {
                    //     const search = propertyname.toLowerCase();
                    //     allItems = allItems.filter(item =>
                    //         (item.PropertyName?.toLowerCase() || "").includes(search) ||
                    //         (item.Title?.toLowerCase() || "").includes(search)
                    //     );
                    // }
                    // Add other filters as needed

                    // Pagination logic
                    const pageSize = 24;
                    const totalCount = allItems.length;
                    const totalPgs = Math.ceil(totalCount / pageSize);

                    const startIndex = (page - 1) * pageSize;
                    const endIndex = startIndex + pageSize;
                    const paginatedItems = allItems.slice(startIndex, endIndex);

                    console.log("allItems=" + allItems);
                    setData({
                        result: paginatedItems,
                        totalCount: totalCount
                    });
                    setTotalPages(Math.max(1, totalPgs));
                } catch (fsError) {
                    console.error("Firestore Fallback failed:", fsError);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, propertyname, isFeaturedProjectOnWeb, cityId]);

    return (
        <div className="flex grid md:grid-cols-2 grid-cols-1">
            <div className="col-span-2">
                <SearchPropertyAI
                    placeholder="Property Name"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    totalPages={totalPages}
                />
            </div>
            <div className="col-span-1 md:col-span-2 mx-auto container ">
                {activeTab === 'map' ? (
                    <PropertyMapBox data={data['result']} />
                ) : isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                        <BlogItem />
                    </div>
                ) : activeTab === 'list' ? (
                    <PropertyListView data={data['result']} />
                ) : (
                    <PropertyBox data={data['result']} />
                )}
                {!isLoading && activeTab !== 'map' && !data ? (
                    <p>No properties found.</p>
                ) : (
                    <></>
                )}
            </div>
            <div className="col-span-2 mt-10">
                <SearchPropertyAI
                    placeholder="Property Name"
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
}