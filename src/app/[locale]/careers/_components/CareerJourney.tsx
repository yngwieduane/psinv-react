'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BrittanySignature } from '@/utils/fonts';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const hoverSteps = [
  {
    id: 1,
    top: '57%',
    left: '15.5%',
    bgPos: '-132px -539px',
    size: '538%',
    title: 'Client-Centric approach',
    description:
      'PSI is renowned for its commitment to adopting a client-centric mindset. By being a part of our team, you will develop exceptional customer service skills and build lasting relationships with valuable clients.',
  },
  {
    id: 2,
    top: '27%',
    left: '19.5%',
    bgPos: '-412px -289px',
    size: '650%',
    title: 'Innovative technology integration',
    description:
      'We leverage cutting-edge technology to streamline processes and enhance efficiency.',
  },
  {
    id: 3,
    top: '19%',
    left: '41%',
    bgPos: '-1002px -80px',
    size: '708%',
    title: 'Market leadership and reputation',
    description:
      'We’re recognized as a leader in the UAE real estate industry with a proven track record.',
  },
  {
    id: 4,
    top: '62%',
    left: '54%',
    bgPos: '-1308px -607px',
    size: '669%',
    title: 'Commitment to corporate social responsibility',
    description:
      'We actively support social causes and sustainability programs to give back to the community.',
  },
  {
    id: 5,
    top: '57.5%',
    left: '76%',
    bgPos: '-2162px -697px',
    size: '687%',
    title: 'Incentives and rewards',
    description:
      'We believe in recognizing and rewarding exceptional performance with tangible benefits.',
  },
  {
    id: 6,
    top: '27%',
    left: '80.5%',
    bgPos: '-2394px -86px',
    size: '711%',
    title: 'Team collaboration and support',
    description:
      'We foster a collaborative environment where everyone’s input is valued.',
  },
];

export default function CareerJourney() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative w-full px-4 py-16 overflow-hidden bg-white">
      <div className="relative max-w-[1320px] mx-auto z-10 mb-10">
        <h2
          className={`uppercase text-[#2C2D65] text-[32px] leading-[53px] ${poppins.className}`}
        >
          A Rewarding Career{' '}
          <span
            className={`${BrittanySignature.className} text-orange-600 capitalize`}
          >
            Journey
          </span>
        </h2>
        <p
          className={`text-gray-700 mt-4 text-[18px] leading-[30px] ${poppins.className}`}
        >
          Be part of a rewarding career journey with Property Shop Investment,
          where you can grow professionally, contribute to a thriving industry,
          and make a lasting impact in one of the top flourishing countries in
          the world (UAE).
        </p>
      </div>
      <div className="relative w-full h-[300px] md:h-[600px]">
        <Image
          src="/images/career/careers-roadmap.svg"
          alt="Career Journey Roadmap"
          fill
          className="object-contain"
        />
 <div className="hidden md:block">
        {hoverSteps.map((step) => (
          <div
            key={step.id}
            className="absolute"
            style={{ top: step.top, left: step.left }}
            onMouseEnter={() => setHovered(step.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {hovered === step.id && (
              <div
                className="absolute z-20 w-[450px] h-[450px] rounded-full border-[4px] border-[#E35F27] bg-white transition-all duration-500 p-8 flex flex-col justify-center shadow-[0px_10px_30px_rgba(0,0,0,0.12)]"
                style={{
                  top: '-250px',
                  left: '-200px',
                  backgroundImage: "url('/images/career/careers2.svg')",
                  backgroundPosition: step.bgPos,
                  backgroundSize: step.size,
                }}
              >
                <div className="flex items-start gap-2 mb-2 text-[#E35F27] text-lg">
                </div>
              </div>
            )}
            <div className="relative z-10 w-[69px] h-[69px] bg-white border-[2px] border-orange-500 rounded-full flex items-center justify-center text-xl font-bold text-[#2C2D65] shadow-md cursor-pointer">
              {String(step.id).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
