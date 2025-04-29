import Modals from "@/app/[locale]/_components/tools/Modals";
import PriceConvert from "@/app/[locale]/_components/tools/PriceConvert";
import { Link } from "@/i18n/navigation";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useFormatter} from 'next-intl';
import { useState } from "react";

const StripeContent = (props:any) => {
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

    return (
        <div className=" px-0 md:px-5 py-5 justify-items-stretch border-b border-gray-200">
            <div className="grid md:grid-cols-3 grid-cols-1 gap-y-5">
                <div className="col-span-2">
                    <h1 className="md:text-3xl text-xl">{props.data.marketingTitle}</h1>
                    <h2 className="mb-5">{props.data.propertyname}, {props.data.community} by {props.data.developerName}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 mt-3 items-center content-center">
                        <div>
                            <p className=" ">Price</p>
                            <p className="md:text-xl text-normal"><PriceConvert price={price} minDecimal='0'/></p>
                        </div>
                        <div>
                            <p className=" ">Type</p>
                            <p className="md:text-xl text-normal">{props.data.sub_type}</p>
                        </div>
                        <div>
                            <p className=" ">Size</p>
                            <p className="md:text-xl text-normal">{format.number(props.data.built_upArea)} <span>Sqft</span></p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 text-center md:flex items-center justify-end gap-3">
                    <Link href="#" className="bg-gray-100 px-5 py-3 rounded-lg text-lg"><FontAwesomeIcon icon={faPhone} /> Call</Link>
                    <button
                        onClick={modalHandler}
                        type="button"
                        className="bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-lg text-lg"
                    ><FontAwesomeIcon icon={faEnvelope} />
                    </button>
                    <Link href="#" className="bg-green-600 px-5 py-3 rounded-lg text-white text-lg"><FontAwesomeIcon icon={faWhatsapp} /> WhatsApp</Link>
                </div>
            </div>
            <Modals modalState={setModal} onModalUpdate={modalUpdate} />
        </div>
    );
  }


export default StripeContent;