"use server";

import { db } from "@/lib/firebase-admin";
import { BlogPost } from "@/data/blog";

type GetBlogPostsResult = {
    posts: BlogPost[];
    totalPages: number;
    totalPosts: number;
    currentPage: number;
    hasMore: boolean;
};

export async function getBlogPosts(
    page: number = 1,
    pageSize: number = 10,
    queryText?: string
): Promise<GetBlogPostsResult> {
    try {
        const postsRef = db.collection("blog_posts");
        const snapshot = await postsRef.orderBy("date", "desc").get();

        let allPosts = snapshot.docs.map((d) => d.data() as BlogPost);

        // Search filter in memory
        if (queryText && queryText.trim()) {
            const qLower = queryText.toLowerCase().trim();

            allPosts = allPosts.filter(
                (p) =>
                    (p.title || "").toLowerCase().includes(qLower) ||
                    (p.summary || "").toLowerCase().includes(qLower)
            );
        }

        const totalPosts = allPosts.length;
        const totalPages = Math.max(1, Math.ceil(totalPosts / pageSize));

        const safePage = Math.min(Math.max(page, 1), totalPages);
        const startIndex = (safePage - 1) * pageSize;
        const endIndex = startIndex + pageSize;

        const paginatedPosts = allPosts.slice(startIndex, endIndex);

        return {
            posts: JSON.parse(JSON.stringify(paginatedPosts)),
            totalPages,
            totalPosts,
            currentPage: safePage,
            hasMore: safePage < totalPages,
        };
    } catch (error) {
        console.error("Error fetching blog posts via Server Action:", error);
        return {
            posts: [],
            totalPages: 1,
            totalPosts: 0,
            currentPage: 1,
            hasMore: false,
        };
    }
}


export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const docRef = db.collection("blog_posts").doc(slug);
        const doc = await docRef.get();

        if (doc.exists) {
            const data = doc.data() as BlogPost;
            return JSON.parse(JSON.stringify(data));
        }

        // Fallback: Try searching by slug field if ID mismatch (older implementation nuance)
        const q = db.collection("blog_posts").where("slug", "==", slug).limit(1);
        const snapshot = await q.get();
        if (!snapshot.empty) {
            const data = snapshot.docs[0].data() as BlogPost;
            return JSON.parse(JSON.stringify(data));
        }

        return null;
    } catch (error) {
        console.error("Error fetching blog post by slug:", error);
        return null;
    }
}
