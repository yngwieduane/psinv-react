'use client'

import { useState, useEffect } from "react";

import { BlogItem } from "@/app/[locale]/_components/tools/Skeleteon";
import SearchProperty from "../../_components/SearchProperty";
import PropertyBox from "../../_components/PropertyBox";
import PropertyMapBox from "../../_components/PropertyMapBox";
import SearchPropertyAI, { TabType } from "../../_components/SearchPropertyAI";
import PropertyListView from "../../_components/PropertyListView";

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
      try {
        setLoading(true);

        const response = await fetch(
          `/api/external/allprojects/?page=${page}&propertyname=${propertyname}&city=${cityId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setTotalPages(Math.ceil(Number(result['totalCount']) / 24));
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, propertyname, isFeaturedProjectOnWeb, cityId]);

  return (
    <div className="flex grid md:grid-cols-2 grid-cols-1 ">
      <div className="col-span-2">
        <SearchPropertyAI
          placeholder="Property Name"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          totalPages={totalPages}
        />
      </div>
      <div className="order-2 md:order-3 col-span-1 md:col-span-2 mx-auto container">
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
    </div>
  );
}