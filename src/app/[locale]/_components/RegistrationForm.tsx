"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import clsx from "clsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getProjectMeta } from '@/utils/projectMeta';
import type { RegistrationFormPayload } from "@/types/registrationTypes";
import { useTranslations } from 'next-intl';
import type { FieldConfig } from '@/types/projectMeta';
import {
  visibleExtraFields,
  defaultsForExtraFields,
  applyExtraFieldsToPayload,
} from '@/utils/projectMeta';

const errMsg = (e: unknown): string | undefined => {
  if (!e || typeof e !== "object") return undefined;
  const m = (e as { message?: unknown }).message;
  return typeof m === "string" ? m : undefined;
};
const languageMap: Record<string, string> = {
  en: "115915", ar: "115911", ru: "115925", sr: "115926", fr: "115916", cn: "115913",
  de: "115917", es: "115928", zh: "115913", it: "115921", tr: "115930", nl: "115914",
};
type Property = {
  propertyID: string;
  propertyName: string;
  country: string;
  city: string;
  district: string;
  community: string;
  subCommunity: string;
};

const normalizeForLangId = (l: string | undefined) => {
  const s = (l ?? '').toLowerCase();
  if (s.startsWith('ar')) return 'ar';
  if (s === 'cn' || s.startsWith('zh')) return 'zh';
  return 'en';
};

type RegistrationFormProps = { slug: string };

