const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
if (!admin.apps.length) admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function run() {
    console.log("Fetching properties...");
    const snap = await db.collection('properties').limit(500).get();
    let allItems = [];
    snap.forEach(doc => allItems.push(doc.data()));

    const searchUnitType = "apartment"; // e.g., user selected 'Apartment'

    console.log("Total fetched:", allItems.length);

    // Test the filter logic
    const filtered = allItems.filter(item => {
        if (!item.propertyUnitTypes || !Array.isArray(item.propertyUnitTypes)) return false;
        return item.propertyUnitTypes.some((u) => {
            if (typeof u === 'string') {
                return u.toLowerCase() === searchUnitType;
            } else if (u && typeof u === 'object' && u.unitType) {
                return u.unitType.toLowerCase() === searchUnitType;
            }
            return false;
        });
    });

    console.log("Matches for 'apartment':", filtered.length);
    if (filtered.length > 0) {
        console.log("Sample match:", filtered[0].propertyName, filtered[0].propertyUnitTypes);
    }
}
run();
