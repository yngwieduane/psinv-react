import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import InternationalPageClient from "./page-client";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('InternationalPage');

    return {
        title: "International - The new land of opportunities",
        description: "International - The new land of opportunities - Offers the best climate for wealth management, relocation and investments portfolios"
    }
}

export default function InternationalPage() {
    return <InternationalPageClient />
}