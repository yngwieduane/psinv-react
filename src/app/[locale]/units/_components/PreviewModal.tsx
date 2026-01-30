import React, { useState, useRef } from 'react';
import { X, Share2, Maximize2, BedDouble, Bath, Square, MapPin, Phone, MessageCircle, Tag, ChevronLeft, ChevronRight, LinkIcon } from 'lucide-react';
import { UnitListing } from '@/types/types';
import PriceConvert from '../../_components/tools/PriceConvert';
import NumberConvert from '../../_components/tools/NumberConvert';
import { generateSeoData } from '../../_components/functions/generateSeoData';
import { Link } from '@/i18n/navigation';
import InquiryForm from '../../_components/InquiryForm';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PreviewModalProps {
    property: UnitListing | null;
    onClose: () => void;
    onViewDetails: (property: UnitListing) => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ property, onClose, onViewDetails }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const swiperRef = useRef<any>(null);

    if (!property) return null;

    const phoneNumber = process.env.NEXT_PUBLIC_CALLNUMBER;
    const wappNumber = process.env.NEXT_PUBLIC_WAPPNUMBER;

    let images: string[] = [];
    let price, marketingTitle, maincategory;
    {
        property.sellprice !== null
            ? maincategory = "Sale"
            : maincategory = "Rent";
    }
    const propertyData = {
        bedrooms: property.bedrooms,
        propertyType: property.category,
        adType: maincategory,
        name: property.propertyname,
        community: property.community,
        emirate: property.city_name,
        refNo: property.refNo,
        code: property.code,
        seoStart: "",
    };
    const seoData = generateSeoData(propertyData);
    if (property.imageurl !== null) {
        images = property.imageurl.split('|').slice(0, -1);
    }

    {
        property.sellprice !== null
            ? price = property.sellprice
            : price = property.rent;
    }
    marketingTitle = property.marketingTitle || '';

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] overflow-hidden flex flex-col md:flex-row relative z-10 animate-[scaleIn_0.3s_ease-out]">

                {/* Close Button - Absolute */}
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-4 right-4 z-50 bg-white/90 hover:bg-white text-gray-500 hover:text-red-500 p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                >
                    <X size={20} />
                </button>

                {/* LEFT: Image Gallery (60%) */}
                <div className="md:w-3/5 h-[40vh] md:h-full relative bg-gray-100 group">
                    <div className="absolute top-4 left-4 z-20 max-w-[calc(100%-2rem)] md:max-w-xs bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/20 transition-all hover:bg-white/95">
                        {/* Title & Location */}
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">
                                {marketingTitle}
                            </h3>
                            <div className="flex items-center text-gray-500 text-xs">
                                <MapPin size={14} className="text-secondary mr-1 rtl:ml-1" />
                                {property.community}
                            </div>
                        </div>

                        {/* Key Specs */}
                        <div className="grid grid-cols-2 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-1.5 rounded-lg text-secondary"><BedDouble size={16} strokeWidth={1.5} /></div>
                                <div>
                                    <span className="block text-[10px] text-gray-400 font-medium uppercase leading-none mb-0.5">Bedrooms</span>
                                    <span className="block text-gray-800 font-bold text-sm leading-none">{property.bedrooms}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-1.5 rounded-lg text-secondary"><Bath size={16} strokeWidth={1.5} /></div>
                                <div>
                                    <span className="block text-[10px] text-gray-400 font-medium uppercase leading-none mb-0.5">Bathrooms</span>
                                    <span className="block text-gray-800 font-bold text-sm leading-none">{property.no_of_bathrooms}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-1.5 rounded-lg text-secondary"><Square size={16} strokeWidth={1.5} /></div>
                                <div>
                                    <span className="block text-[10px] text-gray-400 font-medium uppercase leading-none mb-0.5">Area</span>
                                    <span className="block text-gray-800 font-bold text-sm leading-none"><NumberConvert number={Number(property.built_upArea)} minDecimal='0' label='Sqft' /></span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-1.5 rounded-lg text-secondary"><Tag size={16} strokeWidth={1.5} /></div>
                                <div>
                                    <span className="block text-[10px] text-gray-400 font-medium uppercase leading-none mb-0.5">Type</span>
                                    <span className="block text-gray-800 font-bold text-sm leading-none">{property.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        pagination={{ clickable: true }}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        onSlideChange={(swiper) => setCurrentImageIndex(swiper.activeIndex)}
                        className="h-full w-full"
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-full h-full">
                                    <img
                                        src={img}
                                        alt={`${marketingTitle} - Image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Gradient Overlay for Text Readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Arrows */}
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/90 text-white hover:text-gray-900 p-3 rounded-full backdrop-blur-md transition-all shadow-lg opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/90 text-white hover:text-gray-900 p-3 rounded-full backdrop-blur-md transition-all shadow-lg opacity-0 group-hover:opacity-100"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Image Counter & Tools */}
                    <div className="absolute top-4 right-4 flex gap-2 z-20">
                        <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                            {currentImageIndex + 1} / {images.length}
                        </span>
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                        <button
                            onClick={async () => {
                                if (navigator.share) {
                                    try {
                                        await navigator.share({
                                            title: marketingTitle,
                                            text: `Check out this property: ${marketingTitle}`,
                                            url: `${window.location.origin}/unit/${seoData.seoUrl}`,
                                        });
                                    } catch (error) {
                                        console.log('Error sharing:', error);
                                    }
                                } else {
                                    // Fallback to clipboard
                                    navigator.clipboard.writeText(`${window.location.origin}/unit/${seoData.seoUrl}`);
                                    alert('Link copied to clipboard!');
                                }
                            }}
                            className="bg-white/20 hover:bg-white text-white hover:text-gray-900 p-2 rounded-lg backdrop-blur-md transition-colors"
                        >
                            <Share2 size={18} />
                        </button>
                        <Link
                            href={`/unit/${seoData.seoUrl}`}
                            className="bg-white/20 hover:bg-white text-white hover:text-gray-900 p-2 rounded-lg backdrop-blur-md transition-colors block"
                        >
                            <LinkIcon size={18} />
                        </Link>
                    </div>

                    {/* Price Tag Overlay on Mobile/Desktop Image */}
                    <div className="absolute bottom-6 left-6 text-white z-10 pointer-events-none">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-secondary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">For {maincategory}</span>
                            {property.reraStrNo && <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-white/30">{property.reraStrNo}</span>}
                        </div>
                        <h2 className="text-3xl font-bold font-serif shadow-black drop-shadow-md">
                            <PriceConvert price={Number(price) || 0} minDecimal='0' />
                        </h2>
                    </div>
                </div>

                {/* RIGHT: Details & Form (40%) */}
                <div className="md:w-2/5 h-full bg-white flex flex-col">

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8">

                        {/* Quick Register Form */}
                        <InquiryForm hideFeedbackButton={true} />
                    </div>

                    {/* Bottom Sticky Action Bar (Mobile/Desktop) */}
                    <div className="p-4 border-t border-gray-100 bg-white flex gap-3">
                        <Link target='_blank' href={`https://wa.me/${wappNumber}?text=I%20am%20Interested%20./en/unit/${seoData.seoUrl}`} className="cursor-pointer flex-1 bg-[#25D366] hover:bg-[#128c7e] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
                            <MessageCircle size={20} /> WhatsApp
                        </Link>
                        <Link href={`tel:${phoneNumber}`} className="cursor-pointer flex-1 bg-indigo-950 border-indigo-950 hover:bg-gray-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
                            <Phone size={20} /> Call
                        </Link>
                    </div>

                </div>
            </div>
            <style>{`
        @keyframes scaleIn { from { transform: scale(0.98); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
        </div>
    );
};

export default PreviewModal;
