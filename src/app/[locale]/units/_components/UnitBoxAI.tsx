'use client'
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import Modals from "../../_components/tools/Modals";
import { Heart, MapPin, Shuffle } from "lucide-react";
import { useUser } from "@/context/userContext";
import { useCurrency } from "@/context/currencyContext";
import { useFormatter } from "next-intl";

export default function UnitBoxAI(props: any) {
    let images, price;
    {
        props.data.imageurl !== null
            ? images = props.data.imageurl.split('|').slice(0, -1)
            : images = '';
    }
    {
        props.data.sellprice !== null
            ? price = props.data.sellprice
            : price = props.data.rent;
    }

    const [setModal, setSetModal] = useState(false);
    const modalHandler = (event: any) => {
        console.log("clicked = " + setModal);
        setSetModal(true);
    };

    const modalUpdate = (event: any) => {
        console.log(event);
        setSetModal(event);
    };


    const phoneNumber = process.env.NEXT_PUBLIC_CALLNUMBER;
    const wappNumber = process.env.NEXT_PUBLIC_WAPPNUMBER;

    const format = useFormatter();
    const { toggleFavorite, addToCompare, isFavorite, isCompared } = useUser();
    const { convertPrice } = useCurrency();
    const saved = isFavorite(props.data["propertyID"]);
    const compared = isCompared(props.data["propertyID"]);
    let HOdate;

    const propType = props.data.category ? (<p className="text-sm font-medium">{props.data.category}</p>) : ("");
    const propBed = props.data.bedrooms ? (<p className="text-sm font-medium">{props.data.bedrooms}</p>) : ("");
    const propBaths = props.data.no_of_bathrooms ? (<p className="text-sm font-medium">{props.data.no_of_bathrooms}</p>) : ("");
    const propArea = props.data.built_upArea ? (<p className="text-sm font-medium">{format.number(props.data.built_upArea)} sqft</p>) : ("");

    return (
        <>
            <div className='group relative h-full '>
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

                <Link title={props.data.propertyname} href={`/unit/${props.seoUrl}`} className="h-full block">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">

                        {/* Image Section */}
                        <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                            <img
                                src={images[0]}
                                alt={props.data['propertyName']}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Status Badge */}
                            <div className="absolute top-3 left-3">
                                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md backdrop-blur-md shadow-sm ${props.data["status"] === 'Ready' ? "bg-emerald-500/90 text-white" : "bg-blue-600/90 text-white"}`}>
                                    {props.data["status"] === 'Ready' ? "Ready TO Move" : "Off-Plan"}
                                </span>
                            </div>

                            {/* Price Tag Overlay */}
                            <div className="absolute bottom-3 left-3 right-3">
                                <div className="bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/20">
                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-0.5">Price</p>
                                    <p className="text-xl font-bold text-[#111954]">
                                        {convertPrice(price).formatted}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5 flex flex-col flex-1">
                            <div className="mb-4">
                                <h3 className="font-bold text-gray-900 text-lg line-clamp-1 mb-1 group-hover:text-[#111954] transition-colors">
                                    {props.data.marketingTitle}
                                </h3>
                                <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                                    <MapPin size={14} className="text-[#111954]/60" />
                                    <span className="line-clamp-1">{props.data.propertyname}, {props.data.community}</span>
                                </div>
                            </div>

                            {/* Specs Grid */}
                            <div className="mt-auto grid grid-cols-3 gap-3 pt-4 border-t border-dashed border-gray-200">
                                {props.data.bedrooms && (
                                    <div className="text-center">
                                        <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Beds</span>
                                        {propBed}
                                    </div>
                                )}

                                {props.data.no_of_bathrooms && (
                                    <div className={`text-center ${props.data.bedrooms ? "border-l border-gray-100" : ""}`}>
                                        <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Baths</span>
                                        {propBaths}
                                    </div>
                                )}

                                {props.data.built_upArea && (
                                    <div className="text-center border-l border-gray-100">
                                        <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Area</span>
                                        {propArea}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <Modals modalState={setModal} onModalUpdate={modalUpdate} />
        </>
    );
}