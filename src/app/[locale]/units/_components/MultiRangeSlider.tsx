'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import './multiRangeSlider.css';
import { useDebouncedCallback } from 'use-debounce';

type MultiRangeSliderProps = {
  min: number;
  max: number;
  onChange: (value: { min: number; max: number }) => void;
};

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({ min, max, onChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const minValRef = useRef<number>(min);
  const maxValRef = useRef<number>(max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Update left side of range
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Update right side of range
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  const updateQuery = useDebouncedCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    console.log(key + " = " + value );
    router.push(`${pathname}?${params.toString()}`);
  },300);
  // Emit value changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  const formatNumber = (value: number) => new Intl.NumberFormat().format(value);
  return (
    <div className="w-full relative">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
          updateQuery('minPrice',minVal.toString());
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 ? '5' : '1' }}
      />

      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
          maxValRef.current = value;
          updateQuery('maxPrice',maxVal.toString());
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value hidden">{minVal}</div>
        <div className="slider__right-value hidden">{maxVal}</div>
      </div>
      <div className="flex gap-4 mt-5">
          <input
              type="text"
              value={formatNumber(minVal)}
              onChange={(e) => {
              const val = Number(e.target.value.replace(/,/g, ''));
              setMinVal(val);
              updateQuery('minPrice',minVal.toString());
              }}
              className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-lg"
          />
          <input
              type="text"
              value={formatNumber(maxVal)}
              onChange={(e) => {
              const val = Number(e.target.value.replace(/,/g, ''));
              setMaxVal(val);
              updateQuery('maxPrice',maxVal.toString());
              }}
              className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 text-lg"
          />
      </div>
    </div>
  );
};

export default MultiRangeSlider;