'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import React, { useEffect } from 'react';

const banners = [
  {
    link: '/en/projects/dubai/damac-lagoons/lagoons-side',
    src: '/images/side-banners/lagoons-side.webp',
    alt: 'Damac Lagoons banner',
  },
  {
    link: '/en/projects/abu-dhabi/hudayriyat-island',
    src: '/images/side-banners/hudayriyat-side.webp',
    alt: 'Hudayriyat Island banner',
  },
  {
    link: '/en/projects/abu-dhabi/ramhan-island',
    src: '/images/side-banners/ramhan-side.webp',
    alt: 'Ramhan Island banner',
  },
  {
    link: '/en/projects/abu-dhabi/bloom-living/almeria',
    src: '/images/side-banners/bloom-living-almeria-side-banner.jpg',
    alt: 'Bloom Living Almeria banner',
  },
];

export default function SideBannerCarousel() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    rtl: false,
    mode: 'snap',
    slides: { perView: 1 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);
    return () => clearInterval(interval);
  }, [instanceRef]);

  return (
    <div className="w-[300px] overflow-hidden border shadow-md">
      <div ref={sliderRef} className="keen-slider">
        {banners.map((banner, index) => (
          <div key={index} className="keen-slider__slide flex justify-center items-center">
            <a href={banner.link} target="_blank" rel="noopener noreferrer">
              <img
                src={banner.src}
                alt={banner.alt}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
