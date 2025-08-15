'use client';

import React, { useState, useEffect } from 'react';
import PropertySelector from './PropertySelector';
import { useWalkinForm } from '@/context/WalkinFormContext';
import { bedroomOptions } from '@/utils/constants';
import { Montserrat, Open_Sans } from "next/font/google";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

type BudgetOption = { value: number; label: string };

export function Services({ validationErrors }: { validationErrors?: Record<string, string[]> }) {
  const { data, updateForm } = useWalkinForm();
  const [budgetOptions, setBudgetOptions] = useState<BudgetOption[]>([]);

  const generateBudgetRange = (
    start = 1_000_000,
    end = 10_000_000,
    step = 50_000
  ): BudgetOption[] => {
    const options: BudgetOption[] = [];
    for (let value = start; value <= end; value += step) {
      options.push({ value, label: value.toLocaleString() });
    }
    return options;
  };

  useEffect(() => {
    if (data.requirementType && data.unitType) {
      const budgets = generateBudgetRange();
      setBudgetOptions(budgets);
      updateForm({ minBudget: undefined, maxBudget: undefined });
    }
  }, [data.requirementType, data.unitType]);

  const filteredMaxOptions = budgetOptions.filter((b) =>
    typeof data.minBudget === 'number' ? b.value >= data.minBudget : true
  );

  return (
    <section className="space-y-6">
      <h2 className={`text-[24px] font-bold text-[#E0592A] pb-2 ${montserrat.className}`}>Services</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Service Selection */}
      <select
       id="selectedService"
        value={data.selectedService || ''}
        onChange={(e) =>
          updateForm({
            selectedService: e.target.value,
            requirementType: undefined,
            unitCategory: undefined,
            unitType: undefined,
            bedroom: undefined,
            minBudget: undefined,
            maxBudget: undefined,
          })
        }
        className="border border-gray-300 px-3 py-2 rounded w-full"
      >
        <option value="">Select Services</option>
        <option value="Sales">Sales</option>
        <option value="Lease">Lease</option>
      </select>
</div>
      {/* Requirement Type */}
      {data.selectedService && (
        <div>
          <p className='block text-sm font-medium mb-2'>Are you a:</p>
          {(data.selectedService === 'Sales'
            ? ['Buyer', 'Landlord']
            : ['Tenant', 'Landlord']
          ).map((type, index) => (
            <label key={type} className="mr-4">
              <input
                type="radio"
                name="reqType"
                value={type}
                id={index === 0 ? 'reqType' : undefined}
                checked={data.requirementType === type}
                onChange={() => updateForm({ requirementType: type })}
              />{' '}
              {type}
            </label>
          ))}
        </div>
      )}

      {/* Unit Category */}
      {data.requirementType && (
        <div>
          <p className='block text-sm font-medium mb-2'>Are you looking for:</p>
          <label className="mr-4">
            <input
              id="unitCategory"
              type="radio"
              name="unitCategory"
              value="Residential"
              checked={data.unitCategory === 'Residential'}
              onChange={() =>
                updateForm({ unitCategory: 'Residential', unitType: undefined, bedroom: undefined })
              }
            />{' '}
            Residential
          </label>
          <label>
            <input
              type="radio"
              name="unitCategory"
              value="Commercial"
              checked={data.unitCategory === 'Commercial'}
              onChange={() =>
                updateForm({ unitCategory: 'Commercial', unitType: undefined, bedroom: undefined })
              }
            />{' '}
            Commercial
          </label>
        </div>
      )}

      {/* Unit Type */}
      {data.unitCategory && (
        <div className="mt-4">
          <p className="font-medium">Unit Type:</p>
          <div className="flex flex-wrap gap-4 mt-2">
            {(data.unitCategory === 'Residential'
              ? ['Apartment', 'Townhouse', 'Villa', 'Penthouse']
              : ['Lands/Plot', 'Office', 'Retail', 'Warehouse']
            ).map((type, index) => (
              <label key={type} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="unitType"
                  value={type}
                  id={index === 0 ? 'unitType' : undefined}
                  checked={data.unitType === type}
                  onChange={() => updateForm({ unitType: type })}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Bedrooms */}
      {data.unitCategory === 'Residential' && (
        <div className="mt-6">
          <p className='block text-sm font-medium mb-2'>No of Bedrooms:</p>
          <div className="flex flex-wrap gap-6 mt-2">
            {Object.entries(bedroomOptions).map(([id, label], index) => (
              <label key={id} className="flex items-center gap-2 text-sm text-gray-800">
                <input
                  type="radio"
                  name="bedroom"
                  value={id}
                  id={index === 0 ? 'bedroom' : undefined}
                  checked={data.bedroom === id}
                  onChange={() => updateForm({ bedroom: id })}
                  className="accent-blue-600"
                />
                {label === 'Studio' ? 'Studio' : `${label} Bedroom${label !== '1' ? 's' : ''}`}
              </label>
            ))}
          </div>
        </div>
      )}

{budgetOptions.length > 0 && (
  <div className="grid grid-cols-3 gap-4 mt-6">
    {/* From Budget */}
    <div className="col-span-1 flex border border-gray-300 rounded overflow-hidden w-full">
      <span className="bg-gray-100 text-gray-700 px-3 py-2 text-sm flex items-center">From</span>
      <select
        id="minBudget"
        className="px-3 py-2 outline-none w-full"
        value={data.minBudget ?? ''}                 // '' so the placeholder shows
        onChange={(e) => {
          const value = parseInt(e.target.value);
          updateForm({
            minBudget: Number.isNaN(value) ? undefined : value,
            maxBudget: undefined,                     // reset max when min changes
          });
        }}
      >
        <option value="" disabled hidden>Min budget</option>
        {budgetOptions.map((b) => (
          <option key={b.value} value={b.value}>{b.label}</option>
        ))}
      </select>
    </div>

    {/* To Budget */}
    <div className="col-span-1 flex border border-gray-300 rounded overflow-hidden w-full">
      <span className="bg-gray-100 text-gray-700 px-3 py-2 text-sm flex items-center">To</span>
      <select
        id="maxBudget"
        className="px-3 py-2 outline-none w-full"
        value={data.maxBudget ?? ''}                 // '' so the placeholder shows
        onChange={(e) => {
          const value = parseInt(e.target.value);
          updateForm({ maxBudget: Number.isNaN(value) ? undefined : value });
        }}
        disabled={!data.minBudget}
      >
        <option value="" disabled hidden>Max budget</option>
        {filteredMaxOptions.map((b) => (
          <option key={b.value} value={b.value}>{b.label}</option>
        ))}
      </select>
    </div>

    {/* Empty 3rd column (optional) */}
    <div className="col-span-1" />
  </div>
)}


      {/* Property Selector, Viewing & Finance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PropertySelector />

        {/* On-spot Viewing */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">On-spot Viewing:</label>
          <select
            value={data.onSpotViewing ? 'yes' : data.onSpotViewing === false ? 'no' : ''}
            onChange={(e) =>
              updateForm({
                onSpotViewing: e.target.value === 'yes',
                onSpotDetails: e.target.value === 'yes' ? {} : undefined,
              })
            }
            className="border border-gray-300 px-3 py-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Finance */}
        <div>
          <label className="block text-sm font-medium mb-2">Looking for finance:</label>
          <select
            value={data.lookingForFinance ? 'Yes' : data.lookingForFinance === false ? 'No' : ''}
            onChange={(e) =>
              updateForm({
                lookingForFinance: e.target.value === 'Yes',
                financeDetails: e.target.value === 'Yes' ? {} : undefined,
              })
            }
            className="border border-gray-300 px-3 py-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {/* On-spot Viewing Details */}
      {data.onSpotViewing && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2">Community / Project Name:</label>
            <input
              type="text"
              value={data.onSpotDetails?.communityName || ''}
              onChange={(e) =>
                updateForm({
                  onSpotDetails: {
                    ...data.onSpotDetails,
                    communityName: e.target.value,
                  },
                })
              }
              placeholder="Enter community/project"
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Date:</label>
            <input
              type="date"
              value={data.onSpotDetails?.date || ''}
              onChange={(e) =>
                updateForm({
                  onSpotDetails: {
                    ...data.onSpotDetails,
                    date: e.target.value,
                  },
                })
              }
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Time:</label>
            <input
              type="time"
              value={data.onSpotDetails?.time || ''}
              onChange={(e) =>
                updateForm({
                  onSpotDetails: {
                    ...data.onSpotDetails,
                    time: e.target.value,
                  },
                })
              }
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
          </div>
        </div>
      )}

      {/* Finance Details */}
      {data.lookingForFinance && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2">Preferred Bank:</label>
            <select
              value={data.financeDetails?.preferredBank || ''}
              onChange={(e) =>
                updateForm({
                  financeDetails: {
                    ...data.financeDetails,
                    preferredBank: e.target.value,
                  },
                })
              }
              className="border border-gray-300 px-3 py-2 rounded w-full"
            >
              <option value="">Select</option>
              <option value="Abu Dhabi Commercial Bank">Abu Dhabi Commercial Bank</option>
              <option value="Emirates NBD">Emirates NBD</option>
              <option value="First Abu Dhabi Bank">First Abu Dhabi Bank</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Downpayment (AED):</label>
            <input
              type="number"
              value={data.financeDetails?.downpayment || ''}
              onChange={(e) =>
                updateForm({
                  financeDetails: {
                    ...data.financeDetails,
                    downpayment: Number(e.target.value),
                  },
                })
              }
              placeholder="Enter downpayment"
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Loan Amount (AED):</label>
            <input
              type="number"
              value={data.financeDetails?.loanAmount || ''}
              onChange={(e) =>
                updateForm({
                  financeDetails: {
                    ...data.financeDetails,
                    loanAmount: Number(e.target.value),
                  },
                })
              }
              placeholder="Enter loan amount"
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
          </div>
        </div>      
      )}
<div className="mt-6 relative w-full">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Selfie photo holding the ID
  </label>

  <div className="relative w-full">
    <input
      type="text"
      readOnly
      value={data.selfieFileName || 'No file chosen'}
      className="border border-gray-300 px-32 py-2 rounded w-full cursor-pointer"
      onClick={() => document.getElementById('selfieFileInput')?.click()}
    />

    <button
      type="button"
      onClick={() => document.getElementById('selfieFileInput')?.click()}
      className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1.5 rounded"
    >
      Choose File
    </button>
  </div>

  <input
    type="file"
    id="selfieFileInput"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          updateForm({
            selfieFileName: file.name,
            selfieFileData: reader.result as string,
          });
        };
        reader.readAsDataURL(file);
      }
    }}
    className="hidden"
  />
</div>




    </section>
  );
}

export default Services;
