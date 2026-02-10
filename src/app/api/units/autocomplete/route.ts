
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query || query.length < 2) {
        return NextResponse.json({ results: [] });
    }

    const lowerQuery = query.toLowerCase();

    // Capitalize first letter of each word to match stored format (Title Case)
    const capitalizedQuery = query.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');

    try {
        const unitsRef = db.collection('units');

        // Query 1: Property Name
        const propertiesSnapshot = await unitsRef
            .where('propertyname', '>=', capitalizedQuery)
            .where('propertyname', '<=', capitalizedQuery + '\uf8ff')
            .limit(20) // Fetch a bit more to allow for dedup locally
            .get();

        // Query 2: Community
        const communitiesSnapshot = await unitsRef
            .where('community', '>=', capitalizedQuery)
            .where('community', '<=', capitalizedQuery + '\uf8ff')
            .limit(20)
            .get();

        const results = new Map<string, any>();

        // Process Properties
        propertiesSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.propertyname && data.property_Pk) {
                // Key by property_Pk to deduplicate properties
                if (!results.has(`prop_${data.property_Pk}`)) {
                    results.set(`prop_${data.property_Pk}`, {
                        name: data.propertyname,
                        id: data.property_Pk.toString(),
                        type: 'Project',
                        community: data.community,
                        community_pk: data.community_pk
                    });
                }
            }
        });

        // Process Communities
        communitiesSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.community && data.community_pk) {
                // Key by community_pk to deduplicate communities
                if (!results.has(`comm_${data.community_pk}`)) {
                    results.set(`comm_${data.community_pk}`, {
                        name: data.community,
                        id: data.community_pk.toString(),
                        type: 'Community',
                        city: data.city_name,
                        city_pk: data.city_pk
                    });
                }
            }
        });

        // Convert map to array and limit to 10
        const searchResults = Array.from(results.values()).slice(0, 10);

        return NextResponse.json({ results: searchResults });

    } catch (error) {
        console.error('Error fetching units:', error);
        return NextResponse.json({ error: 'Failed to fetch units' }, { status: 500 });
    }
}
