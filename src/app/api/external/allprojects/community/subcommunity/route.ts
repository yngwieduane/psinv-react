import { NextRequest } from 'next/server';
import { headers } from 'next/headers'

async function getIdFromExternalApi(lookupItemName: string,lookupTypeName: string): Promise<number | undefined> {
  try {
    const response = await fetch("https://integration.psi-crm.com/ExternalApis/GetLookupItems?lookupItemName="+lookupItemName+"&lookupTypeName="+lookupTypeName, {
      method: 'GET',
      headers:{
          'accept':'*/*',
          'Content-Type':'application/json',
          'apiKey':'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ'
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    // Assume data format: [{ id: 101, value: "Mr" }, ...]
    const result = data;
    return result?.lookupId;
  } catch (error) {
    console.error('External API fetch failed:', error);
    return undefined;
  }
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    const page = searchParams.get('page') || 1;
    const propertyname = searchParams.get('propertyname')
    const cityId = searchParams.get('city')
    const communityId = searchParams.get('community') || ''
    const subcommunityId = searchParams.get('subcommunity') || ''
    const isFeaturedProjectOnWeb = searchParams.get('isFeaturedProjectOnWeb')
    const myHeaders = new Headers();
    const pagesize = 24;
    myHeaders.append("accept", "*/*");
    myHeaders.append(
      "apiKey",
      ""
    );
    myHeaders.append("Content-Type", "application/json");
  
    let raw;
    raw = JSON.stringify({
      "propertyName": propertyname,
      "cityId": cityId,
      "communityId": communityId,
      "subCommunityId": subcommunityId
    });
    // let id;
    // if (city && city !== '') {
    //   id = await getIdFromExternalApi(city, 'city');
    //   raw.push([
    //     { "cityId": id }
    //   ]);
    // }
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    const response = await fetch(
      "https://integration.psi-crm.com/ExternalApis/GetAllProperties?pageIndex="+page+"&pageSize="+pagesize,
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
  
    if (!response.ok) {
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