import { H3Icon } from '@heroicons/react/24/outline';
import { Outfit } from 'next/font/google';
import Image from 'next/image';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const reviews = [
  {
    id: 1,
    text: "My experience with them was awesome! They really made my home-buying journey smooth and stress-free.",
  },
  {
    id: 2,
    text: "Hello from Turkey. Lilit took very good care of us and answered all our questions and queries very clearly.",
  },
  {
    id: 3,
    text: "It was a good experience, as engineer Wissam Atef provided us with excellent support in all maintenance work. Thank you, Engineer Wissam",
  },
];

export default function GoogleReviewSection() {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <h3 className={`text-center text-3xl font-serif mb-12 ${outfit.className}`}>
          Testimonials
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-start mb-4">
                <Image src="/images/google-icon.png" alt="Google" title="Google" width={40} height={40} />
                <span className="ml-2 text-lg font-semibold">Google</span>
              </div>
              <div className="text-yellow-400 text-xl mb-5">
                ★★★★★
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic">
                "{review.text}"
              </p>              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
