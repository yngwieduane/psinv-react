'use client';

import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { walkinFormConfig } from '@/utils/walkinConfig';
import { usePathname } from 'next/navigation';
import dayjs from 'dayjs';
import { useWalkinForm } from '@/context/WalkinFormContext';
import { Montserrat, Open_Sans } from "next/font/google";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export function HostedBy({ validationErrors }: { validationErrors?: Record<string, string[]> }) {
  const pathname = usePathname();
  const slug = pathname.split('/').pop() || '';
  const today = dayjs().format('YYYY-MM-DD');

  const config = walkinFormConfig[slug];
  const agentList = config?.agentsByDate?.[today] || [];

  const { data, updateForm } = useWalkinForm();
  const [hover, setHover] = useState(0);

  const handleAgentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = agentList.find(agent => agent.id === e.target.value);
    updateForm({
      hostedBy: {
        agentId: selected?.id,
        agentName: selected?.name,
      },
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
      <h2 className={`text-[24px] font-bold text-[#E0592A] pb-2 ${montserrat.className}`}>You've been hosted by:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Agent Name Dropdown */}
        <div>
          <label htmlFor="selectagent" className="inline-block text-[15px] font-medium text-[#2C2D65] mb-1">Agent Name:</label>
          <select
            id="selectagent"
            name="agentName"
            value={data.hostedBy?.agentId || ''}
            onChange={handleAgentChange}
            className={`w-full border ${validationErrors?.['hostedBy.agentId'] ? 'border-red-500' : 'border-gray-300'
              } rounded px-3 py-2`}
          >
            <option value="">-</option>
            {agentList.map(agent => (
              <option key={agent.id} value={agent.id}>
                {agent.name}
              </option>
            ))}
          </select>
          {validationErrors?.['hostedBy.agentId'] && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors['hostedBy.agentId'][0]}
            </p>
          )}
        </div>
        {/* Star Rating */}
        <div>
          <label className="inline-block text-[15px] font-medium text-[#2C2D65] mb-1">Rate your experience:</label>
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
          className={`w-full border ${validationErrors?.remarks ? 'border-red-500' : 'border-gray-300'
            } rounded px-3 py-2`}
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
