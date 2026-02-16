import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Share2, Maximize2, Tag, BedDouble, Bath, Square, MapPin, Phone, MessageCircle, Calendar, Link2, LinkIcon } from 'lucide-react';
import { Link, useRouter } from '@/i18n/navigation';
import { useFormatter } from 'next-intl';
import slugify from 'react-slugify';
import InquiryForm from '../../_components/InquiryForm';
import { useCurrency } from '@/context/currencyContext';

interface ProjectPreviewModalProps {
    project: any;
    onClose: () => void;
}

const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({ project, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const format = useFormatter();
    const router = useRouter();
    const { convertPrice } = useCurrency();

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

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (typeof window !== 'undefined' && navigator.share) {
            try {
                await navigator.share({
                    title: marketingTitle,
                    text: `Check out ${marketingTitle} by Property Shop Investment`,
                    url: window.location.origin + url,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback
            console.log("Web Share API not supported");
        }
    };

    const handleMaximize = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(url);
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] overflow-hidden flex flex-col md:flex-row relative z-10 animate-[scaleIn_0.3s_ease-out]">

                {/* Close Button - Absolute */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-white text-gray-500 hover:text-red-500 p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                >
                    <X size={20} />
                </button>

                {/* LEFT: Image Gallery (60%) */}
                <div className="md:w-5/6 h-[40vh] md:h-full relative bg-gray-100 group">
                    <div className="absolute top-4 left-4 z-20 max-w-[calc(100%-2rem)] md:max-w-xs bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/20 transition-all hover:bg-white/95 dark:bg-gray-800 dark:border dark:border-gray-700 dark:hover:bg-gray-800">
                        {/* Title & Location */}
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1 dark:text-white">
                                {marketingTitle}
                            </h3>
                            <div className="flex items-center text-gray-500 text-xs dark:text-gray-400">
                                <MapPin size={14} className="text-secondary mr-1 rtl:ml-1" />
                                {community}, {city}
                            </div>
                        </div>

                        {/* Key Specs */}
                        <div className="space-y-3">
                            {project.availableBedrooms && project.availableBedrooms.length > 0 && (
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-1.5 rounded-lg text-secondary dark:bg-gray-800 dark:border dark:border-gray-700"><BedDouble size={16} strokeWidth={1.5} /></div>
                                    <div>
                                        <span className="block text-[10px] text-gray-400 font-medium uppercase leading-none mb-0.5 dark:text-white">Bedrooms</span>
                                        <span className="block text-gray-800 font-bold text-sm leading-none dark:text-white">
                                            {project.availableBedrooms.map((b: any) => b.noOfBedroom).join(', ')}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                <div className="bg-gray-100 p-1.5 rounded-lg text-secondary dark:bg-gray-800 dark:border dark:border-gray-700"><Tag size={16} strokeWidth={1.5} /></div>
                                <div>
                                    <span className="block text-[10px] text-gray-400 font-medium uppercase leading-none mb-0.5 dark:text-white">Type</span>
                                    <span className="block text-gray-800 font-bold text-sm leading-none dark:text-white">{project.propertyType || 'Project'}</span>
                                </div>
                            </div>
                            {HOdate && (
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-100 p-1.5 rounded-lg text-secondary dark:bg-gray-800 dark:border dark:border-gray-700"><Calendar size={16} strokeWidth={1.5} /></div>
                                    <div>
                                        <span className="block text-[10px] text-gray-400 font-medium uppercase leading-none mb-0.5 dark:text-white">Handover</span>
                                        <span className="block text-gray-800 font-bold text-sm leading-none dark:text-white">{HOdate}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
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
                        <div className="absolute top-4 right-4 flex gap-2 z-20">
                            <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                                {currentImageIndex + 1} / {images.length}
                            </span>
                        </div>
                    )}

                    <div className="absolute bottom-4 right-4 flex gap-2">
                        <button onClick={handleShare} className="bg-white/20 hover:bg-white text-white hover:text-gray-900 p-2 rounded-lg backdrop-blur-md transition-colors"><Share2 size={18} /></button>
                        <button onClick={handleMaximize} className="bg-white/20 hover:bg-white text-white hover:text-gray-900 p-2 rounded-lg backdrop-blur-md transition-colors"><LinkIcon size={18} /></button>
                    </div>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-6 left-6 text-white">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="bg-secondary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{project.status}</span>
                        </div>
                        {price && Number(price) > 0 && (
                            <h2 className="text-3xl font-bold font-serif shadow-black drop-shadow-md">
                                {convertPrice(Number(price)).formatted}
                            </h2>
                        )}
                    </div>
                </div>

                {/* RIGHT: Details & Form (40%) */}
                <div className="md:w-2/5 h-full bg-white flex flex-col dark:bg-gray-800 dark:border dark:border-gray-700 dark:hover:bg-gray-800">

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 mt-10">

                        {/* Quick Register Form */}
                        <InquiryForm hideFeedbackButton={true} />

                    </div>

                    {/* Bottom Sticky Action Bar */}
                    <div className="p-4 border-t border-gray-100 flex gap-3 dark:bg-gray-800 dark:border dark:border-gray-700">
                        <Link target='_blank' href={`https://wa.me/${wappNumber}?text=I%20am%20Interested%20in%20${marketingTitle}`} className="flex-1 bg-[#25D366] hover:bg-[#128c7e] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
                            <MessageCircle size={20} /> WhatsApp
                        </Link>
                        <Link href={`tel:${phoneNumber}`} className="cursor-pointer flex-1 bg-primary border-primary hover:bg-primary/80 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
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
