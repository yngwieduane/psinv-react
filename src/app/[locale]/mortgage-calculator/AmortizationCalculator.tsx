'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Chart, ArcElement, Tooltip } from 'chart.js';

Chart.register(ArcElement, Tooltip);

export default function AmortizationCalculator({ amount }: { amount: number }) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
const chartInstance = useRef<Chart | null>(null);


useEffect(() => {
  if (!chartRef.current) return;
  const ctx = chartRef.current.getContext('2d');
  if (!ctx) return;

  chartInstance.current = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Payment'],
      datasets: [
        {
          data: [100, 0],
          backgroundColor: ['#f0b647'],
          borderWidth: 0,
        },
      ],
    },
    options: {
      cutout: '80%',
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false },
      },
      animation: {
        animateRotate: true,
        duration: 1000,
        easing: 'easeOutCubic',
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });

  return () => {
    chartInstance.current?.destroy();
  };
}, []);

  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(25);
  const [earlyPayment, setEarlyPayment] = useState(0);
  const [madeAfterMonth, setMadeAfterMonth] = useState(0);

  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;

  const monthlyPayment = useMemo(() => {
    if (!loanAmount || !monthlyRate || !totalPayments) return 0;
    return (
      loanAmount * monthlyRate /
      (1 - Math.pow(1 + monthlyRate, -totalPayments))
    );
  }, [loanAmount, monthlyRate, totalPayments]);

  const totalCost = useMemo(() => {
    if (earlyPayment > 0 && madeAfterMonth > 0 && madeAfterMonth < totalPayments) {
      const remainingBalance = loanAmount * Math.pow(1 + monthlyRate, madeAfterMonth) - earlyPayment * (Math.pow(1 + monthlyRate, madeAfterMonth) - 1) / monthlyRate;
      const remainingPayments = Math.log(remainingBalance / (remainingBalance - monthlyPayment / monthlyRate)) / Math.log(1 + monthlyRate);
      return monthlyPayment * madeAfterMonth + earlyPayment + monthlyPayment * remainingPayments;
    }
    return monthlyPayment * totalPayments;
  }, [loanAmount, earlyPayment, madeAfterMonth, monthlyPayment, totalPayments, monthlyRate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-8 text-[#0c1356]">Amortization</h2>

          {/* Loan Amount */}
          <div className="mb-6">
  <label className="block text-gray-600 mb-2">Loan Amount</label>
  <div className="flex items-center gap-4">
    {/* Input Group */}
    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white-100 shrink-0 w-[260px]">
      <input
        type="number"
        value={loanAmount}
        onChange={(e) => setLoanAmount(+e.target.value)}
        className="w-full px-4 py-2 bg-white-100 border-none focus:outline-none text-right"
      />
      <span className="bg-white px-4 py-2 border-l border-gray-300 whitespace-nowrap">AED</span>
    </div>

    {/* Slider */}
    <div className="flex-1">
      <Slider
        min={100000}
        max={50000000}
        step={10000}
        value={loanAmount}
        onChange={(value) => setLoanAmount(Array.isArray(value) ? value[0] : value)}
        handleStyle={{
          backgroundColor: '#1953a2',
          borderColor: '#1953a2',
          width: 20,
          height: 20,
          marginTop: -8,
        }}
        trackStyle={{
          backgroundColor: '#1953a2',
          height: 4,
        }}
        railStyle={{
          backgroundColor: '#e5e7eb',
          height: 4,
        }}
      />
    </div>
  </div>
</div>
<div className="mb-6">
  <label className="block text-gray-600 mb-2">Loan Interest Rate</label>
  
  <div className="flex items-center gap-4">
    {/* Input Box */}
    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white-100 w-[260px] shrink-0">
      <input
        type="number"
        step="0.01"
        value={interestRate}
        onChange={(e) => setInterestRate(+e.target.value)}
        className="w-full px-4 py-2 bg-white-100 border-none focus:outline-none text-right"
      />
      <span className="bg-white px-4 py-2 border-l border-gray-300 whitespace-nowrap">%</span>
    </div>

    {/* Slider */}
    <div className="flex-1">
      <Slider
        min={1}
        max={15}
        step={0.1}
        value={interestRate}
        onChange={(value) => setInterestRate(Array.isArray(value) ? value[0] : value)}
        handleStyle={{
          backgroundColor: '#1953a2',
          borderColor: '#1953a2',
          width: 20,
          height: 20,
          marginTop: -8,
        }}
        trackStyle={{
          backgroundColor: '#1953a2',
          height: 4,
        }}
        railStyle={{
          backgroundColor: '#e5e7eb',
          height: 4,
        }}
      />
    </div>
  </div>
</div>


<div className="mb-6">
  <label className="block text-gray-600 mb-2">Loan Term Years</label>

  <div className="flex items-center gap-4">
    {/* Input Box */}
    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white-100 w-[260px] shrink-0">
      <input
        type="number"
        value={loanTerm}
        onChange={(e) => setLoanTerm(+e.target.value)}
        className="w-full px-4 py-2 bg-white-100 border-none focus:outline-none text-right"
      />
      <span className="bg-white px-4 py-2 border-l border-gray-300 whitespace-nowrap">yrs</span>
    </div>

    {/* Slider */}
    <div className="flex-1">
      <Slider
        min={1}
        max={30}
        value={loanTerm}
        onChange={(value) => setLoanTerm(Array.isArray(value) ? value[0] : value)}
        handleStyle={{
          backgroundColor: '#1953a2',
          borderColor: '#1953a2',
          width: 20,
          height: 20,
          marginTop: -8,
        }}
        trackStyle={{
          backgroundColor: '#1953a2',
          height: 4,
        }}
        railStyle={{
          backgroundColor: '#e5e7eb',
          height: 4,
        }}
      />
    </div>
  </div>
</div>


          {/* Early Payment Section */}
          <div className="mt-10">
            <p className="text-black font-bold mb-2">EARLY PAYMENT</p>
            <p className="text-gray-400 mb-4 text-sm">Effect of making a larger payment</p>

            <div className="mb-6">
  <label className="block text-gray-600 mb-2">Payment Amount</label>

  <div className="flex items-center gap-4">
    {/* Input Group */}
    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white-100 w-[260px] shrink-0">
      <input
        type="number"
        value={earlyPayment}
        onChange={(e) => setEarlyPayment(+e.target.value)}
        className="w-full px-4 py-2 bg-white-100 border-none focus:outline-none text-right"
      />
      <span className="bg-white px-4 py-2 border-l border-gray-300 whitespace-nowrap">AED</span>
    </div>

    {/* Slider */}
    <div className="flex-1">
      <Slider
        min={0}
        max={loanAmount}
        step={10000}
        value={earlyPayment}
        onChange={(value) => setEarlyPayment(Array.isArray(value) ? value[0] : value)}
        handleStyle={{
          backgroundColor: '#1953a2',
          borderColor: '#1953a2',
          width: 20,
          height: 20,
          marginTop: -8,
        }}
        trackStyle={{
          backgroundColor: '#1953a2',
          height: 4,
        }}
        railStyle={{
          backgroundColor: '#e5e7eb',
          height: 4,
        }}
      />
    </div>
  </div>
</div>


<div className="mb-6">
  <label className="block text-gray-600 mb-2">Made After Month</label>

  <div className="flex items-center gap-4">
    {/* Input Group */}
    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white-100 w-[260px] shrink-0">
      <input
        type="number"
        value={madeAfterMonth}
        onChange={(e) => setMadeAfterMonth(+e.target.value)}
        className="w-full px-4 py-2 bg-white-100 border-none focus:outline-none text-right"
      />
      <span className="px-4 text-gray-500 bg-white">months</span>
    </div>

    {/* Slider */}
    <div className="flex-1">
    <Slider
  min={0}
  max={totalPayments}
  value={madeAfterMonth}
  onChange={(value) => setMadeAfterMonth(Array.isArray(value) ? value[0] : value)}
  handleStyle={{
    backgroundColor: '#1953a2',
    borderColor: '#1953a2',
    width: 20,
    height: 20,
    marginTop: -8,
  }}
  trackStyle={{
    backgroundColor: '#1953a2',
    height: 4,
  }}
  railStyle={{
    backgroundColor: '#e5e7eb',
    height: 4,
  }}
/>
    </div>
  </div>
</div>
          </div>
        </div>
     {/* Right Side Results */}
     <div className="flex flex-col justify-center items-center bg-[#0c1356] text-white rounded-2xl p-6">
          {/* Monthly Payment Canvas */}
          <div className="relative w-[160px] h-[160px] md:w-[180px] md:h-[180px] mx-auto">
            <canvas ref={chartRef} className="w-full h-full" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <span className="text-2xl font-bold">{Math.round(monthlyPayment).toLocaleString()}</span>
              <span className="text-sm">AED</span>
            </div>
          </div>
          <p className="text-white-700 mt-5 text-2xl">Monthly Payment</p>
          {/* Yellow Section */}
          <div className="bg-yellow-400 rounded-2xl text-[#0c1356] py-6 w-full text-center mt-8">
            <div className="flex justify-between w-full text-center mb-8">
              <div className="flex-1">
                <p className="text-sm text-white-500">Monthly Amortization</p>
                <p className="text-2xl font-bold text-[#2B1362]">{Math.round(monthlyPayment).toLocaleString()} AED</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-white-500">Total Cost</p>
                <p className="text-2xl font-bold text-[#2B1362]">{Math.round(totalCost).toLocaleString()} AED</p>
              </div>
            </div>
            {/* Buttons */}
            <p className="font-semibold mb-3">Explore Properties</p>
            <button
                onClick={() => {
                  const minPrice = loanAmount;
                  const maxPrice = loanAmount + 200000;
                  const url = `http://localhost:3000/en/units?category=Buy&filter-price-from=${minPrice}&filter-price-to=${maxPrice}`;
                  window.location.href = url;
                }}
                className="bg-[#0c1356] text-white rounded-full px-6 py-2 hover:bg-blue-900 transition"
              >
                View Units
              </button>
            <br />
            <a href="#" className="bg-[#0c1356] text-white px-6 py-2 rounded-full inline-block mt-4 hover:bg-blue-800 transition">Get Pre-Approval</a>
          </div>
        </div>
      </div>
    </div>
  );
}
