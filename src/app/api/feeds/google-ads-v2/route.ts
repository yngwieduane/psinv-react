import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    // 1. Helper for URL generation (Project specific)
    const sanitizeSlug = (str: string) => {
        if (!str) return 'n-a';
        return str.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
    };

    // 2. Fetch Data from CRM (Projects)
    const headers = {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'apiKey': 'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ'
    };

    try {
        // Fetch all projects (using a large pageSize to get everything, or simple pagination if needed)
        // For feed purposes, getting 1000 should cover active projects usually.
        const response = await fetch(
            "https://integration.psi-crm.com/ExternalApis/GetAllProperties?pageIndex=1&pageSize=1000",
            {
                method: "POST",
                headers,
                body: JSON.stringify({}), // Empty body filters nothing
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }

        const data = await response.json();
        const projects = data.result || [];

        // 3. Process Data
        const convertToCSV = (arr: any[]) => {
            // DSA Page Feed Headers
            const csvHeaders = [
                'Page URL',
                'Custom Label'
            ];

            const locales = ['en', 'ar', 'ru', 'zh', 'de'];
            let allRows: string[] = [];

            arr.forEach(item => {
                // Ensure text fields exist
                const baseName = item.propertyName || "Project";

                // Helper for safe access
                const getVal = (val: any) => val || "";

                // Cities/Communities for URL structure
                const citySlug = sanitizeSlug(item.city);
                const communitySlug = sanitizeSlug(item.community);
                const subCommunitySlug = sanitizeSlug(item.subCommunity);
                const projectSlug = sanitizeSlug(item.propertyName);

                locales.forEach(locale => {
                    const isAr = locale === 'ar';

                    // 1. Page URL
                    // /projects/[city]/[community]/[subcommunity]/[project]
                    const finalUrl = `https://psinv.net/${locale}/projects/${citySlug}/${communitySlug}/${subCommunitySlug}/${projectSlug}`;

                    // 2. Custom Label
                    // Format: City;Community;ProjectName
                    // Using English names mostly for targeting consistency, but localized names if preferred?
                    // Typically labels are for grouping in Ads, so English is safer unless campaigns correspond to languages strictly.
                    // Given the goal is usually to group by location/project:
                    let cityName = getVal(item.city);
                    let communityName = getVal(item.community);
                    let projectName = getVal(item.propertyName);

                    // If we want localized labels for campaigns targeting specific languages:
                    if (isAr) {
                        if (item.city_Ar) cityName = item.city_Ar;
                        if (item.community_Ar) communityName = item.community_Ar;
                        if (item.propertyName_Ar) projectName = item.propertyName_Ar;
                    }

                    const customLabel = [cityName, communityName, projectName].filter(Boolean).join(";");

                    // Helper to escape CSV field
                    const escape = (val: string) => {
                        if (!val) return "";
                        const str = String(val);
                        if (str.includes(",") || str.includes('"') || str.includes("\n")) {
                            return `"${str.replace(/"/g, '""')}"`;
                        }
                        return str;
                    };

                    const row = [
                        escape(finalUrl),
                        escape(customLabel)
                    ].join(",");

                    allRows.push(row);
                });
            });

            return [csvHeaders.join(","), ...allRows].join("\n");
        };

        const csvData = convertToCSV(projects);

        return new NextResponse(csvData, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': 'attachment; filename="google_ads_dsa_feed.csv"',
            },
        });

    } catch (error) {
        console.error("Error generating project feed:", error);
        return new NextResponse(JSON.stringify({ error: 'Failed to generate feed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
