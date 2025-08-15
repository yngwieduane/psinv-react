'use client';

import React from 'react';
import { countryOptions } from '@/data/youngsters';
import { useWalkinForm } from '@/context/WalkinFormContext';
import { Montserrat, Open_Sans } from "next/font/google";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});
export function ClientProfession() {
  const { data, updateForm } = useWalkinForm();

  return (
    <section className="space-y-6">
      <h2 className={`text-[24px] font-bold text-[#E0592A] pb-2 ${montserrat.className}`}>
        Client Profession
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Profession Type */}
        <div>
          <select
            id="professionType"
            name="professionType"
            value={data.professionType || ''}
            onChange={(e) => updateForm({ professionType: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
          >
            <option value="">Select Profession</option>
            <option>Self Employed</option>
            <option>Salaried</option>
          </select>
        </div>
        {/* Company Name */}
        <input
          type="text"
          name="companyName"
          placeholder="Company name"
          value={data.companyName || ''}
          onChange={(e) => updateForm({ companyName: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
        {/* Position */}
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={data.position || ''}
          onChange={(e) => updateForm({ position: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* City */}
        <input
          type="text"
          name="city"
          placeholder="City"
          value={data.professionCity || ''}
          onChange={(e) => updateForm({ professionCity: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        />
        {/* Country */}
        <select
          id="country"
          name="country"
          value={data.professionCountry || ''}
          onChange={(e) => updateForm({ professionCountry: e.target.value })}
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
        >
          <option value="">Select Country</option>
          {countryOptions.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
