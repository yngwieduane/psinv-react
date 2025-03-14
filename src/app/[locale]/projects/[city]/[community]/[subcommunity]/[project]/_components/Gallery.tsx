'use client'
import React, { useState } from "react";
import {useTranslations} from 'next-intl';
import MainNavbarHeader from "@/app/[locale]/_components/MainNavbarHeader";
import MainNavbarContentEmpty from "@/app/[locale]/_components/MainNavbarContentEmpty";
import GalleryImages from "@/app/[locale]/_components/tools/GalleryImages";

const Gallery = (props:any) => {
    const t = useTranslations('ProjectPage');

    const [visibleTab, setVisibleTab] = useState(0);

    return (
        <>
        <div className="container mx-auto my-8 px-5">
                <h2 className="font-medium text-center text-3xl my-10">
                    {t("photo_gallery")}
                </h2>
                <MainNavbarHeader
                    data={props.data}
                    visibleTab={visibleTab}
                    setVisibleTab={setVisibleTab}
                />
                <MainNavbarContentEmpty data={props.data} visibleTab={visibleTab} >
                    {props.data[visibleTab].image.length !== 0
                        ? <GalleryImages
                            options={{
                                Carousel: {
                                    infinite: false,
                                },
                            }}
                        >
                            <div className="grid grid-cols-4 gap-4">
                                {props.data[visibleTab].image.map((page:any, index:any) => (
                                    <div key={index}>
                                        <a data-fancybox="gallery" href={page.imageURL}>
                                            <img className="w-full" src={page.imageURL} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </GalleryImages>
                        : "null"
                    }
                </MainNavbarContentEmpty>
            </div>
        </>
    );
}

export default Gallery;