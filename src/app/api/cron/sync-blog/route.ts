import { NextResponse } from 'next/server';
import { getAllPosts } from '@/services/wordpress';
import { db, admin } from '@/lib/firebase-admin';

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

        const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
        console.log('Using storage bucket:', bucketName);

        // Pass bucket name explicitly to be safe
        const bucket = admin.storage().bucket(bucketName);

        // Helper to upload image
        const uploadImageToFirebase = async (url: string, slug: string): Promise<string | null> => {
            if (!url || url.includes('firebaseharvest') || url.includes('firebasestorage')) return url; // Already firebase or invalid

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);

                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // Determine extension
                const extension = url.split('.').pop()?.split('?')[0] || 'jpg';
                const fileName = `blog-images/${slug}.${extension}`;
                const file = bucket.file(fileName);

                await file.save(buffer, {
                    metadata: {
                        contentType: response.headers.get('content-type') || 'image/jpeg',
                    },
                    public: true, // Make it public
                });

                // Construct public URL
                return file.publicUrl();
            } catch (error) {
                console.error(`Failed to upload image for ${slug}:`, error);
                return null;
            }
        };

        let count = 0;
        for (const post of posts) {
            // Use slug as doc ID for easy lookup and dedup
            const docRef = collectionRef.doc(post.slug);

            // Upload image if exists
            let firebaseUrl = post.imageUrl;
            if (post.imageUrl && !post.imageUrl.includes('placeholder')) {
                const uploaded = await uploadImageToFirebase(post.imageUrl, post.slug);
                if (uploaded) {
                    firebaseUrl = uploaded;
                }
            }

            // Serialization:
            const postData = JSON.parse(JSON.stringify(post));
            postData.imageUrl = firebaseUrl;

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
