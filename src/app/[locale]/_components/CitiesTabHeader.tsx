'use client'
import { useLocale } from "next-intl";
import React from "react";

const CitiesTabHeader = (props:any) => {
  const locale = useLocale();
  const isRtl = locale.toLowerCase().startsWith("ar");
  
  const L = (en: string, ar?: string) => (isRtl && ar ? ar : en);

  return (
    <>
      <section id="communities" className="">
            <div className="flex flex-wrap gap-6 mb-12 border-b border-gray-200 pb-4">
            {props.data.map((tab:any, index:any) => (
                <button
                key={index}
                className={`text-lg font-medium pb-4 -mb-4 border-b-2 transition-all duration-300 cursor-pointer ${
                props.visibleTab === index 
                  ? 'border-primary text-primary scale-105' 
                  : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
              }`}
                onClick={() => props.setVisibleTab(index)}
                >
                {L(tab.title, tab.title_ar)}
                </button>
            ))}
            </div>
    </section>
    </>
  );
};

export default CitiesTabHeader