import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  if (!type) {
    return new Response(JSON.stringify({ error: 'Missing type parameter' }), {
      status: 400,
    });
  }

  const API_KEY = 'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ';
  const crmUrl = `https://integration.psi-crm.com/ExternalApis/GetLookupItems?lookupTypeName=${type}`;

  try {
    const crmRes = await fetch(crmUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'APIKey': API_KEY,
      },
    });

    if (!crmRes.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch from CRM' }), {
        status: crmRes.status,
      });
    }

    const data = await crmRes.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server Error', details: err }), {
      status: 500,
    });
  }
}
