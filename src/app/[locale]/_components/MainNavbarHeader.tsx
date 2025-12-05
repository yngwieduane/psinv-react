'use client'
import React from "react";

const MainNavbarHeader = (props:any) => {
  return (
    <>
      <nav className="">
        <div className="flex border-b border-gray-200 overflow-x-auto mb-0 scrollbar-hide">
          {props.data.map((tab:any, index:any) => (
            <button
              key={index}
              className={` text-[20px] font-light w-max text-center px-4 py-2 transition-all duration-200 cursor-pointer ${props.visibleTab === index
                    ? "text-violet-950 border-b-2 border-orange-600 active"
                    : "text-gray-500 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
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
