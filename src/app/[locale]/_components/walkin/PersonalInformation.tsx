'use client';

import React from 'react';
import { nationalityOptions } from '@/data/youngsters';
import { useWalkinForm } from '@/context/WalkinFormContext';
import { Montserrat } from 'next/font/google';
import SearchableSelect, { SelectOption } from './SearchableSelect';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export function PersonalInformation({
  validationErrors,
}: {
  validationErrors?: Record<string, string[]>;
}) {
  const { data, updateForm } = useWalkinForm();

  const titleOptions: SelectOption[] = [
    { id: 'Mr', label: 'Mr' },
    { id: 'Mrs', label: 'Mrs' },
    { id: 'Ms', label: 'Ms' },
  ];

  const nationalitySelectOptions: SelectOption[] = nationalityOptions.map((n) => ({
    id: n,
    label: n,
  }));

  const residenceOptions: SelectOption[] = [
    { id: 'UAE Residence', label: 'UAE Residence' },
    { id: 'Non Residence', label: 'Non Residence' },
  ];

  return (
    <section className="space-y-6">
      <h2 className={`text-[24px] font-bold text-[#E0592A] pb-2 ${montserrat.className}`}>
        Personal Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Title (Searchable) */}
        <div>
          <SearchableSelect
            label="Title:"
            placeholder="Select title..."
            options={titleOptions}
            valueId={data.title || ''}
            onChange={(opt) => updateForm({ title: opt?.id })}
            error={validationErrors?.title?.[0]}
          />
        </div>

        {/* First Name */}
        <div>
          <label className="inline-block text-[15px] font-medium text-[#2C2D65] mb-1">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={data.firstName || ''}
            onChange={(e) => updateForm({ firstName: e.target.value })}
            className={`w-full border ${validationErrors?.firstName ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 text-gray-800`}
          />
          {validationErrors?.firstName && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.firstName[0]}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="inline-block text-[15px] font-medium text-[#2C2D65] mb-1">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={data.lastName || ''}
            onChange={(e) => updateForm({ lastName: e.target.value })}
            className={`w-full border ${validationErrors?.lastName ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2 text-gray-800`}
          />
          {validationErrors?.lastName && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.lastName[0]}</p>
          )}
        </div>

        {/* Nationality (Searchable) */}
        <div className="md:col-span-3">
          <SearchableSelect
            label="Nationality:"
            placeholder="Search nationality..."
            options={nationalitySelectOptions}
            valueId={data.nationality || ''}
            onChange={(opt) => updateForm({ nationality: opt?.id })}
            error={validationErrors?.nationality?.[0]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date of Birth */}
        <div>
          <label className="inline-block text-[15px] font-medium text-[#2C2D65] mb-2">
            Date of birth
          </label>
          <input
            type="date"
            value={data.dob || ''}
            onChange={(e) => updateForm({ dob: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Address */}
        <div>
          <label className="inline-block text-[15px] font-medium text-[#2C2D65] mb-2">
            Physical address / country of residence address
          </label>
          <textarea
            rows={1}
            placeholder="Write here"
            value={data.address || ''}
            onChange={(e) => updateForm({ address: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none"
          />
        </div>

        {/* Residence Type (Searchable) */}
        <div>
          <SearchableSelect
            label="Residence Type:"
            placeholder="Select residence type..."
            options={residenceOptions}
            valueId={data.residenceType || 'UAE Residence'}
            onChange={(opt) => updateForm({ residenceType: opt?.id || 'UAE Residence' })}
            error={validationErrors?.residenceType?.[0]}
          />
        </div>
      </div>

      {/* Reason of Visiting */}
      {data.residenceType === 'Non Residence' && (
        <div className="pt-4">
          <label className="inline-block text-[15px] font-medium text-[#2C2D65] mb-2">
            Reason of visiting:
          </label>
          <div className="flex flex-wrap gap-6 text-sm text-primary">
            {[
              'Tourism/Holiday',
              'Business Visit',
              'Event/Exhibition',
              'Convention',
              'Corporate Conference',
            ].map((reason) => (
              <label key={reason} className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="reasonOfVisit"
                  value={reason}
                  checked={data.reasonOfVisit === reason}
                  onChange={() => updateForm({ reasonOfVisit: reason })}
                  className="accent-blue-600"
                />
                {reason}
              </label>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
