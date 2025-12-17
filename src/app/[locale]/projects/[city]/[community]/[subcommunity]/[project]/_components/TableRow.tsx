'use client'
import React from "react";

const TableRow = (props:any) => {

    return (
        <>
        <div className="flex border-b border-gray-100 last:border-0 p-5 hover:bg-gray-50 transition-colors">
            <div className="w-1/2 text-sm font-bold text-gray-500 uppercase tracking-wide">{props.title}</div>
            <div className="w-1/2 text-base text-gray-900 font-medium text-right rtl:text-left">{props.content}</div>
        </div>
        </>
    );
};


export default TableRow;