'use client'
import { Link } from "@/i18n/navigation";
import SwiperNormal from "../../_components/SwiperNormal";
import PriceConvert from "../../_components/tools/PriceConvert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberConvert from "../../_components/tools/NumberConvert";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import Modals from "../../_components/tools/Modals";
import { Bath, BedDouble, Mail, MapPin, Phone, Scaling } from "lucide-react";

export default function UnitBox(props:any){
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
        <article className="relative isolate flex flex-col gap-2 bg-gray-50 rounded-lg w-full hover:bg-gray-200">
            <div className="relative w-full h-56 sm:aspect-2/1">
                {images.length <= 1 ? (
                    <img
                    alt="No Image"
                    title="No Image"
                    src={images[0]}
                    className="absolute inset-0 size-full rounded-lg bg-gray-50 object-cover"
                    />
                ) : (
                    <SwiperNormal slides={images.slice(0,3)} width="400" height="300"/>
                )}
                <div className="absolute inset-0 rounded-lg ring-1 ring-gray-900/10 ring-inset" />
                <div className="absolute left-5 bottom-5 z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    <PriceConvert price={price} minDecimal='0' />
                </div>
                <div className="absolute right-5 bottom-5 z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {props.data.category}
                </div>
            </div>
            <div className="px-5 py-3">
                <div className="flex items-center gap-x-4 text-xs">
                    <Link
                        title={props.data.community}
                        href="#"
                        className="absolute top-5 z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 flex items-center"
                    >
                        <MapPin size={20}/> {props.data.community}
                    </Link>
                </div>
                <div className="group relative max-w-xl">
                    <h3 className="mt-0 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                        <Link title={props.data.propertyname} href={`/unit/${props.seoUrl}`} >
                            <span className="absolute inset-0 " />
                            <p className="">{props.data.propertyname}</p>
                        </Link>
                    </h3>
                    <p className="mt-2 text-normal/6 text-gray-600 truncate ">{props.data.marketingTitle}</p>
                </div>
                <div className="mt-2">
                    <div className="relative flex items-center gap-x-4">
                        <div className="text-lg flex gap-x-2">
                            <div className="bg-gray-100 p-1 rounded-lg text-sm flex text-xl items-center gap-2">{props.data.bedrooms} <BedDouble size={20}/></div>
                            {props.data.no_of_bathrooms !== null ? (
                                <div className="bg-gray-100 p-1 rounded-lg text-sm flex text-xl items-center gap-2">{props.data.no_of_bathrooms} <Bath size={20}/></div>
                            ) : ("")}
                            <div className="bg-gray-100 p-1 rounded-lg text-sm flex text-xl items-center gap-2"><Scaling size={20}/> <NumberConvert number={props.data.built_upArea} minDecimal='0' label='Sqft'/></div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 text-center items-center justify-end gap-3 mt-3 border-t border-gray-900/9 pt-6">
                    <Link title="Phone" href={`tel:${phoneNumber}`} className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-lg text-lg items-center flex justify-center"><Phone size={20} /></Link>
                    <button
                        onClick={modalHandler}
                        type="button"
                        className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-lg text-lg flex justify-center cursor-pointer"
                    ><Mail size={20} />
                    </button>
                    <Link title="Whatsapp" target='_blank' href={`https://wa.me/${wappNumber}?text=I%20am%20Interested%20.${props.seoUrl}`} className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg text-white text-lg flex justify-center"><FontAwesomeIcon icon={faWhatsapp} /></Link>
                </div>
            </div>
        </article>
        <Modals modalState={setModal} onModalUpdate={modalUpdate} />
        </>
    );
}