import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const propertyId = searchParams.get('propertyId') || null;
  const category = searchParams.get('category') || '';
  const beds = searchParams.get('beds') || null;
  const propertyType = searchParams.get('propertyType') || null;
  const minPrice = searchParams.get('minPrice') || null;
  const maxPrice = searchParams.get('maxPrice') || null;
  const minArea = searchParams.get('minArea') || null;
  const maxArea = searchParams.get('maxArea') || null;
  const communityId = searchParams.get('communityId') || null;
  let apiurl = 'https://integration.psiassets-crm.com/ExternalApis/GetSaleListing';
  console.log('Fetching units data...' + propertyId);
  let raw;
  raw = JSON.stringify({
    "propertyId": propertyId,
    "bedrooms": beds,
    "bedroomsMax": beds,
    "startPriceRange": minPrice,
    "endPriceRange": maxPrice,
    "floorAreaMin": minArea,
    "floorAreaMax": maxArea,
    "category": propertyType,
    "communityId": communityId
  });
  if (category && category == 'Rent') {
    apiurl = 'https://integration.psiassets-crm.com/ExternalApis/GetRentListing';
  } else {
    apiurl = 'https://integration.psiassets-crm.com/ExternalApis/GetSaleListing';
  }
  const response = await fetch(
    apiurl,
    {
      method: "POST",
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'apiKey': 'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ'
      },
      body: raw,
    }
  );


  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Upstream API error: ${response.status} - ${errorText}`);
    return new Response(JSON.stringify({ error: "Failed to fetch units from upstream" }), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const text = await response.text();
  let projects = [];
  try {
    projects = text ? JSON.parse(text) : [];
  } catch (e) {
    console.error("Failed to parse upstream response as JSON", e);
    return new Response(JSON.stringify({ error: "Invalid response from upstream" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }


  return new Response(JSON.stringify(projects), {
    headers: { 'Content-Type': 'application/json' },
  });
}