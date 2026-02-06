import { landingConfigs } from "../lp/[lpSlug]/LandingConfig";
import LpListClient from "./LpListClient";

export default async function Page() {
  const items = Object.entries(landingConfigs).map(([slug, cfg]) => ({
    slug,
    title: cfg.meta?.title ?? cfg.title ?? slug,
    description: cfg.meta?.description ?? cfg.description ?? "",
    image:
      cfg.meta?.ogImage ??
      cfg.ogImage ??
      "/images/og/default.jpg",
  }));

  return <LpListClient items={items} />;
}
