'use client'
import React, { useState } from "react";
import {useTranslations} from 'next-intl';
import MainNavbarHeader from "@/app/[locale]/_components/MainNavbarHeader";
import MainNavbarContentEmpty from "@/app/[locale]/_components/MainNavbarContentEmpty";
import GalleryImages from "@/app/[locale]/_components/tools/GalleryImages";
import FancyboxWrapper from "@/app/[locale]/_components/tools/FancyboxWrapper";
import Image from "next/image";

const UnitModels = (props:any) => {
    const t = useTranslations('ProjectPage');

    const [visibleTab1, setVisibleTab1] = useState(0);
    //props.data[visibleTab1].options

    const unitType =[...new Set(props.data[visibleTab1].options.map((item: any) => item.unitType))]; 
    const bathrooms = [...new Set(props.data[visibleTab1].options.map((item: any) => item.bathrooms))]; 
    const laundryRoomNo = [...new Set(props.data[visibleTab1].options.map((item: any) => item.laundryRoomNo))]; 
    const maidsRoomNo = [...new Set(props.data[visibleTab1].options.map((item: any) => item.maidsRoomNo))]; 
    const parkingNo = [...new Set(props.data[visibleTab1].options.map((item: any) => item.parkingNo))]; 

    //const unitType1 = props.data[visibleTab1].options.map((item: any) => item.unitType); 

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
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm text-[#111954] sm:pl-6">
                                            Floor Plan
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm text-[#111954]">
                                            Model Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm text-[#111954]">
                                            Sizes
                                        </th>
                                        <th scope="col" className={`px-3 py-3.5 text-left text-sm text-[#111954] ${bathrooms.length <= 1 && bathrooms[0] == '0' ? "hidden" : ""}`}>
                                            Bathrooms
                                        </th>
                                        <th scope="col" className={`px-3 py-3.5 text-left text-sm text-[#111954] ${laundryRoomNo.length <= 1 && laundryRoomNo[0] == '0' ? "hidden" : ""}`}>
                                            Laundry Room
                                        </th>
                                        <th scope="col" className={`px-3 py-3.5 text-left text-sm text-[#111954] ${maidsRoomNo.length <= 1 && maidsRoomNo[0] == '0' ? "hidden" : ""}`}>
                                            Maids Room
                                        </th>
                                        <th scope="col" className={`px-3 py-3.5 text-left text-sm text-[#111954] ${parkingNo.length <= 1 && parkingNo[0] == '0' ? "hidden" : ""}`}>
                                            Parking
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {props.data[visibleTab1].options.map((page:any, index:any) => {
                                        return (
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
                                                        <div className="relative">
                                                            <Image
                                                            layout="fill"
                                                            className="object-center object-cover pointer-events-none"
                                                            src={page.floorPlanlImage.replace('?width=0&height=0','?width=200&height=200')}
                                                            alt={page.modelName}
                                                            />
                                                            <div className="relative z-1 w-full h-20"/>
                                                        </div>
                                                        </a>
                                                    ) : (
                                                        <div className="w-full h-20 bg-gray-300"></div>
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{page.modelName}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{page.area}</td>
                                                <td className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${bathrooms.length <= 1 && bathrooms[0] == '0' ? "hidden" : ""}`}>{(page.bathrooms && page.bathrooms !== '0') ? page.bathrooms : "-"}</td>
                                                <td className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${laundryRoomNo.length <= 1 && laundryRoomNo[0] == '0' ? "hidden" : ""}`}>{(page.laundryRoomNo && page.laundryRoomNo !== '0') ? page.laundryRoomNo : "-"}</td>
                                                <td className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${maidsRoomNo.length <= 1 && maidsRoomNo[0] == '0' ? "hidden" : ""}`}>{(page.maidsRoomNo && page.maidsRoomNo !== '0') ? page.maidsRoomNo : "-"}</td>
                                                <td className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${parkingNo.length <= 1 && parkingNo[0] == '0' ? "hidden" : ""}`}>{(page.parkingNo && page.parkingNo !== '0') ? page.parkingNo : "-"}</td>
                                            </tr>
                                        );
                                    })}
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