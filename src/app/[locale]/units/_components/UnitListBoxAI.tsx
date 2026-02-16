'use client'
import { Link } from "@/i18n/navigation";
import SwiperNormal from "../../_components/SwiperNormal";
import PriceConvert from "../../_components/tools/PriceConvert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import NumberConvert from "../../_components/tools/NumberConvert";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Modals from "../../_components/tools/Modals";
import { useState, useEffect } from "react";
import { useUser } from "@/context/userContext";
import { Heart, Home, MapPin, Shuffle } from "lucide-react";
import PreviewModal from "./PreviewModal";
import { UnitListing } from "@/types/types";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function UnitListBoxAI(props: any) {
    const [imgError, setImgError] = useState(false);

    let images: string[] = [];
    if (props.data.imageurl) {
        images = props.data.imageurl.split('|').slice(0, -1);
    }

    // Reset error state if data changes
    useEffect(() => {
        setImgError(false);
    }, [props.data]);

    const hasImage = !imgError && images.length > 0;

    let price;
    if (props.data.sellprice !== null) {
        price = props.data.sellprice;
    } else {
        price = props.data.rent;
    }

    const t = useTranslations('Units');
    const t_u = useTranslations('UnitsPageAI');

    const [selectedProperty, setSelectedProperty] = useState<UnitListing | null>(null);
    const [previewProperty, setPreviewProperty] = useState<UnitListing | null>(null);
    const handlePropertySelect = (property: UnitListing) => {
        setSelectedProperty(property);
        setPreviewProperty(null);
    };
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

    const { toggleFavorite, addToCompare, removeFromCompare, isFavorite, isCompared } = useUser();

    const saved = isFavorite(props.data.code);
    const compared = isCompared(props.data.code);

    const isList = 'list';
    return (
        <>
            <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex ${isList ? 'flex-col md:flex-row h-auto md:h-64' : 'flex-col h-full'} hover:shadow-md transition-shadow relative group`}>
                {/* Image Section */}
                <div
                    className={`${isList ? 'w-full h-64 md:w-2/5 md:h-full' : 'w-full h-64'} relative bg-gray-200 cursor-pointer shrink-0 overflow-hidden`}

                >
                    <Link href={`/unit/${props.seoUrl}`}>
                        {hasImage ? (
                            <Image
                                src={images[0].split('?')[0]}
                                alt={props.seoTitle}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                width={300}
                                height={200}
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full bg-gray-50">
                                <Home size={40} strokeWidth={1.5} />
                                <span className="text-xs mt-2">{t_u('NoImage')}</span> 
                            </div>
                        )}
                        <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                            {t_u(`For ${props.adType}`)}
                        </div>
                    </Link>
                </div>

                {/* Action Buttons (Absolute) */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite({ id: props.data.code, type: 'units', data: props.data }); }}
                        className={`p-2 rounded-full shadow-md transition-colors ${saved ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-500 hover:text-red-500'}`}
                        title="Save"
                    >
                        <Heart size={18} fill={saved ? "currentColor" : "none"} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (compared) {
                                removeFromCompare(props.data.code);
                            } else {
                                addToCompare({ id: props.data.code, type: 'units', data: props.data });
                            }
                        }}
                        className={`cursor-pointer p-2 rounded-full shadow-md transition-colors ${compared ? 'bg-[#0c1356] text-white' : 'bg-white/90 text-gray-500 hover:text-primary'}`}
                        title="Compare"
                    >
                        <Shuffle size={18} />
                    </button>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-5 flex flex-col h-full">
                    <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                            <Link href={`/unit/${props.seoUrl}`}>
                                <h3
                                    className="text-xl font-bold text-gray-800 line-clamp-1 cursor-pointer hover:text-secondary transition-colors"
                                >
                                    <PriceConvert price={price} minDecimal='0' />
                                </h3>
                            </Link>
                        </div>

                        {/* Forced height for Title (2 lines max) to ensure alignment */}
                        <h4 className="text-sm font-medium text-gray-600 mb-2 hover:text-primary transition-colors line-clamp-2 h-10 overflow-hidden leading-tight" >
                            {props.data.marketingTitle}
                        </h4>

                        <div className="flex items-center text-gray-500 text-xs mb-4">
                            <MapPin size={14} className="mr-1 shrink-0" />
                            <span className="truncate w-full">
                                {t_u.has(`Communities.${props.data.community}`)
                                    ? t_u(`Communities.${props.data.community}`)
                                    : props.data.community
                                }
                            </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 flex-wrap">
                            {props.data.category !== 'Office' && props.data.category !== 'Land' && (
                                <>
                                    <span className="flex items-center gap-1 font-bold whitespace-nowrap">
                                        {t_u.has(`Category.${props.data.category}`)
                                            ? t_u(`Category.${props.data.category}`)
                                            : props.data.category
                                        }
                                        
                                    </span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                    <span className="whitespace-nowrap">{props.data.bedrooms} {t_u('Beds')}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                    <span className="whitespace-nowrap">{props.data.no_of_bathrooms} {t_u('Baths')}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                </>
                            )}
                            <span className="whitespace-nowrap"><NumberConvert number={props.data.built_upArea} minDecimal='0' label='Sqft' /></span>
                        </div>
                    </div>

                    {/* Buttons - Pushed to bottom via flex-col + flex-grow on content above */}
                    <div className="flex gap-2 mt-auto pt-4 border-t border-gray-50">
                        <button
                            onClick={() => setPreviewProperty(props.data)}
                            className="cursor-pointer flex-1 border border-gray-300 text-gray-600 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            {t_u('Preview')}
                        </button>
                        <button onClick={modalHandler} className="cursor-pointer flex-1 border border-gray-300 text-gray-600 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                            {t_u('Inquire')}
                        </button>
                        <Link target='_blank' href={`https://wa.me/${wappNumber}?text=I%20am%20Interested%20.${props.seoUrl}`} className="cursor-pointer flex-1 bg-[#25D366] text-white py-2 rounded text-sm font-medium hover:bg-[#128c7e] transition-colors flex items-center justify-center gap-1">
                            {t_u('WhatsApp')}
                        </Link>
                    </div>
                </div>
            </div>
            <Modals modalState={setModal} onModalUpdate={modalUpdate} title={t('inquire')} />
            <PreviewModal
                property={previewProperty}
                onClose={() => setPreviewProperty(null)}
                onViewDetails={handlePropertySelect}
            />
        </>
    );
}