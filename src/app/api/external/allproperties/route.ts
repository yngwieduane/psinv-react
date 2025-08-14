// app/api/external/allproperties/route.ts
import { NextRequest } from 'next/server';

const API_KEY = 'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ';

async function getDeveloperDetailsByName(name: string): Promise<number | undefined> {
  try {
    const response = await fetch("https://integration.psi-crm.com/ExternalApis/GetDevelopersContact?source=1", {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'apiKey': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Developer API Error: ${response.status}`);
    }

    const data = await response.json();
    const developer = data.find((dev: any) =>
      dev.name?.trim().toLowerCase() === name.trim().toLowerCase()
    );

    return developer?.id;
  } catch (error) {
    console.error('Error fetching developer ID:', error);
    return undefined;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get('query');
  const page = searchParams.get('page') || '1';
  const developerName = searchParams.get('developer');
  const isFeaturedProjectOnWeb = searchParams.get('isFeaturedProjectOnWeb');
  const cityId = searchParams.get('cityId');
  const pagesize = 2000;

  let developerId: number | undefined;
  if (developerName) {
    developerId = await getDeveloperDetailsByName(developerName);
  }

  const payload: Record<string, any> = {};
  if (developerId) payload.developerId = developerId;
  if (isFeaturedProjectOnWeb) payload.isFeaturedProjectOnWeb = isFeaturedProjectOnWeb;
  if (query) payload.projectName = query;
  if (cityId) payload.cityId = parseInt(cityId, 10);

  const raw = JSON.stringify(payload);

  try {
    const response = await fetch(
      `https://integration.psi-crm.com/ExternalApis/GetAllProperties?pageIndex=${page}&pageSize=${pagesize}`,
      {
        method: "POST",
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
          'apiKey': API_KEY,
        },
        body: raw,
      }
    );

    if (!response.ok) {
      throw new Error(`Properties API Error: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch properties' }), {
      status: 500,
    });
  }
}
