'use client';

import dynamic from 'next/dynamic';

const CalculatorLoader = () => (
  <div className="h-64 animate-pulse bg-gray-200 rounded"></div>
);

const Calculator = dynamic(() => import('../mortgage-calculator/MortgageTabs'), { ssr: false, loading: CalculatorLoader });

const HomeCalculatorClientWrapper = () => {
  return (
    <>
      <div className="container mx-auto my-10">
        <Calculator />
      </div>
    </>
  );
};

export default HomeCalculatorClientWrapper;