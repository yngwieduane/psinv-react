import { useLocale, useTranslations } from "next-intl";
import { Metadata } from "next";
import PageClient from "./page-client";

export const metadata: Metadata = {
    title: "PSI Emirati Hub – Empowering UAE Nationals in Real Estate",
    description: "Discover PSI's Emirati Hub, a strategic partnership with the Dubai Real Estate Brokers Program aimed at increasing UAE national participation in the real estate sector.",
};

export default function Page() {
    return (
        <PageClient />
    );
}
