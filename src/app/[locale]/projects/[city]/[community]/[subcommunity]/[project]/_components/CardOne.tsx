'use client'
import React from "react";

const CardOne = (props:any) => {

    return (
        <>
        <div className="overflow-hidden rounded-lg bg-gray-50">
            <div className="px-4 py-5 sm:p-6">
                <h4 className="text-sm text-[#111954]">{props.title}</h4>
                <p>{props.content}</p>
            </div>
        </div>
        </>
    );
};


export default CardOne;