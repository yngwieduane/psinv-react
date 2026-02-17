'use client'
import React from "react";

const LocationTabHeadContent = (props: any) => {
  return (
    <>
      <nav className="">
        <div className="flex  gap-2 overflow-x-auto mb-0 scrollbar-hide">
          {props.data.map((tab: any, index: any) => (
            <button
              key={index}
              className={`px-4 py-1 text-xs uppercase rounded w-max transition-all duration-200 cursor-pointer ${props.visibleTab === index
                ? "bg-gray-100 text-gray-500 active dark:bg-gray-700 dark:text-white"
                : "border border-gray-300 text-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                }`}
              onClick={() => props.setVisibleTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default LocationTabHeadContent;
