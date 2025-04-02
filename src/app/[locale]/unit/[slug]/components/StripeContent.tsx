import { Link } from "@/i18n/navigation";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useFormatter} from 'next-intl';

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


    return (
        <div className=" p-5 justify-items-stretch border-b border-gray-200">
            <div className="grid grid-cols-3">
                <div className="col-span-2">
                    <h1 className="text-3xl">{props.data.marketingTitle}</h1>
                    <h2 className="">{props.data.propertyname}, {props.data.community} by {props.data.developerName}</h2>
                    <div className="grid grid-cols-3 mt-3">
                        <div>
                            <p className=" ">Price</p>
                            <p className="text-xl ">{format.number(price, {style: 'currency', currency: 'AED'})}</p>
                        </div>
                        <div>
                            <p className=" ">Type</p>
                            <p className="text-xl ">{props.data.sub_type}</p>
                        </div>
                        <div>
                            <p className=" ">Size</p>
                            <p className="text-xl ">{format.number(props.data.built_upArea)} <span>Sqft</span></p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-3">
                    <Link href="#" className="bg-gray-100 px-5 py-3 rounded-lg text-lg"><FontAwesomeIcon icon={faPhone} /> Call</Link>
                    <Link href="#" className="bg-green-600 px-5 py-3 rounded-lg text-white text-lg"><FontAwesomeIcon icon={faWhatsapp} /> WhatsApp</Link>
                </div>
            </div>
        </div>
    );
  }


export default StripeContent;