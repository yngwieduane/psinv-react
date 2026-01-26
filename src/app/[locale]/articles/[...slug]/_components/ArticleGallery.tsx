"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
    images: string[];
    rtl: boolean;
};

export default function ArticleGallery({ images, rtl }: Props) {
    if (!images || images.length === 0) return null;

    return (
        <div className="my-10 w-full" dir={rtl ? "rtl" : "ltr"}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    1024: {
                        slidesPerView: 1,
                    },
                }}
                className="w-full !pb-12" // Add padding for pagination bullets
            >
                {images.map((img, idx) => (
                    <SwiperSlide key={idx} className="h-auto">
                        <div className="relative h-80 w-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <Image
                                src={img}
                                alt={`Gallery image ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
