'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Select from 'react-select';
import { useWalkinForm } from '@/context/WalkinFormContext';

type Property = {
  propertyID: string;
  propertyName: string;
  country: string;
  city: string;
  district: string;
  community: string;
  subCommunity: string;
};

type Option = {
  label: string;
  value: string;
};

export default function PropertySelector() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const { data, updateForm } = useWalkinForm();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        let apiUrl = '/api/external/allproperties?page=1&limit=2000';

        if (data.branch?.toLowerCase() === 'dubai') {
          apiUrl += '&cityId=26786';
        }

        console.log('Fetching Properties from branch:', data.branch);
        console.log('Fetching Properties from URL:', apiUrl);

        const res = await fetch(apiUrl);
        const result = await res.json();

        console.log('Fetched Properties Result:', result);
        setProperties(result.result || []);

      } catch (err) {
        console.error('Failed to fetch properties', err);
      }
    };

    if (data.branch) {
      fetchProperties();
    }
  }, [data.branch]);

  useEffect(() => {
    if (data.property?.id && properties.length > 0) {
      const { id } = data.property;
      const match = properties.find(p => p.propertyID === id);
      if (match) {
        setSelectedProperty(match);
      } else {
        setSelectedProperty(null);
      }
    } else {
      setSelectedProperty(null);
    }
  }, [data.property?.id, properties]);

const options: Option[] = useMemo(() =>
  properties.map((property) => ({
    value: property.propertyID,
    label: property.propertyName,
  })),
[properties]);


  const handleChange = (selectedOption: Option | null) => {
    const property = properties.find(p => p.propertyID === selectedOption?.value);
    setSelectedProperty(property || null);

    if (property) {
      updateForm({
        property: {
          id: property.propertyID,
          name: property.propertyName,
          country: property.country,
          city: property.city,
          district: property.district,
          community: property.community,
          subCommunity: property.subCommunity,
        },
      });
    } else {
      updateForm({ property: undefined });
    }
  };

  if (!hasMounted) return null;

  return (
    <div className="w-full max-w-md space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Property:
      </label>
      <Select
        id="property"
        options={options}
        value={
          selectedProperty
            ? { value: selectedProperty.propertyID, label: selectedProperty.propertyName }
            : null
        }
        onChange={handleChange}
        placeholder="Select a Property"
        isClearable
      />
    </div>
  );
}
