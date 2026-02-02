import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const unitid = searchParams.get('unitid') || '';
    const category = searchParams.get('category') || '';
    //let apiurl = 'https://integration.psi-crm.com/ExternalApis/GetSaleListing';
    let apiurl = 'https://integration.psiassets-crm.com/ExternalApis/GetSaleListing';
    console.log('Fetching units data...' + unitid);
    let raw;
    if (unitid) {
        raw = JSON.stringify({
            "unitId": unitid,
        });
    } else {
        raw = JSON.stringify({});
    }
    if (category && category == 'rent') {
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