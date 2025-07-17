import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const propertyId = searchParams.get('propertyId') || null;
    const category = searchParams.get('category') || '';
    const beds = searchParams.get('beds') || null;
    const propertyType = searchParams.get('propertyType') || '';
    const minPrice = searchParams.get('minPrice') || null;
    const maxPrice = searchParams.get('maxPrice') || null;
    let apiurl = 'https://integration.psiassets-crm.com/ExternalApis/GetSaleListing';
    console.log('Fetching units data...'+propertyId);
    let raw;
    raw = JSON.stringify({
        "propertyId": propertyId,
        "bedrooms": beds,
        "bedroomsMax": beds,
        "startPriceRange": minPrice,
        "endPriceRange": maxPrice
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
        headers:{
            'accept':'*/*',
            'Content-Type':'application/json',
            'apiKey':'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ'
        },
        body: raw,
      }
    );
  
    //const mergedsearchfilters = [...data1, ...data2, ...data3]

    if (!response) {
      const error = new Error("An error occurred while fetching projects");
      throw error;
    }

    const projects = await response.json();
  
    //setLoading(false);
    //return projects;
 
  return new Response(JSON.stringify(projects), {
    headers: { 'Content-Type': 'application/json' },
  });
}