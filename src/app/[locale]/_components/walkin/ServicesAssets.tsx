'use client';

import React, { useEffect, useMemo, useState } from 'react';
import PropertySelector from './PropertySelector';
import { useWalkinForm } from '@/context/WalkinFormContext';
import { Montserrat, Open_Sans } from "next/font/google";
import { bedroomOptions } from '@/utils/constants';
type ClientLabel = 'Buyer' | 'Seller' | 'Tenant' | 'Landlord';

const clientTypeMap: Record<ClientLabel, { req: '91212' | '91213'; contact: '1' | '2' | '3' | '4'; service: 'Sales' | 'Lease' }> = {
  Buyer: { req: '91212', contact: '3', service: 'Sales' },
  Seller: { req: '91212', contact: '1', service: 'Sales' },
  Tenant: { req: '91213', contact: '4', service: 'Lease' },
  Landlord: { req: '91213', contact: '2', service: 'Lease' },
};
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});
const baseFieldCls =
  "w-full border border-gray-300 rounded px-3 py-2 text-gray-800";

const labelCls =
  "block text-sm font-medium text-gray-700 mb-1";
const inputCls = baseFieldCls;
const selectCls = baseFieldCls;

export default function ServicesAssets() {
  const { data, updateForm } = useWalkinForm();
  const [budgetOptions, setBudgetOptions] = useState<number[]>([]);
  useEffect(() => {
    const arr: number[] = [];
    for (let v = 50_000; v <= 10_000_000; v += 50_000) arr.push(v);
    setBudgetOptions(arr);
  }, []);

  const filteredMaxOptions = useMemo(
    () => budgetOptions.filter(v => !data.minBudget || v >= data.minBudget),
    [budgetOptions, data.minBudget]
  );

  return (
    <section className="bg-white">
      <div className="mb-6">
        <h2 className={`text-[24px] font-bold text-[#E0592A] pb-2 ${montserrat.className}`}>Services</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* District */}
        <div>
          <label htmlFor="district" className={labelCls}>District</label>
          <input
            id="district"
            type="text"
            placeholder="District"
            value={data.property?.district || ''}
            onChange={(e) => updateForm({ property: { ...data.property, district: e.target.value } })}
            className={inputCls}
          />
        </div>
        {/* Building Name */}
        <div>
          <label htmlFor="buildingName" className={labelCls}>Building Name</label>
          <input
            id="buildingName"
            type="text"
            placeholder="Building Name"
            value={data.buildingName || ''}
            onChange={(e) => updateForm({ buildingName: e.target.value })}
            className={inputCls}
          />
        </div>
        {/* Preferred Unit */}
        <div>
          <label htmlFor="unitType" className={labelCls}>Preferred Unit</label>
          <select
            id="unitType"
            value={data.unitType || ''}
            onChange={(e) => updateForm({ unitType: e.target.value })}
            className={selectCls}
          >
            <option value="">Select Unit Type</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Penthouse">Penthouse</option>
            <option value="Retail">Retail</option>
            <option value="Office">Office</option>
            <option value="Shop">Shop</option>
          </select>
        </div>
        {/* Bedrooms */}
        <div>
          <label htmlFor="bedroom" className={labelCls}>Number of Bedrooms</label>
          <select
            id="bedroom"
            value={data.bedroom || ''}
            onChange={(e) => updateForm({ bedroom: e.target.value })}
            className={selectCls}
          >
            <option value="">Select Bedroom</option>
            {Object.entries(bedroomOptions).map(([id, label]) => (
              <option key={id} value={id}>
                {label === 'Studio' ? 'Studio' : `${label} Bedroom${label !== '1' ? 's' : ''}`}
              </option>
            ))}
          </select>
        </div>
        {/* Moving Date */}
        <div>
          <label htmlFor="movingDate" className={labelCls}>Moving Date</label>
          <input
            id="movingDate"
            type="date"
            value={data.movingDate || ''}
            onChange={(e) => updateForm({ movingDate: e.target.value })}
            className={inputCls}
          />
        </div>
        {/* Property */}
        <div>
          <div id="property">
            <PropertySelector />
          </div>
        </div>
        {/* Client Type */}
        <div>
          <label htmlFor="reqType" className={labelCls}>Client Type</label>
          <select
            id="reqType"
            name="reqType"
            value={data.clientTypeLabel ?? ''}
            onChange={(e) => {
              const label = e.target.value as ClientLabel;
              const map = clientTypeMap[label];

              updateForm({
                clientTypeLabel: label,
                requirementType: label,
                reqType: map.req,
                contactType: map.contact,
                selectedService: map.service,
              });
            }}
            className={selectCls}
          >
            <option value="">Select Client Type</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
            <option value="Tenant">Tenant</option>
            <option value="Landlord">Landlord</option>
          </select>

        </div>
        {/* Budget */}
        <div className="md:col-span-2">
          <label className={labelCls}>Budget (AED)</label>
          <div className="grid grid-cols-2 gap-4">
            <select
              id="minBudget"
              value={data.minBudget || ''}
              onChange={(e) =>
                updateForm({
                  minBudget: parseInt(e.target.value) || undefined,
                  maxBudget: undefined, // reset max when min changes
                })
              }
              className={selectCls}
            >
              <option value="">Min Budget</option>
              {budgetOptions.map((v) => (
                <option key={v} value={v}>{v.toLocaleString()}</option>
              ))}
            </select>
            <select
              id="maxBudget"
              value={data.maxBudget || ''}
              onChange={(e) => updateForm({ maxBudget: parseInt(e.target.value) || undefined })}
              disabled={!data.minBudget}
              className={selectCls + (!data.minBudget ? " opacity-60" : "")}
            >
              <option value="">Max Budget</option>
              {filteredMaxOptions.map((v) => (
                <option key={v} value={v}>{v.toLocaleString()}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
