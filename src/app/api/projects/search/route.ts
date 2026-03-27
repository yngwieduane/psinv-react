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
    const district = searchParams.get('district')?.toLowerCase() || '';
    const community = searchParams.get('community')?.toLowerCase() || '';
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

        const todayStr = new Date().toISOString().split('T')[0];
        allItems = allItems.filter((item: any) => {
            if (!item._syncedAt) return false;
            try {
                // Ensure the date is correctly converted regardless of the stored format
                let date;
                if (typeof item._syncedAt.toDate === 'function') {
                    date = item._syncedAt.toDate();
                } else if (item._syncedAt._seconds) {
                    date = new Date(item._syncedAt._seconds * 1000);
                } else {
                    date = new Date(item._syncedAt);
                }
                return date.toISOString().split('T')[0] === todayStr;
            } catch {
                return false;
            }
        });

        // Apply filters
        if (city) {
            allItems = allItems.filter(item => (item.city?.toLowerCase() || "").includes(city));
        }

        if (district) {
            allItems = allItems.filter(item => (item.district?.toLowerCase() || "").includes(district));
        }

        if (community) {
            allItems = allItems.filter(item => (item.community?.toLowerCase() || "").includes(community));
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
