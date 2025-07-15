'use client';

import { useState, useEffect, useRef } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Chart, ArcElement, Tooltip } from 'chart.js';

Chart.register(ArcElement, Tooltip);

export default function HouseAffordabilityCalculator() {
  const [grossIncome, setGrossIncome] = useState(5000);
  const [extraIncome, setExtraIncome] = useState(0);
  const [debtRepayment, setDebtRepayment] = useState(0);
  const [downPayment, setDownPayment] = useState(20000);
  const [downPaymentPct, setDownPaymentPct] = useState(2);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTermYears, setLoanTermYears] = useState(5);

  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;

  const maxPayment28 = (grossIncome + extraIncome) * 0.28;
  const maxPayment36 = (grossIncome + extraIncome) * 0.36 - debtRepayment;
  const maxMonthlyPayment = Math.min(maxPayment28, maxPayment36);

  function presentValue(rate: number, nper: number, pmt: number): number {
    if (rate === 0) return -(pmt * nper);
    return -(pmt * (1 - Math.pow(1 + rate, -nper))) / rate;
  }

  const affordableMortgage = Math.abs(presentValue(monthlyRate, numberOfPayments, maxMonthlyPayment));
  const totalAfford = affordableMortgage + downPayment;

  useEffect(() => {
    const totalPotentialPrice = totalAfford || 1;
    const pct = (downPayment / totalPotentialPrice) * 100;
    setDownPaymentPct(parseFloat(pct.toFixed(1)));
  }, [downPayment, totalAfford]);

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: [100],
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
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [totalAfford]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-8 text-[#0c1356]">House Affordability</h2>

          <div className="grid grid-cols-1 gap-4">
            <InputSlider label="Gross Monthly Income" value={grossIncome} setValue={setGrossIncome} suffix="AED" min={0} max={100000} />
            <InputSlider label="Extra Monthly Income" value={extraIncome} setValue={setExtraIncome} suffix="AED" min={0} max={100000} />
            <InputSlider label="Monthly Debt Repayment" value={debtRepayment} setValue={setDebtRepayment} suffix="AED" min={0} max={100000} />

            <div className="mb-6 w-full">
              <label className="block text-gray-600 mb-2 text-sm">Downpayment</label>
              <div className="flex items-center gap-5">
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white mb-2">
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(+e.target.value)}
                  className="w-full px-4 py-2 bg-white border-none focus:outline-none text-right"
                />
                <input
                  type="number"
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(+e.target.value)}
                  className="w-20 px-4 py-2 bg-white border-l border-gray-300 focus:outline-none text-right"
                />
                <span className="px-4 py-2 border-l border-gray-300">%</span>
              </div>
              <Slider
                min={0}
                max={1000000}
                value={downPayment}
                onChange={(val) => setDownPayment(Array.isArray(val) ? val[0] : val)}
                handleStyle={{ backgroundColor: '#1953a2', borderColor: '#1953a2', width: 20, height: 20, marginTop: -8 }}
                trackStyle={{ backgroundColor: '#1953a2', height: 4 }}
                railStyle={{ backgroundColor: '#e5e7eb', height: 4 }}
              />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <InputSlider label="Interest Rate" value={interestRate} setValue={setInterestRate} suffix="%" min={0} max={10} step={0.1} />
              <InputSlider label="Payment Period" value={loanTermYears} setValue={setLoanTermYears} suffix="yrs" min={1} max={30} />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-[#0c1356] text-white rounded-2xl p-6">
          <div className="relative w-[160px] h-[160px] md:w-[180px] md:h-[180px] mx-auto mb-6">
            <canvas ref={chartRef} className="w-full h-full" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <span className="text-2xl font-bold">{Math.round(totalAfford).toLocaleString()}</span>
              <span className="text-sm">AED</span>
            </div>
          </div>
          <p className="text-xl font-semibold mt-2 mb-6">Can Afford</p>

          <div className="bg-yellow-400 rounded-2xl w-full text-[#0c1356] p-8 text-center">
            <p className="text-sm">Total Afford</p>
            <p className="text-2xl font-bold mb-4">{Math.round(totalAfford).toLocaleString()} AED</p>
            <button
  onClick={() => {
    const minPrice = Math.floor(totalAfford);
    const maxPrice = Math.ceil(totalAfford + 200000);
    const url = `http://localhost:3000/en/units?category=Buy&filter-price-from=${minPrice}&filter-price-to=${maxPrice}`;
    window.location.href = url;
  }}
  className="bg-[#0c1356] text-white rounded-full px-6 py-2 hover:bg-blue-900 transition"
>
  View Units
</button>

            <br />
            <a href="#" className="bg-[#0c1356] text-white px-6 py-2 rounded-full inline-block hover:bg-blue-800 transition">Get pre-approval today</a>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InputSliderProps {
  label: string;
  value: number;
  setValue: (val: number) => void;
  suffix: string;
  min: number;
  max: number;
  step?: number;
}

function InputSlider({ label, value, setValue, suffix, min, max, step = 1 }: InputSliderProps) {
  return (
    <div className="mb-6 w-full">
      <label className="block text-gray-600 mb-2 text-sm">{label}</label>
      <div className="flex items-center gap-5">
        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white flex-grow">
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(+e.target.value)}
            className="w-full px-4 py-2 bg-white border-none focus:outline-none text-right"
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
        trackStyle={{ backgroundColor: '#1953a2', height: 4 }}
        railStyle={{ backgroundColor: '#e5e7eb', height: 4 }}
      />
      </div>
    </div>
  );
}
