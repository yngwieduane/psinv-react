import { MetadataRoute } from 'next';
import { db } from "@/lib/firebase-admin";

export const revalidate = 86400; // Revalidate daily

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://psinv.net';
    const locales = ['en', 'ar', 'ru', 'zh', 'de'];

    // Static Pages
    const staticPages = [
        '',
        '/about-us',
        '/contact-us',
        '/projects',
        '/articles',
        '/careers',
        '/list-your-property',
        '/mortgage-calculator',
        '/favorites',
        '/compare',
        '/developers',
        '/crypto',
    ];

    // Helper sanitizers from generateSeoData (re-implementing clean versions)
    const sanitizeSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    // Fetch Projects from API (using recursive fetch or large page size)
    async function getProjects() {
        try {
            // Fetching 500 projects should cover most active ones. Adjust page size if needed.
            const res = await fetch("https://integration.psi-crm.com/ExternalApis/GetAllProperties?pageIndex=1&pageSize=500", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'apiKey': 'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ'
                },
                body: JSON.stringify({ propertyName: null, cityId: null }),
                next: { revalidate: 3600 }
            });
            if (!res.ok) return [];
            const data = await res.json();
            return Array.isArray(data) ? data : (data.result || []);
        } catch (e) {
            console.error("Sitemap Project Fetch Error", e);
            return [];
        }
    }

    // Fetch Units (Sale + Rent)
    // Fetching a reasonable limit. Full database dump might be too large for a single request.
    // We'll limit to top 1000 each for now to avoid timeouts, or use pagination if available.
    async function getUnits() {
        const fetchType = async (type: 'Sale' | 'Rent') => {
            const url = type === 'Sale'
                ? 'https://integration.psi-crm.com/ExternalApis/GetSaleListing'
                : 'https://integration.psi-crm.com/ExternalApis/GetRentListing';

            try {
                // Check API pagination support or limit? Usually returns all or top N.
                // Sending empty body
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'apiKey': 'ONjViogekmFKvSkFhYNsgQS56WNG08EORGL9QGarF8gl5aObzzBikmJlmo2wHEQ'
                    },
                    body: JSON.stringify({}),
                    next: { revalidate: 3600 }
                });
                if (!res.ok) return [];
                return await res.json();
            } catch (e) {
                console.error(`Sitemap Unit (${type}) Fetch Error`, e);
                return [];
            }
        }
        const [sales, rents] = await Promise.all([fetchType('Sale'), fetchType('Rent')]);
        return [...(Array.isArray(sales) ? sales : []), ...(Array.isArray(rents) ? rents : [])];
    }

    // Fetch Articles from Firebase
    async function getArticles() {
        try {
            const articlesRef = db.collection('articles');
            const snapshot = await articlesRef.get(); // Getting all articles
            if (snapshot.empty) return [];

            return snapshot.docs.map(doc => {
                const d = doc.data();
                return {
                    slug: d.slug,
                    category: d.category || 'general',
                    date: d.date ? (d.date.toDate ? d.date.toDate().toISOString() : new Date().toISOString()) : new Date().toISOString()
                }
            });
        } catch (e) {
            console.error("Sitemap Articles Fetch Error", e);
            return [];
        }
    }

    // --- Execution ---
    const [projects, units, articles] = await Promise.all([
        getProjects(),
        getUnits(),
        getArticles()
    ]);

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // 1. Static Pages
    staticPages.forEach(route => {
        sitemapEntries.push({
            url: `${baseUrl}/en${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
            alternates: {
                languages: locales.reduce((acc: any, locale) => {
                    acc[locale] = `${baseUrl}/${locale}${route}`;
                    return acc;
                }, {})
            }
        });
        // Optionally add entries for other locales explicitly if Next.js sitemap doesn't handle alternates automatically for distinct URLs
        // Typically declaring alternates property is enough for Google.
        // But creating a sitemap entry for EACH URL is standard practice unless relying purely on hreflang.
        // Let's create an entry for each locale variant to be safe and explicit.
        locales.filter(l => l !== 'en').forEach(locale => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.8
            });
        });
    });

    // 2. Projects
    projects.forEach((p: any) => {
        if (!p.propertyName) return;
        const city = sanitizeSlug(p.city_name || "abu-dhabi");
        const comm = sanitizeSlug(p.community || "community");
        const sub = sanitizeSlug(p.sub_community || "subcommunity");
        const proj = sanitizeSlug(p.propertyName);

        // /projects/[city]/[community]/[subcommunity]/[project]
        const path = `/projects/${city}/${comm}/${sub}/${proj}`;

        locales.forEach(locale => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 0.9
            });
        });
    });

    // 3. Units
    units.forEach((u: any) => {
        // Re-create SEO URL logic locally
        const adType = (u.isRent || u.rent) ? 'Rent' : 'Sale'; // Heuristic if isRent tag missing
        const propType = u.category || "";
        const name = u.propertyname || "";
        const community = u.community || "";
        const code = u.code || "";

        // Bedrooms
        let beds = String(u.bedrooms || "").toLowerCase();
        if (!isNaN(Number(beds)) && Number(beds) > 0) { }
        else if (beds !== 'studio') { beds = ''; } // fallback empty if not numeric/studio

        const stem = beds
            ? (beds === 'studio' ? `studio ${propType}` : `${beds} bedroom ${propType}`)
            : propType;

        const slug = sanitizeSlug(`${stem} for ${adType} ${name} ${community} ${code}`);
        const path = `/unit/${slug}`;

        locales.forEach(locale => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(u.last_updated || new Date()), // Use update date if available
                changeFrequency: 'daily',
                priority: 0.7
            });
        });
    });

    // 4. Articles
    articles.forEach((a: any) => {
        // Logic from RecentArticleRow for category structure
        let catSeg = a.category.toLowerCase().replace(/\s+/g, '-');
        // Simple area guide check
        // Ideally we check if item.city exists but skipping for simplicity or need to fetch full article data

        const path = `/articles/${catSeg}/${a.slug}`;
        locales.forEach(locale => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(a.date),
                changeFrequency: 'weekly',
                priority: 0.6
            });
        });
    });

    return sitemapEntries;
}
