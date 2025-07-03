'use client'
import React from "react";

const MainNavbarHeader = (props:any) => {
  return (
    <>
      <nav className="flex space-x-4 ">
        <div className="text-xl mx-2 w-full">
          {props.data.map((tab:any, index:any) => (
            <button
              key={index}
              className={` px-5 py-2 text-lg ${props.visibleTab === index
                    ? "text-violet-950 font-bold border-b-4 border-orange-600 active"
                    : "text-gray-500 hover:text-gray-700"
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

export default MainNavbarHeader;
