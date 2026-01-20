'use client'
import { Link } from '@/i18n/navigation';
import React from "react";
import slugify from "react-slugify";
import { useFormatter } from 'next-intl';
import Image from 'next/image';
import { useUser } from '@/context/userContext';
import { Heart, MapPin, Shuffle, Share2 } from 'lucide-react';

const PropertyCardAI = (props: any) => {

    const format = useFormatter();
    let HOdate;

    const propType = props.data["propertyType"] ? (<p className="text-sm">{props.data["propertyType"]}</p>) : ("");
    const propBed = props.data["availableBedrooms"] ? (<p className="text-sm">
        {props.data["availableBedrooms"].map((img: any) => {
            return img['noOfBedroom'] + ',';
        })}
    </p>) : ("");
    let isReady = props.data["status"] === 'Ready';
    if (props.data["completionDate"]) {
        const dateObj = new Date(props.data["completionDate"]);
        if (dateObj <= new Date()) isReady = true;
        HOdate = format.dateTime(dateObj, { year: 'numeric', month: 'short' });
    } else {
        isReady = true;
        HOdate = false;
    }

    const { toggleFavorite, addToCompare, removeFromCompare, isFavorite, isCompared } = useUser();
    const saved = isFavorite(props.data["propertyID"]);
    const compared = isCompared(props.data["propertyID"]);

    const propHO = HOdate ? (<p className="text-sm">{HOdate}</p>) : ("");
    const propSize = (props.data["builtupArea_SQFT"] && props.data["builtupArea_SQFT"] !== '0') ? (<p className="text-sm">{props.data["builtupArea_SQFT"]}</p>) : ("");
    const imgFeatured = (props.data["featuredImages"] && props.data["featuredImages"].length > 0 && props.data["featuredImages"][0]['imageURL'])
        ? props.data["featuredImages"][0]['imageURL'].replace('?width=0&height=0', '?width=400&height=300')
        : "/images/placeholder.jpg"; // Basic placeholder fallback
    const subCommunity = props.data["subCommunity"] ? props.data["subCommunity"] : "n-a";

    const url = '/projects/' + slugify(props.data['city']) + "/" + slugify(props.data['community']) + "/" + slugify(subCommunity) + "/" + slugify(props.data['propertyName']);

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const shareData = {
            title: props.data["propertyName"],
            text: `Check out ${props.data["propertyName"]} in ${props.data["community"]}`,
            url: window.location.origin + url,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareData.url);
                alert("Link copied to clipboard!");
            } catch (err) {
                console.error('Failed to copy link: ', err);
            }
        }
    };
    return (
        <div className='group relative'>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite({ id: props.data["propertyID"], type: 'project', data: props.data }); }}
                    className={`cursor-pointer p-2 rounded-full shadow-md transition-colors ${saved ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-500 hover:text-red-500'}`}
                >
                    <Heart size={16} fill={saved ? "currentColor" : "none"} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (compared) {
                            removeFromCompare(props.data["propertyID"]);
                        } else {
                            addToCompare({ id: props.data["propertyID"], type: 'project', data: props.data });
                        }
                    }}
                    className={`cursor-pointer p-2 rounded-full shadow-md transition-colors ${compared ? 'bg-[#0c1356] text-white' : 'bg-white/90 text-gray-500 hover:text-primary'}`}
                >
                    <Shuffle size={16} />
                </button>
                <button
                    onClick={handleShare}
                    className="cursor-pointer p-2 rounded-full shadow-md transition-colors bg-white/90 text-gray-500 hover:text-blue-500"
                    title="Share"
                >
                    <Share2 size={16} />
                </button>
            </div>
            <Link title={props.data["propertyName"]} href={url} className="h-full">
                <div className={` bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full transform hover:-translate-y-1 relative`}>
                    {/* Image Box */}
                    <div className="relative h-64 bg-gray-200 overflow-hidden">
                        <img src={imgFeatured} alt={props.data['propertyName']} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm backdrop-blur-sm">
                            {props.data["propertyPlan"]}
                        </div>
                    </div>
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                        <h3 className="font-bold text-gray-900 text-lg uppercase mb-2 line-clamp-1 group-hover:text-secondary transition-colors">{props.data["propertyName"]}</h3>
                        <p className="text-sm text-gray-500 mb-2 flex items-center gap-1"><MapPin size={14} /> {props.data["community"]}</p>
                        {props.data["masterDeveloper"] && (
                            <p className="text-xs text-gray-400 mb-6 truncate font-medium">{props.data["masterDeveloper"]}</p>
                        )}

                        <div className="mt-auto flex flex-row gap-4 border-t border-gray-100 pt-5 text-center">
                            <div className="basis-3xs">
                                <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Types</span>
                                <span className="block text-sm font-bold text-gray-800 mt-1">{propType}</span>
                            </div>
                            <div className="basis-3xs">
                                <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Beds</span>
                                <span className="block text-sm font-bold text-gray-800 mt-1">{propBed}</span>
                            </div>
                            {HOdate ? (<div className="basis-3xs">
                                <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider">Handover</span>
                                <span className="block text-sm font-bold text-gray-800 mt-1">{propHO}</span>
                            </div>) : ("")}

                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PropertyCardAI;
