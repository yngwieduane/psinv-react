'use client';

import { useState, useRef, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Chart, ArcElement, Tooltip } from 'chart.js';

Chart.register(ArcElement, Tooltip);

export default function RefinancingCalculator() {
  const [currentLoanBalance, setCurrentLoanBalance] = useState(2000000);
  const [currentMonthlyPayments, setCurrentMonthlyPayments] = useState(0);
  const [earlySettlementFees, setEarlySettlementFees] = useState(40000);
  const [percentage, setPercentage] = useState(2);
  const [currentLoanInterestRate, setCurrentLoanInterestRate] = useState(4.5);

  const [currentPropertyValue, setCurrentPropertyValue] = useState(1003000);
  const [currentEstimated, setCurrentEstimated] = useState(400000);
  const [termOfNewLoan, setTermOfNewLoan] = useState(10);
  const [feesToObtainNewLoan, setFeesToObtainNewLoan] = useState(10000);
  const [newLoanPercentage, setNewLoanPercentage] = useState(3);
  const [newLoanInterestRate, setNewLoanInterestRate] = useState(2);

  const newLoanAmount = currentPropertyValue - currentEstimated + feesToObtainNewLoan;
  const mortgageCost = currentLoanBalance + earlySettlementFees;

  const refinanceMonthlyPayment = newLoanAmount * (newLoanInterestRate / 100 / 12) / 
    (1 - Math.pow(1 + (newLoanInterestRate / 100 / 12), -(termOfNewLoan * 12)));

  const oldMonthlyPayment = currentMonthlyPayments > 0 ? currentMonthlyPayments : 
    (currentLoanBalance * (currentLoanInterestRate / 100 / 12)) /
    (1 - Math.pow(1 + (currentLoanInterestRate / 100 / 12), -(termOfNewLoan * 12)));

  const payDiff = oldMonthlyPayment - refinanceMonthlyPayment;
  const breakMonth = payDiff !== 0 ? Math.round(mortgageCost / payDiff) : 0;

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;
  
    if (chartInstance.current) {
      chartInstance.current.data.datasets[0].data = [100, 0];
      chartInstance.current.update();
      return;
    }
  
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Payment'],
        datasets: [
          {
            data: [100, 0],
            backgroundColor: ['#f0b647', '#eeeeee'],
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
  }, [refinanceMonthlyPayment]); 
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-8 text-[#0c1356]">Refinancing</h2>

          {/* Mortgage Information */}
          <p className="text-lg font-semibold mb-4">Mortgage Information</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputSlider label="Current loan balance" value={currentLoanBalance} setValue={setCurrentLoanBalance} suffix="AED" min={0} max={10000000} />
            <InputSlider label="Current monthly payments" value={currentMonthlyPayments} setValue={setCurrentMonthlyPayments} suffix="AED" min={0} max={1000000} />
            <InputSlider label="Early settlement fees" value={earlySettlementFees} setValue={setEarlySettlementFees} suffix="AED" min={0} max={500000} />
            <InputSlider label="Percentage" value={percentage} setValue={setPercentage} suffix="%" min={0} max={10} step={0.1} />
            <InputSlider label="Current loan interest rate in %" value={currentLoanInterestRate} setValue={setCurrentLoanInterestRate} suffix="%" min={0} max={10} step={0.1} />
          </div>

          {/* Refinance Information */}
          <p className="text-lg font-semibold mt-8 mb-4">Refinance Information</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputSlider label="Current property value" value={currentPropertyValue} setValue={setCurrentPropertyValue} suffix="AED" min={0} max={10000000} />
            <InputSlider label="Current estimated" value={currentEstimated} setValue={setCurrentEstimated} suffix="AED" min={0} max={10000000} />
            <InputSlider label="Term of new loan" value={termOfNewLoan} setValue={setTermOfNewLoan} suffix="yrs" min={1} max={30} />
            <InputSlider label="Fees to obtain new loan" value={feesToObtainNewLoan} setValue={setFeesToObtainNewLoan} suffix="AED" min={0} max={500000} />
            <InputSlider label="Percentage" value={newLoanPercentage} setValue={setNewLoanPercentage} suffix="%" min={0} max={10} step={0.1} />
            <InputSlider label="Interest rate of the new loan in %" value={newLoanInterestRate} setValue={setNewLoanInterestRate} suffix="%" min={0} max={10} step={0.1} />
          </div>
        </div>

        {/* Right Result Panel */}
        <div className="flex flex-col justify-center items-center bg-[#0c1356] text-white rounded-2xl p-6">
          {/* Monthly Payment Canvas */}
          <div className="relative w-[160px] h-[160px] md:w-[180px] md:h-[180px] mx-auto mb-6">
            <canvas ref={chartRef} className="w-full h-full" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <span className="text-2xl font-bold">{Math.round(refinanceMonthlyPayment).toLocaleString()}</span>
              <span className="text-sm">AED</span>
            </div>
          </div>
          <p className="text-xl font-semibold mt-2 mb-6 text-white">Monthly Payment</p>

          {/* Yellow Section */}
          <div className="bg-yellow-400 rounded-2xl w-full text-[#0c1356] p-8 text-center">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-sm">Mortgage Cost</p>
                <p className="text-2xl font-bold">{Math.round(mortgageCost).toLocaleString()} AED</p>
              </div>
              <div>
                <p className="text-sm">Monthly Pay</p>
                <p className="text-2xl font-bold">{Math.round(oldMonthlyPayment).toLocaleString()} AED</p>
              </div>
              <div>
                <p className="text-sm">Pay Diff</p>
                <p className="text-2xl font-bold">{Math.round(payDiff).toLocaleString()} AED</p>
              </div>
              <div>
                <p className="text-sm">Refinance Pay</p>
                <p className="text-2xl font-bold">{Math.round(refinanceMonthlyPayment).toLocaleString()} AED</p>
              </div>
            </div>
            <p className="text-sm">Break Month</p>
            <p className="text-2xl font-bold mb-4">{isFinite(breakMonth) ? breakMonth : 0} month(s)</p>
            <button
  onClick={() => {
    const minPrice = Math.floor(newLoanAmount);
    const maxPrice = Math.ceil(newLoanAmount + 200000);
    const url = `http://localhost:3000/en/units?category=Buy&filter-price-from=${minPrice}&filter-price-to=${maxPrice}`;
    window.location.href = url;
  }}
  className="bg-[#0c1356] text-white px-6 py-2 rounded-full inline-block hover:bg-blue-800 transition mb-2"
>
  View Units
</button>

            <br />
            <a href="#" className="bg-[#0c1356] text-white px-6 py-2 rounded-full inline-block hover:bg-blue-800 transition">Get Pre-Approval</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputSlider({ label, value, setValue, suffix, min, max, step = 1 }: {
  label: string;
  value: number;
  setValue: (val: number) => void;
  suffix: string;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <div className="mb-6">
      <label className="block text-gray-600 mb-2 text-sm">{label}</label>
      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white-100 w-full mb-2">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(+e.target.value)}
          className="w-full px-4 py-2 bg-white-100 border-none focus:outline-none text-right"
        />
        <span className="bg-white px-4 py-2 border-l border-gray-300 whitespace-nowrap">{suffix}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(val) => setValue(Array.isArray(val) ? val[0] : val)}
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
  );
}
