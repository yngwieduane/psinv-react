
import { NextResponse } from "next/server";

function sortDevelopers(developers: any[]) {
  const checked : any[] = [];
  const unchecked : any[] = [];

  developers.forEach((developer) => {
    const tmp = {
      id : developer.id,
      name: developer.name,
      slug: developer.slug,
      logo: developer.logo,
      checked: false,
    };

    unchecked.push(tmp);
  });
  return [...checked, ...unchecked];
}

export async function GET() {
  try {
    const response = await fetch("https://integration.psi-crm.com/ExternalApis/GetDevelopersContact?source=1", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'apiKey': 'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ'
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const sortedDevelopers = sortDevelopers(data);
    return NextResponse.json({ result: sortedDevelopers });
    
  } catch (error) {
    console.error("Error fetching developer list:", error);
    return NextResponse.json({ result: [] }, { status: 500 });
  }
}
