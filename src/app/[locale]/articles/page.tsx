import { db } from "@/lib/firebase-admin";
import Articles2ClientPage from "./_components/Articles2ClientPage";

async function getArticles() {
    try {
        //console.log("Attempting to fetch 'articles' collection...");
        const articlesRef = db.collection('articles');
        const snapshot = await db
            .collection("articles")
            .get();


        console.log(`Fetch complete. Documents found: ${snapshot.size}`);

        if (snapshot.empty) {
            //console.log("Collection is empty or permission denied (check logs).");
            return [];
        }

        const docs = snapshot.docs.map(doc => {
            const data = doc.data();

            // Calculate sortDate for proper ordering
            let sortDate = 0;
            if (data.createdAt && typeof data.createdAt.toDate === 'function') {
                sortDate = data.createdAt.toDate().getTime();
            } else if (data.createdAt) {
                // Try parsing if string/number
                const ts = new Date(data.createdAt).getTime();
                if (!isNaN(ts)) sortDate = ts;
            } else if (data.date && typeof data.date.toDate === 'function') {
                sortDate = data.date.toDate().getTime();
            } else if (data.date) {
                const ts = new Date(data.date).getTime();
                if (!isNaN(ts)) sortDate = ts;
            }

            const date = data.date && typeof data.date.toDate === 'function'
                ? data.date.toDate().toISOString().split('T')[0]
                : data.date || '';

            let createdAt = '';
            if (data.createdAt && typeof data.createdAt.toDate === 'function') {
                createdAt = data.createdAt.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            } else if (data.createdAt) {
                createdAt = String(data.createdAt);
            }

            return {
                ...data,
                id: doc.id,
                date: date,
                createdAt: createdAt,
                sortDate: sortDate,
                title: data.title || '',
                summary: data.summary || '',
                imageUrl: data.image || data.imageUrl || '',
                image: data.image || data.imageUrl || '',
                author: data.author || '',
                categoryKey: data.categoryKey || '',
                translations: data.translations || {},
            };
        });

        const plainDocs = JSON.parse(JSON.stringify(docs));

        return plainDocs.sort((a: any, b: any) => {
            // Sort by sortDate descending
            return (b.sortDate || 0) - (a.sortDate || 0);
        });

    } catch (error) {
        console.error("Error fetching articles from Firestore:", error);
        return [];
    }
}

export const metadata = {
    title: "Real Estate Articles & Insights | Property Shop Investment",
    description: "Read the latest news, market trends, and expert advice on UAE real estate.",
};

export default async function Page() {
    const articles = await getArticles();

    return <Articles2ClientPage initialArticles={articles} />;
}
