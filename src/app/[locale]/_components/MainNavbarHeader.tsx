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
              className={` px-5 py-2 text-lg cursor-pointer ${props.visibleTab === index
                    ? "text-violet-950 font-bold border-b-4 border-orange-600 active"
                    : "relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-orange-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
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
