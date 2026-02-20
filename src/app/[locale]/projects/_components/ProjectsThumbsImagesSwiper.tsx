'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

import "./ProjectsThumbsSwiper.css";

interface PropertyImageSwiperProps {
    featuredImage: string;
    generalImages?: any[];
    url: string;
    propertyName: string;
    propertyPlan?: string;
}

const ProjectsThumbsImagesSwiper: React.FC<PropertyImageSwiperProps> = ({
featuredImage,
generalImages = [],
url,
propertyName,
propertyPlan,
}) => {
    const[imgError, setImgError] = useState(false);
    const hasImg = !imgError && featuredImage;
    
    const galleryImages = generalImages?.slice(0,2) || [];

    return(
        <Swiper 
        modules={[Pagination]} 
        pagination={{ clickable: true }} 
        className="h-full w-full">
            {/* Featured Image */}
            <SwiperSlide>
              <Link href={url} className="block w-full h-full">
                <Image
                  src={featuredImage}
                  alt={propertyName}
                  className="w-full h-full object-cover"
                  width={400}
                  height={300}
                  onError={() => setImgError(true)}
                />
              </Link>
            </SwiperSlide>

            {/* Gallery Images */}
            {galleryImages.map((img, idx) => {
              const galleryImg = img.imageURL?.replace(
                '?width=0&height=0',
                '?width=400&height=300'
              );
              return (
                <SwiperSlide key={idx}>
                  <Link href={url} className="block w-full h-full">
                    <Image
                      src={galleryImg}
                      alt={`${propertyName} - ${idx + 1}`}
                      className="w-full h-full object-cover"
                      width={400}
                      height={300}
                    />
                  </Link>
                </SwiperSlide>
              );
            })}
            <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm backdrop-blur-sm z-99">
                {propertyPlan}
            </div>
          </Swiper>

    )

}

export default ProjectsThumbsImagesSwiper