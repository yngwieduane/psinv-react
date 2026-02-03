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
    case 'al zeina beachfront villas':
      finquery = 'Al Zeina - Beachfront Villas'
      break;
    case 'al zeina residential tower g':
      finquery = 'Al Zeina - Residential Tower G'
      break;
    case 'bashayer residences hudayriyat island':
      finquery = 'Bashayer Residences - Hudayriyat Island'
      break;
    case 'bayn waterway':
      finquery = 'Bayn - Waterway'
      break;
    case 'riviera residences mered':
      finquery = 'Riviera Residences - Mered'
      break;
    case 'bloom living malaga':
      finquery = 'Bloom Living - Malaga'
      break;
    case 'bloom living marbella':
      finquery = 'Bloom Living - Marbella'
      break;
    case 'riga waterfront latvia':
      finquery = 'Riga Waterfront - Latvia'
      break;
    case 'vida residences saadiyat island':
      finquery = 'Vida Residences - Saadiyat Island'
      break;
    case 'bloom living almeria':
      finquery = 'Bloom Living  - Almeria'
      break;
    case 'bloom living olvera':
      finquery = 'Bloom Living - Olvera'
      break;
    case 'the source terraces':
      finquery = 'The Source Terraces'
      break;
    case 'paramount tower hotel residences archive':
      finquery = 'Paramount Tower Hotel & Residences - Archive'
      break;
    case 'al reef tower saraya':
      finquery = 'Al Reef Tower - Saraya'
      break;
    case 'bloom living casares':
      finquery = 'Bloom Living - Casares'
      break;
    case 'yas golf collection views tower a':
      finquery = 'Yas Golf Collection Views - Tower A'
      break;
    case 'yas golf collection views tower f':
      finquery = 'Yas Golf Collection Views - Tower F'
      break;
    case 'yas golf collection views tower d':
      finquery = 'Yas Golf Collection Views - Tower D'
      break;
    case 'yas golf collection views tower e':
      finquery = 'Yas Golf Collection Views - Tower E'
      break;
    case 'the sustainable city auh':
      finquery = 'The Sustainable City - Auh'
      break;
    case 'al reeman phase 1':
      finquery = 'Al Reeman - Phase 1'
      break;
    case 'al reeman 2 phase 1':
      finquery = 'Al Reeman 2 - Phase 1'
      break;
    case 'al reeman 1 phase 1':
      finquery = 'Al Reeman 1 - Phase 1'
      break;
    case 'edge 2-at al mamsha':
      finquery = 'Edge 2 at Al Mamsha'
      break;
    case 'st regis residences':
      finquery = 'St. Regis Residences'
      break;
    case 'st regis hotel saadiyat':
      finquery = 'St Regis Hotel - Saadiyat'
      break;
    case 'jumeirah residence al maryah island':
      finquery = 'Jumeirah Residence - Al Maryah Island'
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