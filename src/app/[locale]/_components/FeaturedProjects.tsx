'use client'
import { useState } from "react";
import Link from "next/link";
import PropertyCardSlider from "./tools/PropertyCardSlider";

import { useQuery } from "@tanstack/react-query"
import { fetchProjects } from "@/utils/https"

const FeaturedProjects = (props: any) => {
    let content;
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects
    });
    const [visibleTab, setVisibleTab] = useState(0);

    if (isPending) {
        content = 'Pending';
    }

    if (isError) {
        content = 'Error' + error + data;
    }

    if (data) {
        //setFeaturedProjects(data);
        content = <PropertyCardSlider data={data.result} />;
    }

  return (
    <div className="relative">
        {content}
    </div>
  );
};

export default FeaturedProjects;