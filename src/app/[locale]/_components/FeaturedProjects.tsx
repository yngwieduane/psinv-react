'use client'
import { useState, useEffect } from "react";
import PropertyCardSlider from "./tools/PropertyCardSlider";
import { BlogItem } from "./tools/Skeleteon";

export default function FeaturedProjects(){
    const [data, setData] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await fetch(
                    `/api/external/`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="relative">
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <BlogItem />
                    <BlogItem />
                    <BlogItem />
                    <BlogItem />
                </div>
            ) : (
                <PropertyCardSlider data={data['result']} />
            )}
            {!data ? (
                <p>No properties found.</p>
            ) : (
                <></>
            )}
        </div>
    );
};