'use client'
import React, { useState } from "react";
import {useTranslations} from 'next-intl';

const CardGroup = (props:any) => {

    return (
        <>
        {props.data.map((item:any, index:any) => {
            return(
            <div key={index} className="overflow-hidden rounded-lg bg-gray-50">
                <div className="px-4 py-5 sm:p-6">
                    <p>{item.name}</p>
                </div>
            </div>
            );
        })}
        </>
    );
};


export default CardGroup;