/* ---------------- safe localStorage helpers ---------------- */
function safeGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try { return window.localStorage.getItem(key); } catch { return null; }
}
function safeSet(key: string, value: string) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(key, value); } catch { }
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ slug }) => {
  const locale = useLocale();
  const t = useTranslations('InquiryForm');
  const isRTL = locale.toLowerCase().startsWith('ar');
  const langIdLocale = normalizeForLangId(locale);
  const projectMeta = useMemo(() => getProjectMeta(slug), [slug]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const baseSchema = useMemo(() => z.object({
    firstName: z.string().min(1, { message: t('errors.firstName') }),
    lastName: z.string().min(1, { message: t('errors.lastName') }),
    email: z.string().email({ message: t('errors.email') }),
    phone: z.string().min(7, { message: t('errors.phone') }),
    consent1: z.boolean().optional(),
    consent2: z.boolean().optional(),
    consent3: z.boolean().optional(),
  }), [t]);
  const searchParams = useSearchParams();
  useEffect(() => {
    const keys = ["utm_source", "utm_medium", "utm_campaign"] as const;
    keys.forEach((k) => {
      const v = searchParams.get(k);
      if (v) safeSet(k, v);
    });
  }, [searchParams]);
  const utm_campaign = useMemo(
    () => searchParams.get("utm_campaign") || safeGet("utm_campaign") || "",
    [searchParams]
  );
  const utm_source = useMemo(
    () => searchParams.get("utm_source") || safeGet("utm_source") || "",
    [searchParams]
  );
  const utm_medium = useMemo(
    () => searchParams.get("utm_medium") || safeGet("utm_medium") || "",
    [searchParams]
  );
  const extraFields: FieldConfig[] = useMemo(
    () => visibleExtraFields(projectMeta, utm_campaign),
    [projectMeta, utm_campaign]
  );

  const extraDefaults = useMemo(
    () => defaultsForExtraFields(extraFields),
    [extraFields]
  );
  const schema = useMemo(() => {
    if (!extraFields.length) return baseSchema;

    const extraShape: Record<string, z.ZodTypeAny> = {};
    for (const f of extraFields) {
      if (f.type === 'checkbox') {
        extraShape[f.id] = f.required ? z.literal(true, { errorMap: () => ({ message: 'Required' }) }) : z.boolean().optional();
      } else if (f.type === 'number') {
        let znum = z.coerce.number({ invalid_type_error: 'Required' });
        if (f.min != null) znum = znum.min(f.min);
        if (f.max != null) znum = znum.max(f.max);
        extraShape[f.id] = f.required ? znum : znum.optional();
      } else {
        let zstr = z.string().trim();
        extraShape[f.id] = f.required ? zstr.min(1, { message: 'Required' }) : zstr.optional();
      }
    }
    return baseSchema.extend(extraShape);
  }, [baseSchema, extraFields]);
  useEffect(() => {
  const needsPropertySelect = extraFields.some((f) => f.id === "propertyId");
  if (!needsPropertySelect) return;

  const fetchProps = async () => {
    try {
      setPropertiesLoading(true);

      let apiUrl = "/api/external/allproperties?page=1&limit=2000";
      // optional branch condition (same logic like your other component)
      if ((projectMeta?.Branch || "").toLowerCase() === "dubai") {
        apiUrl += "&cityId=26786";
      }

      const res = await fetch(apiUrl);
      const json = await res.json();

      setProperties(json?.result || []);
    } catch (e) {
      console.error("Failed to fetch properties", e);
      setProperties([]);
    } finally {
      setPropertiesLoading(false);
    }
  };

  fetchProps();
}, [extraFields, projectMeta?.Branch]);
  const propertyOptions = useMemo(() => {
  return [
    { value: "", label: propertiesLoading ? "Loading properties..." : "Select a property" },
    ...properties.map((p) => ({
      value: p.propertyID,
      label: p.propertyName,
    })),
  ];
}, [properties, propertiesLoading]);

  type FormData = z.infer<typeof schema>;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const baseDefaults = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      consent1: true,
      consent2: true,
      consent3: true,
    }),
    []
  );
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { ...baseDefaults, ...extraDefaults } as any, // <-- merge both
  });
  const getSubmitKey = (email: string, s: string) => `lastSubmit:${email}:${s}`;
  const hasRecentlySubmitted = (email: string, s: string): boolean => {
    const last = safeGet(getSubmitKey(email, s));
    if (!last) return false;
    const t = parseInt(last, 10);
    return Number.isFinite(t) && Date.now() - t < 300000;
  };
  const markAsSubmitted = (email: string, s: string) =>
    safeSet(getSubmitKey(email, s), String(Date.now()));

  const onSubmit = async (data: FormData) => {
    if (hasRecentlySubmitted(data.email, slug)) {
      alert(t('alerts.duplicate'));
      return;
    }
    const projectMeta = getProjectMeta(slug);
    const hasUtm = Boolean(utm_campaign);
    const utmRawMeta = hasUtm ? projectMeta?.utmMetaMap?.[utm_campaign] || {} : {};
    const utmMeta: {
      MediaType?: number; MediaName?: number; MethodOfContact?: number;
    } | undefined = hasUtm
        ? {
          MediaType: utmRawMeta.media_Type,
          MediaName: utmRawMeta.media_Name,
          MethodOfContact: utmRawMeta.MethodOfContactVal,
        }
        : undefined;

    const stripDirectionChars = (s: string) => s.replace(/[\u202A-\u202E]/g, "");
    const effectiveRemark =
      (hasUtm ? projectMeta?.utmRemarksMap?.[utm_campaign] : undefined) ||
      projectMeta?.remarks ||
      "";
      const selectedPropertyId = String((data as any).propertyId ?? "");
const selectedPropertyName =
  properties.find((p) => p.propertyID === selectedPropertyId)?.propertyName ||
  (selectedPropertyId ? selectedPropertyId : "");

const effectiveRemarkWithProperty = selectedPropertyName
  ? `Client Interested Property: ${selectedPropertyName} | ${effectiveRemark}`
  : effectiveRemark;
const extraRemarkLines = extraFields
  .map((f) => {
    const value = (data as any)[f.id];
    if (value == null || value === "") return "";

   if (f.id === "propertyId") return "";

    const label = f.labelKey ? t(f.labelKey as any) : f.label ?? f.id;
    return `${label}: ${String(value)}</br>`;
  })
  .join("");
    const fullRemark = `
Additional consent 1 : ${data.consent1 ? "YES" : "NO"}</br>
Additional consent 2 : ${data.consent2 ? "YES" : "NO"}</br>
Additional consent 3 : ${data.consent3 ? "YES" : "NO"}</br>
${extraRemarkLines ? `Extra Fields:</br>${extraRemarkLines}` : ''}
Remarks: ${effectiveRemarkWithProperty}</br>
Client Name: ${data.firstName} ${data.lastName}</br>
Client Email: ${data.email}</br>
Client Phone: ${data.phone}</br>
branch: ${projectMeta?.Branch || ""}</br>
URL coming from: ${typeof window !== "undefined" ? window.location.href : ""}`;
    const emailTableBody = `
<table border="1" cellpadding="6" cellspacing="0"
  style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; color: #333;">

  <!-- Top title bar -->
  <tr>
    <td colspan="2"
      style="background-color:#02344A; color:#ffffff; font-size:18px; font-weight:bold; padding:10px;">
      Registration Page
    </td>
  </tr>

  <!-- Section header: CLIENT INFO -->
  <tr>
    <td colspan="2"
      style="background:#c13e13; color:#fff; font-weight:bold; padding:8px;">
      Client Info
    </td>
  </tr>

  <tr>
    <td style="font-weight:bold;">Client Name</td>
    <td>${data.firstName} ${data.lastName}</td>
  </tr>

  <tr>
    <td style="font-weight:bold;">Client Email</td>
    <td>${data.email}</td>
  </tr>

  <tr>
    <td style="font-weight:bold;">Client Phone</td>
    <td>${data.phone}</td>
  </tr>

  ${extraRemarkLines
        ? `
      <tr>
        <td style="font-weight:bold;">Extra Fields</td>
        <td>${extraRemarkLines.replace(/<\/br>/g, "<br>")}</td>
      </tr>
    `
        : ""
      }

  <tr>
    <td style="font-weight:bold;">Remarks</td>
    <td>${effectiveRemarkWithProperty}</td>
  </tr>

  <tr>
    <td style="font-weight:bold;">Branch</td>
    <td>${projectMeta?.Branch || ""}</td>
  </tr>

  <tr>
    <td style="width: 30%; font-weight:bold;">Additional consent 1</td>
    <td>${data.consent1 ? "YES" : "NO"}</td>
  </tr>

  <tr>
    <td style="font-weight:bold;">Additional consent 2</td>
    <td>${data.consent2 ? "YES" : "NO"}</td>
  </tr>

  <tr>
    <td style="font-weight:bold;">Additional consent 3</td>
    <td>${data.consent3 ? "YES" : "NO"}</td>
  </tr>

  <tr>
    <td style="font-weight:bold;">URL coming from</td>
    <td>${typeof window !== "undefined" ? window.location.href : ""}</td>
  </tr>

  <!-- Copyright -->
  <tr>
    <td colspan="2" 
        style="background-color:#02344A; color:#ffffff; text-align:center; padding:10px; font-size:12px;">
      © 2025 Property Shop Investment. All Rights Reserved.
    </td>
  </tr>

</table>
`;
    const formDataToSend: RegistrationFormPayload & {
      slug: string;
      utm_source?: string; utm_medium?: string; utm_campaign?: string;
    } = {
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
      LanguageID: languageMap[langIdLocale] || languageMap.en,
      CompanyID: "",
      Remarks: effectiveRemarkWithProperty,
      RequirementType: projectMeta.RequirementType || 91212,
      ContactType: projectMeta.ContactType,
      CountryID: projectMeta.CountryID || 65946,
      StateID: projectMeta.StateID || 91823,
      CityID: projectMeta.CityID || 91823,
      DistrictID: projectMeta.DistrictID || 102625,
      CommunityID: projectMeta.CommunityID ?? undefined,
      SubCommunityID: projectMeta.SubCommunityID ?? undefined,
      PropertyID: projectMeta.PropertyID,
      UnitType: projectMeta.UnitType || 19,
      MediaType: (utmMeta?.MediaType ?? projectMeta.media_Type) ?? 0,
      MediaName: (utmMeta?.MediaName ?? projectMeta.media_Name) ?? 0,
      MethodOfContact: (utmMeta?.MethodOfContact ?? projectMeta.MethodOfContactVal) ?? 0,
      DeactivateNotification: "",
      Bedroom: projectMeta.Bedroom || "21935",
      Bathroom: projectMeta.Bathroom || "21935",
      Budget: projectMeta.Budget || "100000",
      Budget2: projectMeta.Budget2 || "1000000",
      AreaFrom: "300",
      RequirementCountryID: projectMeta.CountryID,
      ExistingClient: "",
      CompaignSource: "",
      CompaignMedium: "",
      Company: "",
      NumberOfEmployee: "",
      LeadStageId: "",
      LeadRatingId: "",
      UnitId: "",
      ReferredToID: projectMeta.ReferredToID || "3458",
      ReferredByID: projectMeta.ReferredByID || "3458",
      ActivityAssignedTo: projectMeta.ActivityAssignedTo || "3458",
      ActivityDate: "",
      ActivityTypeId: "167234",
      ActivitySubject: "Email Inquiry Copy",
      ActivityRemarks: stripDirectionChars(fullRemark),
      IsForAutoRotation: "true",
      PropertyCampaignId: hasUtm
        ? projectMeta.utmCampaignMap?.[utm_campaign] || projectMeta.PropertyCampaignId
        : undefined,
      google_gclid: projectMeta?.gclid || "",
      slug,
      utm_campaign,
      utm_source,
      utm_medium,
    };
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/external/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSend),
      });

      const result = await res.json();

      if (res.ok) {
        try {
          const mailRes = await fetch("https://registration.psinv.net/api/sendemail2.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              body: emailTableBody,
              receiver: Array.isArray(projectMeta.sendto)
                ? projectMeta.sendto.join(",")
                : projectMeta.sendto,
              subject: `Registration Page - ${data.firstName} ${data.lastName}`,
              filename: "",
              filedata: "",
            }),
          });

          const mailText = await mailRes.text();
          console.log(
            "[RegistrationForm] sendemail.php status",
            mailRes.status,
            mailText
          );

          if (!mailRes.ok) {
            console.error("Email API failed:", mailRes.status, mailText);
          }
        } catch (emailErr) {
          console.error("Email failed (non-blocking):", emailErr);
        }

        markAsSubmitted(data.email, slug);
        setSuccessMessage(
          locale === "ar"
            ? "شكرًا لاستفسارك. سنتواصل معك قريبًا."
            : "Thank you for your inquiry. We will contact you soon."
        );

        setTimeout(() => {
          window.location.href = `/${locale}/thankyou?email=${encodeURIComponent(
            data.email
          )}`;
        }, 2000);
      } else {
        console.error(result);
        alert("Error submitting the form.");
      }
    } catch (e) {
      console.error(e);
      alert("Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {successMessage && (
        <div
          className={clsx(
            "col-span-full mb-4 rounded-md border border-green-300 bg-green-100 px-4 py-3 text-sm text-green-800 shadow-sm",
            locale === "ar" && "text-right"
          )}
        >
          {locale === "ar"
            ? "شكرًا لاستفسارك. سنتواصل معك قريبًا."
            : "Thank you for your inquiry. We will contact you soon."}
        </div>
      )}
      <form
        data-brightcall-form="registration"
        onSubmit={handleSubmit(onSubmit)}
        dir={isRTL ? 'rtl' : 'ltr'}
        className={clsx(
          'grid grid-cols-1 md:grid-cols-2 gap-4',
          isRTL && 'text-right rtl',
          isSubmitting && 'opacity-60 pointer-events-none'
        )}
      >
        <div>
          <label className="label-required">{t('fields.firstName.label')}</label>
          <input id="fname"
            {...register("firstName")}
            type="text"
            className={clsx(
              'w-full px-3 py-2 border border-[#cecfd0] rounded-[7px] placeholder-[#A6A6A6]',
              isRTL && 'text-right'
            )}
            placeholder={t('fields.firstName.placeholder')}
          />
          {/* First name */}
          {errMsg(errors.firstName) && (
            <p className="text-red-600 text-sm mt-1">{errMsg(errors.firstName)}</p>
          )}
        </div>
        <div>
          <label className="label-required">{t('fields.lastName.label')}</label>
          <input id="lname"
            {...register('lastName')}
            type="text"
            className={clsx(
              'w-full px-3 py-2 border border-[#cecfd0] rounded-[7px] placeholder-[#A6A6A6]',
              isRTL && 'text-right'
            )}
            placeholder={t('fields.lastName.placeholder')}
          />
          {/* Last name */}
          {errMsg(errors.lastName) && (
            <p className="text-red-600 text-sm mt-1">{errMsg(errors.lastName)}</p>
          )}
        </div>
        <div>
          <label className="label-required">{t('fields.phone.label')}</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <div dir="ltr" className={clsx(isRTL && "rtl-phone-fix")}>
                <PhoneInput
                  {...field}
                  id="phone"
                  name="phone"
                  value={field.value ?? ''}
                  onChange={(v) => field.onChange(v ?? '')}
                  international
                  defaultCountry="AE"
                  className={clsx(
                    'w-full px-3 py-2 border border-[#cecfd0] rounded-[7px] placeholder-[#A6A6A6]',
                    isRTL && 'text-right'
                  )}
                  placeholder={t('fields.phone.placeholder')}
                />
              </div>
            )}
          />
          {/* Phone */}
          {errMsg(errors.phone) && (
            <p className="text-red-600 text-sm mt-1">{errMsg(errors.phone)}</p>
          )}
        </div>
        <div>
          <label className="label-required">{t('fields.email.label')}</label>
          <input id="email"
            {...register('email')}
            type="email"
            className={clsx(
              'w-full px-3 py-2 border border-[#cecfd0] rounded-[7px] placeholder-[#A6A6A6]',
              isRTL && 'text-right'
            )}
            placeholder={t('fields.email.placeholder')}
          />
          {/* Email */}
          {errMsg(errors.email) && (
            <p className="text-red-600 text-sm mt-1">{errMsg(errors.email)}</p>
          )}
        </div>
        {extraFields.map((f) => {
          const label = f.labelKey ? t(f.labelKey as any) : f.label ?? f.id;
          const placeholder = f.placeholderKey ? t(f.placeholderKey as any) : undefined;
          const fieldErr = (errors as any)?.[f.id];
          const msg = errMsg(fieldErr);
         if (f.type === "select") {
  const optionsToRender =
    f.id === "propertyId"
      ? propertyOptions
      : (f.options || []).map((opt) => ({
          value: opt.value,
          label: opt.labelKey ? t(opt.labelKey as any) : opt.label ?? String(opt.value),
        }));

  return (
    <div key={f.id}>
      <label className={f.required ? "label-required" : ""}>{label}</label>
      <select
        {...register(f.id as any)}
        className="w-full px-3 py-2 border border-[#cecfd0] rounded-[7px]"
        disabled={f.id === "propertyId" && propertiesLoading}
      >
        {optionsToRender.map((opt) => (
          <option
            key={String(opt.value)}
            value={opt.value}
            style={{ color: "#111", backgroundColor: "#fff" }}
          >
            {opt.label}
          </option>
        ))}
      </select>
      {msg && <p className="text-red-600 text-sm mt-1">{msg}</p>}
    </div>
  );
}
          return (
            <div key={f.id}>
              <label>{label}</label>
              <input
                {...register(f.id as any)}
                type="text"
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-[#cecfd0] rounded-[7px]"
              />
              {msg && <p className="text-red-600 text-sm mt-1">{msg}</p>}
            </div>
          );
        })}
        <div className="col-span-full space-y-2 mt-4 text-sm">
          <label className="block">
            <input type="checkbox" defaultChecked className="mr-2" {...register('consent1')} />
            {t('consents.c1')}
          </label>
          <label className="block">
            <input type="checkbox" defaultChecked className="mr-2" {...register('consent2')} />
            {t('consents.c2')}
          </label>
          <label className="block">
            <input type="checkbox" defaultChecked className="mr-2" {...register('consent3')} />
            {t('consents.c3')}
          </label>
        </div>
        <div className="col-span-full text-xs text-gray-500 mt-4">
          <p className="italic">
            {t.rich('fineprint.text', {
              terms: (chunks) => <a href={`/${locale}/terms`} className="underline">{chunks}</a>,
              privacy: (chunks) => <a href={`/${locale}/privacy`} className="underline">{chunks}</a>,
            })}
          </p>
        </div>
        <div className="col-span-full mt-4">
          <button type="submit" className="bg-black text-white px-6 py-2 hover:bg-gray-800" disabled={isSubmitting}>
            {isSubmitting ? t('buttons.submitting') : t('buttons.submit')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
