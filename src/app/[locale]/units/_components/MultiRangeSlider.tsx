'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import './multiRangeSlider.css';

type MultiRangeSliderProps = {
  min: number;
  max: number;
  minVal: number;
  maxVal: number;
  onChange: (value: { min: number; max: number }) => void;
  onAfterChange?: (value: { min: number; max: number }) => void;
};

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({
  min,
  max,
  minVal,
  maxVal,
  onChange,
  onAfterChange
}) => {
  const minValRef = useRef<number>(minVal);
  const maxValRef = useRef<number>(maxVal);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => {
      const percent = Math.round(((value - min) / (max - min)) * 100);
      return Math.max(0, Math.min(100, percent));
    },
    [min, max]
  );

  // Sync refs with props
  useEffect(() => {
    minValRef.current = minVal;
    maxValRef.current = maxVal;
  }, [minVal, maxVal]);

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

  const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

  return (
    <div className="w-full relative px-2 mb-8">
      {/* Slider inputs */}
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          onChange({ min: value, max: maxVal });
        }}
        onMouseUp={() => onAfterChange?.({ min: minVal, max: maxVal })}
        onTouchEnd={() => onAfterChange?.({ min: minVal, max: maxVal })}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 ? '5' : '3' }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          onChange({ min: minVal, max: value });
        }}
        onMouseUp={() => onAfterChange?.({ min: minVal, max: maxVal })}
        onTouchEnd={() => onAfterChange?.({ min: minVal, max: maxVal })}
        className="thumb thumb--right"
      />

      {/* Visual track */}
      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>

      {/* Inputs below */}
      <div className="flex gap-4 mt-8">
        <input
          type="text"
          value={formatNumber(minVal)}
          onChange={(e) => {
            const val = Number(e.target.value.replace(/,/g, ''));
            if (!isNaN(val)) {
              onChange({ min: val, max: maxVal });
            }
          }}
          onBlur={() => {
            let val = minVal;
            if (val < min) val = min;
            if (val > maxVal) val = maxVal;
            if (val !== minVal) onChange({ min: val, max: maxVal });
            onAfterChange?.({ min: val, max: maxVal });
          }}
          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-lg text-gray-900 focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c] outline-none transition-all dark:bg-gray-800 dark:text-white dark:border-gray-700 "
        />
        <input
          type="text"
          value={formatNumber(maxVal)}
          onChange={(e) => {
            const val = Number(e.target.value.replace(/,/g, ''));
            if (!isNaN(val)) {
              onChange({ min: minVal, max: val });
            }
          }}
          onBlur={() => {
            let val = maxVal;
            if (val > max) val = max;
            if (val < minVal) val = minVal;
            if (val !== maxVal) onChange({ min: minVal, max: val });
            onAfterChange?.({ min: minVal, max: val });
          }}
          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-lg text-gray-900 focus:border-[#005a9c] focus:ring-1 focus:ring-[#005a9c] outline-none transition-all dark:bg-gray-800 dark:text-white dark:border-gray-700 "
        />
      </div>
    </div>
  );
};

export default MultiRangeSlider;