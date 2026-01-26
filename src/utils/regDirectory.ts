// src/app/utils/regDirectory.ts
import { PROJECTS } from "@/utils/projectOverrides";

export type RegCard = {
  slug: string;
  href: string;
  title: string;
  description: string;
  image: string;
  fallbackImage: string;
  branch: "auh" | "dubai" | "assets";
};

function getSeo(seo: any, locale: string) {
  if (!seo) return {};
  if ("en" in seo) return seo[locale] || seo.en;
  return seo;
}

const DEFAULT_IMAGE = "/images/registration-projects/default.webp";

export function getRegDirectory(locale: string): RegCard[] {
  return Object.entries(PROJECTS)
    .map(([slug, config]) => {
      const seo = getSeo(config.seo, locale);
      const isProjectPage =
        !slug.endsWith("registration") &&
        !slug.endsWith("-registration") &&
        !slug.includes("reg");

      const href = `/project/${slug}`;

      return {
        slug,
        href,
        title: seo?.title ?? slug.replace(/-/g, " "),
        description: seo?.description ?? "",
        image: `/images/registration-projects/${slug}-${locale}.webp`,
        fallbackImage: DEFAULT_IMAGE,
        branch: config.branch,
      };
    })
    .filter((item) => !item.slug.startsWith("test"))
    .sort((a, b) => a.title.localeCompare(b.title));
}
