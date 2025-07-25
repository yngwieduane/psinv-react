import { NextRequest } from 'next/server';
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const propertyId = searchParams.get('propertyId')
    const myHeaders = new Headers();
    let finquery;
    myHeaders.append("accept", "*/*");
    myHeaders.append(
      "apiKey",
      ""
    );
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({"isForSpecificProperty": true,"propertyId": propertyId});
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    const response = await fetch(
      "https://integration.psi-crm.com/ExternalApis/GetAllPaymentPlansByPropertyId?source=1",
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