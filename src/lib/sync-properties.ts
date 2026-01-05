import { db } from "@/lib/firebase-admin";


export async function syncAllProperties() {
    const MAX_PAGES = 15;
    const PAGE_SIZE = 100;
    const API_KEY = "ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ";

    let totalSynced = 0;
    const errors: any[] = [];

    console.log(`Starting sync of properties (Pages 1-${MAX_PAGES})...`);

    for (let page = 1; page <= MAX_PAGES; page++) {
        try {
            console.log(`Fetching page ${page}...`);

            const raw = JSON.stringify({
                "propertyName": null,
                "cityId": null,
            });

            const response = await fetch(
                `https://integration.psi-crm.com/ExternalApis/GetAllProperties?pageIndex=${page}&pageSize=${PAGE_SIZE}`,
                {
                    method: "POST",
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json',
                        'apiKey': API_KEY
                    },
                    body: raw,
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch page ${page}: ${response.statusText}`);
            }

            const projects = await response.json();

            if (!Array.isArray(projects.result) || projects.result.length === 0) {
                console.log(`Page ${page} returned no projects. Stopping.`);
                break;
            }

            // Firestore Batch Write (Admin SDK)
            const batch = db.batch();

            projects.result.forEach((project: any) => {
                const docId = String(project.propertyID || project.id || `unknown_${Date.now()}_${Math.random()}`);

                // Admin SDK doc reference
                const docRef = db.collection("properties").doc(docId);

                batch.set(docRef, {
                    ...project,
                    _syncedAt: new Date(), // Admin SDK uses native Date or Timestamp
                    _sourcePage: page
                }, { merge: true });
            });

            await batch.commit();
            totalSynced += projects.length;
            console.log(`Synced ${projects.length} properties from page ${page}.`);

        } catch (error) {
            console.error(`Error syncing page ${page}:`, error);
            errors.push({ page, error: String(error) });
        }
    }

    console.log(`Sync completed. Total synced: ${totalSynced}`);
    return { success: true, totalSynced, errors };
}
