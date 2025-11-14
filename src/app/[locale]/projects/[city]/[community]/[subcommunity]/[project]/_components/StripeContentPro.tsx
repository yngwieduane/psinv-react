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
import { Mail, Phone } from 'lucide-react';
import { sendGTMEvent } from '@next/third-parties/google'

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
        sendGTMEvent({ event: 'OpenPopUpEmail', value: '1' })
    };

    const modalUpdate = (event:any) => {
        console.log(event);
        setSetModal(event);
    };


    return (
        <Sticky stickyClassName="stickyact">
            <div
            className='bg-gray-100 border-b border-gray-100 px-5'>
                <div className='container mx-auto py-3'>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-y-5">
                        <div className="col-span-2">
                            <h1 className="md:text-2xl text-xl text-[#111954] uppercase">{props.data["propertyName"]}</h1>
                            <h2 className="mb-5 hidden md:flex text-sm">{props.data["propertyName"]}, {props.data["community"]} by {props.data['masterDeveloper']}</h2>
                            <div className="grid grid-cols-3 mt-3 items-center content-center proptypes">
                                {(parseInt(minprice) > 1 || parseInt(maxprice) > 1) ? (
                                <div>
                                    <p className="text-sm text-[#111954]">Price</p>
                                    <p className="text-normal ">{(parseInt(minprice) > 1) ? <PriceConvert price={minprice} minDecimal='0'/> : "" } ~ {(parseInt(maxprice) > 1) ? <PriceConvert price={maxprice} minDecimal='0'/> : "" }</p>
                                </div>) : ("")}
                                {props.data['propertyType'] ? (
                                <div>
                                    <p className="text-sm text-[#111954]">Type</p>
                                    <p className="text-normal">{props.data["propertyType"]}</p>
                                </div>) : ("")}
                                {(parseInt(areaRangeMin) > 1 || parseInt(areaRangeMax) > 1) ? (
                                <div>
                                    <p className="text-sm text-[#111954]">Size</p>
                                    <p className="text-normal">{(parseInt(areaRangeMin) > 1) ? format.number(areaRangeMin) : "" } ~ {(parseInt(areaRangeMax) > 1) ? format.number(areaRangeMax) : "" } <span>Sqft</span></p>
                                </div>) : ("")}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 text-center md:flex items-center justify-end gap-3">
                            <Link title="Call" href="#" className="bg-gray-200 hover:bg-gray-300  px-5 py-3 rounded-lg text-lg flex justify-center gap-2 items-center" onClick={() => sendGTMEvent({ event: 'Call', value: '1' })}><Phone/><span className='text-sm'>Call</span></Link>
                            <button
                                onClick={modalHandler}
                                type="button"
                                className="bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-lg text-lg flex justify-center gap-2 cursor-pointer items-center"
                            ><Mail /><span className='text-sm'>Email</span>
                            </button>
                            <Link title="WhatsApp" href="#" className="bg-green-600 hover:bg-green-700 px-5 py-2.5 rounded-lg text-white text-lg flex justify-center gap-2 items-center" onClick={() => sendGTMEvent({ event: 'WhatsApp', value: '1' })}><FontAwesomeIcon size='xl' icon={faWhatsapp} /><span className='text-sm'>WhatsApp</span></Link>
                        </div>
                    </div>
                </div>
                <Modals modalState={setModal} onModalUpdate={modalUpdate} />
            </div>
        </Sticky>
    );
  }


export default StripContentPro;