"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Segment = { name: string; href?: string };

type BreadcrumbProps = {
  customSegments?: Segment[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ customSegments }) => {
  const pathname = usePathname();
  const t = useTranslations("Breadcrumb"); 
  const autoSegments: Segment[] = (() => {
    const parts = pathname.split("/").filter(Boolean);
    parts.shift();

    return parts.map((segment, index) => {
      const fixedSegment = segment === "developer" ? "developers" : segment;

      const url = "/" + [...parts.slice(0, index), fixedSegment].join("/");
      // Translate segment name using your translation file, fallback to default
      const translatedName = t(`segments.${fixedSegment}`, {
        fallback: fixedSegment.replaceAll("-", " "),
      });
      return {
        // name: segment.replaceAll("-", " "),
        name: translatedName,
        href: url,
      };
    });
  })();

  const segments: Segment[] =
    customSegments && customSegments.length > 0
      ? customSegments
      : [{ name: t("home", { fallback: "Home" }), href: "/" }, ...autoSegments];
  const itemListElement = segments
    .filter((s) => s.href)
    .map((s, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: s.name,
      item: s.href,
    }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <nav className="bg-white dark:bg-neutral-900 py-4 text-gray-600 text-sm sm:text-xs md:text-sm lg:text-base overflow-x-auto whitespace-nowrap scrollbar-hide">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ul className="container mx-auto flex items-center space-x-2 text-gray-500">
        {segments.map((seg, index) => {
          const isLast = index === segments.length - 1;

          return (
            <li key={`${seg.name}-${index}`} className="text-sm flex items-center space-x-2">
              {index !== 0 && <span>/</span>}

              {seg.href && !isLast ? (
                <Link
                  href={seg.href}
                  title={seg.name}
                  className="hover:text-blue-600 dark:hover:text-blue-400 capitalize sm:max-w-[120px] sm:truncate sm:inline-block md:max-w-none md:whitespace-normal"
                >
                  {seg.name}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-white font-medium capitalize sm:max-w-[120px] sm:truncate sm:inline-block md:max-w-none md:whitespace-normal">
                  {seg.name}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
