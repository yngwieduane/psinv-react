import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    // Capitalize first letter of each word to match stored format (Title Case)
    const capitalizedQuery = query.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');

    try {
        const propertiesRef = db.collection('properties');

        // Query 1: Property Name
        const propertiesSnapshot = await propertiesRef
            .where('propertyName', '>=', capitalizedQuery)
            .where('propertyName', '<=', capitalizedQuery + '\uf8ff')
            .limit(10) // Limit to 10
            .get();

        // Query 2: Community
        const communitiesSnapshot = await propertiesRef
            .where('community', '>=', capitalizedQuery)
            .where('community', '<=', capitalizedQuery + '\uf8ff')
            .limit(10)
            .get();

        // Query 3: City
        const citiesSnapshot = await propertiesRef
            .where('city', '>=', capitalizedQuery)
            .where('city', '<=', capitalizedQuery + '\uf8ff')
            .limit(10)
            .get();

        // Query 4: Subcommunity
        const subcommunitiesSnapshot = await propertiesRef
            .where('subCommunity', '>=', capitalizedQuery)
            .where('subCommunity', '<=', capitalizedQuery + '\uf8ff')
            .limit(10)
            .get();

        // Query 5: Property Unit Types
        const unitTypesSnapshot = await propertiesRef
            .where('propertyUnitTypes', 'array-contains', { unitType: capitalizedQuery })
            .limit(10)
            .get();

        const results = new Map<string, any>();

        // Process Properties
        propertiesSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.propertyName) {
                // Key by propertyName to deduplicate properties
                if (!results.has(`prop_${data.propertyName}`)) {
                    results.set(`prop_${data.propertyName}`, {
                        name: data.propertyName,
                        id: doc.id,
                        type: 'Project',
                        community: data.community,
                        city: data.city
                    });
                }
            }
        });

        // Process Communities
        communitiesSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.community) {
                // Key by community to deduplicate communities
                if (!results.has(`comm_${data.community}`)) {
                    results.set(`comm_${data.community}`, {
                        name: data.community,
                        id: `comm_${data.community}`,
                        type: 'Community',
                        city: data.city
                    });
                }
            }
        });

        // Process Subcommunities
        subcommunitiesSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.subCommunity && data.subCommunity !== "n-a") {
                // Key by subCommunity to deduplicate subCommunities
                if (!results.has(`subcomm_${data.subCommunity}`)) {
                    results.set(`subcomm_${data.subCommunity}`, {
                        name: data.subCommunity,
                        id: `subcomm_${data.subCommunity}`,
                        type: 'Subcommunity',
                        community: data.community,
                        city: data.city
                    });
                }
            }
        });

        // Process Unit Types
        unitTypesSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.propertyName) {
                // Key by propertyName to deduplicate properties
                if (!results.has(`prop_${data.propertyName}`)) {
                    results.set(`prop_${data.propertyName}`, {
                        name: data.propertyName,
                        id: doc.id,
                        type: 'Project',
                        community: data.community,
                        city: data.city
                    });
                }
            }
        });

        // Process Cities
        citiesSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.city) {
                // Key by city to deduplicate cities
                if (!results.has(`city_${data.city}`)) {
                    results.set(`city_${data.city}`, {
                        name: data.city,
                        id: `city_${data.city}`,
                        type: 'City'
                    });
                }
            }
        });

        // Convert map to array and limit to 10 overall to avoid too long a dropdown
        const searchResults = Array.from(results.values()).slice(0, 10);

        return NextResponse.json({ results: searchResults });

    } catch (error) {
        console.error('Error fetching properties:', error);
        return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
    }
}
