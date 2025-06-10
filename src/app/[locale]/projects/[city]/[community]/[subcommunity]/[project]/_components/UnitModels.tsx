'use client'
import React, { useState } from "react";
import {useTranslations} from 'next-intl';
import MainNavbarHeader from "@/app/[locale]/_components/MainNavbarHeader";
import MainNavbarContentEmpty from "@/app/[locale]/_components/MainNavbarContentEmpty";
import GalleryImages from "@/app/[locale]/_components/tools/GalleryImages";
import FancyboxWrapper from "@/app/[locale]/_components/tools/FancyboxWrapper";

const UnitModels = (props:any) => {
    const t = useTranslations('ProjectPage');

    const [visibleTab1, setVisibleTab1] = useState(0);

    return (
        <>
        <div className="container mx-auto">
                <h2 className="text-xl mb-5 text-[#111954]">
                    {t("unit_models")}
                </h2>
                <MainNavbarHeader
                    data={props.data}
                    visibleTab={visibleTab1}
                    setVisibleTab={setVisibleTab1}
                />
                <MainNavbarContentEmpty data={props.data} visibleTab={visibleTab1} >
                    {props.data[visibleTab1].options.length !== 0
                        ? <GalleryImages
                            options={{
                                Carousel: {
                                    infinite: false,
                                },
                            }}
                        >
                            <FancyboxWrapper>
                            <table className="min-w-full ">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm text-gray-900 sm:pl-6">
                                            Floor Plan
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm text-gray-900">
                                            Model Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm text-gray-900">
                                            Sizes
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm text-gray-900">
                                            Unit Type
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm text-gray-900">
                                            Bathrooms
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm text-gray-900">
                                            Laundry Room
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm text-gray-900">
                                            Maids Room
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm text-gray-900">
                                            Parking
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {props.data[visibleTab1].options.map((page:any, index:any) => (
                                        <tr key={index}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {page.floorPlanlImage !== ''
                                                    ? (
                                                    <a
                                                        type="button"
                                                        //onClick={drawerHandler('gallery',images)}
                                                        data-fancybox="floorplan"
                                                        href={page.floorPlanlImage}
                                                        className=" cursor-pointer block"
                                                    >
                                                    <div className="w-full h-20 background-image relative bg-cover bg-center"
                                                    style={{ backgroundImage: `url(${page.floorPlanlImage.replace('?width=0&height=0','?width=200&height=200')})` }} 
                                                    ></div>
                                                    </a>
                                                ) : (
                                                    <div className="w-full h-10 bg-gray-300"></div>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{page.modelName}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{page.area}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{(page.unitType && page.unitType !== 'UnitType') ? page.unitType : "-"}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{(page.bathrooms && page.bathrooms !== '0') ? page.bathrooms : "-"}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{(page.laundryRoomNo && page.laundryRoomNo !== '0') ? page.laundryRoomNo : "-"}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{(page.maidsRoomNo && page.maidsRoomNo !== '0') ? page.maidsRoomNo : "-"}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{(page.parkingNo && page.parkingNo !== '0') ? page.parkingNo : "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </FancyboxWrapper>
                        </GalleryImages>
                        : "null"
                    }
                </MainNavbarContentEmpty>
            </div>
        </>
    );
}

export default UnitModels;