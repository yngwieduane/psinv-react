import { NextResponse } from 'next/server';
import { db } from "@/lib/firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";

export async function GET() {
    try {
        const q = query(collection(db, "properties"));
        const querySnapshot = await getDocs(q);
        let allItems = querySnapshot.docs.map(doc => doc.data());

        // Let's also find out what the distinct unitTypes are
        const unitTypesSet = new Set<string>();
        allItems.forEach(item => {
            if (item.propertyUnitTypes && Array.isArray(item.propertyUnitTypes)) {
                item.propertyUnitTypes.forEach((u: any) => {
                    if (u.unitType) unitTypesSet.add(u.unitType);
                });
            }
        });

        const searchUnitType = "apartment";
        const filteredItems = allItems.filter(item => {
            if (!item.propertyUnitTypes || !Array.isArray(item.propertyUnitTypes)) return false;
            return item.propertyUnitTypes.some((u: any) => (u.unitType?.toLowerCase() || "") === searchUnitType);
        });

        return NextResponse.json({
            total: allItems.length,
            filtered: filteredItems.length,
            availableTypes: Array.from(unitTypesSet)
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
