'use client';

import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { walkinFormConfig } from '@/utils/walkinConfig';
import { usePathname } from 'next/navigation';
import dayjs from 'dayjs';
import { useWalkinForm } from '@/context/WalkinFormContext';
import { Montserrat } from 'next/font/google';
import SearchableSelect, { SelectOption } from './SearchableSelect';


const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export function HostedBy({ validationErrors }: { validationErrors?: Record<string, string[]> }) {
  const pathname = usePathname();
  const slug = pathname.split('/').pop() || '';
  const today = dayjs().format('YYYY-MM-DD');

  const config = walkinFormConfig[slug];

  const agentList =
    (config?.agents?.length ? config.agents : (config?.agentsByDate?.[today] || []))
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));

  const agentOptions: SelectOption[] = agentList.map((a) => ({
    id: a.id,
    label: a.name,
  }));

  const { data, updateForm } = useWalkinForm();
  const [hover, setHover] = useState(0);

  const handleAgentSelect = (opt?: SelectOption) => {
    updateForm({
      hostedBy: opt
        ? { agentId: opt.id, agentName: opt.label }
        : { agentId: undefined, agentName: undefined },
    });
  };

  const handleRatingChange = (value: number) => {
    updateForm({ experienceRating: value });
  };

  const handleRemarksChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateForm({ remarks: e.target.value });
  };

  return (
    <div className="mt-8">
      <h2 className={`text-[24px] font-bold text-[#E0592A] pb-2 ${montserrat.className}`}>
        You've been hosted by:
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Agent Searchable Select */}
        <div>
          <SearchableSelect
            label="Agent Name:"
            placeholder="Search agent..."
            options={agentOptions}
            valueId={data.hostedBy?.agentId || ''}
            onChange={handleAgentSelect}
            error={validationErrors?.['hostedBy.agentId']?.[0]}
          />
        </div>

        {/* Star Rating */}
        <div>
          <label className="inline-block text-[15px] font-medium text-[#2C2D65] mb-1">
            Rate your experience:
          </label>
          <div className="flex space-x-1 mt-2">
            {[...Array(5)].map((_, index) => {
              const value = index + 1;
              return (
                <label key={value}>
                  <input
                    type="radio"
                    name="rating"
                    value={value}
                    onClick={() => handleRatingChange(value)}
                    className="hidden"
                  />
                  <FaStar
                    className="cursor-pointer"
                    color={value <= (hover || data.experienceRating || 0) ? '#facc15' : '#e5e7eb'}
                    size={30}
                    onMouseEnter={() => setHover(value)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Remarks */}
      <div className="mt-6">
        <label htmlFor="remarks" className="inline-block text-[15px] font-medium text-[#2C2D65] mb-1">
          Remarks:
        </label>
        <textarea
          name="remarks"
          id="remarks"
          rows={4}
          placeholder="Add notes here"
          className={`w-full border ${validationErrors?.remarks ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2`}
          value={data.remarks || ''}
          onChange={handleRemarksChange}
        />
        {validationErrors?.remarks && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.remarks[0]}</p>
        )}
      </div>

      <p className="mt-4 text-sm text-gray-700">
        By clicking Submit, you agree to our Terms & Conditions and Privacy Policy.
      </p>
    </div>
  );
}
