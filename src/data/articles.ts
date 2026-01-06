// src/data/articles.ts

// ======================================================
// ARTICLE BODY PART TYPES
// ======================================================

export type ArticleBodyPart =
  | { type: "paragraph"; content: string }
  | { type: "heading"; level?: 2 | 3 | 4; content: string }
  | { type: "quote"; content: string }
  | { type: "list"; items: string[] }
  | { type: "cta"; label: string; href: string }
  | { type: "image"; src: string; alt: string; title?: string };

// ======================================================
// CATEGORY KEYS (stable, translation-friendly)
// ======================================================

export type CategoryKey =
  | "rules_and_regulations"
  | "laws"
  | "technology"
  | "property_guide"
  | "area_guide"
  | "uae_real_estate_market_trends"
  | "real_estate_tips_advice";

// Optional: map key -> readable English label (only if you still want `category`)
export const CATEGORY_LABELS: Record<CategoryKey, string> = {
  rules_and_regulations: "Rules and Regulations",
  laws: "Laws",
  technology: "Technology",
  property_guide: "Property Guide",
  area_guide: "Area Guide",
  uae_real_estate_market_trends: "UAE Real Estate Market Trends",
  real_estate_tips_advice: "Real Estate Tips & Advice",
};

// ======================================================
// FULL ARTICLE TYPE
// ======================================================

export type Article = {
  id: number;
  slug: string;
  title?: string;
  date: string;
  author: string;
  categoryKey: CategoryKey;
  category?: string;
  imageUrl: string;
  summary?: string;
  body?: ArticleBodyPart[];
  city?: "Abu Dhabi" | "Dubai";
};

