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

const StripeContent = (props:any) => {


    let price,category ;

    const format = useFormatter();
    if(props.data.sellprice !== null){
        price = props.data.sellprice;
        category = "Buy";
    }else{
        price = props.data.rent;
        category = "Rent";
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
                            <h1 className="md:text-2xl text-xl text-[#111954] uppercase">{props.data.marketingTitle}</h1>
                            <h2 className="mb-5 hidden md:flex">{props.data.propertyname}, {props.data.community} by {props.data.developerName}</h2>
                            <div className="grid grid-cols-3 mt-3 items-center content-center">
                                <div>
                                    <p className="text-[#111954]">Price</p>
                                    <p className="md:text-lg text-normal"><PriceConvert price={price} minDecimal='0'/></p>
                                </div>
                                <div>
                                    <p className="text-[#111954]">Type</p>
                                    <p className="md:text-lg text-normal">{props.data.category}</p>
                                </div>
                                <div>
                                    <p className="text-[#111954]">Size</p>
                                    <p className="md:text-lg text-normal">{format.number(props.data.built_upArea)} <span>Sqft</span></p>
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


export default StripeContent;