'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useWalkinForm } from '@/context/WalkinFormContext';
import SearchableSelect, { SelectOption } from './SearchableSelect';

type Property = {
  propertyID: string;
  propertyName: string;
  country: string;
  city: string;
  district: string;
  community: string;
  subCommunity: string;
};

export default function PropertySelector() {
  const { data, updateForm } = useWalkinForm();

  const [properties, setProperties] = useState<Property[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        let apiUrl = '/api/external/allproperties?page=1&limit=2000';
        if (data.branch?.toLowerCase() === 'dubai') {
          apiUrl += '&cityId=26786';
        }

        const res = await fetch(apiUrl);
        const result = await res.json();

        setProperties(result?.result || []);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch properties', err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    if (data.branch) {
      fetchProperties();
    } else {
      setProperties([]);
      updateForm({ property: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.branch]);

  const propertyOptions: SelectOption[] = useMemo(
    () =>
      properties.map((p) => ({
        id: p.propertyID,
        label: p.propertyName,
      })),
    [properties]
  );

  const selectedValueId = data.property?.id || '';

  const handleChange = (opt?: SelectOption) => {
    if (!opt?.id) {
      updateForm({ property: undefined });
      return;
    }

    const property = properties.find((p) => p.propertyID === opt.id);
    if (!property) {
      updateForm({ property: undefined });
      return;
    }

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
  };

  if (!hasMounted) return null;

  return (
    <div className="w-full">
      <SearchableSelect
        label="Select Property:"
        placeholder={loading ? 'Loading properties…' : 'Search property…'}
        options={propertyOptions}
        valueId={selectedValueId}
        onChange={handleChange}
        disabled={!data.branch || loading}
      />
    </div>
  );
}
