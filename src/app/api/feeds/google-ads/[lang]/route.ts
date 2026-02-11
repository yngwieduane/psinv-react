import { NextRequest, NextResponse } from 'next/server';
import { locales } from '@/utils/i18n-config';

export const dynamic = 'force-dynamic';

export async function GET(
    request: NextRequest,
    { params }: { params: { lang: string } }
) {
    const lang = params.lang;

    // Validate language
    if (!locales.includes(lang as any)) {
        return new NextResponse('Invalid language', { status: 400 });
    }

    // 1. Define function to generate SEO URL (logic adapted from generateSeoData.ts)
    const sanitizeTitle = (str: string) => str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const generateSeoUrl = (item: any, adType: string) => {
        let seoUrl = "";
        const name = item.propertyname || "";
        const community = item.community || "";
        const code = item.code || "";
        const propertyType = item.category || "";

        // Check bedrooms
        // The API might return bedrooms as string "1", "2" or "studio" or null.
        // We treat "studio" specially or numeric specially.

        // Normalize bedrooms to string for check
        const bedroomsStr = String(item.bedrooms || "").toLowerCase();
        const isNumeric = !isNaN(Number(bedroomsStr)) && Number(bedroomsStr) > 0;

        if (isNumeric) {
            seoUrl = sanitizeTitle(`${bedroomsStr} bedroom ${propertyType} for ${adType} ${name} ${community} ${code}`);
        } else if (bedroomsStr === "studio") {
            seoUrl = sanitizeTitle(`studio ${propertyType} for ${adType} ${name} ${community} ${code}`);
        } else {
            seoUrl = sanitizeTitle(`${propertyType} for ${adType} ${name} ${community} ${code}`);
        }

        return seoUrl;
    };

    // 2. Fetch Data from CRM
    const headers = {
        'accept': '*/*',
        'Content-Type': 'application/json',
        'apiKey': 'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ'
    };

    try {
        const urls = [
            'https://integration.psi-crm.com/ExternalApis/GetSaleListing',
            'https://integration.psi-crm.com/ExternalApis/GetRentListing'
        ];

        // Prepare body for "All" listings (empty filter or specific if needed)
        const body = JSON.stringify({});

        const [saleRes, rentRes] = await Promise.all(urls.map(url =>
            fetch(url, { method: "POST", headers, body })
                .then(res => {
                    if (!res.ok) throw new Error(`Failed to fetch from ${url}`);
                    return res.json();
                })
                .catch(err => {
                    console.error(err);
                    return []; // Fallback to empty on error
                })
        ));

        // 3. Process Data
        const convertToCSV = (arr: any[]) => {
            const csvHeaders = [
                'Listing ID',
                'Listing name',
                'Final URL',
                'Image URL',
                'City name',
                'Description',
                'Price',
                'Property type',
                'Listing type',
                'Address',
                'Contextual keywords'
            ];

            let allRows: string[] = [];

            arr.forEach(item => {
                // Determine type and price
                const isRent = item.isRent === true; // We'll tag this manually when merging
                const listingType = isRent ? 'For Rent' : 'For Sale';
                const priceVal = isRent ? item.rent : item.sellprice;
                const priceParam = priceVal ? `${priceVal} AED` : '0 AED';
                const adType = isRent ? 'Rent' : 'Sale';

                // SEO URL
                const seoUrl = generateSeoUrl(item, adType);
                // Use locale in URL
                const finalUrl = `https://psinv.net/${lang}/unit/${seoUrl}`;

                // Image (picking first one)
                let imageUrl = "";
                if (item.imageurl) {
                    const parts = item.imageurl.split('|');
                    if (parts.length > 0) imageUrl = parts[0];
                }

                // Content based on locale
                const isAr = lang === 'ar';

                const city = isAr ? (item.city_name_ar || item.city_name || "") : (item.city_name || "");
                const community = isAr ? (item.sub_community_ar || item.community || item.community_ar || "") : (item.community || "");
                const address = `${community}, ${city}`;

                let name = item.marketingTitle || item.propertyname || "Property";
                if (isAr && item.title_AR) {
                    name = item.title_AR;
                }

                let description = item.remarks || "";
                if (isAr && item.description_Ar) {
                    description = item.description_Ar;
                }
                description = description.replace(/[\r\n]+/g, " ").substring(0, 500); // Truncate if too long

                const propertyType = item.category || "Property";

                // Keywords
                const keywords = [propertyType, community, city, listingType].filter(Boolean).join(";");

                // Unique ID per locale
                const id = `${item.code}-${lang}`;

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
                    escape(id),
                    escape(name),
                    escape(finalUrl),
                    escape(imageUrl),
                    escape(city),
                    escape(description),
                    escape(priceParam),
                    escape(propertyType),
                    escape(listingType),
                    escape(address),
                    escape(keywords)
                ].join(",");

                allRows.push(row);
            });

            return [csvHeaders.join(","), ...allRows].join("\n");
        };

        // Tag records
        const saleItems = Array.isArray(saleRes) ? saleRes.map((i: any) => ({ ...i, isRent: false })) : [];
        const rentItems = Array.isArray(rentRes) ? rentRes.map((i: any) => ({ ...i, isRent: true })) : [];

        const allItems = [...saleItems, ...rentItems];
        const csvData = convertToCSV(allItems);

        return new NextResponse(csvData, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="google_ads_feed_${lang}.csv"`,
            },
        });

    } catch (error) {
        console.error("Error generating feed:", error);
        return new NextResponse(JSON.stringify({ error: 'Failed to generate feed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
