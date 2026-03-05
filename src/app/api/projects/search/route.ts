import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

// Simple in-memory cache to avoid repeated Firestore reads for full dataset
let cachedProperties: any[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const pageStr = searchParams.get('page');
    const page = pageStr ? parseInt(pageStr, 10) : 1;
    const city = searchParams.get('city')?.toLowerCase() || '';
    const community = searchParams.get('community')?.toLowerCase() || '';
    const subcommunity = searchParams.get('subcommunity')?.toLowerCase() || '';
    const propertyname = searchParams.get('propertyname')?.toLowerCase() || '';
    const propertyUnitTypes = searchParams.get('propertyUnitTypes')?.toLowerCase() || '';
    const propertyPlan = searchParams.get('propertyPlan')?.toLowerCase() || '';

    try {
        let allItems: any[];
        const now = Date.now();

        if (cachedProperties && (now - lastFetchTime < CACHE_DURATION)) {
            allItems = cachedProperties;
        } else {
            const propertiesRef = db.collection('properties');
            const snapshot = await propertiesRef.get();
            allItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            cachedProperties = allItems;
            lastFetchTime = now;
        }

        // Apply filters
        if (city) {
            allItems = allItems.filter(item => (item.city?.toLowerCase() || "").includes(city));
        }

        if (community) {
            allItems = allItems.filter(item => (item.community?.toLowerCase() || "").includes(community));
        }

        if (subcommunity) {
            allItems = allItems.filter(item => (item.subCommunity?.toLowerCase() || "").includes(subcommunity));
        }

        if (propertyname) {
            allItems = allItems.filter(item =>
                (item.propertyName?.toLowerCase() || "").includes(propertyname) ||
                (item.enMarketingTitle?.toLowerCase() || "").includes(propertyname)
            );
        }

        if (propertyUnitTypes) {
            allItems = allItems.filter(item => {
                if (!item.propertyUnitTypes || !Array.isArray(item.propertyUnitTypes)) return false;
                return item.propertyUnitTypes.some((u: any) => {
                    if (typeof u === 'string') {
                        return u.toLowerCase() === propertyUnitTypes;
                    } else if (u && typeof u === 'object' && u.unitType) {
                        return u.unitType.toLowerCase() === propertyUnitTypes;
                    }
                    return false;
                });
            });
        }

        if (propertyPlan) {
            allItems = allItems.filter(item => (item.propertyPlan?.toLowerCase() || "") === propertyPlan);
        }

        const pageSize = 24;
        const totalCount = allItems.length;

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedItems = allItems.slice(startIndex, endIndex);

        return NextResponse.json({
            result: paginatedItems,
            totalCount: totalCount
        });

    } catch (error) {
        console.error('Error fetching properties from search API:', error);
        return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
    }
}
