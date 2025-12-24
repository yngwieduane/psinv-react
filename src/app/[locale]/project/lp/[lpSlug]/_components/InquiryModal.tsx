"use client";

import { useEffect, useState } from "react";
import InquiryForm from "./InquiryForm";
import type { CRMMeta } from "../LandingConfig";
type Props = {
  crm: CRMMeta;
  triggerText: string;
  triggerClassName?: string;
  variant?: "glass" | "solid";
};
export default function InquiryModal({
  crm,
  triggerText,
  triggerClassName,
  variant = "solid",
}: Props) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <>
      <button type="button" className={triggerClassName} onClick={() => setOpen(true)}>
        {triggerText}
      </button>

      {open && (
        <div className="fixed inset-0 z-[999]">
          <button
            type="button"
            aria-label="Close modal"
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-[1000] mx-auto flex min-h-screen items-center justify-center p-4">
            <div className="relative w-full max-w-[560px]">
            <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="
                absolute -right-3 -top-3
                z-[9999]
                flex h-10 w-10 items-center justify-center
                rounded-full
                bg-black/80 text-white text-xl
                hover:bg-black
            "
            >
            ✕
            </button>
              <InquiryForm crm={crm} variant={variant} className="w-full max-w-none" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
