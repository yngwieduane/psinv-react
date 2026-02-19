import { MetadataRoute } from 'next';
import { db } from "@/lib/firebase-admin";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.psinv.net';
    const locales = ['en', 'ar', 'ru', 'zh', 'de'];

    const staticPages = [
        '',
        '/about-us',
        '/contact-us',
        '/projects',
        '/articles',
        '/blog',
        '/careers',
        '/list-your-property',
        '/mortgage-calculator',
        '/favorites',
        '/compare',
        '/developers',
        '/crypto',
    ];

    const sanitizeSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    // Fetch Projects
    async function getProjects() {
        try {
            const propertiesRef = db.collection('properties');
            const snapshot = await propertiesRef.get();
            if (snapshot.empty) return [];

            return snapshot.docs.map(doc => doc.data());
        } catch (e) {
            console.error("Sitemap Project Fetch Error", e);
            return [];
        }
    }

    // Fetch Units
    async function getUnits() {
        try {
            const unitsRef = db.collection('units');
            const snapshot = await unitsRef.get();
            if (snapshot.empty) return [];

            return snapshot.docs.map(doc => doc.data());
        } catch (e) {
            console.error("Sitemap Unit Fetch Error", e);
            return [];
        }
    }

    // Fetch Articles
    async function getArticles() {
        try {
            const articlesRef = db.collection('articles');
            const snapshot = await articlesRef.get();
            if (snapshot.empty) return [];

            return snapshot.docs.map(doc => {
                const d = doc.data();
                return {
                    slug: d.slug,
                    category: d.category || 'general',
                    categoryKey: d.categoryKey || '',
                    city: d.city || '',
                    date: d.date ? (d.date.toDate ? d.date.toDate().toISOString() : new Date().toISOString()) : new Date().toISOString()
                }
            });
        } catch (e) {
            console.error("Sitemap Articles Fetch Error", e);
            return [];
        }
    }

    // Fetch Blogs
    async function getBlogs() {
        try {
            const blogsRef = db.collection('blog_posts');
            const snapshot = await blogsRef.get();
            if (snapshot.empty) return [];

            return snapshot.docs.map(doc => {
                const d = doc.data();
                return {
                    slug: d.slug,
                    date: d.date ? (d.date.toDate ? d.date.toDate().toISOString() : new Date().toISOString()) : new Date().toISOString()
                }
            });
        } catch (e) {
            console.error("Sitemap Blogs Fetch Error", e);
            return [];
        }
    }

    const [projects, units, articles, blogs] = await Promise.all([
        getProjects(),
        getUnits(),
        getArticles(),
        getBlogs()
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

        const path = `/projects/${city}/${comm}/${sub}/${proj}`;

        // Main Project Page
        locales.forEach(locale => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 0.9
            });
        });

        // Project Sub-pages
        const subPages = ['payment-plan', 'photo-gallery', 'faqs', 'floor-plan'];
        subPages.forEach(subPage => {
            locales.forEach(locale => {
                sitemapEntries.push({
                    url: `${baseUrl}/${locale}${path}/${subPage}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 0.8
                });
            });
        });
    });

    // 3. Units
    units.forEach((u: any) => {
        const adType = u._sourceCategory || ((u.isRent || u.rent) ? 'Rent' : 'Sale');
        const propType = u.category || "";
        const name = u.propertyname || "";
        const community = u.community || "";
        const code = u.code || "";

        let beds = String(u.bedrooms || "").toLowerCase();
        if (!isNaN(Number(beds)) && Number(beds) > 0) { }
        else if (beds !== 'studio') { beds = ''; }

        const stem = beds
            ? (beds === 'studio' ? `studio ${propType}` : `${beds} bedroom ${propType}`)
            : propType;

        const slug = sanitizeSlug(`${stem} for ${adType} ${name} ${community} ${code}`);
        const path = `/unit/${slug}`;

        locales.forEach(locale => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(u.last_updated || new Date()),
                changeFrequency: 'daily',
                priority: 0.7
            });
        });
    });

    // 4. Articles
    const uniqueCategories = new Set<string>();
    const uniqueAreaGuideCities = new Set<string>();

    articles.forEach((a: any) => {
        let catSeg = a.category.toLowerCase().replace(/\s+/g, '-');

        // Check for area guide
        const isAreaGuide = catSeg === 'area-guide' || catSeg === 'area-guides' || a.categoryKey === 'area_guide';

        if (isAreaGuide) {
            catSeg = 'area-guide';
            if (a.city) {
                const citySlug = a.city.toLowerCase().replace(/\s+/g, '-');
                catSeg = `${catSeg}/${citySlug}`;
                uniqueAreaGuideCities.add(citySlug);
            }
        }

        // Collect Categories
        if (a.categoryKey) {
            uniqueCategories.add(a.categoryKey.replace(/_/g, '-'));
        }

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

    // 4.1 Article Categories
    uniqueCategories.forEach(catSlug => {
        const path = `/articles/category/${catSlug}`;
        locales.forEach(locale => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7
            });
        });
    });

    // 4.2 Area Guide Cities
    uniqueAreaGuideCities.forEach(citySlug => {
        const path = `/articles/area-guide/${citySlug}`;
        locales.forEach(locale => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.7
            });
        });
    });

    // 5. Blogs
    blogs.forEach((b: any) => {
        const path = `/blog/${b.slug}`;
        locales.forEach(locale => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(b.date),
                changeFrequency: 'weekly',
                priority: 0.6
            });
        });
    });

    return sitemapEntries;
}
