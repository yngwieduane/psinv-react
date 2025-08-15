// utils/fetchDescriptionByLookupId.ts
export async function fetchDescriptionByLookupId(
  lookupItemId: number | null,
  lookupTypeId?: string
) {
  if (!lookupItemId) return null;

  try {
    const url = new URL('/api/external/fetchLookupItemDescription', window.location.origin);
    url.searchParams.set('lookupItemId', lookupItemId.toString());
    if (lookupTypeId) url.searchParams.set('lookupTypeId', lookupTypeId);

    const res = await fetch(url.toString());

    if (!res.ok) {
      console.error(`Failed to fetch description for ID ${lookupItemId}`);
      return null;
    }

    const data = await res.json();
    return data.description ?? null;
  } catch (error) {
    console.error(`Error fetching description for ID ${lookupItemId}:`, error);
    return null;
  }
}
