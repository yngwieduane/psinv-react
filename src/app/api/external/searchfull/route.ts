import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')

    const raw = JSON.stringify({ "propertyName": query });

    const response = await fetch(
        "https://integration.psi-crm.com/ExternalApis/GetAllProperties?pageIndex=1&pageSize=100",
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