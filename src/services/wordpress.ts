import { BlogPost, BlogCategoryKey } from "@/data/blog";

const WP_API_URL = "https://blog.psinv.net/wp-json/wp/v2";

export type WPPost = {
    id: number;
    date: string;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    _embedded?: {
        "wp:featuredmedia"?: Array<{
            source_url: string;
        }>;
        author?: Array<{
            name: string;
        }>;
    };
};

// Helper to strip HTML tags for summary
function stripHtml(html: string) {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, "");
}

function transformPost(wpPost: WPPost): BlogPost {
    const imageUrl =
        wpPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/assets/images/placeholder.jpg"; // Default placeholder if no image

    const author = wpPost._embedded?.author?.[0]?.name || "PSI Team";

    return {
        id: wpPost.id,
        slug: wpPost.slug,
        title: stripHtml(wpPost.title.rendered), // Titles sometimes have HTML entities
        date: new Date(wpPost.date).toISOString().split("T")[0], // YYYY-MM-DD
        author: author,
        categoryKey: "company_news" as BlogCategoryKey, // Default category as WP categories might not map 1:1 yet
        category: "Company News", // Visual label
        imageUrl: imageUrl,
        summary: stripHtml(wpPost.excerpt.rendered).slice(0, 150) + "...",
        contentHtml: wpPost.content.rendered,
    };
}

export async function getPosts(page = 1, perPage = 10): Promise<BlogPost[]> {
    try {
        const res = await fetch(
            `${WP_API_URL}/posts?_embed&page=${page}&per_page=${perPage}`,
            { next: { revalidate: 3600 } } // Revalidate every hour
        );

        if (!res.ok) {
            console.error("Failed to fetch posts", await res.text());
            return [];
        }

        const data: WPPost[] = await res.json();
        return data.map(transformPost);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const res = await fetch(`${WP_API_URL}/posts?_embed&slug=${slug}`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) return null;

        const data: WPPost[] = await res.json();
        if (data.length === 0) return null;

        return transformPost(data[0]);
    } catch (error) {
        console.error("Error fetching post by slug:", error);
        return null;
    }
}

export async function getAllPosts(maxPages?: number): Promise<BlogPost[]> {
    let allPosts: BlogPost[] = [];
    let page = 1;
    const perPage = 100; // Max per page for WP API usually

    while (true) {
        if (maxPages && page > maxPages) break;
        const posts = await getPosts(page, perPage);
        if (posts.length === 0) break;
        allPosts = [...allPosts, ...posts];
        page++;
    }

    return allPosts;
}
