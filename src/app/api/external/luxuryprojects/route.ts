import { NextRequest } from "next/server";

export async function GET(request: NextRequest){
    try {
        const pageSize = 24;
        const totalPages = 10;
        const allowedTypes = ["residential", "residential building"];
        const allProjects : any[] = [];

        for(let page = 1; page <= totalPages; page++ ) {
            const raw = JSON.stringify({ "pageIndex": page, "pageSize": pageSize });

            const res = await fetch(
                `https://integration.psi-crm.com/ExternalApis/GetAllProperties?pageIndex=${page}&pageSize=${pageSize}`,
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

            if (!res.ok) {
                console.error(`Failed to fetch page ${page}`);
                continue;
            }

            const data = await res.json();
            if(data?.result?.length) {
                allProjects.push(...data.result);
            }
        }
        
        const filtered = allProjects.filter(proj => {
            const maxPriceNum = Number(proj.maxPrice);

            return (
                !isNaN(maxPriceNum) &&
                maxPriceNum > 7000000 &&

                typeof proj.propertyType === "string" &&
                allowedTypes.includes(proj.propertyType.toLowerCase().trim()) &&

                Array.isArray(proj.featuredImages)&&
                proj.featuredImages.length > 0
            );
        } );

        const limitedProjects = filtered.slice(0,7);

        return new Response(JSON.stringify({ result: limitedProjects }), {
            headers: { 'Content-Type': 'application/json' },
        });

    } catch(error){
        console.error("Error fetching projects:", error);
        return new Response(JSON.stringify({ result: [] }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }
}