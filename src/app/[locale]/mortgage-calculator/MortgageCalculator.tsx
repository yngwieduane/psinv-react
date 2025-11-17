'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Chart, ArcElement, Tooltip, DoughnutController } from 'chart.js';
import InquiryForm from '../_components/InquiryForm';
import PopupForm from '../_components/PopupForm';

Chart.register(ArcElement, Tooltip, DoughnutController);

export default function MortgageCalculator(props:any) {

  const baseprice = props.baseprice ?? 1000000;

  const [propertyPrice, setPropertyPrice] = useState(baseprice);
  const [loanTerm, setLoanTerm] = useState(25);
  const [downPayment, setDownPayment] = useState(250000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const loanAmount = propertyPrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTerm * 12;

  const monthlyPayment = useMemo(() => {
    if (!loanAmount || !monthlyRate || !totalPayments) return 0;
    return (
      loanAmount * monthlyRate /
      (1 - Math.pow(1 + monthlyRate, -totalPayments))
    );
  }, [loanAmount, monthlyRate, totalPayments]);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Downpayment', 'Loan'],
        datasets: [
          {
            data: [downPayment, loanAmount],
            backgroundColor: ['#f0b647', '#8b6bd2'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        animation: {
          animateRotate: true,
          duration: 1000,
          easing: 'easeOutCubic',
        },
        cutout: '75%',
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${(context.raw as number).toLocaleString()} AED`;
              },
            },
          },
          legend: {
            position: 'bottom',
            labels: {
              color: '#fff'
            }
          }
        },
        responsive: true,
        maintainAspectRatio: true
      },
    });

    return () => chart.destroy();
  }, [downPayment, loanAmount]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'auto';
  }, [isModalOpen]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-center">Mortgage Calculator</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Property Price (AED)</label>
              <div className='flex items-center gap-2'>
                <div className="flex w-full items-center gap-0 rounded-[12px] border border-gray-300 overflow-hidden">
                  <input
                    type="number"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(+e.target.value)}
                    className="w-full px-4 py-2 rounded-none focus:outline-none"
                    aria-label="Property Price"
                  />
                  <span className="bg-white px-4 py-2 border-l border-gray-300 whitespace-nowrap">AED</span>
                </div>
                <Slider
                  ariaLabelForHandle="Property Price"
                  min={100000}
                  max={50000000}
                  step={10000}
                  value={propertyPrice}
                  onChange={(value) => setPropertyPrice(Array.isArray(value) ? value[0] : value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Loan Period (Years)</label>
              <div className='flex items-center gap-2'>
                <div className="flex w-full items-center gap-0 rounded-[12px] border border-gray-300 overflow-hidden">
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(+e.target.value)}
                    className="w-full px-4 py-2 rounded-none focus:outline-none"
                    aria-label="Loan Period"
                  />
                  <span className="bg-white px-4 py-2 border-l border-gray-300 whitespace-nowrap">Years</span>
                </div>
                <Slider
                  ariaLabelForHandle="Loan Period"
                  min={1}
                  max={30}
                  value={loanTerm}
                  onChange={(value) => setLoanTerm(Array.isArray(value) ? value[0] : value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Downpayment (AED)</label>
              <div className='flex items-center gap-2'>
                <div className="flex w-full items-center gap-0 rounded-[12px] border border-gray-300 overflow-hidden">
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(+e.target.value)}
                    className="w-full px-4 py-2 rounded-none focus:outline-none"
                    aria-label="Downpayment"
                  />
                  <span className="bg-white px-4 py-2 border-l border-gray-300 whitespace-nowrap">{((downPayment / propertyPrice) * 100).toFixed(0)}%</span>
                </div>
                <Slider
                  ariaLabelForHandle="Downpayment"
                  min={0}
                  max={propertyPrice}
                  step={10000}
                  value={downPayment}
                  onChange={(value) => setDownPayment(Array.isArray(value) ? value[0] : value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
              <div className="flex items-center gap-2">
                <div className="flex w-full items-center gap-0 rounded-[12px] border border-gray-300 overflow-hidden">
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(+e.target.value)}
                    className="w-full px-4 py-2 rounded-none focus:outline-none"
                    aria-label="Interest Rate"
                  />
                  <span className="bg-white px-4 py-2 border-l border-gray-300 whitespace-nowrap">%</span>
                </div>
                <Slider
                  ariaLabelForHandle="Interest Rate"
                  min={1}
                  max={15}
                  step={0.1}
                  value={interestRate}
                  onChange={(value) => setInterestRate(Array.isArray(value) ? value[0] : value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0c1356] text-white rounded-xl p-6 flex flex-col justify-center items-center">
          <div className="relative w-[160px] h-[160px] md:w-[180px] md:h-[180px]">
            <canvas ref={chartRef} className="w-full h-full" />
          </div>
          <div className="text-center mt-6">
            <div className="text-3xl font-bold mb-1">{Math.round(monthlyPayment).toLocaleString()} AED</div>
            <p className="text-sm">Monthly Payment</p>
          </div>
          <div className="mt-8 bg-[#f0b647] text-[#0c1356] rounded-lg py-3 px-6 w-full text-center">
            <p className="text-sm">Total Loan Amount</p>
            <p className="text-lg font-semibold">{loanAmount.toLocaleString()} AED</p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  const minPrice = propertyPrice;
                  const maxPrice = propertyPrice + 200000;
                  const url = `http://localhost:3000/en/units?category=Buy&filter-price-from=${minPrice}&filter-price-to=${maxPrice}`;
                  window.location.href = url;
                }}
                className="bg-[#0c1356] relative overflow-hidden rounded-full px-5 py-2.5 text-white transition-all duration-300 hover:bg-[#0c1356] hover:ring-2 hover:ring-[#0c1356] hover:ring-offset-2 cursor-pointer"
              >
                View Units
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#0c1356] relative overflow-hidden rounded-full px-5 py-2.5 text-white transition-all duration-300 hover:bg-[#0c1356] hover:ring-2 hover:ring-[#0c1356] hover:ring-offset-2 cursor-pointer"
              >
                Get pre-approval today
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-black"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold text-center mb-4 text-purple-800 ">Register Your Interest</h2>
            <PopupForm />
          </div>
        </div>
      )}
    </>
  );
}
