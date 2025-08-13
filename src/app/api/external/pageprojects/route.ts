import { NextRequest } from 'next/server';
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    const page = searchParams.get('page') || 1;
    const propertyname = searchParams.get('propertyname')
    const cityId = searchParams.get('city')
    const isFeaturedProjectOnWeb = searchParams.get('isFeaturedProjectOnWeb')
    const myHeaders = new Headers();
    const pagesize = 100;
    myHeaders.append("accept", "*/*");
    myHeaders.append(
      "apiKey",
      ""
    );
    myHeaders.append("Content-Type", "application/json");
  
    let raw;
    raw = JSON.stringify({});
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
let allData: any[] = [];
let currentPage = 1;
let totalPages = 1;

// while (currentPage <= totalPages) {
//     const res = await fetch(`/api/external/pageprojects?page=${currentPage}`);
//     if (!res.ok) throw new Error(`Failed on page ${currentPage}`);
//     const json: ApiResponse = await res.json();

//     allData = [...allData, ...json.result];
//     totalPages = Math.round(json.totalCount / 100) + 1;
//     currentPage++;
// }

// return allData;
    while (currentPage <= totalPages) {
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
        allData = [...allData, ...projects.result];
        totalPages = Math.round(projects.totalCount / 100) + 1;
        currentPage++;
    }
  
    //setLoading(false);
    //return projects;
 
  return new Response(JSON.stringify(allData), {
    headers: { 'Content-Type': 'application/json' },
  });
}