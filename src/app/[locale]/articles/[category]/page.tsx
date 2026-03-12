import { db } from "@/lib/firebase-admin";
import { notFound } from "next/navigation";
import Articles2ClientPage from "../_components/Articles2ClientPage";

type PageProps = {
  params: Promise<{ category: string; locale: string }>;
};

type FirestoreArticle = {
  translations: any;
  id: string | number;
  slug: string;
  title: string;
  summary: string;
  body: any[];
  createdAt: string;
  author: string;
  categoryKey: string;
  category?: string;
  image: string;
  city?: string;
};

function normalizeCategoryToSlug(category?: string) {
  return (category || "").toLowerCase().trim().replace(/\s+/g, "-");
}

async function getArticlesByCategory(categorySlug: string): Promise<FirestoreArticle[]> {
  const snapshot = await db.collection("articles").get();

  const docs: (FirestoreArticle & { sortDate: number })[] = snapshot.docs.map((doc) => {
    const data = doc.data();

    let createdAt = "";
    let sortDate = 0;

    if (data.createdAt && typeof data.createdAt.toDate === "function") {
      const dateObj = data.createdAt.toDate();
      createdAt = dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      sortDate = dateObj.getTime();
    } else if (data.createdAt) {
      createdAt = String(data.createdAt);
      const parsed = new Date(data.createdAt).getTime();
      if (!isNaN(parsed)) sortDate = parsed;
    }

    return {
      ...data,
      id: doc.id,
      slug: data.slug || "",
      title: data.title || "",
      summary: data.summary || "",
      body: data.body || [],
      createdAt,
      author: data.author || "",
      category: data.category || "",
      categoryKey: data.categoryKey || "",
      image: data.image || data.imageUrl || "",
      city: data.city || "",
      translations: data.translations || {},
      sortDate,
    };
  });

  const filtered = docs
    .filter((item) => normalizeCategoryToSlug(item.category) === categorySlug)
    .sort((a, b) => b.sortDate - a.sortDate);

  return JSON.parse(JSON.stringify(filtered));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  const articles = await getArticlesByCategory(category);

  if (!articles.length) {
    notFound();
  }

  return <Articles2ClientPage initialArticles={articles} />;
}