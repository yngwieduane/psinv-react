'use client'
import React from "react";

const MainNavbarHeaderAI = (props: any) => {
  return (
    <>
      <nav className="">
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
          {props.data.map((tab: any, index: any) => (
            <button
              key={index}
              className={` px-6 py-3 rounded-xl border transition-all whitespace-nowrap cursor-pointer ${props.visibleTab === index
                ? "bg-primary text-white border-primary"
                : "text-gray-600 border-gray-200 hover:border-gray-300 dark:text-white dark:border-gray-700 dark:hover:border-gray-600"
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

export default MainNavbarHeaderAI;
