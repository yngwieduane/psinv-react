
import { PrismaClient } from '@/generated/prisma';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const prisma = new PrismaClient();  
    const searchParams = request.nextUrl.searchParams
    const response = await fetch('http://localhost:3000/api/external/pageprojects');
    const properties  = await response.json();
  
    const inserted = [];

    for (let i = 0; i < properties.length; i++) {
        const item = properties[i];
      try {
        const created = await prisma.property.upsert({
            where: { propertyID: item.propertyID },
            update: {},
            create: {
                propertyID: item.propertyID,
                propertyName: item.propertyName ?? '',
                propertyType: item.propertyType,
                propertyPlan: item.propertyPlan,
                slug: item.slug,
                country: item.country,
                city: item.city,
                district: item.district,
                community: item.community,
                minPrice: parseFloat(item.minPrice || '0'),
                maxPrice: parseFloat(item.maxPrice || '0'),
                enMarketingTitle: item.enMarketingTitle,
                enPropertyOverView: item.enPropertyOverView,
                mapLatitude: parseFloat(item.mapLatitude || '0'),
                mapLongitude: parseFloat(item.mapLongitude || '0'),
            },
        });
        inserted.push(created);
      } catch (err) {
        console.error(`Failed to insert propertyID: ${item.propertyID}`, err);
      }
    }

    //res.status(200).json({ inserted: inserted.length });
    if (!response) {
        const error = new Error("An error occurred while fetching projects");
        throw error;
    }

    //const projects = await response.json();
 
    return new Response(JSON.stringify({ inserted: inserted.length }), {
        headers: { 'Content-Type': 'application/json' },
    });
}