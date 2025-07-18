import { NextRequest } from 'next/server';

async function getDeveloperDetailsByName(name: string): Promise<number | undefined> {
  try {
    const response = await fetch("https://integration.psi-crm.com/ExternalApis/GetDevelopersContact?source=1", {
      method: 'GET',
      headers:{
          'accept':'*/*',
          'Content-Type':'application/json',
          'apiKey':'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ'
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
      return undefined;
    }

    const data = await response.json();

    const developer = data.find((dev: any) =>
        dev.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    return developer;
    
  } catch (error) {
    console.error('External API fetch failed:', error);
    return undefined;
  }
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    const page = searchParams.get('page') || 1;
    const developerName = searchParams.get('developer');
    const isFeaturedProjectOnWeb = searchParams.get('isFeaturedProjectOnWeb')
    const pagesize = 300;

    let developerId: number | undefined;
    if(developerName) {
        developerId = await getDeveloperDetailsByName(developerName);
    }

    const payload : Record<string, any> = {};

    if (developerId) payload.developerId = developerId;

    const raw = JSON.stringify(payload);    
  
    const response = await fetch(
      `https://integration.psi-crm.com/ExternalApis/GetAllProperties?pageIndex=${page}&pageSize=${pagesize}`,
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
        return new Response(JSON.stringify({ error: 'Failed to fetch properties' }), {
        status: 500,
        });
    }
  
    const projects = await response.json();
    //setLoading(false);
    //return projects;
 
    return new Response(JSON.stringify(projects), {
        headers: { 'Content-Type': 'application/json' },
    });
}