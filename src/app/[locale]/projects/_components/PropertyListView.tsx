'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/navigation';
import slugify from 'react-slugify';
import { useFormatter } from 'next-intl';
import { useUser } from '@/context/userContext';
import { Heart, MapPin, Shuffle, Share2, BedDouble, Bath, Square, Calendar, Eye } from 'lucide-react';
import Image from 'next/image';
import ProjectPreviewModal from './ProjectPreviewModal';

const PropertyListView = ({ data }: { data: any[] }) => {
    return (
        <div className="flex flex-col gap-4">
            {data && data.map((property: any, index: number) => (
                <PropertyListItem key={index} data={property} />
            ))}
        </div>
    );
};

const PropertyListItem = (props: any) => {
    const format = useFormatter();
    const { toggleFavorite, addToCompare, removeFromCompare, isFavorite, isCompared } = useUser();
    const [showPreview, setShowPreview] = useState(false);

    // Data processing
    const saved = isFavorite(props.data["propertyID"]);
    const compared = isCompared(props.data["propertyID"]);
    const subCommunity = props.data["subCommunity"] ? props.data["subCommunity"] : "n-a";
    const url = '/projects/' + slugify(props.data['city']) + "/" + slugify(props.data['community']) + "/" + slugify(subCommunity) + "/" + slugify(props.data['propertyName']);

    let HOdate;
    if (props.data["handoverDate"]) {
        HOdate = new Date(props.data["handoverDate"]);
        HOdate = format.dateTime(HOdate, { year: 'numeric', month: 'short' });
    }

    const imgFeatured = (props.data["featuredImages"] && props.data["featuredImages"].length > 0 && props.data["featuredImages"][0]['imageURL'])
        ? props.data["featuredImages"][0]['imageURL'].replace('?width=0&height=0', '?width=400&height=300')
        : "/images/placeholder.jpg"; // Basic placeholder fallback
    let minprice, maxPrice;
    if (props.data["minPrice"] !== null && parseInt(props.data["minPrice"]) > 1) {
        minprice = format.number(props.data["minPrice"]);
    } else { minprice = "" }
    if (props.data["maxPrice"] !== null && parseInt(props.data["maxPrice"]) > 1) {
        maxPrice = format.number(props.data["maxPrice"]);
    } else { maxPrice = "" }

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
        <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="flex flex-col md:flex-row h-full md:h-64">
                {/* Image Section - Left Side */}
                <div className="relative w-full md:w-80 h-64 md:h-full flex-shrink-0">
                    <Link href={url} className="block w-full h-full">
                        <img
                            src={imgFeatured}
                            alt={props.data['propertyName']}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm backdrop-blur-sm">
                            {props.data["propertyPlan"]}
                        </div>
                    </Link>
                </div>

                {/* Content Section - Right Side */}
                <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="flex-1">
                            {props.data["masterDeveloper"] && (
                                <p className="text-xs text-secondary font-bold uppercase tracking-widest mb-1">
                                    {props.data["masterDeveloper"]}
                                </p>
                            )}
                            <Link href={url}>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-secondary transition-colors mb-2">
                                    {props.data["propertyName"]}
                                </h3>
                            </Link>
                            <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-3">
                                <MapPin size={16} className="text-gray-400" />
                                {props.data["community"]}, {props.data["city"]}
                            </p>

                            {/* Key Stats Grid */}
                            <div className="flex flex-wrap gap-y-3 gap-x-6 mt-3">
                                {props.data["propertyType"] && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="p-1.5 bg-gray-50 rounded-md text-gray-400">
                                            <Square size={16} />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] uppercase font-bold text-gray-400">Type</span>
                                            <span className="font-semibold">{props.data["propertyType"]}</span>
                                        </div>
                                    </div>
                                )}

                                {props.data["availableBedrooms"] && props.data["availableBedrooms"].length > 0 && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="p-1.5 bg-gray-50 rounded-md text-gray-400">
                                            <BedDouble size={16} />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] uppercase font-bold text-gray-400">Beds</span>
                                            <span className="font-semibold">
                                                {props.data["availableBedrooms"].map((b: any) => b.noOfBedroom).join(', ')}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {HOdate && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="p-1.5 bg-gray-50 rounded-md text-gray-400">
                                            <Calendar size={16} />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] uppercase font-bold text-gray-400">Handover</span>
                                            <span className="font-semibold">{HOdate}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons (Desktop: Top Right, Mobile: Bottom Right absolute?) */}
                        <div className="flex flex-col gap-2 ml-4">
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleFavorite({ id: props.data["propertyID"], type: 'project', data: props.data }); }}
                                className={`p-2 rounded-full border transition-all ${saved ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'}`}
                                title={saved ? "Remove from Favorites" : "Add to Favorites"}
                            >
                                <Heart size={18} fill={saved ? "currentColor" : "none"} />
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
                                className={`p-2 rounded-full border transition-all ${compared ? 'bg-primary/10 border-primary text-primary' : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'}`}
                                title={compared ? "Remove from Compare" : "Add to Compare"}
                            >
                                <Shuffle size={18} />
                            </button>
                            <button
                                onClick={handleShare}
                                className="p-2 rounded-full border bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all"
                                title="Share"
                            >
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-right sm:text-left">
                        <div className="text-primary font-bold text-lg">
                            {props.data["priceFrom"] !== 0 ? (
                                <>
                                    <span className="text-xs text-gray-400 font-normal uppercase mr-1">From</span>
                                    {props.data["currency"] || 'AED'} {minprice} ~ {maxPrice}
                                </>
                            ) : (
                                <span className="text-gray-500 text-sm">Ask for Price</span>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setShowPreview(true);
                                }}
                                className="text-sm font-bold border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                                <Eye size={16} /> Preview
                            </button>
                            <Link
                                href={url}
                                className="text-sm font-bold bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {showPreview && (
                <ProjectPreviewModal
                    project={props.data}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </div>
    );
};

export default PropertyListView;
