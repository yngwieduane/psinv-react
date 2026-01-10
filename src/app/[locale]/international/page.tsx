import { Metadata } from "next";
import InternationalPageClient from "./page-client";

export const metadata: Metadata = {
    title: "International - The new land of opportunities",
    description: "International - The new land of opportunities - Offers the best climate for wealth management, relocation and investments portfolios"
}

export default function InternationalPage() {
    return <InternationalPageClient />
}