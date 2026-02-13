'use client'
import React from "react";

const CitiesTabHeader = (props: any) => {

  return (
    <>
      <section id="communities" className="">
        <div className={`flex whitespace-nowrap  ngh nrfcoverflow-x-auto gap-6 mb-12 border-b border-gray-200 dark:border-gray-700 pb-4 ${props.centered ? 'justify-center' : ''}`}>
          {props.data.map((tab: any, index: any) => (
            <button
              key={index}
              className={`w-max max-w-max text-lg font-medium pb-4 -mb-4 border-b-2 transition-all duration-300 cursor-pointer ${props.visibleTab === index
                ? 'border-primary text-primary scale-105 dark:border-white dark:text-white'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 hover:border-gray-300 dark:hover:text-white'
                }`}
              onClick={() => props.setVisibleTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export default CitiesTabHeader