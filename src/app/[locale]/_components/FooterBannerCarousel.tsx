'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const banners = [
  {
    link: '/en/projects/abu-dhabi/hudayriyat-island/nawayef/nawayef-park-views',
    src: '/images/footer-banner/footer-nawayef-park-views.webp',
    alt: 'Nawayef Park Views banner',
  },
  {
    link: '/en/projects/dubai/al-barsha/al-barsha/saas-hills',
    src: '/images/footer-banner/saas-hills-footer-banner.webp',
    alt: 'SAAS Hills banner',
  },
  {
    link: '/en/projects/abu-dhabi/saadiyat-island/cultural-district/mamsha-gardens',
    src: '/images/footer-banner/footer-mamsha-gardens.jpg',
    alt: 'Mamsha Gardens banner',
  },
  {
    link: '/en/projects/abu-dhabi/zayed-city/n-a/bloom-living-almeria',
    src: '/images/footer-banner/bloom-living-almeria-footer.jpg',
    alt: 'Bloom Living Almeria banner',
  },
  {
    link: '/en/projects/dubai/dubailand/dubailand/verdes',
    src: '/images/footer-banner/verdas-banner.webp',
    alt: 'Verdes banner',
  },
  {
    link: '/en/projects/abu-dhabi/hudayriyat-island',
    src: '/images/footer-banner/footer-hudayriyat.webp',
    alt: 'Hudayriyat Island banner',
  },
  {
    link: '/en/projects/abu-dhabi/ramhan-island/ramhan-island/ramhan-island',
    src: '/images/footer-banner/footer-ramhan.webp',
    alt: 'Ramhan Island banner',
  },
];

export default function FooterBannerCarousel() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    mode: 'snap',
    created(s) {
      setInterval(() => s.next(), 3000); // autoplay
    },
  });

  return (
    <section className="bg-white py-2 dark:bg-neutral-900">
      <div ref={sliderRef} className="keen-slider max-w-[1280px] mx-auto">
        {banners.map((banner, index) => (
          <div key={index} className="keen-slider__slide">
            <a href={banner.link} target="_blank" rel="noopener noreferrer">
              <img
                src={banner.src}
                alt={banner.alt}
                className="w-full h-auto object-cover"
                width={1280}
                height={150}
                loading="lazy"
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
