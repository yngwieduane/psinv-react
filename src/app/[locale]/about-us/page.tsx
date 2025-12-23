
import { Metadata } from "next";
import AboutPageClient from "./page-client";

export const metadata: Metadata = {
    title: "About Us - property shop investment",
    description: "Property shop investments is a real estate expert's vision come true.It is a well-known and respected real estate company operating in the UAE from its Head Office in Abu Dhabi.",
};

export default function AboutPage() {

    return (
        <AboutPageClient />
    )
}