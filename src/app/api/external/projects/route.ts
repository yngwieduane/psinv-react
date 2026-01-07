import { NextRequest } from 'next/server';
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')?.toLowerCase()
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
    case 'the sustainable city auh':
      finquery = 'the sustainable city - auh'
      break;
    case 'yas golf collection views tower b':
      finquery = 'Yas Golf Collection Views - Tower B'
      break;
    case 'saadiyat lagoons wilds phase 1':
      finquery = 'Saadiyat Lagoons - Wilds Phase 1'
      break;
    case 'bloom living toledo':
      finquery = 'Bloom Living - Toledo'
      break;
    case 'yas golf collection views tower c':
      finquery = 'Yas Golf Collection Views - Tower C'
      break;
    case 'al jurf gardens phase 1-1':
      finquery = 'Al Jurf Gardens Phase 1.1'
      break;
    case 'saadiyat lagoons al ghaf':
      finquery = 'Saadiyat Lagoons - Al Ghaf'
      break;
    case 'juman 1 luluat al raha':
      finquery = 'Juman 1 - Luluat Al Raha'
      break;
    case 'vida residences saadiyat island':
      finquery = 'Vida Residences - Saadiyat Island'
      break;
    case 'reem hills phase 2a':
      finquery = 'Reem Hills - Phase 2A'
      break;
    case 'reem hills phase 2b':
      finquery = 'Reem Hills - Phase 2B'
      break;
    default:
      finquery = query
      break;
  }
  const raw = JSON.stringify({ "propertyName": finquery });

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