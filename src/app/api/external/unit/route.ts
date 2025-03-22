import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const unitid = searchParams.get('unitid') || '';
    const category = searchParams.get('category') || '';
    let apiurl = 'https://integration.psi-crm.com/ExternalApis/GetSaleListing';
    // let apiurldxb = 'https://integration.dubai-crm.com/ExternalApis/GetSaleListing';
    // let apiurlassets = 'https://integration.psiassets-crm.com/ExternalApis/GetSaleListing';
    // let queryfilter;
    console.log('Fetching units data...'+unitid);
    let raw;
    if (unitid) {
      raw = JSON.stringify({
        "unitId": unitid,
      });
    } else {
      raw = JSON.stringify({});
    }
    if (category && category == 'Rent') {
      apiurl = 'https://integration.psi-crm.com/ExternalApis/GetRentListing';
      // apiurldxb = 'https://integration.dubai-crm.com/ExternalApis/GetRentListing';
      // apiurlassets = 'https://integration.psiassets-crm.com/ExternalApis/GetRentListing';
    } else {
      apiurl = 'https://integration.psi-crm.com/ExternalApis/GetSaleListing';
      // apiurldxb = 'https://integration.dubai-crm.com/ExternalApis/GetSaleListing';
      // apiurlassets = 'https://integration.psiassets-crm.com/ExternalApis/GetSaleListing';
    }
    // const [data1, data2, data3] = await Promise.all([
    //   fetch(
    //     apiurl,
    //     {
    //       method: "POST",
    //       headers:{
    //           'accept':'*/*',
    //           'Content-Type':'application/json',
    //           'apiKey':'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ'
    //       },
    //       body: raw,
    //     }
    //   ),
    //   fetch(
    //     apiurl,
    //     {
    //       method: "POST",
    //       headers:{
    //           'accept':'*/*',
    //           'Content-Type':'application/json',
    //           'apiKey':'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ'
    //       },
    //       body: raw,
    //     }
    //   ),
    //   fetch(
    //     apiurl,
    //     {
    //       method: "POST",
    //       headers:{
    //           'accept':'*/*',
    //           'Content-Type':'application/json',
    //           'apiKey':'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ'
    //       },
    //       body: raw,
    //     }
    //   ),
    // ])
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