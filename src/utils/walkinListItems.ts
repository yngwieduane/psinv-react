import { walkinFormConfig } from "@/utils/walkinConfig";

export type WalkinListItem = {
  title: string;
  branch?: string;
  href: string;
};

export const getWalkinListItems = (locale: string): WalkinListItem[] => {
  const custom: WalkinListItem[] = [
    {
      title: "Conrad Abu Dhabi Walk-in",
      branch: "AUH",
      href: `/${locale}/walk-in/conrad-abu-dhabi`,
    },
  ];
  const normal: WalkinListItem[] = Object.entries(walkinFormConfig).map(([slug, cfg]) => ({
    title: cfg.title ?? slug.replace(/-/g, " "),
    branch: cfg.branch ?? "",
    href: `/${locale}/walk-in/${slug}`,
  }));

  return [...custom, ...normal];
};