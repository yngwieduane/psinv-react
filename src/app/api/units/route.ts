import { NextRequest, NextResponse } from 'next/server';
import { db } from "@/lib/firebase-admin";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get('category'); // 'Sale' or 'Rent'
        const propertyId = searchParams.get('propertyId');
        const communityId = searchParams.get('communityId');
        const beds = searchParams.get('beds');
        const propertyType = searchParams.get('propertyType');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const minArea = searchParams.get('minArea');
        const maxArea = searchParams.get('maxArea');
        const unitid = searchParams.get('unitid');

        let query: FirebaseFirestore.Query = db.collection('units');

        if (category) {
            const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
            query = query.where('_sourceCategory', '==', normalizedCategory);
        }

        if (propertyId) {
            query = query.where('propertyId', '==', propertyId);
        }

        const snapshot = await query.get();
        let units = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Filter by specific Unit ID
        if (unitid) {
            units = units.filter((u: any) =>
                String(u.unitId) === unitid ||
                String(u.id) === unitid ||
                String(u.code) === unitid
            );
        }

        // Filter by Community
        if (communityId) {
            units = units.filter((u: any) => String(u.communityId) === communityId);
        }

        // Filter by Beds (Exact or >=?) usually exact for listings
        if (beds) {
            units = units.filter((u: any) => String(u.bedrooms) === beds);
        }

        // Filter by Price
        if (minPrice) {
            units = units.filter((u: any) => {
                const price = parseFloat(u.sellprice || u.price || 0);
                return price >= parseFloat(minPrice);
            });
        }
        if (maxPrice) {
            units = units.filter((u: any) => {
                const price = parseFloat(u.sellprice || u.price || 0);
                return price <= parseFloat(maxPrice);
            });
        }

        // Filter by Property Type (Apartment, Villa, etc)
        if (propertyType) {
            units = units.filter((u: any) =>
                u.category?.toLowerCase() === propertyType.toLowerCase()
            );
        }

        // Filter by Area
        if (minArea) {
            units = units.filter((u: any) => {
                const area = parseFloat(u.unitSize || u.area || 0);
                return area >= parseFloat(minArea);
            });
        }
        if (maxArea) {
            units = units.filter((u: any) => {
                const area = parseFloat(u.unitSize || u.area || 0);
                return area <= parseFloat(maxArea);
            });
        }

        // Pagination
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const total = units.length;
        const paginatedUnits = units.slice(startIndex, endIndex);

        return NextResponse.json({
            units: paginatedUnits,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });

    } catch (error) {
        console.error("Error fetching units from Firestore:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
