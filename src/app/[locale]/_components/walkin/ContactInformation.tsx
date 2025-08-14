'use client';

import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useWalkinForm } from '@/context/WalkinFormContext';
import { Montserrat, Open_Sans } from "next/font/google";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});
export function ContactInformation() {
  const { data, updateForm } = useWalkinForm();

  return (
    <section className="space-y-6">
      <h2 className={`text-[24px] font-bold text-[#E0592A] pb-2 ${montserrat.className}`}>Contacts</h2>
      {/* Phone & Email Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="inline-block text-[15px] font-medium text-[#2C2D65] mb-1">Contact information</label>
          <PhoneInput
            id="primaryPhone"
            defaultCountry="AE"
            value={data.primaryPhone}
            onChange={(value: string | undefined) => updateForm({ primaryPhone: value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
            international
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 invisible">Alternate Phone</label>
          <PhoneInput
            defaultCountry="AE"
            value={data.alternatePhone}
            onChange={(value: string | undefined) => updateForm({ alternatePhone: value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
            international
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 invisible">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            value={data.email || ''}
            onChange={(e) => updateForm({ email: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-800"
          />
        </div>
      </div>
      {/* Best Time to Contact */}
      <div>
        <label className="inline-block text-[15px] font-medium text-[#2C2D65] mb-2">Best time to contact you:</label>
        <div className="flex flex-wrap gap-6 text-sm text-primary">
          {['Morning', 'Afternoon', 'Evening'].map((time) => (
            <label key={time} className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="bestTime"
                value={time}
                checked={data.bestTime === time}
                onChange={() => updateForm({ bestTime: time })}
                className="accent-blue-600"
              />
              {time}
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
