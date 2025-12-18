import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Share2, Printer, Maximize2, Tag, BedDouble, Bath, Square, MapPin, Phone, MessageCircle } from 'lucide-react';
import { UnitListing } from '@/types/types';
import PriceConvert from '../../_components/tools/PriceConvert';
import NumberConvert from '../../_components/tools/NumberConvert';
import { generateSeoData } from '../../_components/functions/generateSeoData';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

interface PreviewModalProps {
  property: UnitListing | null;
  onClose: () => void;
  onViewDetails: (property: UnitListing) => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ property, onClose, onViewDetails }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!property) return null;

    const phoneNumber = process.env.NEXT_PUBLIC_CALLNUMBER;
    const wappNumber = process.env.NEXT_PUBLIC_WAPPNUMBER;
    
    let images, price,marketingTitle,maincategory;
    {property.sellprice !== null
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
    } else {
        images = '';
    }
    {property.sellprice !== null
        ? price = property.sellprice
        : price = property.rent;
    }
    if (property.marketingTitle !== null) {
        marketingTitle = property.marketingTitle;
    } else {
        marketingTitle = '';
    }

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
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
            className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-white text-gray-500 hover:text-red-500 p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
        >
            <X size={20} />
        </button>

        {/* LEFT: Image Gallery (60%) */}
        <div className="md:w-3/5 h-[40vh] md:h-full relative bg-gray-100 group">
             <img
               src={images[currentImageIndex]} 
               alt={marketingTitle} 
               className="w-full h-full object-cover" 
               height={300}
               width={300}
             />
             
             {/* Gradient Overlay for Text Readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none" />

             {/* Carousel Controls */}
             <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                    onClick={prevImage}
                    className="bg-white/20 hover:bg-white/90 text-white hover:text-gray-900 p-3 rounded-full backdrop-blur-md transition-all shadow-lg"
                >
                    <ChevronLeft size={24}/>
                </button>
                <button 
                    onClick={nextImage}
                    className="bg-white/20 hover:bg-white/90 text-white hover:text-gray-900 p-3 rounded-full backdrop-blur-md transition-all shadow-lg"
                >
                    <ChevronRight size={24} />
                </button>
             </div>

             {/* Image Counter & Tools */}
             <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                    {currentImageIndex + 1} / {images.length}
                </span>
             </div>
             <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="bg-white/20 hover:bg-white text-white hover:text-gray-900 p-2 rounded-lg backdrop-blur-md transition-colors"><Share2 size={18} /></button>
                <button className="bg-white/20 hover:bg-white text-white hover:text-gray-900 p-2 rounded-lg backdrop-blur-md transition-colors"><Maximize2 size={18} /></button>
             </div>
             
             {/* Price Tag Overlay on Mobile/Desktop Image */}
             <div className="absolute bottom-6 left-6 text-white">
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
                
                {/* Title & Location */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-800 leading-tight mb-2">
                        {marketingTitle}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm">
                        <MapPin size={16} className="text-secondary mr-1 rtl:ml-1" />
                        {property.community}
                    </div>
                </div>

                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg shadow-sm text-secondary"><BedDouble size={20} strokeWidth={1.5} /></div>
                        <div>
                            <span className="block text-xs text-gray-400 font-medium uppercase">Bedrooms</span>
                            <span className="block text-gray-800 font-bold">{property.bedrooms}</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg shadow-sm text-secondary"><Bath size={20} strokeWidth={1.5} /></div>
                        <div>
                            <span className="block text-xs text-gray-400 font-medium uppercase">Bathrooms</span>
                            <span className="block text-gray-800 font-bold">{property.no_of_bathrooms}</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg shadow-sm text-secondary"><Square size={20} strokeWidth={1.5} /></div>
                        <div>
                            <span className="block text-xs text-gray-400 font-medium uppercase">Area</span>
                            <span className="block text-gray-800 font-bold"><NumberConvert number={Number(property.built_upArea)} minDecimal='0' label='Sqft'/></span>
                        </div>
                    </div>
                     <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                        <div className="bg-white p-2 rounded-lg shadow-sm text-secondary"><Tag size={20} strokeWidth={1.5} /></div>
                        <div>
                            <span className="block text-xs text-gray-400 font-medium uppercase">Type</span>
                            <span className="block text-gray-800 font-bold">{property.category}</span>
                        </div>
                    </div>
                </div>

                {/* Quick Register Form */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.03)] p-6">
                    <h4 className="font-serif font-bold text-lg text-primary mb-4">Schedule</h4>
                    <form className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="First name" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-secondary focus:bg-white transition-all" />
                            <input type="text" placeholder="Last name" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-secondary focus:bg-white transition-all" />
                        </div>
                        <input type="email" placeholder="Email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-secondary focus:bg-white transition-all" />
                        <div className="flex gap-2">
                             <div className="w-1/3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-500 font-medium">+971</div>
                             <input type="tel" placeholder="Phone" className="w-2/3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-secondary focus:bg-white transition-all" />
                        </div>
                        
                        <button type="button" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 mt-2">
                            Submit
                        </button>
                    </form>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    <Link 
                        href={`/unit/${seoData.seoUrl}`}
                        className="w-full py-3 border-2 border-gray-200 text-center  text-gray-600 font-bold rounded-xl hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        Details
                    </Link>
                </div>
            </div>

            {/* Bottom Sticky Action Bar (Mobile/Desktop) */}
            <div className="p-4 border-t border-gray-100 bg-white flex gap-3">
                <Link target='_blank' href={`https://wa.me/${wappNumber}?text=I%20am%20Interested%20./en/unit/${seoData.seoUrl}`} className="flex-1 bg-[#25D366] hover:bg-[#128c7e] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
                    <MessageCircle size={20} /> WhatsApp
                </Link>
                <Link href={`tel:${phoneNumber}`} className="flex-1 bg-secondary hover:bg-gray-800 hover:text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
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
