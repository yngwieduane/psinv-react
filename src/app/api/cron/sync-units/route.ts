
import { NextResponse } from 'next/server';
import { syncAllUnits } from '@/lib/sync-units';

// This route serves as a trigger for the unit sync process.
// It can be called manually or by a cron job service.
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes

export async function GET() {
    try {
        const result = await syncAllUnits();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 500 }
        );
    }
}
