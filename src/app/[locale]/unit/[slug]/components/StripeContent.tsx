'use client';
import { useEffect, useRef, useState } from 'react';

import Modals from "@/app/[locale]/_components/tools/Modals";
import PriceConvert from "@/app/[locale]/_components/tools/PriceConvert";
import { Link } from "@/i18n/navigation";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useFormatter} from 'next-intl';

const StripeContent = (props:any) => {

    const stickyRef = useRef<HTMLDivElement>(null);
    const stickyDev = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);
    const [initialOffset, setInitialOffset] = useState<number | null>(null);

    let price,category ;

    const format = useFormatter();
    if(props.data.sellprice !== null){
        price = props.data.sellprice;
        category = "Buy";
    }else{
        price = props.data.rentprice;
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

  
    useEffect(() => {
      const handleScroll = () => {
        if (!stickyRef.current) return;
        if (!stickyDev.current) return;
  
        const topOffset = stickyRef.current.getBoundingClientRect().top;
        const topOffsetstickyDev = stickyDev.current.getBoundingClientRect().top;
        console.log(topOffset);
        console.log(topOffsetstickyDev);
        console.log(topOffset > topOffsetstickyDev);
        if (initialOffset === null) {
          setInitialOffset(topOffsetstickyDev);
          return;
        }
  
        if (topOffset <= 0) {
          setIsSticky(true);
        }
         if (topOffsetstickyDev >=0) {
          setIsSticky(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [initialOffset]);

    return (
        <div ref={stickyDev}>
            <div ref={stickyRef}
            className={`transition-all px-0 md:px-5 py-5 justify-items-stretch ${
            isSticky ? 'fixed top-0 left-0 right-0 bg-white shadow-md z-50' : ' border-b border-gray-200'
            }`}>
                <div className='container mx-auto '>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-y-5">
                        <div className="col-span-2">
                            <h1 className="md:text-2xl text-xl">{props.data.marketingTitle}</h1>
                            <h2 className="mb-5">{props.data.propertyname}, {props.data.community} by {props.data.developerName}</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 mt-3 items-center content-center">
                                <div>
                                    <p className=" ">Price</p>
                                    <p className="md:text-lg text-normal"><PriceConvert price={price} minDecimal='0'/></p>
                                </div>
                                <div>
                                    <p className=" ">Type</p>
                                    <p className="md:text-lg text-normal">{props.data.sub_type}</p>
                                </div>
                                <div>
                                    <p className=" ">Size</p>
                                    <p className="md:text-lg text-normal">{format.number(props.data.built_upArea)} <span>Sqft</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 text-center md:flex items-center justify-end gap-3">
                            <Link href="#" className="bg-gray-100 px-5 py-3 rounded-lg text-lg"><FontAwesomeIcon icon={faPhone} /></Link>
                            <button
                                onClick={modalHandler}
                                type="button"
                                className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-lg text-lg"
                            ><FontAwesomeIcon icon={faEnvelope} />
                            </button>
                            <Link href="#" className="bg-green-600 px-5 py-3 rounded-lg text-white text-lg"><FontAwesomeIcon icon={faWhatsapp} /></Link>
                        </div>
                    </div>
                </div>
                <Modals modalState={setModal} onModalUpdate={modalUpdate} />
            </div>
        </div>
    );
  }


export default StripeContent;