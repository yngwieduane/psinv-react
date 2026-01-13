import { NextResponse } from 'next/server';
import { getAllPosts } from '@/services/wordpress';
import { db } from '@/lib/firebase-admin';

// Revalidate 0 allows this to run dynamically
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const posts = await getAllPosts(1);
        console.log(`Fetched ${posts.length} posts from WordPress.`);

        if (posts.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'No posts found to sync.',
                count: 0
            });
        }

        const batch = db.batch();
        const collectionRef = db.collection('blog_posts');

        let count = 0;
        for (const post of posts) {
            // Use slug as doc ID for easy lookup and dedup
            const docRef = collectionRef.doc(post.slug);

            // We can save the whole post object. 
            // Firestore doesn't like undefined values so we might need to sanitize if any optional fields are undefined
            // but JSON.stringify/parse removal is a quick hack, or just manual mapping.
            // Serialization:
            const postData = JSON.parse(JSON.stringify(post));

            batch.set(docRef, {
                ...postData,
                lastSyncedAt: new Date().toISOString()
            }, { merge: true });

            count++;
        }

        await batch.commit();

        return NextResponse.json({
            success: true,
            message: `Successfully synced ${count} posts to Firebase.`,
            count
        });

    } catch (error: any) {
        console.error('Error syncing blog posts:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
