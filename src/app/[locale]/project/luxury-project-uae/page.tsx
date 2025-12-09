import { Metadata } from "next";
import LuxuryProjectPageClient from "./page-client";

export const metadata: Metadata = {
    title: "Discover Luxury Real Estate Projects in UAE",
    description: "Explore the finest luxury real estate projects in UAE with Property Shop Investment. Find exclusive properties in prime locations across Abu Dhabi and Dubai, featuring world-class amenities and breathtaking views. Get expert advice and personalized service to secure your dream home today.",
};

export default function LuxuryProjectPage() {
    
    return(
        <LuxuryProjectPageClient />
    )
}