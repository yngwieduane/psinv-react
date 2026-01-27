
import { Metadata } from "next";
import CareersPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Careers - Property Shop Investment",
  description: "Join Property Shop Investment (PSI) and unlock your professional growth. We offer continuous training, workshops, and a path to excellence in real estate.",
};

export default function CareersPage() {
  return (
    <CareersPageClient />
  )
}
