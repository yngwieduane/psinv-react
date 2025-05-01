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
    return (
        <>
        <article className="relative isolate flex flex-col gap-2 md:gap-8 lg:flex-row bg-gray-50 rounded-2xl w-full">
            <div className="relative w-full h-64 sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                {images.length <= 1 ? (
                    <img
                    alt=""
                    src={images[0]}
                    className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                    />
                ) : (
                    <SwiperNormal slides={images} width="400" height="300"/>
                )}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                <div className="absolute left-5 md:hidden bottom-5 z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    <PriceConvert price={price} minDecimal='0' />
                </div>
                <div className="absolute right-5 md:hidden bottom-5 z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {props.data.category}
                </div>
            </div>
            <div className="px-5 py-3">
                <div className="flex items-center gap-x-4 text-xs">
                    <Link
                        href="#"
                        className="absolute top-5 md:top-0 md:relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
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
                    <p className="mt-2 md:mt-5 text-normal/6 text-gray-600 truncate ">{props.data.marketingTitle}</p>
                    <p className="hidden md:flex mt-2 md:mt-5 text-sm/6 text-gray-500"><PriceConvert price={price} minDecimal='0' /> | {props.data.category} | <NumberConvert number={props.data.built_upArea} minDecimal='0' label='Sqft'/> | {props.data.bedrooms} Beds | {props.data.no_of_bathrooms} Baths | {props.data.parking} Parking</p>
                </div>
                <div className="mt-2 md:mt-6">
                    <div className="relative flex items-center gap-x-4">
                        <div className="text-sm/6 hidden md:grid">
                            <p className="font-semibold text-gray-900">
                                <span className="absolute inset-0" />
                                {props.data.agent}
                            </p>
                            <p className="text-gray-600">Agent ID: {props.data.agent_Pk}</p>
                        </div>
                        <div className="text-lg flex md:hidden">
                            {props.data.bedrooms} Beds | {props.data.no_of_bathrooms} Baths | <NumberConvert number={props.data.built_upArea} minDecimal='0' label='Sqft'/>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 text-center md:flex items-center justify-end gap-3 mt-3 border-t border-gray-900/5 pt-6">
                    <Link href="#" className="bg-gray-100 px-5 py-3 rounded-lg text-lg"><FontAwesomeIcon icon={faPhone} /> Call</Link>
                    <button
                        onClick={modalHandler}
                        type="button"
                        className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-lg text-lg"
                    ><FontAwesomeIcon icon={faEnvelope} />
                    </button>
                    <Link href="#" className="col-span-2 bg-green-600 px-5 py-3 rounded-lg text-white text-lg"><FontAwesomeIcon icon={faWhatsapp} /> WhatsApp</Link>
                </div>
            </div>
        </article>
        <Modals modalState={setModal} onModalUpdate={modalUpdate} />
        </>
    );
}