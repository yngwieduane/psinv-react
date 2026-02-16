"use server";

import { db } from "@/lib/firebase-admin";
//import { BlogPost } from "@/data/blog";

type GetBlogPostsResult = {
    posts: BlogPost[];
    lastDate?: string;
    hasMore: boolean;
};

export async function getBlogPosts(
    pageSize: number = 10,
    startAfterDate?: string,
    queryText?: string
): Promise<GetBlogPostsResult> {
    try {
        const postsRef = db.collection("blog_posts");
        let query = postsRef.orderBy("date", "desc");

        // Search: Fetch limit logic (e.g. 50) and filter in memory since Firestore search is weak
        if (queryText && queryText.trim()) {
            const snapshot = await postsRef.orderBy("date", "desc").limit(50).get();
            const allFetched = snapshot.docs.map((d) => d.data() as BlogPost);

            const qLower = queryText.toLowerCase().trim();
            const filtered = allFetched.filter(
                (p) =>
                    (p.title || "").toLowerCase().includes(qLower) ||
                    (p.summary || "").toLowerCase().includes(qLower)
            );

            return {
                posts: JSON.parse(JSON.stringify(filtered)),
                hasMore: false, // Disable paging for search results
            };
        }

        // Normal Pagination
        if (startAfterDate) {
            query = query.startAfter(startAfterDate);
        }

        // Fetch one extra to determine hasMore
        const snapshot = await query.limit(pageSize + 1).get();

        const posts = snapshot.docs.map((d) => d.data() as BlogPost);
        const hasMore = posts.length > pageSize;

        if (hasMore) {
            posts.pop(); // Remove the extra one
        }

        const lastDate = posts.length > 0 ? posts[posts.length - 1].date : undefined;

        return {
            posts: JSON.parse(JSON.stringify(posts)),
            lastDate,
            hasMore,
        };
    } catch (error) {
        console.error("Error fetching blog posts via Server Action:", error);
        return {
            posts: [],
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
