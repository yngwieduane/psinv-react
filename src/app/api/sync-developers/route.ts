import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';
import slugify from 'react-slugify';

export async function GET() {
    try {
        console.log(`Starting sync for developers...`);

        const response = await fetch("https://integration.psi-crm.com/ExternalApis/GetDevelopersContact?source=1", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*',
                'apiKey': 'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ'
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const rawDevelopers = await response.json();

        if (!Array.isArray(rawDevelopers)) {
            throw new Error("Invalid format received from the CRM API.");
        }

        const developers = rawDevelopers;

        // Firebase batch handles max 500 operations
        const MAX_BATCH_SIZE = 500;
        let totalSynced = 0;

        for (let i = 0; i < developers.length; i += MAX_BATCH_SIZE) {
            const batch = db.batch();
            const chunk = developers.slice(i, i + MAX_BATCH_SIZE);

            chunk.forEach((dev) => {
                const slugStr = slugify(dev.name) || "";
                const combinedId = slugStr ? `${dev.id}-${slugStr}` : String(dev.id);
                const docRef = db.collection('developers').doc(combinedId);
                batch.set(docRef, { ...dev, slug: slugStr }, { merge: true });
            });

            await batch.commit();
            totalSynced += chunk.length;
        }

        console.log(`Successfully synced ${totalSynced} developers.`);

        return NextResponse.json({
            success: true,
            summary: {
                totalSynced,
            }
        });

    } catch (error: any) {
        console.error("Global Sync Error:", error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
