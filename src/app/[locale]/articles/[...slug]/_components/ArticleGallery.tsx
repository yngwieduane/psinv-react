"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

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
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={false}
                pagination={false}
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
                className="w-full" // Add padding for pagination bullets
            >
                {images.map((img, idx) => (
                    <SwiperSlide key={idx} className="!h-full">
                        <div className="relative w-full h-[300px] md:h-[420px] lg:h-[520px] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <Image
                                src={img}
                                alt={`Gallery image ${idx + 1}`}
                                fill
                                className="w-full h-auto rounded-xl object-cover"
                                sizes="(max-width: 768px) 100vw, 100vw"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
