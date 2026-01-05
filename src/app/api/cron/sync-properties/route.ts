
import { NextResponse } from 'next/server';
import { syncAllProperties } from '@/lib/sync-properties';

// This route serves as a trigger for the sync process.
// It can be called manually or by a cron job service.
export async function GET() {
    try {
        const result = await syncAllProperties();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 500 }
        );
    }
}
