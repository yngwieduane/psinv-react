"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useLocale, useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail } from "lucide-react";
import clsx from "clsx";

import type { CRMMeta } from "../LandingConfig";
export interface InquiryFormProps {
  crm: CRMMeta;
  variant?: "glass" | "solid";
  className?: string;
}
/* ---------------- language map ---------------- */
const languageMap: Record<string, string> = {
  en: "115915",
  ar: "115911",
  ru: "115925",
  sr: "115926",
  fr: "115916",
  de: "115917",
  es: "115928",
  zh: "115913",
  it: "115921",
  tr: "115930",
  nl: "115914",
};
/* ---------------- media/source mapping ---------------- */
type MediaMap = { MediaType: number; MediaName: number; MethodOfContact?: number };

const SOURCE_MAP: Record<string, MediaMap> = {
  hubspot:    { MediaType: 63906,  MediaName: 63907 },
  newsletter: { MediaType: 166277, MediaName: 166071 },
  sms:        { MediaType: 129474, MediaName: 165366 },
  google:     { MediaType: 165269, MediaName: 128455 },
  snapchat:   { MediaType: 165269, MediaName: 166858 },
  facebook:   { MediaType: 165269, MediaName: 131010 },
  blog:       { MediaType: 167313, MediaName: 167314 },
  instagram:  { MediaType: 165269, MediaName: 166728 },
  youtube:    { MediaType: 165269, MediaName: 166053 },
  whatsapp:   { MediaType: 165269, MediaName: 166453 },
  tiktok:     { MediaType: 165269, MediaName: 167836 },
  chatbot:    { MediaType: 167696, MediaName: 167697, MethodOfContact: 167215 },
};
const DEFAULT_MEDIA: MediaMap = { MediaType: 165232, MediaName: 165233 };
// SOURCE_MAP
const SOURCE_ALIASES: Record<string, string> = {
  hubspotemail: "hubspot",
  hs_email: "hubspot",
  hsemail: "hubspot",
  hubspot: "hubspot",

  google: "google",
  googleadwordsbanner: "google",
  googleadwords: "google",
  googleadword: "google",
  googleads: "google",
  google_ads: "google",

  facebook: "facebook",
  instagram: "instagram",
  youtube: "youtube",
  "youtube-ads": "youtube",
  snapchat: "snapchat",
  whatsapp: "whatsapp",
  tiktok: "tiktok",

  newsletter: "newsletter",
  sms: "sms",
  blog: "blog",
  chatbot: "chatbot",
};

function normalizeSource(v?: string | null) {
  const s = (v || "").toLowerCase().replace(/\s+/g, "").replace(/[-_]+/g, "");
  return SOURCE_ALIASES[s] ?? s;
}

function detectSourceFromReferrer(ref: string, path: string): string | undefined {
  const r = ref.toLowerCase();
  if (/facebook\.com|fb\.com/.test(r)) return "facebook";
  if (/instagram\.com/.test(r)) return "instagram";
  if (/tiktok\.com/.test(r)) return "tiktok";
  if (/snapchat\.com/.test(r)) return "snapchat";
  if (/youtube\.com|youtu\.be/.test(r)) return "youtube";
  if (/google\./.test(r)) return "google";
  if (/whatsapp\.com/.test(r)) return "whatsapp";
  if (path.includes("/newsletter")) return "newsletter";
  if (path.includes("/blog")) return "blog";
  return undefined;
}
const inputShell =
  "relative flex items-center h-14 overflow-hidden rounded-md bg-white " +
  "border border-[#E6E8F3] shadow-sm focus-within:ring-2 focus-within:ring-[#F26522]/40";

const inputIcon = "absolute left-3 text-[#7C86A5]";
const inputBase =
  "w-full h-full bg-white text-[#1A1A1A] placeholder:text-[#667085] pl-10 pr-4 outline-none";
const DEBUG = false;

