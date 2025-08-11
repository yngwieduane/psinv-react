import { H3Icon } from '@heroicons/react/24/outline';
import Image from 'next/image';

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
    text: "It was a good experience, as engineer Wissam Atef provided us with excellent support in all maintenance work. Thank you, Engineer Wissam.",
  },
];

export default function GoogleReviewSection() {
  return (
    <section className="bg-[#f8f9fa] py-12">
      <div className="max-w-(--breakpoint-xl) mx-auto px-4">
        <h3 className="text-3xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
          Testimonials
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
         className="bg-white p-6 rounded text-left flex flex-col justify-between" style={{ boxShadow: "0 .5rem 1rem rgba(0, 0, 0, .15)"}}>
  <div className="flex items-center justify-start mb-4">
                <Image src="/images/google-icon.png" alt="Google" width={40} height={40} />
                <span className="ml-2 text-lg font-semibold">Google</span>
              </div>
              <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
                {review.text}
              </p>
              <div className="text-yellow-400 text-xl">
                ★★★★★
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
