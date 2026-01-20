//dynamic import without ssr for better performance

'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const CalculatorLoader = () => (
  <div className="h-64 animate-pulse bg-gray-200 rounded"></div>
);

const Calculator = dynamic(() => import('../mortgage-calculator/MortgageTabs'), { ssr: false, loading: CalculatorLoader });

export const HomeCalculatorClientWrapper: React.FC = () => {
  return (
    <>
      <div className="container mx-auto my-10">
        <Calculator />
      </div>
    </>
  );
};


//Cities Tab
const CitiesLoader = () => (
  <div className="h-64 animate-pulse bg-gray-200 rounded"></div>
);
const Cities = dynamic(() => import('./CitiesTab'), { ssr: false, loading: CitiesLoader });

interface City {
  id: string;
  title: string;
  title_ar?: string;
  content: string;
  image: string;
  projects: {
    image: string;
    title: string;
    title_ar?: string;
    type: string;
    project_url: string;
  }[];
}

interface CitiesClientWrapperProps {
  cities: City[];
}

export const CitiesClientWrapper: React.FC<CitiesClientWrapperProps> = ({cities}) => {
    return(
        <>
        <div className='container mx-auto my-10'>
            <Cities cities={cities} />
        </div>
        </>
    )
}
