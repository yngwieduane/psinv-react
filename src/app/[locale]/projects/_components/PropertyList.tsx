'use client'

import { useState, useEffect } from "react";
import PropertyCard from "../../_components/tools/PropertyCard";

import SearchProperty from "./SearchProperty";
import PropertyBox from "./PropertyBox";
import PropertyMapBox from "./PropertyMapBox";
import PropertyListView from "./PropertyListView";
import { BlogItem, Skeleton } from "../../_components/tools/Skeleteon";
import SearchPropertyAI, { TabType } from "./SearchPropertyAI";

interface PropertyListProps {
    page: number;
    city: string;
    district: string;
    community: string;
    project: string;
    propertyname: string;
    isFeaturedProjectOnWeb: string;
    cityId: string;
    propertyUnitTypes?: string;
    propertyPlan?: string;
}

export default function PropertyList({
    page,
    city,
    district,
    community,
    project,
    propertyname,
    isFeaturedProjectOnWeb,
    cityId,
    propertyUnitTypes,
    propertyPlan
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
                // Determine if special filters are active
                // const hasSpecialFilters = community || subcommunity || propertyUnitTypes || propertyPlan || (city && !cityId);
                const hasSpecialFilters =
                    !!(
                        district ||
                        community ||
                        propertyUnitTypes ||
                        propertyPlan ||
                        (city && !cityId)
                    );

                let finalResult = { result: [], totalCount: 0 };

                if (!hasSpecialFilters) {

                    const queryParams = new URLSearchParams();
                    queryParams.set("page", String(page));

                    if (propertyname) queryParams.set("propertyname", propertyname);
                    if (cityId) queryParams.set("city", cityId);

                    const response = await fetch(
                        `/api/external/allprojects?page=${page}&propertyname=${propertyname}&city=${cityId}`
                    );

                    if (response.ok) {
                        const result = await response.json();
                        if (result && result['result']) {
                            setData(result);
                            setTotalPages(Math.ceil(Number(result['totalCount']) / 24));
                            setLoading(false);
                            return; // Success, exit
                        }
                    }
                }

                // 2. Fallback or Special Filters (Using our new server API to avoid full client DB dump)
                const queryParams = new URLSearchParams();
                queryParams.set('page', String(page));
                if (city) queryParams.set('city', city);
                if (district) queryParams.set('district', district);
                if (community) queryParams.set('community', community);
                if (propertyname) queryParams.set('propertyname', propertyname);
                if (propertyUnitTypes) queryParams.set('propertyUnitTypes', propertyUnitTypes);
                if (propertyPlan) queryParams.set('propertyPlan', propertyPlan);

                const response = await fetch(`/api/projects/search?${queryParams.toString()}`);
                if (response.ok) {
                    const result = await response.json();
                    setData({
                        result: result.result,
                        totalCount: result.totalCount
                    });
                    setTotalPages(Math.max(1, Math.ceil(result.totalCount / 24)));
                } else {
                    console.error("Error from search API:", await response.text());
                }

            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, propertyname, isFeaturedProjectOnWeb, cityId, city, district, community, propertyUnitTypes, propertyPlan]);

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