'use client'
import { Link } from "@/i18n/navigation";
import SwiperNormal from "../../_components/SwiperNormal";
import PriceConvert from "../../_components/tools/PriceConvert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import NumberConvert from "../../_components/tools/NumberConvert";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Modals from "../../_components/tools/Modals";
import { useState } from "react";

export default function UnitListBox(props:any){
    let images, price;
    {props.data.imageurl !== null
        ? images = props.data.imageurl.split('|').slice(0, -1)
        : images = '';
    }
    {props.data.sellprice !== null
        ? price = props.data.sellprice
        : price = props.data.rent;
    }

    const [setModal, setSetModal] = useState(false);
    const modalHandler = (event:any) => {
        console.log("clicked = " + setModal);
        setSetModal(true);
    };

    const modalUpdate = (event:any) => {
        console.log(event);
        setSetModal(event);
        };

    const phoneNumber = process.env.NEXT_PUBLIC_CALLNUMBER;
    const wappNumber = process.env.NEXT_PUBLIC_WAPPNUMBER;
    return (
        <>
        <article className="relative isolate flex flex-col gap-5 lg:flex-row rounded-lg w-full border border-gray-300 p-2 items-center">
            <div className="relative w-full h-52 sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                {images.length <= 1 ? (
                    <img
                    alt=""
                    src={images[0]}
                    className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                    />
                ) : (
                    <SwiperNormal slides={images.slice(0,5)} width="400" height="300"/>
                )}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                <div className="absolute left-5 md:hidden bottom-5 z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    <PriceConvert price={price} minDecimal='0' />
                </div>
                <div className="absolute right-5 md:hidden bottom-5 z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {props.data.category}
                </div>
            </div>
            <div className="w-full">
                <div className="flex items-center gap-x-4 text-xs">
                    <Link
                        href="#"
                        className="absolute left-7 top-7 md:left-0 md:top-0 md:relative z-10 rounded-full bg-gray-50 px-3 py-1.5 text-gray-600 hover:bg-gray-100"
                    >
                        <FontAwesomeIcon icon={faLocationDot} /> {props.data.community}
                    </Link>
                </div>
                <div className="group relative max-w-xl">
                    <h3 className="mt-0 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        <Link href={`/unit/${props.seoUrl}`} >
                            <span className="absolute inset-0 " />
                            <p className="">{props.data.propertyname}</p>
                        </Link>
                    </h3>
                    <p className="mt-2 md:mt-5 text-normal/6 text-gray-600 truncate">{props.data.marketingTitle}</p>
                    <p className="hidden md:flex mt-2 md:mt-5 text-sm/6 text-gray-500">{props.data.category} | <NumberConvert number={props.data.built_upArea} minDecimal='0' label='Sqft'/> | {props.data.bedrooms} Beds | {props.data.no_of_bathrooms} Baths | {props.data.parking} Parking</p>
                </div>
                <div className="mt-2 md:mt-6">
                    <div className="grid grid-cols-2 items-center content-center">
                        <div className="relative flex items-center gap-x-4">
                            <div className="text-sm/6 hidden md:grid">
                                <p className="text-gray-600">Price</p>
                                <p className="font-normal text-xl">
                                    <span className="absolute inset-0" />
                                    {/* {props.data.agent} */}
                                    <PriceConvert price={price} minDecimal='0' />
                                </p>
                                <p className="hidden text-gray-600">Agent ID: {props.data.agent_Pk}</p>
                            </div>
                            <div className="text-lg flex md:hidden">
                                {props.data.bedrooms} Beds | {props.data.no_of_bathrooms} Baths | <NumberConvert number={props.data.built_upArea} minDecimal='0' label='Sqft'/>
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Link href={`tel:${phoneNumber}`} className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-lg text-lg"><FontAwesomeIcon icon={faPhone} /></Link>
                            <button
                                onClick={modalHandler}
                                type="button"
                                className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-lg text-lg cursor-pointer"
                            ><FontAwesomeIcon icon={faEnvelope} />
                            </button>
                            <Link target='_blank' href={`https://wa.me/${wappNumber}?text=I%20am%20Interested%20.${props.seoUrl}`} className="col-span-2 bg-green-600 px-5 py-3 rounded-lg text-white text-lg"><FontAwesomeIcon icon={faWhatsapp} /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        <Modals modalState={setModal} onModalUpdate={modalUpdate} />
        </>
    );
}