'use client'
import { Link } from "@/i18n/navigation";
import SwiperNormal from "../../_components/SwiperNormal";
import PriceConvert from "../../_components/tools/PriceConvert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NumberConvert from "../../_components/tools/NumberConvert";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import Modals from "../../_components/tools/Modals";
import { Bath, BedDouble, Heart, Mail, MapPin, Phone, Scaling, Shuffle } from "lucide-react";
import { useUser } from "@/context/userContext";
import { useFormatter } from "next-intl";

export default function UnitBoxAI(props:any){
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

    const format = useFormatter();
    const { toggleFavorite, addToCompare, isFavorite, isCompared } = useUser();
    const saved = isFavorite(props.data["propertyID"]);
    const compared = isCompared(props.data["propertyID"]);
    let HOdate;

    const propType = props.data.category ? (<p className="text-sm">{props.data.category}</p>) : ("");
    const propBed = props.data.bedrooms ? (<p className="text-sm">{props.data.bedrooms}</p>) : ("");
    if(props.handoverDate){
      HOdate = new Date(props.handoverDate);
      HOdate = format.dateTime(HOdate, {year: 'numeric',month: 'short'});
    }else{
      HOdate = false;
    }

    return (
        <>

        <div className='group relative'>
                        
            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                onClick={(e) => { e.stopPropagation(); toggleFavorite({ id: props.data.code, type: 'property' }); }}
                className={`p-2 rounded-full shadow-md transition-colors ${saved ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-500 hover:text-red-500'}`}
                >
                <Heart size={16} fill={saved ? "currentColor" : "none"} />
                </button>
                <button 
                onClick={(e) => { e.stopPropagation(); addToCompare({ id: props.data.code, type: 'property' }); }}
                className={`p-2 rounded-full shadow-md transition-colors ${compared ? 'bg-primary text-white' : 'bg-white/90 text-gray-500 hover:text-primary'}`}
                >
                <Shuffle size={16} />
                </button>
            </div>
            <Link title={props.data.propertyname} href={`/unit/${props.seoUrl}`}className="h-full">
                <div className={` bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full transform hover:-translate-y-1 relative`}>
                    {/* Image Box */}
                    <div className="relative h-64 bg-gray-200 overflow-hidden">
                        <img src={images[0]} alt={props.data['propertyName']} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm backdrop-blur-sm">
                            {props.data["status"] === 'Ready' ? "Ready" : "Off-Plan"}
                        </div>
                    </div>
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-bold text-gray-900 text-lg uppercase mb-2 line-clamp-1 group-hover:text-secondary transition-colors">{props.data.propertyname}</h3>
                        <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><MapPin size={14}/> {props.data.community}</p>
                        {props.data["masterDeveloper"]&& (
                            <p className="text-xs text-gray-400 mb-6 truncate font-medium">{props.data["masterDeveloper"]}</p>
                        )}

                        <div className="mt-auto grid grid-cols-3 gap-4 border-t border-gray-100 pt-5 text-center">
                            <div>
                                <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Types</span>
                                <span className="block text-sm font-bold text-gray-800 mt-1">{propType}</span>
                            </div>
                            <div className="border-l border-r border-gray-100 px-1">
                                <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Beds</span>
                                <span className="block text-sm font-bold text-gray-800 mt-1">{propBed}</span>
                            </div>
                            <div>
                                <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Handover</span>
                                <span className="block text-sm font-bold text-gray-800 mt-1">{HOdate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
        <Modals modalState={setModal} onModalUpdate={modalUpdate} />
        </>
    );
}