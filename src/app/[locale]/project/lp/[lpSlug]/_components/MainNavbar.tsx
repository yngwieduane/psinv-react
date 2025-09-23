"use client";

import Link from "next/link";
import {useTranslations} from "next-intl";
import {useState} from "react";
import {Menu, X} from "lucide-react";
import LanguageSwitch from "./LanguageSwitch";

export default function MainNavbar({ locale }: { locale: string }) {
  const t = useTranslations("Navbar");
  const [open, setOpen] = useState(false);

  const items = [
    { id: "home",       label: t("home") },
    { id: "about",      label: t("about") },
    { id: "floor-plans",label: t("floorPlan") },
    { id: "location",   label: t("location") },
    { id: "gallery",    label: t("gallery") }
  ];

  return (
    <nav className="w-full text-white">
      <div className="container mx-auto px-4 py-3 lg:py-4 flex items-center">
        <div className="shrink-0">
          <Link href={`/${locale}`}>
            <img src="/images/logo-psi-white.svg" alt="PSI Logo" className="h-8 w-auto" />
          </Link>
        </div>
        <div className="flex-1 hidden lg:flex justify-center">
          <ul className="flex items-center gap-8">
            {items.map(item => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="hover:text-orange-400">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <LanguageSwitch current={locale} />
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden ml-auto p-2 rounded hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-[#1b0e3d] px-4 pb-4 space-y-3">
          <div className="pt-2 pb-3 border-b border-white/10">
            <LanguageSwitch current={locale} />
          </div>
          <ul className="space-y-2">
            {items.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block py-2 hover:text-orange-400"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
