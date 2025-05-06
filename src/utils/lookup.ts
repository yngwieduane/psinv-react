export async function getLookupId(lookupItemName: string, lookupTypeName: string): Promise<string | ''> {
  try {
    const url = `https://integration.psi-crm.com/ExternalApis/GetLookupItems?lookupItemName=${encodeURIComponent(
      lookupItemName
    )}&lookupTypeName=${encodeURIComponent(lookupTypeName)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        apiKey: 'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data[0].lookupId;
  } catch (error) {
    console.error('External API fetch failed:', error);
    return '';
  }
}