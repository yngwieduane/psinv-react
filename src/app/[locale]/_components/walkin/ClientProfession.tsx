'use client';

import React from 'react';
import { countryOptions } from '@/data/youngsters';
import { useWalkinForm } from '@/context/WalkinFormContext';
import { Montserrat } from 'next/font/google';
import SearchableSelect, { SelectOption } from './SearchableSelect'; // adjust path if needed

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export function ClientProfession({
  validationErrors,
}: {
  validationErrors?: Record<string, string[]>;
}) {
  const { data, updateForm } = useWalkinForm();

  const professionOptions: SelectOption[] = [
    { id: 'Self Employed', label: 'Self Employed' },
    { id: 'Salaried', label: 'Salaried' },
  ];

  const countrySelectOptions: SelectOption[] = countryOptions.map((c) => ({
    id: c,
    label: c,
  }));

  return (
    <section className="space-y-6">
      <h2 className={`text-[24px] font-bold text-[#E0592A] pb-2 ${montserrat.className}`}>
        Client Profession
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profession Type (Searchable) */}
        <div>
          <SearchableSelect
            label="Profession Type"
            placeholder="Select profession..."
            options={professionOptions}
            valueId={data.professionType || ''}
            onChange={(opt) => updateForm({ professionType: opt?.id })}
            error={validationErrors?.professionType?.[0]}
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="inline-block text-[15px] font-medium text-[#2C2D65] mb-1">
            Company name
          </label>
          <input
            type="text"
            name="companyName"
            placeholder="Company name"
            value={data.companyName || ''}
            onChange={(e) => updateForm({ companyName: e.target.value })}
            className={`w-full border ${validationErrors?.companyName ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 text-gray-800`}
          />
          {validationErrors?.companyName && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.companyName[0]}</p>
          )}
        </div>

        {/* Position */}
        <div>
          <label className="inline-block text-[15px] font-medium text-[#2C2D65] mb-1">
            Position
          </label>
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={data.position || ''}
            onChange={(e) => updateForm({ position: e.target.value })}
            className={`w-full border ${validationErrors?.position ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 text-gray-800`}
          />
          {validationErrors?.position && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.position[0]}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* City */}
        <div>
          <label className="inline-block text-[15px] font-medium text-[#2C2D65] mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={data.professionCity || ''}
            onChange={(e) => updateForm({ professionCity: e.target.value })}
            className={`w-full border ${validationErrors?.professionCity ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 text-gray-800`}
          />
          {validationErrors?.professionCity && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.professionCity[0]}</p>
          )}
        </div>

        {/* Country (Searchable) */}
        <div className="md:col-span-2">
          <SearchableSelect
            label="Country"
            placeholder="Search country..."
            options={countrySelectOptions}
            valueId={data.professionCountry || ''}
            onChange={(opt) => updateForm({ professionCountry: opt?.id })}
            error={validationErrors?.professionCountry?.[0]}
          />
        </div>
      </div>
    </section>
  );
}
