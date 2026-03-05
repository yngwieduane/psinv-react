import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

// Cache for agents to avoid repeated firestore reads
let cachedAgents: any[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes

export async function GET(request: NextRequest) {
    try {
        let agents: any[];
        const now = Date.now();

        if (cachedAgents && (now - lastFetchTime < CACHE_DURATION)) {
            agents = cachedAgents;
        } else {
            const agentsRef = db.collection('agents');
            // assuming the collection is 'agents' and we are pulling everything.
            const snapshot = await agentsRef.get();
            agents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            cachedAgents = agents;
            lastFetchTime = now;
        }

        return NextResponse.json({
            result: agents,
            totalCount: agents.length
        });
    } catch (error) {
        console.error('Error fetching agents:', error);
        return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
    }
}
