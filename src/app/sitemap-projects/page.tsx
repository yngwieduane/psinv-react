import { db } from "@/lib/firebase-admin";

export const revalidate = 0;

export default async function SitemapProjectsPage() {
    let projects: any[] = [];
    try {
        const propertiesRef = db.collection('properties');
        const snapshot = await propertiesRef.get();
        if (!snapshot.empty) {
            projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
    } catch (e) {
        console.error("Sitemap Projects Page Fetch Error", e);
        return <div className="p-8 text-red-500">Error fetching projects: {String(e)}</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Sitemap Projects Verification</h1>
            <div className="mb-4">
                <span className="font-semibold">Total Projects Found:</span> {projects.length}
            </div>

            <div className="grid gap-2">
                {projects.map((p, i) => (
                    <div key={p.id || i} className="p-3 border rounded hover:bg-gray-50">
                        <div className="font-medium">{p.propertyName || "Unnamed Project"}, {p.community || "Unnamed Project"}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
