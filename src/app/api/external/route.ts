import { NextRequest } from 'next/server';
 
export async function GET(request: NextRequest) {
    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append(
      "apiKey",
      "ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ"
    );
    myHeaders.append("Content-Type", "application/json");
  
    const raw = JSON.stringify({});
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    const response = await fetch(
      "https://integration.psi-crm.com/ExternalApis/GetAllProperties?pageIndex=1&pageSize=10",
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