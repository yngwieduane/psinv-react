// src/utils/fetchLocationLookupIds.ts

type LocationParams = {
  country: string;
  city: string;
  district: string;
  community: string;
  subCommunity: string;
};
type LookupItem = {
  lookupId?: string | number;
  lookupName?: string;
};
export async function fetchLocationLookupIds(location: LocationParams) {
 const types = ["Country", "City", "District", "Community", "SubCommunity"] as const;

  const results = await Promise.all(
    types.map(async (type) => {
      const res = await fetch(`/api/external/fetchLookup?type=${type}`);
      const data = (await res.json()) as LookupItem[];

      const locKey = type.toLowerCase() as keyof LocationParams;
      const locValue = location[locKey];

 return {
        type,
        id:
          data.find(
            (item) =>
              locValue &&
              item.lookupName?.trim().toLowerCase() ===
                locValue.trim().toLowerCase()
          )?.lookupId ?? null,
      };
    })
  );

  return Object.fromEntries(
    results.map((r) => [`${r.type.toLowerCase()}Id`, r.id])
  );
}


