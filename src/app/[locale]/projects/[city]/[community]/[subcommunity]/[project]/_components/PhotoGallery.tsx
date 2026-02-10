'use client'
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import FancyboxWrapper from '@/app/[locale]/_components/tools/FancyboxWrapper';
import Breadcrumb from "@/app/[locale]/_components/Breadcrumb";
import { ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";

const PhotoGallery = ({ data, limit, viewAllLink }: { data: any, limit?: number, viewAllLink?: string }) => {
    const t = useTranslations('ProjectPage');
    const router = useRouter();

    const imgFeatured = data["featuredImages"] ? data["featuredImages"][0]['imageURL'] : ("");
    const generalImages = data["generalImages"] ? data["generalImages"] : ("");
    const facilitiesAndAmenitiesImages = data["facilitiesAndAmenitiesImages"] ? data["facilitiesAndAmenitiesImages"] : ("");
    const communityImages = data["communityImages"] ? data["communityImages"] : ("");

    const generalImagesNew = [{ imageURL: imgFeatured }, ...generalImages];

    const galleryData = [
        {
            title: t('facilities_and_amenities'),
            image: facilitiesAndAmenitiesImages,
        },
        {
            title: t('community_images'),
            image: communityImages,
        }
    ];

    const allGalleryData = [
        {
            title: t('project_gallery'),
            image: generalImagesNew
        },
        ...galleryData
    ].filter(item => item.image && item.image.length > 0);

    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
    const galleryImages = allGalleryData[activeGalleryIndex]?.image || [];
    const currentGalleryImages = limit ? galleryImages.slice(0, limit) : galleryImages;
    const currentTabTitle = allGalleryData[activeGalleryIndex]?.title || t('gallery');
    const PLACEHOLDER = "/images/placeholder.jpg";
    return (
        <div>


            <div className="container mx-auto pt-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            {viewAllLink ? (
                                <button onClick={() => router.push(viewAllLink)} className="flex items-center gap-1 text-sm font-bold text-secondary hover:text-primary transition-colors">
                                    <h2 className="text-3xl font-bold text-[#111954] relative inline-block">{t('gallery')}</h2>
                                </button>
                            ) : (
                                <h2 className="text-3xl font-bold text-[#111954] relative inline-block">{t('gallery')}</h2>
                            )}
                        </div>
                        <h2 className="text-xl text-gray-500">{data["propertyName"]}</h2>
                    </div>

                    <div className="flex flex-wrap gap-2 bg-white p-1 rounded-full border border-gray-200 shadow-sm w-fit">
                        {allGalleryData.map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveGalleryIndex(index)}
                                className={`cursor-pointer px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeGalleryIndex === index
                                    ? 'bg-white text-primary shadow-sm'
                                    : 'text-gray-500 hover:text-primary'
                                    }`}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    <FancyboxWrapper>
        {currentGalleryImages.map((img: any, index: number) => {
        const raw = typeof img?.imageURL === "string" ? img.imageURL : "";
        const imagecontent = raw
            ? raw.replace("?width=0&height=0", "?width=800&height=600")
            : PLACEHOLDER;

        return (
            <a
            title={currentTabTitle}
            data-fancybox="gallerypopup"
            href={raw || PLACEHOLDER}
            key={index}
            className={`relative group rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3]
                bg-gray-100 bg-center bg-no-repeat bg-[length:140px] ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            style={{ backgroundImage: `url(${PLACEHOLDER})` }}
            >
            <img
                src={imagecontent}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-0 transition-opacity duration-500"
                alt={`Gallery ${index}`}
                loading="lazy"
                onLoad={(e) => {
                e.currentTarget.classList.remove("opacity-0");
                e.currentTarget.classList.add("opacity-100");
                }}
                onError={(e) => {
                e.currentTarget.src = PLACEHOLDER;
                e.currentTarget.classList.remove("opacity-0");
                e.currentTarget.classList.add("opacity-100");
                }}
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

            {index === 0 && (
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-white font-bold text-lg drop-shadow-md">{currentTabTitle}</span>
                </div>
            )}
            </a>
        );
        })}
                    </FancyboxWrapper>
                </div>

                {currentGalleryImages.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <p>{t('no_images_available')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhotoGallery;