export default function InquiryForm({ crm, variant = "glass", className }: InquiryFormProps) {
  const t = useTranslations("InquiryForm");
  const locale = useLocale() as string;
  const schema = z.object({
    firstName: z.string().min(1, { message: t("errors.firstName") }),
    lastName: z.string().min(1, { message: t("errors.lastName") }),
    email: z.string().email({ message: t("errors.email") }),
    phone: z.string().min(7, { message: t("errors.phone") }),
    consent1: z.boolean().optional(),
    consent2: z.boolean().optional(),
    consent3: z.boolean().optional(),
  });
  type FormData = z.infer<typeof schema>;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const formScope = typeof window !== "undefined" ? window.location.pathname : "lp";
  const getSubmitKey = (email: string) => `lastSubmit:${email}:${formScope}`;
  const hasRecentlySubmitted = (email: string) => {
    const last = typeof window !== "undefined" ? localStorage.getItem(getSubmitKey(email)) : null;
    if (!last) return false;
    return Date.now() - parseInt(last, 10) < 300_000; // 5 min
  };
  const markAsSubmitted = (email: string) =>
    typeof window !== "undefined" &&
    localStorage.setItem(getSubmitKey(email), Date.now().toString());
  const { register, control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { consent1: true, consent2: true, consent3: true },
  });
  const onSubmit = async (data: FormData) => {
    if (hasRecentlySubmitted(data.email)) {
      alert(t("alerts.duplicate"));
      return;
    }
const qp = typeof window !== "undefined"
  ? new URLSearchParams(window.location.search)
  : new URLSearchParams();

const utmFromUrl = {
  source: qp.get("utm_source") || qp.get("source") || "",
  medium: qp.get("utm_medium") || "",
  campaign: qp.get("utm_campaign") || "",
};
const hasUTM = !!(utmFromUrl.source || utmFromUrl.medium || utmFromUrl.campaign);
const sourceKey = normalizeSource(utmFromUrl.source);
const mapped = sourceKey ? SOURCE_MAP[sourceKey] : undefined;
const utmRawMeta = crm?.utmMetaMap?.[utmFromUrl.campaign] || undefined;
const resolvedMedia = {
  MediaType: mapped?.MediaType ?? utmRawMeta?.media_Type ?? DEFAULT_MEDIA.MediaType,
  MediaName: mapped?.MediaName ?? utmRawMeta?.media_Name ?? DEFAULT_MEDIA.MediaName,
  MethodOfContact:
    mapped?.MethodOfContact ?? utmRawMeta?.MethodOfContactVal ?? crm?.MethodOfContactVal ?? 0,
};
    // util
    const stripDirectionChars = (input: string) => input.replace(/[\u202A-\u202E]/g, "");

    // remarks
    const fullRemark = `
${t("consents.additional1")} : ${data.consent1 ? "YES" : "NO"}</br>
${t("consents.additional2")} : ${data.consent2 ? "YES" : "NO"}</br>
${t("consents.additional3")} : ${data.consent3 ? "YES" : "NO"}</br>
${t("remarks.label")}: ${crm?.utmRemarksMap?.[utmFromUrl.campaign] || crm?.remarks || ""}</br>
${t("remarks.clientName")}: ${data.firstName} ${data.lastName}</br>
${t("remarks.clientEmail")}: ${data.email}</br>
${t("remarks.clientPhone")}: ${data.phone}</br>
branch: ${crm?.Branch || ""}</br>
URL coming from: ${typeof window !== "undefined" ? window.location.href : ""}`;

    const payload = {
      TitleID: "129932",
      FirstName: data.firstName,
      FamilyName: data.lastName,
      MobileCountryCode: "971",
      MobileAreaCode: "",
      MobilePhone: data.phone,
      TelephoneCountryCode: "",
      TelephoneAreaCode: "",
      Telephone: "",
      Email: data.email,
      NationalityID: "65946",
      LanguageID: languageMap[locale] || "115915",
      CompanyID: "",
      Remarks: crm?.utmRemarksMap?.[utmFromUrl.campaign] || crm?.remarks || "",
      RequirementType: crm?.RequirementType ?? 91212,
      ContactType: crm?.ContactType,
      CountryID: crm?.CountryID,
      StateID: crm?.StateID,
      CityID: crm?.CityID,
      DistrictID: crm?.DistrictID || "",
      CommunityID: crm?.CommunityID ?? "",
      SubCommunityID: crm?.SubCommunityID ?? "",
      PropertyID: (crm as any)?.PropertyID ?? "",
      UnitType: crm?.UnitType,
      MediaType: resolvedMedia.MediaType,
      MediaName: resolvedMedia.MediaName,
      MethodOfContact: resolvedMedia.MethodOfContact ?? 0,
      DeactivateNotification: "",
      Bedroom: crm?.Bedroom ?? 21935,
      Bathroom: crm?.Bathroom ?? 21935,
      Budget: (crm as any)?.Budget ?? "100000",
      Budget2: (crm as any)?.Budget2 ?? "1000000",
      AreaFrom: "300",
      RequirementCountryID: crm?.CountryID,
      ExistingClient: "",
      CompaignSource: "",
      CompaignMedium: "",
      Company: "",
      NumberOfEmployee: "",
      LeadStageId: "",
      LeadRatingId: "",
      UnitId: "",
      ReferredToID: (crm?.refto ?? 3458).toString(),
      ReferredByID: (crm?.refby ?? 3458).toString(),
      ActivityAssignedTo: (crm?.assignto ?? 3458).toString(),
      ActivityDate: "",
      ActivityTypeId: "167234",
      ActivitySubject: "Email Inquiry Copy",
      ActivityRemarks: stripDirectionChars(fullRemark),
      IsForAutoRotation: "true",
      PropertyCampaignId: hasUTM ? (crm?.utmCampaignMap?.[utmFromUrl.campaign] ?? "") : "",
      google_gclid: "",

      ...(hasUTM
        ? {
            utm_campaign: utmFromUrl.campaign,
            utm_source: utmFromUrl.source,
            utm_medium: utmFromUrl.medium,
          }
        : {}),
    };

    try {
      setIsSubmitting(true);

      if (DEBUG) {
        console.log("%c[InquiryForm] Raw FormData", "font-weight:bold");
        console.table(data as any);
        console.log("%c[InquiryForm] CRM Meta (from LandingConfig)", "font-weight:bold");
        console.dir(crm);
        console.log("%c[InquiryForm] Payload (no POST)", "font-weight:bold");
        console.dir(payload);
        setSuccessMessage("✅ Captured locally. Open the console to see the payload.");
        return;
      }
      const res = await fetch("/api/external/registrationlp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        console.error("Registration error:", json);
        alert(t("alerts.error"));
        return;
      }

      markAsSubmitted(data.email);
      setSuccessMessage(t("alerts.success"));
      setTimeout(() => {
        window.location.href = `/${locale}/thankyou?email=${encodeURIComponent(data.email)}`;
      }, 1500);
    } catch (err) {
      console.error(err);
      alert(t("alerts.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- wrapper style by variant ---------------- */
  const wrapper = clsx(
    "rounded-2xl p-6 md:p-8 shadow-xl",
    variant === "glass"
      ? "bg-gradient-to-b from-black/40 via-black/35 to-black/30 backdrop-blur-md text-white"
      : "bg-[#2B2F66] text-white",
    className
  );

  const isRTL = locale === "ar";

  return (
    <div className={wrapper} dir={isRTL ? "rtl" : "ltr"}>
      {successMessage && (
        <div className="mb-4 rounded bg-green-600/90 px-3 py-2 text-sm">
          {successMessage}
        </div>
      )}

      <h2 className="mb-5 text-xl md:text-2xl font-bold">{t("title")}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 inquiry-form max-w-[520px]">
        {/* First name */}
        <div>
          <label className="mb-1 block text-sm leading-5">{t("fields.firstName.label")}</label>
          <div className={inputShell}>
            <span className={inputIcon}><User size={18} /></span>
            <input
              type="text"
              {...register("firstName")}
              placeholder={t("fields.firstName.placeholder")}
              className={inputBase}
            />
          </div>
          {errors.firstName && <p className="mt-1 text-xs text-red-300">{errors.firstName.message}</p>}
        </div>

        {/* Last name */}
        <div>
          <label className="mb-1 block text-sm leading-5">{t("fields.lastName.label")}</label>
          <div className={inputShell}>
            <span className={inputIcon}><User size={18} /></span>
            <input
              type="text"
              {...register("lastName")}
              placeholder={t("fields.lastName.placeholder")}
              className={inputBase}
            />
          </div>
          {errors.lastName && <p className="mt-1 text-xs text-red-300">{errors.lastName.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1 block text-sm leading-5">{t("fields.phone.label")}</label>
          <div className={inputShell}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  international
                  defaultCountry="AE"
                  placeholder={t("fields.phone.placeholder")}
                  className="w-full h-full"
                />
              )}
            />
          </div>
          {errors.phone && <p className="mt-1 text-xs text-red-300">{errors.phone.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm leading-5">{t("fields.email.label")}</label>
          <div className={inputShell}>
            <span className={inputIcon}><Mail size={18} /></span>
            <input
              type="email"
              {...register("email")}
              placeholder={t("fields.email.placeholder")}
              className={inputBase}
            />
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 w-full rounded-md bg-[#F26522] px-4 py-3 font-semibold text-white shadow-md hover:bg-[#e35d1f] disabled:opacity-60"
        >
          {isSubmitting ? t("buttons.submitting") : t("buttons.submit")}
        </button>

        {/* Fine print */}
        <p className="mt-1 text-[13px] italic text-white/90">
          {t.rich("fineprint.text", {
            terms: (chunks) => <a href="/terms" className="underline">{chunks}</a>,
            privacy: (chunks) => <a href="/privacy" className="underline">{chunks}</a>
          })}
        </p>

        {/* Consents */}
        <div className="space-y-2 pt-2 text-[13px]">
          <label className="flex items-start gap-2">
            <input type="checkbox" {...register("consent1")} className="mt-1" defaultChecked />
            <span className="text-white/95">{t("consents.c1")}</span>
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" {...register("consent2")} className="mt-1" defaultChecked />
            <span className="text-white/95">{t("consents.c2")}</span>
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" {...register("consent3")} className="mt-1" defaultChecked />
            <span className="text-white/95">{t("consents.c3")}</span>
          </label>
        </div>
      </form>

      {/* PhoneInput cosmetics */}
      <style jsx global>{`
        .PhoneInput { width: 100%; }
        .PhoneInputInput {
          width: 100%;
          background: transparent;
          color: #1a1a1a;
          padding: 0.75rem 1rem;
          border: 0;
          outline: none;
        }
        .PhoneInputCountry {
          background: transparent;
          padding-left: 2.5rem;
        }
        .inquiry-form label {
          color: #fff !important;
          font-weight: 400;
          font-size: 14px;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}