export const ARTICLES: Article[] = [
  {
    id: 101,
    slug: "green-tech-and-sustainability-uae-next-gen-real-estate-developments-for-smart-buyers",
    date: "2025-10-26",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "technology",
    category: CATEGORY_LABELS.technology,
    imageUrl:
      "/assets/images/articles/green-tech-and-sustainability-uaes-next-gen-real-estate-dvelopments-for-smart-buyers.webp",
  },
  {
    id: 102,
    slug: "best-real-estate-companies-in-the-uae",
    date: "October 28, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "real_estate_tips_advice",
    category: CATEGORY_LABELS.real_estate_tips_advice,
    imageUrl: "/assets/images/articles/best-real-estate-companies-in-the-uae.webp",
  },
  {
    id: 103,
    slug: "how-the-uaes-golden-visa-is-transforming-real-estate-investment",
    date: "October 30, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "uae_real_estate_market_trends",
    category: CATEGORY_LABELS.uae_real_estate_market_trends,
    imageUrl:
      "/assets/images/articles/how-the-uaes-golden-visa-is-transforming-real-estate-investment.webp",
  },
  {
    id: 104,
    slug: "abu-dhabi-strengthens-real-estate-investment-with-new-law-no-2-of-2025",
    date: "August 2, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "laws",
    category: CATEGORY_LABELS.laws,
    city: "Abu Dhabi",
    imageUrl:
      "/assets/images/articles/abu-dhabi-strengthens-real-estate-investment-with-new-law-no-2-of-2025.webp",
  },
  {
    id: 105,
    slug: "high-rise-vs-low-rise-developments-in-dubai-demand-and-roi",
    date: "October 29, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "uae_real_estate_market_trends",
    category: CATEGORY_LABELS.uae_real_estate_market_trends,
    imageUrl:
      "/assets/images/articles/high-rise-vs-low-rise-developments-in-dubai-demand-and-roi.webp",
  },
  {
    id: 106,
    slug: "how-retail-and-lifestyle-projects-are-increasing-property-roi-in-the-uae",
    date: "October 30, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "uae_real_estate_market_trends",
    category: CATEGORY_LABELS.uae_real_estate_market_trends,
    imageUrl:
      "/assets/images/articles/how-retail-and-lifestyle-projects-are-increasing-property-roi-in-the-uae.webp",
  },
  {
    id: 107,
    slug: "living-close-to-business-hubs-best-residential-areas-for-professionals-in-2025",
    date: "October 30, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "uae_real_estate_market_trends",
    category: CATEGORY_LABELS.uae_real_estate_market_trends,
    imageUrl:
      "/assets/images/articles/living-close-to-business-hubs-best-residential-areas-for-professionals-img1.webp",
  },
  {
    id: 108,
    slug: "affordable-housing-in-the-uae-market-analysis-and-growth-projection",
    date: "October 31, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "property_guide",
    category: CATEGORY_LABELS.property_guide,
    imageUrl:
      "/assets/images/articles/affordable-housing-in-the-uae-market-analysis-and-growth-projection.webp",
  },
  {
    id: 109,
    slug: "the-role-of-foreign-investment-in-uae-property-growth",
    date: "October 31, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "uae_real_estate_market_trends",
    category: CATEGORY_LABELS.uae_real_estate_market_trends,
    imageUrl:
      "/assets/images/articles/the-role-of-foreign-investment-in-uae-property-growth.webp",
  },
  {
    id: 110,
    slug: "best-real-estate-broker-in-abu-dhabi",
    date: "October 31, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "property_guide",
    category: CATEGORY_LABELS.property_guide,
    city: "Abu Dhabi",
    imageUrl: "/assets/images/articles/best-real-estate-broker-in-abu-dhabi.webp",
  },
  {
    id: 111,
    slug: "unlocking-the-potential-investing-in-dubai-real-estate-mid-2023",
    date: "October 31, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "property_guide",
    category: CATEGORY_LABELS.property_guide,
    city: "Dubai",
    imageUrl:
      "/assets/images/articles/unlocking-the-potential-investing-in-dubai-real-estate-mid-2.webp",
  },
  {
    id: 112,
    slug: "embracing-homeownership-in-the-UAE-a-comprehensive-exploration",
    date: "October 31, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "property_guide",
    category: CATEGORY_LABELS.property_guide,
    imageUrl:
      "/assets/images/articles/embracing-homeownership-in-the-UAE-a-comprehensive-exploration-1.webp",
  },
  {
    id: 113,
    slug: "ultimate-guide-to-purchasing-real-estate-in-dubai-in-2023",
    date: "October 31, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "property_guide",
    category: CATEGORY_LABELS.property_guide,
    city: "Dubai",
    imageUrl:
      "/assets/images/articles/ultimate-guide-to-purchasing-real-estate-in-dubai-in-2023.webp",
  },
  {
    id: 114,
    slug: "al-reem-island",
    date: "November 1, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "area_guide",
    category: CATEGORY_LABELS.area_guide,
    city: "Abu Dhabi",
    imageUrl: "/assets/images/articles/al-reem-island-image-1.jpg",
  },
  {
    id: 115,
    slug: "saadiyat-island",
    date: "November 1, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "area_guide",
    category: CATEGORY_LABELS.area_guide,
    city: "Abu Dhabi",
    imageUrl: "/assets/images/articles/article-saadiyat-img-1.jpg",
  },
  {
    id: 116,
    slug: "comprehensive-guide-to-balcony-rules-and-regulations-in-dubai",
    date: "December 30, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "rules_and_regulations",
    category: CATEGORY_LABELS.rules_and_regulations,
    city: "Dubai",
    imageUrl:
      "/assets/images/articles/comprehensive-guide-to-balcony-rules-and-regulations-in-dubai-img1.webp",
  },
  {
    id: 117,
    slug: "inclusive-guide-to-musataha-agreement-in-abu-dhabi-everything-you-need-to-know",
    date: "December 30, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "rules_and_regulations",
    category: CATEGORY_LABELS.rules_and_regulations,
    city: "Abu Dhabi",
    imageUrl: "/assets/images/articles/inclusive-guide-to-musataha-agreement-3.webp",
  },
  {
    id: 118,
    slug: "rera-empowering-abu-dhabis-real-estate-market-through-regulation",
    date: "December 30, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "rules_and_regulations",
    category: CATEGORY_LABELS.rules_and_regulations,
    city: "Abu Dhabi",
    imageUrl:
      "/assets/images/articles/rera-empowering-abu-dhabis-real-estate-market-through-regulation.webp",
  },
  {
    id: 119,
    slug: "5-year-residence-visa-unlocking-opportunities-for-retiring-expats-and-boosting-the-uae-real-estate-market",
    date: "December 30, 2025",
    author: "Property Shop Investment Editorial Team",
    categoryKey: "laws",
    category: CATEGORY_LABELS.laws,
    city: "Abu Dhabi",
    imageUrl:
      "/assets/images/articles/unlocking-opportunities-for-retiring-expats-and-boosting-the-uae-real-estate-market.webp",
  },
 {
  id: 120,
  slug: "top-property-portals-in-uae-to-buy-and-rent-real-estate",
  date: "2026-01-05",
  author: "Property Shop Investment Editorial Team",
  categoryKey: "uae_real_estate_market_trends",
  category: CATEGORY_LABELS.uae_real_estate_market_trends,
  imageUrl:
    "/assets/images/articles/top-property-portals-in-uae-to-buy-and-rent-real-estate.webp",
},
{
  id: 121,
  slug: "everything-you-need-to-know-about-tenancy-rights-and-laws-in-abu-dhabi",
  date: "2026-01-05",
  author: "Property Shop Investment Editorial Team",
  categoryKey: "rules_and_regulations",
  category: CATEGORY_LABELS.rules_and_regulations,
  city: "Abu Dhabi",
  imageUrl: "/assets/images/articles/tenancy-rights-laws-abu-dhabi.webp",
}

];

// ======================================================
// NEWS LIST FOR CARDS
// ======================================================

export type NewsItem = Pick<
  Article,
  "id" | "title" | "summary" | "category" | "categoryKey" | "date" | "imageUrl" | "slug"
>;

export const NEWS: NewsItem[] = ARTICLES.map(
  ({ id, title, summary, category, categoryKey, date, imageUrl, slug }) => ({
    id,
    title,
    summary,
    category,
    categoryKey,
    date,
    imageUrl,
    slug,
  })
);
