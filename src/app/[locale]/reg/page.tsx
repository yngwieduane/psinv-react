// src/app/[locale]/reg/page.tsx
import type { Metadata } from "next";
import RegDirectoryClient from "./reg-client";


export const metadata: Metadata = {
  title: "Registration Pages | Property Shop Investment",
  description: "Browse and search all registration pages in one place.",
};

export default function RegDirectoryPage() {
  return <RegDirectoryClient />;
}
