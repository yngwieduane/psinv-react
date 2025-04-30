'use client';

import { useState, useRef, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
} from 'chart.js';

Chart.register(
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale
);


export default function RentVsBuyCalculator() {
  const [monthlyRent, setMonthlyRent] = useState(0);
  const [expectedLoan, setExpectedLoan] = useState(1000000);
  const [yearlyRentIncrease, setYearlyRentIncrease] = useState(5);
  const [loanTerm, setLoanTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(4.5);
  const [propertyPrice, setPropertyPrice] = useState(1000000);
  const [downpayment, setDownpayment] = useState(250000);
  const [dpPercentage, setDpPercentage] = useState(25);
  const [propertyAppreciation, setPropertyAppreciation] = useState(3);
  const [planYearsToLive, setPlanYearsToLive] = useState(10);

  const loanAmount = propertyPrice - downpayment;
  const monthlyInterest = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;

  const monthlyPayment = loanAmount > 0
    ? (loanAmount * monthlyInterest) / (1 - Math.pow(1 + monthlyInterest, -totalPayments))
    : 0;

  const totalRentAmount = monthlyRent * 12 * planYearsToLive;
  const totalBuyAmount = monthlyPayment * 12 * planYearsToLive + downpayment;

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
            data: [monthlyPayment, 10000 - monthlyPayment],
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
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [monthlyPayment]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-8 text-[#0c1356]">Rent vs Buying</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputSlider label="Current monthly rent" value={monthlyRent} setValue={setMonthlyRent} suffix="AED" min={0} max={50000} />
            <InputSlider label="Expected loan amount" value={expectedLoan} setValue={setExpectedLoan} suffix="AED" min={0} max={10000000} />
            <InputSlider label="Yearly rent increase in %" value={yearlyRentIncrease} setValue={setYearlyRentIncrease} suffix="%" min={0} max={20} />
            <InputSlider label="Loan term in years" value={loanTerm} setValue={setLoanTerm} suffix="yrs" min={1} max={30} />
            <InputSlider label="Loan interest rate in %" value={interestRate} setValue={setInterestRate} suffix="%" min={0} max={10} step={0.1} />
            <InputSlider label="Expected property price" value={propertyPrice} setValue={setPropertyPrice} suffix="AED" min={0} max={10000000} />
            <InputSlider label="Downpayment" value={downpayment} setValue={setDownpayment} suffix="AED" min={0} max={propertyPrice} />
            <InputSlider label="Downpayment %" value={dpPercentage} setValue={setDpPercentage} suffix="%" min={0} max={100} />
            <InputSlider label="Yearly property appreciation" value={propertyAppreciation} setValue={setPropertyAppreciation} suffix="%" min={0} max={10} />
            <InputSlider label="Plan years to live" value={planYearsToLive} setValue={setPlanYearsToLive} suffix="yrs" min={1} max={30} />
          </div>
        </div>

        {/* Result Panel */}
        <div className="flex flex-col justify-center items-center bg-[#0c1356] text-white rounded-2xl p-6">
          <div className="relative w-[160px] h-[160px] md:w-[180px] md:h-[180px] mx-auto mb-6">
            <canvas ref={chartRef} className="w-full h-full" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <span className="text-2xl font-bold">{Math.round(monthlyPayment).toLocaleString()}</span>
              <span className="text-sm">AED</span>
            </div>
          </div>
          <p className="text-xl font-semibold mt-2 mb-6">Monthly Payment</p>

          <div className="bg-yellow-400 rounded-2xl w-full text-[#0c1356] p-8 text-center">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-sm">Total Rent Amount</p>
                <p className="text-2xl font-bold">{Math.round(totalRentAmount).toLocaleString()} AED</p>
              </div>
              <div>
                <p className="text-sm">Total Buy Amount</p>
                <p className="text-2xl font-bold">{Math.round(totalBuyAmount).toLocaleString()} AED</p>
              </div>
            </div>
            <button
  onClick={() => {
    const minPrice = Math.floor(propertyPrice);
    const maxPrice = Math.ceil(propertyPrice + 200000); // buffer range
    const url = `${window.location.origin}/en/units?category=Buy&filter-price-from=${minPrice}&filter-price-to=${maxPrice}`;
    window.location.href = url;
  }}
  className="bg-[#0c1356] text-white px-6 py-2 rounded-full inline-block hover:bg-blue-800 transition mb-2"
>
  View Sale Units
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
      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white w-full mb-2">
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
  );
}
