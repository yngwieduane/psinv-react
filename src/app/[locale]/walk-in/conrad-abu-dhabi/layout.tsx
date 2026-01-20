import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conrad Abu Dhabi Walk-in Registration | Property Shop Investment",
  description:
    "Register for the Conrad Abu Dhabi Etihad Towers walk-in event. Explore luxury apartments, sales and leasing opportunities with Property Shop Investment.",
  alternates: {
    canonical: "https://www.psinv.net/en/walk-in/conrad-abu-dhabi",
  },
  keywords: [
    "Conrad Abu Dhabi",
    "Etihad Towers Walk-in",
    "Walk-in Registration Abu Dhabi",
    "Property Shop Investment",
    "PSI Abu Dhabi",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
