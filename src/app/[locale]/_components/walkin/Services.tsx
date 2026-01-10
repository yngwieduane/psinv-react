'use client';

import React, { useState, useEffect, useMemo } from 'react';
import PropertySelector from './PropertySelector';
import { useWalkinForm } from '@/context/WalkinFormContext';
import { bedroomOptions } from '@/utils/constants';
import { Montserrat } from 'next/font/google';
import SearchableSelect, { SelectOption } from './SearchableSelect';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

type BudgetOption = { value: number; label: string };

const serviceOptions: SelectOption[] = [
  { id: 'Sales', label: 'Sales' },
  { id: 'Lease', label: 'Lease' },
];

const yesNoOptions: SelectOption[] = [
  { id: 'yes', label: 'Yes' },
  { id: 'no', label: 'No' },
];

const financeYesNoOptions: SelectOption[] = [
  { id: 'Yes', label: 'Yes' },
  { id: 'No', label: 'No' },
];

const bankOptions: SelectOption[] = [
  { id: 'Abu Dhabi Commercial Bank', label: 'Abu Dhabi Commercial Bank' },
  { id: 'Emirates NBD', label: 'Emirates NBD' },
  { id: 'First Abu Dhabi Bank', label: 'First Abu Dhabi Bank' },
];

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
    } else {
      setBudgetOptions([]);
      updateForm({ minBudget: undefined, maxBudget: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.requirementType, data.unitType]);

  const filteredMaxOptions = useMemo(() => {
    return budgetOptions.filter((b) =>
      typeof data.minBudget === 'number' ? b.value >= data.minBudget : true
    );
  }, [budgetOptions, data.minBudget]);

  const minBudgetOptions: SelectOption[] = useMemo(
    () =>
      budgetOptions.map((b: BudgetOption) => ({
        id: String(b.value),
        label: b.label,
      })),
    [budgetOptions]
  );

  const maxBudgetOptions: SelectOption[] = useMemo(
    () =>
      filteredMaxOptions.map((b: BudgetOption) => ({
        id: String(b.value),
        label: b.label,
      })),
    [filteredMaxOptions]
  );

  return (
    <section className="space-y-6">
      <h2 className={`text-[24px] font-bold text-[#E0592A] pb-2 ${montserrat.className}`}>
        Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Service Selection */}
        <SearchableSelect
          label="Services"
          placeholder="Select services..."
          options={serviceOptions}
          valueId={data.selectedService || ''}
          onChange={(opt) =>
            updateForm({
              selectedService: opt?.id,
              requirementType: undefined,
              unitCategory: undefined,
              unitType: undefined,
              bedroom: undefined,
              minBudget: undefined,
              maxBudget: undefined,
            })
          }
          error={validationErrors?.selectedService?.[0]}
        />
      </div>

      {/* Requirement Type */}
      {data.selectedService && (
        <div>
          <p className="block text-sm font-medium mb-2">Are you a:</p>
          {(data.selectedService === 'Sales' ? ['Buyer', 'Landlord'] : ['Tenant', 'Landlord']).map(
            (type, index) => (
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
            )
          )}
        </div>
      )}

      {/* Unit Category */}
      {data.requirementType && (
        <div>
          <p className="block text-sm font-medium mb-2">Are you looking for:</p>
          <label className="mr-4">
            <input
              id="unitCategory"
              type="radio"
              name="unitCategory"
              value="Residential"
              checked={data.unitCategory === 'Residential'}
              onChange={() =>
                updateForm({
                  unitCategory: 'Residential',
                  unitType: undefined,
                  bedroom: undefined,
                })
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
                updateForm({
                  unitCategory: 'Commercial',
                  unitType: undefined,
                  bedroom: undefined,
                })
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
          <p className="block text-sm font-medium mb-2">No of Bedrooms:</p>
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

      {/* Budget */}
      {budgetOptions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Min Budget */}
          <div className="md:col-span-1">
            <SearchableSelect
              label="Budget From"
              placeholder="Min budget..."
              options={minBudgetOptions}
              valueId={data.minBudget != null ? String(data.minBudget) : ''}
              onChange={(opt) => {
                const val = opt?.id ? Number(opt.id) : undefined;
                updateForm({
                  minBudget: Number.isFinite(val as number) ? val : undefined,
                  maxBudget: undefined,
                });
              }}
              error={validationErrors?.minBudget?.[0]}
            />
          </div>

          {/* Max Budget */}
          <div className="md:col-span-1">
            <SearchableSelect
              label="Budget To"
              placeholder="Max budget..."
              options={maxBudgetOptions}
              valueId={data.maxBudget != null ? String(data.maxBudget) : ''}
              onChange={(opt) => {
                const val = opt?.id ? Number(opt.id) : undefined;
                updateForm({
                  maxBudget: Number.isFinite(val as number) ? val : undefined,
                });
              }}
              disabled={!data.minBudget}
              error={validationErrors?.maxBudget?.[0]}
            />
          </div>

          <div className="md:col-span-1" />
        </div>
      )}

      {/* Property Selector, Viewing & Finance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PropertySelector />

        {/* On-spot Viewing */}
        <div>
          <SearchableSelect
            label="On-spot Viewing"
            placeholder="Select..."
            options={yesNoOptions}
            valueId={data.onSpotViewing === true ? 'yes' : data.onSpotViewing === false ? 'no' : ''}
            onChange={(opt) =>
              updateForm({
                onSpotViewing: opt?.id === 'yes',
                onSpotDetails: opt?.id === 'yes' ? {} : undefined,
              })
            }
          />
        </div>

        {/* Finance */}
        <div>
          <SearchableSelect
            label="Looking for finance"
            placeholder="Select..."
            options={financeYesNoOptions}
            valueId={
              data.lookingForFinance === true ? 'Yes' : data.lookingForFinance === false ? 'No' : ''
            }
            onChange={(opt) =>
              updateForm({
                lookingForFinance: opt?.id === 'Yes',
                financeDetails: opt?.id === 'Yes' ? {} : undefined,
              })
            }
          />
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
            <SearchableSelect
              label="Preferred Bank"
              placeholder="Select bank..."
              options={bankOptions}
              valueId={data.financeDetails?.preferredBank || ''}
              onChange={(opt) =>
                updateForm({
                  financeDetails: {
                    ...data.financeDetails,
                    preferredBank: opt?.id,
                  },
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Downpayment (AED):
            </label>
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

      {/* Selfie Upload */}
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
