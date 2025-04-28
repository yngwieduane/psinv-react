'use client'

import React from "react";
import Map from "./Map";

const LocationsTabContent = ({data, visibleTab, height}: any) => {
  return (
    <div className="container mx-auto px-5">
        {data[visibleTab] && (
            <div className={`w-full ${height}`}>
                <Map 
                cityName={data[visibleTab].title} />
            </div>
            
        )}
    </div>
  );
};

export default LocationsTabContent;
