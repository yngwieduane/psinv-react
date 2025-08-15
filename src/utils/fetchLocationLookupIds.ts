// src/utils/fetchLocationLookupIds.ts

type LocationParams = {
  country: string;
  city: string;
  district: string;
  community: string;
  subCommunity: string;
};

export async function fetchLocationLookupIds(location: {
  country: string;
  city: string;
  district: string;
  community: string;
  subCommunity: string;
}) {
  const types = ['Country', 'City', 'District', 'Community', 'SubCommunity'];

  const results = await Promise.all(
    types.map(async (type) => {
      const res = await fetch(`/api/external/fetchLookup?type=${type}`);
      const data = await res.json();
     // console.log(`🔍 Lookup items for ${type}:`, data);
      const locKey = type.toLowerCase() as keyof typeof location;
      const locValue = location[locKey];

      return {
        type,
        id: data.find((item: any) =>
          locValue &&
          item.lookupName?.trim().toLowerCase() === locValue.trim().toLowerCase()
        )?.lookupId ?? null,
      };
    })
  );

  return Object.fromEntries(
    results.map((r) => [`${r.type.toLowerCase()}Id`, r.id])
  );
}


