import { NextRequest } from 'next/server';
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    const myHeaders = new Headers();
    let finquery;
    myHeaders.append("accept", "*/*");
    myHeaders.append(
      "apiKey",
      ""
    );
    myHeaders.append("Content-Type", "application/json");
  
    switch (query) {
      case 'jacob co beachfront living by ohana':
        finquery = 'jacob & co. beachfront living by ohana'
        break;
      default:
        finquery = query
        break;
    }
    const raw = JSON.stringify({"propertyName": finquery});
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    const response = await fetch(
      "https://integration.psi-crm.com/ExternalApis/GetAllProperties?pageIndex=1&pageSize=1",
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