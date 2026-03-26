import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const bannersCollection = db.collection('banners');
    const querySnapshot = await bannersCollection.get();
    
    const rawBanners = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      let parsedUrl = '';
      if (data.landingPageUrl) {
        try {
          const urlObj = new URL(data.landingPageUrl);
          parsedUrl = urlObj.pathname.replace(/^\/(en|ar|ru|zh|de|fr)\//, '/'); 
        } catch (e) {
          parsedUrl = data.landingPageUrl;
        }
      }

      return {
        id: doc.id,
        name: doc.id,
        image: data.imageBannerUrl || '',
        title: data.title || '',
        description: data.shortDescription || '',
        location: data.subTitle || data.city || '',
        developer_img: data.iconUrl || data.iconUrlMobile || '',
        project_url: parsedUrl,
        features: [],
        loyaltyTitle: '',
        featured: !!data.featured,
        rawCity: data.city || '',
      };
    });

    return NextResponse.json(rawBanners);
  } catch (error) {
    console.error('Error fetching banners via API:', error);
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
  }
}
