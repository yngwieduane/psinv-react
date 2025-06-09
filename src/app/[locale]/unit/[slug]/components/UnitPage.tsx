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
import InquiryForm from "@/app/[locale]/_components/InquiryForm";
import AmenitiesFeatures from "./AmenitiesFeatures";
import FancyboxWrapper from "@/app/[locale]/_components/tools/FancyboxWrapper";
import SimilarUnitsGrid from "./SimilarUnitsGrid";
import Sticky from 'react-sticky-el';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

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
            <div className="">
                {props.data.map((post:any,index:any) => { 
                let images, price, category, map, video, amenities, facilities, coordinates;
                {post.imageurl !== null
                    ? images = post.imageurl.split('|')
                    : images = '';
                }
                {post.sellprice !== null
                    ? price = post.sellprice
                    : price = post.rent;
                }
                {post.sellprice !== null
                    ? category = "Sale"
                    : category = "Rent";
                }
                {post.externalUrl_youtube !== null
                    ? video = post.externalUrl_youtube
                    : video = '';
                }
                {post.unit_Amenities !== null
                    ? amenities = post.unit_Amenities.split('|')
                    : amenities = '';
                }
                {post.facilities !== null
                    ? facilities = post.facilities.split('|')
                    : facilities = '';
                }
                map = post.pro_google_coordinates;
                {post.pro_google_coordinates !== null
                    ? coordinates = post.pro_google_coordinates.split(",")
                    : coordinates = '';
                }
                return(
                <div key={index} >
                    <div className="container mx-auto my-5 px-5">
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
                    </div>
                    {/* STRIPE CONTENT */}
                    <div className="mt-7 md:mt-0">
                        <StripeContent data={post}/>
                    </div>
                    <div className="container mx-auto my-5 px-5">
                        {/* START DETAILS UPPER*/}
                        <div className="mainuppper grid grid-cols-1 md:grid-cols-4">
                            <div className="col-span-3">
                                {/* DETAILS */}
                                <div className="mt-15 px-5">
                                    <h4 className="text-xl mb-5 text-[#111954]">Details</h4>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={drawerHandler('details', props.data)}
                                            name="details"
                                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-lg border border-transparent py-4 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                        >
                                            Details
                                        </button>
                                        {map !== null ? (
                                        <button
                                            type="button"
                                            onClick={drawerHandler('map',map)}
                                            name="map"
                                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-lg border border-transparent py-4 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                        >
                                            Map
                                        </button>
                                        ) : ("")}
                                        {images !== '' ? (
                                        <FancyboxWrapper>
                                            <a
                                                type="button"
                                                //onClick={drawerHandler('gallery',images)}
                                                data-fancybox="gallery"
                                                href={images[0].split('?')[0]}
                                                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-lg border border-transparent py-4 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                            >
                                                Gallery
                                            </a>
                                            {images.slice(1, -1)?.map((slide:any, index:any) => {
                                                let imagecontent = slide.split('?');
                                                return (
                                                    <a key={index} data-fancybox="gallery" href={imagecontent[0]}></a>
                                                )
                                            })}
                                        </FancyboxWrapper>
                                        ) : ("")}
                                        {video !== '' ? (
                                        <button
                                            type="button"
                                            onClick={drawerHandler('video',video)}
                                            name="video"
                                            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-lg border border-transparent py-4 bg-gray-100 hover:bg-gray-200 cursor-pointer"
                                        >
                                            Video
                                        </button>
                                        ) : ("")}
                                    </div>
                                </div>
                                {/* unit_Amenities */}
                                {amenities !== null ? (
                                <div className="mt-15 px-5">
                                    <h2 className="text-xl mb-5 text-[#111954]">
                                        Amenities
                                    </h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                                        <AmenitiesFeatures content={amenities.slice(0, -1)} limit={12}/>
                                    </div>
                                </div>) : ("")}
                                {/* facilities */}
                                {facilities !== 'null' ? (
                                <div className="mt-15 px-5">
                                    <h2 className="text-xl mb-5 text-[#111954]">
                                        Facilities
                                    </h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                                        <AmenitiesFeatures content={facilities.slice(0, -1)} limit={12}/>
                                    </div>
                                </div>) : ("")}
                                {/* Overview */}
                                {post.property_overview !== null ? (
                                <div className="mt-15 px-5">
                                    <h2 className="text-xl mb-5 text-[#111954]">
                                        Property Overview
                                    </h2>
                                    <ReadMore amountOfWords={100} id="read-more-text" text={post.property_overview} classes="whitespace-break-spaces"/>
                                </div>) : ("")}
                                {/* Remarks */}
                                {post.remarks !== null ? (
                                <div className="mt-15 px-5">
                                    <h2 className="text-xl mb-5 text-[#111954]">
                                        Property Remarks
                                    </h2>
                                    <ReadMore amountOfWords={100} id="read-more-text" text={post.remarks} classes="whitespace-break-spaces"/>
                                </div>) : ("")}
                            </div>
                            <Sticky stickyClassName="mt-28" boundaryElement=".mainuppper"  hideOnBoundaryHit={false}>
                                <div className="hidden md:flex">
                                    <InquiryForm hideFeedbackButton={true}/>
                                </div>
                                <div className="p-5">
                                    <button
                                        type="button"
                                        onClick={drawerHandler('requestview', props.data)}
                                        name="details"
                                        className="w-full rounded-lg border border-[#111954] p-4 cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faCalendarCheck}/> Request a Meeting
                                    </button>
                                </div>
                            </Sticky>
                        </div>
                        {/* START DETAILS LOWER*/}
                        <div className="grid grid-cols-1">
                            {/* MAP */}
                            {map !== null ? (
                            <div className="">
                                <h2 className="font-medium text-center text-3xl my-10 text-[#111954]">
                                    Location Map
                                </h2>
                                <MapComponent
                                    latitude={coordinates['1']}
                                    longitude={coordinates['0']}
                                    fallbackImage={props.data["featuredImages"]}
                                    height='500px'
                                />
                            </div>) : ("")}
                            {/* Similar Properties */}
                            <div className="mt-15 px-5">
                                <h2 className="text-xl mb-5 text-[#111954]">
                                    Similar Units
                                </h2>
                                <SimilarUnitsGrid
                                    propid={post.property_Pk}
                                    category={category}
                                    display={4}
                                />
                            </div>
                        </div>
                        <DrawerDetails open={showDrawer} onClose={setShowDrawer} drawerTitle={dwDataTitle} drawerContent={dwDataContent} />
                    </div>
                </div>
            )
            })}
            </div>
        </>
    );  
}