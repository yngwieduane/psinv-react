'use client'
import React, { useState } from "react";
import {useTranslations} from 'next-intl';
import Image from "next/image";
import { Flame } from "lucide-react";

const CardGroupImage = (props:any) => {

    return (
        <>
        {props.data.map((item:any, index:any) => {
            const thumbimg = item.icon;
            return(
            <div key={index} className="overflow-hidden rounded-lg bg-gray-50">
                <div className="px-4 py-5 sm:p-6 flex align-items-center">
                    {thumbimg !== null || !thumbimg
                        ? 
                        <Flame/>
                        : ""
                    }
                    <p className="text-sm ps-2">{item.name}</p>
                </div>
            </div>
            );
        })}
        </>
    );
};


export default CardGroupImage;