'use client';

import { useState } from 'react';

export default function PriceRangeSlider() {
  const min = 500000;
  const max = 25000000;

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const getPercent = (value: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 10000);
    setMinVal(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 10000);
    setMaxVal(value);
  };

  const handleReset = () => {
    setMinVal(min);
    setMaxVal(max);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value);
  };

  return (
    <div className="p-6 border rounded-md max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <p className="font-medium">Price</p>
        <button
          onClick={handleReset}
          className="text-blue-600 text-sm underline"
        >
          Reset
        </button>
      </div>

      {/* Slider container */}
      <div className="relative w-full">
        {/* Track */}
        <div className="relative h-2 bg-blue-100 rounded">
          <div
            className="absolute h-2 bg-blue-500 rounded"
            style={{
              left: `${getPercent(minVal)}%`,
              width: `${getPercent(maxVal) - getPercent(minVal)}%`,
            }}
          />
        </div>

        {/* Left thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={10000}
          value={minVal}
          onChange={handleMinChange}
          className="absolute top-0 left-0 w-full pointer-events-auto appearance-none bg-transparent"
        />

        {/* Right thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={10000}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute top-0 left-0 w-full pointer-events-auto appearance-none bg-transparent"
        />
      </div>

      {/* Input fields */}
      <div className="flex gap-4 mt-4">
        <input
          type="text"
          value={formatNumber(minVal)}
          onChange={(e) => {
            const val = Number(e.target.value.replace(/,/g, ''));
            if (!isNaN(val) && val <= maxVal && val >= min) {
              setMinVal(val);
            }
          }}
          className="w-full border rounded px-3 py-2 text-center"
        />
        <input
          type="text"
          value={formatNumber(maxVal)}
          onChange={(e) => {
            const val = Number(e.target.value.replace(/,/g, ''));
            if (!isNaN(val) && val >= minVal && val <= max) {
              setMaxVal(val);
            }
          }}
          className="w-full border rounded px-3 py-2 text-center"
        />
      </div>
    </div>
  );
}