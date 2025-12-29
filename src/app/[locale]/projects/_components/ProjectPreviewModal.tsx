import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Share2, Maximize2, Tag, BedDouble, Bath, Square, MapPin, Phone, MessageCircle, Calendar } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useFormatter } from 'next-intl';
import slugify from 'react-slugify';
import InquiryForm from '../../_components/InquiryForm';

interface ProjectPreviewModalProps {
    project: any;
    onClose: () => void;
}

const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({ project, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const format = useFormatter();

    if (!project) return null;

    const phoneNumber = process.env.NEXT_PUBLIC_CALLNUMBER;
    const wappNumber = process.env.NEXT_PUBLIC_WAPPNUMBER;

    // Data Processing
    const images = project.featuredImages?.map((img: any) => img.imageURL).filter((url: string) => !!url) || [];
    const marketingTitle = project.propertyName;
    const community = project.community;
    const city = project.city;
    const price = project.priceFrom;
    const currency = project.currency || 'AED';

    let HOdate;
    if (project.handoverDate) {
        HOdate = new Date(project.handoverDate);
        HOdate = format.dateTime(HOdate, { year: 'numeric', month: 'short' });
    }

    const subCommunity = project.subCommunity ? project.subCommunity : "n-a";
    const url = '/projects/' + slugify(project.city) + "/" + slugify(project.community) + "/" + slugify(subCommunity) + "/" + slugify(project.propertyName);


    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (images.length > 0)
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (images.length > 0)
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
                    {images.length > 0 ? (
                        <img
                            src={images[currentImageIndex]}
                            alt={marketingTitle}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Images</div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent pointer-events-none" />

                    {/* Carousel Controls */}
                    {images.length > 1 && (
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={prevImage}
                                className="bg-white/20 hover:bg-white/90 text-white hover:text-gray-900 p-3 rounded-full backdrop-blur-md transition-all shadow-lg"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="bg-white/20 hover:bg-white/90 text-white hover:text-gray-900 p-3 rounded-full backdrop-blur-md transition-all shadow-lg"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    )}

                    {/* Image Counter & Tools */}
                    {images.length > 0 && (
                        <div className="absolute top-4 left-4 flex gap-2">
                            <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                                {currentImageIndex + 1} / {images.length}
                            </span>
                        </div>
                    )}

                    <div className="absolute bottom-4 right-4 flex gap-2">
                        <button className="bg-white/20 hover:bg-white text-white hover:text-gray-900 p-2 rounded-lg backdrop-blur-md transition-colors"><Share2 size={18} /></button>
                        <button className="bg-white/20 hover:bg-white text-white hover:text-gray-900 p-2 rounded-lg backdrop-blur-md transition-colors"><Maximize2 size={18} /></button>
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-6 left-6 text-white">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-secondary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{project.status}</span>
                        </div>
                        <h2 className="text-3xl font-bold font-serif shadow-black drop-shadow-md">
                            {currency} {Number(price).toLocaleString()}
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
                                {community}, {city}
                            </div>
                        </div>

                        {/* Key Specs */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {project.availableBedrooms && project.availableBedrooms.length > 0 && (
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-lg shadow-sm text-secondary"><BedDouble size={20} strokeWidth={1.5} /></div>
                                    <div>
                                        <span className="block text-xs text-gray-400 font-medium uppercase">Bedrooms</span>
                                        <span className="block text-gray-800 font-bold">
                                            {project.availableBedrooms.map((b: any) => b.noOfBedroom).join(', ')}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                                <div className="bg-white p-2 rounded-lg shadow-sm text-secondary"><Tag size={20} strokeWidth={1.5} /></div>
                                <div>
                                    <span className="block text-xs text-gray-400 font-medium uppercase">Type</span>
                                    <span className="block text-gray-800 font-bold">{project.propertyType || 'Project'}</span>
                                </div>
                            </div>
                            {HOdate && (
                                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-lg shadow-sm text-secondary"><Calendar size={20} strokeWidth={1.5} /></div>
                                    <div>
                                        <span className="block text-xs text-gray-400 font-medium uppercase">Handover</span>
                                        <span className="block text-gray-800 font-bold">{HOdate}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Register Form */}
                        <InquiryForm hideFeedbackButton={true} />

                        <div className="mt-6 flex flex-col gap-3">
                            <Link
                                href={url}
                                className="w-full py-3 border-2 border-gray-200 text-center  text-gray-600 font-bold rounded-xl hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                View Full Details
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Sticky Action Bar */}
                    <div className="p-4 border-t border-gray-100 bg-white flex gap-3">
                        <Link target='_blank' href={`https://wa.me/${wappNumber}?text=I%20am%20Interested%20in%20${marketingTitle}`} className="flex-1 bg-[#25D366] hover:bg-[#128c7e] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
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

export default ProjectPreviewModal;
