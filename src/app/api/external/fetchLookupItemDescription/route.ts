// src/app/api/external/fetchLookupItemDescription/route.ts

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const lookupItemId = searchParams.get('lookupItemId');
  const lookupTypeId = searchParams.get('lookupTypeId');
  const branch = searchParams.get('branch')?.toLowerCase();

  if (!lookupItemId) {
    return NextResponse.json({ error: 'Missing lookupItemId' }, { status: 400 });
  }

  const crmBaseUrl =
    branch === 'dubai'
      ? 'https://api.portal.dubai-crm.com/lookupItems'
      : 'https://api.portal.psi-crm.com/lookupItems';

  const apiKey =
    branch === 'dubai'
      ? 'd301dba69732065cd006f90c6056b279fe05d9671beb6d29f2d9deb0206888c38239a3257ccdf4d0'
      : '400b0c41cea6ae771d9090684ccbcd3696aab50aa47d7dcdddd3018934a337bc8ac18f7581f6664e';

  const crmUrl = `${crmBaseUrl}?lookupItemId=${lookupItemId}${
    lookupTypeId ? `&lookupTypeId=${lookupTypeId}` : ''
  }&withParents=false&page=1&size=25&APIKEY=${apiKey}`;

  try {
    const crmRes = await fetch(crmUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!crmRes.ok) {
      return NextResponse.json({ error: 'CRM fetch failed' }, { status: crmRes.status });
    }

    const data = await crmRes.json();
    const description = data?.items?.[0]?.description ?? null;

    return NextResponse.json({ description });
  } catch (err) {
    console.error('CRM fetch error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
