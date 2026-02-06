import { db } from "@/lib/firebase-admin";

const API_KEY = "ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ";

interface SyncTarget {
    source: 'auh' | 'assets';
    category: 'Sale' | 'Rent';
    url: string;
}

const TARGETS: SyncTarget[] = [
    { source: 'auh', category: 'Sale', url: 'https://integration.psi-crm.com/ExternalApis/GetSaleListing' },
    { source: 'auh', category: 'Rent', url: 'https://integration.psi-crm.com/ExternalApis/GetRentListing' },
    { source: 'assets', category: 'Sale', url: 'https://integration.psiassets-crm.com/ExternalApis/GetSaleListing' },
    { source: 'assets', category: 'Rent', url: 'https://integration.psiassets-crm.com/ExternalApis/GetRentListing' }
];

async function syncTarget(target: SyncTarget) {
    console.log(`Starting sync for ${target.source} - ${target.category}...`);
    try {
        const response = await fetch(target.url, {
            method: "POST",
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'apiKey': API_KEY
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch ${target.url}: ${response.status}`);
        }

        let data = await response.json();
        let units: any[] = [];

        if (Array.isArray(data)) {
            units = data;
        } else if (data.result && Array.isArray(data.result)) {
            units = data.result;
        } else if (data.data && Array.isArray(data.data)) {
            units = data.data;
        }

        if (units.length === 0) {
            console.log(`No units found for ${target.source} - ${target.category}`);
            return { count: 0, error: null };
        }

        console.log(`Fetched ${units.length} units for ${target.source} - ${target.category}. Saving to Firestore...`);

        const BATCH_SIZE = 450;
        let textLog = "";
        let savedCount = 0;

        for (let i = 0; i < units.length; i += BATCH_SIZE) {
            const chunk = units.slice(i, i + BATCH_SIZE);
            const batch = db.batch();

            chunk.forEach((unit: any) => {
                const rawId = unit.unitId || unit.propertyID || unit.propertyId || unit.id || unit.code;

                if (!rawId) {
                    console.warn(`Skipping unit without ID in ${target.source} ${target.category}`);
                    return;
                }

                const docId = String(rawId);
                const docRef = db.collection("units").doc(docId);

                batch.set(docRef, {
                    ...unit,
                    _syncedAt: new Date(),
                    _sourceCategory: target.category,
                    source: target.source
                }, { merge: true });
            });

            await batch.commit();
            savedCount += chunk.length;
            console.log(`Saved batch ${i / BATCH_SIZE + 1} for ${target.source} - ${target.category}`);
        }

        return { count: savedCount, error: null };

    } catch (err) {
        console.error(`Error syncing ${target.source} - ${target.category}:`, err);
        return { count: 0, error: String(err) };
    }
}

export async function syncAllUnits() {
    console.log("Starting full unit download...");

    let totalSynced = 0;
    const errors: any[] = [];
    const details: any = {};

    for (const target of TARGETS) {
        const result = await syncTarget(target);
        totalSynced += result.count;
        if (result.error) {
            errors.push({ target: `${target.source}-${target.category}`, error: result.error });
        }

        if (!details[target.source]) details[target.source] = {};
        details[target.source][target.category] = result.count;
    }

    console.log(`Full sync complete. Total units: ${totalSynced}`);
    return { success: true, totalSynced, details, errors };
}
