'use client'
import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";
import MapComponent from "@/app/[locale]/_components/MapComponent";
import SwiperMaterial from "@/app/[locale]/_components/SwiperMaterial";
import StripeContent from "./StripeContent";
import { useState } from "react";
import DrawerDetails from "./DrawerDetails";
import { ReadMore } from "@/app/[locale]/_components/ReadMore";
import { useFormatter } from "next-intl";
import PriceConvert from "@/app/[locale]/_components/tools/PriceConvert";
import NumberConvert from "@/app/[locale]/_components/tools/NumberConvert";

export default function UnitPage(props: any) {
    const [showDrawer, setShowDrawer] = useState(false);
    const [dwDataContent, setDwDataContent] = useState('details');
    const [dwDataTitle, setDwDataTitle] = useState('details');
    const drawerHandler = (content:string,valuesarray:any) => (e:any) => {
        console.log(showDrawer);
        console.log(content);
        setDwDataContent(valuesarray);
        setDwDataTitle(content);
        setShowDrawer(true);
    }

    const format = useFormatter();

    return (
        <>
            <div>
                <Breadcrumb/>
            </div>
            <div className="container mx-auto my-5 px-5">
                {props.data.map((post:any,index:any) => { 
                let images, price, details, map, video;
                {post.imageurl !== null
                    ? images = post.imageurl.split('|')
                    : images = '';
                }
                {post.sellprice !== null
                    ? price = post.sellprice
                    : price = post.rent;
                }
                {post.externalUrl_youtube !== null
                    ? video = post.externalUrl_youtube
                    : video = '';
                }
                map = post.pro_google_coordinates;
                const coordinates = post.pro_google_coordinates.split(",")?? "";
                return(
                <div key={index}>
                    {/* Swiper */}
                    {images !== null ? (
                        <div className="relative">
                            <SwiperMaterial slides={images.slice(0, -1)}/>
                            <div className="md:hidden absolute z-2 w-full">
                                <div className="grid grid-cols-2 -mt-8 bg-white rounded-lg mx-6 text-center divide-x divide-gray-300 shadow px-2 py-2">
                                    <p className="flex flex-col">
                                        <span className="text-sm">Price</span>
                                        <span className="text-lg"><PriceConvert price={price} minDecimal='0'/></span>
                                    </p>
                                    <p className="flex flex-col">
                                        <span className="text-sm">Built-up Area</span>
                                        <span className="text-lg"><NumberConvert number={post.built_upArea} minDecimal='0' label='Sqft'/></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : ("")}
                    {/* STRIPE CONTENT */}
                    <div className="mt-7 md:mt-0">
                        <StripeContent data={post}/>
                    </div>
                    {/* DETAILS */}
                    <div className="mt-15 px-5">
                        <h4 className="font-bold text-xl mb-5">Details</h4>
                        <div className="flex gap-4">
                            <div>
                                <button
                                    type="button"
                                    onClick={drawerHandler('details', props.data)}
                                    name="details"
                                    className="bg-gray-100 px-5 py-3 rounded-lg text-lg cursor-pointer"
                                >
                                    Details
                                </button>
                            </div>
                            {map !== '' ? (
                            <div>
                                <button
                                    type="button"
                                    onClick={drawerHandler('map',map)}
                                    name="map"
                                    className="bg-gray-100 px-5 py-3 rounded-lg text-lg cursor-pointer"
                                >
                                    Map
                                </button>
                            </div>) : ("")}
                            {images !== '' ? (
                            <div>
                                <button
                                    type="button"
                                    onClick={drawerHandler('gallery',images)}
                                    name="gallery"
                                    className="bg-gray-100 px-5 py-3 rounded-lg text-lg cursor-pointer"
                                >
                                    Gallery
                                </button>
                            </div>) : ("")}
                            {video !== '' ? (
                            <div>
                                <button
                                    type="button"
                                    onClick={drawerHandler('video',video)}
                                    name="video"
                                    className="bg-gray-100 px-5 py-3 rounded-lg text-lg cursor-pointer"
                                >
                                    Video
                                </button>
                            </div>) : ("")}
                        </div>
                    </div>
                    {/* Overview */}
                    {post.property_overview !== null ? (
                    <div className="mt-15 px-5">
                        <h2 className="font-bold text-xl mb-5">
                            Property Overview
                        </h2>
                        <ReadMore id="read-more-text" text={post.property_overview} classes="whitespace-break-spaces"/>
                    </div>) : ("")}
                    {/* Remarks */}
                    {post.remarks !== null ? (
                    <div className="mt-15 px-5">
                        <h2 className="font-bold text-xl mb-5">
                            Property Remarks
                        </h2>
                        <ReadMore id="read-more-text" text={post.remarks} classes="whitespace-break-spaces"/>
                    </div>) : ("")}
                    {/* MAP */}
                    {coordinates !== null ? (
                    <div className="">
                        <h2 className="font-medium text-center text-3xl my-10">
                            Location Map
                        </h2>
                        <MapComponent
                            latitude={coordinates['1']}
                            longitude={coordinates['0']}
                            fallbackImage={props.data["featuredImages"]}
                            height='500px'
                        />
                    </div>) : ("")}
                    <DrawerDetails open={showDrawer} onClose={setShowDrawer} drawerTitle={dwDataTitle} drawerContent={dwDataContent} />
                </div>
            )
            })}
            </div>
        </>
    );  
}