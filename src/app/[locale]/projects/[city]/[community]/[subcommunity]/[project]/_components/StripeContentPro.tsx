'use client';
import { useEffect, useRef, useState } from 'react';

import Modals from "@/app/[locale]/_components/tools/Modals";
import PriceConvert from "@/app/[locale]/_components/tools/PriceConvert";
import { Link } from "@/i18n/navigation";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useFormatter} from 'next-intl';

import Sticky from 'react-sticky-el';

const StripContentPro = (props:any) => {


    let minprice,maxprice,areaRangeMin,areaRangeMax,category ;

    const format = useFormatter();
    if(props.data["minPrice"] !== null){
        minprice = props.data["minPrice"];
    }
    if(props.data["maxPrice"] !== null){
        maxprice = props.data["maxPrice"];
    }
    if(props.data["areaRangeMin"] !== null){
        areaRangeMin = props.data["areaRangeMin"];
    }
    if(props.data["areaRangeMax"] !== null){
        areaRangeMax = props.data["areaRangeMax"];
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
        <Sticky stickyClassName="z-1">
            <div
            className='bg-gray-100 border-b border-gray-100 px-5'>
                <div className='container mx-auto py-3'>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-y-5">
                        <div className="col-span-2">
                            <h1 className="md:text-2xl text-xl text-[#111954] uppercase">{props.data["propertyName"]}</h1>
                            <h2 className="mb-5 hidden md:flex">{props.data["propertyName"]}, {props.data["community"]} by {props.data['masterDeveloper']}</h2>
                            <div className="grid grid-cols-3 mt-3 items-center content-center">
                                <div>
                                    <p className="text-sm text-[#111954]">Price</p>
                                    <p className="text-normal"><PriceConvert price={minprice} minDecimal='0'/> to <PriceConvert price={maxprice} minDecimal='0'/></p>
                                </div>
                                {props.data['propertyType'] ? (
                                <div>
                                    <p className="text-sm text-[#111954]">Type</p>
                                    <p className="text-normal">{props.data["propertyType"]}</p>
                                </div>) : ("")}
                                <div>
                                    <p className="text-sm text-[#111954]">Size</p>
                                    <p className="text-normal">{format.number(areaRangeMin)} - {format.number(areaRangeMax)} <span>Sqft</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 text-center md:flex items-center justify-end gap-3">
                            <Link href="#" className="bg-gray-200 hover:bg-gray-300  px-5 py-3 rounded-lg text-lg"><FontAwesomeIcon icon={faPhone} /></Link>
                            <button
                                onClick={modalHandler}
                                type="button"
                                className="bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-lg text-lg"
                            ><FontAwesomeIcon icon={faEnvelope} />
                            </button>
                            <Link href="#" className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg text-white text-lg"><FontAwesomeIcon icon={faWhatsapp} /></Link>
                        </div>
                    </div>
                </div>
                <Modals modalState={setModal} onModalUpdate={modalUpdate} />
            </div>
        </Sticky>
    );
  }


export default StripContentPro;