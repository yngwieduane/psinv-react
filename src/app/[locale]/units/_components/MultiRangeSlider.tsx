'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import './multiRangeSlider.css';

type MultiRangeSliderProps = {
  min: number;
  max: number;
  onChange: (value: { min: number; max: number }) => void;
};

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({ min, max, onChange }) => {
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

  // Emit value changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

  return (
    <div className="w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
          minValRef.current = value;
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
        }}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value hidden">{minVal}</div>
        <div className="slider__right-value hidden">{maxVal}</div>
        <div className="flex gap-4 mt-5">
            <input
                type="text"
                value={formatNumber(minVal)}
                disabled={true}
                onChange={(e) => {
                const val = Number(e.target.value.replace(/,/g, ''));
                //updateQuery('minPrice', e.target.value.replace(/,/g, '').toString());
                }}
                className="w-full border rounded px-3 py-2 text-center"
            />
            <input
                type="text"
                value={formatNumber(maxVal)}
                disabled={true}
                onChange={(e) => {
                const val = Number(e.target.value.replace(/,/g, ''));
                //updateQuery('maxPrice', e.target.value.replace(/,/g, '').toString());
                }}
                className="w-full border rounded px-3 py-2 text-center"
            />
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;